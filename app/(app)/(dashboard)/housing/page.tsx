"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import PageHeader from "../../../_components/PageHeader";
import Reveal from "../../../_components/Reveal";
import HelpButton from "../../../_components/HelpButton";
import CitySelect from "../../../_components/CitySelect";
import { useLanguage } from "../../../_components/LanguageProvider";
import { useAuth } from "../../../_components/AuthProvider";
import { pressScale } from "../../../_lib/motion";
import { getFlagUrl } from "../../../_lib/flags";
import { supabase } from "../../../../lib/supabase";
import { DEFAULT_CITY, isCityName, type CityName } from "../../../_lib/cities";
import { buildOlxUrl, buildOtodomUrl } from "../../../_lib/housingSearchLinks";

const WEBSITES = [
  { key: "olx", name: "OLX", href: "https://www.olx.pl/nieruchomosci/mieszkania/wynajem/" },
  { key: "otodom", name: "Otodom", href: "https://www.otodom.pl/wynajem/mieszkanie" },
  { key: "gratka", name: "Gratka", href: "https://gratka.pl/nieruchomosci/do-wynajecia" },
] as const;

const CHEVRON_ICON = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

type RoomsFilter = "any" | "studio" | "2room" | "3room";

const ROOM_AVG_FIELD: Record<Exclude<RoomsFilter, "any">, "rent_studio_avg" | "rent_2room_avg" | "rent_3room_avg"> = {
  studio: "rent_studio_avg",
  "2room": "rent_2room_avg",
  "3room": "rent_3room_avg",
};

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

type CityOverview = {
  city: string;
  population: string | null;
  districts_note: string | null;
  transport: string | null;
  summary: string | null;
  rent_studio_avg: number | null;
  rent_2room_avg: number | null;
  rent_3room_avg: number | null;
  rent_4plus_avg: number | null;
  rent_city_avg: number | null;
};

