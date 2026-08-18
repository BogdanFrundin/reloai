"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "../../../_components/PageHeader";
import Reveal from "../../../_components/Reveal";
import HelpButton from "../../../_components/HelpButton";
import { pressScale } from "../../../_lib/motion";
import { getFlagUrl } from "../../../_lib/flags";
import { useLanguage } from "../../../_components/LanguageProvider";

const LAST_PROFESSION_KEY = "lastProfession";

const SALARY_DATA: { name: string; keywords: string[]; pln: number; eur: number }[] = [
  { name: "Программист", keywords: ["software", "developer", "engineer", "programmer", "программист", "разработчик", "инженер"], pln: 9500, eur: 2200 },
  { name: "Дизайнер", keywords: ["designer", "ux", "ui", "дизайнер"], pln: 7200, eur: 1650 },
  { name: "Маркетолог", keywords: ["marketing", "маркетолог", "маркетинг"], pln: 6800, eur: 1550 },
  { name: "Бухгалтер", keywords: ["accountant", "finance", "бухгалтер", "финанс"], pln: 6500, eur: 1480 },
  { name: "Медсестра", keywords: ["nurse", "медсестра", "медбрат"], pln: 5800, eur: 1320 },
  { name: "Учитель", keywords: ["teacher", "учитель", "преподаватель"], pln: 5200, eur: 1180 },
  { name: "Официант / бариста", keywords: ["waiter", "waitress", "barista", "официант", "бариста"], pln: 4200, eur: 950 },
  { name: "Водитель", keywords: ["driver", "водитель"], pln: 5000, eur: 1140 },
  { name: "Строитель", keywords: ["construction", "builder", "строитель"], pln: 5500, eur: 1250 },
];

const JOB_SITES = [
  { key: "pracuj", name: "Pracuj.pl", href: "https://www.pracuj.pl/" },
  { key: "nofluff", name: "NoFluffJobs", href: "https://nofluffjobs.com/" },
  { key: "linkedin", name: "LinkedIn", href: "https://www.linkedin.com/jobs/" },
] as const;

const PROFESSION_JOB_SITES = [
  { key: "pracuj", name: "Pracuj.pl", buildHref: (q: string) => `https://www.pracuj.pl/praca/${encodeURIComponent(q)};kw` },
  { key: "nofluff", name: "NoFluffJobs", buildHref: (q: string) => `https://nofluffjobs.com/pl/jobs?search=${encodeURIComponent(q)}` },
  { key: "justjoin", name: "JustJoin.it", buildHref: (q: string) => `https://justjoin.it/?keyword=${encodeURIComponent(q)}` },
  { key: "olx", name: "OLX", buildHref: (q: string) => `https://www.olx.pl/praca/q-${encodeURIComponent(q)}/` },
] as const;

// Job sites are Polish, so search terms need to be in Polish to return results.
const PROFESSION_PL_TRANSLATIONS: Record<string, string> = {
  программист: "programista",
  преподаватель: "nauczyciel",
  водитель: "kierowca",
  строитель: "budowlaniec",
  повар: "kucharz",
  врач: "lekarz",
  медсестра: "pielęgniarka",
  бухгалтер: "księgowy",
  менеджер: "menedżer",
  продавец: "sprzedawca",
  юрист: "prawnik",
  инженер: "inżynier",
  дизайнер: "designer",
  маркетолог: "marketingowiec",
  переводчик: "tłumacz",
  охранник: "ochroniarz",
  уборщик: "sprzątacz",
  электрик: "elektryk",
  сантехник: "hydraulik",
  механик: "mechanik",
};

function translateProfessionToPolish(profession: string): string {
  return PROFESSION_PL_TRANSLATIONS[profession.trim().toLowerCase()] ?? profession;
}

const SPARKLE_ICON = (
  <svg className="h-[17px] w-[17px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
    />
  </svg>
);

const CONTRACT_QUESTIONS = [
  "Что мне выбрать: трудовой договор или B2B?",
  "Как перейти с B2B на трудовой договор?",
  "Какие налоги я плачу при B2B?",
  "Что теряю, если работаю без договора?",
];

function lookupSalary(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return null;
  return SALARY_DATA.find((entry) => entry.keywords.some((k) => q.includes(k))) ?? null;
}

