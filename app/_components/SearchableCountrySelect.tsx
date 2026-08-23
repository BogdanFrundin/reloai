"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { getCountryList } from "../_lib/countries";
import { getFlagUrl } from "../_lib/flags";

const inputCls =
  "w-full rounded-xl border border-border-strong bg-surface-1 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-[border-color,box-shadow] duration-150 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

export default function SearchableCountrySelect({
  lang,
  value,
  onSelect,
  placeholder,
  onOpenChange,
}: {
  lang: string;
  value?: string;
  onSelect: (code: string) => void;
  placeholder: string;
  // Lets a parent react to the dropdown opening/closing — e.g. to fade out
  // page chrome that would otherwise visually collide with the open list
  // (see app/onboarding/page.tsx, where the skip button sits right where
  // this list can extend to).
  onOpenChange?: (open: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onOpenChange?.(open);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-fire when open itself changes, not on every onOpenChange identity change
  }, [open]);

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

  const showFlagPrefix = !open && !!selected;

  return (
    <div className="relative" ref={containerRef}>
      <div className="relative">
        {showFlagPrefix && (
          <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center">
            <Image
              src={getFlagUrl(selected.flag, "sm")}
              alt={selected.name}
              width={24}
              height={18}
              className="rounded-sm"
              unoptimized
            />
          </div>
        )}
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
          className={`${inputCls} ${showFlagPrefix ? "pl-10" : ""}`}
        />
      </div>
      {open && (
        <ul
          role="listbox"
          className="absolute z-20 mt-1.5 max-h-64 w-full overflow-y-auto rounded-xl border border-border-subtle bg-panel/95 py-1 shadow-xl shadow-black/40 backdrop-blur-xl"
        >
          {filtered.length === 0 && (
            <li className="px-4 py-2.5 text-sm text-text-muted">No matches</li>
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
                className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors duration-150 hover:bg-accent/10 hover:text-accent-bright ${
                  country.code === value ? "font-semibold text-accent-bright" : "text-text-secondary"
                }`}
              >
                <Image
                  src={getFlagUrl(country.flag, "sm")}
                  alt={country.name}
                  width={24}
                  height={18}
                  className="rounded-sm"
                  unoptimized
                />
                {country.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
