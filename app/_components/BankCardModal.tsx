"use client";

import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { DocumentGuide } from "./DocumentGuideList";
import { useCurrency } from "./CurrencyProvider";
import { useLanguage } from "./LanguageProvider";
import { convertPlnText } from "../_lib/currency";
import CurrencyHint from "./CurrencyHint";
import TextWithGlossary from "./TextWithGlossary";
import StarRating from "./StarRating";
import { buildGoogleMapsUrl } from "../_lib/mapsLink";
import { pressScale } from "../_lib/motion";

// Reuse helper functions from BankCardGrid
function BankAvatar({ name }: { name: string }) {
  const BANK_DOMAINS: Record<string, string> = {
    "aion bank": "aionbank.pl",
    "alior bank": "aliorbank.pl",
    "bank millennium": "bankmillennium.pl",
    "bank pekao": "pekao.com.pl",
    "pko bank polski": "pkobp.pl",
    "pko bp": "pkobp.pl",
    "mbank": "mbank.pl",
    "ing bank śląski": "ing.pl",
    "ing bank slaski": "ing.pl",
    "santander": "santander.pl",
    "bnp paribas": "bnpparibas.pl",
    "citi handlowy": "citibank.pl",
    "credit agricole": "credit-agricole.pl",
    "bank ochrony środowiska": "bosbank.pl",
    "boś bank": "bosbank.pl",
    "nest bank": "nestbank.pl",
    "velobank": "velobank.pl",
    "revolut": "revolut.com",
    "n26": "n26.com",
    "erste": "erstebank.com",
    "plus bank": "plusbank.pl",
    "toyota bank": "toyotabank.pl",
    "volkswagen bank": "vwbank.pl",
    "bank pocztowy": "pocztowy.pl",
  };

  const LOCAL_LOGO_SLUGS = new Set([
    "aionbank",
    "bnpparibas",
    "creditagricole",
    "erstebank",
    "plusbank",
    "pocztowy",
    "toyotabank",
    "vwbank",
  ]);

  function findLogoDomain(name: string): string | null {
    const lower = name.toLowerCase();
    for (const [key, domain] of Object.entries(BANK_DOMAINS)) {
      if (lower.includes(key)) return domain;
    }
    return null;
  }

  function bankLogoSlug(domain: string): string {
    return domain.split(".")[0].replace(/[^a-z0-9]/gi, "").toLowerCase();
  }

  function hasLocalLogo(domain: string): boolean {
    return LOCAL_LOGO_SLUGS.has(bankLogoSlug(domain));
  }

  function localLogoSrc(domain: string): string {
    return `/images/logos/banks/${bankLogoSlug(domain)}.png`;
  }

  function logoSrc(domain: string, stage: -1 | 0 | 1): string {
    if (stage === -1) return localLogoSrc(domain);
    return stage === 0
      ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
      : `https://icons.duckduckgo.com/ip3/${domain}.ico`;
  }

  const domain = findLogoDomain(name);
  const [stage, setStage] = useState<-1 | 0 | 1 | 2>(() => (domain && hasLocalLogo(domain) ? -1 : 0));
  const initials = name
    .replace(/^Bank\s+/i, "")
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (domain && stage < 2) {
    return (
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/95 p-1.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc(domain, stage === 2 ? 1 : stage)}
          alt={name}
          className="h-full w-full object-contain"
          onError={() => setStage((prev) => (prev === -1 ? 0 : prev === 0 ? 1 : 2))}
        />
      </div>
    );
  }
  return (
    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-sm font-semibold text-accent-bright">
      {initials}
    </div>
  );
}

function CurrencyBadges({ currencies }: { currencies: string[] }) {
  const currencyNames: Record<string, string> = {
    PLN: "PLN",
    EUR: "EUR",
    USD: "USD",
    GBP: "GBP",
    CHF: "CHF",
    SEK: "SEK",
    NOK: "NOK",
    DKK: "DKK",
    CZK: "CZK",
    HUF: "HUF",
  };

  return (
    <div className="flex flex-wrap gap-1.5">
      {currencies.map((code) => (
        <span
          key={code}
          className="inline-flex items-center gap-1 rounded-full border border-border-subtle bg-surface-hover px-2.5 py-1 text-xs font-medium text-text-secondary"
        >
          {currencyNames[code] || code}
        </span>
      ))}
    </div>
  );
}

