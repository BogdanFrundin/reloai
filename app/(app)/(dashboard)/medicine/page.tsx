"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "../../../_components/PageHeader";
import Reveal from "../../../_components/Reveal";
import StarRating from "../../../_components/StarRating";
import HelpButton from "../../../_components/HelpButton";
import CitySelect from "../../../_components/CitySelect";
import Dropdown from "../../../_components/Dropdown";
import { useLanguage } from "../../../_components/LanguageProvider";
import { useAuth } from "../../../_components/AuthProvider";
import { getFlagUrl } from "../../../_lib/flags";
import { supabase } from "../../../../lib/supabase";
import { useSelectedCity } from "../../../_lib/useSelectedCity";
import { buildGoogleMapsUrl } from "../../../_lib/mapsLink";
import { getCityName } from "../../../_lib/cities";
import { localizeClinics } from "../../../_lib/localizeClinic";
import { getChosenCount, formatChosenCount } from "../../../_lib/chosenCount";

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

const TOOTH_ICON = (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 3.5c-2.485 0-4.25 2.1-4.25 4.9 0 2.061.517 3.86 1.033 5.657.42 1.464.84 2.926 1.008 4.523.107 1.017.858 1.92 1.959 1.92.98 0 1.688-.716 1.897-1.62.309-1.334.652-3.42 1.353-3.42s1.044 2.086 1.353 3.42c.209.904.916 1.62 1.897 1.62 1.101 0 1.852-.903 1.96-1.92.166-1.597.586-3.059 1.007-4.523.516-1.797 1.033-3.596 1.033-5.657 0-2.8-1.765-4.9-4.25-4.9-1.045 0-1.802.451-2.5.9-.698-.449-1.455-.9-2.5-.9z"
    />
  </svg>
);

const SEARCH_ICON = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="11" cy="11" r="7" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.3-4.3" />
  </svg>
);

const SPARKLE_ICON = (
  <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
    />
  </svg>
);

type MedicineSearchResult = { category: string | null; keywords: string[]; reply: string };

type Clinic = {
  id: string;
  city: string;
  category: string;
  name: string;
  district: string | null;
  address: string | null;
  rating: number | null;
  description: string | null;
  specializations: string[] | null;
  required_docs: string[] | null;
};

const clinicIconBadgeClass =
  "flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-bright";

const CLINIC_DEFAULT_ICON = (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m-4-4h8" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 5.5A2.5 2.5 0 017 3h10a2.5 2.5 0 012.5 2.5v13A2.5 2.5 0 0117 21H7a2.5 2.5 0 01-2.5-2.5v-13z" />
  </svg>
);

