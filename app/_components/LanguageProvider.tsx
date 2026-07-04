"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import {
  DEFAULT_LANG,
  LANGUAGES,
  detectBrowserLang,
  dictionaries,
  type Dictionary,
  type Lang,
} from "../_lib/i18n";

const STORAGE_KEY = "reloai_language";

let cachedLang: Lang | null = null;
const listeners = new Set<() => void>();

function getSnapshot(): Lang {
  if (typeof window === "undefined") return DEFAULT_LANG;
  if (cachedLang === null) {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    cachedLang =
      stored && LANGUAGES.some((l) => l.code === stored)
        ? (stored as Lang)
        : detectBrowserLang();
  }
  return cachedLang;
}

function getServerSnapshot(): Lang {
  return DEFAULT_LANG;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function setStoredLang(next: Lang) {
  cachedLang = next;
  window.localStorage.setItem(STORAGE_KEY, next);
  listeners.forEach((listener) => listener());
}

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <LanguageContext.Provider value={{ lang, setLang: setStoredLang, t: dictionaries[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
