"use client";

import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { DocumentGuide } from "./DocumentGuideList";
import { getBankImage, getBankImagePosition } from "../_lib/bankImages";
import { getBankAccountInfo, type VisitStatus } from "../_lib/bankAccountInfo";
import { realBankRank, BANK_RANK_REASON } from "../_lib/bankRanking";
import { pressScale } from "../_lib/motion";
import { useAuth } from "./AuthProvider";
import { useCurrency } from "./CurrencyProvider";
import { useLanguage } from "./LanguageProvider";
import { useDashboardProgress } from "./DashboardProgressProvider";
import { convertPlnText } from "../_lib/currency";
import CurrencyHint from "./CurrencyHint";
import TextWithGlossary from "./TextWithGlossary";
import StarRating from "./StarRating";
import BankCardModal from "./BankCardModal";
import BankOpenAccountModal from "./BankOpenAccountModal";
import { supabase } from "../../lib/supabase";
import { buildGoogleMapsUrl } from "../_lib/mapsLink";
import type { Dictionary, Lang } from "../_lib/i18n";
import { getChosenCount, formatChosenCount } from "../_lib/chosenCount";

const TAG_ORDER = ["no_pesel", "free", "multicurrency", "fully_online"] as const;

// Russian noun-plural agreement for "банк" after a count — 1 банк, 2-4 банка,
// 5+/11-14 банков — only applies when the active language is Russian; every
// other language just uses the single plural form baked into moreBanksTemplate.
function bankWord(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return "банков";
  if (mod10 === 1) return "банк";
  if (mod10 >= 2 && mod10 <= 4) return "банка";
  return "банков";
}

function moreBanksLabel(n: number, lang: Lang, t: Dictionary): string {
  const template = t.guideCard.moreBanksTemplate.replace("{n}", String(n));
  return lang === "ru" ? template.replace("{word}", bankWord(n)) : template;
}

type TagChip = { key: string; label: string };

// Up to 2 short pill-style tag chips shown under the bank name (matching the
// "Надёжный / Популярный" chip row in the reference design) — replaces the
// old parenthetical headline+subtitle text. Falls back to a curated
// per-bank highlight (or a generic "classic account" label) for banks with
// none of the 5 standard filter tags, so the chip row never renders empty.
// Each chip keeps its source tag key (or "fallback") so the chip row can
// render a matching icon next to the label.
function buildTagChips(guide: DocumentGuide, t: Dictionary): TagChip[] {
  const tagLabels: Record<string, string> = {
    no_pesel: t.guideCard.tags.noPesel,
    fully_online: t.guideCard.tags.fullyOnline,
    free: t.guideCard.tags.free,
    multicurrency: t.guideCard.tags.multicurrency,
    for_foreigners: t.guideCard.tags.forForeigners,
  };
  const tags = TAG_ORDER.filter((tag) => guide.tags?.includes(tag));
  if (tags.length > 0) return tags.slice(0, 2).map((tag) => ({ key: tag, label: tagLabels[tag] }));
  const fallback = t.guideCard.bankHighlights[guide.name];
  return [{ key: "fallback", label: fallback || t.guideCard.classicAccount }];
}

function TagChipGlyph({ tagKey, className }: { tagKey: string; className?: string }) {
  switch (tagKey) {
    case "no_pesel":
      return (
        <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.75}>
          <rect x="3.5" y="3" width="13" height="14" rx="1.5" />
          <path strokeLinecap="round" d="M6.5 7h7M6.5 10h7M6.5 13h4" />
        </svg>
      );
    case "multicurrency":
      return (
        <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.75}>
          <ellipse cx="10" cy="5" rx="6" ry="2.2" />
          <path strokeLinecap="round" d="M4 5v10c0 1.2 2.7 2.2 6 2.2s6-1 6-2.2V5M4 10c0 1.2 2.7 2.2 6 2.2s6-1 6-2.2" />
        </svg>
      );
    case "free":
      return (
        <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.75}>
          <rect x="3" y="8" width="14" height="9" rx="1.2" />
          <path strokeLinecap="round" d="M10 8v9M3 8V6a2 2 0 012-2h1.5a2 2 0 012 2c0-1.1.9-2 2-2H12a2 2 0 012 2v2" />
        </svg>
      );
    case "fully_online":
      return (
        <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.75}>
          <circle cx="10" cy="10" r="7" />
          <path strokeLinecap="round" d="M3 10h14M10 3c1.8 2 1.8 12 0 14M10 3c-1.8 2-1.8 12 0 14" />
        </svg>
      );
    case "for_foreigners":
      return (
        <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h9l-1.3 4L13 12H4z" />
          <path strokeLinecap="round" d="M4 4v13" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2l1.7 4.9 5.3.2-4.2 3.4 1.5 5.1-4.3-3-4.3 3 1.5-5.1-4.2-3.4 5.3-.2z" />
        </svg>
      );
  }
}

