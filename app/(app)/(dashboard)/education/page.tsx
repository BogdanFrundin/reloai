"use client";

import { useState } from "react";
import PageHeader from "../../../_components/PageHeader";
import Reveal from "../../../_components/Reveal";
import { useAuth } from "../../../_components/AuthProvider";
import { useLanguage } from "../../../_components/LanguageProvider";
import type { Dictionary, Lang } from "../../../_lib/i18n";
import { trField, trPlace } from "./translations";

type ItemType = "public" | "private";
type TabId = "courses" | "schools" | "kindergartens" | "universities";
type FilterId = "all" | "public" | "private";
type CountryKey = "Poland" | "Germany" | "Spain";

interface Course {
  type: ItemType;
  name: string;
  language: string;
  format: string;
  price: string;
  level: string;
  note?: string;
}

interface School {
  type: ItemType;
  name: string;
  area: string;
  instruction: string;
  price: string;
  ages: string;
  note?: string;
}

interface Kindergarten {
  type: ItemType;
  name: string;
  area: string;
  price: string;
  ages: string;
  waitingList?: string;
  note?: string;
}

interface University {
  type: ItemType;
  name: string;
  location: string;
  programs: string[];
  tuition: string;
  instruction: string;
  deadline?: string;
  note?: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const COURSES: Record<CountryKey, Course[]> = {
  Poland: [
    { type: "public", name: "Miejskie Kursy Językowe", language: "Polish", format: "In-person, group", price: "Free for refugees / TPH", level: "A1–B1", note: "Offered by Warsaw city for temporary protection holders (ochrona czasowa)" },
    { type: "public", name: "PUP Language Support", language: "Polish", format: "In-person", price: "Free (registered unemployed)", level: "A1–A2", note: "Register at your local Powiatowy Urząd Pracy" },
    { type: "private", name: "Glossa Language School", language: "Polish for foreigners", format: "In-person & online", price: "PLN 180–280 / month", level: "A1–C1" },
    { type: "private", name: "Symbioza School of Languages", language: "Polish & Russian", format: "In-person, small groups", price: "PLN 150–230 / month", level: "A1–B2" },
    { type: "private", name: "British Council Warsaw", language: "English", format: "In-person & online", price: "PLN 280–420 / month", level: "All levels" },
    { type: "private", name: "EF Education First", language: "English", format: "Online & in-person", price: "PLN 300–500 / month", level: "All levels" },
  ],
  Germany: [
    { type: "public", name: "Integrationskurs (BAMF)", language: "German", format: "In-person, 700 hrs", price: "Free or €1.95 / hr", level: "A1–B1", note: "Mandatory for some visa types, available to others on request" },
    { type: "public", name: "Volkshochschule (VHS)", language: "German & English", format: "In-person", price: "€3–6 / lesson", level: "All levels", note: "Available across all major German cities, highly subsidized" },
    { type: "private", name: "Goethe-Institut", language: "German", format: "In-person & online", price: "€800–1,400 / course", level: "A1–C2" },
    { type: "private", name: "DID Deutsch-Institut", language: "German", format: "In-person, intensive", price: "€600–950 / course", level: "A1–B2" },
    { type: "private", name: "Berlitz Germany", language: "English & German", format: "In-person & online", price: "€1,000–2,500 / course", level: "All levels" },
    { type: "private", name: "Inlingua Berlin", language: "German & English", format: "In-person", price: "€800–1,500 / course", level: "All levels" },
  ],
  Spain: [
    { type: "public", name: "EOI (Escuela Oficial de Idiomas)", language: "Spanish, English, French", format: "In-person", price: "€70–90 / year", level: "A1–C2", note: "State language schools — enrol each September" },
    { type: "public", name: "Centro Cívico Language Classes", language: "Spanish", format: "In-person, community", price: "€0–30 / month", level: "A1–B1", note: "Offered by Barcelona city districts for newcomers" },
    { type: "private", name: "Instituto Cervantes Barcelona", language: "Spanish", format: "In-person & online", price: "€450–750 / course", level: "A1–C2" },
    { type: "private", name: "British Council Barcelona", language: "English", format: "In-person & online", price: "€550–900 / quarter", level: "All levels" },
    { type: "private", name: "Linguaschools Barcelona", language: "Spanish", format: "In-person, intensive", price: "€300–600 / course", level: "All levels" },
    { type: "private", name: "Babel Idiomes", language: "Catalan, Spanish, English", format: "In-person", price: "€200–450 / course", level: "A1–C1" },
  ],
};

const SCHOOLS: Record<CountryKey, School[]> = {
  Poland: [
    { type: "public", name: "SP nr 4 im. Gustawa Morcinka", area: "Śródmieście, Warsaw", instruction: "Polish (preparatory class)", price: "Free", ages: "7–15", note: "Has Oddział Przygotowawczy for non-Polish speakers" },
    { type: "public", name: "SP nr 141", area: "Praga-Południe, Warsaw", instruction: "Polish", price: "Free", ages: "7–15" },
    { type: "public", name: "LO nr 14 im. Stanisława Staszica", area: "Śródmieście, Warsaw", instruction: "Polish", price: "Free", ages: "15–19", note: "Top-ranked secondary school in Warsaw" },
    { type: "public", name: "SP nr 54", area: "Wola, Warsaw", instruction: "Polish", price: "Free", ages: "7–15" },
    { type: "private", name: "American School of Warsaw (ASW)", area: "Wilanów, Warsaw", instruction: "English (IB curriculum)", price: "€19,000–25,000 / year", ages: "3–18" },
    { type: "private", name: "British School of Warsaw", area: "Wilanów, Warsaw", instruction: "English (British curriculum)", price: "€14,000–21,000 / year", ages: "3–18" },
    { type: "private", name: "Montessori International School", area: "Mokotów, Warsaw", instruction: "English / Polish", price: "PLN 2,500–4,500 / month", ages: "6–14" },
    { type: "private", name: "Lycée français de Varsovie", area: "Śródmieście, Warsaw", instruction: "French / Polish", price: "PLN 1,800–3,200 / month", ages: "3–18" },
  ],
  Germany: [
    { type: "public", name: "Grundschule am Barbarossaplatz", area: "Schöneberg, Berlin", instruction: "German (Willkommensklasse)", price: "Free", ages: "6–12", note: "Welcome classes with intensive German support for newly arrived children" },
    { type: "public", name: "Ernst-Schering-Schule (ISS)", area: "Mitte, Berlin", instruction: "German", price: "Free", ages: "6–18" },
    { type: "public", name: "Evangelische Schule Berlin Zentrum", area: "Mitte, Berlin", instruction: "German", price: "Free + small contribution", ages: "6–16" },
    { type: "public", name: "Theodor-Heuss-Gemeinschaftsschule", area: "Tempelhof, Berlin", instruction: "German", price: "Free", ages: "6–16" },
    { type: "private", name: "Berlin International School", area: "Dahlem, Berlin", instruction: "English (IB curriculum)", price: "€10,500–17,500 / year", ages: "3–19" },
    { type: "private", name: "French-German School (Voltaire)", area: "Charlottenburg, Berlin", instruction: "French / German", price: "€200–400 / month", ages: "6–19" },
    { type: "private", name: "Berlin Cosmopolitan School", area: "Mitte, Berlin", instruction: "English / German (IB)", price: "€9,800–13,200 / year", ages: "6–16" },
    { type: "private", name: "Phorms Campus Berlin", area: "Mitte, Berlin", instruction: "German / English bilingual", price: "€700–1,200 / month", ages: "3–18" },
  ],
  Spain: [
    { type: "public", name: "CEIP La Farigola del Clot", area: "Sant Martí, Barcelona", instruction: "Catalan / Spanish", price: "Free", ages: "6–12", note: "Language reception class for newly arrived students" },
    { type: "public", name: "Institut Quatre Cantons", area: "Poblenou, Barcelona", instruction: "Catalan / Spanish / English", price: "Free", ages: "12–18" },
    { type: "public", name: "CEIP Ramón y Cajal", area: "Eixample, Barcelona", instruction: "Catalan / Spanish", price: "Free", ages: "6–12" },
    { type: "public", name: "IES Jaume Balmes", area: "Eixample, Barcelona", instruction: "Catalan / Spanish", price: "Free", ages: "12–18" },
    { type: "private", name: "British School of Barcelona", area: "Sant Just Desvern", instruction: "English (British curriculum)", price: "€9,500–16,000 / year", ages: "3–18" },
    { type: "private", name: "Oak House School", area: "Sant Cugat del Vallès", instruction: "English / Spanish (IB)", price: "€8,000–15,500 / year", ages: "3–18" },
    { type: "private", name: "Agora Sant Cugat International School", area: "Sant Cugat", instruction: "English / Spanish / Catalan", price: "€7,500–14,000 / year", ages: "3–18" },
    { type: "private", name: "Col·legi Sagrat Cor Diputació", area: "Eixample, Barcelona", instruction: "Catalan / Spanish", price: "€4,000–7,000 / year", ages: "3–18" },
  ],
};

const KINDERGARTENS: Record<CountryKey, Kindergarten[]> = {
  Poland: [
    { type: "public", name: "Przedszkole Miejskie nr 31", area: "Mokotów, Warsaw", price: "PLN 0–240 / month", ages: "3–6", waitingList: "Register in February for September" },
    { type: "public", name: "Żłobek Miejski nr 5", area: "Wola, Warsaw", price: "PLN 400–600 / month", ages: "0–3", waitingList: "Usually 6–12 month wait", note: "Municipal nursery (żłobek), state subsidized" },
    { type: "public", name: "Przedszkole nr 109", area: "Śródmieście, Warsaw", price: "PLN 0–240 / month", ages: "3–6", waitingList: "Register by March each year", note: "Has Ukrainian-speaking assistants" },
    { type: "public", name: "Żłobek Miejski nr 9", area: "Praga-Południe, Warsaw", price: "PLN 350–550 / month", ages: "0–3", waitingList: "3–6 month wait" },
    { type: "private", name: "Montessori House Warsaw", area: "Żoliborz, Warsaw", price: "PLN 2,200–3,500 / month", ages: "1–6", note: "Bilingual Polish-English environment" },
    { type: "private", name: "English Tiny Tots", area: "Ursynów, Warsaw", price: "PLN 2,500–3,800 / month", ages: "1–6", note: "Full English immersion, no waiting list" },
    { type: "private", name: "Leśna Akademia", area: "Wilanów, Warsaw", price: "PLN 1,800–2,800 / month", ages: "2–6" },
    { type: "private", name: "Kubuś Przedszkole", area: "Bemowo, Warsaw", price: "PLN 1,400–2,200 / month", ages: "2–6" },
  ],
  Germany: [
    { type: "public", name: "Kita Regenbogen", area: "Kreuzberg, Berlin", price: "€0–300 / month (income-based)", ages: "1–6", waitingList: "6–12 month wait — apply early", note: "Often free for low incomes via Kita-Gutschein" },
    { type: "public", name: "Kita Bärenstark", area: "Mitte, Berlin", price: "€0–300 / month (income-based)", ages: "1–6", waitingList: "6–18 month wait typical" },
    { type: "public", name: "Krippe Sonnenschein", area: "Neukölln, Berlin", price: "€0–300 / month", ages: "0–3", waitingList: "3–9 month wait" },
    { type: "public", name: "Kita Reggio-Haus", area: "Prenzlauer Berg, Berlin", price: "€0–300 / month", ages: "1–6", waitingList: "Up to 18 months in this popular area" },
    { type: "private", name: "Kid's Kingdom International", area: "Wilmersdorf, Berlin", price: "€1,200–1,800 / month", ages: "0–6", note: "Full English immersion, no waiting list" },
    { type: "private", name: "Little Stars Bilingual Kita", area: "Charlottenburg, Berlin", price: "€1,000–1,500 / month", ages: "1–6", note: "German-English bilingual" },
    { type: "private", name: "Phorms Kindergarten", area: "Mitte, Berlin", price: "€900–1,400 / month", ages: "1–6" },
    { type: "private", name: "Bambini International", area: "Pankow, Berlin", price: "€800–1,200 / month", ages: "2–6" },
  ],
  Spain: [
    { type: "public", name: "Escola Bressol Municipal El Cotxet", area: "Gràcia, Barcelona", price: "€120–350 / month (income-based)", ages: "0–3", waitingList: "Apply March–April for September", note: "City-run nursery, heavily subsidized" },
    { type: "public", name: "Escola Bressol Trafalgar", area: "Eixample, Barcelona", price: "€120–350 / month", ages: "0–3", waitingList: "Apply each spring" },
    { type: "public", name: "Llar d'Infants Els Petits", area: "Sarrià-Sant Gervasi", price: "€100–300 / month", ages: "0–3", waitingList: "2–6 month wait" },
    { type: "public", name: "P3–P5 at Public Schools", area: "All districts", price: "Free", ages: "3–6", note: "Ages 3–6 are part of free compulsory schooling in Spain" },
    { type: "private", name: "Little English School Barcelona", area: "Sarrià, Barcelona", price: "€700–1,200 / month", ages: "0–6", note: "Full English immersion" },
    { type: "private", name: "Kidsco International Nursery", area: "Eixample, Barcelona", price: "€800–1,300 / month", ages: "0–3" },
    { type: "private", name: "Montessori School Barcelona", area: "Gràcia, Barcelona", price: "€500–900 / month", ages: "2–6", note: "Trilingual Catalan-Spanish-English" },
    { type: "private", name: "International House Kids", area: "Various districts", price: "€400–700 / month", ages: "3–6" },
  ],
};

const UNIVERSITIES: Record<CountryKey, University[]> = {
  Poland: [
    { type: "public", name: "Uniwersytet Warszawski (UW)", location: "Warsaw", programs: ["Law", "Economics", "Humanities", "Medicine"], tuition: "Free (EU) / PLN 3,000–8,000 / year", instruction: "Polish & English (select programs)", deadline: "Apply: May–July", note: "Ukrainian citizens with ochrona czasowa may study free under the same conditions as Polish citizens" },
    { type: "public", name: "Politechnika Warszawska (PW)", location: "Warsaw", programs: ["Engineering", "Computer Science", "Architecture"], tuition: "Free (EU) / PLN 5,000–12,000 / year", instruction: "Polish & English", deadline: "Apply: June–July" },
    { type: "public", name: "Szkoła Główna Handlowa (SGH)", location: "Warsaw", programs: ["Business", "Finance", "Economics", "Management"], tuition: "Free (EU) / PLN 6,000–10,000 / year", instruction: "Polish & English", deadline: "Apply: May–June" },
    { type: "public", name: "Uniwersytet Jagielloński", location: "Krakow", programs: ["Medicine", "Law", "Humanities", "Sciences"], tuition: "Free (EU) / PLN 3,000–10,000 / year", instruction: "Polish (some English programs)", deadline: "Apply: May–July" },
    { type: "private", name: "Akademia Leona Koźmińskiego", location: "Warsaw", programs: ["MBA", "Business", "Law", "Management"], tuition: "PLN 15,000–32,000 / year", instruction: "Polish & English", deadline: "Rolling admissions" },
    { type: "private", name: "Uczelnia SWPS", location: "Warsaw / Wrocław / Poznań", programs: ["Psychology", "Design", "Law", "Communication"], tuition: "PLN 10,000–22,000 / year", instruction: "Polish (some English)", deadline: "Rolling admissions" },
    { type: "private", name: "Vistula University", location: "Warsaw", programs: ["International Business", "Tourism", "Security Studies"], tuition: "PLN 10,000–18,000 / year", instruction: "English & Polish", deadline: "Rolling admissions" },
    { type: "private", name: "Collegium Civitas", location: "Warsaw", programs: ["International Relations", "Sociology", "Journalism"], tuition: "PLN 8,000–15,000 / year", instruction: "Polish & English", deadline: "Rolling admissions" },
  ],
  Germany: [
    { type: "public", name: "Freie Universität Berlin", location: "Berlin", programs: ["Humanities", "Social Sciences", "Law", "Natural Sciences"], tuition: "~€350 / semester (semester fee)", instruction: "German (English Master's available)", deadline: "Apply by July 15 / Jan 15", note: "Semester fee includes a BVG public transport pass across Berlin" },
    { type: "public", name: "Technische Universität Berlin (TU)", location: "Berlin", programs: ["Engineering", "Computer Science", "Mathematics", "Architecture"], tuition: "~€350 / semester", instruction: "German & English", deadline: "Apply by July 15 / Jan 15" },
    { type: "public", name: "Humboldt-Universität zu Berlin", location: "Berlin", programs: ["Law", "Medicine", "Economics", "Humanities"], tuition: "~€350 / semester", instruction: "German (English Master's available)", deadline: "Apply by May 31 / Nov 30" },
    { type: "public", name: "Ludwig-Maximilians-Universität München", location: "Munich", programs: ["Medicine", "Law", "Economics", "Sciences"], tuition: "~€150 / semester", instruction: "German (some English programs)", deadline: "Apply by May 31 / Nov 30" },
    { type: "private", name: "ESCP Business School Berlin", location: "Berlin", programs: ["MBA", "International Business", "Finance"], tuition: "€12,000–20,000 / year", instruction: "English & German", deadline: "Rolling (multiple intakes)" },
    { type: "private", name: "Bard College Berlin", location: "Berlin", programs: ["Liberal Arts", "Humanities", "Social Sciences"], tuition: "€16,000–20,000 / year", instruction: "English", deadline: "Apply by January 15" },
    { type: "private", name: "SRH Berlin University of Applied Sciences", location: "Berlin", programs: ["Business", "Media", "Engineering", "Health Sciences"], tuition: "€6,000–12,000 / year", instruction: "English & German", deadline: "Rolling admissions" },
    { type: "private", name: "Hertie School", location: "Berlin", programs: ["Public Policy", "Governance", "International Affairs"], tuition: "€15,000–22,000 / year", instruction: "English", deadline: "Apply by January / March" },
  ],
  Spain: [
    { type: "public", name: "Universitat de Barcelona (UB)", location: "Barcelona", programs: ["Medicine", "Law", "Economics", "Sciences", "Humanities"], tuition: "€1,000–2,000 / year (EU) · €3,000–6,000 (non-EU)", instruction: "Catalan / Spanish (some English)", deadline: "Apply: May–June (PAU)", note: "EU citizens and Spanish residents pay heavily subsidized rates" },
    { type: "public", name: "Universitat Autònoma de Barcelona (UAB)", location: "Bellaterra", programs: ["Sciences", "Engineering", "Business", "Communication"], tuition: "€1,000–2,500 / year (EU) · €3,000–6,500 (non-EU)", instruction: "Catalan / Spanish / English", deadline: "Apply: May–June" },
    { type: "public", name: "Universitat Politècnica de Catalunya (UPC)", location: "Barcelona", programs: ["Engineering", "Architecture", "Mathematics", "Technology"], tuition: "€1,200–2,500 / year (EU) · €4,000–7,000 (non-EU)", instruction: "Catalan / Spanish / English", deadline: "Apply: May–June" },
    { type: "public", name: "Universidad Complutense de Madrid", location: "Madrid", programs: ["Medicine", "Law", "Pharmacy", "Humanities"], tuition: "€800–1,800 / year (EU) · €4,000–8,000 (non-EU)", instruction: "Spanish", deadline: "Apply: May–June" },
    { type: "private", name: "ESADE Business School", location: "Barcelona", programs: ["MBA", "Law", "Business Administration"], tuition: "€20,000–40,000 / year", instruction: "English & Spanish", deadline: "Rolling (3 intakes)" },
    { type: "private", name: "IESE Business School", location: "Barcelona", programs: ["MBA", "Executive Programs"], tuition: "€30,000–70,000 / year (MBA)", instruction: "English & Spanish", deadline: "Rolling admissions" },
    { type: "private", name: "Universidad Internacional de Catalunya", location: "Barcelona", programs: ["Medicine", "Dentistry", "Architecture", "Business"], tuition: "€8,000–18,000 / year", instruction: "Spanish / Catalan", deadline: "Apply: March–June" },
    { type: "private", name: "La Salle – Universitat Ramon Llull", location: "Barcelona", programs: ["Engineering", "Architecture", "Business", "Digital Arts"], tuition: "€9,000–15,000 / year", instruction: "Spanish / Catalan / English", deadline: "Rolling admissions" },
  ],
};

const BANNER_COUNTRY_KEY: Record<CountryKey, keyof Dictionary["education"]["banners"]> = {
  Poland: "poland",
  Germany: "germany",
  Spain: "spain",
};

// ── UI helpers ────────────────────────────────────────────────────────────────

type EduDict = Dictionary["education"];

const cardHoverClass =
  "group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-[transform,box-shadow,border-color,background-color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:border-accent/50 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/[0.06] [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_12px_32px_-12px_rgba(33,85,212,0.45)] motion-reduce:transition-none";

const iconBadgeClass =
  "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-bright transition-transform duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105 motion-reduce:transition-none";

const learnMoreBtnClass =
  "inline-flex w-fit items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 opacity-80 transition-[background-color,border-color,color,opacity] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:border-accent [@media(hover:hover)_and_(pointer:fine)]:group-hover:bg-accent [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-white [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100 motion-reduce:transition-none";

function TypeBadge({ type, t }: { type: ItemType; t: EduDict }) {
  return type === "public" ? (
    <span className="inline-flex flex-shrink-0 items-center rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold text-accent-bright transition-[box-shadow,background-color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:bg-accent/20 [@media(hover:hover)_and_(pointer:fine)]:group-hover:shadow-[0_0_12px_-2px_var(--accent)] motion-reduce:transition-none">
      {t.publicBadge}
    </span>
  ) : (
    <span className="inline-flex flex-shrink-0 items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-400 transition-[box-shadow,background-color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:bg-amber-500/20 [@media(hover:hover)_and_(pointer:fine)]:group-hover:shadow-[0_0_12px_-2px_rgba(245,158,11,0.6)] motion-reduce:transition-none">
      {t.privateBadge}
    </span>
  );
}

function InfoBanner({ text }: { text: string }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-accent/25 bg-accent/[0.07] p-4 text-sm leading-relaxed text-slate-300">
      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-bright" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {text}
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3 text-xs">
      <span className="text-slate-500">{label}</span>
      <span className={`text-right ${highlight ? "font-semibold text-white" : "text-slate-300"}`}>{value}</span>
    </div>
  );
}

