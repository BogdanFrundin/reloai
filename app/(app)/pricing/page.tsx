"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "../../_components/PageHeader";
import Reveal from "../../_components/Reveal";
import { pressScale } from "../../_lib/motion";
import { useAuth } from "../../_components/AuthProvider";
import { useLanguage } from "../../_components/LanguageProvider";
import type { Dictionary } from "../../_lib/i18n";
import { supabase } from "../../../lib/supabase";

type PlanKey = "free" | "premium" | "pro";

interface FeatItem {
  text: string;
  included: boolean;
}

interface PlanDef {
  key: PlanKey;
  name: string;
  price: string;
  period: string;
  description: string;
  badge: string | null;
  highlighted: boolean;
  cta: string;
  features: FeatItem[];
}

function buildPlans(t: Dictionary): PlanDef[] {
  const { appPricing } = t;
  return [
    {
      key: "free",
      name: appPricing.freeName,
      price: "€0",
      period: appPricing.forever,
      description: appPricing.freeDesc,
      badge: null,
      highlighted: false,
      cta: appPricing.freeCta,
      features: [
        { text: appPricing.freeFeatures[0], included: true },
        { text: appPricing.freeFeatures[1], included: true },
        { text: appPricing.freeFeatures[2], included: true },
        { text: appPricing.freeFeatures[3], included: false },
        { text: appPricing.freeFeatures[4], included: false },
        { text: appPricing.freeFeatures[5], included: false },
        { text: appPricing.freeFeatures[6], included: false },
      ],
    },
    {
      key: "premium",
      name: "Premium",
      price: "€29",
      period: appPricing.perMonth,
      description: appPricing.premiumDesc,
      badge: appPricing.mostPopular,
      highlighted: true,
      cta: appPricing.premiumCta,
      features: appPricing.premiumFeatures.map((text) => ({ text, included: true })),
    },
    {
      key: "pro",
      name: "Pro",
      price: "€49",
      period: appPricing.perMonth,
      description: appPricing.proDesc,
      badge: null,
      highlighted: false,
      cta: appPricing.proCta,
      features: appPricing.proFeatures.map((text) => ({ text, included: true })),
    },
  ];
}

function PlanButton({ plan }: { plan: PlanDef }) {
  const router = useRouter();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (plan.key === "free") {
      if (!user) return;
      setLoading(true);
      await supabase.from("profiles").update({ plan: "free" }).eq("id", user.id);
      router.push("/dashboard");
      return;
    }
    router.push(`/checkout?plan=${plan.key}`);
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={`flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 ${pressScale} ${
          plan.highlighted
            ? "bg-accent shadow-[0_0_30px_-8px_var(--accent)] hover:bg-accent-bright disabled:opacity-75"
            : "border border-white/15 bg-white/5 hover:border-accent/40 hover:text-accent-bright disabled:opacity-60"
        }`}
      >
        {loading && (
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        )}
        {loading ? t.appPricing.activating : plan.cta}
      </button>
      {plan.key !== "free" && (
        <p className="mt-2.5 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 0h10.5a1.5 1.5 0 011.5 1.5v7.5a1.5 1.5 0 01-1.5 1.5h-10.5a1.5 1.5 0 01-1.5-1.5v-7.5a1.5 1.5 0 011.5-1.5z" />
          </svg>
          {t.appPricing.securedByStripe}
        </p>
      )}
    </div>
  );
}

export default function PricingPage() {
  const { t } = useLanguage();
  const plans = buildPlans(t);

  return (
    <div className="px-6 py-8 lg:px-10 lg:py-10">
      <PageHeader title={t.appPricing.title} subtitle={t.appPricing.subtitle} />

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <Reveal key={plan.key} delay={index * 60} className="h-full">
            <div
              className={`relative flex h-full flex-col rounded-2xl border p-7 backdrop-blur-sm ${
                plan.highlighted
                  ? "border-accent/50 bg-accent/[0.06] shadow-[0_0_50px_-12px_var(--accent)]"
                  : "border-white/10 bg-white/[0.03]"
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

              <p className="text-lg font-semibold text-white">{plan.name}</p>
              <p className="mt-1 text-sm text-slate-400">{plan.description}</p>
              <p className="mt-5">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-sm text-slate-500"> {plan.period}</span>
              </p>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feat) => (
                  <li
                    key={feat.text}
                    className={`flex items-start gap-2 text-sm ${
                      feat.included ? "text-slate-300" : "text-slate-600"
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
                <PlanButton plan={plan} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
