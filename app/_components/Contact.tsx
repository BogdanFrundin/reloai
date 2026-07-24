"use client";

import { useState, type FormEvent } from "react";
import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";
import { pressScale } from "../_lib/motion";

const inputClasses =
  "mt-1.5 w-full rounded-xl border border-border-strong bg-surface-1 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-[border-color,box-shadow,background-color] duration-150 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

export default function Contact() {
  const { t, lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="relative overflow-hidden py-20 lg:py-28">
      <div
        aria-hidden
        className="animate-blob-drift absolute left-1/2 top-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 opacity-70 blur-[140px] motion-reduce:animate-none"
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal>
          <h2 className="bg-gradient-to-r from-text-primary via-accent-bright to-accent bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl lg:text-5xl">
            {t.contact.heading}
          </h2>
          <p className="mt-4 max-w-md text-lg text-text-muted">{t.contact.subtext}</p>

          <div className="mt-10 space-y-4 text-sm text-text-secondary">
            <p className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-bright" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {t.contact.email}
            </p>
            <p className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-bright" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t.contact.repliesWithin}
            </p>
          </div>
        </Reveal>

        <Reveal
          delay={100}
          className="rounded-3xl border border-border-subtle bg-surface-1 p-7 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8"
        >
          {submitted ? (
            <div className="flex h-full min-h-[280px] flex-col items-center justify-center text-center transition-[opacity,transform] duration-300 ease-[var(--ease-out-strong)] starting:opacity-0 starting:scale-95">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent-bright">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <h3 className="mt-4 text-lg font-semibold text-text-primary">
                {t.contact.success.title}
              </h3>
              <p className="mt-2 text-sm text-text-muted">{t.contact.success.subtext}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="text-sm font-medium text-text-secondary">
                  {t.contact.form.fullName}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder={t.contact.form.placeholderName}
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-medium text-text-secondary">
                  {t.contact.form.emailLabel}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder={t.contact.form.placeholderEmail}
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="destination" className="text-sm font-medium text-text-secondary">
                  {t.contact.form.movingTo}
                </label>
                <select
                  key={lang}
                  id="destination"
                  name="destination"
                  defaultValue={t.contact.form.destinations[0]}
                  className={inputClasses}
                >
                  {t.contact.form.destinations.map((destination) => (
                    <option key={destination} className="bg-panel text-text-primary">
                      {destination}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="text-sm font-medium text-text-secondary">
                  {t.contact.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder={t.contact.form.placeholderMessage}
                  className={`${inputClasses} resize-none`}
                />
              </div>

              <button
                type="submit"
                className={`w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-8px_var(--accent)] transition-colors duration-150 hover:bg-accent-bright ${pressScale}`}
              >
                {t.contact.form.send}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
