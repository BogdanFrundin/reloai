"use client";

import PageHeader from "../../_components/PageHeader";
import Reveal from "../../_components/Reveal";
import StarRating from "../../_components/StarRating";
import { useLanguage } from "../../_components/LanguageProvider";

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
      <PageHeader title={t.medicine.title} subtitle={t.medicine.subtitle} />

      <Reveal delay={40} className="mt-10">
        <h2 className="text-xl font-bold tracking-tight text-white">{t.medicine.nfzVsPrivate}</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
          <div className="grid grid-cols-3 border-b border-white/10 bg-white/[0.03] text-xs font-semibold uppercase tracking-wider text-slate-400">
            <div className="p-4"></div>
            <div className="p-4 text-accent-bright">{t.medicine.nfzPublic}</div>
            <div className="p-4 text-accent-bright">{t.medicine.privateLabel}</div>
          </div>
          {t.medicine.rows.map((row, index) => (
            <div
              key={row.label}
              className={`grid grid-cols-3 text-sm ${
                index !== t.medicine.rows.length - 1 ? "border-b border-white/5" : ""
              }`}
            >
              <div className="p-4 font-medium text-white">{row.label}</div>
              <div className="p-4 text-slate-400">{row.nfz}</div>
              <div className="p-4 text-slate-400">{row.pvt}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={80} className="mt-12">
        <h2 className="text-xl font-bold tracking-tight text-white">{t.medicine.clinicsTitle}</h2>
        <p className="mt-1 text-sm text-slate-400">{t.medicine.clinicsSub}</p>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CLINICS.map((clinic, index) => (
            <Reveal key={clinic.name} delay={index * 40}>
              <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-[transform,box-shadow,border-color,background-color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:border-accent/50 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/[0.06] [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_12px_32px_-12px_rgba(33,85,212,0.45)] motion-reduce:transition-none">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-bright transition-transform duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105 motion-reduce:transition-none">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m-4-4h8" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 5.5A2.5 2.5 0 017 3h10a2.5 2.5 0 012.5 2.5v13A2.5 2.5 0 0117 21H7a2.5 2.5 0 01-2.5-2.5v-13z" />
                  </svg>
                </span>
                <p className="mt-3 text-sm font-semibold text-white">{clinic.name}</p>
                <p className="mt-1 text-xs text-slate-500">{clinic.street}, {t.medicine.warsaw}</p>
                <p className="mt-1 text-xs text-slate-500">{clinic.phone}</p>
                <span className="mt-3 inline-flex w-fit items-center rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent-bright">
                  {t.medicine.languages[clinic.languagesKey]}
                </span>
                <div className="mt-3">
                  <StarRating rating={clinic.rating} />
                </div>
                <a
                  href={`tel:${clinic.phone.replace(/\s+/g, "")}`}
                  className="mt-4 inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-300 opacity-80 transition-[background-color,border-color,color,opacity] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:border-accent [@media(hover:hover)_and_(pointer:fine)]:group-hover:bg-accent [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-white [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100 motion-reduce:transition-none"
                >
                  {t.medicine.bookBtn}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
