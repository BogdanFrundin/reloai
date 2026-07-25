"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import { pressScale } from "../_lib/motion";
import { useLanguage } from "./LanguageProvider";
import { useCtaHref } from "../_lib/useCtaHref";
import type { Dictionary } from "../_lib/i18n";

interface FeatItem {
  text: string;
  included: boolean;
}

interface PlanDef {
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

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-bright"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function LockIcon() {
  return (
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
  );
}

export default function Pricing() {
  const { t } = useLanguage();
  const ctaHref = useCtaHref();
  const plans = buildPlans(t.appPricing);

  return (
    <section id="pricing" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            {t.pricing.heading}
          </h2>
          <p className="mt-4 text-lg text-text-muted">{t.pricing.subheading}</p>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 90} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-3xl p-8 backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-200 ease-[var(--ease-out-strong)] motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1.5 ${
                  plan.highlighted
                    ? "border border-accent/50 bg-accent/[0.07] shadow-[0_0_50px_-12px_var(--accent)] lg:-translate-y-3 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_0_70px_-10px_var(--accent)]"
                    : "border border-border-subtle bg-surface-1 [@media(hover:hover)_and_(pointer:fine)]:hover:border-border-strong [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/[0.05]"
                }`}
              >
                {plan.highlighted && (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[3px] rounded-t-3xl bg-gradient-to-r from-accent via-accent-bright to-accent"
                  />
                )}
                {plan.badge && (
                  <span className="absolute -top-3 right-8 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white shadow-[0_0_20px_-4px_var(--accent)]">
                    {plan.badge}
                  </span>
                )}

                <h3 className="text-lg font-semibold text-text-primary">{plan.name}</h3>
                <p className="mt-1 text-sm text-text-muted">{plan.description}</p>

                <div className="mt-6">
                  {plan.originalPrice && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-text-muted/70 line-through">{plan.originalPrice}</span>
                      {plan.discountLabel && (
                        <span className="rounded-full bg-red-500/15 px-2 py-0.5 text-[11px] font-semibold text-red-600">
                          {plan.discountLabel}
                        </span>
                      )}
                    </div>
                  )}
                  <p className={`flex items-baseline gap-1 ${plan.originalPrice ? "mt-0.5" : ""}`}>
                    <span className="text-4xl font-bold tracking-tight text-text-primary">{plan.price}</span>
                    <span className="text-text-muted">{plan.period}</span>
                  </p>
                </div>

                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.map((feat) => (
                    <li
                      key={feat.text}
                      className={`flex items-start gap-2 text-sm ${
                        feat.included ? "text-text-secondary" : "text-slate-600"
                      }`}
                    >
                      {feat.included ? <CheckIcon /> : <LockIcon />}
                      {feat.text}
                    </li>
                  ))}
                </ul>

                <Link
                  href={ctaHref}
                  className={`mt-8 rounded-full px-6 py-3 text-center text-sm font-semibold transition-colors duration-150 ${pressScale} ${
                    plan.highlighted
                      ? "bg-accent text-white hover:bg-accent-bright"
                      : "border border-border-strong bg-surface-1 text-text-primary hover:border-accent/50"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
