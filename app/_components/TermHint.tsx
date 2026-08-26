"use client";

import { useEffect, useRef, useState } from "react";

// Small "?" affordance that opens a plain-language definition on click.
// A <span role="button"> rather than a real <button> — same reasoning as
// CurrencyHint.tsx: this often ends up nested inside another clickable
// element (a guide card's toggle button, a bank card's headline button),
// and a <button> inside a <button> is invalid HTML.
export default function TermHint({ term, definition }: { term: string; definition: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <span ref={ref} className="relative inline-flex align-middle">
      <span
        role="button"
        tabIndex={0}
        aria-label={`Что такое ${term}?`}
        aria-expanded={open}
        onClick={(event) => {
          event.stopPropagation();
          setOpen((prev) => !prev);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.stopPropagation();
            event.preventDefault();
            setOpen((prev) => !prev);
          }
        }}
        className={`ml-1.5 inline-flex h-[18px] w-[18px] flex-shrink-0 cursor-pointer items-center justify-center rounded-full transition-[transform,background-color,color,box-shadow] duration-150 ${
          open
            ? "scale-110 bg-accent text-white shadow-[0_0_0_3px_rgba(91,141,239,0.2)]"
            : "bg-accent/12 text-accent-bright hover:scale-110 hover:bg-accent/25"
        }`}
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.94 6.94a1.06 1.06 0 111.5 1.5c-.44.44-.69.86-.69 1.31v.25a.75.75 0 001.5 0v-.1c.16-.28.42-.55.69-.82a2.56 2.56 0 10-4.37-1.81.75.75 0 101.5.09c.02-.15.06-.28.13-.42zM10 14.25a.9.9 0 100-1.8.9.9 0 000 1.8z"
            clipRule="evenodd"
          />
        </svg>
      </span>

      {open && (
        <span
          onClick={(event) => event.stopPropagation()}
          className="absolute left-1/2 top-full z-50 mt-2 w-60 -translate-x-1/2 rounded-xl border border-border-subtle bg-panel p-3.5 text-left text-xs font-normal leading-relaxed text-text-secondary shadow-xl shadow-black/40 backdrop-blur-xl before:absolute before:-top-1 before:left-1/2 before:h-2 before:w-2 before:-translate-x-1/2 before:rotate-45 before:border-l before:border-t before:border-border-subtle before:bg-panel"
        >
          <span className="mb-1 flex items-center gap-1.5 text-[11px] font-bold text-accent-bright">{term}</span>
          <span className="text-text-secondary">{definition}</span>
        </span>
      )}
    </span>
  );
}
