"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const POPUP_WIDTH = 240;
const POPUP_MARGIN = 12;

// Small "?" affordance that opens a plain-language definition on click.
// A <span role="button"> rather than a real <button> — same reasoning as
// CurrencyHint.tsx: this often ends up nested inside another clickable
// element (a guide card's toggle button, a bank card's headline button),
// and a <button> inside a <button> is invalid HTML.
//
// The definition popup is rendered through a portal into document.body
// instead of as a normally-positioned absolute child. Guide/bank cards use
// backdrop-blur (and some sections sit inside Reveal's transform wrapper),
// both of which create their own CSS stacking context — an absolutely
// positioned popup nested inside one of those contexts can never paint above
// a *later* card, no matter how high its z-index is, because the z-index
// only wins within its own local context. Portaling straight to <body>
// sidesteps the whole trap the same way the app's modals already do.
export default function TermHint({ term, definition }: { term: string; definition: string }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  function openPopup() {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const left = Math.min(
      Math.max(rect.left + rect.width / 2 - POPUP_WIDTH / 2, POPUP_MARGIN),
      window.innerWidth - POPUP_WIDTH - POPUP_MARGIN,
    );
    setPos({ top: rect.bottom + 8, left });
    setOpen(true);
  }

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || popupRef.current?.contains(target)) return;
      setOpen(false);
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    // Scrolling/resizing would leave a stale-positioned popup behind since
    // position is only computed once on open — simplest correct fix is to
    // just close it, same as most click-to-open popovers do.
    function handleDismiss() {
      setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleDismiss, true);
    window.addEventListener("resize", handleDismiss);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleDismiss, true);
      window.removeEventListener("resize", handleDismiss);
    };
  }, [open]);

  return (
    <span ref={triggerRef} className="relative inline-flex align-middle">
      <span
        role="button"
        tabIndex={0}
        aria-label={`Что такое ${term}?`}
        aria-expanded={open}
        onClick={(event) => {
          event.stopPropagation();
          if (open) {
            setOpen(false);
          } else {
            openPopup();
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.stopPropagation();
            event.preventDefault();
            if (open) {
              setOpen(false);
            } else {
              openPopup();
            }
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

      {open &&
        pos &&
        createPortal(
          <div
            ref={popupRef}
            onClick={(event) => event.stopPropagation()}
            style={{ top: pos.top, left: pos.left, width: POPUP_WIDTH }}
            className="fixed z-[9999] rounded-xl border border-border-subtle bg-panel p-3.5 text-left text-xs font-normal leading-relaxed text-text-secondary shadow-xl shadow-black/40 backdrop-blur-xl"
          >
            <span className="mb-1 flex items-center gap-1.5 text-[11px] font-bold text-accent-bright">{term}</span>
            <span className="text-text-secondary">{definition}</span>
          </div>,
          document.body,
        )}
    </span>
  );
}
