"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-[28px] border border-border-subtle">
          <Image
            src="/districts/srodmiescie.jpg"
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c10] via-[#0a0c10]/88 to-[#0a0c10]/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-[#0a0c10]/5 to-transparent" />


          <div className="relative flex flex-col gap-4 p-6 sm:p-8 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
            <div className="max-w-lg">
              <h1 className="inline-flex items-center gap-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {t.banks.title}
                <Image src={getFlagUrl("pl", "md")} alt="Poland" width={32} height={24} className="rounded-sm" unoptimized />
              </h1>
              <p className="mt-2 text-sm text-white/70">{t.banks.subtitle}</p>
              {profile?.citizenship && (
                <p className="mt-3 text-xs text-white/50">{t.guideCard.citizenshipNote}</p>
              )}
            </div>

            <button
              type="button"
              onClick={() => router.push("/dashboard/ai?q=" + encodeURIComponent(t.banks.whichBankGuide.heading))}
              className="group w-full rounded-2xl border border-white/10 bg-black/35 p-4 text-left backdrop-blur-sm transition-colors duration-150 hover:border-accent/40 hover:bg-black/45 lg:max-w-sm"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-accent/20">
                  <svg className="h-5 w-5 text-accent-bright" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.556-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-white">{t.banks.whichBankTitle}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/70">{t.banks.whichBankDescription}</p>
                </div>
                <span
                  aria-hidden
                  className="flex-shrink-0 text-lg text-white/60 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-accent-bright"
                >
                  →
                </span>
              </div>
            </button>
          </div>
        </div>
      </Reveal>

      <Reveal delay={60} className="mt-6">
        {!loading && visibleBanks.length > 0 && (
          <div className="mb-6 rounded-2xl border border-border-subtle bg-surface-1 p-4 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent/15">
                  <svg className="h-5 w-5 text-accent-bright" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.363 1.118l1.287 3.957c.3.922-.755 1.688-1.539 1.118l-3.367-2.446a1 1 0 00-1.176 0l-3.367 2.446c-.784.57-1.838-.196-1.539-1.118l1.286-3.957a1 1 0 00-.363-1.118L2.062 9.385c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.958z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{t.banks.topRankedTitle}</h3>
                  <p className="mt-0.5 text-xs text-text-secondary">{t.banks.topRankedSubtitle}</p>
                </div>
              </div>

              <div className="flex flex-shrink-0 items-center gap-4 pl-[52px] sm:pl-0">
                <button
                  type="button"
                  onClick={() => router.push("/dashboard/ai?q=" + encodeURIComponent(t.banks.topRankedViewRating))}
                  className="inline-flex flex-shrink-0 items-center gap-2 rounded-full border border-accent/50 px-4 py-2 text-sm font-semibold text-accent-bright transition-colors duration-150 hover:border-accent hover:bg-accent/10"
                >
                  {t.banks.topRankedViewRating}
                  <span aria-hidden>→</span>
                </button>

                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {visibleBanks.slice(0, 4).map((bank) => (
                      <div
                        key={bank.id}
                        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-surface-1 bg-surface-hover text-text-secondary"
                        title={bank.name}
                      >
                        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 9a4 4 0 100-8 4 4 0 000 8zM10 11c-4.42 0-8 2.24-8 5v1a1 1 0 001 1h14a1 1 0 001-1v-1c0-2.76-3.58-5-8-5z" />
                        </svg>
                      </div>
                    ))}
                  </div>
                  <span className="text-xs leading-tight text-text-secondary">
                    {t.common.chosenByCountTemplate.replace(
                      "{n}",
                      visibleBanks
                        .slice(0, 4)
                        .reduce((sum, b) => sum + getChosenCount(b.id), 0)
                        .toLocaleString()
                    )}
                  </span>
                </div>
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
