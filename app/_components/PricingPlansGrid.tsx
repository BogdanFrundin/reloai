"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Reveal from "./Reveal";
import { pressScale } from "../_lib/motion";
import { useAuth } from "./AuthProvider";
import { useLanguage } from "./LanguageProvider";
import type { Dictionary } from "../_lib/i18n";
import { supabase } from "../../lib/supabase";

type PlanKey = "free" | "premium" | "pro";

interface FeatItem {
  text: string;
  included: boolean;
}

interface PlanDef {
  key: PlanKey;
  name: string;
  price: string;
  originalPrice?: string;
  discountLabel?: string;
  period: string;
  description: string;
  badge: string | null;
  highlighted: boolean;
  cta: string;
  features: FeatItem[];
}

const FREE_INCLUDED = [true, true, true, false, false, false, false];

function buildPlans(ap: Dictionary["appPricing"]): PlanDef[] {
  return [
    {
      key: "free",
      name: ap.freeName,
      price: "€0",
      period: ap.forever,
      description: ap.freeDesc,
      badge: null,
      highlighted: false,
      cta: ap.freeCta,
      features: ap.freeFeatures.map((text, i) => ({ text, included: FREE_INCLUDED[i] })),
    },
    {
      key: "premium",
      name: ap.premiumName,
      price: "€29",
      originalPrice: "€99",
      discountLabel: "-71%",
      period: ap.perMonth,
      description: ap.premiumDesc,
      badge: ap.mostPopular,
      highlighted: true,
      cta: ap.premiumCta,
      features: ap.premiumFeatures.map((text) => ({ text, included: true })),
    },
    {
      key: "pro",
      name: ap.proName,
      price: "€49",
      originalPrice: "€149",
      discountLabel: "-67%",
      period: ap.perMonth,
      description: ap.proDesc,
      badge: null,
      highlighted: false,
      cta: ap.proCta,
      features: ap.proFeatures.map((text) => ({ text, included: true })),
    },
  ];
}

function PlanButton({
  plan,
  ap,
  onPlanSelected,
}: {
  plan: PlanDef;
  ap: Dictionary["appPricing"];
  onPlanSelected?: () => void;
}) {
  const router = useRouter();
  const { user, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (plan.key === "free") {
      if (!user) return;
      setLoading(true);
      await supabase.from("profiles").update({ plan: "free" }).eq("id", user.id);
      await refreshProfile();
      setLoading(false);
      if (onPlanSelected) {
        onPlanSelected();
      } else {
        router.push("/dashboard");
      }
      return;
    }
    onPlanSelected?.();
    router.push(`/checkout?plan=${plan.key}`);
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={`flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors duration-150 ${pressScale} ${
          plan.highlighted
            ? "bg-accent text-white shadow-[0_0_30px_-8px_var(--accent)] hover:bg-accent-bright disabled:opacity-75"
            : "border border-border-strong bg-surface-1 text-text-primary hover:border-accent/40 hover:text-accent-bright disabled:opacity-60"
        }`}
      >
        {loading && (
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        )}
        {loading ? ap.activating : plan.cta}
      </button>
      {plan.key !== "free" && (
        <p className="mt-2.5 flex items-center justify-center gap-1.5 text-[11px] text-text-muted">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 0h10.5a1.5 1.5 0 011.5 1.5v7.5a1.5 1.5 0 01-1.5 1.5h-10.5a1.5 1.5 0 01-1.5-1.5v-7.5a1.5 1.5 0 011.5-1.5z" />
          </svg>
          {ap.securedByStripe}
        </p>
      )}
    </div>
  );
}

export default function PricingPlansGrid({ onPlanSelected }: { onPlanSelected?: () => void }) {
  const { t } = useLanguage();
  const ap = t.appPricing;
  const plans = buildPlans(ap);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {plans.map((plan, index) => (
        <Reveal key={plan.key} delay={index * 60} className="h-full">
          <div
            className={`relative flex h-full flex-col rounded-2xl border p-7 backdrop-blur-sm ${
              plan.highlighted
                ? "border-accent/50 bg-accent/[0.06] shadow-[0_0_50px_-12px_var(--accent)]"
                : "border-border-subtle bg-surface-1"
            }`}
          >
            {plan.highlighted && (
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-accent via-accent-bright to-accent"
              />
            )}
            {plan.badge && (
              <span className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-white shadow-[0_0_16px_-4px_var(--accent)]">
                {plan.badge}
              </span>
            )}

            <p className="text-lg font-semibold text-text-primary">{plan.name}</p>
            <p className="mt-1 text-sm text-text-muted">{plan.description}</p>
            <div className="mt-5">
              {plan.originalPrice && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-text-muted/70 line-through">{plan.originalPrice}</span>
                  {plan.discountLabel && (
                    <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-semibold text-accent-bright">
                      {plan.discountLabel}
                    </span>
                  )}
                </div>
              )}
              <p className={plan.originalPrice ? "mt-0.5" : ""}>
                <span className="text-4xl font-bold text-text-primary">{plan.price}</span>
                <span className="text-sm text-text-muted"> {plan.period}</span>
              </p>
            </div>

            <ul className="mt-6 flex-1 space-y-3">
              {plan.features.map((feat) => (
                <li
                  key={feat.text}
                  className={`flex items-start gap-2 text-sm ${
                    feat.included ? "text-text-secondary" : "text-slate-600"
                  }`}
                >
                  {feat.included ? (
                    <svg
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-bright"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.6 3.6 6.7-6.7a1 1 0 011.4 0z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 0h10.5a1.5 1.5 0 011.5 1.5v7.5a1.5 1.5 0 01-1.5 1.5h-10.5a1.5 1.5 0 01-1.5-1.5v-7.5a1.5 1.5 0 011.5-1.5z"
                      />
                    </svg>
                  )}
                  {feat.text}
                </li>
              ))}
            </ul>

            <div className="mt-7">
              <PlanButton plan={plan} ap={ap} onPlanSelected={onPlanSelected} />
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