// ── Card components ───────────────────────────────────────────────────────────

function CourseCard({ course, t, lang }: { course: Course; t: EduDict; lang: Lang }) {
  return (
    <div className={cardHoverClass}>
      <span className={iconBadgeClass}>
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M12 3c2.5 2.7 4 6 4 9s-1.5 6.3-4 9c-2.5-2.7-4-6-4-9s1.5-6.3 4-9z" />
        </svg>
      </span>
      <div className="mt-3 flex items-start justify-between gap-2">
        <p className="text-sm font-semibold leading-snug text-white">{course.name}</p>
        <TypeBadge type={course.type} t={t} />
      </div>
      <p className="mt-1.5 text-xs font-medium text-accent-bright">{trField(course.language, lang)}</p>
      <div className="mt-4 space-y-2 border-t border-white/5 pt-3">
        <Row label={t.rowFormat} value={trField(course.format, lang)} />
        <Row label={t.rowLevel} value={trField(course.level, lang)} />
        <Row label={t.rowPrice} value={trField(course.price, lang)} highlight />
      </div>
      {course.note && (
        <p className="mt-3 rounded-xl bg-white/[0.03] px-3 py-2 text-[11px] leading-relaxed text-slate-500">
          {trField(course.note, lang)}
        </p>
      )}
      <div className="mt-auto pt-4">
        <button type="button" className={learnMoreBtnClass}>
          {t.learnMore}
        </button>
      </div>
    </div>
  );
}

