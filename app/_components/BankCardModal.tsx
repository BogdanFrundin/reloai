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
import { pressScale } from "../_lib/motion";
import { getBankAccountInfo, type VisitStatus } from "../_lib/bankAccountInfo";
import { getBankCityMapLinks } from "../_lib/bankBranches";
import { getCityName } from "../_lib/cities";
import { BANK_PHRASES, type PhraseLang } from "../_lib/bankPhrases";
import NearestBranchFinder from "./NearestBranchFinder";

const VISIT_STATUS_STYLE: Record<VisitStatus, { dot: string; text: string; bg: string; border: string }> = {
  online: { dot: "bg-emerald-400", text: "text-emerald-300", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
  onlineIfId: { dot: "bg-sky-400", text: "text-sky-300", bg: "bg-sky-500/10", border: "border-sky-500/30" },
  branch: { dot: "bg-amber-400", text: "text-amber-200/90", bg: "bg-amber-500/10", border: "border-amber-500/30" },
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
      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-white/95 p-2 ring-1 ring-black/5 shadow-sm">
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
    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-base font-semibold text-accent-bright">
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

  const currencyFlags: Record<string, string> = {
    PLN: "🇵🇱",
    EUR: "🇪🇺",
    USD: "🇺🇸",
    GBP: "🇬🇧",
    CHF: "🇨🇭",
    SEK: "🇸🇪",
    NOK: "🇳🇴",
    DKK: "🇩🇰",
    CZK: "🇨🇿",
    HUF: "🇭🇺",
  };

  return (
    <div className="flex flex-wrap gap-1.5">
      {currencies.map((code) => (
        <span
          key={code}
          className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-surface-hover/40 py-1 pl-1 pr-3 text-sm font-semibold text-text-secondary"
        >
          <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/95 text-[13px] leading-none ring-1 ring-black/5">
            {currencyFlags[code] || "💱"}
          </span>
          {currencyNames[code] || code}
        </span>
      ))}
    </div>
  );
}

// Small hand-drawn illustrations (inline SVG, no external image assets —
// nothing to break or fail to load) used to give the header and a couple
// of overview cards actual "picture" content instead of just icon + text.

// Stylized night skyline with a columned bank-facade landmark building,
// used as the decorative art behind the modal header.
function SkylineHeroArt() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 160"
      preserveAspectRatio="xMaxYMax slice"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-80"
    >
      <defs>
        <linearGradient id="bcmSkyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d1b3d" stopOpacity="0" />
          <stop offset="100%" stopColor="#0d1b3d" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="bcmBuildGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#24345f" />
          <stop offset="100%" stopColor="#101a34" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="160" fill="url(#bcmSkyGrad)" />
      <g fill="url(#bcmBuildGrad)" opacity="0.6">
        <rect x="222" y="95" width="26" height="65" />
        <rect x="254" y="80" width="22" height="80" />
        <rect x="284" y="100" width="30" height="60" />
        <rect x="330" y="70" width="24" height="90" />
        <rect x="360" y="90" width="30" height="70" />
      </g>
      <g fill="url(#bcmBuildGrad)">
        <rect x="266" y="62" width="66" height="98" rx="2" />
        <polygon points="266,62 299,36 332,62" />
        <rect x="279" y="78" width="6" height="16" fill="#fbbf6a" opacity="0.85" />
        <rect x="291" y="78" width="6" height="16" fill="#fbbf6a" opacity="0.85" />
        <rect x="303" y="78" width="6" height="16" fill="#fbbf6a" opacity="0.85" />
        <rect x="315" y="78" width="6" height="16" fill="#fbbf6a" opacity="0.85" />
      </g>
      <g fill="#fbbf6a" opacity="0.65">
        <rect x="228" y="105" width="3" height="3" />
        <rect x="236" y="122" width="3" height="3" />
        <rect x="260" y="96" width="3" height="3" />
        <rect x="292" y="114" width="3" height="3" />
        <rect x="336" y="86" width="3" height="3" />
        <rect x="368" y="106" width="3" height="3" />
      </g>
    </svg>
  );
}

