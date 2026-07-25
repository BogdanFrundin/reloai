"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { pressScale } from "../_lib/motion";
import { useLanguage } from "./LanguageProvider";

export default function HelpButton({
  guideHeading,
  guideSteps,
  aiQuestion,
  label,
}: {
  guideHeading: string;
  guideSteps: string[];
  aiQuestion: string;
  label: string;
}) {
  const router = useRouter();
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function askAi() {
    setMenuOpen(false);
    setGuideOpen(false);
    router.push(`/dashboard/ai?q=${encodeURIComponent(aiQuestion)}`);
  }

  return (
    <>
      <div className="relative inline-block" ref={containerRef}>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setMenuOpen((p) => !p); }}
          className={`inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent-bright transition-colors duration-150 hover:border-accent/60 ${pressScale}`}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.5M12 17.5h.008v.008H12V17.5zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {label}
        </button>
        {menuOpen && (
          <div role="menu" className="absolute left-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-border-subtle bg-panel py-1 shadow-xl shadow-black/40 backdrop-blur-xl">
            <button type="button" onClick={(e) => { e.stopPropagation(); setMenuOpen(false); setGuideOpen(true); }} className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-text-secondary transition-colors duration-150 hover:bg-surface-hover hover:text-text-primary">
              {t.helpButton.openGuide}
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); askAi(); }} className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-text-secondary transition-colors duration-150 hover:bg-surface-hover hover:text-text-primary">
              {t.helpButton.askAi}
            </button>
          </div>
        )}
      </div>

      {guideOpen && createPortal(
        <div role="dialog" aria-modal="true" onClick={() => setGuideOpen(false)} className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg rounded-2xl border border-border-subtle bg-panel p-6 shadow-2xl shadow-black/40">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-bold text-text-primary">{guideHeading}</h2>
              <button type="button" onClick={() => setGuideOpen(false)} aria-label="Close" className="text-text-muted hover:text-text-primary">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ol className="mt-4 space-y-3">
              {guideSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent-bright">{i + 1}</span>
                  <p className="text-sm leading-relaxed text-text-secondary">{step}</p>
                </li>
              ))}
            </ol>
            <button type="button" onClick={askAi} className={`mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-border-strong bg-surface-1 px-4 py-2.5 text-sm font-semibold text-text-primary transition-colors duration-150 hover:border-accent/40 hover:text-accent-bright ${pressScale}`}>
              {t.helpButton.askAiFooter}
            </button>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
