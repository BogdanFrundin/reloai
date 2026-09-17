"use client";

import { createPortal } from "react-dom";
import { useState, useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { DocumentGuide } from "./DocumentGuideList";
import { useLanguage } from "./LanguageProvider";
import TextWithGlossary from "./TextWithGlossary";
import { pressScale } from "../_lib/motion";

function Bullets({ items, tone }: { items: string[]; tone?: "warn" | "accent" }) {
  const textClass = tone === "warn" ? "text-red-300" : "text-white/70";
  const dotClass = tone === "warn" ? "bg-red-400" : tone === "accent" ? "bg-accent-bright" : "bg-white/30";
  return (
    <ul className="space-y-1.5">
      {items.map((it) => (
        <li key={it} className={`flex items-start gap-2 text-xs ${textClass}`}>
          <span className={`mt-1.5 h-1 w-1 flex-shrink-0 rounded-full ${dotClass}`} />
          {it}
        </li>
      ))}
    </ul>
  );
}

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

export default function GuideTopicModal({
  guide,
  open,
  onClose,
}: {
  guide: DocumentGuide | null;
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const { t } = useLanguage();
  const gc = t.guideCard;
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open || !guide) return null;

  function toggleSection(sectionId: string) {
    const next = new Set(expandedSections);
    if (next.has(sectionId)) {
      next.delete(sectionId);
    } else {
      next.add(sectionId);
    }
    setExpandedSections(next);
  }

  function truncateText(text: string, sentences: number = 2): { truncated: string; isTruncated: boolean } {
    const sentencePattern = /[^.!?]+[.!?]+/g;
    const matches = text.match(sentencePattern);
    if (!matches || matches.length <= sentences) {
      return { truncated: text, isTruncated: false };
    }
    return {
      truncated: matches.slice(0, sentences).join("").trim(),
      isTruncated: true,
    };
  }

  function truncateList(items: string[], count: number = 2): { items: string[]; isTruncated: boolean } {
    if (items.length <= count) {
      return { items, isTruncated: false };
    }
    return { items: items.slice(0, count), isTruncated: true };
  }

  function askAi() {
    if (!guide) return;
    const question = gc.askAiTopicQuestionTemplate.replace("{name}", guide.name);
    router.push(`/dashboard/ai?q=${encodeURIComponent(question)}`);
  }

  const visual = topicVisual(guide.name);
  const rawLink = guide.online_url || guide.links?.[0];
  const link = rawLink ? (rawLink.startsWith("http") ? rawLink : `https://${rawLink}`) : null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      style={{
        animation: "fadeIn 150ms ease-out",
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex w-full max-w-2xl flex-col h-[90vh] rounded-2xl border border-border-subtle bg-panel shadow-2xl shadow-black/40"
        style={{
          animation: "scaleIn 200ms ease-out",
        }}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 border-b border-border-subtle bg-panel px-4 py-4 sm:px-5 sm:py-5 flex items-start justify-between gap-4">
          <div className="flex items-start gap-2.5 min-w-0 flex-1">
            <div
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: visual.bg, color: visual.text }}
            >
              {visual.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-lg sm:text-xl font-bold text-text-primary truncate">{guide.name}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex-shrink-0 rounded-lg border border-transparent p-1.5 text-text-muted transition-colors hover:text-text-primary"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">
          <div className="space-y-4">
            {/* Description */}
            {guide.description && (
              <div className="space-y-2">
                {guide.description.split("\n\n").map((paragraph, i) => {
                  const sectionId = `description-${i}`;
                  const isExpanded = expandedSections.has(sectionId);
                  const { truncated, isTruncated } = truncateText(paragraph, 2);
                  const displayText = isExpanded ? paragraph : truncated;

                  return (
                    <div key={i}>
                      <p className="text-sm leading-relaxed text-text-secondary">
                        <TextWithGlossary text={displayText} />
                      </p>
                      {isTruncated && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSection(sectionId);
                          }}
                          className="mt-1 inline-flex items-center gap-1 text-xs text-accent-bright transition-colors hover:underline"
                        >
                          {isExpanded ? (
                            <>
                              {t.common.collapseBtn}
                              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7-7m0 0L5 14m7-7v12" />
                              </svg>
                            </>
                          ) : (
                            <>
                              {t.common.expandBtn}
                              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 10l-7 7m0 0l-7-7m7 7V3" />
                              </svg>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Important Info */}
            {guide.important_2026 && (
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs leading-relaxed text-amber-200">
                {guide.important_2026}
              </div>
            )}

            {/* Info Rows */}
            <div className="space-y-3">
              {guide.when_to_get && (
                <div className="text-xs">
                  <p className="text-text-muted">{gc.whenToGet}</p>
                  <p className="mt-0.5 text-text-secondary">{guide.when_to_get}</p>
                </div>
              )}
              {guide.working_hours && (
                <div className="text-xs">
                  <p className="text-text-muted">{gc.workingHours}</p>
                  <p className="mt-0.5 text-text-secondary">{guide.working_hours}</p>
                </div>
              )}
              {guide.online_booking && (
                <div className="text-xs">
                  <p className="text-text-muted">{gc.onlineBooking}</p>
                  <p className="mt-0.5 text-text-secondary">{guide.online_booking}</p>
                </div>
              )}
              {guide.waiting_time && (
                <div className="text-xs">
                  <p className="text-text-muted">{gc.waitingTime}</p>
                  <p className="mt-0.5 text-text-secondary">{guide.waiting_time}</p>
                </div>
              )}
            </div>


            {/* Instructions */}
            {guide.instructions && guide.instructions.length > 0 && (
              <div className="border-t border-white/10 pt-6">
                <div className="flex items-start gap-2.5">
                  <svg className="h-4 w-4 flex-shrink-0 text-text-muted mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  <div className="flex-1">
                    <p className="font-semibold text-sm sm:text-base text-text-primary">{gc.howToApply}</p>
                    {(() => {
                      const sectionId = "instructions";
                      const isExpanded = expandedSections.has(sectionId);
                      const { items: displayItems, isTruncated } = truncateList(guide.instructions, 3);
                      const itemsToShow = isExpanded ? guide.instructions : displayItems;

                      return (
                        <>
                          <ol className="mt-2 space-y-1.5">
                            {itemsToShow.map((step, i) => (
                              <li key={step} className="flex items-start gap-2 text-sm text-text-secondary">
                                <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-[10px] font-semibold text-accent-bright">
                                  {i + 1}
                                </span>
                                {step}
                              </li>
                            ))}
                          </ol>
                          {isTruncated && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSection(sectionId);
                              }}
                              className="mt-2 inline-flex items-center gap-1 text-xs text-accent-bright transition-colors hover:underline"
                            >
                              {isExpanded ? (
                                <>
                                  {t.common.collapseBtn}
                                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7-7m0 0L5 14m7-7v12" />
                                  </svg>
                                </>
                              ) : (
                                <>
                                  {t.common.expandBtn}
                                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 10l-7 7m0 0l-7-7m7 7V3" />
                                  </svg>
                                </>
                              )}
                            </button>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            )}

            {/* Tips */}
            {guide.tips && guide.tips.length > 0 && (
              <div className="border-t border-white/10 pt-6">
                <div className="flex items-start gap-2.5">
                  <svg className="h-4 w-4 flex-shrink-0 text-text-muted mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1">
                    <p className="font-semibold text-sm sm:text-base text-text-primary">{gc.tips}</p>
                    {(() => {
                      const sectionId = "tips";
                      const isExpanded = expandedSections.has(sectionId);
                      const { items: displayItems, isTruncated } = truncateList(guide.tips, 2);

                      return (
                        <>
                          <div className="mt-2">
                            <Bullets items={isExpanded ? guide.tips : displayItems} tone="accent" />
                          </div>
                          {isTruncated && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSection(sectionId);
                              }}
                              className="mt-2 inline-flex items-center gap-1 text-xs text-accent-bright transition-colors hover:underline"
                            >
                              {isExpanded ? (
                                <>
                                  {t.common.collapseBtn}
                                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7-7m0 0L5 14m7-7v12" />
                                  </svg>
                                </>
                              ) : (
                                <>
                                  {t.common.expandBtn}
                                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 10l-7 7m0 0l-7-7m7 7V3" />
                                  </svg>
                                </>
                              )}
                            </button>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            )}

            {/* Common Mistakes */}
            {guide.common_mistakes && guide.common_mistakes.length > 0 && (
              <div className="border-t border-white/10 pt-6 pb-6">
                <div className="flex items-start gap-2.5">
                  <svg className="h-4 w-4 flex-shrink-0 text-red-400/70 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4v2m0 5v.01M12 3a9 9 0 100 18 9 9 0 000-18z" />
                  </svg>
                  <div className="flex-1">
                    <p className="font-semibold text-sm sm:text-base text-red-300/90">{gc.commonMistakes}</p>
                    {(() => {
                      const sectionId = "common-mistakes";
                      const isExpanded = expandedSections.has(sectionId);
                      const { items: displayItems, isTruncated } = truncateList(guide.common_mistakes, 2);

                      return (
                        <>
                          <div className="mt-2">
                            <Bullets items={isExpanded ? guide.common_mistakes : displayItems} tone="warn" />
                          </div>
                          {isTruncated && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSection(sectionId);
                              }}
                              className="mt-2 inline-flex items-center gap-1 text-xs text-accent-bright transition-colors hover:underline"
                            >
                              {isExpanded ? (
                                <>
                                  {t.common.collapseBtn}
                                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7-7m0 0L5 14m7-7v12" />
                                  </svg>
                                </>
                              ) : (
                                <>
                                  {t.common.expandBtn}
                                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 10l-7 7m0 0l-7-7m7 7V3" />
                                  </svg>
                                </>
                              )}
                            </button>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t border-border-subtle px-4 py-4 sm:px-5 sm:py-5 flex gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              askAi();
            }}
            className={`flex-1 rounded-full bg-slate-700 px-5 py-2.5 text-xs font-semibold text-white transition-colors duration-150 hover:bg-slate-600 ${pressScale}`}
          >
            {gc.askAi} ✦
          </button>
          <button
            type="button"
            onClick={onClose}
            className={`flex-1 rounded-full border border-border-strong bg-surface-1 px-5 py-2.5 text-xs font-semibold text-text-secondary transition-colors duration-150 hover:border-border-strong hover:text-text-primary ${pressScale}`}
          >
            {t.dashboard.collapseBtn} ^
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