// A soft organic "map badge" shape filled with the Polish flag colors —
// reads as a country badge without depending on exact border geometry.
function PolandFlagBadge() {
  return (
    <svg aria-hidden viewBox="0 0 100 100" className="h-full w-full">
      <defs>
        <clipPath id="bcmPolandBlob">
          <path d="M50 4C68 4 79 14 86 28C93 42 94 55 88 66C82 77 74 84 62 90C50 96 38 95 28 88C18 81 9 70 6 56C3 42 6 28 16 18C26 8 38 4 50 4Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#bcmPolandBlob)">
        <rect x="0" y="0" width="100" height="50" fill="#ffffff" />
        <rect x="0" y="50" width="100" height="50" fill="#dc2626" />
      </g>
      <path
        d="M50 4C68 4 79 14 86 28C93 42 94 55 88 66C82 77 74 84 62 90C50 96 38 95 28 88C18 81 9 70 6 56C3 42 6 28 16 18C26 8 38 4 50 4Z"
        fill="none"
        stroke="rgba(0,0,0,0.08)"
        strokeWidth="2"
      />
    </svg>
  );
}

// Stylized Polish ID card + phone-with-app illustration, used on the
// "visit required" card to show what the user will be asked to bring.
function IdCardAndPhoneArt() {
  return (
    <svg aria-hidden viewBox="0 0 160 110" className="h-full w-full">
      <g transform="translate(2,16) rotate(-8)">
        <rect x="0" y="0" width="78" height="50" rx="7" fill="#b91c1c" />
        <rect x="0" y="0" width="78" height="14" rx="7" fill="#ffffff" opacity="0.92" />
        <circle cx="16" cy="32" r="9" fill="#ffffff" opacity="0.9" />
        <rect x="32" y="24" width="34" height="4" rx="2" fill="#ffffff" opacity="0.85" />
        <rect x="32" y="32" width="28" height="4" rx="2" fill="#ffffff" opacity="0.6" />
        <rect x="32" y="40" width="22" height="4" rx="2" fill="#ffffff" opacity="0.6" />
      </g>
      <g transform="translate(68,2) rotate(6)">
        <rect x="0" y="0" width="56" height="104" rx="12" fill="#141c2e" />
        <rect x="4" y="6" width="48" height="92" rx="7" fill="#0b1220" />
        <circle cx="28" cy="52" r="16" fill="#dc2626" />
        <circle cx="28" cy="52" r="16" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1.5" />
        <rect x="21" y="45" width="14" height="4" rx="2" fill="#ffffff" />
        <rect x="21" y="52" width="14" height="4" rx="2" fill="#ffffff" opacity="0.85" />
        <rect x="21" y="59" width="14" height="4" rx="2" fill="#ffffff" opacity="0.7" />
      </g>
    </svg>
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
// modal — same neutral shape, border and icon treatment everywhere, so the
// eye reads one calm surface instead of a different colored card per
// section. Color is spent deliberately in exactly one place: `warn`, for
// the one section (Common Mistakes) that's genuinely a warning. Everything
// else — including the bank-status dot up top — stays on this same quiet
// neutral palette, which is what actually reads as premium rather than a
// grab-bag of every hue at once.
type SectionTone = "default" | "warn";

const SECTION_TONE_STYLE: Record<SectionTone, { border: string; iconBg: string; iconText: string; titleText: string }> = {
  default: { border: "border-border-subtle", iconBg: "bg-white/[0.04]", iconText: "text-text-secondary", titleText: "text-text-primary" },
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
    <div className={`rounded-2xl border ${style.border} bg-surface-hover/30 p-4 sm:p-5`}>
      <div className="flex items-center gap-2.5">
        <div className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ${style.iconBg} ${style.iconText}`}>
          {icon}
        </div>
        <p className={`text-base font-bold tracking-tight ${style.titleText}`}>{title}</p>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

const TAG_ORDER = ["no_pesel", "fully_online", "free", "multicurrency"] as const;

// Content is split into tabs — switching tabs instead of one long scroll —
// so opening the card doesn't dump every section on the user at once.
type TabId = "overview" | "documents" | "submit" | "phrases" | "tips";

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
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  useEffect(() => {
    if (!open) return;

    setActiveTab("overview");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [open, guide?.name]);

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

  const hasDocumentsTab = (guide.required_docs && guide.required_docs.length > 0) || (guide.instructions && guide.instructions.length > 0);
  const hasTipsTab = (guide.tips && guide.tips.length > 0) || (guide.common_mistakes && guide.common_mistakes.length > 0);

  const tabs: { id: TabId; label: string; icon: ReactNode }[] = [
    {
      id: "overview",
      label: t.banks.overviewTabLabel,
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    ...(hasDocumentsTab
      ? [
          {
            id: "documents" as TabId,
            label: gc.requiredDocs,
            icon: (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            ),
          },
        ]
      : []),
    {
      id: "submit",
      label: gc.whereToSubmit,
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      id: "phrases",
      label: t.banks.usefulPhrasesLabel,
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H2v6h4l5 4V5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728" />
        </svg>
      ),
    },
    ...(hasTipsTab
      ? [
          {
            id: "tips" as TabId,
            label: gc.tips,
            icon: (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
          },
        ]
      : []),
  ];

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
        className="flex w-full max-w-2xl flex-col h-[90vh] rounded-2xl border border-accent/15 bg-panel shadow-2xl shadow-black/40 ring-1 ring-black/5"
        style={{
          animation: "scaleIn 200ms ease-out",
        }}
      >
        {/* Sticky Header + Tab switcher, wrapped in one shared sticky
            container so the tab bar always sits directly under the header
            regardless of the header's actual height (rating stars / tags
            present or not) — no guessed pixel offset needed. */}
        <div className="sticky top-0 z-10 bg-panel">
          <div className="relative overflow-hidden border-b border-border-subtle px-4 py-4 sm:px-6 sm:py-5 flex items-start justify-between gap-4">
            {/* Night-skyline illustration + ambient accent glow behind the
                header — inline SVG, no external image assets to break. */}
            <SkylineHeroArt />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-accent/15 blur-3xl"
            />
            <div className="relative flex items-start gap-3 min-w-0 flex-1">
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
                        className="inline-flex items-center rounded-full border border-accent/25 bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent-bright"
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
              className="relative flex-shrink-0 rounded-lg border border-transparent p-1.5 text-text-muted transition-colors hover:text-text-primary"
              aria-label="Close"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tab switcher — content is split into tabs, not one long scroll */}
          <div className="border-b border-border-subtle px-4 py-2.5 sm:px-6">
            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTab(tab.id);
                  }}
                  className={`flex-shrink-0 inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? "border border-accent/40 bg-accent/15 text-accent-bright"
                      : "border border-transparent text-text-muted hover:bg-surface-hover/40 hover:text-text-secondary"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
          <div className="space-y-3 sm:space-y-4">
            {activeTab === "overview" && (
            <>
            {/* Description */}
            {guide.description && (
              <div className="flex items-start gap-3 rounded-2xl border border-border-subtle bg-surface-hover/30 p-4 sm:p-5">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-bright">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1 space-y-2">
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
                <div className="h-14 w-14 flex-shrink-0">
                  <PolandFlagBadge />
                </div>
              </div>
            )}

            {/* Real account-opening status + link (sourced data, see bankAccountInfo.ts) */}
            {accountInfo && (
              <div
                className={`rounded-2xl border bg-surface-hover/40 p-3.5 sm:p-4 ${VISIT_STATUS_STYLE[accountInfo.visitStatus].border}`}
              >
                <div className="flex items-start gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${VISIT_STATUS_STYLE[accountInfo.visitStatus].bg} ${VISIT_STATUS_STYLE[accountInfo.visitStatus].text}`}
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-3.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4" />
                        </svg>
                      </span>
                      <span className={`text-sm font-bold tracking-tight ${VISIT_STATUS_STYLE[accountInfo.visitStatus].text}`}>
                        {visitStatusLabel(accountInfo.visitStatus)}
                      </span>
                    </div>
                    {accountInfo.keyRequirement && (
                      <p className="mt-2.5 text-sm font-medium text-text-primary">{accountInfo.keyRequirement}</p>
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
                        className={`mt-3.5 inline-flex items-center justify-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-colors duration-150 hover:bg-accent/90 ${pressScale}`}
                      >
                        {t.banks.openAccount}
                        <span aria-hidden>→</span>
                      </a>
                    )}
                  </div>
                  {accountInfo.visitStatus !== "online" && (
                    <div className="hidden h-24 w-24 flex-shrink-0 sm:block">
                      <IdCardAndPhoneArt />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Important Info */}
            {guide.important_2026 && (
              <div className="rounded-2xl border border-amber-500/30 bg-surface-hover/40 p-3.5 sm:p-4 text-sm leading-relaxed text-amber-200">
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
                  <div className={`rounded-2xl border border-border-subtle bg-surface-hover/40 px-3.5 py-3 ${infoRows.length === 0 ? "sm:col-span-2" : ""}`}>
                    <div className="flex items-center gap-1.5">
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-bright">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .672-3 1.5S10.343 11 12 11s3 .672 3 1.5S13.657 14 12 14m0-6c1.11 0 2.08.402 2.599 1M12 8V6.5M12 14v1.5m0-1.5c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      <p className="text-[11px] font-medium uppercase tracking-wide text-text-muted">{gc.cost}</p>
                    </div>
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
                        className="mt-2.5 inline-flex items-center gap-1.5 rounded-xl border border-border-strong bg-surface-1 px-3 py-1.5 text-sm font-semibold text-text-secondary transition-colors hover:border-accent/50 hover:text-accent-bright"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h11m0 0l-3.5-3.5M18 7l-3.5 3.5M17 17H6m0 0l3.5 3.5M6 17l3.5-3.5" />
                        </svg>
                        {t.settings.currencySection} · {currency}
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
            </>
            )}

            {activeTab === "documents" && (
            <>
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
            </>
            )}

            {activeTab === "submit" && (
            <>
            {/* Where to Submit — merged with the per-city branch links, since
                showing "where to submit" text + a single map button right
                above a whole grid of per-city map links was the same
                "find a branch" job done twice. One section now covers both:
                the submission note (if any) up top, then every city as a
                map link below it. */}
            <Section
              title={gc.whereToSubmit}
              icon={
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
            >
              <NearestBranchFinder bankName={guide.name} />
              {guide.where_to_submit && (() => {
                const sectionId = "where-to-submit";
                const isExpanded = expandedSections.has(sectionId);
                const { truncated, isTruncated } = truncateText(guide.where_to_submit, 1);
                const displayText = isExpanded ? guide.where_to_submit : truncated;

                return (
                  <div className="mb-3">
                    <p className="text-sm leading-relaxed text-text-secondary">{displayText}</p>
                    {isTruncated && (
                      <ExpandToggle isExpanded={isExpanded} onToggle={(e) => { e.stopPropagation(); toggleSection(sectionId); }} t={collapseCopy} />
                    )}
                  </div>
                );
              })()}
              <div className="flex flex-wrap gap-2">
                {cityMapLinks.map(({ city, url }) => (
                  <a
                    key={city}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border-subtle bg-surface-hover/40 px-3 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:border-accent/50 hover:text-accent-bright"
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
            </>
            )}

            {activeTab === "phrases" && (
            <>
            {/* Useful Polish phrases — spoken via the browser's own TTS voice */}
            <Section
              title={t.banks.usefulPhrasesLabel}
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
                            className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-border-strong text-sm text-text-secondary transition-colors hover:border-accent/50 hover:text-accent-bright ${pressScale}`}
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
            </>
            )}

            {activeTab === "tips" && (
            <>
            {/* Tips */}
            {guide.tips && guide.tips.length > 0 && (
              <Section
                title={gc.tips}
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
            </>
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
            className={`flex-1 rounded-full bg-gradient-to-r from-accent to-accent-bright px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-opacity duration-150 hover:opacity-90 ${pressScale}`}
          >
            {gc.askAi} ✦
          </button>
          <button
            type="button"
            onClick={onClose}
            className={`flex-1 rounded-full bg-[#6c1919] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-red-900 ${pressScale}`}
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
