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

function OwnershipBadge({ ownership }: { ownership: string | null }) {
  if (!ownership) return null;
  return ownership === "государственный" ? (
    <span className="inline-flex flex-shrink-0 items-center rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-[#9fb0e8]">
      Гос.
    </span>
  ) : (
    <span className="inline-flex flex-shrink-0 items-center rounded-full bg-amber-500/15 px-2.5 py-1 text-[11px] font-semibold text-amber-300">
      Частный
    </span>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-xs">
      <p className="text-white/40">{label}</p>
      <p className="mt-0.5 text-white/70">{value}</p>
    </div>
  );
}

function EduCard({ row, icon }: { row: EduRow; icon: ReactNode }) {
  const [open, setOpen] = useState(false);
  const notes = [...(row.highlights ?? []), ...(row.features ?? [])];
  const subtitleParts = [row.audience, row.languages && row.languages.length > 0 ? row.languages.join(", ") : null].filter(
    Boolean
  );

  return (
    <div className="relative flex h-full flex-col rounded-[28px] bg-[#1c1f26] p-6">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full flex-1 flex-col items-start gap-4 text-left"
      >
        <div className="flex w-full items-center justify-between gap-2">
          <span className={iconBadgeClass}>{icon}</span>
          <OwnershipBadge ownership={row.ownership} />
        </div>

        <div>
          <p className="text-[13px] font-medium text-white/50">{row.name}</p>
          <p className="mt-1 text-[22px] font-bold leading-tight text-white">{row.cost || "Уточняйте цену"}</p>
          {subtitleParts.length > 0 && <p className="mt-2 text-xs text-white/50">{subtitleParts.join(" · ")}</p>}
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

      <div className="mt-4">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="w-full rounded-2xl bg-white/10 py-3 text-[13px] font-bold text-white transition-colors duration-150 hover:bg-white/15"
        >
          {open ? "Скрыть" : "Подробнее"} →
        </button>
      </div>

      {open && (
        <div className="mt-4 space-y-4 border-t border-white/10 pt-4">
          {row.address && <InfoRow label="Адрес" value={row.address} />}

          <div className="grid gap-3 sm:grid-cols-2">
            {row.audience && <InfoRow label="Для кого" value={row.audience} />}
            {row.languages && row.languages.length > 0 && <InfoRow label="Язык" value={row.languages.join(", ")} />}
            {row.schedule && <InfoRow label="График" value={row.schedule} />}
            {row.cost && <InfoRow label="Стоимость" value={row.cost} />}
          </div>

          {row.required_docs && row.required_docs.length > 0 && (
            <p className="text-xs leading-relaxed text-white/60">
              <span className="font-semibold text-white/80">Документы: </span>
              {row.required_docs.join("; ")}
            </p>
          )}

          {notes.length > 0 && (
            <p className="rounded-xl bg-white/[0.05] px-3 py-2 text-xs leading-relaxed text-white/60">
              {notes.join(" · ")}
            </p>
          )}
        </div>
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
        <CitySelect value={city} onChange={setCity} label="Город" />
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

      <div className="mt-6">
        {loading ? (
          <p className="py-14 text-center text-sm text-text-muted">Загрузка…</p>
        ) : items.length > 0 ? (
          <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