// Real brand logos, cropped down to just the icon mark (or a tight wordmark
// crop for brands with no separate icon) and saved locally under
// public/images/logos/clinics/. Keyed by a lowercase substring of clinic.name
// so both "Centrum Medyczne X" and "X Centrum Medyczne" orderings match.
// This is a first batch (~15 brands); more will be added as logos come in —
// clinics with no match here just keep the generic category icon below.
const CLINIC_LOGOS: Record<string, string> = {
  "mri diagnostyka": "mri-diagnostyka",
  radiologica: "radiologica",
  medicover: "medicover",
  luxmed: "luxmed",
  "lux med": "luxmed",
  "centrum medyczne damiana": "damiana",
  "centrum medyczne żelazna": "centrum-medyczne-zelazna",
  "centrum medyczne zelazna": "centrum-medyczne-zelazna",
  'centrum medyczne "żelazna"': "centrum-medyczne-zelazna",
  'centrum medyczne "zelazna"': "centrum-medyczne-zelazna",
  "centrum medyczne „żelazna”": "centrum-medyczne-zelazna",
  "szpital specjalistyczny św. zofii": "centrum-medyczne-zelazna",
  "szpital specjalistyczny sw. zofii": "centrum-medyczne-zelazna",
  "anny mazowieckiej": "szpital-anny-mazowieckiej",
  "matki i dziecka": "instytut-matki-i-dziecka",
  bielański: "szpital-bielanski",
  bielanski: "szpital-bielanski",
  "szpital południowy": "warszawski-szpital-poludniowy",
  "szpital poludniowy": "warszawski-szpital-poludniowy",
  // UCK GUMed (Gdańsk) is a completely different institution from UCK WUM
  // (Warsaw) despite sharing the "Uniwersyteckie Centrum Kliniczne" name, so
  // this must be checked before the generic "uniwersyteckie centrum kliniczne"
  // key below — otherwise every Gdańsk UCK GUMed clinic would incorrectly
  // show the Warsaw UCK WUM logo.
  "uniwersyteckie centrum kliniczne gumed": "uck-gumed",
  "uck gumed": "uck-gumed",
  "gdańskiego uniwersytetu medycznego": "uck-gumed",
  "gdanskiego uniwersytetu medycznego": "uck-gumed",
  "uniwersyteckie centrum kliniczne": "uck-wum",
  "uck wum": "uck-wum",
  // More specific clinics must be listed before the generic
  // "warszawskiego uniwersytetu medycznego" / "wum" entries below (and before
  // "lux med" further down), since findClinicLogo returns on the first
  // substring match — "Carolina Medical Center (LUX MED)" and "Klinika
  // Urologii Warszawskiego Uniwersytetu Medycznego" would otherwise be
  // mis-matched to the WUM/Luxmed logos instead of their own.
  "klinika urologii warszawskiego uniwersytetu medycznego": "klinika-urologii-wum",
  "klinika neonatologii": "klinika-neonatologii-zwirki",
  "klinika pediatrii": "klinika-pediatrii-wum",
  "carolina medical center": "carolina",
  "warszawskiego uniwersytetu medycznego": "wum-eagle",
  "wum": "wum-eagle",
  "gruźlicy i chorób płuc": "instytut-gruzlicy",
  "gruzlicy i chorob pluc": "instytut-gruzlicy",
  "narodowy instytut onkologii": "narodowy-instytut-onkologii",
  "polskiej fundacji gastroenterologii": "polska-fundacja-gastroenterologii",
  "klinika miracki": "klinika-miracki",
  "klinika dr szczyt": "klinika-dr-szczyt",
  "dr szczyt": "klinika-dr-szczyt",
  "klinika estell": "klinika-estell",
  "febumed": "centrum-dermatologiczne-febumed",
  "instytut kardiologii": "narodowy-instytut-kardiologii",
  "diagnostyka": "diagnostyka",
  "cmp laboratorium": "cmp-laboratorium",
  "medispace": "medispace",
  "psychiatrii i neurologii": "instytut-psychiatrii-i-neurologii",
  "ipin": "instytut-psychiatrii-i-neurologii",
  "medycyny sportowej": "centrum-medycyny-sportowej",
  "fizjologii i patologii słuchu": "instytut-fizjologii-i-patologii-sluchu",
  "fizjologii i patologii sluchu": "instytut-fizjologii-i-patologii-sluchu",
  "ifps": "instytut-fizjologii-i-patologii-sluchu",
  "swisslaser": "swisslaser",
  "swiss laser": "swisslaser",
  "klinika pneumonologii": "klinika-pneumonologii-lodz",
  "szpital okulistyczny retina": "szpital-okulistyczny-retina",
  "mikrochirurgii oka laser": "centrum-mikrochirurgii-oka-laser",
  "centrum zdrowia dziecka": "instytut-pomnik-czd",
  "ipczd": "instytut-pomnik-czd",
  "szpital dla dzieci": "warszawski-szpital-dla-dzieci",
  "bogdanowicza": "szpital-dzieciecy-bogdanowicza",
  "ośrodek psychoterapii i psychiatrii": "warszawski-osrodek-psychoterapii-i-psychiatrii",
  "osrodek psychoterapii i psychiatrii": "warszawski-osrodek-psychoterapii-i-psychiatrii",
  "ośrodek psychiatrii i psychoterapii": "warszawski-osrodek-psychoterapii-i-psychiatrii",
  "osrodek psychiatrii i psychoterapii": "warszawski-osrodek-psychoterapii-i-psychiatrii",
  "wopp": "warszawski-osrodek-psychoterapii-i-psychiatrii",
  "mswia": "pim-mswia",
  "dzieciątka jezus": "dzieciatka-jezus",
  "dzieciatka jezus": "dzieciatka-jezus",
  "szpital wolski": "szpital-wolski",
  "szpitalu wolskim": "szpital-wolski",
  "traumatologii i ortopedii wim": "wim",
  "nowy wzrok": "centrum-okulistyczne-nowy-wzrok",
  "samodzielny publiczny dziecięcy szpital kliniczny": "uck-wum",
  "samodzielny publiczny dzieciecy szpital kliniczny": "uck-wum",
  "centrum rehabilitacji \"pomoc\"": "centrum-rehabilitacji-pomoc",
  "centrum rehabilitacji „pomoc”": "centrum-rehabilitacji-pomoc",
  "europejskie centrum zdrowia": "europejskie-centrum-zdrowia-otwock",
  "instytut geriatrii, reumatologii i rehabilitacji": "nigrr",
  "e-klinika snu": "eklinika-snu",
  "eklinika snu": "eklinika-snu",
  "centrum medyczne alergika": "centrum-medyczne-alergika",
  "szpital uniwersytecki w krakowie": "szpital-uniwersytecki-krakow",
  "alergologii klinicznej i środowiskowej": "med-all-centrum-medyczne",
  "alergologii klinicznej i srodowiskowej": "med-all-centrum-medyczne",
  "krakowski szpital specjalistyczny im. jana pawła ii": "krakowski-szpital-jana-pawla-ii",
  "krakowski szpital specjalistyczny im. jana pawla ii": "krakowski-szpital-jana-pawla-ii",
  "vistula clinic": "vistula-clinic",
  "uniwersytecki szpital dziecięcy w krakowie": "uniwersytecki-szpital-dzieciecy-krakow",
  "uniwersytecki szpital dziecięcy": "uniwersytecki-szpital-dzieciecy-krakow",
  "chorób dzieci": "uniwersytecki-szpital-dzieciecy-krakow",
  "chorob dzieci": "uniwersytecki-szpital-dzieciecy-krakow",
  "med-all": "med-all-centrum-medyczne",
  "medimed": "nzoz-medimed",
  "topolowa medicenter": "topolowa-medicenter",
  "centrum medyczne evita": "centrum-medyczne-evita",
  "centrum medyczne skopia": "centrum-medyczne-skopia",
  "hepatic medical": "hepatic-medical",
  "gastromedica": "gastromedica",
  "józefa dietla": "szpital-jozefa-dietla",
  "jozefa dietla": "szpital-jozefa-dietla",
  "czerniakowski": "szpital-czerniakowski",
  "szpital praski": "szpital-praski",
  "bródnowski": "szpital-brodnowski",
  "brodnowski": "szpital-brodnowski",
  "enel-med": "enelmed",
  "enel med": "enelmed",
  "cmp centrum medyczne": "cmp",
  "centrum medyczne cmp": "cmp",
  "pzu zdrowie": "pzu-zdrowie",
  "life medical": "life-medical",
  swissmed: "swissmed",
  scanmed: "scanmed",
  polmed: "polmed",
  "diagnostyka+": "diagnostyka-plus",
  alab: "alab",
  synevo: "synevo",
  "dom lekarski": "dom-lekarski",
  sanitas: "sanitas",
  "top medical": "top-medical",
  "medical centrum lublin": "medical-centrum-lublin",
  "chodźki": "chodzki",
  chodzki: "chodzki",
  "centrum medyczne unimed": "unimed",
  unicardia: "unicardia-unimedica",
  goya: "goya",
  "omega medical": "omega",
  "medicus clinic": "medicus-clinic",
  medincus: "medincus",
  optegra: "optegra",
  harmonia: "harmonia",
  "centrum terapii dialog": "dialog",
  "centrum cbt": "cbt",
  psychomedic: "psychomedic",
  rehasport: "rehasport",
  ambroziak: "ambroziak",
  dermed: "dermed",
  dentim: "dentim",
  affidea: "affidea",
  voxel: "voxel",
  "mri-lab": "mri-lab",
  "crs clinic": "crs-clinic",
  ckr: "ckr",
  rehmedis: "rehmedis",
  fizjobalance: "fizjobalance",
  nowoclinic: "nowoclinic",
  "warsaw dental center": "warsaw-dental-center",
  "dental fraternity": "dental-fraternity",
  natadent: "natadent",
  elektoralna: "elektoralna",
  wojcik: "wojcik",
  "avenue dental": "avenue-dental",
  optimdent: "optimdent",
  "warsaw dental academy": "warsaw-dental-academy",
  "astra dent": "astra-dent",
  "adm dental": "adm-clinic",
  "weiss klinik": "weiss-klinik",
  "instytut oka": "instytut-oka",
  "american heart": "american-heart",
  persona: "persona",
  neurovitalis: "neurovitalis",
  venomedica: "venomedica",
  helimed: "helimed",
  "garden clinic": "garden-clinic",
  "bałtycka": "baltycka",
  baltycka: "baltycka",
  endocare: "endocare",
  euromedicare: "euromedicare",
  nuvamed: "nuvamed",
  "orto neuro": "orto-neuro",
  "magic smile": "magic-smile",
  dentestetica: "dentestetica",
  carolina: "carolina",
  smartheart: "smartheart",
  tomma: "tomma",
};