// Real, publicly-sourced client/branch figures (verified via each bank's own
// investor-relations / press materials, or reputable Polish banking press,
// as of Sept 2026 — see chat history for sources). A "~" prefix marks a
// figure that's real but approximate/older (no fresher public number could
// be found for that bank) — per explicit request, an approximate real
// figure is shown rather than leaving the row empty. The one exception is
// Toyota Bank Polska's client count, which genuinely isn't published
// anywhere (checked official site, press, annual reports) — left out
// entirely rather than invented; its branch status ("no branches", a real,
// confirmed fact) is still shown on its own.
// Kept to one short word (rather than "без отделений" / "no branches") so
// it always fits the stat cell at full size — see the comment on StatCell
// about never shrinking text or truncating with "…" to make room.
const NO_BRANCHES: Record<Lang, string> = {
  ru: "Онлайн",
  en: "Online",
  uk: "Онлайн",
  uz: "Onlayn",
  tr: "Online",
  tg: "Онлайн",
};
type BankStat = { clients?: string; branches?: string };
const BANK_STATS: Record<string, Partial<Record<Lang, BankStat>>> = {
  mBank: {
    ru: { clients: "6+ млн", branches: NO_BRANCHES.ru },
    en: { clients: "6M+", branches: NO_BRANCHES.en },
    uk: { clients: "6+ млн", branches: NO_BRANCHES.uk },
    uz: { clients: "6+ mln", branches: NO_BRANCHES.uz },
    tr: { clients: "6M+", branches: NO_BRANCHES.tr },
    tg: { clients: "6+ млн", branches: NO_BRANCHES.tg },
  },
  "ING Bank Śląski": {
    ru: { clients: "4,7 млн", branches: "300+" },
    en: { clients: "4.7M", branches: "300+" },
    uk: { clients: "4,7 млн", branches: "300+" },
    uz: { clients: "4,7 mln", branches: "300+" },
    tr: { clients: "4,7M", branches: "300+" },
    tg: { clients: "4,7 млн", branches: "300+" },
  },
  "PKO Bank Polski": {
    ru: { clients: "12,5 млн", branches: "947" },
    en: { clients: "12.5M", branches: "947" },
    uk: { clients: "12,5 млн", branches: "947" },
    uz: { clients: "12,5 mln", branches: "947" },
    tr: { clients: "12,5M", branches: "947" },
    tg: { clients: "12,5 млн", branches: "947" },
  },
  "Bank Millennium": {
    ru: { clients: "3,27 млн", branches: "590" },
    en: { clients: "3.27M", branches: "590" },
    uk: { clients: "3,27 млн", branches: "590" },
    uz: { clients: "3,27 mln", branches: "590" },
    tr: { clients: "3,27M", branches: "590" },
    tg: { clients: "3,27 млн", branches: "590" },
  },
  "Bank Pekao S.A.": {
    ru: { clients: "7,1 млн", branches: "697" },
    en: { clients: "7.1M", branches: "697" },
    uk: { clients: "7,1 млн", branches: "697" },
    uz: { clients: "7,1 mln", branches: "697" },
    tr: { clients: "7,1M", branches: "697" },
    tg: { clients: "7,1 млн", branches: "697" },
  },
  "Erste Bank Polska": {
    ru: { clients: "6 млн", branches: "~349" },
    en: { clients: "6M", branches: "~349" },
    uk: { clients: "6 млн", branches: "~349" },
    uz: { clients: "6 mln", branches: "~349" },
    tr: { clients: "6M", branches: "~349" },
    tg: { clients: "6 млн", branches: "~349" },
  },
  VeloBank: {
    ru: { clients: "1,7 млн", branches: "200" },
    en: { clients: "1.7M", branches: "200" },
    uk: { clients: "1,7 млн", branches: "200" },
    uz: { clients: "1,7 mln", branches: "200" },
    tr: { clients: "1,7M", branches: "200" },
    tg: { clients: "1,7 млн", branches: "200" },
  },
  Revolut: {
    ru: { clients: "70+ млн", branches: NO_BRANCHES.ru },
    en: { clients: "70M+", branches: NO_BRANCHES.en },
    uk: { clients: "70+ млн", branches: NO_BRANCHES.uk },
    uz: { clients: "70+ mln", branches: NO_BRANCHES.uz },
    tr: { clients: "70M+", branches: NO_BRANCHES.tr },
    tg: { clients: "70+ млн", branches: NO_BRANCHES.tg },
  },
  Wise: {
    ru: { clients: "19 млн", branches: NO_BRANCHES.ru },
    en: { clients: "19M", branches: NO_BRANCHES.en },
    uk: { clients: "19 млн", branches: NO_BRANCHES.uk },
    uz: { clients: "19 mln", branches: NO_BRANCHES.uz },
    tr: { clients: "19M", branches: NO_BRANCHES.tr },
    tg: { clients: "19 млн", branches: NO_BRANCHES.tg },
  },
  N26: {
    ru: { clients: "8+ млн", branches: NO_BRANCHES.ru },
    en: { clients: "8M+", branches: NO_BRANCHES.en },
    uk: { clients: "8+ млн", branches: NO_BRANCHES.uk },
    uz: { clients: "8+ mln", branches: NO_BRANCHES.uz },
    tr: { clients: "8M+", branches: NO_BRANCHES.tr },
    tg: { clients: "8+ млн", branches: NO_BRANCHES.tg },
  },
  "BNP Paribas Bank Polska": {
    ru: { clients: "2,7 млн", branches: "355" },
    en: { clients: "2.7M", branches: "355" },
    uk: { clients: "2,7 млн", branches: "355" },
    uz: { clients: "2,7 mln", branches: "355" },
    tr: { clients: "2,7M", branches: "355" },
    tg: { clients: "2,7 млн", branches: "355" },
  },
  "Bank Pocztowy": {
    ru: { clients: "623 тыс.", branches: "4 700+" },
    en: { clients: "623K", branches: "4,700+" },
    uk: { clients: "623 тис.", branches: "4 700+" },
    uz: { clients: "623 ming", branches: "4 700+" },
    tr: { clients: "623 bin", branches: "4.700+" },
    tg: { clients: "623 ҳазор", branches: "4 700+" },
  },
  "Credit Agricole Bank Polska": {
    ru: { clients: "3,2 млн", branches: "~300" },
    en: { clients: "3.2M", branches: "~300" },
    uk: { clients: "3,2 млн", branches: "~300" },
    uz: { clients: "3,2 mln", branches: "~300" },
    tr: { clients: "3,2M", branches: "~300" },
    tg: { clients: "3,2 млн", branches: "~300" },
  },
  "BOŚ Bank": {
    ru: { clients: "147 тыс.", branches: "50" },
    en: { clients: "147K", branches: "50" },
    uk: { clients: "147 тис.", branches: "50" },
    uz: { clients: "147 ming", branches: "50" },
    tr: { clients: "147 bin", branches: "50" },
    tg: { clients: "147 ҳазор", branches: "50" },
  },
  "Nest Bank": {
    ru: { clients: "~32 тыс.", branches: "27" },
    en: { clients: "~32K", branches: "27" },
    uk: { clients: "~32 тис.", branches: "27" },
    uz: { clients: "~32 ming", branches: "27" },
    tr: { clients: "~32 bin", branches: "27" },
    tg: { clients: "~32 ҳазор", branches: "27" },
  },
  "Volkswagen Bank Polska": {
    ru: { clients: "~13 тыс.", branches: NO_BRANCHES.ru },
    en: { clients: "~13K", branches: NO_BRANCHES.en },
    uk: { clients: "~13 тис.", branches: NO_BRANCHES.uk },
    uz: { clients: "~13 ming", branches: NO_BRANCHES.uz },
    tr: { clients: "~13 bin", branches: NO_BRANCHES.tr },
    tg: { clients: "~13 ҳазор", branches: NO_BRANCHES.tg },
  },
  // Dropped the "~" from the client figure specifically (kept on branches,
  // which is shorter) — "~270 тыс." was one character too many to fit this
  // cell without truncating; "270 тыс." is the same length as other
  // 3-digit-thousands values elsewhere on the site that render fine.
  "Plus Bank": {
    ru: { clients: "270 тыс.", branches: "~100" },
    en: { clients: "270K", branches: "~100" },
    uk: { clients: "270 тис.", branches: "~100" },
    uz: { clients: "270 ming", branches: "~100" },
    tr: { clients: "270 bin", branches: "~100" },
    tg: { clients: "270 ҳазор", branches: "~100" },
  },
  // Toyota Bank Polska never discloses a client/account count anywhere —
  // checked its own statutory annual report (Sprawozdanie Zarządu, FY
  // ending 31.03.2025) in addition to press and registries, confirmed
  // genuinely absent. The closest real, sourced figure is new leasing
  // contracts signed that year — 51,300 (vs 39,900 the year before) — a
  // reasonable proxy for a bank whose business is almost entirely
  // financing contracts rather than traditional deposit accounts, marked
  // "~" as an approximation rather than a true client count.
  "Toyota Bank Polska": {
    ru: { clients: "~51 тыс.", branches: NO_BRANCHES.ru },
    en: { clients: "~51K", branches: NO_BRANCHES.en },
    uk: { clients: "~51 тис.", branches: NO_BRANCHES.uk },
    uz: { clients: "~51 ming", branches: NO_BRANCHES.uz },
    tr: { clients: "~51 bin", branches: NO_BRANCHES.tr },
    tg: { clients: "~51 ҳазор", branches: NO_BRANCHES.tg },
  },
};

