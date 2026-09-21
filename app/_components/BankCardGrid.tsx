"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { DocumentGuide } from "./DocumentGuideList";
import { getBankImage } from "../_lib/bankImages";
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
import { supabase } from "../../lib/supabase";
import { buildGoogleMapsUrl } from "../_lib/mapsLink";
import type { Dictionary, Lang } from "../_lib/i18n";
import { getChosenCount, formatChosenCount } from "../_lib/chosenCount";

const TAG_ORDER = ["no_pesel", "free", "multicurrency", "for_foreigners", "fully_online"] as const;

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

// Up to 2 short pill-style tag chips shown under the bank name (matching the
// "Надёжный / Популярный" chip row in the reference design) — replaces the
// old parenthetical headline+subtitle text. Falls back to a curated
// per-bank highlight (or a generic "classic account" label) for banks with
// none of the 5 standard filter tags, so the chip row never renders empty.
function buildTagChips(guide: DocumentGuide, t: Dictionary): string[] {
  const tagLabels: Record<string, string> = {
    no_pesel: t.guideCard.tags.noPesel,
    fully_online: t.guideCard.tags.fullyOnline,
    free: t.guideCard.tags.free,
    multicurrency: t.guideCard.tags.multicurrency,
    for_foreigners: t.guideCard.tags.forForeigners,
  };
  const tags = TAG_ORDER.filter((tag) => guide.tags?.includes(tag));
  if (tags.length > 0) return tags.slice(0, 2).map((tag) => tagLabels[tag]);
  const fallback = t.guideCard.bankHighlights[guide.name];
  return [fallback || t.guideCard.classicAccount];
}

