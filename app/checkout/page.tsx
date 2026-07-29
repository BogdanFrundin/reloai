"use client";

import { Suspense, useEffect, useState, type ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../_components/AuthProvider";
import { useLanguage } from "../_components/LanguageProvider";
import PageTransition from "../_components/PageTransition";
import { pressScale } from "../_lib/motion";
import type { Dictionary } from "../_lib/i18n";
import { supabase } from "../../lib/supabase";

function buildPlanMeta(
  t: Dictionary,
): Record<
  string,
  { name: string; price: string; originalPrice?: string; discountLabel?: string; priceNum: string; features: string[] }
> {
  return {
    premium: {
      name: "Premium",
      price: "€29",
      originalPrice: "€99",
      discountLabel: "-71%",
      priceNum: "€29.00",
      features: t.checkout.premiumFeatures,
    },
    pro: {
      name: "Pro",
      price: "€49",
      originalPrice: "€149",
      discountLabel: "-67%",
      priceNum: "€49.00",
      features: t.checkout.proFeatures,
    },
  };
}

function formatCard(value: string): string {
  return value.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(raw: string, prev: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 4);
  // Auto-insert slash after 2 digits, but not when deleting
  if (digits.length > 2 && raw.length >= prev.length) {
    return `${digits.slice(0, 2)} / ${digits.slice(2)}`;
  }
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)} / ${digits.slice(2)}`;
}

const inputCls =
  "mt-1.5 w-full rounded-xl border border-border-strong bg-surface-1 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-[border-color,box-shadow,background-color] duration-150 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const { t } = useLanguage();
  const planMeta = buildPlanMeta(t);

  const planParam = searchParams.get("plan");
  const plan = planParam === "premium" || planParam === "pro" ? planParam : null;

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardName, setCardName] = useState("");
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!plan) {
      router.replace("/pricing");
    }
  }, [plan, router]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
    }
  }, [authLoading, user, router]);

  async function handlePay() {
    if (!user || !plan) return;
    setPaying(true);
    setError(null);

    await new Promise((r) => setTimeout(r, 2000));

    const { error: dbError } = await supabase
      .from("profiles")
      .update({ plan })
      .eq("id", user.id);

    if (dbError) {
      setError(t.checkout.payFailed);
      setPaying(false);
      return;
    }

    const meta = planMeta[plan];
    sessionStorage.setItem("reloai_welcome", t.checkout.welcomeToast.replace("{plan}", meta.name));
    router.push("/dashboard");
  }

  const isFormValid = cardNumber.replace(/\s/g, "").length === 16 && expiry.length >= 4 && cvc.length >= 3 && cardName.trim().length > 0;

  if (authLoading || !plan) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <svg className="h-6 w-6 animate-spin text-accent-bright" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      </div>
    );
  }

  const meta = planMeta[plan]!;

  return (
    <PageTransition>
      <div className="relative flex min-h-screen flex-col overflow-hidden bg-background px-6 py-10">
        <div
          aria-hidden
          className="absolute left-1/2 top-1/3 -z-10 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 opacity-60 blur-[100px]"
        />

        {/* Header */}
        <div className="mx-auto flex w-full max-w-lg items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-bright text-sm font-bold text-white">
              R
            </span>
            <span className="text-sm font-semibold tracking-tight text-text-primary">ReloAI</span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 0h10.5a1.5 1.5 0 011.5 1.5v7.5a1.5 1.5 0 01-1.5 1.5h-10.5a1.5 1.5 0 01-1.5-1.5v-7.5a1.5 1.5 0 011.5-1.5z" />
            </svg>
            {t.checkout.secureCheckout}
          </div>
        </div>

        <div className="mx-auto mt-10 w-full max-w-lg space-y-5">
          {/* Order summary */}
          <div className="rounded-2xl border border-border-subtle bg-surface-1 p-6 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">{t.checkout.orderSummary}</p>
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-lg font-bold text-text-primary">ReloAI {meta.name}</p>
                <p className="mt-0.5 text-sm text-text-muted">{t.checkout.subscription}</p>
              </div>
              <div className="text-right">
                {meta.originalPrice && (
                  <div className="flex items-center justify-end gap-1.5">
                    <span className="text-xs font-medium text-text-muted/70 line-through">{meta.originalPrice}</span>
                    {meta.discountLabel && (
                      <span className="rounded-full bg-accent/15 px-1.5 py-0.5 text-[10px] font-semibold text-accent-bright">
                        {meta.discountLabel}
                      </span>
                    )}
                  </div>
                )}
                <p className={`text-2xl font-bold text-text-primary ${meta.originalPrice ? "mt-0.5" : ""}`}>
                  {meta.price}
                </p>
                <p className="text-xs text-text-muted">{t.checkout.perMonth}</p>
              </div>
            </div>

            <ul className="mt-5 space-y-2 border-t border-border-subtle pt-4">
              {meta.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-text-muted">
                  <svg className="h-3.5 w-3.5 flex-shrink-0 text-accent-bright" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.6 3.6 6.7-6.7a1 1 0 011.4 0z" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-center justify-between border-t border-border-subtle pt-4 text-sm">
              <span className="text-text-muted">{t.checkout.totalToday}</span>
              <span className="font-bold text-text-primary">{meta.priceNum}</span>
            </div>
          </div>

          {/* Payment form */}
          <div className="rounded-2xl border border-border-subtle bg-surface-1 p-6 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">{t.checkout.paymentDetails}</p>

            {error && (
              <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
                {error}
              </p>
            )}

            <div className="mt-5 space-y-4">
              {/* Card number */}
              <div>
                <label htmlFor="card-number" className="text-sm font-medium text-text-secondary">
                  {t.checkout.cardNumber}
                </label>
                <div className="relative">
                  <input
                    id="card-number"
                    type="text"
                    inputMode="numeric"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setCardNumber(formatCard(e.target.value))}
                    className={inputCls}
                  />
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                    <span className="text-[11px] font-bold text-slate-600">VISA</span>
                    <span className="text-[11px] font-bold text-slate-700">MC</span>
                  </div>
                </div>
              </div>

              {/* Expiry + CVC */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="expiry" className="text-sm font-medium text-text-secondary">
                    {t.checkout.expiryDate}
                  </label>
                  <input
                    id="expiry"
                    type="text"
                    inputMode="numeric"
                    placeholder="MM / YY"
                    value={expiry}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setExpiry(formatExpiry(e.target.value, expiry))
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="cvc" className="text-sm font-medium text-text-secondary">
                    {t.checkout.cvc}
                  </label>
                  <input
                    id="cvc"
                    type="text"
                    inputMode="numeric"
                    placeholder="123"
                    value={cvc}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))
                    }
                    className={inputCls}
                  />
                </div>
              </div>

              {/* Cardholder name */}
              <div>
                <label htmlFor="card-name" className="text-sm font-medium text-text-secondary">
                  {t.checkout.cardholderName}
                </label>
                <input
                  id="card-name"
                  type="text"
                  placeholder="Jane Doe"
                  value={cardName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setCardName(e.target.value)}
                  className={inputCls}
                />
              </div>
            </div>

            {/* Pay button */}
            <button
              type="button"
              onClick={handlePay}
              disabled={paying || !isFormValid}
              className={`mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_-8px_var(--accent)] transition-colors duration-150 hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-50 ${pressScale}`}
            >
              {paying ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  {t.checkout.processing}
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 0h10.5a1.5 1.5 0 011.5 1.5v7.5a1.5 1.5 0 01-1.5 1.5h-10.5a1.5 1.5 0 01-1.5-1.5v-7.5a1.5 1.5 0 011.5-1.5z" />
                  </svg>
                  {t.checkout.payBtn} {meta.priceNum}
                </>
              )}
            </button>
          </div>

          {/* Trust badge */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            {t.checkout.trustBadge}
          </div>

          <p className="pb-6 text-center text-xs text-slate-600">
            {t.checkout.termsPrefix}{" "}
            <Link href="/" className="underline hover:text-text-muted">{t.checkout.termsService}</Link>
            {" "}{t.checkout.and}{" "}
            <Link href="/" className="underline hover:text-text-muted">{t.checkout.privacyPolicy}</Link>.
          </p>
        </div>
      </div>
    </PageTransition>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutContent />
    </Suspense>
  );
}
