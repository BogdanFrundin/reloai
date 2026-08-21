"use client";

import { useState } from "react";
import CurrencyPickerModal from "./CurrencyPickerModal";

// Small inline affordance shown next to every price on the site. Clicking it
// opens the currency picker right where the user is, instead of navigating
// them away to Settings. Rendered as a <span role="link"> rather than an
// <a>/next/link, since prices often sit inside a clickable card header (a
// <button>) and nesting an <a> in a <button> is invalid HTML and would also
// trigger the card's own click handler.
export default function CurrencyHint() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <span
        role="link"
        tabIndex={0}
        title="Изменить валюту"
        onClick={(event) => {
          event.stopPropagation();
          setOpen(true);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.stopPropagation();
            event.preventDefault();
            setOpen(true);
          }
        }}
        className="inline-flex flex-shrink-0 cursor-pointer items-center gap-0.5 text-[10px] font-medium text-text-muted transition-colors duration-150 hover:text-accent-bright"
      >
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h11m0 0l-3.5-3.5M18 7l-3.5 3.5M17 17H6m0 0l3.5 3.5M6 17l3.5-3.5" />
        </svg>
        <span className="hidden sm:inline">Валюта</span>
      </span>

      <CurrencyPickerModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
