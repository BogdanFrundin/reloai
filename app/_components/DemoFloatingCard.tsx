"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { pressScale } from "../_lib/motion";

export default function DemoFloatingCard() {
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-[calc(100vw-2rem)] rounded-2xl border border-border-subtle bg-panel/95 p-4 shadow-xl shadow-black/40 backdrop-blur-xl sm:max-w-xs">
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
