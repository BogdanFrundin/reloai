"use client";

import Link from "next/link";
import PageHeader from "../../_components/PageHeader";
import Reveal from "../../_components/Reveal";
import StarRating from "../../_components/StarRating";
import { useLanguage } from "../../_components/LanguageProvider";

const BANKS = [
  { key: "pkobp", name: "PKO BP", href: "https://www.pkobp.pl/", rating: 4.0, badge: false },
  { key: "mbank", name: "mBank", href: "https://www.mbank.pl/", rating: 4.6, badge: true },
  { key: "santander", name: "Santander", href: "https://www.santander.pl/", rating: 4.2, badge: false },
  { key: "revolut", name: "Revolut", href: "https://www.revolut.com/", rating: 4.4, badge: false },
] as const;

export default function BanksPage() {
  const { t } = useLanguage();

  return (
    <div className="px-6 py-8 lg:px-10 lg:py-10">
      <PageHeader title={t.banks.title} subtitle={t.banks.subtitle} />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {BANKS.map((bank, index) => (
          <Reveal key={bank.key} delay={index * 50}>
            <div
              className={`relative flex h-full flex-col rounded-2xl border p-5 backdrop-blur-sm ${
                bank.badge
                  ? "border-accent/50 bg-accent/[0.06] shadow-[0_0_30px_-12px_var(--accent)]"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              {bank.badge && (
                <span className="absolute -top-3 left-5 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-white shadow-[0_0_16px_-4px_var(--accent)]">
                  {t.banks.bestForExpats}
                </span>
              )}
              <p className="text-lg font-semibold text-white">{bank.name}</p>
              <div className="mt-2">
                <StarRating rating={bank.rating} />
              </div>
              <ul className="mt-4 flex-1 space-y-2.5">
                {t.banks.features[bank.key].map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-slate-400">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-bright" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.6 3.6 6.7-6.7a1 1 0 011.4 0z" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={bank.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-accent-bright"
              >
                {t.banks.openAccount}
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
