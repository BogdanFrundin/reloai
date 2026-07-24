"use client";

import Image from "next/image";
import Link from "next/link";
import PageHeader from "../../../_components/PageHeader";
import Reveal from "../../../_components/Reveal";
import { useLanguage } from "../../../_components/LanguageProvider";
import { getFlagUrl } from "../../../_lib/flags";

const INFO_ICON = (
  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 11v5m0-8h.01" />
  </svg>
);

const TYPE_ICONS = {
  medical: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m-4-4h8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 5.5A2.5 2.5 0 017 3h10a2.5 2.5 0 012.5 2.5v13A2.5 2.5 0 0117 21H7a2.5 2.5 0 01-2.5-2.5v-13z" />
    </svg>
  ),
  car: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13l1.5-4.5A2 2 0 016.4 7h11.2a2 2 0 011.9 1.5L21 13m-18 0v5a1 1 0 001 1h1a1 1 0 001-1v-1h12v1a1 1 0 001 1h1a1 1 0 001-1v-5m-18 0h18" />
      <circle cx="7" cy="17" r="1.25" />
      <circle cx="17" cy="17" r="1.25" />
    </svg>
  ),
  home: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75V20a1 1 0 01-1 1h-4a1 1 0 01-1-1v-5H9v5a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z" />
    </svg>
  ),
  travel: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l1.5-6-8-2.5 2-2 8 1.5L18.5 4l2 .5-3.5 8.5 1.5 8-2-.5-2.5-6-3 5z" />
    </svg>
  ),
} as const;

const INSURANCE_TYPES = ["medical", "car", "home", "travel"] as const;

export default function InsurancePage() {
  const { t } = useLanguage();

  return (
    <div className="px-6 py-8 lg:px-10 lg:py-10">
      <PageHeader
        title={
          <span className="inline-flex items-center gap-3">
            {t.insurance.title}
            <Image src={getFlagUrl("pl", "md")} alt="Poland" width={32} height={24} className="rounded-sm" unoptimized />
          </span>
        }
        subtitle={t.insurance.subtitle}
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {INSURANCE_TYPES.map((key, index) => {
          const type = t.insurance.types[key];
          return (
            <Reveal key={key} delay={index * 50}>
              <div className="group flex h-full flex-col rounded-2xl border border-border-subtle bg-surface-1 p-5 backdrop-blur-sm transition-[transform,box-shadow,border-color,background-color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:border-accent/50 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-surface-hover [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_12px_32px_-12px_rgba(33,85,212,0.45)] motion-reduce:transition-none">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-bright transition-transform duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105 motion-reduce:transition-none">
                  {TYPE_ICONS[key]}
                </span>
                <p className="mt-3 text-lg font-semibold text-text-primary">{type.name}</p>
                <p className="mt-1 text-xs text-text-muted">{type.provider}</p>
                <p className="mt-2 text-sm font-medium text-accent-bright">{type.price}</p>
                <p className="mt-2 flex-1 text-sm text-text-muted">{type.desc}</p>
                <Link
                  href="#"
                  className="mt-5 inline-flex items-center justify-center rounded-full border border-border-strong bg-surface-1 px-4 py-2.5 text-sm font-semibold text-text-secondary opacity-80 transition-[background-color,border-color,color,opacity] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:border-accent [@media(hover:hover)_and_(pointer:fine)]:group-hover:bg-accent [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-white [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100 motion-reduce:transition-none"
                >
                  {t.insurance.learnMoreBtn}
                </Link>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={200} className="mt-12">
        <h2 className="text-xl font-bold tracking-tight text-text-primary">{t.insurance.compareTitle}</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-border-subtle bg-surface-1 backdrop-blur-sm">
          <div className="grid grid-cols-3 border-b border-border-subtle bg-surface-1 text-xs font-semibold uppercase tracking-wider text-text-muted">
            <div className="p-4"></div>
            <div className="p-4 text-accent-bright">
              <span className="inline-flex items-center gap-1.5 normal-case tracking-normal">
                {t.insurance.nfzLabel}
                <span title={t.insurance.nfzTooltip} className="cursor-help text-text-muted">
                  {INFO_ICON}
                </span>
              </span>
            </div>
            <div className="p-4 text-accent-bright">{t.insurance.privateLabel}</div>
          </div>
          {t.insurance.rows.map((row, index) => (
            <div
              key={row.label}
              className={`grid grid-cols-3 text-sm ${
                index !== t.insurance.rows.length - 1 ? "border-b border-border-subtle" : ""
              }`}
            >
              <div className="p-4 font-medium text-text-primary">{row.label}</div>
              <div className="p-4 text-text-muted">{row.nfz}</div>
              <div className="p-4 text-text-muted">{row.pvt}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
