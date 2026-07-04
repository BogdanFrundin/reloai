"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import { pressScale } from "../_lib/motion";
import { useLanguage } from "./LanguageProvider";
import { useCtaHref } from "../_lib/useCtaHref";

interface FeatItem {
  text: string;
  included: boolean;
}

interface PlanDef {
  name: string;
  price: string;
  period: string;
  description: string;
  badge: string | null;
  highlighted: boolean;
  cta: string;
  features: FeatItem[];
}

const PLANS: PlanDef[] = [
  {
    name: "Free",
    price: "€0",
    period: "forever",
    description: "Try before you commit.",
    badge: null,
    highlighted: false,
    cta: "Start free",
    features: [
      { text: "Poland — 1 country available", included: true },
      { text: "Checklist: 5 steps preview", included: true },
      { text: "5 AI messages per day", included: true },
      { text: "Document upload & storage", included: false },
      { text: "Full address database", included: false },
      { text: "Community access", included: false },
      { text: "Email support", included: false },
    ],
  },
  {
    name: "Premium",
    price: "€29",
    period: "/month",
    description: "Full guidance for your move.",
    badge: "Most popular",
    highlighted: true,
    cta: "Get Premium",
    features: [
      { text: "All 3 countries (Poland, Germany, Spain)", included: true },
      { text: "Full checklist — all steps", included: true },
      { text: "50 AI messages per day", included: true },
      { text: "Document upload & storage", included: true },
      { text: "Full address database (banks, clinics, offices)", included: true },
      { text: "Community access", included: true },
      { text: "Email support", included: true },
    ],
  },
  {
    name: "Pro",
    price: "€49",
    period: "/month",
    description: "For families and complex moves.",
    badge: null,
    highlighted: false,
    cta: "Get Pro",
    features: [
      { text: "Everything in Premium", included: true },
      { text: "Unlimited AI messages", included: true },
      { text: "AI fills documents automatically", included: true },
      { text: "Priority support 24/7", included: true },
      { text: "Consultation call (1× / month)", included: true },
      { text: "Early access to new countries", included: true },
      { text: "PDF export for documents", included: true },
    ],
  },
];

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

  return (
    <section id="pricing" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t.pricing.heading}
          </h2>
          <p className="mt-4 text-lg text-slate-400">{t.pricing.subheading}</p>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {PLANS.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 90} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-3xl p-8 backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-200 ease-[var(--ease-out-strong)] motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1.5 ${
                  plan.highlighted
                    ? "border border-accent/50 bg-accent/[0.07] shadow-[0_0_50px_-12px_var(--accent)] lg:-translate-y-3 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_0_70px_-10px_var(--accent)]"
                    : "border border-white/10 bg-white/[0.03] [@media(hover:hover)_and_(pointer:fine)]:hover:border-white/20 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/[0.05]"
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

                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                <p className="mt-1 text-sm text-slate-400">{plan.description}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight text-white">{plan.price}</span>
                  <span className="text-slate-400">{plan.period}</span>
                </div>

                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.map((feat) => (
                    <li
                      key={feat.text}
                      className={`flex items-start gap-2 text-sm ${
                        feat.included ? "text-slate-300" : "text-slate-600"
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
                      : "border border-white/15 bg-white/5 text-white hover:border-accent/50"
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
