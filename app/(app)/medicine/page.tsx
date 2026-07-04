"use client";

import PageHeader from "../../_components/PageHeader";
import Reveal from "../../_components/Reveal";
import StarRating from "../../_components/StarRating";
import { useLanguage } from "../../_components/LanguageProvider";

const CLINICS = [
  {
    name: "Medicover Centrum",
    address: "ul. Marszałkowska 1, Warsaw",
    phone: "+48 22 555 1234",
    languages: "Russian & Ukrainian speaking",
    rating: 4.7,
  },
  {
    name: "LUX MED Mokotów",
    address: "ul. Wołoska 5, Warsaw",
    phone: "+48 22 333 5678",
    languages: "English speaking",
    rating: 4.5,
  },
  {
    name: "Damian Medical Center",
    address: "ul. Wałbrzyska 46, Warsaw",
    phone: "+48 22 566 2222",
    languages: "Russian speaking",
    rating: 4.6,
  },
  {
    name: "CM LIM",
    address: "ul. Puławska 39, Warsaw",
    phone: "+48 22 853 9999",
    languages: "Ukrainian speaking",
    rating: 4.3,
  },
];

export default function MedicinePage() {
  const { t } = useLanguage();

  return (
    <div className="px-6 py-8 lg:px-10 lg:py-10">
      <PageHeader title={t.medicine.title} subtitle={t.medicine.subtitle} />

      <Reveal delay={40} className="mt-10">
        <h2 className="text-lg font-semibold text-white">{t.medicine.nfzVsPrivate}</h2>
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
        <h2 className="text-lg font-semibold text-white">{t.medicine.clinicsTitle}</h2>
        <p className="mt-1 text-sm text-slate-400">{t.medicine.clinicsSub}</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CLINICS.map((clinic, index) => (
            <Reveal key={clinic.name} delay={index * 40}>
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
                <p className="text-sm font-semibold text-white">{clinic.name}</p>
                <p className="mt-1 text-xs text-slate-500">{clinic.address}</p>
                <p className="mt-1 text-xs text-slate-500">{clinic.phone}</p>
                <span className="mt-3 inline-flex w-fit items-center rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent-bright">
                  {clinic.languages}
                </span>
                <div className="mt-3">
                  <StarRating rating={clinic.rating} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
