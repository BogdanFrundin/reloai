"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { DocumentGuide } from "./DocumentGuideList";
import { useLanguage } from "./LanguageProvider";
import TextWithGlossary from "./TextWithGlossary";
import GuideTopicModal from "./GuideTopicModal";
import { pressScale } from "../_lib/motion";
import { getChosenCount, formatChosenCount } from "../_lib/chosenCount";

const SCALE_ICON = (
  <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v18M4 7h16M4 7l-2 5a3 3 0 006 0l-2-5m14 0l-2 5a3 3 0 006 0l-2-5M8 21h8"
    />
  </svg>
);

const STETHOSCOPE_ICON = (
  <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v5a4 4 0 008 0V3M9 12v2a5 5 0 0010 0v-2" />
    <circle cx="19" cy="16" r="2" />
  </svg>
);

const ID_CARD_ICON = (
  <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <circle cx="8.5" cy="12" r="2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 16.5c0-1.4 1.2-2.5 2.5-2.5S11 15.1 11 16.5M14 10h4M14 13.5h4" />
  </svg>
);

const FILE_TEXT_ICON = (
  <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 3v5h5M9 13h6M9 17h6M9 9h2" />
  </svg>
);

const CAR_ICON = (
  <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 11l1.5-4.5A2 2 0 018.4 5h7.2a2 2 0 011.9 1.5L19 11m-14 0h14m-14 0a2 2 0 00-2 2v3a1 1 0 001 1h1m14-6a2 2 0 012 2v3a1 1 0 01-1 1h-1m-14 0v1a1 1 0 001 1h1a1 1 0 001-1v-1m10 0v1a1 1 0 001 1h1a1 1 0 001-1v-1"
    />
  </svg>
);

const PLANE_ICON = (
  <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 3L3 10.5l7 2.5m11-10l-7 18-2.5-7.5m9.5-10.5L10.5 13" />
  </svg>
);

const HEART_ICON = (
  <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 20.5s-7.5-4.6-9.5-9.1C1.2 8.1 3 5 6.2 5c1.9 0 3.3 1 4.3 2.4C11.5 6 12.9 5 14.8 5 18 5 19.8 8.1 18.5 11.4 16.5 15.9 12 20.5 12 20.5z"
    />
  </svg>
);

const SHIELD_ICON = (
  <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
  </svg>
);

const TOPIC_ICONS: { match: RegExp; icon: ReactNode; ramp: string }[] = [
  { match: /nfz|частн/i, icon: SCALE_ICON, ramp: "blue" },
  { match: /врач|poz|приём/i, icon: STETHOSCOPE_ICON, ramp: "green" },
  { match: /ekuz|карт/i, icon: ID_CARD_ICON, ramp: "teal" },
  { match: /справк/i, icon: FILE_TEXT_ICON, ramp: "coral" },
  { match: /автомобил|ac\b|oc\b|транспорт/i, icon: CAR_ICON, ramp: "amber" },
  { match: /путешеств|travel|поездк/i, icon: PLANE_ICON, ramp: "purple" },
  { match: /жизн/i, icon: HEART_ICON, ramp: "pink" },
];

const RAMP_STYLES: Record<string, { bg: string; text: string }> = {
  blue: { bg: "rgba(91,141,239,0.15)", text: "#8fb4f4" },
  green: { bg: "rgba(126,203,163,0.15)", text: "#7ecba3" },
  teal: { bg: "rgba(143,212,224,0.15)", text: "#8fd4e0" },
  coral: { bg: "rgba(231,155,126,0.15)", text: "#e79b7e" },
  amber: { bg: "rgba(240,192,96,0.15)", text: "#f0c060" },
  purple: { bg: "rgba(175,169,236,0.15)", text: "#afa9ec" },
  pink: { bg: "rgba(237,147,177,0.15)", text: "#ed93b1" },
};

function topicVisual(name: string): { icon: ReactNode; bg: string; text: string } {
  const found = TOPIC_ICONS.find((t) => t.match.test(name));
  const ramp = found?.ramp ?? "blue";
  const style = RAMP_STYLES[ramp];
  return { icon: found?.icon ?? SHIELD_ICON, bg: style.bg, text: style.text };
}