function InfoRow({ label, value, showCurrencyHint, currencies, asPanel }: { label: string; value: string; showCurrencyHint?: boolean; currencies?: string[]; asPanel?: boolean }) {
  const content = (
    <div className={asPanel ? "text-xs" : "text-xs"}>
      <p className="flex items-center gap-1 text-text-muted">
        {label}
        {showCurrencyHint && <CurrencyHint />}
      </p>
      {currencies && currencies.length > 0 ? (
        <div className="mt-1.5">
          <CurrencyBadges currencies={currencies} />
        </div>
      ) : (
        <p className="mt-0.5 text-text-secondary">{value}</p>
      )}
    </div>
  );

  if (asPanel) {
    return (
      <div className="rounded-xl border border-border-subtle bg-surface-hover p-3">
        {content}
      </div>
    );
  }

  return content;
}

function Bullets({ items, tone }: { items: string[]; tone?: "warn" | "accent" }) {
  const textClass = tone === "warn" ? "text-red-300" : tone === "accent" ? "text-text-secondary" : "text-text-secondary";
  const dotClass = tone === "warn" ? "bg-red-400" : tone === "accent" ? "bg-accent-bright" : "bg-accent-bright";
  return (
    <ul className="space-y-1.5">
      {items.map((it) => (
        <li key={it} className={`flex items-start gap-2 text-sm ${textClass}`}>
          <span className={`mt-1.5 h-1 w-1 flex-shrink-0 rounded-full ${dotClass}`} />
          {it}
        </li>
      ))}
    </ul>
  );
}

const TAG_ORDER = ["no_pesel", "fully_online", "free", "multicurrency"] as const;

