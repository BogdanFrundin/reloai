"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getCountryList } from "../_lib/countries";

const inputCls =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 transition-[border-color,box-shadow] duration-150 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

export default function SearchableCountrySelect({
  lang,
  value,
  onSelect,
  placeholder,
}: {
  lang: string;
  value?: string;
  onSelect: (code: string) => void;
  placeholder: string;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const countries = useMemo(() => getCountryList(lang), [lang]);
  const selected = useMemo(() => countries.find((c) => c.code === value), [countries, value]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter((c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase() === q);
  }, [countries, query]);

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
      <input
        type="text"
        value={open ? query : (selected?.name ?? "")}
        onChange={(event) => {
          setQuery(event.target.value);
          if (!open) setOpen(true);
        }}
        onFocus={() => {
          setQuery("");
          setOpen(true);
        }}
        placeholder={placeholder}
        className={inputCls}
      />
      {open && (
        <ul
          role="listbox"
          className="absolute z-20 mt-1.5 max-h-64 w-full overflow-y-auto rounded-xl border border-white/10 bg-[#0d0d0f]/95 py-1 shadow-xl shadow-black/40 backdrop-blur-xl"
        >
          {filtered.length === 0 && (
            <li className="px-4 py-2.5 text-sm text-slate-500">No matches</li>
          )}
          {filtered.map((country) => (
            <li key={country.code}>
              <button
                type="button"
                role="option"
                aria-selected={country.code === value}
                onClick={() => {
                  onSelect(country.code);
                  setQuery("");
                  setOpen(false);
                }}
                className={`flex w-full items-center px-4 py-2.5 text-left text-sm transition-colors duration-150 hover:bg-accent/10 hover:text-accent-bright ${
                  country.code === value ? "font-semibold text-accent-bright" : "text-slate-300"
                }`}
              >
                {country.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
