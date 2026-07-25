"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";

const CHEVRON_ICON = (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export default function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            {t.faq.heading}
          </h2>
          <p className="mt-4 text-lg text-text-muted">{t.faq.subheading}</p>
        </Reveal>

        <div className="mt-12 space-y-3">
          {t.faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <Reveal key={item.question} delay={index * 40}>
                <div className="overflow-hidden rounded-2xl border border-border-subtle bg-surface-1">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-semibold text-text-primary">{item.question}</span>
                    <span className={`flex-shrink-0 text-text-muted transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}>
                      {CHEVRON_ICON}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="border-t border-border-subtle bg-surface-2 px-6 py-5 transition-[opacity] duration-200 ease-[var(--ease-out-strong)] starting:opacity-0">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-bright">
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm3.75 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm3.75 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                          </svg>
                        </span>
                        <p className="text-sm leading-relaxed text-text-secondary">{item.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
