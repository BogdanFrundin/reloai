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
import { hasGoogleMapsKey } from "../_lib/googleMaps";

// Each status carries its own color all the way through — icon, text,
// card border/background AND the CTA button + its glow — so "Открыть счёт"
// reads as part of that status card instead of a generic blue button
// dropped into a differently-colored section.
const VISIT_STATUS_STYLE: Record<
  VisitStatus,
  { dot: string; text: string; bg: string; border: string; button: string; glow: string }
> = {
  online: {
    dot: "bg-emerald-400",
    text: "text-emerald-300",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    button: "bg-gradient-to-r from-emerald-500 to-emerald-400 hover:opacity-90",
    glow: "shadow-lg shadow-emerald-500/25",
  },
  onlineIfId: {
    dot: "bg-sky-400",
    text: "text-sky-300",
    bg: "bg-sky-500/10",
    border: "border-sky-500/30",
    button: "bg-gradient-to-r from-sky-500 to-sky-400 hover:opacity-90",
    glow: "shadow-lg shadow-sky-500/25",
  },
  branch: {
    dot: "bg-amber-400",
    text: "text-amber-200/90",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    button: "bg-gradient-to-r from-amber-500 to-amber-400 hover:opacity-90",
    glow: "shadow-lg shadow-amber-500/25",
  },
  courier: {
    dot: "bg-violet-400",
    text: "text-violet-300",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
    button: "bg-gradient-to-r from-violet-500 to-violet-400 hover:opacity-90",
    glow: "shadow-lg shadow-violet-500/25",
  },
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
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="bcmSkyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d1b3d" stopOpacity="0" />
          <stop offset="100%" stopColor="#0d1b3d" stopOpacity="0.55" />
        </linearGradient>
        {/* A soft red/white diagonal ribbon standing in for the Polish flag,
            kept low-opacity so it reads as ambient color rather than a
            literal flag graphic competing with the bank name. */}
        <linearGradient id="bcmFlagRibbon" x1="0" y1="0" x2="1" y2="0.35">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0.22" />
        </linearGradient>
        <linearGradient id="bcmBuildGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8c98a" />
          <stop offset="100%" stopColor="#b8934f" />
        </linearGradient>
        <radialGradient id="bcmGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#f5d59a" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#f5d59a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="400" height="160" fill="url(#bcmSkyGrad)" />
      <polygon points="180,0 400,0 400,160 260,160" fill="url(#bcmFlagRibbon)" />
      <circle cx="330" cy="55" r="70" fill="url(#bcmGlow)" />

      {/* Classical bank-facade landmark: pediment + columns, warm gold so it
          reads clearly against the dark header instead of blending in. */}
      <g fill="url(#bcmBuildGrad)">
        <polygon points="270,58 331,58 350,86 251,86" opacity="0.95" />
        <rect x="255" y="86" width="90" height="8" opacity="0.9" />
        {[262, 278, 294, 310, 326].map((x) => (
          <rect key={x} x={x} y="96" width="8" height="52" rx="1.5" opacity="0.85" />
        ))}
        <rect x="251" y="150" width="99" height="9" rx="1.5" />
      </g>
      <g fill="#fff4da" opacity="0.9">
        <rect x="296" y="66" width="9" height="12" rx="1" />
      </g>
      <g fill="#f5d59a" opacity="0.55">
        <rect x="228" y="105" width="3" height="3" />
        <rect x="236" y="122" width="3" height="3" />
        <rect x="368" y="106" width="3" height="3" />
        <rect x="384" y="130" width="3" height="3" />
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
        {/* Same white/red flag palette as before, just given a gradient
            instead of a flat fill, plus a soft gloss highlight and drop
            shadow — a more polished "enamel badge" look without actually
            changing what colors are used. */}
        <linearGradient id="bcmPolandWhite" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e4e6ea" />
        </linearGradient>
        <linearGradient id="bcmPolandRed" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#9f1616" />
        </linearGradient>
        <radialGradient id="bcmPolandSheen" cx="32%" cy="18%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id="bcmPolandShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.35" />
        </filter>
      </defs>
      <g filter="url(#bcmPolandShadow)">
        <g clipPath="url(#bcmPolandBlob)">
          <rect x="0" y="0" width="100" height="50" fill="url(#bcmPolandWhite)" />
          <rect x="0" y="50" width="100" height="50" fill="url(#bcmPolandRed)" />
          <rect x="0" y="0" width="100" height="100" fill="url(#bcmPolandSheen)" />
        </g>
        <path
          d="M50 4C68 4 79 14 86 28C93 42 94 55 88 66C82 77 74 84 62 90C50 96 38 95 28 88C18 81 9 70 6 56C3 42 6 28 16 18C26 8 38 4 50 4Z"
          fill="none"
          stroke="rgba(0,0,0,0.08)"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}

