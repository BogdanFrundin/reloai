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

const inputCls =
  "w-full rounded-xl border border-border-strong bg-surface-1 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-[border-color,box-shadow] duration-150 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

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
        <input
          type="text"
          value={selected ?? ""}
          readOnly
          onClick={() => setOpen(!open)}
          placeholder={placeholder}
          className={`${inputCls} cursor-pointer`}
        />
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