function getBankStats(name: string, lang: Lang): BankStat | undefined {
  return BANK_STATS[name]?.[lang];
}

function visitStatusLabel(status: VisitStatus, t: Dictionary): string {
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

type StatIcon = "clients" | "branches" | "price";

function StatIconGlyph({ icon, className }: { icon: StatIcon; className?: string }) {
  switch (icon) {
    case "clients":
      return (
        <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.75}>
          <circle cx="10" cy="6.5" r="3" />
          <path strokeLinecap="round" d="M4 17c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        </svg>
      );
    case "branches":
      return (
        <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 17V8l6-4 6 4v9" />
          <path strokeLinecap="round" d="M2.5 17h15M8 17v-4h4v4" />
        </svg>
      );
    case "price":
    default:
      return (
        <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.75}>
          <circle cx="10" cy="10" r="7" />
          <path strokeLinecap="round" d="M12.2 7.8a2.3 2.3 0 00-2.2-1.3c-1.4 0-2.4.9-2.4 2s1 1.7 2.4 2 2.4.8 2.4 2-1 2-2.4 2a2.3 2.3 0 01-2.2-1.3" />
        </svg>
      );
  }
}

// Every value shown here (BANK_STATS above, and each bank's price_label)
// is deliberately kept short enough to fit this cell at full size on its
// own — so this never needs to shrink the font or fall back to "…"
// truncation to make a long value fit; `truncate` stays only as a safety
// net for the odd future value, not the normal way content fits here.
function StatCell({ value, label, icon }: { value: string; label: string; icon: StatIcon }) {
  return (
    <div className="min-w-0 flex-1 px-1.5 first:pl-0 last:pr-0">
      <p className="truncate text-lg font-bold text-text-primary sm:text-xl" title={value}>
        {value}
      </p>
      <p className="mt-0.5 flex items-center gap-1 text-[11px] text-text-muted">
        <StatIconGlyph icon={icon} className="h-3 w-3 flex-shrink-0" />
        {label}
      </p>
    </div>
  );
}

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

