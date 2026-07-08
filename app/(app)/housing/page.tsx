"use client";

import Link from "next/link";
import PageHeader from "../../_components/PageHeader";
import Reveal from "../../_components/Reveal";
import { useLanguage } from "../../_components/LanguageProvider";
import { cardHover, pressScale } from "../../_lib/motion";
import { WARSAW_DISTRICTS } from "../../_lib/housingDistricts";

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

export default function HousingPage() {
  const { t } = useLanguage();

  return (
    <div className="px-6 py-8 lg:px-10 lg:py-10">
      <PageHeader title={t.housing.title} subtitle={t.housing.subtitle} />

      <Reveal delay={40} className="mt-10">
        <h2 className="text-xl font-bold tracking-tight text-white">{t.housing.rentMarket}</h2>
        <p className="mt-1 text-sm text-slate-400">{t.housing.rentMarketSub}</p>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {WARSAW_DISTRICTS.map((district, index) => (
            <Reveal key={district.id} delay={index * 25}>
              <div className={`rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm ${cardHover}`}>
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-white">{district.name}</p>
                  {district.metro && <MetroBadge label={t.housing.metroAccess} />}
                </div>
                <p className="mt-2 bg-gradient-to-br from-white to-slate-400 bg-clip-text text-xl font-bold text-transparent">
                  {district.priceMin.toLocaleString()}–{district.priceMax.toLocaleString()} PLN
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-400">
                    {t.housing.distanceToCenter.replace("{km}", String(district.distanceKm))}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium ${
                      district.metro
                        ? "border-accent/30 bg-accent/10 text-accent-bright"
                        : "border-white/10 bg-white/5 text-slate-500"
                    }`}
                  >
                    {district.metro ? t.housing.metroAccess : t.housing.noMetro}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
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
