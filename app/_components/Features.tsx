"use client";

import type { ReactNode } from "react";
import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";
import { cardHover } from "../_lib/motion";

const ICON_PROPS = {
  className: "h-6 w-6",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: 1.75,
} as const;

const ICONS: ReactNode[] = [
  <svg {...ICON_PROPS} key="visa">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg {...ICON_PROPS} key="documents">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m-7 5h8a2 2 0 002-2V7a2 2 0 00-2-2H9.5L6 8.5V19a2 2 0 002 2z" />
  </svg>,
  <svg {...ICON_PROPS} key="housing">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75V20a1 1 0 01-1 1h-4a1 1 0 01-1-1v-5H9v5a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z" />
  </svg>,
  <svg {...ICON_PROPS} key="banking">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L3 8h18L12 3zM5 8v10M9 8v10M15 8v10M19 8v10M3 21h18" />
  </svg>,
  <svg {...ICON_PROPS} key="healthcare">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m-4-4h8" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 5.5A2.5 2.5 0 017 3h10a2.5 2.5 0 012.5 2.5v13A2.5 2.5 0 0117 21H7a2.5 2.5 0 01-2.5-2.5v-13z" />
  </svg>,
  <svg {...ICON_PROPS} key="chat">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.97-4.03 9-9 9-1.5 0-2.91-.37-4.15-1.02L3 21l1.07-3.78A8.96 8.96 0 013 12c0-4.97 4.03-9 9-9s9 4.03 9 9z" />
  </svg>,
];

export default function Features() {
  const { t } = useLanguage();

  return (
    <section id="features" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            {t.features.heading}
          </h2>
          <p className="mt-4 text-lg text-text-muted">{t.features.subheading}</p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.features.items.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 60}>
              <div
                className={`group h-full rounded-2xl border border-border-subtle bg-surface-1 p-6 backdrop-blur-sm ${cardHover}`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent-bright transition-transform duration-200 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-110">
                  {ICONS[index]}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-text-primary">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
