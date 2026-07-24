"use client";

import { createPortal } from "react-dom";
import { useLanguage } from "./LanguageProvider";
import PricingPlansGrid from "./PricingPlansGrid";

export default function UpgradeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLanguage();
  const ap = t.appPricing;

  // `open` only ever becomes true from a client-side click after hydration,
  // so document.body is always available here — no mount-detection needed.
  if (!open) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm transition-[opacity] duration-150 ease-[var(--ease-out-strong)] starting:opacity-0"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-5xl rounded-2xl border border-border-subtle bg-panel p-6 shadow-2xl shadow-black/40 transition-[opacity,transform] duration-150 ease-[var(--ease-out-strong)] starting:opacity-0 starting:scale-95 sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t.aiChat.closeAria}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-surface-1 text-text-muted transition-colors duration-150 hover:border-border-strong hover:text-text-primary"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">{ap.title}</h2>
          <p className="mt-2 text-sm text-text-muted">{ap.subtitle}</p>
        </div>

        <div className="mt-8">
          <PricingPlansGrid onPlanSelected={onClose} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
