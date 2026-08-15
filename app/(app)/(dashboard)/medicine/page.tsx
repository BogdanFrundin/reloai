"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
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

function ClinicCard({ clinic }: { clinic: Clinic }) {
  const mapsQuery = encodeURIComponent([clinic.address, clinic.district, clinic.city, "Poland"].filter(Boolean).join(", "));

  return (
    <div className="group flex h-full flex-col rounded-2xl border border-border-subtle bg-surface-1 p-5 backdrop-blur-sm transition-[transform,box-shadow,border-color,background-color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:border-accent/50 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-surface-hover [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_12px_32px_-12px_rgba(33,85,212,0.45)] motion-reduce:transition-none">
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-bright transition-transform duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105 motion-reduce:transition-none">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m-4-4h8" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 5.5A2.5 2.5 0 017 3h10a2.5 2.5 0 012.5 2.5v13A2.5 2.5 0 0117 21H7a2.5 2.5 0 01-2.5-2.5v-13z" />
        </svg>
      </span>
      <p className="mt-3 text-sm font-semibold leading-snug text-text-primary">{clinic.name}</p>
      {(clinic.address || clinic.district) && (
        <p className="mt-1 text-xs text-text-muted">
          {[clinic.address, clinic.district].filter(Boolean).join(" · ")}
        </p>
      )}
      {clinic.rating != null && (
        <div className="mt-2">
          <StarRating rating={clinic.rating} />
        </div>
      )}
      {clinic.description && (
        <p className="mt-2 line-clamp-3 text-xs text-text-secondary">{clinic.description}</p>
      )}
      {clinic.specializations && clinic.specializations.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {clinic.specializations.slice(0, 3).map((s) => (
            <span key={s} className="rounded-md bg-surface-1 px-2 py-0.5 text-[11px] text-text-muted">
              {s}
            </span>
          ))}
          {clinic.specializations.length > 3 && (
            <span className="rounded-md bg-surface-1 px-2 py-0.5 text-[11px] text-text-muted">
              +{clinic.specializations.length - 3}
            </span>
          )}
        </div>
      )}
      {clinic.required_docs && clinic.required_docs.length > 0 && (
        <p className="mt-2 text-[11px] leading-relaxed text-text-muted">
          <span className="font-semibold text-text-secondary">Документы: </span>
          {clinic.required_docs.join("; ")}
        </p>
      )}
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center justify-center rounded-full border border-border-strong bg-surface-1 px-4 py-2.5 text-sm font-semibold text-text-secondary opacity-80 transition-[background-color,border-color,color,opacity] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:border-accent [@media(hover:hover)_and_(pointer:fine)]:group-hover:bg-accent [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-white [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100 motion-reduce:transition-none"
      >
        Показать на карте
      </a>
    </div>
  );
}

export default function MedicinePage() {
  const { t } = useLanguage();
  const { profile } = useAuth();
  const [city, setCity] = useSelectedCity(profile?.city);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>("all");
  const [district, setDistrict] = useState<string>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    supabase
      .from("clinics")
      .select("*")
      .eq("city", city)
      .order("category")
      .order("rating", { ascending: false, nullsFirst: false })
      .then(({ data }) => {
        if (!active) return;
        setClinics((data as Clinic[]) ?? []);
        setCategory("all");
        setDistrict("all");
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [city]);

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
      // Some rows have junk in the district column (e.g. "Более 40 отделений
      // по Варшаве") instead of an actual district name -- skip anything
      // that isn't a plain place name.
      if (!d || /\d/.test(d) || seen.has(d)) continue;
      seen.add(d);
      list.push(d);
    }
    return list.sort((a, b) => a.localeCompare(b, "ru"));
  }, [clinics]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return clinics.filter((c) => {
      if (category !== "all" && c.category !== category) return false;
      if (district !== "all" && c.district !== district) return false;
      if (!term) return true;
      return (
        c.name.toLowerCase().includes(term) ||
        (c.district ?? "").toLowerCase().includes(term) ||
        (c.address ?? "").toLowerCase().includes(term)
      );
    });
  }, [clinics, category, district, search]);

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

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <CitySelect value={city} onChange={setCity} label="Город" />
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">
              {SEARCH_ICON}
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по названию или району"
              className="w-64 rounded-full border border-border-strong bg-surface-1 py-2 pl-9 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
            />
          </div>
          <Dropdown
            value={category}
            onChange={setCategory}
            options={[{ value: "all", label: "Все категории" }, ...categories.map((c) => ({ value: c, label: c }))]}
          />
          {districts.length > 0 && (
            <Dropdown
              value={district}
              onChange={setDistrict}
              options={[{ value: "all", label: "Все районы" }, ...districts.map((d) => ({ value: d, label: d }))]}
            />
          )}
          <span className="text-xs text-text-muted">{filtered.length} клиник</span>
        </div>

        {loading ? (
          <p className="mt-8 text-sm text-text-muted">Загрузка…</p>
        ) : grouped.length === 0 ? (
          <p className="mt-8 text-sm text-text-muted">Ничего не найдено для {city}.</p>
        ) : (
          <div className="mt-6 space-y-10">
            {grouped.map(([cat, items]) => (
              <div key={cat}>
                <h3 className="text-sm font-bold uppercase tracking-wide text-text-muted">{cat}</h3>
                <div className="mt-3 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {items.map((clinic, index) => (
                    <Reveal key={clinic.id} delay={index * 30}>
                      <ClinicCard clinic={clinic} />
                    </Reveal>
                  ))}
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
