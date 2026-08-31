"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";
import { pressScale } from "../_lib/motion";
import { REVIEW_AVATARS } from "../_lib/reviewAvatars";
import { getFlagUrl } from "../_lib/flags";

const AUTO_SCROLL_MS = 4000;

export default function Reviews() {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const items = t.reviews.items;

  function scrollToIndex(index: number) {
    const el = scrollRef.current;
    if (!el) return;
    const clamped = ((index % items.length) + items.length) % items.length;
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
  }

  function handleScroll() {
    const el = scrollRef.current;
    if (!el || el.clientWidth === 0) return;
    setActiveIndex(Math.round(el.scrollLeft / el.clientWidth));
  }

  useEffect(() => {
    if (isPaused || items.length <= 1) return;
    const timer = setTimeout(() => {
      scrollToIndex(activeIndex + 1);
    }, AUTO_SCROLL_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, isPaused, items.length]);

  return (
    <section id="reviews" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            {t.reviews.heading}
          </h2>
          <p className="mt-4 text-lg text-text-muted">{t.reviews.subheading}</p>
        </Reveal>

        <div
          className="relative mt-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((review, reviewIndex) => (
              <div key={review.name} className="w-full flex-shrink-0 snap-start px-1 sm:px-8">
                <div className="mx-auto flex h-full max-w-2xl flex-col rounded-2xl border border-border-subtle bg-surface-1 p-7 backdrop-blur-sm sm:p-10">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 text-accent-bright">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <svg
                          key={starIndex}
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-4 w-4 ${starIndex < review.rating ? "" : "text-border-strong"}`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
                        </svg>
                      ))}
                    </div>
                    <span className="font-serif text-4xl leading-none text-border-subtle" aria-hidden>
                      &rdquo;
                    </span>
                  </div>
                  <p className="mt-5 flex-1 text-base leading-relaxed text-text-secondary">
                    &ldquo;{review.quote}&rdquo;
                  </p>

                  {review.documentBadge && (
                    <span className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-border-subtle bg-surface-1 px-3 py-1.5 text-xs text-text-muted">
                      <Image
                        src={getFlagUrl(review.documentBadge.country, "sm")}
                        alt={review.documentBadge.country}
                        width={16}
                        height={12}
                        className="h-3 w-4 flex-shrink-0 rounded-[2px] object-cover"
                        unoptimized
                      />
                      {review.documentBadge.label}
                    </span>
                  )}

                  <div className="mt-6 flex items-center gap-3">
                    {REVIEW_AVATARS[reviewIndex] ? (
                      <Image
                        src={REVIEW_AVATARS[reviewIndex]}
                        alt={review.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 flex-shrink-0 rounded-full object-cover ring-1 ring-border-subtle"
                      />
                    ) : (
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-bright text-sm font-semibold text-white">
                        {review.initials}
                      </span>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{review.name}</p>
                      <p className="text-xs text-text-muted">{review.route}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex - 1)}
            aria-label="Previous review"
            className={`absolute left-0 top-1/2 hidden -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border border-border-strong bg-panel/90 p-2.5 text-text-primary shadow-xl shadow-black/40 backdrop-blur-xl transition-colors duration-150 hover:border-accent/40 sm:flex ${pressScale}`}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex + 1)}
            aria-label="Next review"
            className={`absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-4 items-center justify-center rounded-full border border-border-strong bg-panel/90 p-2.5 text-text-primary shadow-xl shadow-black/40 backdrop-blur-xl transition-colors duration-150 hover:border-accent/40 sm:flex ${pressScale}`}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {items.map((review, index) => (
            <button
              key={review.name}
              type="button"
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to review ${index + 1}`}
              aria-current={activeIndex === index}
              className={`h-2 rounded-full transition-all duration-200 ${
                activeIndex === index ? "w-6 bg-accent-bright" : "w-2 bg-border-strong hover:bg-text-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
