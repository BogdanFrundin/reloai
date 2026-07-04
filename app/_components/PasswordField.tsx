"use client";

import type { ChangeEvent } from "react";
import {
  checkPassword,
  getPasswordStrength,
  isPasswordValid,
  type PasswordChecks,
} from "../_lib/passwordValidation";

const REQUIREMENTS: { key: keyof PasswordChecks; label: string }[] = [
  { key: "minLength", label: "Minimum 8 characters" },
  { key: "hasUppercase", label: "At least one uppercase letter (A–Z)" },
  { key: "hasLowercase", label: "At least one lowercase letter (a–z)" },
  { key: "hasNumber", label: "At least one number (0–9)" },
  { key: "hasSpecialOrNumber", label: "Special character (!@#$%^&*) — or number counts double" },
  { key: "noForeign", label: "English letters only (no Cyrillic)" },
];

const STRENGTH = {
  weak: { label: "Weak", textColor: "text-red-400", barColor: "bg-red-500", segments: 1 },
  medium: { label: "Medium", textColor: "text-yellow-400", barColor: "bg-yellow-400", segments: 2 },
  strong: { label: "Strong", textColor: "text-green-400", barColor: "bg-green-500", segments: 3 },
} as const;

const inputClasses =
  "mt-1.5 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 transition-[border-color,box-shadow,background-color] duration-150 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onValidChange?: (isValid: boolean) => void;
  id?: string;
  name?: string;
  label?: string;
}

export default function PasswordField({
  value,
  onChange,
  onValidChange,
  id = "password",
  name = "password",
  label = "Password",
}: Props) {
  const checks = checkPassword(value);
  const strength = getPasswordStrength(value, checks);
  const { label: strengthLabel, textColor, barColor, segments } = STRENGTH[strength];

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const next = e.target.value;
    onChange(next);
    if (onValidChange) {
      onValidChange(isPasswordValid(checkPassword(next)));
    }
  }

  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-slate-300">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="password"
        required
        value={value}
        onChange={handleChange}
        placeholder="••••••••"
        className={inputClasses}
      />

      {value.length > 0 && (
        <div className="mt-3 space-y-3">
          {/* Strength bar */}
          <div className="flex items-center gap-2">
            <div className="flex flex-1 gap-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    i <= segments ? barColor : "bg-white/10"
                  }`}
                />
              ))}
            </div>
            <span className={`w-12 text-right text-xs font-medium ${textColor}`}>
              {strengthLabel}
            </span>
          </div>

          {/* Requirements checklist */}
          <ul className="space-y-1.5">
            {REQUIREMENTS.map(({ key, label }) => {
              const met = checks[key];
              return (
                <li key={key} className="flex items-center gap-2 text-xs">
                  <span
                    className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${
                      met ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {met ? "✓" : "✗"}
                  </span>
                  <span className={met ? "text-slate-400" : "text-slate-500"}>{label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
