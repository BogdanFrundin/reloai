"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import PageHeader from "../../../_components/PageHeader";
import Reveal from "../../../_components/Reveal";
import CitySelect from "../../../_components/CitySelect";
import { useLanguage } from "../../../_components/LanguageProvider";
import { useAuth } from "../../../_components/AuthProvider";
import { getFlagUrl } from "../../../_lib/flags";
import { supabase } from "../../../../lib/supabase";
import { DEFAULT_CITY, isCityName, type CityName } from "../../../_lib/cities";

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

const cardHoverClass =
  "group flex h-full flex-col rounded-2xl border border-border-subtle bg-surface-1 p-5 backdrop-blur-sm transition-[transform,box-shadow,border-color,background-color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:border-accent/50 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-surface-hover [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_12px_32px_-12px_rgba(33,85,212,0.45)] motion-reduce:transition-none";

const iconBadgeClass =
  "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-bright transition-transform duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105 motion-reduce:transition-none";

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

function OwnershipBadge({ ownership }: { ownership: string | null }) {
  if (!ownership) return null;
  return ownership === "государственный" ? (
    <span className="inline-flex flex-shrink-0 items-center rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold text-accent-bright">
      Государственный
    </span>
  ) : (
    <span className="inline-flex flex-shrink-0 items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-400">
      Частный
    </span>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3 text-xs">
      <span className="flex-shrink-0 text-text-muted">{label}</span>
      <span className={`text-right ${highlight ? "font-semibold text-text-primary" : "text-text-secondary"}`}>{value}</span>
    </div>
  );
}

function EduCard({ row, icon }: { row: EduRow; icon: ReactNode }) {
  const notes = [...(row.highlights ?? []), ...(row.features ?? [])];
  return (
    <div className={cardHoverClass}>
      <span className={iconBadgeClass}>{icon}</span>
      <div className="mt-3 flex items-start justify-between gap-2">
        <p className="text-sm font-semibold leading-snug text-text-primary">{row.name}</p>
        <OwnershipBadge ownership={row.ownership} />
      </div>
      {row.address && <p className="mt-1 text-xs text-text-muted">{row.address}</p>}

      <div className="mt-4 space-y-2 border-t border-border-subtle pt-3">
        {row.audience && <Row label="Для кого" value={row.audience} />}
        {row.languages && row.languages.length > 0 && <Row label="Язык" value={row.languages.join(", ")} />}
        {row.cost && <Row label="Стоимость" value={row.cost} highlight />}
        {row.schedule && <Row label="График" value={row.schedule} />}
      </div>

      {row.programs && row.programs.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {row.programs.slice(0, 3).map((p) => (
            <span key={p} className="rounded-md bg-surface-1 px-2 py-0.5 text-[11px] text-text-muted">
              {p}
            </span>
          ))}
          {row.programs.length > 3 && (
            <span className="rounded-md bg-surface-1 px-2 py-0.5 text-[11px] text-text-muted">
              +{row.programs.length - 3}
            </span>
          )}
        </div>
      )}

      {row.required_docs && row.required_docs.length > 0 && (
        <p className="mt-3 text-[11px] leading-relaxed text-text-muted">
          <span className="font-semibold text-text-secondary">Документы: </span>
          {row.required_docs.join("; ")}
        </p>
      )}

      {notes.length > 0 && (
        <p className="mt-2 rounded-xl bg-surface-1 px-3 py-2 text-[11px] leading-relaxed text-text-muted">
          {notes.slice(0, 3).join(" · ")}
        </p>
      )}
    </div>
  );
}

export default function EducationPage() {
  const { t } = useLanguage();
  const { profile } = useAuth();
  const [city, setCity] = useState<CityName>(DEFAULT_CITY);
  const [rows, setRows] = useState<EduRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>("courses");
  const [filter, setFilter] = useState<FilterId>("all");
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
    supabase
      .from("education")
      .select("*")
      .eq("city", city)
      .then(({ data }) => {
        if (!active) return;
        setRows((data as EduRow[]) ?? []);
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
    return rows.filter((r) => {
      if (r.type !== wantedType) return false;
      if (filter !== "all" && r.ownership !== filter) return false;
      return true;
    });
  }, [rows, activeTab, filter]);

  const TABS: { id: TabId; label: string }[] = [
    { id: "courses", label: t.education.coursesTab },
    { id: "schools", label: t.education.schoolsTab },
    { id: "kindergartens", label: t.education.kindergartensTab },
    { id: "universities", label: t.education.universitiesTab },
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

      <div className="mt-6 flex justify-end">
        <CitySelect value={city} onChange={setCity} label="Город" />
      </div>

      {/* Tab bar */}
      <div className="mt-4 flex gap-1 overflow-x-auto rounded-2xl border border-border-subtle bg-surface-1 p-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleTabChange(tab.id)}
            className={`flex-shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-150 ${
              activeTab === tab.id
                ? "bg-accent text-white shadow-[0_0_20px_-6px_var(--accent)]"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filter pills (hidden for courses, which have no ownership split) */}
      {activeTab !== "courses" && (
        <div className="mt-4 flex flex-wrap gap-2">
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

      <div className="mt-6">
        {loading ? (
          <p className="py-14 text-center text-sm text-text-muted">Загрузка…</p>
        ) : items.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((row, i) => (
              <Reveal key={row.id} delay={i * 40} className="h-full">
                <EduCard row={row} icon={TAB_ICONS[activeTab]} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="py-14 text-center text-sm text-text-muted">{t.education.emptyState}</p>
        )}
      </div>
    </div>
  );
}
