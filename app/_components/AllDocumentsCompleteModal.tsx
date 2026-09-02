"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useLanguage } from "./LanguageProvider";
import { pressScale } from "../_lib/motion";
import { fireConfetti } from "../_lib/confetti";

export default function AllDocumentsCompleteModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useLanguage();

  useEffect(() => {
    if (open) fireConfetti();
  }, [open]);

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
        className="w-full max-w-sm rounded-2xl border border-border-subtle bg-panel p-6 text-center shadow-2xl shadow-black/40 transition-[opacity,transform] duration-150 ease-[var(--ease-out-strong)] starting:opacity-0 starting:scale-95"
      >
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-3xl">
          🎉
        </span>
        <h2 className="mt-4 text-xl font-bold text-text-primary">{t.documents.allCompleteHeading}</h2>
        <p className="mt-2 text-sm text-text-muted">{t.documents.allCompleteBody}</p>
        <div className="mt-6 flex flex-col gap-2">
          <Link
            href="/dashboard"
            onClick={onClose}
            className={`inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-accent-bright ${pressScale}`}
          >
            {t.documents.allCompleteCta}
          </Link>
          <button
            type="button"
            onClick={onClose}
            className={`w-full rounded-full border border-border-subtle px-5 py-2.5 text-sm font-semibold text-text-secondary transition-colors duration-150 hover:border-border-strong ${pressScale}`}
          >
            {t.documents.allCompleteDismiss}
          </button>
        </div>
      </div>
    </div>
  );
}
