"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import PageHeader from "../../../_components/PageHeader";
import Reveal from "../../../_components/Reveal";
import { pressScale } from "../../../_lib/motion";
import { useLanguage } from "../../../_components/LanguageProvider";

const SALARY_DATA: { keywords: string[]; pln: number; eur: number }[] = [
  { keywords: ["software", "developer", "engineer", "programmer", "программист", "разработчик", "инженер"], pln: 9500, eur: 2200 },
  { keywords: ["designer", "ux", "ui", "дизайнер"], pln: 7200, eur: 1650 },
  { keywords: ["marketing", "маркетолог", "маркетинг"], pln: 6800, eur: 1550 },
  { keywords: ["accountant", "finance", "бухгалтер", "финанс"], pln: 6500, eur: 1480 },
  { keywords: ["nurse", "медсестра", "медбрат"], pln: 5800, eur: 1320 },
  { keywords: ["teacher", "учитель", "преподаватель"], pln: 5200, eur: 1180 },
  { keywords: ["waiter", "waitress", "barista", "официант", "бариста"], pln: 4200, eur: 950 },
  { keywords: ["driver", "водитель"], pln: 5000, eur: 1140 },
  { keywords: ["construction", "builder", "строитель"], pln: 5500, eur: 1250 },
];

const JOB_SITES = [
  { key: "pracuj", name: "Pracuj.pl", href: "https://www.pracuj.pl/" },
  { key: "nofluff", name: "NoFluffJobs", href: "https://nofluffjobs.com/" },
  { key: "linkedin", name: "LinkedIn", href: "https://www.linkedin.com/jobs/" },
] as const;

function lookupSalary(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return null;
  const match = SALARY_DATA.find((entry) => entry.keywords.some((k) => q.includes(k)));
  return match ?? { pln: 7000, eur: 1600, fallback: true };
}

export default function WorkPage() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const result = useMemo(() => lookupSalary(query), [query]);

  const CONTRACT_TYPES = [
    { name: "Umowa o pracę", subtitle: t.work.employmentSubtitle, features: t.work.employmentFeatures },
    { name: t.work.b2bContractName, subtitle: t.work.b2bSubtitle, features: t.work.b2bFeatures },
  ];

  return (
    <div className="px-6 py-8 lg:px-10 lg:py-10">
      <PageHeader title={t.work.title} subtitle={t.work.subtitle} />

      <Reveal delay={40} className="mt-10">
        <h2 className="text-xl font-bold tracking-tight text-white">{t.work.contractVsB2B}</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          {CONTRACT_TYPES.map((type, index) => (
            <Reveal key={type.name} delay={index * 40}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
                <p className="text-sm font-semibold text-white">{type.name}</p>
                <p className="text-xs text-slate-500">{type.subtitle}</p>
                <ul className="mt-4 space-y-2.5">
                  {type.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-slate-400">
                      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-bright" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.6 3.6 6.7-6.7a1 1 0 011.4 0z" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>

      <Reveal delay={80} className="mt-12">
        <h2 className="text-xl font-bold tracking-tight text-white">{t.work.salarySearch}</h2>
        <p className="mt-1 text-sm text-slate-400">{t.work.salarySearchSub}</p>
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t.work.placeholder}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 transition-[border-color,box-shadow] duration-150 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
          {result && (
            <div className="mt-4 transition-[opacity,transform] duration-300 ease-[var(--ease-out-strong)] starting:opacity-0 starting:translate-y-2">
              <p className="text-sm font-medium text-slate-300">{t.work.averageSalary}</p>
              <p className="mt-2 bg-gradient-to-br from-white to-slate-400 bg-clip-text text-3xl font-bold text-transparent">
                {result.pln.toLocaleString("ru-RU")} PLN / месяц
              </p>
              <p className="mt-1 text-lg font-semibold text-accent-bright">
                ≈ €{result.eur.toLocaleString("ru-RU")} / месяц
              </p>
              {"fallback" in result && (
                <p className="mt-2 text-xs text-slate-500">{t.work.noExactData}</p>
              )}
              <p className="mt-3 text-xs text-slate-500">{t.work.salaryNote}</p>
            </div>
          )}
        </div>
      </Reveal>

      <Reveal delay={120} className="mt-12">
        <h2 className="text-xl font-bold tracking-tight text-white">{t.work.jobSites}</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {JOB_SITES.map((site, index) => (
            <Reveal key={site.key} delay={index * 40}>
              <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-[transform,box-shadow,border-color,background-color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:border-accent/50 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/[0.06] [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_12px_32px_-12px_rgba(33,85,212,0.45)] motion-reduce:transition-none">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-sm font-bold text-accent-bright transition-transform duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105 motion-reduce:transition-none">
                  {site.name.slice(0, 2).toUpperCase()}
                </span>
                <p className="mt-3 text-sm font-semibold text-white">{site.name}</p>
                <p className="mt-1 flex-1 text-xs text-slate-500">{t.work.jobSiteDescs[site.key]}</p>
                <Link
                  href={site.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/50 px-4 py-2 text-xs font-semibold text-accent-bright transition-[background-color,border-color,color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:border-accent [@media(hover:hover)_and_(pointer:fine)]:group-hover:bg-accent [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-white motion-reduce:transition-none ${pressScale}`}
                >
                  {t.work.visitSite}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
