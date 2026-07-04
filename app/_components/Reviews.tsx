"use client";

import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";
import { cardHover } from "../_lib/motion";

export default function Reviews() {
  const { t } = useLanguage();

  return (
    <section id="reviews" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t.reviews.heading}
          </h2>
          <p className="mt-4 text-lg text-slate-400">{t.reviews.subheading}</p>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {t.reviews.items.map((review, index) => (
            <Reveal key={review.name} delay={index * 80}>
              <div
                className={`flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm ${cardHover}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-accent-bright">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <svg
                        key={starIndex}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
                      </svg>
                    ))}
                  </div>
                  <span className="font-serif text-4xl leading-none text-white/10" aria-hidden>
                    &rdquo;
                  </span>
                </div>
                <p className="mt-5 flex-1 text-sm leading-relaxed text-slate-300">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-bright text-sm font-semibold text-white">
                    {review.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{review.name}</p>
                    <p className="text-xs text-slate-500">{review.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
