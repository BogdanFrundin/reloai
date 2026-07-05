"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { LANGUAGES } from "../_lib/i18n";
import { useScrolled } from "../_lib/useScrolled";
import { pressScale } from "../_lib/motion";
import { useCtaHref } from "../_lib/useCtaHref";

function LanguageSelector() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-sm font-medium text-white transition-colors duration-150 hover:border-accent/50 ${pressScale}`}
      >
        <span className="text-lg leading-none">{current.flag}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 text-slate-400 transition-transform duration-200 ease-[var(--ease-out-strong)] ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          style={{ transformOrigin: "top right" }}
          className="absolute right-0 z-50 mt-2 w-48 origin-top-right overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0f]/95 py-1 shadow-xl shadow-black/40 backdrop-blur-xl transition-[opacity,transform] duration-150 ease-[var(--ease-out-strong)] starting:opacity-0 starting:scale-95"
        >
          {LANGUAGES.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                role="option"
                aria-selected={l.code === lang}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors duration-150 hover:bg-accent/10 hover:text-accent-bright ${
                  l.code === lang ? "font-semibold text-accent-bright" : "text-slate-200"
                }`}
              >
                <span className="text-base leading-none">{l.flag}</span>
                {l.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const scrolled = useScrolled();
  const ctaHref = useCtaHref();

  const NAV_LINKS = [
    { href: "#how-it-works", label: t.nav.howItWorks },
    { href: "#features", label: t.nav.features },
    { href: "#countries", label: t.nav.countries },
    { href: "#pricing", label: t.nav.pricing },
    { href: "#reviews", label: t.nav.reviews },
  ];

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-black/60 backdrop-blur-xl transition-[box-shadow,border-color] duration-300 ease-[var(--ease-out-strong)] ${
        scrolled ? "border-white/10 shadow-lg shadow-black/30" : "border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="group flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-bright text-white font-bold shadow-[0_0_20px_-4px_var(--accent)] transition-transform duration-200 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105">
            R
          </span>
          <span className="text-lg font-semibold tracking-tight text-white">
            ReloAI
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-slate-400 transition-colors duration-150 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSelector />
          <Link
            href="/login"
            className="text-sm font-medium text-slate-400 transition-colors duration-150 hover:text-white"
          >
            {t.nav.login}
          </Link>
          <Link
            href={ctaHref}
            className={`rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_-6px_var(--accent)] transition-colors duration-150 hover:bg-accent-bright ${pressScale}`}
          >
            {t.nav.getStarted}
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSelector />
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className={`flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white ${pressScale}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-black/80 px-6 py-4 backdrop-blur-xl transition-[opacity,transform] duration-200 ease-[var(--ease-out-strong)] starting:opacity-0 starting:-translate-y-2 lg:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-slate-300 transition-colors duration-150 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-slate-300 transition-colors duration-150 hover:text-white"
            >
              {t.nav.login}
            </Link>
            <Link
              href={ctaHref}
              onClick={() => setOpen(false)}
              className={`mt-2 rounded-full bg-accent px-5 py-2.5 text-center text-sm font-semibold text-white shadow-[0_0_24px_-6px_var(--accent)] hover:bg-accent-bright ${pressScale}`}
            >
              {t.nav.getStarted}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
