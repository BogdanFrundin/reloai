"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { DocumentGuide } from "./DocumentGuideList";
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

const TAG_ORDER = ["no_pesel", "fully_online", "free", "multicurrency"] as const;

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

// Headline replaces the old price display: the bank's single most useful
// feature, in plain language, so the card leads with "what's in it for you"
// instead of a number that was often just "0 zł" for most banks anyway.
function buildHeadline(guide: DocumentGuide, t: Dictionary): { headline: string; subtitle: string } {
  const tagLabels: Record<string, string> = {
    no_pesel: t.guideCard.tags.noPesel,
    fully_online: t.guideCard.tags.fullyOnline,
    free: t.guideCard.tags.free,
    multicurrency: t.guideCard.tags.multicurrency,
  };
  const headlinePhrases: Record<string, string> = {
    no_pesel: t.guideCard.headlines.noPesel,
    fully_online: t.guideCard.headlines.fullyOnline,
    free: t.guideCard.headlines.free,
    multicurrency: t.guideCard.headlines.multicurrency,
  };
  const tags = TAG_ORDER.filter((tag) => guide.tags?.includes(tag));
  if (tags.length === 0) {
    // No subtitle here: guide.cost/price_label can be a full sentence for
    // some banks (e.g. Plus Bank's tariff conditions), which looks broken
    // squeezed into this single-line slot. The always-visible description
    // below already covers pricing details in full, so this line is left
    // blank rather than truncating raw pricing text mid-word.
    return { headline: t.guideCard.classicAccount, subtitle: "" };
  }
  const [first, ...rest] = tags;
  const headline = headlinePhrases[first] ?? tagLabels[first];
  const subtitle = rest.map((tag) => tagLabels[tag]).join(" · ");
  return { headline, subtitle };
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

function BankCard({
  guide,
  chosenBank,
  onChoose,
  onOpenModal,
}: {
  guide: DocumentGuide;
  chosenBank: string | null | undefined;
  onChoose: (name: string | null) => void;
  onOpenModal: () => void;
}) {
  const router = useRouter();
  const { currency, rates } = useCurrency();
  const { t, lang } = useLanguage();
  const gc = t.guideCard;
  const chosenCount = formatChosenCount(getChosenCount(guide.id), lang);
  const rawLink = guide.online_url || guide.links?.[0];
  const link = rawLink ? (rawLink.startsWith("http") ? rawLink : `https://${rawLink}`) : null;
  const isChosen = chosenBank === guide.name;
  const { headline, subtitle } = buildHeadline(guide, t);
  const cost = convertPlnText(guide.cost, currency, rates);

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
      className="group relative flex min-h-[280px] flex-col rounded-2xl border border-border-subtle bg-surface-1 transition-[transform,box-shadow,background-color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-lg hover:shadow-accent/20 motion-reduce:transition-none p-4 sm:p-5"
    >
      {guide.rating != null && (
        <div className="absolute right-4 top-4 sm:right-5 sm:top-5">
          <StarRating rating={guide.rating} />
        </div>
      )}

      <div className="flex w-full flex-1 flex-col items-start gap-4 text-left">
        <div className="flex w-full items-start gap-2.5">
          <BankAvatar name={guide.name} />
          <p className="line-clamp-2 flex-1 text-lg sm:text-xl font-bold text-text-primary">
            {guide.name}{" "}
            <span className="text-sm font-medium text-text-secondary [&_span[role='button']]:ml-1 [&_span[role='button']]:h-3.5 [&_span[role='button']]:w-3.5">
              (<TextWithGlossary text={headline} />)
            </span>
          </p>
        </div>

        <div className="w-full min-w-0">
          <p className="min-h-[1.5rem] line-clamp-1 text-xs text-text-muted">
            {subtitle && <TextWithGlossary text={subtitle} />}
          </p>
          {guide.description && (
            <p className="mt-2 text-xs leading-relaxed text-text-secondary">
              <TextWithGlossary text={guide.description} />
            </p>
          )}
          <div className="mt-2 flex min-h-[1.5rem] items-center gap-1.5">
            <svg className="h-3 w-3 flex-shrink-0 text-blue-300/80" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a4 4 0 100 8 4 4 0 000-8zM2 17a8 8 0 1116 0H2z" />
            </svg>
            <p className="text-xs text-blue-300/80">{t.common.chosenByCountTemplate.replace("{n}", chosenCount)}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          onClick={onOpenModal}
          className="flex-1 rounded-xl border border-border-subtle bg-surface-hover text-accent-bright px-3 py-2.5 text-xs font-semibold transition-colors duration-150 hover:border-accent/40 hover:bg-accent/10"
        >
          {gc.bankInfo}
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
  };
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [modalBankId, setModalBankId] = useState<string | null>(null);

  const term = search.trim().toLowerCase();
  const tagFiltered = activeTag === null ? guides : guides.filter((g) => g.tags?.includes(activeTag));
  const filtered = term
    ? tagFiltered.filter(
        (g) => g.name.toLowerCase().includes(term) || (g.description ?? "").toLowerCase().includes(term)
      )
    : tagFiltered;

  const featured = filtered.slice(0, 4);
  const rest = filtered.slice(4);

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
      <div className="mb-6 rounded-xl border border-border-subtle bg-surface-1 p-3 sm:p-4">
        <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors duration-150 ${
              activeTag === null
                ? "border-accent bg-accent/20 text-accent-bright"
                : "border-border-strong bg-white/[0.1] text-white/90 hover:text-white"
            }`}
          >
            {gc.allTag}
          </button>
          {TAG_ORDER.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors duration-150 ${
                activeTag === tag
                  ? "border-accent bg-accent/15 text-accent-bright"
                  : "border-border-strong bg-white/[0.1] text-white/90 hover:text-white"
              }`}
            >
              {tagLabels[tag]}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="max-w-sm flex-1">
            <input
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={searchPlaceholder ?? gc.searchGeneric}
              className="w-full rounded-full border border-border-strong bg-white/[0.1] px-4 py-2 text-sm text-text-primary placeholder:text-white/70 focus:border-accent focus:outline-none"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-text-muted">{gc.loading}</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-text-muted">{emptyText}</p>
      ) : (
        <>
          <div className="grid items-start gap-4 sm:grid-cols-2">
            {featured.map((g) => (
              <BankCard
                key={g.id}
                guide={g}
                chosenBank={profile?.chosen_bank}
                onChoose={chooseBank}
                onOpenModal={() => setModalBankId(g.id)}
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
                <div className="mt-6 grid w-full items-start gap-4 sm:grid-cols-2">
                  {rest.map((g) => (
                    <BankCard
                      key={g.id}
                      guide={g}
                      chosenBank={profile?.chosen_bank}
                      onChoose={chooseBank}
                      onOpenModal={() => setModalBankId(g.id)}
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
