"use client";

import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";

export default function Stats() {
  const { t } = useLanguage();

  return (
    <section className="relative border-y border-border-subtle py-12">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 sm:grid-cols-3 lg:px-8">
        {t.stats.items.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 80} className="text-center">
            <p className="bg-gradient-to-br from-text-primary to-text-muted bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
              {stat.value}
            </p>
            <p className="mt-2 text-sm font-medium uppercase tracking-wider text-text-muted">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