function SchoolCard({ school, t, lang }: { school: School; t: EduDict; lang: Lang }) {
  return (
    <div className={cardHoverClass}>
      <span className={iconBadgeClass}>
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <rect x="4" y="3" width="16" height="18" rx="1" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 21v-4a1 1 0 011-1h4a1 1 0 011 1v4M8 7h1m-1 4h1m6-4h1m-1 4h1" />
        </svg>
      </span>
      <div className="mt-3 flex items-start justify-between gap-2">
        <p className="text-sm font-semibold leading-snug text-white">{school.name}</p>
        <TypeBadge type={school.type} t={t} />
      </div>
      <p className="mt-1 text-xs text-slate-500">{trPlace(school.area, lang)}</p>
      <div className="mt-4 space-y-2 border-t border-white/5 pt-3">
        <Row label={t.rowInstruction} value={trField(school.instruction, lang)} />
        <Row label={t.rowAges} value={school.ages} />
        <Row label={t.rowPrice} value={trField(school.price, lang)} highlight />
      </div>
      {school.note && (
        <p className="mt-3 rounded-xl bg-white/[0.03] px-3 py-2 text-[11px] leading-relaxed text-slate-500">
          {trField(school.note, lang)}
        </p>
      )}
      <div className="mt-auto pt-4">
        <button type="button" className={learnMoreBtnClass}>
          {t.learnMore}
        </button>
      </div>
    </div>
  );
}

