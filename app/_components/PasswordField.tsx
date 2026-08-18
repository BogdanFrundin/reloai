"use client";

import { useState, type ChangeEvent } from "react";
import {
  checkPassword,
  getPasswordStrength,
  isPasswordValid,
  type PasswordChecks,
} from "../_lib/passwordValidation";
import type { Dictionary } from "../_lib/i18n";

const inputClasses =
  "mt-1.5 w-full rounded-xl border border-border-strong bg-surface-1 px-4 py-2.5 pr-11 text-sm text-text-primary placeholder:text-text-muted transition-[border-color,box-shadow,background-color] duration-150 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

const EYE_ICON = (
  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const EYE_OFF_ICON = (
  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.98 8.223A10.477 10.477 0 001.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.5a10.522 10.522 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
    />
  </svg>
);

interface Props {
  value: string;
  onChange: (value: string) => void;
  onValidChange?: (isValid: boolean) => void;
  id?: string;
  name?: string;
  label: string;
  t: Dictionary["password"];
}

export default function PasswordField({
  value,
  onChange,
  onValidChange,
  id = "password",
  name = "password",
  label,
  t,
}: Props) {
  const [visible, setVisible] = useState(false);
  const REQUIREMENTS: { key: keyof PasswordChecks; label: string }[] = [
    { key: "minLength", label: t.minLength },
    { key: "hasUppercase", label: t.hasUppercase },
    { key: "hasLowercase", label: t.hasLowercase },
    { key: "hasNumber", label: t.hasNumber },
    { key: "hasSpecialOrNumber", label: t.hasSpecialOrNumber },
    { key: "noForeign", label: t.noForeign },
  ];

  const STRENGTH = {
    weak: { label: t.weak, textColor: "text-red-400", barColor: "bg-red-500", segments: 1 },
    medium: { label: t.medium, textColor: "text-yellow-400", barColor: "bg-yellow-400", segments: 2 },
    strong: { label: t.strong, textColor: "text-green-400", barColor: "bg-green-500", segments: 3 },
  } as const;

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
      <label htmlFor={id} className="text-sm font-medium text-text-secondary">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          required
          value={value}
          onChange={handleChange}
          placeholder="••••••••"
          className={inputClasses}
        />
        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          aria-label={visible ? "Скрыть пароль" : "Показать пароль"}
          tabIndex={-1}
          className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-text-muted transition-colors duration-150 hover:text-text-primary"
        >
          {visible ? EYE_OFF_ICON : EYE_ICON}
        </button>
      </div>

      {value.length > 0 && (
        <div className="mt-3 space-y-3">
          {/* Strength bar */}
          <div className="flex items-center gap-2">
            <div className="flex flex-1 gap-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    i <= segments ? barColor : "bg-border-subtle"
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
                  <span className={met ? "text-text-muted" : "text-text-muted"}>{label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
