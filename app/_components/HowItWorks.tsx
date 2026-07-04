"use client";

import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";
import { cardHover } from "../_lib/motion";

export default function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t.howItWorks.heading}
          </h2>
          <p className="mt-4 text-lg text-slate-400">{t.howItWorks.subheading}</p>
        </Reveal>

        <div className="relative mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div
            aria-hidden
            className="absolute top-[2.75rem] left-0 right-0 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block"
          />
          {t.howItWorks.steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 70}>
              <div
                className={`relative h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm ${cardHover}`}
              >
                <span className="bg-gradient-to-br from-accent-bright to-accent bg-clip-text text-5xl font-extrabold tracking-tight text-transparent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
