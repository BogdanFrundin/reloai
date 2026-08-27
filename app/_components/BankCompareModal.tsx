"use client";

import { createPortal } from "react-dom";
import type { DocumentGuide } from "./DocumentGuideList";
import { TAG_LABELS } from "./BankCardGrid";
import { useCurrency } from "./CurrencyProvider";
import { convertPlnText, type CurrencyCode, type RatesMap } from "../_lib/currency";
import CurrencyHint from "./CurrencyHint";
import { buildGoogleMapsUrl } from "../_lib/mapsLink";

const ROWS: {
  key: string;
  label: string;
  render: (g: DocumentGuide, currency: CurrencyCode, rates: RatesMap | null) => string;
}[] = [
  { key: "cost", label: "Стоимость", render: (g, currency, rates) => convertPlnText(g.cost, currency, rates) || "—" },
  { key: "where_to_submit", label: "Куда подавать", render: (g) => g.where_to_submit ?? "—" },
  {
    key: "required_docs",
    label: "Документы",
    render: (g) => (g.required_docs && g.required_docs.length > 0 ? g.required_docs.join("; ") : "—"),
  },
  {
    key: "tags",
    label: "Теги",
    render: (g) => (g.tags && g.tags.length > 0 ? g.tags.map((tag) => TAG_LABELS[tag] ?? tag).join(", ") : "—"),
  },
];

export default function BankCompareModal({
  open,
  onClose,
  guides,
}: {
  open: boolean;
  onClose: () => void;
  guides: DocumentGuide[];
}) {
  const { currency, rates } = useCurrency();
  // `open` only ever becomes true from a client-side click after hydration,
  // so document.body is always available here — no mount-detection needed.
  if (!open) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-[opacity] duration-150 ease-[var(--ease-out-strong)] starting:opacity-0"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-3xl rounded-2xl border border-border-subtle bg-panel p-6 shadow-2xl shadow-black/40 transition-[opacity,transform] duration-150 ease-[var(--ease-out-strong)] starting:opacity-0 starting:scale-95"
      >
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-bold text-text-primary">Сравнение банков</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-border-subtle bg-surface-1 text-text-muted transition-colors duration-150 hover:border-border-strong hover:text-text-primary"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border-subtle">
                <th className="p-3 text-left text-xs font-semibold text-text-primary" />
                {guides.map((g) => (
                  <th key={g.id} className="p-3 text-left text-xs font-semibold text-text-primary">
                    {g.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.key} className="border-b border-border-subtle">
                  <td className="p-3 text-left text-xs font-semibold text-text-secondary">
                    <span className="flex items-center gap-1">
                      {row.label}
                      {row.key === "cost" && <CurrencyHint />}
                    </span>
                  </td>
                  {guides.map((g) => (
                    <td key={g.id} className="p-3 text-left text-xs text-text-secondary">
                      {row.render(g, currency, rates)}
                      {row.key === "where_to_submit" && g.where_to_submit && (
                        <a
                          href={buildGoogleMapsUrl([g.where_to_submit, "Poland"])}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 block font-semibold text-accent-bright hover:underline"
                        >
                          На карте →
                        </a>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>,
    document.body,
  );
}
