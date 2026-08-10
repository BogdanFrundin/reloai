"use client";

import Dropdown from "./Dropdown";
import { CITIES, type CityName } from "../_lib/cities";

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
    <Dropdown
      value={value}
      onChange={onChange}
      label={label}
      options={CITIES.map((city) => ({ value: city, label: city }))}
    />
  );
}
