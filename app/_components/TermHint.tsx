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
        className={`ml-1 inline-flex h-4 w-4 flex-shrink-0 cursor-pointer items-center justify-center rounded-full border text-[10px] font-bold leading-none transition-colors duration-150 ${
          open
            ? "border-accent-bright bg-accent/15 text-accent-bright"
            : "border-current text-text-muted hover:border-accent-bright hover:text-accent-bright"
        }`}
      >
        ?
      </span>

      {open && (
        <span
          onClick={(event) => event.stopPropagation()}
          className="absolute left-1/2 top-full z-50 mt-1.5 w-60 -translate-x-1/2 rounded-xl border border-border-subtle bg-panel p-3 text-left text-xs font-normal leading-relaxed text-text-secondary shadow-xl shadow-black/40 backdrop-blur-xl"
        >
          <span className="mb-1 block text-[11px] font-bold text-text-primary">{term}</span>
          {definition}
        </span>
      )}
    </span>
  );
}
