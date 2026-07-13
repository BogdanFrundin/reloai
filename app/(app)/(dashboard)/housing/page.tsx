"use client";

import Link from "next/link";
import { useState } from "react";
import PageHeader from "../../../_components/PageHeader";
import Reveal from "../../../_components/Reveal";
import { useLanguage } from "../../../_components/LanguageProvider";
import { pressScale } from "../../../_lib/motion";
import { WARSAW_DISTRICTS, type WarsawDistrict } from "../../../_lib/housingDistricts";
import type { Dictionary } from "../../../_lib/i18n";

const WEBSITES = [
  { key: "olx", name: "OLX", href: "https://www.olx.pl/nieruchomosci/mieszkania/wynajem/" },
  { key: "otodom", name: "Otodom", href: "https://www.otodom.pl/wynajem/mieszkanie" },
  { key: "gratka", name: "Gratka", href: "https://gratka.pl/nieruchomosci/do-wynajecia" },
] as const;

function MetroBadge({ label }: { label: string }) {
  return (
    <span
      title={label}
      className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-[11px] font-bold text-accent-bright"
    >
      M
    </span>
  );
}

function DistrictCard({ district, t }: { district: WarsawDistrict; t: Dictionary["housing"] }) {
  const description = (t.topDistrictDescs as Record<string, string>)[district.id];

  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl border p-5 backdrop-blur-sm transition-[transform,box-shadow,border-color,background-color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:border-accent/60 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/[0.06] [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_12px_32px_-12px_rgba(33,85,212,0.45)] motion-reduce:transition-none ${
        district.recommended
          ? "border-accent/60 bg-accent/[0.06] shadow-[0_0_40px_-14px_var(--accent)]"
          : "border-white/10 bg-white/[0.03]"
      }`}
    >
      {district.recommended && (
        <span className="absolute -top-3 left-5 z-10 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-white shadow-[0_0_16px_-4px_var(--accent)]">
          {t.bestValueBadge}
        </span>
      )}
      <div className="flex min-h-10 items-start justify-between gap-2">
        <p className="text-sm font-semibold text-white">{district.name}</p>
        {district.metro && <MetroBadge label={t.metroAccess} />}
      </div>
      <p className="mt-2 min-h-7 bg-gradient-to-br from-white to-slate-400 bg-clip-text text-xl font-bold text-transparent">
        {district.priceMin.toLocaleString()}–{district.priceMax.toLocaleString()} PLN
      </p>
      <p className="mt-2 line-clamp-3 min-h-[60px] text-sm text-slate-300">{description}</p>
      <span className="mt-3 inline-flex w-fit min-h-7 items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-400">
        {t.distanceToCenter.replace("{km}", String(district.distanceKm))}
      </span>
      <span
        className={`mt-auto inline-flex w-fit items-center gap-1 self-start rounded-full border px-2.5 py-1 text-[11px] font-medium ${
          district.metro
            ? "border-accent/30 bg-accent/10 text-accent-bright"
            : "border-white/10 bg-white/5 text-slate-500"
        }`}
      >
        {district.metro ? t.metroAccess : t.noMetro}
      </span>
    </div>
  );
}

export default function HousingPage() {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);

  const featuredDistricts = WARSAW_DISTRICTS.slice(0, 4);
  const restDistricts = WARSAW_DISTRICTS.slice(4);

  return (
    <div className="px-6 py-8 lg:px-10 lg:py-10">
      <PageHeader title={t.housing.title} subtitle={t.housing.subtitle} />

      <Reveal delay={40} className="mt-10">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-xl font-bold tracking-tight text-white">{t.housing.rentMarket}</h2>
          <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent-bright">
            {t.housing.expatsChoiceBadge}
          </span>
        </div>
        <p className="mt-1.5 max-w-2xl text-sm text-slate-400">{t.housing.rentMarketSub}</p>
        <div className="mt-4 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredDistricts.map((district, index) => (
            <Reveal key={district.id} delay={index * 25}>
              <DistrictCard district={district} t={t.housing} />
            </Reveal>
          ))}
        </div>

        <div className="mt-8 border-t border-white/10 pt-6">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className={`inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:border-accent/40 hover:text-accent-bright ${pressScale}`}
          >
            {showAll ? t.housing.showFewerDistricts : t.housing.showAllDistricts}
          </button>

          {showAll && (
            <div className="mt-6 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {restDistricts.map((district, index) => (
                <Reveal key={district.id} delay={index * 25}>
                  <DistrictCard district={district} t={t.housing} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </Reveal>

      <Reveal delay={80} className="mt-12">
        <h2 className="text-xl font-bold tracking-tight text-white">{t.housing.topWebsites}</h2>
        <p className="mt-1 text-sm text-slate-400">{t.housing.topWebsitesSub}</p>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WEBSITES.map((site, index) => (
            <Reveal key={site.key} delay={index * 40}>
              <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-[transform,box-shadow,border-color,background-color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:border-accent/50 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/[0.06] [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_12px_32px_-12px_rgba(33,85,212,0.45)] motion-reduce:transition-none">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-sm font-bold text-accent-bright transition-transform duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105 motion-reduce:transition-none">
                  {site.name.slice(0, 2).toUpperCase()}
                </span>
                <p className="mt-3 text-sm font-semibold text-white">{site.name}</p>
                <p className="mt-1 flex-1 text-xs text-slate-500">{t.housing.websiteDescs[site.key]}</p>
                <Link
                  href={site.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-4 inline-flex w-fit items-center gap-1 rounded-full border border-accent/50 px-4 py-2 text-xs font-semibold text-accent-bright transition-[background-color,border-color,color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:border-accent [@media(hover:hover)_and_(pointer:fine)]:group-hover:bg-accent [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-white motion-reduce:transition-none ${pressScale}`}
                >
                  {t.housing.visitSite}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>

      <Reveal delay={120} className="mt-12">
        <h2 className="text-xl font-bold tracking-tight text-white">{t.housing.aiTips}</h2>
        <p className="mt-1 text-sm text-slate-400">{t.housing.aiTipsSub}</p>
        <div className="mt-4 grid gap-5 lg:grid-cols-3">
          {t.housing.tips.map((tip, index) => (
            <Reveal key={tip.title} delay={index * 40}>
              <div className="h-full rounded-2xl border border-accent/20 bg-accent/[0.04] p-5 backdrop-blur-sm">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.5M12 6.5h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <p className="mt-3 text-sm font-semibold text-white">{tip.title}</p>
                <p className="mt-1 text-xs text-slate-400">{tip.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
