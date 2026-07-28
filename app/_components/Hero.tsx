"use client";

import Link from "next/link";
import ChatMockup from "./ChatMockup";
import Reveal from "./Reveal";
import { useLanguage } from "./LanguageProvider";
import { pressScale } from "../_lib/motion";
import { useCtaHref } from "../_lib/useCtaHref";

export default function Hero() {
  const { t } = useLanguage();
  const ctaHref = useCtaHref();

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="animate-blob-drift absolute -top-40 left-1/2 -z-10 h-[560px] w-[860px] -translate-x-1/2 rounded-full bg-accent/25 opacity-60 blur-[120px] motion-reduce:animate-none"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[640px] bg-gradient-to-b from-accent/10 via-transparent to-transparent"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-32">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent-bright">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-bright animate-glow-pulse motion-reduce:animate-none" />
              <span className="animate-text-glow-pulse motion-reduce:animate-none">
                {t.hero.badge}
              </span>
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-text-primary sm:text-6xl lg:text-7xl">
              {t.hero.headline1}
              <br />
              <span className="bg-gradient-to-r from-accent via-accent-bright to-[#bcd2ff] bg-clip-text text-transparent">
                {t.hero.headline2}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
              {t.hero.subtext}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href={ctaHref}
                className={`rounded-full bg-accent px-7 py-3.5 text-center text-base font-semibold text-white shadow-[0_0_30px_-6px_var(--accent)] transition-colors duration-150 hover:bg-accent-bright ${pressScale}`}
              >
                {t.hero.getStarted}
              </Link>
              <a
                href="#how-it-works"
                className={`rounded-full border border-border-strong bg-surface-1 px-7 py-3.5 text-center text-base font-semibold text-text-primary transition-colors duration-150 hover:border-accent/50 hover:text-accent-bright ${pressScale}`}
              >
                {t.hero.seeHowItWorks}
              </a>
            </div>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-text-muted">
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-accent-bright" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <circle cx="12" cy="12" r="9" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M12 3c2.5 2.7 4 6 4 9s-1.5 6.3-4 9c-2.5-2.7-4-6-4-9s1.5-6.3 4-9z" />
                </svg>
                {t.hero.trustCountries}
              </span>
              <span aria-hidden className="text-slate-700">·</span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-accent-bright" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {t.hero.trustLanguages}
              </span>
              <span aria-hidden className="text-slate-700">·</span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-accent-bright" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {t.hero.trustFree}
              </span>
            </div>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-4 flex items-center gap-2 text-sm text-text-muted">
              <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 motion-reduce:animate-none" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              {t.hero.trustSocialProof}
            </div>
          </Reveal>
        </div>

        <Reveal delay={120} className="flex justify-center lg:justify-end">
          <div className="relative animate-float-slow motion-reduce:animate-none">
            <div
              aria-hidden
              className="animate-glow-pulse absolute -inset-6 -z-10 rounded-[2rem] bg-accent/30 blur-3xl motion-reduce:animate-none"
            />
            <ChatMockup />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
