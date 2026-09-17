"use client";

import { useEffect, useRef, useState } from "react";

const CHEVRON_ICON = (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
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
          className="inline-flex items-center gap-2 rounded-xl border border-border-strong bg-white/[0.1] py-2 pl-4 pr-3 text-sm font-semibold text-text-primary transition-colors duration-150 hover:border-accent/40 focus:border-accent focus:outline-none"
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
                    className={`flex w-full items-center px-4 py-2.5 text-left text-sm transition-colors duration-150 hover:bg-accent/10 hover:text-accent-bright ${
                      selected ? "font-semibold text-accent-bright" : "text-text-secondary"
                    }`}
                  >
                    {opt.label}
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