function TopicCard({ guide }: { guide: DocumentGuide }) {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const gc = t.guideCard;
  const [modalOpen, setModalOpen] = useState(false);
  const [expandDescription, setExpandDescription] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const visual = topicVisual(guide.name);
  const chosenCount = formatChosenCount(getChosenCount(guide.id), lang);

  function askAi() {
    const question = gc.askAiTopicQuestionTemplate.replace("{name}", guide.name);
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
    <>
      <div ref={cardRef} className="group relative flex min-h-[280px] flex-col rounded-2xl border border-border-subtle bg-surface-1 transition-[transform,box-shadow,background-color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-lg hover:shadow-accent/20 motion-reduce:transition-none p-4 sm:p-5">
        <div className="flex w-full flex-1 flex-col items-start gap-4 text-left">
          <div className="relative">
            <span
              className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl"
              style={{
                backgroundColor: visual.bg,
                color: visual.text,
              }}
            >
              <span style={{ fontSize: '22px', lineHeight: 1 }}>
                {visual.icon}
              </span>
            </span>
          </div>

          <div className="w-full min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="line-clamp-2 text-lg sm:text-xl font-bold text-text-primary">
                <TextWithGlossary text={guide.name} />
              </p>
              {guide.important_2026 && (
                <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                  {gc.important2026Badge}
                </span>
              )}
            </div>
            {guide.description && (
              <div className="mt-2 flex items-start justify-between gap-2">
                <p className={`flex-1 text-xs leading-relaxed text-white/50 ${!expandDescription ? "line-clamp-2" : ""}`}>
                  {guide.description}
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandDescription(!expandDescription);
                  }}
                  className="flex-shrink-0 flex items-center justify-center h-5 w-5 text-text-secondary transition-transform duration-150 hover:text-accent-bright"
                  aria-label={expandDescription ? "Свернуть описание" : "Развернуть описание"}
                >
                  <svg className={`h-5 w-5 transition-transform duration-150 ${expandDescription ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}
            <p className="mt-2 flex items-center gap-1.5 text-[11px] text-blue-300/80">
              <svg className="h-3 w-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a4 4 0 100 8 4 4 0 000-8zM2 17a8 8 0 1116 0H2z" />
              </svg>
              {t.common.chosenByCountTemplate.replace("{n}", chosenCount)}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2" onClick={(event) => event.stopPropagation()}>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex-1 rounded-xl border border-border-subtle bg-surface-hover text-accent-bright px-3 py-2.5 text-xs font-semibold transition-colors duration-150 hover:border-accent/40 hover:bg-accent/10"
          >
            {gc.moreDetails}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              askAi();
            }}
            className="flex-1 rounded-xl bg-slate-700 px-4 py-2.5 text-xs font-semibold text-white transition-colors duration-150 hover:bg-slate-600"
          >
            {gc.askAi} ✦
          </button>
        </div>
      </div>

      <GuideTopicModal guide={guide} open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export default function GuideTopicGrid({
  guides,
  loading,
  emptyText,
  searchPlaceholder,
}: {
  guides: DocumentGuide[];
  loading: boolean;
  emptyText: string;
  searchPlaceholder?: string;
}) {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const term = search.trim().toLowerCase();
  const filtered = term
    ? guides.filter(
        (g) => g.name.toLowerCase().includes(term) || (g.description ?? "").toLowerCase().includes(term)
      )
    : guides;

  return (
    <div>
      <div className="mb-4 max-w-sm">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={searchPlaceholder ?? t.guideCard.searchGeneric}
          className="w-full rounded-full border border-border-strong bg-white/[0.1] px-4 py-2 text-sm text-text-primary placeholder:text-white/70 focus:border-accent focus:outline-none"
        />
      </div>
      {loading ? (
        <p className="text-sm text-text-muted">{t.guideCard.loading}</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-text-muted">{emptyText}</p>
      ) : (
        <div className="grid items-stretch gap-4 sm:grid-cols-2">
          {filtered.map((g) => (
            <TopicCard key={g.id} guide={g} />
          ))}
        </div>
      )}
    </div>
  );
}
