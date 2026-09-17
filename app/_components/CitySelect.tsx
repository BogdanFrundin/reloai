"use client";

import { useEffect, useRef, useState } from "react";

const CITIES = [
  "Варшава",
  "Краков",
  "Вроцлав",
  "Гданьск",
  "Познань",
  "Лодзь",
  "Люблин",
  "Катовице",
  "Щецин",
];

const CHEVRON_ICON = (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export default function CitySelect({
  value,
  onSelect,
  placeholder,
}: {
  value?: string;
  onSelect: (city: any) => void;
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = value && CITIES.includes(value) ? value : null;

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
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-white/[0.1] py-2 pl-4 pr-3 text-sm font-semibold text-text-primary transition-colors duration-150 hover:border-accent/40 focus:border-accent focus:outline-none"
        >
          {selected ?? placeholder}
          <span className={`text-text-muted transition-transform duration-150 ${open ? "rotate-180" : ""}`}>{CHEVRON_ICON}</span>
        </button>
      </div>
      {open && (
        <ul
          role="listbox"
          className="absolute z-20 mt-1.5 max-h-64 w-full overflow-y-auto rounded-xl border border-white/10 bg-[#0d0d0f]/95 py-1 shadow-xl shadow-black/40 backdrop-blur-xl"
        >
          {CITIES.map((city) => (
            <li key={city}>
              <button
                type="button"
                role="option"
                aria-selected={city === value}
                onClick={() => {
                  onSelect(city);
                  setOpen(false);
                }}
                className={`flex w-full items-center px-4 py-2.5 text-left text-sm transition-colors duration-150 hover:bg-accent/10 hover:text-accent-bright ${
                  city === value ? "font-semibold text-accent-bright" : "text-text-secondary"
                }`}
              >
                {city}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