// Stylized Polish ID card + phone-with-app illustration, used on the
// "visit required" card to show what the user will be asked to bring.
function IdCardAndPhoneArt() {
  return (
    <svg aria-hidden viewBox="0 0 160 110" className="h-full w-full">
      <defs>
        {/* Same red/navy/white palette as before, just turned into
            gradients + a soft shadow + a glass-style sheen on the phone
            screen, for a more premium look without changing the colors
            themselves. */}
        <linearGradient id="bcmIdCardFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#7f1414" />
        </linearGradient>
        <linearGradient id="bcmPhoneFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#232c44" />
          <stop offset="100%" stopColor="#0b1220" />
        </linearGradient>
        <radialGradient id="bcmPhoneIconFill" cx="35%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#f04747" />
          <stop offset="100%" stopColor="#b91c1c" />
        </radialGradient>
        <linearGradient id="bcmPhoneSheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="40%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id="bcmIdShadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="3" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.4" />
        </filter>
      </defs>
      <g transform="translate(2,16) rotate(-8)" filter="url(#bcmIdShadow)">
        <rect x="0" y="0" width="78" height="50" rx="7" fill="url(#bcmIdCardFill)" />
        <rect x="0" y="0" width="78" height="14" rx="7" fill="#ffffff" opacity="0.92" />
        <circle cx="16" cy="32" r="9" fill="#ffffff" opacity="0.9" />
        <rect x="32" y="24" width="34" height="4" rx="2" fill="#ffffff" opacity="0.85" />
        <rect x="32" y="32" width="28" height="4" rx="2" fill="#ffffff" opacity="0.6" />
        <rect x="32" y="40" width="22" height="4" rx="2" fill="#ffffff" opacity="0.6" />
      </g>
      <g transform="translate(68,2) rotate(6)" filter="url(#bcmIdShadow)">
        <rect x="0" y="0" width="56" height="104" rx="12" fill="url(#bcmPhoneFill)" />
        <rect x="4" y="6" width="48" height="92" rx="7" fill="#0b1220" />
        <circle cx="28" cy="52" r="16" fill="url(#bcmPhoneIconFill)" />
        <circle cx="28" cy="52" r="16" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1.5" />
        <rect x="21" y="45" width="14" height="4" rx="2" fill="#ffffff" />
        <rect x="21" y="52" width="14" height="4" rx="2" fill="#ffffff" opacity="0.85" />
        <rect x="21" y="59" width="14" height="4" rx="2" fill="#ffffff" opacity="0.7" />
        <rect x="4" y="6" width="48" height="92" rx="7" fill="url(#bcmPhoneSheen)" />
      </g>
    </svg>
  );
}

// Distinct glyph per visit status, so the status circle actually signals
// what kind of requirement this is (checkmark / ID card / courier box /
// warning) instead of the same generic "people" icon for every status.
function VisitStatusGlyph({ status, className }: { status: VisitStatus; className?: string }) {
  switch (status) {
    case "online":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      );
    case "onlineIfId":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="9" cy="12" r="2" />
          <path strokeLinecap="round" d="M14 10h4M14 14h4" />
        </svg>
      );
    case "courier":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9-4 9 4-9 4-9-4zm0 0v10l9 4m0-14v14m9-14v10l-9 4" />
        </svg>
      );
    case "branch":
    default:
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M12 3a9 9 0 100 18 9 9 0 000-18z" />
        </svg>
      );
  }
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
    <div className={`rounded-2xl border ${style.border} bg-gradient-to-b from-white/[0.04] to-surface-hover/30 p-4 shadow-inner shadow-black/10 backdrop-blur-sm sm:p-5`}>
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
        className="flex w-full max-w-2xl flex-col h-[90vh] rounded-2xl border border-accent/15 bg-gradient-to-b from-white/[0.03] to-panel bg-panel shadow-2xl shadow-black/50 ring-1 ring-white/5"
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
            <div className="flex gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTab(tab.id);
                  }}
                  className={`flex-1 inline-flex items-center justify-center gap-1 rounded-xl px-2 py-2 text-sm font-semibold whitespace-nowrap transition-colors ${
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
              <div className="flex items-start gap-3 rounded-2xl border border-border-subtle bg-gradient-to-b from-white/[0.04] to-surface-hover/30 p-4 shadow-inner shadow-black/10 backdrop-blur-sm sm:p-5">
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
                className={`relative overflow-hidden rounded-2xl border bg-gradient-to-b from-white/[0.04] to-surface-hover/40 p-3.5 shadow-inner shadow-black/10 backdrop-blur-sm sm:p-4 ${VISIT_STATUS_STYLE[accountInfo.visitStatus].border}`}
              >
                <div className="flex items-start gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${VISIT_STATUS_STYLE[accountInfo.visitStatus].bg} ${VISIT_STATUS_STYLE[accountInfo.visitStatus].text}`}
                      >
                        <VisitStatusGlyph status={accountInfo.visitStatus} className="h-4 w-4" />
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
                        className={`mt-3.5 inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white transition-opacity duration-150 ${VISIT_STATUS_STYLE[accountInfo.visitStatus].button} ${VISIT_STATUS_STYLE[accountInfo.visitStatus].glow} ${pressScale}`}
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
                  <div className={`rounded-2xl border border-border-subtle bg-gradient-to-b from-white/[0.04] to-surface-hover/40 px-3.5 py-3 shadow-inner shadow-black/10 backdrop-blur-sm ${infoRows.length === 0 ? "sm:col-span-2" : ""}`}>
                    <div className="flex items-center gap-1.5">
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-bright">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7c0-1.1 3.58-2 8-2s8 .9 8 2-3.58 2-8 2-8-.9-8-2z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v5c0 1.1 3.58 2 8 2s8-.9 8-2V7" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 12v5c0 1.1 3.58 2 8 2s8-.9 8-2v-5" />
                        </svg>
                      </span>
                      <p className="text-[11px] font-medium uppercase tracking-wide text-text-muted">{gc.cost}</p>
                    </div>
                    <p className="mt-1 text-sm text-text-secondary">{cost}</p>
                    {currencies.length > 0 && (
                      <div className="mt-2">
                        <CurrencyBadges currencies={currencies} />
                      </div>
                    )}
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
              {hasGoogleMapsKey() && (
                <p className="mb-2 text-xs text-text-muted">{t.banks.nearBranchOrSelectCity}</p>
              )}
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
