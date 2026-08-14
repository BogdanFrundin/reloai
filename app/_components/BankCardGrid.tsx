"use client";

import { useState } from "react";
import type { DocumentGuide } from "./DocumentGuideList";
import { pressScale } from "../_lib/motion";
import { useAuth } from "./AuthProvider";
import { supabase } from "../../lib/supabase";
import BankCompareModal from "./BankCompareModal";

export const TAG_LABELS: Record<string, string> = {
  no_pesel: "Без PESEL",
  fully_online: "Полностью онлайн",
  free: "Бесплатно",
  multicurrency: "Мультивалютный",
};

const TAG_ORDER = ["no_pesel", "fully_online", "free", "multicurrency"];

const HEADLINE_PHRASES: Record<string, string> = {
  no_pesel: "Без PESEL",
  fully_online: "Открыть счёт онлайн",
  free: "Бесплатное обслуживание",
  multicurrency: "Мультивалютный счёт",
};

function isRecommended(guide: DocumentGuide): boolean {
  return !!guide.tags?.includes("no_pesel") && !!guide.tags?.includes("free");
}

// Headline replaces the old price display: the bank's single most useful
// feature, in plain language, so the card leads with "what's in it for you"
// instead of a number that was often just "0 zł" for most banks anyway.
function buildHeadline(guide: DocumentGuide): { headline: string; subtitle: string } {
  const tags = TAG_ORDER.filter((t) => guide.tags?.includes(t));
  if (tags.length === 0) {
    return { headline: "Классический счёт", subtitle: guide.cost ?? "" };
  }
  const [first, ...rest] = tags;
  const headline = HEADLINE_PHRASES[first] ?? TAG_LABELS[first];
  const subtitle = rest.map((t) => TAG_LABELS[t]).join(" · ");
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
};

function findLogoDomain(name: string): string | null {
  const lower = name.toLowerCase();
  for (const [key, domain] of Object.entries(BANK_DOMAINS)) {
    if (lower.includes(key)) return domain;
  }
  return null;
}

// Clearbit's free logo API gets silently blocked by common ad-blocker filter
// lists (its domain is tagged as a tracker), which made every logo fall back
// to initials regardless of whether we had a domain mapped. Google's favicon
// service and DuckDuckGo's icon service are effectively never blocked, so we
// try those in order before giving up to initials.
function logoSrc(domain: string, stage: 0 | 1 | 2): string {
  return stage === 0
    ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
    : `https://icons.duckduckgo.com/ip3/${domain}.ico`;
}

function BankAvatar({ name }: { name: string }) {
  const domain = findLogoDomain(name);
  const [stage, setStage] = useState<0 | 1 | 2>(0);
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
          src={logoSrc(domain, stage)}
          alt={name}
          className="h-full w-full object-contain"
          onError={() => setStage((prev) => (prev === 0 ? 1 : 2))}
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

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-xs">
      <p className="text-text-muted">{label}</p>
      <p className="mt-0.5 text-text-secondary">{value}</p>
    </div>
  );
}

