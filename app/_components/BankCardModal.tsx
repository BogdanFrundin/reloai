"use client";

import { createPortal } from "react-dom";
import { useState, useEffect, type ReactNode, type MouseEvent as ReactMouseEvent } from "react";
import { useRouter } from "next/navigation";
import type { DocumentGuide } from "./DocumentGuideList";
import { useCurrency } from "./CurrencyProvider";
import { useLanguage } from "./LanguageProvider";
import { convertPlnText } from "../_lib/currency";
import CurrencyPickerModal from "./CurrencyPickerModal";
import TextWithGlossary from "./TextWithGlossary";
import StarRating from "./StarRating";
import { buildGoogleMapsUrl } from "../_lib/mapsLink";
import { pressScale } from "../_lib/motion";
import { getBankAccountInfo, type VisitStatus } from "../_lib/bankAccountInfo";
import { getBankCityMapLinks } from "../_lib/bankBranches";
import { getCityName } from "../_lib/cities";
import { BANK_PHRASES, type PhraseLang } from "../_lib/bankPhrases";

const VISIT_STATUS_STYLE: Record<VisitStatus, { dot: string; text: string; bg: string; border: string }> = {
  online: { dot: "bg-emerald-400", text: "text-emerald-300", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
  onlineIfId: { dot: "bg-sky-400", text: "text-sky-300", bg: "bg-sky-500/10", border: "border-sky-500/30" },
  branch: { dot: "bg-amber-400", text: "text-amber-300", bg: "bg-amber-500/10", border: "border-amber-500/30" },
  courier: { dot: "bg-violet-400", text: "text-violet-300", bg: "bg-violet-500/10", border: "border-violet-500/30" },
};

const PHRASE_LANGS = ["en", "ru", "uz", "tr", "tg", "uk"] as const;

function speakPolish(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const cleaned = text.replace(/\s*\/\s*/g, ", ");
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(cleaned);
  utterance.lang = "pl-PL";
  utterance.rate = 0.92;
  window.speechSynthesis.speak(utterance);
}

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
    "wise": "wise.com",
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
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/95 p-1.5 ring-1 ring-black/5">
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
    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-sm font-semibold text-accent-bright">
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

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border-subtle bg-surface-hover/40 px-3.5 py-3">
      <p className="text-[11px] font-medium uppercase tracking-wide text-text-muted">{label}</p>
      <p className="mt-1 text-sm text-text-secondary">{value}</p>
    </div>
  );
}

