"use client";

import { useState } from "react";
import type { DocumentGuide } from "./DocumentGuideList";
import { pressScale } from "../_lib/motion";

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

function BankAvatar({ name }: { name: string }) {
  const domain = findLogoDomain(name);
  const [failed, setFailed] = useState(false);
  const initials = name
    .replace(/^Bank\s+/i, "")
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (domain && !failed) {
    return (
      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white/95 p-1.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://logo.clearbit.com/${domain}?size=80`}
          alt={name}
          className="h-full w-full object-contain"
          onError={() => setFailed(true)}
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

const CHEVRON_ICON = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

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

function BankCard({ guide }: { guide: DocumentGuide }) {
  const [open, setOpen] = useState(false);
  const rawLink = guide.online_url || guide.links?.[0];
  const link = rawLink ? (rawLink.startsWith("http") ? rawLink : `https://${rawLink}`) : null;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface-1 backdrop-blur-sm">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full flex-col items-start gap-3 p-5 text-left"
      >
        <div className="flex w-full items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <BankAvatar name={guide.name} />
            <p className="text-sm font-semibold text-text-primary">{guide.name}</p>
          </div>
          <span
            className={`mt-1 flex-shrink-0 text-text-muted transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          >
            {CHEVRON_ICON}
          </span>
        </div>
        {guide.description && (
          <p className={`text-xs text-text-muted ${open ? "" : "line-clamp-3"}`}>{guide.description}</p>
        )}
      </button>

      {open && (
        <div className="space-y-4 border-t border-border-subtle px-5 py-4">
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
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const term = search.trim().toLowerCase();
  const filtered = term
    ? guides.filter(
        (g) => g.name.toLowerCase().includes(term) || (g.description ?? "").toLowerCase().includes(term)
      )
    : guides;

  const featured = filtered.slice(0, 4);
  const rest = filtered.slice(4);

  function handleSearchChange(value: string) {
    setSearch(value);
    setShowAll(false);
  }

  return (
    <div>
      <div className="mb-4 max-w-sm">
        <input
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full rounded-full border border-border-strong bg-surface-1 px-4 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
        />
      </div>
      {loading ? (
        <p className="text-sm text-text-muted">Загрузка…</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-text-muted">{emptyText}</p>
      ) : (
        <>
          <div className="grid items-stretch gap-4 sm:grid-cols-2">
            {featured.map((g) => (
              <BankCard key={g.id} guide={g} />
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
                    <BankCard key={g.id} guide={g} />
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
