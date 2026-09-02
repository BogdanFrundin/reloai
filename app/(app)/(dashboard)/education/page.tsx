"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "../../../_components/PageHeader";
import Reveal from "../../../_components/Reveal";
import CitySelect from "../../../_components/CitySelect";
import { useLanguage } from "../../../_components/LanguageProvider";
import type { Dictionary } from "../../../_lib/i18n";
import { useAuth } from "../../../_components/AuthProvider";
import { useCurrency } from "../../../_components/CurrencyProvider";
import { convertPlnText } from "../../../_lib/currency";
import CurrencyHint from "../../../_components/CurrencyHint";
import { getFlagUrl } from "../../../_lib/flags";
import { supabase } from "../../../../lib/supabase";
import { useSelectedCity } from "../../../_lib/useSelectedCity";
import { buildGoogleMapsUrl } from "../../../_lib/mapsLink";
import { getChosenCount, formatChosenCount } from "../../../_lib/chosenCount";

type TabId = "courses" | "schools" | "kindergartens" | "universities";
type FilterId = "all" | "государственный" | "частный";

const TYPE_BY_TAB: Record<TabId, string> = {
  courses: "языковые курсы",
  schools: "школа",
  kindergartens: "детский сад",
  universities: "университет",
};

type EduRow = {
  id: string;
  city: string;
  type: string;
  ownership: string | null;
  name: string;
  address: string | null;
  cost: string | null;
  audience: string | null;
  languages: string[] | null;
  required_docs: string[] | null;
  programs: string[] | null;
  schedule: string | null;
  highlights: string[] | null;
  features: string[] | null;
};

const iconBadgeClass =
  "flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-bright";

const TAB_ICONS: Record<TabId, ReactNode> = {
  courses: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M12 3c2.5 2.7 4 6 4 9s-1.5 6.3-4 9c-2.5-2.7-4-6-4-9s1.5-6.3 4-9z" />
    </svg>
  ),
  schools: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 21v-4a1 1 0 011-1h4a1 1 0 011 1v4M8 7h1m-1 4h1m6-4h1m-1 4h1" />
    </svg>
  ),
  kindergartens: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.5s-7.5-4.6-9.5-9.1C1.2 8.1 3 5 6.2 5c1.9 0 3.3 1 4.3 2.4C11.5 6 12.9 5 14.8 5 18 5 19.8 8.1 18.5 11.4 16.5 15.9 12 20.5 12 20.5z" />
    </svg>
  ),
  universities: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L2 8l10 5 10-5-10-5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 8v6" />
    </svg>
  ),
};

const SPARKLE_ICON = (
  <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a2.25 2.25 0 00-1.632-1.632L15 6.75l1.035-.259a2.25 2.25 0 001.632-1.632L18 3.75l.259 1.035a2.25 2.25 0 001.632 1.632L21 6.75l-1.035.259a2.25 2.25 0 00-1.632 1.632z"
    />
  </svg>
);


type EducationSearchResult = {
  tab: TabId | null;
  ownership: "государственный" | "частный" | null;
  keywords: string[];
  reply: string;
};

function OwnershipBadge({ ownership, t }: { ownership: string | null; t: Dictionary }) {
  if (!ownership) return null;
  return ownership === "государственный" ? (
    <span className="inline-flex flex-shrink-0 items-center rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-[#9fb0e8]">
      {t.education.publicBadge}
    </span>
  ) : (
    <span className="inline-flex flex-shrink-0 items-center rounded-full bg-amber-500/15 px-2.5 py-1 text-[11px] font-semibold text-amber-300">
      {t.education.privateBadge}
    </span>
  );
}

function InfoRow({ label, value, showCurrencyHint }: { label: string; value: string; showCurrencyHint?: boolean }) {
  return (
    <div className="text-xs">
      <p className="flex items-center gap-1 text-white/40">
        {label}
        {showCurrencyHint && <CurrencyHint />}
      </p>
      <p className="mt-0.5 text-white/70">{value}</p>
    </div>
  );
}

