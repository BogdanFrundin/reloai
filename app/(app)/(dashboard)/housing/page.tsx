"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
import { getCityName } from "../../../_lib/cities";
import { getChosenCount, formatChosenCount } from "../../../_lib/chosenCount";
import { getDistrictImage } from "../../../_lib/districtImages";

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
  const router = useRouter();
  const { currency, rates } = useCurrency();
  const { t, lang } = useLanguage();
  const priceLabel = districtPriceLabel(d, rooms, currency, rates);
  const description = d.description ? stripPricePrefix(d.description) : null;
  const chosenCount = formatChosenCount(getChosenCount(d.id), lang);
  const [expandDescription, setExpandDescription] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const image = getDistrictImage(d.city, d.district);

  function askAi() {
    const question = `Расскажи об условиях жизни в районе ${d.district} Варшавы: цены на жилье, инфраструктура, безопасность, как это место подходит для иностранцев.`;
    router.push(`/dashboard/ai?q=${encodeURIComponent(question)}`);
  }

  useEffect(() => {
    if (!expandDescription) return;

    function handleClickOutside(event: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setExpandDescription(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [expandDescription]);

  return (
    <div ref={cardRef} className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface-1 transition-[transform,box-shadow,background-color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-lg hover:shadow-accent/20 motion-reduce:transition-none">
      {image && (
        <div className="relative h-32 w-full flex-shrink-0 overflow-hidden sm:h-36">
          <Image
            src={image}
            alt={d.district}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
          {d.is_top && (
            <span className="absolute right-3 top-3 rounded-full border border-amber-500/30 bg-amber-500/20 px-2.5 py-1 text-[11px] font-semibold text-amber-300 backdrop-blur-sm">
              {t.housing.recommended}
            </span>
          )}
          <p className="absolute inset-x-0 bottom-0 p-3 text-lg font-semibold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
            {d.district}
          </p>
        </div>
      )}
      <div className="flex-1 px-4 pt-4 sm:px-5 sm:pt-5">
        {!image && (
          <div className="flex items-start justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-sm font-bold text-accent-bright transition-transform duration-300 ease-[var(--ease-out-strong)] group-hover:scale-105">
              {d.district.slice(0, 2).toUpperCase()}
            </span>
            {d.is_top && (
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold text-amber-400 shadow-[0_0_30px_-12px_rgb(217,119,6)]">
                {t.housing.recommended}
              </span>
            )}
          </div>
        )}
        {!image && <p className="mt-3 text-lg font-semibold leading-snug text-text-primary">{d.district}</p>}
        {priceLabel && (
          <div className="mt-2 flex items-center gap-2">
            <p className="text-xl font-bold text-accent-bright">{priceLabel}</p>
            <CurrencyHint />
          </div>
        )}
        {description && (
          <div className="mt-4">
            <div className="flex items-start justify-between gap-2">
              <p className={`flex-1 text-xs leading-relaxed text-text-secondary ${!expandDescription ? "line-clamp-2" : ""}`}>
                {description}
              </p>
              <button
                type="button"
                onClick={() => setExpandDescription(!expandDescription)}
                className="flex-shrink-0 flex items-center justify-center h-5 w-5 text-text-secondary transition-transform duration-150 hover:text-accent-bright"
                aria-label={expandDescription ? "Свернуть описание" : "Развернуть описание"}
              >
                <svg className={`h-5 w-5 transition-transform duration-150 ${expandDescription ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        )}
        <p className="mt-2 flex items-center gap-1.5 text-[11px] text-blue-300/80">
          <svg className="h-3 w-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a4 4 0 100 8 4 4 0 000-8zM2 17a8 8 0 1116 0H2z" />
          </svg>
          {t.common.chosenByCountTemplate.replace("{n}", chosenCount)}
        </p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 px-4 pb-4 sm:px-5 sm:pb-5" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          onClick={() => onOpenSearch(d.district)}
          className="rounded-xl border border-border-subtle bg-surface-hover text-accent-bright px-3 py-2 text-xs font-semibold transition-colors duration-150 hover:border-accent/40 hover:bg-accent/10 flex items-center justify-center"
        >
          {t.housing.searchWithFiltersBtn}
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            askAi();
          }}
          className="rounded-xl bg-slate-700 px-3 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-slate-600 flex items-center justify-center"
        >
          Спросить ИИ ✦
        </button>
      </div>
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
    // Start of a data-fetching effect (flip to loading, fetch, then resolve);
    // this is the standard fetch-on-change pattern, not a synchronization bug.
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  const cityLabel = lang === "ru" ? (CITY_GENITIVE_RU[city] ?? city) : getCityName(city, lang);
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
          <div className="flex flex-wrap items-end gap-3 sm:gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-text-muted">{t.common.cityLabel}</label>
              <CitySelect value={city} onSelect={setCity} placeholder={t.common.cityLabel} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-text-muted">Кол-во комнат</label>
              <Dropdown<RoomsFilter>
                value={rooms}
                onChange={setRooms}
                options={[
                  { value: "any", label: t.housing.roomsAny },
                  { value: "studio", label: t.housing.roomsStudio },
                  { value: "2room", label: t.housing.rooms2 },
                  { value: "3room", label: t.housing.rooms3 },
                ]}
              />
            </div>
          </div>
        </div>
        <p className="mt-1.5 max-w-2xl text-sm text-text-muted">{t.housing.rentMarketSub}</p>

        {loading ? (
          <p className="mt-6 text-sm text-text-muted">{t.guideCard.loading}</p>
        ) : districts.length === 0 ? (
          <p className="mt-6 text-sm text-text-muted">{t.housing.noDistrictsText.replace("{city}", getCityName(city, lang))}</p>
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
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => setShowAll((prev) => !prev)}
                    className={`inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface-1 px-6 py-3 text-sm font-semibold text-text-primary transition-colors duration-150 hover:border-accent/40 hover:text-accent-bright ${pressScale}`}
                  >
                    {showAll ? t.housing.showFewerDistricts : showAllLabel}
                  </button>
                </div>

                {showAll && (
                  <>
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
                    <div className="mt-8 flex justify-center">
                      <button
                        type="button"
                        onClick={() => setShowAll(false)}
                        className={`inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface-1 px-6 py-3 text-sm font-semibold text-text-primary transition-colors duration-150 hover:border-accent/40 hover:text-accent-bright ${pressScale}`}
                      >
                        {t.housing.showFewerDistricts}
                      </button>
                    </div>
                  </>
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
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-sm font-bold text-accent-bright transition-transform duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105 motion-reduce:transition-none overflow-hidden">
                    <img
                      src={`https://www.${site.key === "olx" ? "olx.pl" : site.key === "otodom" ? "otodom.pl" : "gratka.pl"}/apple-touch-icon.png`}
                      alt={site.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        const img = e.currentTarget as HTMLImageElement;
                        const domain = site.key === "olx" ? "olx.pl" : site.key === "otodom" ? "otodom.pl" : "gratka.pl";
                        if (img.src.includes("apple-touch-icon")) {
                          img.src = `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;
                        } else {
                          // Fallback to text
                          img.style.display = "none";
                          img.parentElement!.textContent = site.name.slice(0, 2).toUpperCase();
                        }
                      }}
                    />
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
          {t.housing.tips.map((tip, index) => {
            const tipType = tip.type || "general";
            const borderColor = tipType === "warning" ? "border-red-500/20" : tipType === "legal" ? "border-accent/20" : tipType === "financial" ? "border-amber-500/20" : "border-accent/20";
            const bgColor = tipType === "warning" ? "bg-red-500/[0.04]" : tipType === "legal" ? "bg-accent/[0.04]" : tipType === "financial" ? "bg-amber-500/[0.04]" : "bg-accent/[0.04]";
            const iconBg = tipType === "warning" ? "bg-red-500/15" : tipType === "legal" ? "bg-accent/15" : tipType === "financial" ? "bg-amber-500/15" : "bg-accent/15";
            const iconColor = tipType === "warning" ? "text-red-400" : tipType === "legal" ? "text-accent-bright" : tipType === "financial" ? "text-amber-400" : "text-accent-bright";

            return (
              <Reveal key={tip.title} delay={index * 40}>
                <div className={`h-full rounded-2xl border ${borderColor} ${bgColor} p-5 backdrop-blur-sm`}>
                  <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.5M12 6.5h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <p className="mt-3 text-sm font-semibold text-text-primary">{tip.title}</p>
                  <p className="mt-1 text-xs text-text-muted">{tip.body}</p>
                </div>
              </Reveal>
            );
          })}
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
