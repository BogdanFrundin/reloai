"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import PageHeader from "../../../_components/PageHeader";
import Reveal from "../../../_components/Reveal";
import { useLanguage } from "../../../_components/LanguageProvider";
import { useAuth } from "../../../_components/AuthProvider";
import { getFlagUrl } from "../../../_lib/flags";
import { supabase } from "../../../../lib/supabase";
import { guideAppliesTo, type DocumentGuide } from "../../../_components/DocumentGuideList";
import BankCardGrid from "../../../_components/BankCardGrid";

const CHEVRON_ICON = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export default function BanksPage() {
  const { t } = useLanguage();
  const { profile } = useAuth();
  const [guideOpen, setGuideOpen] = useState(true);
  const [banks, setBanks] = useState<DocumentGuide[]>([]);
  const [loading, setLoading] = useState(true);

  const visibleBanks = banks.filter((g) => guideAppliesTo(g, profile?.citizenship));

  useEffect(() => {
    let active = true;
    supabase
      .from("document_guides")
      .select("*")
      .eq("category", "финансы")
      .order("name")
      .then(({ data }) => {
        if (!active) return;
        setBanks((data as DocumentGuide[]) ?? []);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="px-6 py-8 lg:px-10 lg:py-10">
      <PageHeader
        title={
          <span className="inline-flex items-center gap-3">
            {t.banks.title}
            <Image src={getFlagUrl("pl", "md")} alt="Poland" width={32} height={24} className="rounded-sm" unoptimized />
          </span>
        }
        subtitle={t.banks.subtitle}
      />

      <Reveal delay={60} className="mt-10">
        {profile?.citizenship && (
          <p className="mb-3 text-xs text-text-muted">Показаны гайды, актуальные для вашего гражданства.</p>
        )}
        <BankCardGrid
          guides={visibleBanks}
          loading={loading}
          emptyText="Пока нет данных по банкам."
          searchPlaceholder="Поиск банка"
        />
      </Reveal>

      <Reveal delay={200} className="mt-12">
        <div className="rounded-2xl border border-border-subtle bg-surface-1 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setGuideOpen((prev) => !prev)}
            aria-expanded={guideOpen}
            className="flex w-full items-center justify-between gap-3 px-6 py-5 text-left"
          >
            <h2 className="text-lg font-bold text-text-primary">{t.banks.guide.heading}</h2>
            <span
              className={`flex-shrink-0 text-text-muted transition-transform duration-150 ${guideOpen ? "rotate-180" : ""}`}
            >
              {CHEVRON_ICON}
            </span>
          </button>

          {guideOpen && (
            <div className="space-y-6 border-t border-border-subtle px-6 py-6">
              <div className="space-y-4">
                {t.banks.guide.steps.map((step, index) => (
                  <div key={step} className="flex items-start gap-4">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent-bright">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-text-secondary">{step}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-accent/20 bg-accent/[0.04] p-5">
                <p className="text-sm font-semibold text-text-primary">{t.banks.guide.tipsHeading}</p>
                <ul className="mt-3 space-y-2">
                  {t.banks.guide.tips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent-bright" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
}
