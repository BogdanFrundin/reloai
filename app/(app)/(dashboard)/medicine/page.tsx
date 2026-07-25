"use client";

import Image from "next/image";
import PageHeader from "../../../_components/PageHeader";
import Reveal from "../../../_components/Reveal";
import StarRating from "../../../_components/StarRating";
import HelpButton from "../../../_components/HelpButton";
import { useLanguage } from "../../../_components/LanguageProvider";
import { getFlagUrl } from "../../../_lib/flags";

const PHONE_ICON = (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 002.25-2.25v-1.372a1.125 1.125 0 00-.852-1.09l-4.423-1.106a1.125 1.125 0 00-1.173.417l-.97 1.293a11.25 11.25 0 01-6.226-6.226l1.293-.97a1.125 1.125 0 00.417-1.173L7.962 3.852a1.125 1.125 0 00-1.09-.852H5.5A2.25 2.25 0 003.25 5.25v1.5z"
    />
  </svg>
);

const ER_ICON = (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m9 0a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const PHARMACY_ICON = (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 3.75h7.5v3.375c0 .621.504 1.125 1.125 1.125h.375A2.25 2.25 0 0119.5 10.5v7.125A2.625 2.625 0 0116.875 20.25h-9.75A2.625 2.625 0 014.5 17.625V10.5a2.25 2.25 0 012.25-2.25h.375c.621 0 1.125-.504 1.125-1.125V3.75z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 13.5h4.5M12 11.25v4.5" />
  </svg>
);

const LINK_ICON = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const TOOTH_ICON = (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 3.5c-2.485 0-4.25 2.1-4.25 4.9 0 2.061.517 3.86 1.033 5.657.42 1.464.84 2.926 1.008 4.523.107 1.017.858 1.92 1.959 1.92.98 0 1.688-.716 1.897-1.62.309-1.334.652-3.42 1.353-3.42s1.044 2.086 1.353 3.42c.209.904.916 1.62 1.897 1.62 1.101 0 1.852-.903 1.96-1.92.166-1.597.586-3.059 1.007-4.523.516-1.797 1.033-3.596 1.033-5.657 0-2.8-1.765-4.9-4.25-4.9-1.045 0-1.802.451-2.5.9-.698-.449-1.455-.9-2.5-.9z"
    />
  </svg>
);

const CLINICS = [
  {
    name: "Medicover Centrum",
    street: "ul. Marszałkowska 1",
    phone: "+48 22 555 1234",
    languagesKey: "ruUa",
    rating: 4.7,
  },
  {
    name: "LUX MED Mokotów",
    street: "ul. Wołoska 5",
    phone: "+48 22 333 5678",
    languagesKey: "en",
    rating: 4.5,
  },
  {
    name: "Damian Medical Center",
    street: "ul. Wałbrzyska 46",
    phone: "+48 22 566 2222",
    languagesKey: "ru",
    rating: 4.6,
  },
  {
    name: "CM LIM",
    street: "ul. Puławska 39",
    phone: "+48 22 853 9999",
    languagesKey: "ua",
    rating: 4.3,
  },
] as const;

export default function MedicinePage() {
  const { t } = useLanguage();

  return (
    <div className="px-6 py-8 lg:px-10 lg:py-10">
      <PageHeader
        title={
          <span className="inline-flex items-center gap-3">
            {t.medicine.title}
            <Image src={getFlagUrl("pl", "md")} alt="Poland" width={32} height={24} className="rounded-sm" unoptimized />
          </span>
        }
        subtitle={t.medicine.subtitle}
      />

      <Reveal delay={80} className="mt-10">
        <h2 className="text-xl font-bold tracking-tight text-text-primary">{t.medicine.clinicsTitle}</h2>
        <p className="mt-1 text-sm text-text-muted">{t.medicine.clinicsSub}</p>
        <div className="mt-4 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CLINICS.map((clinic, index) => (
            <Reveal key={clinic.name} delay={index * 40}>
              <div className="group flex h-full flex-col rounded-2xl border border-border-subtle bg-surface-1 p-5 backdrop-blur-sm transition-[transform,box-shadow,border-color,background-color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:border-accent/50 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-surface-hover [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_12px_32px_-12px_rgba(33,85,212,0.45)] motion-reduce:transition-none">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-bright transition-transform duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105 motion-reduce:transition-none">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m-4-4h8" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 5.5A2.5 2.5 0 017 3h10a2.5 2.5 0 012.5 2.5v13A2.5 2.5 0 0117 21H7a2.5 2.5 0 01-2.5-2.5v-13z" />
                  </svg>
                </span>
                <p className="mt-3 min-h-10 text-sm font-semibold text-text-primary">{clinic.name}</p>
                <p className="mt-1 min-h-8 text-xs text-text-muted">{clinic.street}, {t.medicine.warsaw}</p>
                <p className="mt-1 min-h-4 text-xs text-text-muted">{clinic.phone}</p>
                <div className="mt-3 min-h-7">
                  {clinic.languagesKey && (
                    <span className="inline-flex w-fit items-center rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent-bright">
                      {t.medicine.languages[clinic.languagesKey]}
                    </span>
                  )}
                </div>
                <div className="mt-3 min-h-5">
                  <StarRating rating={clinic.rating} />
                </div>
                <a
                  href={`tel:${clinic.phone.replace(/\s+/g, "")}`}
                  className="mt-auto inline-flex items-center justify-center rounded-full border border-border-strong bg-surface-1 px-4 py-2.5 text-sm font-semibold text-text-secondary opacity-80 transition-[background-color,border-color,color,opacity] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:border-accent [@media(hover:hover)_and_(pointer:fine)]:group-hover:bg-accent [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-white [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100 motion-reduce:transition-none"
                >
                  {t.medicine.bookBtn}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>

      <Reveal delay={100} className="mt-12">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-xl font-bold tracking-tight text-text-primary">{t.medicine.nfzTitle}</h2>
          <HelpButton
            guideHeading={t.medicine.nfzTitle}
            guideSteps={[...t.medicine.nfzSteps]}
            aiQuestion={t.medicine.nfzAiQuestion}
            label={t.helpButton.label}
          />
        </div>
        <div className="mt-4 rounded-2xl border border-border-subtle bg-surface-1 p-5 backdrop-blur-sm sm:p-6">
          <ol className="space-y-4">
            {t.medicine.nfzSteps.map((step, index) => (
              <li key={step} className="flex items-start gap-4">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-sm font-bold text-accent-bright">
                  {index + 1}
                </span>
                <div className="pt-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    {t.medicine.stepLabel} {index + 1}
                  </p>
                  <p className="mt-0.5 text-sm text-text-secondary">{step}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      <Reveal delay={130} className="mt-12">
        <h2 className="text-xl font-bold tracking-tight text-text-primary">{t.medicine.emergencyTitle}</h2>
        <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-5 backdrop-blur-sm sm:p-6">
          <div className="flex items-start gap-4">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-red-500/15 text-red-400">
              {PHONE_ICON}
            </span>
            <div>
              <p className="text-sm text-text-secondary">{t.medicine.emergencyNumber}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <a
                  href="tel:112"
                  className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-sm font-bold text-red-300 transition-colors duration-150 hover:bg-red-500/20"
                >
                  112
                </a>
                <a
                  href="tel:999"
                  className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-sm font-bold text-red-300 transition-colors duration-150 hover:bg-red-500/20"
                >
                  999
                </a>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-4 border-t border-border-subtle pt-4">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-surface-1 text-text-secondary">
              {ER_ICON}
            </span>
            <p className="pt-2 text-sm text-text-secondary">{t.medicine.emergencyEr}</p>
          </div>

          <div className="mt-4 flex items-start gap-4 border-t border-border-subtle pt-4">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-surface-1 text-text-secondary">
              {PHARMACY_ICON}
            </span>
            <p className="pt-2 text-sm text-text-secondary">
              {t.medicine.emergencyPharmacy}{" "}
              <a
                href="https://aptekadyzurna.pl"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent-bright transition-colors duration-150 hover:text-text-primary"
              >
                aptekadyzurna.pl
              </a>
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={160} className="mt-12">
        <h2 className="text-xl font-bold tracking-tight text-text-primary">{t.medicine.usefulSitesTitle}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {t.medicine.usefulSites.map((site) => (
            <a
              key={site.url}
              href={`https://${site.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start justify-between gap-3 rounded-2xl border border-border-subtle bg-surface-1 p-5 backdrop-blur-sm transition-colors duration-150 hover:border-accent/40 hover:bg-white/[0.05]"
            >
              <div>
                <p className="text-sm font-semibold text-accent-bright">{site.url}</p>
                <p className="mt-1 text-sm text-text-muted">{site.desc}</p>
              </div>
              <span className="mt-1 flex-shrink-0 text-text-muted transition-colors duration-150 group-hover:text-accent-bright">
                {LINK_ICON}
              </span>
            </a>
          ))}
        </div>
      </Reveal>

      <Reveal delay={190} className="mt-12">
        <h2 className="text-xl font-bold tracking-tight text-text-primary">{t.medicine.dentalTitle}</h2>
        <div className="mt-4 rounded-2xl border border-border-subtle bg-surface-1 p-5 backdrop-blur-sm sm:p-6">
          <div className="flex items-start gap-4">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-bright">
              {TOOTH_ICON}
            </span>
            <ul className="space-y-3 pt-2 text-sm text-text-secondary">
              <li>{t.medicine.dentalNfz}</li>
              <li>{t.medicine.dentalPrivate}</li>
              <li>{t.medicine.dentalChains}</li>
            </ul>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
