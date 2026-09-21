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
import { localizeDocumentGuides } from "../../../_lib/localizeGuide";
import { getChosenCount } from "../../../_lib/chosenCount";
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
  const { t, lang } = useLanguage();
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
        setBanks(localizeDocumentGuides((data as DocumentGuide[]) ?? [], lang));
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [lang]);

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
          <p className="mb-3 text-xs text-text-muted">{t.guideCard.citizenshipNote}</p>
        )}

        {!loading && visibleBanks.length > 0 && (
          <div className="mb-8 rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/10 to-transparent p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent/15">
                {SPARKLE_ICON}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">{t.banks.topRankedTitle}</h3>
                <p className="text-sm text-text-secondary mb-4">{t.banks.topRankedSubtitle}</p>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {visibleBanks.slice(0, 4).map((bank) => (
                      <div
                        key={bank.id}
                        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent/25 border border-accent/40 text-xs font-semibold text-accent-bright"
                        title={bank.name}
                      >
                        {bank.name
                          .split(/\s+/)
                          .slice(0, 2)
                          .map((w) => w[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-text-secondary">
                    {t.common.chosenByCountTemplate.replace(
                      "{n}",
                      visibleBanks
                        .slice(0, 4)
                        .reduce((sum, b) => sum + getChosenCount(b.id), 0)
                        .toLocaleString()
                    )}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => router.push("/dashboard/ai?q=" + encodeURIComponent(t.banks.topRankedViewRating))}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-accent/20 px-4 py-2 text-sm font-semibold text-accent-bright transition-colors duration-150 hover:bg-accent/30"
                >
                  {t.banks.topRankedViewRating}
                  <span aria-hidden>→</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <BankCardGrid
          guides={visibleBanks}
          loading={loading}
          emptyText={t.banks.emptyText}
          searchPlaceholder={t.guideCard.searchBanks}
        />
      </Reveal>

      <Reveal delay={130} className="mt-12">
        <div className="rounded-2xl border border-border-subtle bg-surface-1 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent/15">
              <svg className="h-6 w-6 text-accent-bright" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.556-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-white mb-1">{t.banks.whichBankTitle}</h3>
              <p className="text-sm text-text-secondary mb-4">{t.banks.whichBankDescription}</p>
              <button
                type="button"
                onClick={() => router.push("/dashboard/ai?q=" + encodeURIComponent(t.banks.whichBankGuide.heading))}
                className="inline-flex items-center gap-2 rounded-xl bg-accent/15 px-4 py-2 text-sm font-semibold text-accent-bright transition-colors duration-150 hover:bg-accent/25"
              >
                {t.banks.whichBankLearnMore}
                <span aria-hidden>→</span>
              </button>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={200} className="mt-12">
        <div className="rounded-[28px] bg-[#1c1f26] p-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-bright">
              {SPARKLE_ICON}
            </span>
            <p className="text-[15px] font-bold text-white">{t.banks.faqHeading}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {t.banks.faqQuestions.map((q) => (
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
          <p className="mt-3.5 text-xs text-white/40">{t.banks.faqCaption}</p>
        </div>
      </Reveal>
    </div>
  );
}