function KindergartenCard({ k, t, lang }: { k: Kindergarten; t: EduDict; lang: Lang }) {
  return (
    <div className={cardHoverClass}>
      <span className={iconBadgeClass}>
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.5s-7.5-4.6-9.5-9.1C1.2 8.1 3 5 6.2 5c1.9 0 3.3 1 4.3 2.4C11.5 6 12.9 5 14.8 5 18 5 19.8 8.1 18.5 11.4 16.5 15.9 12 20.5 12 20.5z" />
        </svg>
      </span>
      <div className="mt-3 flex items-start justify-between gap-2">
        <p className="text-sm font-semibold leading-snug text-white">{k.name}</p>
        <TypeBadge type={k.type} t={t} />
      </div>
      <p className="mt-1 text-xs text-slate-500">{trPlace(k.area, lang)}</p>
      <div className="mt-4 space-y-2 border-t border-white/5 pt-3">
        <Row label={t.rowAges} value={k.ages} />
        <Row label={t.rowPrice} value={trField(k.price, lang)} highlight />
        {k.waitingList && <Row label={t.rowWaiting} value={trField(k.waitingList, lang)} />}
      </div>
      {k.note && (
        <p className="mt-3 rounded-xl bg-white/[0.03] px-3 py-2 text-[11px] leading-relaxed text-slate-500">
          {trField(k.note, lang)}
        </p>
      )}
      <div className="mt-auto pt-4">
        <button type="button" className={learnMoreBtnClass}>
          {t.learnMore}
        </button>
      </div>
    </div>
  );
}

