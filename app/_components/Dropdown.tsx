"use client";

import { useEffect, useRef, useState } from "react";

const CHEVRON_ICON = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const CHECK_ICON = (
  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
    <path d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.6 3.6 6.7-6.7a1 1 0 011.4 0z" />
  </svg>
);

export type DropdownOption<T extends string> = { value: T; label: string };

export default function Dropdown<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: DropdownOption<T>[];
  onChange: (value: T) => void;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const current = options.find((o) => o.value === value);

  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="inline-flex items-center gap-2 text-sm" ref={containerRef}>
      {label && <span className="text-text-muted">{label}</span>}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface-1 py-2 pl-4 pr-3 text-sm font-semibold text-text-primary transition-colors duration-150 hover:border-accent/40 focus:border-accent focus:outline-none"
        >
          {current?.label ?? value}
          <span className={`text-text-muted transition-transform duration-150 ${open ? "rotate-180" : ""}`}>{CHEVRON_ICON}</span>
        </button>

        {open && (
          <ul
            role="listbox"
            className="absolute right-0 top-full z-20 mt-2 max-h-[min(18rem,60vh)] min-w-[10rem] overflow-y-auto rounded-xl border border-border-strong bg-panel py-1.5 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.5)]"
          >
            {options.map((opt) => {
              const selected = opt.value === value;
              return (
                <li key={opt.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-sm transition-colors duration-100 hover:bg-surface-hover ${
                      selected ? "text-accent-bright font-semibold" : "text-text-primary"
                    }`}
                  >
                    {opt.label}
                    {selected && <span className="text-accent-bright">{CHECK_ICON}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
