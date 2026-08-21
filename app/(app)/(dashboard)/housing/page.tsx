"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageHeader from "../../../_components/PageHeader";
import Reveal from "../../../_components/Reveal";
import HelpButton from "../../../_components/HelpButton";
import CitySelect from "../../../_components/CitySelect";
import Dropdown from "../../../_components/Dropdown";
import HousingSiteChoiceModal from "../../../_components/HousingSiteChoiceModal";
import { useLanguage } from "../../../_components/LanguageProvider";
import { useAuth } from "../../../_components/AuthProvider";
import { useCurrency } from "../../../_components/CurrencyProvider";
import { convertPlnText, formatMoneyRange } from "../../../_lib/currency";
import CurrencyHint from "../../../_components/CurrencyHint";
import { pressScale } from "../../../_lib/motion";
import { getFlagUrl } from "../../../_lib/flags";
import { supabase } from "../../../../lib/supabase";
import { useSelectedCity } from "../../../_lib/useSelectedCity";
import { buildOlxUrl, buildOtodomUrl } from "../../../_lib/housingSearchLinks";

const CITY_GENITIVE_RU: Record<string, string> = {
  "Варшава": "Варшавы",
  "Краков": "Кракова",
  "Вроцлав": "Вроцлава",
  "Гданьск": "Гданьска",
  "Познань": "Познани",
  "Щецин": "Щецина",
  "Лодзь": "Лодзи",
  "Люблин": "Люблина",
  "Катовице": "Катовиц",
};

const WEBSITES = [
  { key: "olx", name: "OLX", href: "https://www.olx.pl/nieruchomosci/mieszkania/wynajem/" },
  { key: "otodom", name: "Otodom", href: "https://www.otodom.pl/wynajem/mieszkanie" },
  { key: "gratka", name: "Gratka", href: "https://gratka.pl/nieruchomosci/do-wynajecia" },
] as const;

type RoomsFilter = "any" | "studio" | "2room" | "3room";

type District = {
  id: string;
  city: string;
  district: string;
  price_range: string | null;
  description: string | null;
  is_top: boolean;
  rank: number | null;
  rent_studio_min: number | null;
  rent_studio_avg: number | null;
  rent_studio_max: number | null;
  rent_2room_min: number | null;
  rent_2room_avg: number | null;
  rent_2room_max: number | null;
  rent_3room_min: number | null;
  rent_3room_avg: number | null;
  rent_3room_max: number | null;
  purchase_price_m2: number | null;
};

function districtPriceLabel(
  d: District,
  rooms: RoomsFilter,
  currency: ReturnType<typeof useCurrency>["currency"],
  rates: ReturnType<typeof useCurrency>["rates"]
): string | null {
  if (rooms === "any") return convertPlnText(d.price_range, currency, rates) || null;
  const minKey = `rent_${rooms}_min` as const;
  const maxKey = `rent_${rooms}_max` as const;
  return formatMoneyRange(d[minKey], d[maxKey], currency, rates);
}

// District descriptions were authored with a leading "X–Y zł. " price recap
// that duplicates the bold price line right above it — strip it so the card
// doesn't show the same range twice.
function stripPricePrefix(text: string): string {
  return text.replace(/^[\d\s]+[–\-][\d\s]+\s*zł\.?\s*/i, "").trim();
}