function EduCard({ row, icon }: { row: EduRow; icon: ReactNode }) {
  const router = useRouter();
  const { currency, rates } = useCurrency();
  const { t, lang } = useLanguage();
  const ed = t.education;
  const [open, setOpen] = useState(false);
  const cost = convertPlnText(row.cost, currency, rates);
  const chosenCount = formatChosenCount(getChosenCount(row.id), lang);
  const notes = [...(row.highlights ?? []), ...(row.features ?? [])];
  const subtitleParts = [row.audience, row.languages && row.languages.length > 0 ? row.languages.join(", ") : null].filter(
    Boolean
  );

  function askAi() {
    const question = ed.askAiQuestionTemplate.replace("{name}", row.name).replace("{city}", row.city);
    router.push(`/dashboard/ai?q=${encodeURIComponent(question)}`);
  }

  return (
    <div className="group relative flex flex-col rounded-[28px] bg-[#1c1f26] p-6 transition-[transform,box-shadow,background-color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#20242d] [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_16px_36px_-14px_rgba(33,85,212,0.4)] motion-reduce:transition-none">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full flex-1 flex-col items-start gap-4 text-left"
      >
        <div className="flex w-full items-center justify-between gap-2">
          <span className={iconBadgeClass}>{icon}</span>
          <OwnershipBadge ownership={row.ownership} t={t} />
        </div>

        <div>
          <p className="text-[19px] font-bold leading-tight text-white">{row.name}</p>
          <div className="mt-1.5 flex items-center gap-1.5">
            <p className="text-sm font-medium text-accent-bright/70">{cost || ed.priceOnRequestText}</p>
            <CurrencyHint />
          </div>
          {subtitleParts.length > 0 && <p className="mt-2 text-xs text-white/50">{subtitleParts.join(" · ")}</p>}
          <p className="mt-2 flex items-center gap-1.5 text-[11px] text-white/40">
            <svg className="h-3 w-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a4 4 0 100 8 4 4 0 000-8zM2 17a8 8 0 1116 0H2z" />
            </svg>
            {t.common.chosenByCountTemplate.replace("{n}", chosenCount)}
          </p>
        </div>

        {row.programs && row.programs.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {row.programs.slice(0, 3).map((p) => (
              <span key={p} className="rounded-lg bg-white/[0.06] px-2.5 py-1 text-[11px] text-white/60">
                {p}
              </span>
            ))}
            {row.programs.length > 3 && (
              <span className="rounded-lg bg-white/[0.06] px-2.5 py-1 text-[11px] text-white/60">
                +{row.programs.length - 3}
              </span>
            )}
          </div>
        )}
      </button>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex-1 rounded-2xl bg-white/10 py-3 text-[13px] font-bold text-white transition-colors duration-150 hover:bg-accent"
        >
          {open ? t.dashboard.collapseBtn : ed.learnMore}
        </button>
        <button
          type="button"
          onClick={askAi}
          aria-label={ed.askAiAriaTemplate.replace("{name}", row.name)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-white/10 py-3 text-[13px] font-bold text-white transition-colors duration-150 hover:bg-accent"
        >
          {SPARKLE_ICON}
          {ed.askAiBtn}
        </button>
      </div>

      {open && (
        <div className="mt-4 space-y-4 border-t border-white/10 pt-4">
          {row.address && (
            <div>
              <InfoRow label={ed.addressLabel} value={row.address} />
              <a
                href={buildGoogleMapsUrl([row.address, row.city, "Poland"])}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}
                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-accent-bright hover:underline"
              >
                {ed.showOnMapBtn}
              </a>
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            {row.audience && <InfoRow label={ed.forWhomLabel} value={row.audience} />}
            {row.languages && row.languages.length > 0 && <InfoRow label={ed.languageLabel} value={row.languages.join(", ")} />}
            {row.schedule && <InfoRow label={ed.scheduleLabel} value={row.schedule} />}
            {cost && <InfoRow label={ed.costLabel} value={cost} showCurrencyHint />}
          </div>

          {row.required_docs && row.required_docs.length > 0 && (
            <p className="text-xs leading-relaxed text-white/60">
              <span className="font-semibold text-white/80">{ed.documentsLabel}</span>
              {row.required_docs.join("; ")}
            </p>
          )}

          {notes.length > 0 && (
            <p className="rounded-xl bg-white/[0.05] px-3 py-2 text-xs leading-relaxed text-white/60">
              {notes.join(" · ")}
            </p>
          )}

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex w-full items-center justify-center gap-1.5 border-t border-white/10 pt-3 text-xs font-semibold text-white/40 transition-colors duration-150 hover:text-white/80"
          >
            {t.dashboard.collapseBtn}
            <svg className="h-3.5 w-3.5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default function EducationPage() {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const { profile } = useAuth();
  const [city, setCity] = useSelectedCity(profile?.city);
  const [rows, setRows] = useState<EduRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>("universities");
  const [filter, setFilter] = useState<FilterId>("all");
  const [search, setSearch] = useState("");
  const [aiQuery, setAiQuery] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<EducationSearchResult | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    supabase
      .from("education")
      .select("*")
      .eq("city", city)
      .then(({ data }) => {
        if (!active) return;
        setRows((data as EduRow[]) ?? []);
        setAiQuery("");
        setAiResult(null);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [city]);

  function handleTabChange(tab: TabId) {
    setActiveTab(tab);
    setFilter("all");
  }

  const items = useMemo(() => {
    const wantedType = TYPE_BY_TAB[activeTab];
    const term = search.trim().toLowerCase();
    const aiKeywords = (aiResult?.keywords ?? []).map((k) => k.toLowerCase()).filter(Boolean);

    return rows.filter((r) => {
      if (r.type !== wantedType) return false;
      if (filter !== "all" && r.ownership !== filter) return false;
      if (term && !r.name.toLowerCase().includes(term)) return false;

      if (aiKeywords.length > 0) {
        const haystack = [
          r.audience ?? "",
          ...(r.languages ?? []),
          ...(r.programs ?? []),
          ...(r.highlights ?? []),
          ...(r.features ?? []),
        ]
          .join(" ")
          .toLowerCase();
        const matchesAi = aiKeywords.some((k) => haystack.includes(k));
        if (!matchesAi) return false;
      }

      return true;
    });
  }, [rows, activeTab, filter, search, aiResult]);

  async function handleAiSearch() {
    const query = aiQuery.trim();
    if (!query || aiLoading) return;
    setAiLoading(true);
    try {
      const response = await fetch("/api/education-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, language: lang }),
      });
      const result = (await response.json()) as EducationSearchResult;
      setAiResult(result);
      if (result.tab) setActiveTab(result.tab);
      setFilter(result.ownership ?? "all");
    } catch (err) {
      console.error("AI education search failed:", err);
    } finally {
      setAiLoading(false);
    }
  }

  function resetAiSearch() {
    setAiQuery("");
    setAiResult(null);
    setFilter("all");
  }

  const TABS: { id: TabId; label: string }[] = [
    { id: "universities", label: t.education.universitiesTab },
    { id: "schools", label: t.education.schoolsTab },
    { id: "kindergartens", label: t.education.kindergartensTab },
    { id: "courses", label: t.education.coursesTab },
  ];

  return (
    <div className="px-6 py-8 lg:px-10 lg:py-10">
      <PageHeader
        title={
          <span className="inline-flex items-center gap-3">
            {t.education.title}
            <Image src={getFlagUrl("pl", "md")} alt="Poland" width={32} height={24} className="rounded-sm" unoptimized />
          </span>
        }
        subtitle={t.education.subtitle}
      />

      {/* Tab bar + city selector, on the same row */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-150 ${
                activeTab === tab.id ? "bg-accent text-white" : "bg-[#1c1f26] text-white/50 hover:text-white/80"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <CitySelect value={city} onChange={setCity} label={t.common.cityLabel} />
      </div>

      <div className="mt-4 rounded-[28px] bg-[#1c1f26] p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-bright">
            {SPARKLE_ICON}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white">{t.education.aiPickHeading}</p>
            <p className="mt-0.5 text-xs text-white/50">{t.education.aiPickSubtitle}</p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <input
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAiSearch();
                }}
                placeholder={t.education.aiPickPlaceholder}
                className="flex-1 rounded-xl border border-border-strong bg-surface-1 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAiSearch}
                disabled={aiLoading || !aiQuery.trim()}
                className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-50"
              >
                {aiLoading ? t.education.findingBtn : t.education.findBtn}
              </button>
            </div>
            {aiResult && (
              <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl bg-white/[0.05] px-4 py-2.5">
                <span className="text-xs text-white/70">{aiResult.reply}</span>
                <button
                  type="button"
                  onClick={resetAiSearch}
                  className="ml-auto flex-shrink-0 text-xs font-semibold text-accent-bright transition-colors duration-150 hover:text-white"
                >
                  {t.education.resetBtn}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 max-w-sm">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t.education.searchByNamePlaceholder}
          className="w-full rounded-full border border-border-strong bg-surface-1 px-4 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
        />
      </div>

      {/* Filter pills (hidden for courses, which have no ownership split) */}
      {activeTab !== "courses" && (
        <div className="mt-3 flex flex-wrap gap-2">
          {(
            [
              { id: "all", label: t.education.filterAll },
              { id: "государственный", label: t.education.filterPublic },
              { id: "частный", label: t.education.filterPrivate },
            ] as { id: FilterId; label: string }[]
          ).map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors duration-150 ${
                filter === f.id
                  ? "border-accent bg-accent/15 text-accent-bright"
                  : "border-border-strong bg-surface-1 text-text-muted hover:border-border-strong hover:text-text-primary"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {/* items-start (not items-stretch) below: each card's "Подробнее"
          panel can have wildly different amounts of content (programs,
          docs, notes), so forcing every card in a row to match the tallest
          one just left short cards with a big empty gap at the bottom --
          letting each size to its own content looks proportional. */}
      <div className="mt-6">
        {loading ? (
          <p className="py-14 text-center text-sm text-text-muted">{t.guideCard.loading}</p>
        ) : items.length > 0 ? (
          <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((row, i) => (
              <Reveal key={row.id} delay={i * 40}>
                <EduCard row={row} icon={TAB_ICONS[activeTab]} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="py-14 text-center text-sm text-text-muted">{t.education.emptyState}</p>
        )}
      </div>

      <Reveal delay={100} className="mt-10">
        <div className="rounded-[28px] bg-[#1c1f26] p-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-bright">
              {SPARKLE_ICON}
            </span>
            <p className="text-[15px] font-bold text-white">{t.education.needHelpHeading}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {t.education.tabQuestions[activeTab].map((q) => (
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
          <p className="mt-3.5 text-xs text-white/40">{t.education.clickHintText}</p>
        </div>
      </Reveal>
    </div>
  );
}
