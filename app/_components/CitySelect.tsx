"use client";

import { CITIES, type CityName } from "../_lib/cities";

const CHEVRON_ICON = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export default function CitySelect({
  value,
  onChange,
  label,
}: {
  value: CityName;
  onChange: (city: CityName) => void;
  label?: string;
}) {
  return (
    <label className="inline-flex items-center gap-2 text-sm">
      {label && <span className="text-text-muted">{label}</span>}
      <span className="relative inline-flex items-center">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as CityName)}
          className="appearance-none rounded-full border border-border-strong bg-surface-1 py-2 pl-4 pr-9 text-sm font-semibold text-text-primary transition-colors duration-150 hover:border-accent/40 focus:border-accent focus:outline-none"
        >
          {CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 text-text-muted">{CHEVRON_ICON}</span>
      </span>
    </label>
  );
}
