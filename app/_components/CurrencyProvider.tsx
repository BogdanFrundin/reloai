"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  CURRENCIES,
  DEFAULT_CURRENCY,
  isCurrencyCode,
  type CurrencyCode,
  type RatesMap,
} from "../_lib/currency";

const STORAGE_KEY = "reloai_currency";
const RATES_STORAGE_KEY = "reloai_currency_rates";
// The free rate API updates once a day; no point refetching more often than that.
const RATES_MAX_AGE_MS = 12 * 60 * 60 * 1000;

type CurrencyContextValue = {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  rates: RatesMap | null;
  ratesLoading: boolean;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

function readStoredCurrency(): CurrencyCode {
  if (typeof window === "undefined") return DEFAULT_CURRENCY;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isCurrencyCode(stored) ? stored : DEFAULT_CURRENCY;
  } catch {
    return DEFAULT_CURRENCY;
  }
}

export default function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(DEFAULT_CURRENCY);
  const [rates, setRates] = useState<RatesMap | null>(null);
  const [ratesLoading, setRatesLoading] = useState(true);

  useEffect(() => {
    setCurrencyState(readStoredCurrency());
  }, []);

  useEffect(() => {
    let active = true;

    async function loadRates() {
      try {
        const cachedRaw = window.localStorage.getItem(RATES_STORAGE_KEY);
        if (cachedRaw) {
          const cached = JSON.parse(cachedRaw) as { rates: RatesMap; fetchedAt: number };
          if (cached?.rates && Date.now() - cached.fetchedAt < RATES_MAX_AGE_MS) {
            if (active) {
              setRates(cached.rates);
              setRatesLoading(false);
            }
            return;
          }
        }
      } catch {
        // Malformed cache -- fall through and refetch.
      }

      try {
        const res = await fetch("https://open.er-api.com/v6/latest/PLN");
        const data = await res.json();
        if (!active) return;
        if (data?.result === "success" && data.rates) {
          const next: RatesMap = {};
          for (const c of CURRENCIES) {
            if (c.code !== "PLN" && typeof data.rates[c.code] === "number") {
              next[c.code] = data.rates[c.code];
            }
          }
          setRates(next);
          try {
            window.localStorage.setItem(RATES_STORAGE_KEY, JSON.stringify({ rates: next, fetchedAt: Date.now() }));
          } catch {
            // Storage full/unavailable -- rates still work for this session.
          }
        }
      } catch {
        // Offline or the free rate API is unreachable. Prices just stay in
        // PLN (convertPlnText/formatMoney no-op when rates are null).
      } finally {
        if (active) setRatesLoading(false);
      }
    }

    loadRates();
    return () => {
      active = false;
    };
  }, []);

  function setCurrency(code: CurrencyCode) {
    setCurrencyState(code);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // ignore
    }
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, rates, ratesLoading }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
