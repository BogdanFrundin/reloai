"use client";

import Link from "next/link";
import { useAuth } from "./AuthProvider";
import { useLanguage } from "./LanguageProvider";
import MiniLangSwitcher from "./MiniLangSwitcher";
import { pressScale } from "../_lib/motion";

export default function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const { profile } = useAuth();
  const { t } = useLanguage();

  const planValue = profile?.plan ?? "free";
  const isFree = planValue === "free";
  const planLabel = isFree ? t.appPricing.freeName : planValue.charAt(0).toUpperCase() + planValue.slice(1);

  return (
    <header className="relative z-50 flex items-center justify-between gap-4 border-b border-white/10 bg-black/40 px-4 py-4 backdrop-blur-xl sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
        className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white lg:hidden ${pressScale}`}
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="relative w-full max-w-sm">
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="search"
          placeholder="Search documents, tasks..."
          className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 transition-[border-color,box-shadow] duration-150 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
        />
      </div>

      <div className="flex items-center gap-3">
        <MiniLangSwitcher />

        <Link
          href="/pricing"
          className="hidden items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent-bright transition-colors duration-150 hover:border-accent/60 sm:flex"
        >
          {planLabel}
          {isFree && <span className="text-slate-400">· {t.topbar.upgrade}</span>}
        </Link>
      </div>
    </header>
  );
}
