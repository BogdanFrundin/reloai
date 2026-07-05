"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { pressScale } from "../_lib/motion";

export default function RegisterPromptModal({
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
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent-bright">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 0h10.5a1.5 1.5 0 011.5 1.5v7.5a1.5 1.5 0 01-1.5 1.5h-10.5a1.5 1.5 0 01-1.5-1.5v-7.5a1.5 1.5 0 011.5-1.5z"
            />
          </svg>
        </span>
        <h2 className="mt-4 text-lg font-bold text-white">{t.demo.promptHeading}</h2>
        <p className="mt-2 text-sm text-slate-400">{t.demo.promptBody}</p>
        <div className="mt-6 flex flex-col gap-2">
          <Link
            href="/register"
            className={`rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-accent-bright ${pressScale}`}
          >
            {t.demo.registerNow}
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-5 py-2.5 text-sm font-medium text-slate-400 transition-colors duration-150 hover:text-white"
          >
            {t.demo.promptDismiss}
          </button>
        </div>
      </div>
    </div>
  );
}
