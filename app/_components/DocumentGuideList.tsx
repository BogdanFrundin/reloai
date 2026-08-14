"use client";

import { useState } from "react";

export type DocumentGuide = {
  id: string;
  name: string;
  description: string | null;
  when_to_get: string | null;
  where_to_submit: string | null;
  working_hours: string | null;
  online_booking: string | null;
  required_docs: string[] | null;
  cost: string | null;
  waiting_time: string | null;
  instructions: string[] | null;
  common_mistakes: string[] | null;
  tips: string[] | null;
  links: string[] | null;
  important_2026: string | null;
  category: string;
  type: string;
  pdf_url: string | null;
  online_url: string | null;
  countries: Record<string, boolean> | null;
  tags: string[] | null;
};

// Returns true if the guide is relevant for a given citizenship (ISO alpha-2 code).
// Missing countries data, or no citizenship known yet, defaults to visible.
export function guideAppliesTo(guide: Pick<DocumentGuide, "countries">, citizenship: string | null | undefined): boolean {
  if (!citizenship) return true;
  const countries = guide.countries;
  if (!countries || !(citizenship in countries)) return true;
  return countries[citizenship] !== false;
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

function GuideCard({ guide }: { guide: DocumentGuide }) {
  const [open, setOpen] = useState(false);
  const rawLink = guide.online_url || guide.links?.[0];
  const link = rawLink ? (rawLink.startsWith("http") ? rawLink : `https://${rawLink}`) : null;

  return (
    <div className="rounded-2xl border border-border-subtle bg-surface-1 backdrop-blur-sm">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
      >
        <div>
          <p className="text-sm font-semibold text-text-primary">{guide.name}</p>
          {guide.description && (
            <p className={`mt-1 text-xs text-text-muted ${open ? "" : "line-clamp-2"}`}>{guide.description}</p>
          )}
        </div>
        <span
          className={`mt-1 flex-shrink-0 text-text-muted transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        >
          {CHEVRON_ICON}
        </span>
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

export default function DocumentGuideList({
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
  const term = search.trim().toLowerCase();
  const filtered = term
    ? guides.filter(
        (g) => g.name.toLowerCase().includes(term) || (g.description ?? "").toLowerCase().includes(term)
      )
    : guides;

  return (
    <div>
      <div className="mb-4 max-w-sm">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full rounded-full border border-border-strong bg-surface-1 px-4 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
        />
      </div>
      {loading ? (
        <p className="text-sm text-text-muted">Загрузка…</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-text-muted">{emptyText}</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((g) => (
            <GuideCard key={g.id} guide={g} />
          ))}
        </div>
      )}
    </div>
  );
}
