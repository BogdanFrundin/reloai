"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "reloai_theme";
const DEFAULT_THEME: Theme = "dark";

let cachedTheme: Theme | null = null;
const listeners = new Set<() => void>();

function getSnapshot(): Theme {
  if (typeof window === "undefined") return DEFAULT_THEME;
  if (cachedTheme === null) {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    cachedTheme = stored === "light" || stored === "dark" ? stored : DEFAULT_THEME;
  }
  return cachedTheme;
}

function getServerSnapshot(): Theme {
  return DEFAULT_THEME;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function setStoredTheme(next: Theme) {
  cachedTheme = next;
  window.localStorage.setItem(STORAGE_KEY, next);
  listeners.forEach((listener) => listener());
}

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme: setStoredTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
