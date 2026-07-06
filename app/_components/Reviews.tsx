"use client";

import { useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";
import { pressScale } from "../_lib/motion";

export default function Reviews() {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const items = t.reviews.items;

  function scrollToIndex(index: number) {
    const el = scrollRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(index, items.length - 1));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
  }

  function handleScroll() {
    const el = scrollRef.current;
    if (!el || el.clientWidth === 0) return;
    setActiveIndex(Math.round(el.scrollLeft / el.clientWidth));
  }

  return (
    <section id="reviews" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t.reviews.heading}
          </h2>
          <p className="mt-4 text-lg text-slate-400">{t.reviews.subheading}</p>
        </Reveal>

        <div className="relative mt-16">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((review, index) => (
              <div key={review.name} className="w-full flex-shrink-0 snap-start px-1 sm:px-8">
                <Reveal delay={index * 60}>
                  <div className="mx-auto flex h-full max-w-2xl flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm sm:p-10">
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
                    <p className="mt-5 flex-1 text-base leading-relaxed text-slate-300">
                      &ldquo;{review.quote}&rdquo;
                    </p>

                    {review.documentBadge && (
                      <span className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-400">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m-7 5h8a2 2 0 002-2V7a2 2 0 00-2-2H9.5L6 8.5V19a2 2 0 002 2z" />
                        </svg>
                        {review.documentBadge}
                      </span>
                    )}

                    <div className="mt-6 flex items-center gap-3">
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-bright text-sm font-semibold text-white">
                        {review.initials}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">{review.name}</p>
                        <p className="text-xs text-slate-500">{review.role}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous review"
            className={`absolute left-0 top-1/2 hidden -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#0d0d0f]/90 p-2.5 text-white shadow-xl shadow-black/40 backdrop-blur-xl transition-colors duration-150 hover:border-accent/40 disabled:cursor-not-allowed disabled:opacity-30 sm:flex ${pressScale}`}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={activeIndex === items.length - 1}
            aria-label="Next review"
            className={`absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-4 items-center justify-center rounded-full border border-white/15 bg-[#0d0d0f]/90 p-2.5 text-white shadow-xl shadow-black/40 backdrop-blur-xl transition-colors duration-150 hover:border-accent/40 disabled:cursor-not-allowed disabled:opacity-30 sm:flex ${pressScale}`}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {items.map((review, index) => (
            <button
              key={review.name}
              type="button"
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to review ${index + 1}`}
              aria-current={activeIndex === index}
              className={`h-2 rounded-full transition-all duration-200 ${
                activeIndex === index ? "w-6 bg-accent-bright" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