function formatNumber(n: number): string {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function formatPrice(n: number): string {
  return `${formatNumber(n)} zł`;
}

function districtPriceLabel(d: District, rooms: RoomsFilter): string | null {
  if (rooms === "any") return d.price_range;
  const minKey = `rent_${rooms}_min` as const;
  const maxKey = `rent_${rooms}_max` as const;
  const min = d[minKey];
  const max = d[maxKey];
  if (min == null && max == null) return null;
  if (min != null && max != null) return `${formatNumber(min)} – ${formatPrice(max)}`;
  return formatPrice((min ?? max) as number);
}

function DistrictCard({
  d,
  bestValueBadge,
  rooms,
  city,
}: {
  d: District;
  bestValueBadge: string;
  rooms: RoomsFilter;
  city: CityName;
}) {
  const priceLabel = districtPriceLabel(d, rooms);

  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl border p-5 backdrop-blur-sm transition-[transform,box-shadow,border-color,background-color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:border-accent/60 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-surface-hover [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_12px_32px_-12px_rgba(33,85,212,0.45)] motion-reduce:transition-none ${
        d.is_top ? "border-accent/60 bg-accent/[0.06] shadow-[0_0_40px_-14px_var(--accent)]" : "border-border-subtle bg-surface-1"
      }`}
    >
      {d.is_top && (
        <span className="absolute -top-3 left-5 z-10 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-white shadow-[0_0_16px_-4px_var(--accent)]">
          {bestValueBadge}
        </span>
      )}
      <p className="text-sm font-semibold text-text-primary">{d.district}</p>
      {priceLabel && (
        <p className="mt-2 bg-gradient-to-br from-text-primary to-text-muted bg-clip-text text-lg font-bold text-transparent">
          {priceLabel}
        </p>
      )}
      {d.description && <p className="mt-2 line-clamp-5 text-sm text-text-secondary">{d.description}</p>}
      <Link
        href={buildOlxUrl(city, d.district, rooms === "any" ? undefined : rooms)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex w-fit items-center gap-1 rounded-full border border-accent/50 px-4 py-2 text-xs font-semibold text-accent-bright transition-[background-color,border-color,color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:border-accent [@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent [@media(hover:hover)_and_(pointer:fine)]:hover:text-white motion-reduce:transition-none"
      >
        Искать с этими фильтрами
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}

export default function HousingPage() {
  const { t } = useLanguage();
  const { profile } = useAuth();
  const [city, setCity] = useState<CityName>(DEFAULT_CITY);
  const [rooms, setRooms] = useState<RoomsFilter>("any");
  const [districts, setDistricts] = useState<District[]>([]);
  const [overview, setOverview] = useState<CityOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const appliedProfileCity = useRef(false);

  useEffect(() => {
    if (!appliedProfileCity.current && isCityName(profile?.city)) {
      setCity(profile.city);
      appliedProfileCity.current = true;
    }
  }, [profile?.city]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setShowAll(false);
    Promise.all([
      supabase
        .from("housing_districts")
        .select("*")
        .eq("city", city)
        .order("is_top", { ascending: false })
        .order("rank", { ascending: true, nullsFirst: false })
        .order("district", { ascending: true }),
      supabase.from("housing_city_overview").select("*").eq("city", city).maybeSingle(),
    ]).then(([districtsRes, overviewRes]) => {
      if (!active) return;
      setDistricts((districtsRes.data as District[]) ?? []);
      setOverview((overviewRes.data as CityOverview | null) ?? null);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [city]);

  const sortedDistricts = useMemo(() => {
    if (rooms === "any") return districts;
    const field = ROOM_AVG_FIELD[rooms];
    return [...districts].sort((a, b) => {
      const av = a[field];
      const bv = b[field];
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      return av - bv;
    });
  }, [districts, rooms]);

  const overviewPills = useMemo(() => {
    if (!overview) return [];
    return [
      { label: "Студия", value: overview.rent_studio_avg },
      { label: "2 комнаты", value: overview.rent_2room_avg },
      { label: "3 комнаты", value: overview.rent_3room_avg },
      { label: "4+ комнат", value: overview.rent_4plus_avg },
      { label: "В среднем по городу", value: overview.rent_city_avg },
    ].filter((p): p is { label: string; value: number } => p.value != null);
  }, [overview]);

  const featuredDistricts = sortedDistricts.slice(0, 4);
  const restDistricts = sortedDistricts.slice(4);

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
            <label className="inline-flex items-center gap-2 text-sm">
              <span className="text-text-muted">Комнат</span>
              <span className="relative inline-flex items-center">
                <select
                  value={rooms}
                  onChange={(e) => setRooms(e.target.value as RoomsFilter)}
                  className="appearance-none rounded-full border border-border-strong bg-surface-1 py-2 pl-4 pr-9 text-sm font-semibold text-text-primary transition-colors duration-150 hover:border-accent/40 focus:border-accent focus:outline-none"
                >
                  <option value="any">Любое</option>
                  <option value="studio">Студия</option>
                  <option value="2room">2 комнаты</option>
                  <option value="3room">3 комнаты</option>
                </select>
                <span className="pointer-events-none absolute right-3 text-text-muted">{CHEVRON_ICON}</span>
              </span>
            </label>
            <CitySelect value={city} onChange={setCity} label="Город" />
          </div>
        </div>
        <p className="mt-1.5 max-w-2xl text-sm text-text-muted">{t.housing.rentMarketSub}</p>

        {!loading && overview && (
          <div className="mt-4 rounded-2xl border border-border-subtle bg-surface-1 p-5 backdrop-blur-sm sm:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-sm font-semibold text-text-primary">{city}</p>
              {(overview.population || overview.districts_note) && (
                <p className="text-xs text-text-muted">
                  {[overview.population, overview.districts_note].filter(Boolean).join(" · ")}
                </p>
              )}
            </div>
            {overview.summary && <p className="mt-3 text-sm text-text-secondary">{overview.summary}</p>}
            {overview.transport && <p className="mt-2 text-xs text-text-muted">{overview.transport}</p>}
            {overviewPills.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {overviewPills.map((p) => (
                  <span
                    key={p.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-surface-2 px-3 py-1.5 text-xs font-semibold text-text-primary"
                  >
                    <span className="font-normal text-text-muted">{p.label}:</span> {formatPrice(p.value)}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {loading ? (
          <p className="mt-6 text-sm text-text-muted">Загрузка…</p>
        ) : districts.length === 0 ? (
          <p className="mt-6 text-sm text-text-muted">Нет данных по районам для {city}.</p>
        ) : (
          <>
            <div className="mt-4 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredDistricts.map((district, index) => (
                <Reveal key={district.id} delay={index * 25}>
                  <DistrictCard d={district} bestValueBadge={t.housing.bestValueBadge} rooms={rooms} city={city} />
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
                  {showAll ? t.housing.showFewerDistricts : t.housing.showAllDistricts}
                </button>

                {showAll && (
                  <div className="mt-6 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {restDistricts.map((district, index) => (
                      <Reveal key={district.id} delay={index * 25}>
                        <DistrictCard d={district} bestValueBadge={t.housing.bestValueBadge} rooms={rooms} city={city} />
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
                      className={`inline-flex w-fit items-center gap-1 rounded-full border border-accent/50 px-4 py-2 text-xs font-semibold text-accent-bright transition-[background-color,border-color,color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:border-accent [@media(hover:hover)_and_(pointer:fine)]:group-hover:bg-accent [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-white motion-reduce:transition-none ${pressScale}`}
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
    </div>
  );
}
