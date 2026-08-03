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
  const [menuDirection, setMenuDirection] = useState<"down" | "up">("down");
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggleMenu() {
    if (!menuOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const estimatedMenuHeight = 132;
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setMenuDirection(spaceBelow < estimatedMenuHeight && spaceAbove > spaceBelow ? "up" : "down");
    }
    setMenuOpen((p) => !p);
  }

  function askAi() {
    setMenuOpen(false);
    setGuideOpen(false);
    router.push(`/dashboard/ai?q=${encodeURIComponent(aiQuestion)}`);
  }

  return (
    <>
      <div className="relative inline-block" ref={containerRef}>
        <button
          ref={buttonRef}
          type="button"
          onClick={(e) => { e.stopPropagation(); toggleMenu(); }}
          className={`inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent-bright transition-colors duration-150 hover:border-accent/60 ${pressScale}`}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.5M12 17.5h.008v.008H12V17.5zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {label}
        </button>
        {menuOpen && (
          <div
            role="menu"
            className={`absolute left-0 z-50 w-64 overflow-hidden rounded-2xl border border-border-subtle bg-panel p-1.5 shadow-2xl shadow-black/40 backdrop-blur-xl transition-[opacity,transform] duration-150 ease-[var(--ease-out-strong)] starting:opacity-0 starting:scale-95 ${menuDirection === "up" ? "bottom-full mb-2" : "top-full mt-2"}`}
          >
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setMenuOpen(false); setGuideOpen(true); }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-text-secondary transition-colors duration-150 hover:bg-surface-hover hover:text-text-primary"
            >
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-border-subtle bg-surface-1 text-accent-bright">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </span>
              <span className="font-medium">{t.helpButton.openGuide}</span>
            </button>
            <div className="my-1 h-px bg-border-subtle" />
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); askAi(); }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-text-secondary transition-colors duration-150 hover:bg-surface-hover hover:text-text-primary"
            >
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-border-subtle bg-surface-1 text-accent-bright">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a2.25 2.25 0 00-1.632-1.632L15 6.75l1.035-.259a2.25 2.25 0 001.632-1.632L18 3.75l.259 1.035a2.25 2.25 0 001.632 1.632L21 6.75l-1.035.259a2.25 2.25 0 00-1.632 1.632z" />
                </svg>
              </span>
              <span className="font-medium">{t.helpButton.askAi}</span>
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