export default function BankCardModal({
  guide,
  open,
  onClose,
  chosenBank,
  onChoose,
}: {
  guide: DocumentGuide | null;
  open: boolean;
  onClose: () => void;
  chosenBank: string | null | undefined;
  onChoose: (name: string | null) => void;
}) {
  const router = useRouter();
  const { currency, rates } = useCurrency();
  const { t, lang } = useLanguage();
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
    const question = gc.askAiBankQuestionTemplate.replace("{name}", guide.name);
    router.push(`/dashboard/ai?q=${encodeURIComponent(question)}`);
  }

  const rawLink = guide.online_url || guide.links?.[0];
  const link = rawLink ? (rawLink.startsWith("http") ? rawLink : `https://${rawLink}`) : null;
  const cost = convertPlnText(guide.cost, currency, rates);

  const extractCurrencies = (text: string | null | undefined): string[] => {
    if (!text) return [];
    const currencyPattern = /\b[A-Z]{3}\b/g;
    const matches = text.match(currencyPattern) || [];
    return Array.from(new Set(matches)).filter(
      (code) => ["PLN", "EUR", "USD", "GBP", "CHF", "SEK", "NOK", "DKK", "CZK", "HUF"].includes(code)
    );
  };
  const currencies = extractCurrencies(guide.price_label || guide.cost);

  const tagLabels: Record<string, string> = {
    no_pesel: gc.tags.noPesel,
    fully_online: gc.tags.fullyOnline,
    free: gc.tags.free,
    multicurrency: gc.tags.multicurrency,
  };

  const tags = TAG_ORDER.filter((tag) => guide.tags?.includes(tag));
  const tagSubtitle = tags.map((tag) => tagLabels[tag]).join(" · ");

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in"
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
        className="flex w-full max-w-2xl flex-col h-[90vh] rounded-2xl border border-border-subtle bg-surface-1 shadow-2xl shadow-black/40"
        style={{
          animation: "scaleIn 200ms ease-out",
        }}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 border-b border-border-subtle bg-surface-1 px-4 py-4 sm:px-5 sm:py-5 flex items-start justify-between gap-4">
          <div className="flex items-start gap-2.5 min-w-0 flex-1">
            <BankAvatar name={guide.name} />
            <div className="min-w-0 flex-1">
              <p className="text-lg sm:text-xl font-bold text-text-primary truncate">{guide.name}</p>
              {guide.rating != null && (
                <div className="mt-1 flex items-center gap-1">
                  <StarRating rating={guide.rating} />
                </div>
              )}
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
            {/* Tags and Buttons Section */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full border border-border-subtle bg-surface-hover px-2.5 py-1 text-xs font-medium text-text-secondary"
                  >
                    {tagLabels[tag]}
                  </span>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                askAi();
              }}
              className="inline-flex rounded-xl bg-slate-700 px-4 py-2.5 text-xs font-semibold text-white transition-colors duration-150 hover:bg-slate-600"
            >
              {gc.askAi} ✦
            </button>

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
              {guide.when_to_get && <InfoRow label={gc.whenToGet} value={guide.when_to_get} />}
              {guide.working_hours && <InfoRow label={gc.workingHours} value={guide.working_hours} />}
              {guide.online_booking && <InfoRow label={gc.onlineBooking} value={guide.online_booking} />}
              {guide.waiting_time && <InfoRow label={gc.waitingTime} value={guide.waiting_time} />}
            </div>

            {/* Where to Submit */}
            {guide.where_to_submit && (
              <div>
                <div className="flex items-start gap-2.5">
                  <svg className="h-4 w-4 flex-shrink-0 text-text-muted mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm sm:text-base text-text-primary">{gc.whereToSubmit}</p>
                    {(() => {
                      const sectionId = "where-to-submit";
                      const isExpanded = expandedSections.has(sectionId);
                      const { truncated, isTruncated } = truncateText(guide.where_to_submit, 1);
                      const displayText = isExpanded ? guide.where_to_submit : truncated;

                      return (
                        <>
                          <p className="mt-1.5 text-sm text-text-secondary">{displayText}</p>
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
                        </>
                      );
                    })()}
                    <a
                      href={buildGoogleMapsUrl([guide.where_to_submit, "Poland"])}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-accent/50 bg-transparent text-xs font-medium text-accent-bright transition-colors hover:border-accent hover:bg-accent/10"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {gc.showOnMap}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Cost */}
            {cost && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-transparent text-xs font-medium text-white/80 transition-colors hover:border-white/30 hover:bg-white/5">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {currencies && currencies.length > 0 ? (
                  <span>{gc.cost}</span>
                ) : (
                  <span>{cost}</span>
                )}
              </div>
            )}

            {/* Required Docs */}
            {guide.required_docs && guide.required_docs.length > 0 && (
              <div className="border-t border-white/10 pt-6">
                <div className="flex items-start gap-2.5">
                  <svg className="h-4 w-4 flex-shrink-0 text-text-muted mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <div className="flex-1">
                    <p className="font-semibold text-sm sm:text-base text-text-primary">{gc.requiredDocs}</p>
                    {(() => {
                      const sectionId = "required-docs";
                      const isExpanded = expandedSections.has(sectionId);
                      const { items: displayItems, isTruncated } = truncateList(guide.required_docs, 2);

                      return (
                        <>
                          <div className="mt-2">
                            <Bullets items={isExpanded ? guide.required_docs : displayItems} />
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

        {/* Close Button */}
        <div className="border-t border-border-subtle px-4 py-4 sm:px-5 sm:py-5">
          <button
            type="button"
            onClick={onClose}
            className={`w-full flex items-center justify-center gap-1.5 rounded-full border border-border-strong bg-surface-1 px-5 py-2.5 text-sm font-semibold text-text-secondary transition-colors duration-150 hover:border-border-strong hover:text-text-primary ${pressScale}`}
          >
            {t.dashboard.collapseBtn} ^
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