// Real, publicly-sourced client/branch figures for the 4 featured banks
// (verified via each bank's own investor-relations / press materials in
// Sept 2026 — see chat history for sources). Deliberately left out for every
// other bank rather than guessed: the stat row below only renders the
// figures we actually have, plus the always-available real account-opening
// price from `price_label` (already populated in Supabase for most banks).
type BankStat = { clients: string; branches?: string };
const BANK_STATS: Record<string, Partial<Record<Lang, BankStat>>> = {
  mBank: {
    ru: { clients: "6+ млн", branches: "без отделений" },
    en: { clients: "6M+", branches: "no branches" },
    uk: { clients: "6+ млн", branches: "без відділень" },
    uz: { clients: "6+ mln", branches: "filiallarsiz" },
    tr: { clients: "6M+", branches: "şubesiz" },
    tg: { clients: "6+ млн", branches: "бе шӯъба" },
  },
  "ING Bank Śląski": {
    ru: { clients: "4,7 млн" },
    en: { clients: "4.7M" },
    uk: { clients: "4,7 млн" },
    uz: { clients: "4,7 mln" },
    tr: { clients: "4,7M" },
    tg: { clients: "4,7 млн" },
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
};

function getBankStats(name: string, lang: Lang): BankStat | undefined {
  return BANK_STATS[name]?.[lang];
}

function StatCell({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-sm font-bold text-text-primary">{value}</p>
      <p className="text-[10px] text-text-muted">{label}</p>
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
  bankRanking,
}: {
  guide: DocumentGuide;
  chosenBank: string | null | undefined;
  onChoose: (name: string | null) => void;
  onOpenModal: () => void;
  bankRanking?: number;
}) {
  const router = useRouter();
  const { currency, rates } = useCurrency();
  const { t, lang } = useLanguage();
  const gc = t.guideCard;
  const chosenCount = formatChosenCount(getChosenCount(guide.id), lang);
  const rawLink = guide.online_url || guide.links?.[0];
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
      className="group relative flex min-h-[280px] flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface-1 transition-[transform,box-shadow,background-color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-lg hover:shadow-accent/20 motion-reduce:transition-none"
    >
      {bankImage && (
        <div className="relative h-28 w-full flex-shrink-0 overflow-hidden sm:h-32">
          <Image
            src={bankImage}
            alt={guide.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
          {bankRanking != null && bankRanking <= 4 && (
            <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-lg border border-white/20 bg-black/40 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.363 1.118l1.287 3.957c.3.922-.755 1.688-1.539 1.118l-3.367-2.446a1 1 0 00-1.176 0l-3.367 2.446c-.784.57-1.838-.196-1.539-1.118l1.286-3.957a1 1 0 00-.363-1.118L2.062 9.385c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.958z" />
              </svg>
              #{bankRanking} {t.banks.byReviews}
            </span>
          )}
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-2.5 p-3">
            <BankAvatar name={guide.name} />
            <p className="line-clamp-1 flex-1 text-base font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] sm:text-lg">
              {guide.name}
            </p>
          </div>
        </div>
      )}

      {!bankImage && bankRanking != null && bankRanking <= 4 && (
        <div className="absolute right-4 top-4 sm:right-5 sm:top-5">
          <span className="inline-flex items-center gap-1 rounded-lg border border-accent/20 bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent-bright">
            <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
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
                key={chip}
                className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent-bright"
              >
                <TextWithGlossary text={chip} />
              </span>
            ))}
          </div>
          {guide.description && (
            <p className="mt-2 text-xs leading-relaxed text-text-secondary">
              <TextWithGlossary text={guide.description} />
            </p>
          )}
          {(stats?.clients || stats?.branches || guide.price_label) && (
            <div className="mt-3 flex flex-wrap gap-4">
              {stats?.clients && <StatCell value={stats.clients} label={gc.statClients} />}
              {stats?.branches && <StatCell value={stats.branches} label={gc.statBranches} />}
              {guide.price_label && <StatCell value={guide.price_label} label={gc.statOpeningCost} />}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 px-4 pb-4 sm:px-5 sm:pb-5" onClick={(event) => event.stopPropagation()}>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-1.5 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-accent/90 ${pressScale}`}
          >
            {t.banks.openAccount}
            <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-0.5">→</span>
          </a>
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

export default function BankCardGrid({
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
  const [showMoreTags, setShowMoreTags] = useState(false);

  const visibleTagsCount = 4;
  const visibleTags = TAG_ORDER.slice(0, visibleTagsCount);
  const hiddenTags = TAG_ORDER.slice(visibleTagsCount);

  const term = search.trim().toLowerCase();
  const tagFiltered = activeTag === null ? guides : guides.filter((g) => g.tags?.includes(activeTag));
  const filtered = term
    ? tagFiltered.filter(
        (g) => g.name.toLowerCase().includes(term) || (g.description ?? "").toLowerCase().includes(term)
      )
    : tagFiltered;

  const rankedGuides = [...guides].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  const bankRankingMap = new Map(rankedGuides.map((g, idx) => [g.id, idx + 1]));

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
      <div className="mb-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors duration-150 ${
              activeTag === null
                ? "border-accent bg-accent/20 text-accent-bright"
                : "border-border-strong bg-surface-1 text-text-secondary hover:text-text-primary"
            }`}
          >
            {t.banks.allBanksTemplate.replace("{n}", String(guides.length))}
          </button>
          {visibleTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors duration-150 ${
                activeTag === tag
                  ? "border-accent bg-accent/15 text-accent-bright"
                  : "border-border-strong bg-surface-1 text-text-secondary hover:text-text-primary"
              }`}
            >
              {tagLabels[tag]}
            </button>
          ))}
          {hiddenTags.length > 0 && (
            <button
              type="button"
              onClick={() => setShowMoreTags(!showMoreTags)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors duration-150 ${
                showMoreTags
                  ? "border-accent bg-accent/15 text-accent-bright"
                  : "border-border-strong bg-surface-1 text-text-secondary hover:text-text-primary"
              }`}
            >
              {t.banks.moreFiltersBtn} <span className={`ml-1 transition-transform ${showMoreTags ? "rotate-180" : ""}`}>⌄</span>
            </button>
          )}
          {showMoreTags && hiddenTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors duration-150 ${
                activeTag === tag
                  ? "border-accent bg-accent/15 text-accent-bright"
                  : "border-border-strong bg-surface-1 text-text-secondary hover:text-text-primary"
              }`}
            >
              {tagLabels[tag]}
            </button>
          ))}
      </div>

      {loading ? (
        <p className="text-sm text-text-muted">{gc.loading}</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-text-muted">{emptyText}</p>
      ) : (
        <>
          <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((g) => (
              <BankCard
                key={g.id}
                guide={g}
                chosenBank={profile?.chosen_bank}
                onChoose={chooseBank}
                onOpenModal={() => setModalBankId(g.id)}
                bankRanking={bankRankingMap.get(g.id)}
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
                <div className="mt-6 grid w-full items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((g) => (
                    <BankCard
                      key={g.id}
                      guide={g}
                      chosenBank={profile?.chosen_bank}
                      onChoose={chooseBank}
                      onOpenModal={() => setModalBankId(g.id)}
                      bankRanking={bankRankingMap.get(g.id)}
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
        </>
      )}
    </div>
  );
}