function getSuggestions(query: string): string[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const suggestions = new Set<string>();
  SALARY_DATA.forEach((entry) => {
    const matches = entry.keywords.some((keyword) => keyword.toLowerCase().startsWith(q));
    if (matches) suggestions.add(entry.name);
  });

  return Array.from(suggestions).sort();
}

export default function WorkPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [query, setQuery] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      return window.localStorage.getItem(LAST_PROFESSION_KEY) ?? "";
    } catch {
      return "";
    }
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const result = useMemo(() => lookupSalary(query), [query]);
  const suggestions = useMemo(() => getSuggestions(query), [query]);
  const profession = query.trim();
  const professionPl = useMemo(() => (profession ? translateProfessionToPolish(profession) : ""), [profession]);

  useEffect(() => {
    try {
      // Clearing the search box needs to actually clear what's remembered —
      // previously this only ever wrote non-empty values, so an emptied
      // input still came back on the next visit because the old value was
      // never removed from storage.
      if (profession) {
        window.localStorage.setItem(LAST_PROFESSION_KEY, profession);
      } else {
        window.localStorage.removeItem(LAST_PROFESSION_KEY);
      }
    } catch {
      // Storage can be unavailable (private browsing, quota) — persistence is a nice-to-have here.
    }
  }, [profession]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const CONTRACT_TYPES = [
    { key: "employment" as const, name: t.work.employmentSubtitle, subtitle: t.work.employmentSubtitle === "Трудовой договор" ? "Со всеми гарантиями работника" : "Full employment benefits", features: t.work.employmentFeatures },
    { key: "b2b" as const, name: t.work.b2bContractName, subtitle: t.work.b2bSubtitle, features: t.work.b2bFeatures },
  ];

  return (
    <div className="px-6 py-8 lg:px-10 lg:py-10">
      <PageHeader
        title={
          <span className="inline-flex items-center gap-3">
            {t.work.title}
            <Image src={getFlagUrl("pl", "md")} alt="Poland" width={32} height={24} className="rounded-sm" unoptimized />
          </span>
        }
        subtitle={t.work.subtitle}
      />

      <Reveal delay={40} className="mt-10">
        <h2 className="text-xl font-bold tracking-tight text-text-primary">{t.work.salarySearch}</h2>
        <p className="mt-1 text-sm text-text-muted">{t.work.salarySearchSub}</p>
        <div className="mt-4 rounded-2xl border border-border-subtle bg-surface-1 p-5 backdrop-blur-sm">
          <div ref={searchContainerRef} className="relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => setShowSuggestions(true)}
              placeholder={t.work.placeholder}
              className="w-full rounded-xl border border-border-subtle bg-surface-1 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-[border-color,box-shadow] duration-150 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-border-subtle bg-slate-950 backdrop-blur-sm shadow-lg z-10">
                <ul className="max-h-48 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <li key={`${suggestion}-${index}`}>
                      <button
                        type="button"
                        onMouseDown={(event) => {
                          event.preventDefault();
                          handleSuggestionClick(suggestion);
                        }}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full px-4 py-2.5 text-left text-sm text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {suggestion}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {profession && !result && (
            <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 transition-[opacity,transform] duration-300 ease-[var(--ease-out-strong)] starting:opacity-0 starting:translate-y-2">
              <p className="text-sm font-semibold text-red-300">Такой профессии нет в базе</p>
              <p className="mt-1 text-xs text-red-300/70">Попробуйте одну из этих профессий:</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SALARY_DATA.map((entry) => (
                  <button
                    key={entry.name}
                    type="button"
                    onClick={() => setQuery(entry.name)}
                    className="rounded-full border border-border-strong bg-surface-1 px-3.5 py-1.5 text-xs font-semibold text-text-secondary transition-colors duration-150 hover:border-accent/40 hover:text-accent-bright"
                  >
                    {entry.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {result && (
            <div className="mt-4 transition-[opacity,transform] duration-300 ease-[var(--ease-out-strong)] starting:opacity-0 starting:translate-y-2">
              <p className="text-sm font-medium text-text-secondary">{t.work.averageSalary}</p>
              <p className="mt-2 bg-gradient-to-br from-text-primary to-text-muted bg-clip-text text-3xl font-bold text-transparent">
                {result.pln.toLocaleString("ru-RU")} PLN / месяц
              </p>
              <p className="mt-1 text-lg font-semibold text-accent-bright">
                ≈ €{result.eur.toLocaleString("ru-RU")} / месяц
              </p>
              <p className="mt-3 text-xs text-text-muted">{t.work.salaryNote}</p>

              <div className="mt-5 border-t border-border-subtle pt-4">
                <p className="text-sm font-semibold text-text-primary">{t.work.searchByProfession}</p>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {PROFESSION_JOB_SITES.map((site) => (
                    <a
                      key={site.key}
                      href={site.buildHref(professionPl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-between gap-3 rounded-xl border border-border-subtle bg-surface-1 px-4 py-2.5 text-sm transition-colors duration-150 hover:border-accent/40 hover:bg-accent/5 ${pressScale}`}
                    >
                      <span className="font-semibold text-text-primary">{site.name}</span>
                      <span className="flex flex-shrink-0 items-center gap-1.5 text-xs font-medium text-accent-bright">
                        {t.work.viewVacanciesBtn}
                        <span aria-hidden>→</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Reveal>

      <Reveal delay={120} className="mt-12">
        <h2 className="text-xl font-bold tracking-tight text-text-primary">{t.work.jobSites}</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {JOB_SITES.map((site, index) => (
            <Reveal key={site.key} delay={index * 40}>
              <div className="group flex h-full flex-col rounded-2xl border border-border-subtle bg-surface-1 p-5 backdrop-blur-sm transition-[transform,box-shadow,border-color,background-color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:border-accent/50 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-surface-hover [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_12px_32px_-12px_rgba(33,85,212,0.45)] motion-reduce:transition-none">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-sm font-bold text-accent-bright transition-transform duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105 motion-reduce:transition-none">
                  {site.name.slice(0, 2).toUpperCase()}
                </span>
                <p className="mt-3 text-sm font-semibold text-text-primary">{site.name}</p>
                <p className="mt-1 flex-1 text-xs text-text-muted">{t.work.jobSiteDescs[site.key]}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Link
                    href={site.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/50 px-4 py-2 text-xs font-semibold text-accent-bright transition-[background-color,border-color,color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:border-accent [@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent [@media(hover:hover)_and_(pointer:fine)]:hover:text-white motion-reduce:transition-none ${pressScale}`}
                  >
                    {t.work.visitSite}
                    <span aria-hidden>→</span>
                  </Link>
                  {t.work.guides[site.key] && (
                    <HelpButton
                      guideHeading={t.work.guides[site.key].heading}
                      guideSteps={t.work.guides[site.key].steps}
                      aiQuestion={t.work.guides[site.key].aiQuestion}
                      label={t.helpButton.label}
                    />
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>

      <Reveal delay={160} className="mt-12">
        <h2 className="text-xl font-bold tracking-tight text-text-primary">{t.work.contractVsB2B}</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          {CONTRACT_TYPES.map((type, index) => (
            <Reveal key={type.name} delay={index * 40}>
              <div className="h-full rounded-2xl border border-border-subtle bg-surface-1 p-5 backdrop-blur-sm">
                <p className="text-sm font-semibold text-text-primary">{type.name}</p>
                <p className="text-xs text-text-muted">{type.subtitle}</p>
                <ul className="mt-4 space-y-2.5">
                  {type.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-text-muted">
                      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-bright" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.6 3.6 6.7-6.7a1 1 0 011.4 0z" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                {t.work.guides[type.key] && (
                  <div className="mt-4">
                    <HelpButton
                      guideHeading={t.work.guides[type.key].heading}
                      guideSteps={t.work.guides[type.key].steps}
                      aiQuestion={t.work.guides[type.key].aiQuestion}
                      label={t.helpButton.label}
                    />
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-5 rounded-[28px] bg-[#1c1f26] p-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-bright">
              {SPARKLE_ICON}
            </span>
            <p className="text-[15px] font-bold text-white">Не уверены, что выбрать? Спросите ИИ</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {CONTRACT_QUESTIONS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => router.push(`/dashboard/ai?q=${encodeURIComponent(q)}`)}
                className="rounded-full bg-white/[0.06] px-3.5 py-2.5 text-[13px] text-white/70 transition-colors duration-150 hover:bg-accent hover:text-white"
              >
                {q} →
              </button>
            ))}
          </div>
          <p className="mt-3.5 text-xs text-white/40">Клик по вопросу сразу открывает чат с готовым ответом от ИИ</p>
        </div>
      </Reveal>
    </div>
  );
}
