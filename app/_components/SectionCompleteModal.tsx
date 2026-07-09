"use client";

import { useLanguage } from "./LanguageProvider";
import { pressScale } from "../_lib/motion";

export default function SectionCompleteModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useLanguage();

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-[opacity] duration-150 ease-[var(--ease-out-strong)] starting:opacity-0"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#0d0d0f] p-6 text-center shadow-2xl shadow-black/40 transition-[opacity,transform] duration-150 ease-[var(--ease-out-strong)] starting:opacity-0 starting:scale-95"
      >
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-2xl">
          🎉
        </span>
        <h2 className="mt-4 text-lg font-bold text-white">{t.documents.sectionCompleteHeading}</h2>
        <p className="mt-2 text-sm text-slate-400">{t.documents.sectionCompleteBody}</p>
        <button
          type="button"
          onClick={onClose}
          className={`mt-6 w-full rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-accent-bright ${pressScale}`}
        >
          {t.documents.sectionCompleteDismiss}
        </button>
      </div>
    </div>
  );
}
