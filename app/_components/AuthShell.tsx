"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "./Reveal";
import { useLanguage } from "./LanguageProvider";

export default function AuthShell({ children }: { children: ReactNode }) {
  const { t } = useLanguage();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16">
      <Link
        href="/"
        aria-label={t.auth.backToLanding}
        className="absolute left-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-surface-1 text-text-secondary transition-colors duration-150 hover:border-border-strong hover:bg-surface-hover hover:text-text-primary"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
      </Link>

      <div
        aria-hidden
        className="animate-blob-drift absolute left-1/2 top-1/3 -z-10 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 opacity-70 blur-[120px] motion-reduce:animate-none"
      />

      <Link href="/" className="group mb-8 flex items-center gap-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-bright text-base font-bold text-white shadow-[0_0_20px_-4px_var(--accent)] transition-transform duration-200 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105">
          R
        </span>
        <span className="text-xl font-semibold tracking-tight text-text-primary">ReloAI</span>
      </Link>

      <Reveal className="w-full max-w-md">
        <div className="rounded-3xl border border-border-subtle bg-surface-1 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl">
          {children}
        </div>
      </Reveal>
    </div>
  );
}
