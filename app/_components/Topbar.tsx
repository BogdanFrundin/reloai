"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "./AuthProvider";
import { useLanguage } from "./LanguageProvider";
import MiniLangSwitcher from "./MiniLangSwitcher";
import NotificationBell from "./NotificationBell";
import ProfileAvatar from "./ProfileAvatar";
import UpgradeModal from "./UpgradeModal";
import { pressScale } from "../_lib/motion";

export default function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const { user, profile } = useAuth();
  const { t } = useLanguage();
  const [upgradeOpen, setUpgradeOpen] = useState(false);

  const planValue = profile?.plan ?? "free";
  const isFree = planValue === "free";
  const planLabel = isFree ? t.appPricing.freeName : planValue.charAt(0).toUpperCase() + planValue.slice(1);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-4 border-b border-border-subtle bg-background px-4 py-4 backdrop-blur-xl sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label={t.topbar.openMenuAria}
        className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-surface-1 text-text-primary lg:hidden ${pressScale}`}
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="relative w-full max-w-sm">
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="search"
          placeholder={t.topbar.searchPlaceholder}
          className="w-full rounded-xl border border-border-subtle bg-surface-1 py-2 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted transition-[border-color,box-shadow] duration-150 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
        />
      </div>

      <div className="flex items-center gap-3">
        <MiniLangSwitcher />

        {user ? (
          <>
            <button
              type="button"
              onClick={() => setUpgradeOpen(true)}
              className="hidden items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent-bright transition-colors duration-150 hover:border-accent/60 sm:flex"
            >
              {planLabel}
              {isFree && <span className="text-text-muted">· {t.topbar.upgrade}</span>}
            </button>

            <NotificationBell />

            <ProfileAvatar />
          </>
        ) : (
          <>
            <Link
              href="/login"
              className={`flex-shrink-0 rounded-full border border-border-strong bg-surface-1 px-3 py-1.5 text-xs font-semibold text-text-primary transition-colors duration-150 hover:border-border-strong hover:bg-surface-hover ${pressScale}`}
            >
              {t.nav.login}
            </Link>
            <Link
              href="/register"
              className={`flex-shrink-0 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-white transition-colors duration-150 hover:bg-accent-bright ${pressScale}`}
            >
              {t.auth.login.register}
            </Link>
          </>
        )}
      </div>

      <UpgradeModal open={upgradeOpen} onClose={() => setUpgradeOpen(false)} />
    </header>
  );
}
