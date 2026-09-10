"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { pressScale } from "../_lib/motion";

export default function DemoFloatingCard() {
  const { t } = useLanguage();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    // pointer-events-none on the card itself (re-enabled with pointer-events-auto
    // on each actual control below) so its background/padding/text -- which
    // covers a real button on some pages at this fixed bottom-left position
    // (e.g. "Choose bank" on /banks, the city picker on /medicine, "Join" on
    // /community) -- lets clicks fall through to whatever's underneath.
    // Only the close button and the two links stay clickable.
    <div className="pointer-events-none fixed bottom-4 left-4 z-40 max-w-[calc(100vw-2rem)] rounded-2xl border border-border-subtle bg-panel/95 p-4 pr-8 shadow-xl shadow-black/40 backdrop-blur-xl sm:max-w-xs">
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="pointer-events-auto absolute right-2.5 top-2.5 flex-shrink-0 text-text-muted transition-colors duration-150 hover:text-text-primary"
        aria-label={t.demo.dismissAria}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <p className="text-sm text-text-secondary">{t.demo.floatingGreeting}</p>
      <div className="mt-3 flex gap-2">
        <Link
          href="/login"
          className={`pointer-events-auto flex-1 rounded-full border border-border-strong bg-surface-1 px-3 py-2 text-center text-xs font-semibold text-text-primary transition-colors duration-150 hover:border-border-strong hover:bg-surface-hover ${pressScale}`}
        >
          {t.nav.login}
        </Link>
        <Link
          href="/register"
          className={`pointer-events-auto flex-1 rounded-full bg-accent px-3 py-2 text-center text-xs font-semibold text-white transition-colors duration-150 hover:bg-accent-bright ${pressScale}`}
        >
          {t.auth.login.register}
        </Link>
      </div>
    </div>
  );
}
