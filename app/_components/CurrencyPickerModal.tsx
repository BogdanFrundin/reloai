"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { CURRENCIES } from "../_lib/currency";
import { useCurrency } from "./CurrencyProvider";
import { getFlagUrl } from "../_lib/flags";
import { pressScale } from "../_lib/motion";

export default function CurrencyPickerModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { currency, setCurrency } = useCurrency();

  // `open` only ever becomes true from a client-side click after hydration,
  // so document.body is always available here — no mount-detection needed.
  if (!open) return null;

  function handlePick(code: (typeof CURRENCIES)[number]["code"]) {
    setCurrency(code);
    onClose();
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-[opacity] duration-150 ease-[var(--ease-out-strong)] starting:opacity-0"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-sm rounded-2xl border border-border-subtle bg-panel p-6 shadow-2xl shadow-black/40 transition-[opacity,transform] duration-150 ease-[var(--ease-out-strong)] starting:opacity-0 starting:scale-95"
      >
        <h2 className="text-lg font-bold text-text-primary">Валюта</h2>
        <p className="mt-1 text-sm text-text-muted">
          В какой валюте показывать цены на сайте (курс к злотому обновляется автоматически).
        </p>

        <div className="mt-5 max-h-[60vh] space-y-1.5 overflow-y-auto">
          {CURRENCIES.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => handlePick(c.code)}
              className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors duration-150 ${
                currency === c.code
                  ? "border-accent/50 bg-accent/10 text-accent-bright"
                  : "border-border-strong bg-surface-1 text-text-secondary hover:border-border-strong hover:text-text-primary"
              } ${pressScale}`}
            >
              <Image
                src={getFlagUrl(c.flag, "sm")}
                alt={c.name}
                width={24}
                height={18}
                className="flex-shrink-0 rounded-sm"
                unoptimized
              />
              <span className="min-w-0 flex-1 truncate">{c.name}</span>
              <span className="flex-shrink-0 text-xs text-text-muted">{c.symbol}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onClose}
          className={`mt-4 w-full rounded-full border border-border-strong bg-surface-1 px-5 py-2.5 text-sm font-semibold text-text-secondary transition-colors duration-150 hover:border-border-strong hover:text-text-primary ${pressScale}`}
        >
          Отмена
        </button>
      </div>
    </div>,
    document.body,
  );
}
