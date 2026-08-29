"use client";

import Dropdown from "./Dropdown";
import { CITIES, getCityName, type CityName } from "../_lib/cities";
import { useLanguage } from "./LanguageProvider";

export default function CitySelect({
  value,
  onChange,
  label,
}: {
  value: CityName;
  onChange: (city: CityName) => void;
  label?: string;
}) {
  const { lang } = useLanguage();
  return (
    <Dropdown
      value={value}
      onChange={onChange}
      label={label}
      options={CITIES.map((city) => ({ value: city, label: getCityName(city, lang) }))}
    />
  );
}