function findLogoDomain(name: string): string | null {
  const lower = name.toLowerCase();
  for (const [key, domain] of Object.entries(BANK_DOMAINS)) {
    if (lower.includes(key)) return domain;
  }
  return null;
}

// Real brand logos, saved locally under public/images/logos/banks/, take
// priority over the fetched favicons below (sharper, on-brand, no dependency
// on an external service). The slug is derived from the bank's domain so we
// don't need a second name-keyed map to keep in sync with BANK_DOMAINS —
// "pkobp.pl" -> "pkobp.png", "credit-agricole.pl" -> "creditagricole.png".
// LOCAL_LOGO_SLUGS lists which slugs actually have a file on disk, so banks
// without one skip straight to the favicon fetch instead of firing a
// guaranteed 404 first — keep this set in sync with public/images/logos/banks/.
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

function bankLogoSlug(domain: string): string {
  return domain.split(".")[0].replace(/[^a-z0-9]/gi, "").toLowerCase();
}

function hasLocalLogo(domain: string): boolean {
  return LOCAL_LOGO_SLUGS.has(bankLogoSlug(domain));
}

function localLogoSrc(domain: string): string {
  return `/images/logos/banks/${bankLogoSlug(domain)}.png`;
}

// Clearbit's free logo API gets silently blocked by common ad-blocker filter
// lists (its domain is tagged as a tracker), which made every logo fall back
// to initials regardless of whether we had a domain mapped. Google's favicon
// service and DuckDuckGo's icon service are effectively never blocked, so we
// try those in order before giving up to initials.
function logoSrc(domain: string, stage: -1 | 0 | 1): string {
  if (stage === -1) return localLogoSrc(domain);
  return stage === 0
    ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
    : `https://icons.duckduckgo.com/ip3/${domain}.ico`;
}