function DistrictCard({
  d,
  rooms,
  onOpenSearch,
}: {
  d: District;
  rooms: RoomsFilter;
  onOpenSearch: (district: string) => void;
}) {
  const { currency, rates } = useCurrency();
  const priceLabel = districtPriceLabel(d, rooms, currency, rates);
  const description = d.description ? stripPricePrefix(d.description) : null;

  return (
    <div className="group relative flex h-full flex-col rounded-[28px] bg-[#1c1f26] p-6 transition-[transform,box-shadow,background-color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#20242d] [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_16px_36px_-14px_rgba(33,85,212,0.4)] motion-reduce:transition-none">
      <div className="flex-1">
        <p className="text-[15px] font-bold leading-snug text-white">{d.district}</p>
        {priceLabel && (
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <p className="text-sm font-bold text-accent-bright">{priceLabel}</p>
            <CurrencyHint />
          </div>
        )}
        {description && <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/50">{description}</p>}
      </div>
      <button
        type="button"
        onClick={() => onOpenSearch(d.district)}
        className="mt-4 w-full rounded-2xl bg-white/10 py-3 text-[13px] font-bold text-white transition-colors duration-150 hover:bg-accent"
      >
        Искать с этими фильтрами →
      </button>
    </div>
  );
}

export default function HousingPage() {
  const { t, lang } = useLanguage();
  const { profile } = useAuth();
  const [city, setCity] = useSelectedCity(profile?.city);
  const [rooms, setRooms] = useState<RoomsFilter>("any");
  const [districts, setDistricts] = useState<District[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [searchModalDistrict, setSearchModalDistrict] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setShowAll(false);
    supabase
      .from("housing_districts")
      .select("*")
      .eq("city", city)
      .order("is_top", { ascending: false })
      .order("rank", { ascending: true, nullsFirst: false })
      .order("district", { ascending: true })
      .then(({ data }) => {
        if (!active) return;
        setDistricts((data as District[]) ?? []);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [city]);

  // The "top 4" list is a curated is_top/rank editorial pick (see the
  // Supabase query above), not a price ranking — it must stay the same
  // regardless of which room type is selected. Only the price label shown
  // on each card (via districtPriceLabel) should react to the room filter;
  // changing rooms must never swap out which districts are featured.
  const featuredDistricts = districts.slice(0, 4);
  const restDistricts = districts.slice(4);

  const cityLabel = lang === "ru" ? (CITY_GENITIVE_RU[city] ?? city) : city;
  const showAllLabel = t.housing.showAllDistricts
    .replace("{count}", String(districts.length))
    .replace("{city}", cityLabel);

  return (
    <div className="px-6 py-8 lg:px-10 lg:py-10">
      <PageHeader
        title={
          <span className="inline-flex items-center gap-3">
            {t.housing.title}
            <Image src={getFlagUrl("pl", "md")} alt="Poland" width={32} height={24} className="rounded-sm" unoptimized />
          </span>
        }
        subtitle={t.housing.subtitle}
      />

      <Reveal delay={40} className="mt-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-bold tracking-tight text-text-primary">{t.housing.rentMarket}</h2>
            <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent-bright">
              {t.housing.expatsChoiceBadge}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Dropdown<RoomsFilter>
              value={rooms}
              onChange={setRooms}
              label="Комнат"
              options={[
                { value: "any", label: "Любое" },
                { value: "studio", label: "Студия" },
                { value: "2room", label: "2 комнаты" },
                { value: "3room", label: "3 комнаты" },
              ]}
            />
            <CitySelect value={city} onChange={setCity} label="Город" />
          </div>
        </div>
        <p className="mt-1.5 max-w-2xl text-sm text-text-muted">{t.housing.rentMarketSub}</p>

        {loading ? (
          <p className="mt-6 text-sm text-text-muted">Загрузка…</p>
        ) : districts.length === 0 ? (
          <p className="mt-6 text-sm text-text-muted">Нет данных по районам для {city}.</p>
        ) : (
          <>
            <div className="mt-4 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredDistricts.map((district, index) => (
                <Reveal key={district.id} delay={index * 25}>
                  <DistrictCard
                    d={district}
                    rooms={rooms}
                    onOpenSearch={setSearchModalDistrict}
                  />
                </Reveal>
              ))}
            </div>

            {restDistricts.length > 0 && (
              <div className="mt-8 border-t border-border-subtle pt-6">
                <button
                  type="button"
                  onClick={() => setShowAll((prev) => !prev)}
                  className={`inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface-1 px-6 py-3 text-sm font-semibold text-text-primary transition-colors duration-150 hover:border-accent/40 hover:text-accent-bright ${pressScale}`}
                >
                  {showAll ? t.housing.showFewerDistricts : showAllLabel}
                </button>

                {showAll && (
                  <div className="mt-6 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {restDistricts.map((district, index) => (
                      <Reveal key={district.id} delay={index * 25}>
                        <DistrictCard
                          d={district}
                                rooms={rooms}
                          onOpenSearch={setSearchModalDistrict}
                        />
                      </Reveal>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </Reveal>

      <Reveal delay={80} className="mt-12">
        <h2 className="text-xl font-bold tracking-tight text-text-primary">{t.housing.topWebsites}</h2>
        <p className="mt-1 text-sm text-text-muted">{t.housing.topWebsitesSub}</p>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WEBSITES.map((site, index) => {
            const href =
              site.key === "olx"
                ? buildOlxUrl(city, undefined, rooms === "any" ? undefined : rooms)
                : site.key === "otodom"
                  ? buildOtodomUrl(city)
                  : site.href;
            return (
              <Reveal key={site.key} delay={index * 40}>
                <div className="group flex h-full flex-col rounded-2xl border border-border-subtle bg-surface-1 p-5 backdrop-blur-sm transition-[transform,box-shadow,border-color,background-color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:border-accent/50 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-surface-hover [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_12px_32px_-12px_rgba(33,85,212,0.45)] motion-reduce:transition-none">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-sm font-bold text-accent-bright transition-transform duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105 motion-reduce:transition-none">
                    {site.name.slice(0, 2).toUpperCase()}
                  </span>
                  <p className="mt-3 text-sm font-semibold text-text-primary">{site.name}</p>
                  <p className="mt-1 flex-1 text-xs text-text-muted">{t.housing.websiteDescs[site.key]}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Link
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex w-fit items-center gap-1 rounded-full border border-accent/50 px-4 py-2 text-xs font-semibold text-accent-bright transition-[background-color,border-color,color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:border-accent [@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent [@media(hover:hover)_and_(pointer:fine)]:hover:text-white motion-reduce:transition-none ${pressScale}`}
                    >
                      {t.housing.visitSite}
                      <span aria-hidden>→</span>
                    </Link>
                    {t.housing.guides[site.key] && (
                      <HelpButton
                        guideHeading={t.housing.guides[site.key].heading}
                        guideSteps={t.housing.guides[site.key].steps}
                        aiQuestion={t.housing.guides[site.key].aiQuestion}
                        label={t.helpButton.label}
                      />
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={120} className="mt-12">
        <h2 className="text-xl font-bold tracking-tight text-text-primary">{t.housing.aiTips}</h2>
        <p className="mt-1 text-sm text-text-muted">{t.housing.aiTipsSub}</p>
        <div className="mt-4 grid gap-5 lg:grid-cols-3">
          {t.housing.tips.map((tip, index) => (
            <Reveal key={tip.title} delay={index * 40}>
              <div className="h-full rounded-2xl border border-accent/20 bg-accent/[0.04] p-5 backdrop-blur-sm">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.5M12 6.5h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <p className="mt-3 text-sm font-semibold text-text-primary">{tip.title}</p>
                <p className="mt-1 text-xs text-text-muted">{tip.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>

      <HousingSiteChoiceModal
        open={searchModalDistrict !== null}
        onClose={() => setSearchModalDistrict(null)}
        city={city}
        district={searchModalDistrict ?? ""}
        rooms={rooms}
      />
    </div>
  );
}
