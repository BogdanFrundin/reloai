"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
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

const SPARKLE_ICON_SM = (
  <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
    />
  </svg>
);

function ClinicCard({ clinic }: { clinic: Clinic }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const mapsUrl = buildGoogleMapsUrl([clinic.address, clinic.district, clinic.city, "Poland"]);
  const subtitleParts = [clinic.address, clinic.district].filter(Boolean);

  function askAi() {
    const question = `Расскажи подробнее про клинику "${clinic.name}" в городе ${clinic.city}: стоит ли выбрать её, какие плюсы и минусы, на что обратить внимание?`;
    router.push(`/dashboard/ai?q=${encodeURIComponent(question)}`);
  }

  return (
    <div
      className={`group relative flex flex-col rounded-[28px] bg-[#1c1f26] p-6 transition-[transform,box-shadow,background-color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#20242d] [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_16px_36px_-14px_rgba(33,85,212,0.4)] motion-reduce:transition-none ${
        open ? "h-auto" : "h-[380px] overflow-hidden"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full flex-1 flex-col items-start gap-4 text-left"
      >
        <div className="flex w-full items-center justify-between gap-2">
          <span className={clinicIconBadgeClass}>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m-4-4h8" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 5.5A2.5 2.5 0 017 3h10a2.5 2.5 0 012.5 2.5v13A2.5 2.5 0 0117 21H7a2.5 2.5 0 01-2.5-2.5v-13z" />
            </svg>
          </span>
          {clinic.rating != null && <StarRating rating={clinic.rating} />}
        </div>

        <div className="w-full">
          <p className="line-clamp-2 text-[17px] font-bold leading-tight text-white">{clinic.name}</p>
          {subtitleParts.length > 0 && (
            <p className="mt-1.5 line-clamp-1 text-xs text-white/50">{subtitleParts.join(" · ")}</p>
          )}
          {clinic.description && <p className="mt-2 line-clamp-3 text-xs text-white/60">{clinic.description}</p>}
        </div>

        {clinic.specializations && clinic.specializations.length > 0 && (
          <div className="flex w-full flex-wrap gap-1.5">
            {clinic.specializations.slice(0, 3).map((s) => (
              <span key={s} className="rounded-lg bg-white/[0.06] px-2.5 py-1 text-[11px] text-white/60">
                {s}
              </span>
            ))}
            {clinic.specializations.length > 3 && (
              <span className="rounded-lg bg-white/[0.06] px-2.5 py-1 text-[11px] text-white/60">
                +{clinic.specializations.length - 3}
              </span>
            )}
          </div>
        )}
      </button>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex flex-1 items-center justify-center gap-1 whitespace-nowrap rounded-2xl bg-white/10 py-3 text-[12px] font-bold text-white transition-colors duration-150 hover:bg-accent"
        >
          {open ? "Скрыть" : "Подробнее"} →
        </button>
        <button
          type="button"
          onClick={askAi}
          aria-label={`Спросить ИИ про ${clinic.name}`}
          className="flex flex-1 items-center justify-center gap-1 whitespace-nowrap rounded-2xl bg-white/10 py-3 text-[12px] font-bold text-white transition-colors duration-150 hover:bg-accent"
        >
          {SPARKLE_ICON_SM}
          Спросить ИИ
        </button>
      </div>

      {open && (
        <div className="mt-4 space-y-4 border-t border-white/10 pt-4">
          {clinic.required_docs && clinic.required_docs.length > 0 && (
            <p className="text-xs leading-relaxed text-white/60">
              <span className="font-semibold text-white/80">Документы: </span>
              {clinic.required_docs.join("; ")}
            </p>
          )}

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-2xl bg-white/10 py-3 text-[13px] font-bold text-white transition-colors duration-150 hover:bg-accent"
          >
            Показать на карте →
          </a>
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
        setAiQuery("");
        setAiResult(null);
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

        <div className="mt-4 rounded-2xl border border-accent/30 bg-accent/[0.05] p-4 backdrop-blur-sm sm:p-5">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-bright">
              {SPARKLE_ICON}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-text-primary">Подбор клиники с ИИ</p>
              <p className="mt-0.5 text-xs text-text-muted">
                Опишите свою проблему или какой врач или клиника вам нужны — мы подберём подходящие варианты.
              </p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <input
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAiSearch();
                  }}
                  placeholder="Например: болит зуб, нужен стоматолог рядом с центром"
                  className="flex-1 rounded-xl border border-border-strong bg-surface-1 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAiSearch}
                  disabled={aiLoading || !aiQuery.trim()}
                  className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {aiLoading ? "Подбираем…" : "Найти"}
                </button>
              </div>
              {aiResult && (
                <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl bg-surface-1 px-4 py-2.5">
                  <span className="text-xs text-text-secondary">{aiResult.reply}</span>
                  <button
                    type="button"
                    onClick={resetAiSearch}
                    className="ml-auto flex-shrink-0 text-xs font-semibold text-accent-bright transition-colors duration-150 hover:text-text-primary"
                  >
                    Сбросить
                  </button>
                </div>
              )}
            </div>
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
                <div className="mt-3 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