function Bullets({ items, tone }: { items: string[]; tone?: "warn" | "accent" }) {
  const textClass = tone === "warn" ? "text-red-300" : tone === "accent" ? "text-text-secondary" : "text-text-secondary";
  const dotClass = tone === "warn" ? "bg-red-400" : tone === "accent" ? "bg-accent-bright" : "bg-text-muted";
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

function BankCard({
  guide,
  compareChecked,
  onToggleCompare,
  chosenBank,
  onChoose,
}: {
  guide: DocumentGuide;
  compareChecked: boolean;
  onToggleCompare: (id: string) => void;
  chosenBank: string | null | undefined;
  onChoose: (name: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const rawLink = guide.online_url || guide.links?.[0];
  const link = rawLink ? (rawLink.startsWith("http") ? rawLink : `https://${rawLink}`) : null;
  const recommended = isRecommended(guide);
  const isChosen = chosenBank === guide.name;
  const { headline, subtitle } = buildHeadline(guide);

  return (
    <div
      className={`relative flex h-full flex-col rounded-[28px] p-6 ${
        recommended ? "bg-[#1a2340]" : "bg-[#1c1f26]"
      }`}
    >
      <label
        className={`absolute right-5 top-5 z-10 flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg transition-colors duration-150 ${
          compareChecked ? "bg-white text-[#1c1f26]" : "bg-white/10 text-white/70 hover:bg-white/15"
        }`}
      >
        <input
          type="checkbox"
          checked={compareChecked}
          onChange={() => onToggleCompare(guide.id)}
          aria-label="Добавить к сравнению"
          className="sr-only"
        />
        {compareChecked ? (
          <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.6 3.6 6.7-6.7a1 1 0 011.4 0z" />
          </svg>
        ) : (
          <span className="text-[13px] leading-none">⋯</span>
        )}
      </label>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full flex-col items-start gap-4 pr-8 text-left"
      >
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <BankAvatar name={guide.name} />
            <p className={`text-[13px] font-medium ${recommended ? "text-[#9fb0e8]" : "text-white/50"}`}>
              {guide.name}
            </p>
          </div>
          {recommended && (
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-[#c9d6ff]">
              Рекомендуем
            </span>
          )}
        </div>

        <div>
          <p className="text-[22px] font-bold leading-tight text-white">{headline}</p>
          {subtitle && <p className="mt-2 text-xs text-white/50">{subtitle}</p>}
        </div>

        {open && guide.description && (
          <p className="text-xs leading-relaxed text-white/60">{guide.description}</p>
        )}
      </button>

      <div className="mt-4" onClick={(event) => event.stopPropagation()}>
        {isChosen ? (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
            <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.6 3.6 6.7-6.7a1 1 0 011.4 0z" />
            </svg>
            Вы выбрали этот банк
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              setOpen(true);
              onChoose(guide.name);
            }}
            className={`w-full rounded-2xl py-3 text-[13px] font-bold transition-colors duration-150 ${
              recommended
                ? "bg-white text-[#1a2340] hover:bg-white/90"
                : "bg-white/10 text-white hover:bg-white/15"
            }`}
          >
            Выбрать банк →
          </button>
        )}
      </div>

      {open && (
        <div className="mt-4 space-y-4 border-t border-white/10 pt-4">
          {guide.important_2026 && (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs leading-relaxed text-amber-200">
              {guide.important_2026}
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            {guide.when_to_get && <InfoRow label="Когда оформлять" value={guide.when_to_get} />}
            {guide.where_to_submit && <InfoRow label="Куда подавать" value={guide.where_to_submit} />}
            {guide.working_hours && <InfoRow label="Часы работы" value={guide.working_hours} />}
            {guide.online_booking && <InfoRow label="Запись онлайн" value={guide.online_booking} />}
            {guide.cost && <InfoRow label="Стоимость" value={guide.cost} />}
            {guide.waiting_time && <InfoRow label="Срок ожидания" value={guide.waiting_time} />}
          </div>

          {guide.required_docs && guide.required_docs.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-text-secondary">Документы</p>
              <div className="mt-1.5">
                <Bullets items={guide.required_docs} />
              </div>
            </div>
          )}

          {guide.instructions && guide.instructions.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-text-secondary">Как оформить</p>
              <ol className="mt-1.5 space-y-1.5">
                {guide.instructions.map((step, i) => (
                  <li key={step} className="flex items-start gap-2 text-xs text-text-secondary">
                    <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-[10px] font-bold text-accent-bright">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {guide.tips && guide.tips.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-text-secondary">Советы</p>
              <div className="mt-1.5">
                <Bullets items={guide.tips} tone="accent" />
              </div>
            </div>
          )}

          {guide.common_mistakes && guide.common_mistakes.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-text-secondary">Частые ошибки</p>
              <div className="mt-1.5">
                <Bullets items={guide.common_mistakes} tone="warn" />
              </div>
            </div>
          )}

          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-accent/50 px-4 py-2 text-xs font-semibold text-accent-bright transition-colors duration-150 hover:border-accent hover:bg-accent hover:text-white"
            >
              Официальный сайт
              <span aria-hidden>→</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default function BankCardGrid({
  guides,
  loading,
  emptyText,
  searchPlaceholder = "Поиск",
}: {
  guides: DocumentGuide[];
  loading: boolean;
  emptyText: string;
  searchPlaceholder?: string;
}) {
  const { user, profile, refreshProfile } = useAuth();
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [compareIds, setCompareIds] = useState<Set<string>>(new Set());
  const [compareOpen, setCompareOpen] = useState(false);

  const term = search.trim().toLowerCase();
  const tagFiltered = activeTag === null ? guides : guides.filter((g) => g.tags?.includes(activeTag));
  const filtered = term
    ? tagFiltered.filter(
        (g) => g.name.toLowerCase().includes(term) || (g.description ?? "").toLowerCase().includes(term)
      )
    : tagFiltered;

  const featured = filtered.slice(0, 4);
  const rest = filtered.slice(4);
  const compareGuides = guides.filter((g) => compareIds.has(g.id));

  function handleSearchChange(value: string) {
    setSearch(value);
    setShowAll(false);
  }

  function toggleCompare(id: string) {
    setCompareIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (next.size >= 3) return prev;
        next.add(id);
      }
      return next;
    });
  }

  async function chooseBank(name: string) {
    if (!user) return;
    await supabase.from("profiles").update({ chosen_bank: name }).eq("id", user.id);
    await refreshProfile();
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveTag(null)}
          className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors duration-150 ${
            activeTag === null
              ? "border-accent bg-accent/15 text-accent-bright"
              : "border-border-strong bg-surface-1 text-text-muted hover:text-text-primary"
          }`}
        >
          Все
        </button>
        {TAG_ORDER.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors duration-150 ${
              activeTag === tag
                ? "border-accent bg-accent/15 text-accent-bright"
                : "border-border-strong bg-surface-1 text-text-muted hover:text-text-primary"
            }`}
          >
            {TAG_LABELS[tag]}
          </button>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="max-w-sm flex-1">
          <input
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-full border border-border-strong bg-surface-1 px-4 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
          />
        </div>
        {compareIds.size >= 2 && (
          <button
            type="button"
            onClick={() => setCompareOpen(true)}
            className="rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-semibold text-accent-bright"
          >
            Сравнить ({compareIds.size}) →
          </button>
        )}
      </div>

      {loading ? (
        <p className="text-sm text-text-muted">Загрузка…</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-text-muted">{emptyText}</p>
      ) : (
        <>
          <div className="grid items-stretch gap-4 sm:grid-cols-2">
            {featured.map((g) => (
              <BankCard
                key={g.id}
                guide={g}
                compareChecked={compareIds.has(g.id)}
                onToggleCompare={toggleCompare}
                chosenBank={profile?.chosen_bank}
                onChoose={chooseBank}
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
                {showAll ? "Скрыть" : "Другие банки"}
              </button>

              {showAll && (
                <div className="mt-6 grid w-full items-stretch gap-4 sm:grid-cols-2">
                  {rest.map((g) => (
                    <BankCard
                      key={g.id}
                      guide={g}
                      compareChecked={compareIds.has(g.id)}
                      onToggleCompare={toggleCompare}
                      chosenBank={profile?.chosen_bank}
                      onChoose={chooseBank}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}

      <BankCompareModal open={compareOpen} onClose={() => setCompareOpen(false)} guides={compareGuides} />
    </div>
  );
}
