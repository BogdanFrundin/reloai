"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "../../../_components/PageHeader";
import Reveal from "../../../_components/Reveal";
import { useLanguage } from "../../../_components/LanguageProvider";
import { useAuth } from "../../../_components/AuthProvider";
import { getFlagUrl } from "../../../_lib/flags";
import { supabase } from "../../../../lib/supabase";
import { guideAppliesTo, type DocumentGuide } from "../../../_components/DocumentGuideList";
import GuideTopicGrid from "../../../_components/GuideTopicGrid";

const INFO_ICON = (
  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 11v5m0-8h.01" />
  </svg>
);

const SPARKLE_ICON = (
  <svg className="h-[17px] w-[17px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
    />
  </svg>
);

export default function InsurancePage() {
  const router = useRouter();
  const { t } = useLanguage();
  const { profile } = useAuth();
  const [guides, setGuides] = useState<DocumentGuide[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>("all");

  const visibleGuides = guides.filter((g) =>
    guideAppliesTo(g, {
      citizenship: profile?.citizenship,
      citizenshipGroup: profile?.citizenship_group,
      goal: profile?.goal,
      hasCar: profile?.has_car,
      hasChildren: profile?.has_children,
    }),
  );

  useEffect(() => {
    let active = true;
    // Insurance/health-related content lives in document_guides under the
    // "медицина" category (NFZ, EKUZ, POZ, private/travel insurance, medical
    // certificates). Legalization/visas/business/etc. live on /documents —
    // see documents/page.tsx.
    supabase
      .from("document_guides")
      .select("*")
      .eq("category", "медицина")
      .order("name")
      .then(({ data }) => {
        if (!active) return;
        setGuides((data as DocumentGuide[]) ?? []);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(() => {
    const seen = new Set<string>();
    const list: string[] = [];
    for (const g of visibleGuides) {
      if (!seen.has(g.category)) {
        seen.add(g.category);
        list.push(g.category);
      }
    }
    return list;
  }, [visibleGuides]);

  const filtered = category === "all" ? visibleGuides : visibleGuides.filter((g) => g.category === category);

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

      <Reveal delay={60} className="mt-10">
        {categories.length > 1 && (
          <div className="mb-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCategory("all")}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold capitalize transition-colors duration-150 ${
                category === "all"
                  ? "border-accent bg-accent/15 text-accent-bright"
                  : "border-border-strong bg-surface-1 text-text-muted hover:text-text-primary"
              }`}
            >
              Все
            </button>
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold capitalize transition-colors duration-150 ${
                  category === c
                    ? "border-accent bg-accent/15 text-accent-bright"
                    : "border-border-strong bg-surface-1 text-text-muted hover:text-text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {profile?.citizenship && (
          <p className="mb-3 text-xs text-text-muted">Показаны гайды, актуальные для вашего гражданства.</p>
        )}
        <GuideTopicGrid
          guides={filtered}
          loading={loading}
          emptyText="Пока нет данных по страховкам."
          searchPlaceholder="Поиск страховки"
        />
      </Reveal>

      <Reveal delay={200} className="mt-12">
        <h2 className="text-xl font-bold tracking-tight text-text-primary">{t.insurance.compareTitle}</h2>
        <div className="mt-4 grid items-stretch gap-4 sm:grid-cols-2">
          <div className="rounded-[28px] bg-[#1c1f26] p-6">
            <p className="inline-flex items-center gap-1.5 text-[15px] font-bold text-accent-bright">
              {t.insurance.nfzLabel}
              <span title={t.insurance.nfzTooltip} className="cursor-help text-white/40">
                {INFO_ICON}
              </span>
            </p>
            <div className="mt-4 space-y-3.5 border-t border-white/10 pt-4">
              {t.insurance.rows.map((row) => (
                <div key={row.label} className="text-xs">
                  <p className="text-white/40">{row.label}</p>
                  <p className="mt-0.5 text-white/70">{row.nfz}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[28px] bg-[#1c1f26] p-6">
            <p className="text-[15px] font-bold text-accent-bright">{t.insurance.privateLabel}</p>
            <div className="mt-4 space-y-3.5 border-t border-white/10 pt-4">
              {t.insurance.rows.map((row) => (
                <div key={row.label} className="text-xs">
                  <p className="text-white/40">{row.label}</p>
                  <p className="mt-0.5 text-white/70">{row.pvt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            router.push(
              `/dashboard/ai?q=${encodeURIComponent(
                "Что мне выбрать — государственную страховку NFZ или частную? Учти мою ситуацию: работаю ли я официально, нужен ли быстрый доступ к врачам, важен ли бюджет."
              )}`
            )
          }
          className="mt-4 flex w-full items-center gap-3 rounded-2xl bg-[#1c1f26] p-5 text-left transition-colors duration-150 hover:bg-[#20242d]"
        >
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-bright">
            {SPARKLE_ICON}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[14px] font-bold text-white">Не знаете, что выбрать?</span>
            <span className="mt-0.5 block text-xs text-white/50">
              Спросите ИИ — он учтёт вашу ситуацию и подскажет, что подойдёт именно вам
            </span>
          </span>
          <span className="flex-shrink-0 text-sm font-semibold text-accent-bright">Спросить →</span>
        </button>
      </Reveal>
    </div>
  );
}
