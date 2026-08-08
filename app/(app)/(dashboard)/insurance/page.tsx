"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import PageHeader from "../../../_components/PageHeader";
import Reveal from "../../../_components/Reveal";
import { useLanguage } from "../../../_components/LanguageProvider";
import { useAuth } from "../../../_components/AuthProvider";
import { getFlagUrl } from "../../../_lib/flags";
import { supabase } from "../../../../lib/supabase";
import DocumentGuideList, { guideAppliesTo, type DocumentGuide } from "../../../_components/DocumentGuideList";

const INFO_ICON = (
  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 11v5m0-8h.01" />
  </svg>
);

export default function InsurancePage() {
  const { t } = useLanguage();
  const { profile } = useAuth();
  const [guides, setGuides] = useState<DocumentGuide[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>("all");

  const visibleGuides = guides.filter((g) => guideAppliesTo(g, profile?.citizenship));

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
        <DocumentGuideList
          guides={filtered}
          loading={loading}
          emptyText="Пока нет данных по страховкам."
          searchPlaceholder="Поиск страховки"
        />
      </Reveal>

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
