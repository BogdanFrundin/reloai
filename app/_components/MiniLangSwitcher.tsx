"use client";

import { useEffect, useRef, useState } from "react";
import { LANGUAGES } from "../_lib/i18n";
import { useLanguage } from "./LanguageProvider";
import { pressScale } from "../_lib/motion";

export default function MiniLangSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-medium text-white transition-colors duration-150 hover:border-accent/40 hover:bg-white/10 ${pressScale}`}
      >
        <span className="text-lg leading-none">{current.flag}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-3 w-3 text-slate-500 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-1.5 w-40 overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0f]/95 py-1 shadow-xl shadow-black/40 backdrop-blur-xl"
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
                  l.code === lang ? "font-semibold text-accent-bright" : "text-slate-300"
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
