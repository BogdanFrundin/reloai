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
    <div className="fixed bottom-4 left-4 z-40 max-w-[calc(100vw-8rem)] rounded-2xl border border-border-subtle bg-panel/95 p-4 pr-8 shadow-xl shadow-black/40 backdrop-blur-xl sm:max-w-xs lg:left-72">
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="absolute right-2.5 top-2.5 flex-shrink-0 text-text-muted transition-colors duration-150 hover:text-text-primary"
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
          className={`flex-1 rounded-full border border-border-strong bg-surface-1 px-3 py-2 text-center text-xs font-semibold text-text-primary transition-colors duration-150 hover:border-border-strong hover:bg-surface-hover ${pressScale}`}
        >
          {t.nav.login}
        </Link>
        <Link
          href="/register"
          className={`flex-1 rounded-full bg-accent px-3 py-2 text-center text-xs font-semibold text-white transition-colors duration-150 hover:bg-accent-bright ${pressScale}`}
        >
          {t.auth.login.register}
        </Link>
      </div>
    </div>
  );
}