function findClinicLogo(name: string): string | null {
  const lower = name.toLowerCase();
  for (const [key, slug] of Object.entries(CLINIC_LOGOS)) {
    if (lower.includes(key)) return slug;
  }
  return null;
}

function ClinicAvatar({ name }: { name: string }) {
  const slug = findClinicLogo(name);
  const [failed, setFailed] = useState(false);

  if (slug && !failed) {
    return (
      <span className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-xl bg-white/95 p-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/images/logos/clinics/${slug}.png`}
          alt={name}
          className="h-full w-full object-contain"
          onError={() => setFailed(true)}
        />
      </span>
    );
  }
  return <span className={clinicIconBadgeClass}>{CLINIC_DEFAULT_ICON}</span>;
}

const SPARKLE_ICON_SM = (
  <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
    />
  </svg>
);

function ClinicCard({ clinic, isExpanded, onExpandedChange }: { clinic: Clinic; isExpanded: boolean; onExpandedChange: (expanded: boolean) => void }) {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const med = t.medicine;
  const mapsUrl = buildGoogleMapsUrl([clinic.address, clinic.district, clinic.city, "Poland"]);
  const chosenCount = formatChosenCount(getChosenCount(clinic.id), lang);
  const cardRef = useRef<HTMLDivElement>(null);
  const [showAiTooltip, setShowAiTooltip] = useState(false);

  function askAi() {
    const question = med.askAiQuestionTemplate.replace("{name}", clinic.name).replace("{city}", clinic.city);
    router.push(`/dashboard/ai?q=${encodeURIComponent(question)}`);
  }

  useEffect(() => {
    if (!isExpanded) return;

    function handleClickOutside(event: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        onExpandedChange(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded, onExpandedChange]);

  return (
    <div
      ref={cardRef}
      className={`group relative flex h-full flex-col rounded-2xl border border-border-subtle bg-surface-1 transition-[transform,box-shadow,background-color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-lg hover:shadow-accent/20 motion-reduce:transition-none ${
        isExpanded ? "p-5 sm:p-6" : "p-4 sm:p-5"
      }`}
    >
      <button
        type="button"
        onClick={() => onExpandedChange(!isExpanded)}
        aria-expanded={isExpanded}
        className="flex w-full flex-col items-start gap-3 text-left"
      >
        <div className="flex w-full items-start justify-between gap-3">
          <ClinicAvatar name={clinic.name} />
          <div className="flex items-center gap-2">
            {clinic.rating != null && <StarRating rating={clinic.rating} />}
            {!isExpanded && (
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    askAi();
                  }}
                  onMouseEnter={() => setShowAiTooltip(true)}
                  onMouseLeave={() => setShowAiTooltip(false)}
                  className="flex-shrink-0 rounded-lg border border-border-subtle bg-surface-hover p-1.5 text-accent-bright transition-colors duration-150 hover:border-accent/40 hover:bg-accent/10"
                >
                  {SPARKLE_ICON_SM}
                </button>
                {showAiTooltip && (
                  <div className="absolute -left-2 top-full z-10 mt-2 whitespace-nowrap rounded-lg border border-border-subtle bg-panel px-3 py-2 text-xs font-medium text-text-primary shadow-lg transition-opacity duration-150">
                    {t.education.askAiBtn}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="w-full min-w-0">
          <h3 className="line-clamp-2 min-h-12 text-sm font-bold text-text-primary">{clinic.name}</h3>

          {clinic.address && (
            <p className="mt-2 flex min-h-[1.5rem] items-center gap-2 text-xs text-text-muted">
              <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="line-clamp-1">{[clinic.address, clinic.district].filter(Boolean).join(", ")}</span>
            </p>
          )}

          <p className="mt-1.5 flex min-h-[1.5rem] items-center gap-2 text-xs text-text-muted">
            <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 12H9m6 0a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
            <span>{t.common.chosenByCountTemplate.replace("{n}", chosenCount)}</span>
          </p>
        </div>

        {clinic.specializations && clinic.specializations.length > 0 && (
          <div className="min-h-6 w-full overflow-hidden">
            <div className="flex w-full flex-wrap gap-1.5">
              {clinic.specializations.slice(0, 2).map((s) => (
                <span key={s} className="rounded-full border border-border-subtle bg-white/[0.05] px-2 py-0.5 text-[11px] text-text-secondary">
                  {s}
                </span>
              ))}
              {clinic.specializations.length > 2 && (
                <span className="rounded-full border border-border-subtle bg-white/[0.05] px-2 py-0.5 text-[11px] text-text-secondary">
                  +{clinic.specializations.length - 2}
                </span>
              )}
            </div>
          </div>
        )}
      </button>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => onExpandedChange(!isExpanded)}
          className={`flex-1 rounded-xl px-3 py-2.5 text-xs font-semibold text-white transition-colors duration-150 ${
            isExpanded
              ? "bg-[#7d4a42] hover:bg-[#8b5549]"
              : "bg-slate-700 hover:bg-slate-600"
          }`}
        >
          {isExpanded ? t.dashboard.collapseBtn : med.learnMoreBtn} {isExpanded ? "^" : "→"}
        </button>
        <button
          type="button"
          onClick={askAi}
          aria-label={t.education.askAiAriaTemplate.replace("{name}", clinic.name)}
          className="flex-1 rounded-xl border border-border-subtle bg-surface-hover px-3 py-2.5 text-xs font-semibold text-accent-bright transition-colors duration-150 hover:border-accent/40 hover:bg-accent/10"
        >
          ✦ {t.education.askAiBtn}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 flex flex-col border-t border-border-subtle pt-4">
          {clinic.required_docs && clinic.required_docs.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-semibold text-text-primary">{t.education.documentsLabel}</p>
              <p className="mt-2 text-xs text-text-muted leading-relaxed">{clinic.required_docs.join(", ")}</p>
            </div>
          )}

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-700 px-3 py-2.5 text-xs font-semibold text-white transition-colors duration-150 hover:bg-slate-600"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {t.education.showOnMapBtn}
          </a>

          <button
            type="button"
            onClick={() => onExpandedChange(false)}
            className="flex w-full items-center justify-center gap-1.5 border-t border-border-subtle pt-3 mt-3 text-xs font-semibold text-text-muted transition-colors duration-150 hover:text-text-primary"
          >
            {t.dashboard.collapseBtn} ^
          </button>
        </div>
      )}
    </div>
  );
}

export default function MedicinePage() {
  const { t, lang } = useLanguage();
  const { profile } = useAuth();
  const [city, setCity] = useSelectedCity(profile?.city);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>("all");
  const [district, setDistrict] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [aiQuery, setAiQuery] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<MedicineSearchResult | null>(null);
  const [expandedClinicId, setExpandedClinicId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    // Start of a data-fetching effect (flip to loading, fetch, then resolve);
    // this is the standard fetch-on-change pattern, not a synchronization bug.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    supabase
      .from("clinics")
      .select("*")
      .eq("city", city)
      .order("category")
      .order("rating", { ascending: false, nullsFirst: false })
      .then(({ data }) => {
        if (!active) return;
        setClinics(localizeClinics((data as Clinic[]) ?? [], lang));
        setCategory("all");
        setDistrict("all");
        setAiQuery("");
        setAiResult(null);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [city, lang]);

  const categories = useMemo(() => {
    const seen = new Set<string>();
    const list: string[] = [];
    for (const c of clinics) {
      if (!seen.has(c.category)) {
        seen.add(c.category);
        list.push(c.category);
      }
    }
    return list;
  }, [clinics]);

  const districts = useMemo(() => {
    const seen = new Set<string>();
    const list: string[] = [];
    for (const c of clinics) {
      const d = c.district?.trim();
      // Some rows have junk in the district column (e.g. "несколько филиалов
      // в Кракове", "разные районы города") instead of an actual district
      // name -- skip anything that isn't a plain place name. Real Polish
      // district names are always Latin script, so any Cyrillic in the
      // value is a reliable sign it's junk, not a place.
      if (!d || /\d/.test(d) || /[а-яёіїєґ]/i.test(d) || seen.has(d)) continue;
      seen.add(d);
      list.push(d);
    }
    return list.sort((a, b) => a.localeCompare(b, "ru"));
  }, [clinics]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    const aiKeywords = (aiResult?.keywords ?? []).map((k) => k.toLowerCase()).filter(Boolean);

    return clinics.filter((c) => {
      if (category !== "all" && c.category !== category) return false;
      if (district !== "all" && c.district !== district) return false;

      if (term) {
        const matchesTerm =
          c.name.toLowerCase().includes(term) ||
          (c.district ?? "").toLowerCase().includes(term) ||
          (c.address ?? "").toLowerCase().includes(term);
        if (!matchesTerm) return false;
      }

      if (aiKeywords.length > 0) {
        const haystack = [c.name, c.description ?? "", ...(c.specializations ?? [])].join(" ").toLowerCase();
        const matchesAi = aiKeywords.some((k) => haystack.includes(k));
        if (!matchesAi) return false;
      }

      return true;
    });
  }, [clinics, category, district, search, aiResult]);

  async function handleAiSearch() {
    const query = aiQuery.trim();
    if (!query || aiLoading) return;
    setAiLoading(true);
    try {
      const response = await fetch("/api/medicine-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, categories, language: lang }),
      });
      const result = (await response.json()) as MedicineSearchResult;
      setAiResult(result);
      setCategory(result.category ?? "all");
      setDistrict("all");
    } catch (err) {
      console.error("AI clinic search failed:", err);
    } finally {
      setAiLoading(false);
    }
  }

  function resetAiSearch() {
    setAiQuery("");
    setAiResult(null);
    setCategory("all");
  }

  const grouped = useMemo(() => {
    const map = new Map<string, Clinic[]>();
    for (const c of filtered) {
      if (!map.has(c.category)) map.set(c.category, []);
      map.get(c.category)!.push(c);
    }
    return Array.from(map.entries());
  }, [filtered]);

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
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-text-primary">{t.medicine.clinicsTitle}</h2>
            <p className="mt-1 text-sm text-text-muted">{t.medicine.clinicsSub}</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-accent/30 bg-accent/[0.05] p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-accent/20 text-lg text-accent-bright">
              {SPARKLE_ICON}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-base font-bold text-text-primary">{t.medicine.aiPickHeading}</p>
              <p className="mt-1 text-sm text-text-muted">{t.medicine.aiPickSubtitle}</p>
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-border-strong bg-surface-1 pl-3">
                <svg className="h-4 w-4 flex-shrink-0 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAiSearch();
                  }}
                  placeholder={t.medicine.aiPickPlaceholder}
                  className="flex-1 border-0 bg-transparent py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAiSearch}
                  disabled={aiLoading || !aiQuery.trim()}
                  className="flex-shrink-0 rounded-r-xl bg-accent px-4 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-50"
                >
                  →
                </button>
              </div>
              {aiResult && (
                <div className="mt-3 flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-3 py-2">
                  <span className="text-xs text-text-primary">{aiResult.reply}</span>
                  <button
                    type="button"
                    onClick={resetAiSearch}
                    className="ml-auto flex-shrink-0 text-xs font-semibold text-accent-bright transition-colors duration-150 hover:text-text-primary"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-border-subtle pt-3 sm:pt-4">
          <div className="flex flex-wrap items-end gap-3 sm:gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-text-muted">{t.common.cityLabel}</span>
              <CitySelect value={city} onChange={setCity} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-text-muted">{"Категория"}</span>
              <Dropdown
                value={category}
                onChange={setCategory}
                options={[{ value: "all", label: t.medicine.allCategoriesLabel }, ...categories.map((c) => ({ value: c, label: c }))]}
              />
            </div>
            {districts.length > 0 && (
              <div className="flex flex-col gap-1">
                <span className="text-xs text-text-muted">{"Район"}</span>
                <Dropdown
                  value={district}
                  onChange={setDistrict}
                  options={[{ value: "all", label: t.medicine.allDistrictsLabel }, ...districts.map((d) => ({ value: d, label: d }))]}
                />
              </div>
            )}
            <div className="flex flex-col gap-1 max-w-xs">
              <label className="text-xs text-text-muted">{t.medicine.searchPlaceholder}</label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">
                  {SEARCH_ICON}
                </span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t.medicine.searchPlaceholder}
                  className="w-full rounded-xl border border-border-strong bg-white/[0.1] py-2 pl-9 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
                />
              </div>
            </div>
            <span className="ml-auto text-xs text-text-muted">{t.medicine.clinicsCountTemplate.replace("{count}", String(filtered.length))}</span>
          </div>
        </div>

        {loading ? (
          <p className="mt-8 text-sm text-text-muted">{t.guideCard.loading}</p>
        ) : grouped.length === 0 ? (
          <p className="mt-8 text-sm text-text-muted">{t.medicine.notFoundText.replace("{city}", getCityName(city, lang))}</p>
        ) : (
          <div className="mt-8 space-y-10">
            {grouped.map(([cat, items], index) => (
              <div key={cat} className={index > 0 ? "border-t border-border-subtle pt-10" : ""}>
                <h3 className="text-base font-bold uppercase tracking-wider text-text-primary">{cat}</h3>
                <div className="mt-4 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((clinic, clinicIndex) => {
                    const isLastCard = clinicIndex === items.length - 1;
                    const isLastCardAlone = isLastCard && items.length % 3 === 1;
                    return (
                      <div key={clinic.id} className={isLastCardAlone ? "lg:col-start-2" : ""}>
                        <Reveal delay={clinicIndex * 30}>
                          <ClinicCard
                            clinic={clinic}
                            isExpanded={expandedClinicId === clinic.id}
                            onExpandedChange={(isExpanded) => setExpandedClinicId(isExpanded ? clinic.id : null)}
                          />
                        </Reveal>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
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
        <div className="mt-4 rounded-2xl border border-border-subtle bg-surface-1 p-5 sm:p-6">
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
        <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-5 sm:p-6">
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
              className="group flex items-start justify-between gap-3 rounded-2xl border border-border-subtle bg-surface-1 p-5 transition-colors duration-150 hover:border-accent/40 hover:bg-white/[0.05]"
            >
              <div>
                <p className="text-sm font-semibold text-accent-bright">{site.url}</p>
                <p className="mt-1 text-sm text-text-muted">{site.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </Reveal>

      <Reveal delay={190} className="mt-12">
        <h2 className="text-xl font-bold tracking-tight text-text-primary">{t.medicine.dentalTitle}</h2>
        <div className="mt-4 rounded-2xl border border-border-subtle bg-surface-1 p-5 sm:p-6">
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