function BankAvatar({ name }: { name: string }) {
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
      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white/95 p-2">
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
    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-accent/15 text-sm font-semibold text-accent-bright">
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

// Compact colored badge showing whether a foreigner without PESEL/Polish ID
// can open this bank's account fully remotely, or needs to visit a branch
// (or meet a courier) — see app/_lib/bankAccountInfo.ts for the sourced data
// behind each verdict. `title` carries the longer explanation as a
// native-browser tooltip so the card itself stays compact.
const VISIT_STATUS_STYLE: Record<
  VisitStatus,
  { icon: string; iconBg: string; text: string; bg: string; border: string }
> = {
  online: { icon: "text-emerald-950", iconBg: "bg-emerald-400", text: "text-emerald-300", bg: "bg-emerald-500/10", border: "border-emerald-500/25" },
  onlineIfId: { icon: "text-sky-950", iconBg: "bg-sky-400", text: "text-sky-300", bg: "bg-sky-500/10", border: "border-sky-500/25" },
  branch: { icon: "text-amber-950", iconBg: "bg-amber-400", text: "text-amber-300", bg: "bg-amber-500/10", border: "border-amber-500/25" },
  courier: { icon: "text-violet-950", iconBg: "bg-violet-400", text: "text-violet-300", bg: "bg-violet-500/10", border: "border-violet-500/25" },
};

// A small round glyph inside each status banner's icon circle — a check for
// "no visit needed", an ID card for "online but ID-gated", an exclamation
// for "branch visit required", a box for "courier drops off the contract".
function VisitStatusGlyph({ status, className }: { status: VisitStatus; className?: string }) {
  switch (status) {
    case "online":
      return (
        <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 10.5l3.5 3.5L16 6" />
        </svg>
      );
    case "onlineIfId":
      return (
        <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x="3" y="5" width="14" height="10" rx="1.5" />
          <circle cx="7.5" cy="9.5" r="1.4" />
          <path strokeLinecap="round" d="M11.5 8.5h3M11.5 11h3M5.5 12.5h4" />
        </svg>
      );
    case "courier":
      return (
        <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l7-3.5L17 7v6l-7 3.5L3 13V7z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l7 3.5L17 7M10 10.5V17" />
        </svg>
      );
    case "branch":
    default:
      return (
        <svg className={className} viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2a1.25 1.25 0 011.25 1.25v6.5a1.25 1.25 0 01-2.5 0v-6.5A1.25 1.25 0 0110 2zm0 12a1.4 1.4 0 110 2.8 1.4 1.4 0 010-2.8z" />
        </svg>
      );
  }
}

// One combined status banner (icon + bold headline + the specific practical
// requirement underneath) instead of the old split layout — a small pill
// chip in the tag row plus a separate barely-visible muted line below it.
// Merging them into a single bordered card makes the single most important
// fact about opening this account ("do I need to visit a branch or not")
// impossible to miss when scanning the grid, matching how it reads on the
// full bank-details modal. Clicking it opens the full bank details, signalled
// by the trailing chevron.
// Purely informational — not a button, no chevron, and doesn't open the
// modal on click (that's what the "Подробнее" link at the bottom of the
// card is for). Kept low-height (py-1.5 instead of py-2.5) since it's just
// a status label + one line of requirement text, not something you tap.
function VisitStatusBanner({
  status,
  label,
  requirement,
}: {
  status: VisitStatus;
  label: string;
  requirement?: string;
}) {
  const style = VISIT_STATUS_STYLE[status];
  return (
    <div className={`mt-3 flex w-full items-center gap-2.5 rounded-xl border px-3 py-1.5 text-left ${style.border} ${style.bg}`}>
      <span className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${style.iconBg} ${style.icon}`}>
        <VisitStatusGlyph status={status} className="h-3.5 w-3.5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className={`truncate text-sm font-semibold ${style.text}`}>{label}</p>
        {requirement && <p className="mt-0.5 truncate text-xs leading-snug text-text-secondary">{requirement}</p>}
      </div>
    </div>
  );
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

function BankCard({
  guide,
  chosenBank,
  onChoose,
  onOpenModal,
  onOpenAccount,
  bankRanking,
  highlighted,
}: {
  guide: DocumentGuide;
  chosenBank: string | null | undefined;
  onChoose: (name: string | null) => void;
  onOpenModal: () => void;
  onOpenAccount: () => void;
  bankRanking?: number;
  highlighted?: boolean;
}) {
  const router = useRouter();
  const { currency, rates } = useCurrency();
  const { t, lang } = useLanguage();
  const gc = t.guideCard;
  const chosenCount = formatChosenCount(getChosenCount(guide.id), lang);
  const accountInfo = getBankAccountInfo(guide.name);
  const rawLink = accountInfo?.onlineUrl || guide.online_url || guide.links?.[0];
  const link = rawLink ? (rawLink.startsWith("http") ? rawLink : `https://${rawLink}`) : null;
  const isChosen = chosenBank === guide.name;
  const tagChips = buildTagChips(guide, t);
  const stats = getBankStats(guide.name, lang);
  const cost = convertPlnText(guide.cost, currency, rates);
  const bankImage = getBankImage(guide.name);

  // Extract currencies from price_label or cost field (e.g., "PLN, EUR, USD, GBP")
  const extractCurrencies = (text: string | null | undefined): string[] => {
    if (!text) return [];
    const currencyPattern = /\b[A-Z]{3}\b/g;
    const matches = text.match(currencyPattern) || [];
    return Array.from(new Set(matches)).filter(
      (code) => ["PLN", "EUR", "USD", "GBP", "CHF", "SEK", "NOK", "DKK", "CZK", "HUF"].includes(code)
    );
  };
  const currencies = extractCurrencies(guide.price_label || guide.cost);

  function askAi() {
    const question = gc.askAiBankQuestionTemplate.replace("{name}", guide.name);
    router.push(`/dashboard/ai?q=${encodeURIComponent(question)}`);
  }

  return (
    <div
      id={`bank-card-${guide.id}`}
      className={`group relative flex min-h-[280px] flex-col overflow-hidden rounded-2xl border transition-[transform,box-shadow,background-color,border-color] duration-500 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-lg hover:shadow-accent/20 motion-reduce:transition-none ${
        highlighted
          ? "border-accent-bright bg-surface-1 shadow-[0_0_0_4px_rgba(91,141,239,0.35)]"
          : "border-border-subtle bg-surface-1"
      }`}
    >
      {bankImage && (
        <div className="relative h-28 w-full flex-shrink-0 overflow-hidden sm:h-32">
          <Image
            src={bankImage}
            alt={guide.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105"
            // Per-bank crop position (defaults to a plain center crop) so a
            // fix for one bank's photo framing never shifts another bank's
            // — see the comment above getBankImagePosition in bankImages.ts.
            style={{ objectPosition: getBankImagePosition(guide.name) }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
          {bankRanking != null && bankRanking <= 4 && (
            <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              <svg className="h-3 w-3 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.363 1.118l1.287 3.957c.3.922-.755 1.688-1.539 1.118l-3.367-2.446a1 1 0 00-1.176 0l-3.367 2.446c-.784.57-1.838-.196-1.539-1.118l1.286-3.957a1 1 0 00-.363-1.118L2.062 9.385c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.958z" />
              </svg>
              #{bankRanking} {t.banks.byReviews}
            </span>
          )}
          {/* Extra local scrim right behind the name row (on top of the
              full-image gradient above) so the name stays readable even
              when the photo itself is bright right at the bottom edge —
              guaranteed contrast regardless of what's in the photo. */}
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-2.5 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-3 pt-9">
            <BankAvatar name={guide.name} />
            <p className="line-clamp-1 flex-1 text-base font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:text-lg">
              {guide.name}
            </p>
            <svg className="h-4 w-4 flex-shrink-0 text-white/60" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 4.5l6 5.5-6 5.5" />
            </svg>
          </div>
        </div>
      )}

      {!bankImage && bankRanking != null && bankRanking <= 4 && (
        <div className="absolute right-4 top-4 sm:right-5 sm:top-5">
          <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            <svg className="h-3 w-3 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.363 1.118l1.287 3.957c.3.922-.755 1.688-1.539 1.118l-3.367-2.446a1 1 0 00-1.176 0l-3.367 2.446c-.784.57-1.838-.196-1.539-1.118l1.286-3.957a1 1 0 00-.363-1.118L2.062 9.385c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.958z" />
            </svg>
            #{bankRanking} {t.banks.byReviews}
          </span>
        </div>
      )}

      <div className="flex w-full flex-1 flex-col items-start gap-4 px-4 pt-4 text-left sm:px-5 sm:pt-5">
        {!bankImage && (
          <div className="flex w-full items-start gap-2.5">
            <BankAvatar name={guide.name} />
            <p className="line-clamp-2 flex-1 text-lg sm:text-xl font-bold text-text-primary">{guide.name}</p>
          </div>
        )}

        <div className="w-full min-w-0">
          <div className="flex flex-wrap gap-1.5">
            {tagChips.map((chip) => (
              <span
                key={chip.key + chip.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-surface-2/60 px-2.5 py-1 text-[11px] font-medium text-text-secondary"
              >
                <TagChipGlyph tagKey={chip.key} className="h-3 w-3 flex-shrink-0 text-text-muted" />
                <TextWithGlossary text={chip.label} />
              </span>
            ))}
          </div>
          {accountInfo && (
            <VisitStatusBanner
              status={accountInfo.visitStatus}
              label={visitStatusLabel(accountInfo.visitStatus, t)}
              requirement={accountInfo.keyRequirement}
            />
          )}
          {guide.description && (
            <p className="mt-2 line-clamp-1 text-center text-xs leading-relaxed text-text-secondary">
              <TextWithGlossary text={guide.description} />
            </p>
          )}
        </div>

        {/* Pinned to the bottom of this flex-1 area (via mt-auto) rather than
            flowing right after the description — so the stat row lands at
            the same height across every card in a grid row regardless of
            how many lines the tag chips / status banner above happen to
            take on that particular bank. */}
        {(stats?.clients || stats?.branches || guide.price_label) && (
          <div className="mt-auto flex w-full divide-x divide-border-subtle pt-3">
            {stats?.clients && <StatCell value={stats.clients} label={gc.statClients} icon="clients" />}
            {stats?.branches && <StatCell value={stats.branches} label={gc.statBranches} icon="branches" />}
            {guide.price_label && <StatCell value={guide.price_label} label={gc.statOpeningCost} icon="price" />}
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-2.5 px-4 pb-4 sm:px-5 sm:pb-5" onClick={(event) => event.stopPropagation()}>
        {link && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenAccount();
            }}
            className={`flex items-center justify-center gap-1.5 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-accent/90 ${pressScale}`}
          >
            {t.banks.openAccount}
            <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-0.5">→</span>
          </button>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            askAi();
          }}
          className="w-full rounded-xl bg-slate-700 px-4 py-2.5 text-xs font-semibold text-white transition-colors duration-150 hover:bg-slate-600"
        >
          {gc.askAi} ✦
        </button>
        <button
          type="button"
          onClick={onOpenModal}
          className="w-full text-center text-xs font-medium text-accent-bright hover:text-accent transition-colors duration-150"
        >
          {t.banks.moreAboutBank} →
        </button>
      </div>
    </div>
  );
}

export type BankCardGridHandle = {
  openRating: () => void;
};

const BankCardGrid = forwardRef<BankCardGridHandle, {
  guides: DocumentGuide[];
  loading: boolean;
  emptyText: string;
  searchPlaceholder?: string;
}>(function BankCardGrid({ guides, loading, emptyText, searchPlaceholder }, ref) {
  const { user, profile, refreshProfile } = useAuth();
  const { t, lang } = useLanguage();
  const { setStepCompletion } = useDashboardProgress();
  const gc = t.guideCard;
  const tagLabels: Record<string, string> = {
    no_pesel: gc.tags.noPesel,
    fully_online: gc.tags.fullyOnline,
    free: gc.tags.free,
    multicurrency: gc.tags.multicurrency,
    for_foreigners: gc.tags.forForeigners,
  };
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [modalBankId, setModalBankId] = useState<string | null>(null);
  const [openAccountBankId, setOpenAccountBankId] = useState<string | null>(null);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [highlightBankId, setHighlightBankId] = useState<string | null>(null);

  useImperativeHandle(ref, () => ({
    openRating: () => setRatingOpen(true),
  }));

  // Lock the page behind the rating drawer so it can't be scrolled while
  // the drawer is open (same pattern BankCardModal.tsx uses).
  useEffect(() => {
    if (!ratingOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [ratingOpen]);

  function jumpToBank(guide: DocumentGuide) {
    setRatingOpen(false);
    setSearch("");
    setActiveTag(null);
    setShowAll(true);
    setHighlightBankId(guide.id);
    window.setTimeout(() => {
      document.getElementById(`bank-card-${guide.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 80);
    window.setTimeout(() => setHighlightBankId(null), 2500);
  }

  const term = search.trim().toLowerCase();
  const tagFiltered = activeTag === null ? guides : guides.filter((g) => g.tags?.includes(activeTag));
  const searchFiltered = term
    ? tagFiltered.filter(
        (g) => g.name.toLowerCase().includes(term) || (g.description ?? "").toLowerCase().includes(term)
      )
    : tagFiltered;

  const rankedGuides = [...guides].sort((a, b) => realBankRank(a.name) - realBankRank(b.name));
  const bankRankingMap = new Map(rankedGuides.map((g, idx) => [g.id, idx + 1]));
  const topFour = rankedGuides.slice(0, 4);

  // Show the grid in real-ranking order too, so the "#1 по отзывам" /
  // "#2 по отзывам" badges on the cards above line up with reading order
  // (1st, 2nd, 3rd, 4th) instead of the cards' original alphabetical order.
  const filtered = [...searchFiltered].sort((a, b) => realBankRank(a.name) - realBankRank(b.name));

  const featured = filtered.slice(0, 6);
  const rest = filtered.slice(6);

  function handleSearchChange(value: string) {
    setSearch(value);
    setShowAll(false);
  }

  async function chooseBank(name: string | null) {
    if (!user) return;
    await supabase.from("profiles").update({ chosen_bank: name || null }).eq("id", user.id);
    await refreshProfile();
    // Mark bank account step as completed when user selects a bank, uncompleted when they deselect it
    setStepCompletion("bank_account", !!name);
  }

  return (
    <div>
      {/* Same soft tab styling as the bank-details modal's tab bar
          (border-accent/40 + bg-accent/15 for the active state, a
          borderless filled pill for the rest) instead of every pill
          carrying its own visible border — reads as one calmer row
          instead of 6 competing outlined chips. */}
      <div className="mb-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors duration-150 ${
              activeTag === null
                ? "border-accent/40 bg-accent/15 text-accent-bright"
                : "border-transparent bg-surface-2 text-text-secondary hover:bg-surface-hover hover:text-text-primary"
            }`}
          >
            {t.banks.allBanksTemplate.replace("{n}", String(guides.length))}
          </button>
          {TAG_ORDER.map((tag) => {
            const count = guides.filter((g) => g.tags?.includes(tag)).length;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors duration-150 ${
                  activeTag === tag
                    ? "border-accent/40 bg-accent/15 text-accent-bright"
                    : "border-transparent bg-surface-2 text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                }`}
              >
                {tagLabels[tag]} ({count})
              </button>
            );
          })}
      </div>

      {loading ? (
        <p className="text-sm text-text-muted">{gc.loading}</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-text-muted">{emptyText}</p>
      ) : (
        <>
          {/* No items-start here on purpose: letting the grid row stretch
              (the default) makes every card in a row the same height, and
              BankCard's content block already has flex-1 to absorb the
              slack so the buttons still line up at the bottom regardless
              of how much description/stats text a given bank has. */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((g) => (
              <BankCard
                key={g.id}
                guide={g}
                chosenBank={profile?.chosen_bank}
                onChoose={chooseBank}
                onOpenModal={() => setModalBankId(g.id)}
                onOpenAccount={() => setOpenAccountBankId(g.id)}
                bankRanking={bankRankingMap.get(g.id)}
                highlighted={highlightBankId === g.id}
              />
            ))}
          </div>

          {rest.length > 0 && (
            <div className="mt-6 flex flex-col items-center">
              <button
                type="button"
                onClick={() => setShowAll((prev) => !prev)}
                className={`inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface-1 px-6 py-3 text-sm font-semibold text-text-primary transition-colors duration-150 hover:border-accent/40 hover:text-accent-bright ${pressScale}`}
              >
                {showAll ? t.dashboard.collapseBtn : moreBanksLabel(rest.length, lang, t)}
              </button>

              {showAll && (
                <div className="mt-6 grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((g) => (
                    <BankCard
                      key={g.id}
                      guide={g}
                      chosenBank={profile?.chosen_bank}
                      onChoose={chooseBank}
                      onOpenModal={() => setModalBankId(g.id)}
                      onOpenAccount={() => setOpenAccountBankId(g.id)}
                      bankRanking={bankRankingMap.get(g.id)}
                      highlighted={highlightBankId === g.id}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          <BankCardModal
            guide={guides.find((g) => g.id === modalBankId) || null}
            open={modalBankId !== null}
            onClose={() => setModalBankId(null)}
            chosenBank={profile?.chosen_bank}
            onChoose={chooseBank}
          />

          <BankOpenAccountModal
            guide={guides.find((g) => g.id === openAccountBankId) || null}
            open={openAccountBankId !== null}
            onClose={() => setOpenAccountBankId(null)}
          />
        </>
      )}

      {ratingOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            onClick={() => setRatingOpen(false)}
            className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-4"
            style={{ animation: "fadeInRating 150ms ease-out" }}
          >
            <style>{`
              @keyframes fadeInRating { from { opacity: 0; } to { opacity: 1; } }
              @keyframes slideUpRating { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex w-full max-w-lg flex-col max-h-[85vh] rounded-t-3xl border border-border-subtle bg-panel shadow-2xl shadow-black/40 sm:rounded-3xl"
              style={{ animation: "slideUpRating 200ms ease-out" }}
            >
              <div className="flex justify-center pt-2.5 sm:hidden">
                <span className="h-1 w-9 rounded-full bg-white/15" />
              </div>

              <div className="flex flex-shrink-0 items-center justify-between gap-4 border-b border-border-subtle px-5 py-4">
                <div>
                  <p className="text-base font-bold text-text-primary">{t.banks.topRankedTitle}</p>
                  <p className="mt-0.5 text-xs text-text-secondary">{t.banks.rankingDrawerSubtitle}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setRatingOpen(false)}
                  className="flex-shrink-0 rounded-lg border border-transparent p-1.5 text-text-muted transition-colors hover:text-text-primary"
                  aria-label="Close"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-3.5 py-3">
                {/* Top-4 highlighted cards, #1 called out with an accent border */}
                <div className="mb-4 flex flex-col gap-2">
                  {topFour.map((g, idx) => {
                    const reason = BANK_RANK_REASON[g.name];
                    return (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => jumpToBank(g)}
                        className={`flex w-full items-center gap-3 rounded-2xl border p-2.5 text-left transition-colors duration-150 hover:bg-accent/[0.12] ${
                          idx === 0
                            ? "border-accent-bright/60 bg-accent/[0.09]"
                            : "border-accent-dark/35 bg-accent/[0.07]"
                        }`}
                      >
                        <span className="flex h-7 items-center rounded-full bg-accent/25 px-2.5 text-[11px] font-bold text-accent-bright">
                          №{idx + 1}
                        </span>
                        <BankAvatar name={g.name} />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-text-primary">{g.name}</p>
                          {reason ? (
                            <p className="truncate text-xs text-text-secondary">{reason}</p>
                          ) : (
                            g.rating != null && (
                              <div className="mt-0.5 flex items-center gap-1">
                                <StarRating rating={g.rating} />
                              </div>
                            )
                          )}
                        </div>
                        <svg className="h-4 w-4 flex-shrink-0 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    );
                  })}
                </div>

                <p className="mb-1.5 mt-3 border-t border-border-subtle px-2 pt-3 text-[11px] font-semibold uppercase tracking-wide text-text-muted">
                  {t.banks.otherBanksLabel}
                </p>
                {rankedGuides.map((g) => {
                  const rank = bankRankingMap.get(g.id) ?? 0;
                  const reason = BANK_RANK_REASON[g.name];
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => jumpToBank(g)}
                      className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors duration-150 hover:bg-surface-hover"
                    >
                      <span className="w-5 flex-shrink-0 text-center text-[11px] text-text-muted">{rank}</span>
                      <div className="scale-[0.82] origin-left">
                        <BankAvatar name={g.name} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-text-primary">{g.name}</p>
                        {reason && <p className="truncate text-[11px] text-text-secondary">{reason}</p>}
                      </div>
                      {g.rating != null && (
                        <div className="flex-shrink-0">
                          <StarRating rating={g.rating} />
                        </div>
                      )}
                      <svg className="h-4 w-4 flex-shrink-0 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  );
                })}
              </div>

              <div className="flex-shrink-0 border-t border-border-subtle px-5 py-3">
                <p className="text-[11px] leading-relaxed text-text-muted">{t.banks.rankingSourceNote}</p>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
});

export default BankCardGrid;