function Bullets({ items, tone }: { items: string[]; tone?: "warn" | "accent" }) {
  const textClass = tone === "warn" ? "text-red-300" : "text-text-secondary";
  const dotClass = tone === "warn" ? "bg-red-400" : "bg-accent-bright";
  return (
    <ul className="space-y-1.5">
      {items.map((it) => (
        <li key={it} className={`flex items-start gap-2.5 text-sm leading-relaxed ${textClass}`}>
          <span className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${dotClass}`} />
          {it}
        </li>
      ))}
    </ul>
  );
}

function ExpandToggle({ isExpanded, onToggle, t }: { isExpanded: boolean; onToggle: (e: ReactMouseEvent) => void; t: { collapseBtn: string; expandBtn: string } }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="mt-2.5 inline-flex items-center gap-1 text-xs font-medium text-accent-bright transition-colors hover:underline"
    >
      {isExpanded ? (
        <>
          {t.collapseBtn}
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7-7m0 0L5 14m7-7v12" />
          </svg>
        </>
      ) : (
        <>
          {t.expandBtn}
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 10l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </>
      )}
    </button>
  );
}

// Consistent card-style wrapper used for every content section in the
// modal — same shape and rhythm everywhere (radius, padding, icon-badge
// header), but each section gets one of a handful of accent hues already
// used elsewhere on the site (the same emerald/sky/violet/amber/red set the
// bank-status dots use) so sections read apart from each other at a glance
// instead of blurring into one uniform grey wall of cards.
type SectionTone = "default" | "sky" | "emerald" | "violet" | "warn";

const SECTION_TONE_STYLE: Record<SectionTone, { border: string; iconBg: string; iconText: string; titleText: string }> = {
  default: { border: "border-border-subtle", iconBg: "bg-accent/10", iconText: "text-accent-bright", titleText: "text-text-primary" },
  sky: { border: "border-sky-500/20", iconBg: "bg-sky-500/10", iconText: "text-sky-300", titleText: "text-text-primary" },
  emerald: { border: "border-emerald-500/20", iconBg: "bg-emerald-500/10", iconText: "text-emerald-300", titleText: "text-text-primary" },
  violet: { border: "border-violet-500/20", iconBg: "bg-violet-500/10", iconText: "text-violet-300", titleText: "text-text-primary" },
  warn: { border: "border-red-500/20", iconBg: "bg-red-500/10", iconText: "text-red-400", titleText: "text-red-300/90" },
};

function Section({
  icon,
  title,
  tone = "default",
  children,
}: {
  icon: ReactNode;
  title: string;
  tone?: SectionTone;
  children: ReactNode;
}) {
  const style = SECTION_TONE_STYLE[tone];
  return (
    <div className={`rounded-2xl border ${style.border} bg-surface-hover/40 p-3.5 sm:p-4`}>
      <div className="flex items-center gap-2">
        <div className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${style.iconBg} ${style.iconText}`}>
          {icon}
        </div>
        <p className={`text-base font-bold tracking-tight ${style.titleText}`}>{title}</p>
      </div>
      <div className="mt-2.5">{children}</div>
    </div>
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
  const [currencyPickerOpen, setCurrencyPickerOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
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

  function truncateList<T>(items: T[], count: number = 2): { items: T[]; isTruncated: boolean } {
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

  const accountInfo = getBankAccountInfo(guide.name);
  const rawLink = accountInfo?.onlineUrl || guide.online_url || guide.links?.[0];
  const link = rawLink ? (rawLink.startsWith("http") ? rawLink : `https://${rawLink}`) : null;
  const cost = convertPlnText(guide.cost, currency, rates);
  const phraseLang: PhraseLang = (PHRASE_LANGS as readonly string[]).includes(lang) ? (lang as PhraseLang) : "en";
  const cityMapLinks = getBankCityMapLinks(guide.name);

  function visitStatusLabel(status: VisitStatus): string {
    switch (status) {
      case "online":
        return t.banks.visitStatusOnline;
      case "onlineIfId":
        return t.banks.visitStatusOnlineIfId;
      case "courier":
        return t.banks.visitStatusCourier;
      case "branch":
      default:
        return t.banks.visitStatusBranch;
    }
  }

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

  const infoRows: { label: string; value: string }[] = [];
  if (guide.when_to_get) infoRows.push({ label: gc.whenToGet, value: guide.when_to_get });
  if (guide.working_hours) infoRows.push({ label: gc.workingHours, value: guide.working_hours });
  if (guide.online_booking) infoRows.push({ label: gc.onlineBooking, value: guide.online_booking });
  if (guide.waiting_time) infoRows.push({ label: gc.waitingTime, value: guide.waiting_time });

  const collapseCopy = { collapseBtn: t.common.collapseBtn, expandBtn: t.common.expandBtn };

  return createPortal(
    <>
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
        className="flex w-full max-w-2xl flex-col h-[90vh] rounded-2xl border border-border-subtle bg-panel shadow-2xl shadow-black/40"
        style={{
          animation: "scaleIn 200ms ease-out",
        }}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 border-b border-border-subtle bg-panel px-4 py-4 sm:px-6 sm:py-5 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <BankAvatar name={guide.name} />
            <div className="min-w-0 flex-1">
              <p className="text-lg sm:text-xl font-bold text-text-primary truncate">{guide.name}</p>
              {guide.rating != null && (
                <div className="mt-1 flex items-center gap-1">
                  <StarRating rating={guide.rating} />
                </div>
              )}
              {tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-full border border-border-subtle bg-surface-hover px-2.5 py-1 text-[11px] font-medium text-text-secondary"
                    >
                      {tagLabels[tag]}
                    </span>
                  ))}
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
        <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
          <div className="space-y-2.5 sm:space-y-3">
            {/* Real account-opening status + link (sourced data, see bankAccountInfo.ts) */}
            {accountInfo && (
              <div
                className={`rounded-2xl border p-3.5 sm:p-4 ${VISIT_STATUS_STYLE[accountInfo.visitStatus].border} ${VISIT_STATUS_STYLE[accountInfo.visitStatus].bg}`}
              >
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 flex-shrink-0 rounded-full ${VISIT_STATUS_STYLE[accountInfo.visitStatus].dot}`} />
                  <span className={`text-base font-bold tracking-tight ${VISIT_STATUS_STYLE[accountInfo.visitStatus].text}`}>
                    {visitStatusLabel(accountInfo.visitStatus)}
                  </span>
                </div>
                {accountInfo.keyRequirement && (
                  <p className="mt-2 text-sm font-medium text-text-primary">{accountInfo.keyRequirement}</p>
                )}
                {accountInfo.visitNote && (
                  <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{accountInfo.visitNote}</p>
                )}
                {accountInfo.referral && (
                  <p className="mt-2.5 text-sm text-text-muted">
                    🎁 {t.banks.referralBonusLabel.replace("{amount}", accountInfo.referral.amount)}
                  </p>
                )}
                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className={`mt-3.5 inline-flex items-center justify-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-accent/90 ${pressScale}`}
                  >
                    {t.banks.openAccount}
                    <span aria-hidden>→</span>
                  </a>
                )}
              </div>
            )}

            {/* Description */}
            {guide.description && (
              <div className="space-y-2 px-1">
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
                        <ExpandToggle isExpanded={isExpanded} onToggle={(e) => { e.stopPropagation(); toggleSection(sectionId); }} t={collapseCopy} />
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Important Info */}
            {guide.important_2026 && (
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3.5 sm:p-4 text-sm leading-relaxed text-amber-200">
                {guide.important_2026}
              </div>
            )}

            {/* Info Rows + Cost, as a clean grid instead of a stacked list */}
            {(infoRows.length > 0 || cost) && (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {infoRows.map((row) => (
                  <InfoRow key={row.label} label={row.label} value={row.value} />
                ))}
                {cost && (
                  <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 px-3.5 py-3">
                    <p className="text-[11px] font-medium uppercase tracking-wide text-text-muted">{gc.cost}</p>
                    {currencies.length > 0 ? (
                      <div className="mt-1.5">
                        <CurrencyBadges currencies={currencies} />
                      </div>
                    ) : (
                      <p className="mt-1 text-sm text-text-secondary">{cost}</p>
                    )}
                    {currencies.length === 0 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrencyPickerOpen(true);
                        }}
                        className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-accent/50 bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent-bright transition-colors hover:border-accent hover:bg-accent/20"
                      >
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h11m0 0l-3.5-3.5M18 7l-3.5 3.5M17 17H6m0 0l3.5 3.5M6 17l3.5-3.5" />
                        </svg>
                        {t.settings.currencySection} · {currency}
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Required Docs */}
            {guide.required_docs && guide.required_docs.length > 0 && (
              <Section
                title={gc.requiredDocs}
                icon={
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                }
              >
                {(() => {
                  const sectionId = "required-docs";
                  const isExpanded = expandedSections.has(sectionId);
                  const { items: displayItems, isTruncated } = truncateList(guide.required_docs, 2);

                  return (
                    <>
                      <Bullets items={isExpanded ? guide.required_docs : displayItems} />
                      {isTruncated && (
                        <ExpandToggle isExpanded={isExpanded} onToggle={(e) => { e.stopPropagation(); toggleSection(sectionId); }} t={collapseCopy} />
                      )}
                    </>
                  );
                })()}
              </Section>
            )}

            {/* Instructions */}
            {guide.instructions && guide.instructions.length > 0 && (
              <Section
                title={gc.howToApply}
                tone="emerald"
                icon={
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                }
              >
                {(() => {
                  const sectionId = "instructions";
                  const isExpanded = expandedSections.has(sectionId);
                  const { items: displayItems, isTruncated } = truncateList(guide.instructions, 3);
                  const itemsToShow = isExpanded ? guide.instructions : displayItems;

                  return (
                    <>
                      <ol className="space-y-1.5">
                        {itemsToShow.map((step, i) => (
                          <li key={step} className="flex items-start gap-2.5 text-sm leading-relaxed text-text-secondary">
                            <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-[11px] font-semibold text-accent-bright">
                              {i + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                      {isTruncated && (
                        <ExpandToggle isExpanded={isExpanded} onToggle={(e) => { e.stopPropagation(); toggleSection(sectionId); }} t={collapseCopy} />
                      )}
                    </>
                  );
                })()}
              </Section>
            )}

            {/* Where to Submit (current city address) */}
            {guide.where_to_submit && (
              <Section
                title={gc.whereToSubmit}
                icon={
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
              >
                {(() => {
                  const sectionId = "where-to-submit";
                  const isExpanded = expandedSections.has(sectionId);
                  const { truncated, isTruncated } = truncateText(guide.where_to_submit, 1);
                  const displayText = isExpanded ? guide.where_to_submit : truncated;

                  return (
                    <>
                      <p className="text-sm leading-relaxed text-text-secondary">{displayText}</p>
                      {isTruncated && (
                        <ExpandToggle isExpanded={isExpanded} onToggle={(e) => { e.stopPropagation(); toggleSection(sectionId); }} t={collapseCopy} />
                      )}
                    </>
                  );
                })()}
                <a
                  href={buildGoogleMapsUrl([guide.where_to_submit, "Poland"])}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                  className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-accent/50 bg-transparent text-xs font-medium text-accent-bright transition-colors hover:border-accent hover:bg-accent/10"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {gc.showOnMap}
                </a>
              </Section>
            )}

            {/* Branches by city — Google Maps search per city, all districts included */}
            <Section
              title={t.banks.branchesByCityLabel}
              tone="sky"
              icon={
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              }
            >
              <div className="flex flex-wrap gap-2">
                {cityMapLinks.map(({ city, url }) => (
                  <a
                    key={city}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-surface-1 px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-accent/50 hover:text-accent-bright"
                  >
                    <svg className="h-3 w-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {getCityName(city, lang)}
                  </a>
                ))}
              </div>
            </Section>

            {/* Useful Polish phrases — spoken via the browser's own TTS voice */}
            <Section
              title={t.banks.usefulPhrasesLabel}
              tone="violet"
              icon={
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H2v6h4l5 4V5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728" />
                </svg>
              }
            >
              {(() => {
                const sectionId = "phrases";
                const isExpanded = expandedSections.has(sectionId);
                const { items: displayItems, isTruncated } = truncateList(BANK_PHRASES, 4);
                const itemsToShow = isExpanded ? BANK_PHRASES : displayItems;

                return (
                  <>
                    <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                      {itemsToShow.map((phrase) => (
                        <li
                          key={phrase.id}
                          className="flex items-center gap-2.5 rounded-2xl bg-surface-hover/70 px-3 py-2"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-text-primary">{phrase.pl}</p>
                            <p className="mt-0.5 text-xs text-text-muted">{phrase.translations[phraseLang]}</p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              speakPolish(phrase.pl);
                            }}
                            aria-label="Listen"
                            className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-violet-500/40 text-sm text-violet-300 transition-colors hover:bg-violet-500/10 ${pressScale}`}
                          >
                            🔊
                          </button>
                        </li>
                      ))}
                    </ul>
                    {isTruncated && (
                      <ExpandToggle isExpanded={isExpanded} onToggle={(e) => { e.stopPropagation(); toggleSection(sectionId); }} t={collapseCopy} />
                    )}
                  </>
                );
              })()}
            </Section>

            {/* Tips */}
            {guide.tips && guide.tips.length > 0 && (
              <Section
                title={gc.tips}
                tone="sky"
                icon={
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              >
                {(() => {
                  const sectionId = "tips";
                  const isExpanded = expandedSections.has(sectionId);
                  const { items: displayItems, isTruncated } = truncateList(guide.tips, 2);

                  return (
                    <>
                      <Bullets items={isExpanded ? guide.tips : displayItems} tone="accent" />
                      {isTruncated && (
                        <ExpandToggle isExpanded={isExpanded} onToggle={(e) => { e.stopPropagation(); toggleSection(sectionId); }} t={collapseCopy} />
                      )}
                    </>
                  );
                })()}
              </Section>
            )}

            {/* Common Mistakes */}
            {guide.common_mistakes && guide.common_mistakes.length > 0 && (
              <Section
                title={gc.commonMistakes}
                tone="warn"
                icon={
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4v2m0 5v.01M12 3a9 9 0 100 18 9 9 0 000-18z" />
                  </svg>
                }
              >
                {(() => {
                  const sectionId = "common-mistakes";
                  const isExpanded = expandedSections.has(sectionId);
                  const { items: displayItems, isTruncated } = truncateList(guide.common_mistakes, 2);

                  return (
                    <>
                      <Bullets items={isExpanded ? guide.common_mistakes : displayItems} tone="warn" />
                      {isTruncated && (
                        <ExpandToggle isExpanded={isExpanded} onToggle={(e) => { e.stopPropagation(); toggleSection(sectionId); }} t={collapseCopy} />
                      )}
                    </>
                  );
                })()}
              </Section>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t border-border-subtle px-4 py-4 sm:px-6 sm:py-5 flex gap-2">
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
    </div>
    <CurrencyPickerModal open={currencyPickerOpen} onClose={() => setCurrencyPickerOpen(false)} />
    </>,
    document.body,
  );
}
