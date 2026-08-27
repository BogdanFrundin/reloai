"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "../../../_components/PageHeader";
import Reveal from "../../../_components/Reveal";
import { useLanguage } from "../../../_components/LanguageProvider";
import { useAuth } from "../../../_components/AuthProvider";
import { getFlagUrl } from "../../../_lib/flags";
import { supabase } from "../../../../lib/supabase";
import { guideAppliesTo, type DocumentGuide } from "../../../_components/DocumentGuideList";
import BankCardGrid from "../../../_components/BankCardGrid";

const SPARKLE_ICON = (
  <svg className="h-[17px] w-[17px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
    />
  </svg>
);

const COMMON_QUESTIONS = [
  "Как открыть счёт без PESEL?",
  "Какие документы нужны?",
  "Сколько дней занимает открытие?",
  "Можно ли открыть онлайн?",
];

// Fixed display order: first 4 are the featured banks BankCardGrid shows by
// default, the rest appear under "Другие банки". Anything not in this list
// (there shouldn't be any, once prune-banks.sql has been run) sorts last.
const BANK_ORDER = [
  "mBank",
  "ING Bank Śląski",
  "PKO Bank Polski",
  "Bank Millennium",
  "Toyota Bank Polska",
  "Volkswagen Bank Polska",
  "Plus Bank",
  "BOŚ Bank",
  "Erste Bank Polska",
  "Bank Pocztowy",
];

function bankSortRank(name: string): number {
  const index = BANK_ORDER.indexOf(name);
  return index === -1 ? BANK_ORDER.length : index;
}

export default function BanksPage() {
  const { t } = useLanguage();
  const { profile } = useAuth();
  const router = useRouter();
  const [banks, setBanks] = useState<DocumentGuide[]>([]);
  const [loading, setLoading] = useState(true);

  const visibleBanks = banks.filter((g) =>
    guideAppliesTo(g, {
      citizenship: profile?.citizenship,
      citizenshipGroup: profile?.citizenship_group,
      goals: profile?.goals?.length ? profile.goals : profile?.goal ? [profile.goal] : null,
      hasCar: profile?.has_car,
      hasChildren: profile?.has_children,
    }),
  );

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
        <div className="rounded-[28px] bg-[#1c1f26] p-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-bright">
              {SPARKLE_ICON}
            </span>
            <p className="text-[15px] font-bold text-white">Частые вопросы про открытие счёта</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {COMMON_QUESTIONS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => router.push(`/dashboard/ai?q=${encodeURIComponent(q)}`)}
                className="rounded-full bg-white/[0.06] px-3.5 py-2.5 text-[13px] text-white/70 transition-colors duration-150 hover:bg-accent hover:text-white"
              >
                {q} →
              </button>
            ))}
          </div>
          <p className="mt-3.5 text-xs text-white/40">Клик по вопросу сразу открывает чат с готовым ответом от ИИ</p>
        </div>
      </Reveal>
    </div>
  );
}