function UniversityCard({ uni, t, lang }: { uni: University; t: EduDict; lang: Lang }) {
  return (
    <div className={cardHoverClass}>
      <span className={iconBadgeClass}>
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L2 8l10 5 10-5-10-5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M22 8v6" />
        </svg>
      </span>
      <div className="mt-3 flex items-start justify-between gap-2">
        <p className="text-sm font-semibold leading-snug text-white">{uni.name}</p>
        <TypeBadge type={uni.type} t={t} />
      </div>
      <p className="mt-1 text-xs text-slate-500">{trPlace(uni.location, lang)}</p>
      <div className="mt-3 flex flex-wrap gap-1">
        {uni.programs.slice(0, 3).map((p) => (
          <span key={p} className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-slate-400">{trField(p, lang)}</span>
        ))}
        {uni.programs.length > 3 && (
          <span className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-slate-500">
            +{uni.programs.length - 3} {t.morePrograms}
          </span>
        )}
      </div>
      <div className="mt-4 space-y-2 border-t border-white/5 pt-3">
        <Row label={t.rowInstruction} value={trField(uni.instruction, lang)} />
        <Row label={t.rowTuition} value={trField(uni.tuition, lang)} highlight />
        {uni.deadline && <Row label={t.rowDeadline} value={trField(uni.deadline, lang)} />}
      </div>
      {uni.note && (
        <p className="mt-3 rounded-xl bg-white/[0.03] px-3 py-2 text-[11px] leading-relaxed text-slate-500">
          {trField(uni.note, lang)}
        </p>
      )}
      <div className="mt-auto pt-4">
        <button type="button" className={learnMoreBtnClass}>
          {t.learnMore}
        </button>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const COUNTRY_FLAG: Record<CountryKey, string> = { Poland: "🇵🇱", Germany: "🇩🇪", Spain: "🇪🇸" };

export default function EducationPage() {
  const { profile } = useAuth();
  const { t, lang } = useLanguage();
  const country = ((profile?.country ?? "Poland") as CountryKey);

  const TABS: { id: TabId; label: string }[] = [
    { id: "courses", label: t.education.coursesTab },
    { id: "schools", label: t.education.schoolsTab },
    { id: "kindergartens", label: t.education.kindergartensTab },
    { id: "universities", label: t.education.universitiesTab },
  ];

  const FILTERS: { id: FilterId; label: string }[] = [
    { id: "all", label: t.education.filterAll },
    { id: "public", label: t.education.filterPublic },
    { id: "private", label: t.education.filterPrivate },
  ];

  const [activeTab, setActiveTab] = useState<TabId>("courses");
  const [filter, setFilter] = useState<FilterId>("all");

  function handleTabChange(tab: TabId) {
    setActiveTab(tab);
    setFilter("all");
  }

  function applyFilter<T extends { type: ItemType }>(items: T[]): T[] {
    if (filter === "all") return items;
    return items.filter((i) => i.type === filter);
  }

  const courses = applyFilter(COURSES[country] ?? []);
  const schools = applyFilter(SCHOOLS[country] ?? []);
  const kindergartens = applyFilter(KINDERGARTENS[country] ?? []);
  const universities = applyFilter(UNIVERSITIES[country] ?? []);

  const countryBanners = t.education.banners[BANNER_COUNTRY_KEY[country]] as
    | Partial<Record<TabId, string>>
    | undefined;
  const infoBanner = countryBanners?.[activeTab];
  const flag = COUNTRY_FLAG[country] ?? "🌍";

  return (
    <div className="px-6 py-8 lg:px-10 lg:py-10">
      <PageHeader title={`${t.education.title} ${flag}`} subtitle={t.education.subtitle} />

      {/* Tab bar */}
      <div className="mt-8 flex gap-1 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleTabChange(tab.id)}
            className={`flex-shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-150 ${
              activeTab === tab.id
                ? "bg-accent text-white shadow-[0_0_20px_-6px_var(--accent)]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filter pills */}
      <div className="mt-4 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors duration-150 ${
              filter === f.id
                ? "border-accent bg-accent/15 text-accent-bright"
                : "border-white/15 bg-white/[0.03] text-slate-400 hover:border-white/30 hover:text-white"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Info banner */}
      {infoBanner && (
        <Reveal className="mt-5">
          <InfoBanner text={infoBanner} />
        </Reveal>
      )}

      {/* Cards */}
      <div className="mt-6">
        {activeTab === "courses" && (
          courses.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((c, i) => (
                <Reveal key={c.name} delay={i * 40} className="h-full">
                  <CourseCard course={c} t={t.education} lang={lang} />
                </Reveal>
              ))}
            </div>
          ) : <EmptyState text={t.education.emptyState} />
        )}

        {activeTab === "schools" && (
          schools.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {schools.map((s, i) => (
                <Reveal key={s.name} delay={i * 40} className="h-full">
                  <SchoolCard school={s} t={t.education} lang={lang} />
                </Reveal>
              ))}
            </div>
          ) : <EmptyState text={t.education.emptyState} />
        )}

        {activeTab === "kindergartens" && (
          kindergartens.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {kindergartens.map((k, i) => (
                <Reveal key={k.name} delay={i * 40} className="h-full">
                  <KindergartenCard k={k} t={t.education} lang={lang} />
                </Reveal>
              ))}
            </div>
          ) : <EmptyState text={t.education.emptyState} />
        )}

        {activeTab === "universities" && (
          universities.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {universities.map((u, i) => (
                <Reveal key={u.name} delay={i * 40} className="h-full">
                  <UniversityCard uni={u} t={t.education} lang={lang} />
                </Reveal>
              ))}
            </div>
          ) : <EmptyState text={t.education.emptyState} />
        )}
      </div>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return <p className="py-14 text-center text-sm text-slate-500">{text}</p>;
}
