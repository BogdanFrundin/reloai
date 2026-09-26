"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Reveal from "../../../_components/Reveal";
import { useLanguage } from "../../../_components/LanguageProvider";
import { useAuth } from "../../../_components/AuthProvider";
import { getFlagUrl } from "../../../_lib/flags";
import { supabase } from "../../../../lib/supabase";
import { guideAppliesTo, type DocumentGuide } from "../../../_components/DocumentGuideList";
import { localizeDocumentGuides } from "../../../_lib/localizeGuide";
import { getChosenCount } from "../../../_lib/chosenCount";
import BankCardGrid, { type BankCardGridHandle } from "../../../_components/BankCardGrid";

// A small, fixed sample of the real (consenting) customer photos already
// used for testimonials on the landing page (see reviewAvatars.ts) — reused
// here as the "already chosen by N people" avatar stack instead of empty
// placeholder icons.
const CHOSEN_BY_AVATARS = [
  "/images/reviews/woman-1.jpg",
  "/images/reviews/man-1.jpg",
  "/images/reviews/woman-2.jpg",
  "/images/reviews/man-2.jpg",
];

const SPARKLE_ICON = (
  <svg className="h-[17px] w-[17px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
    />
  </svg>
);

// One distinct icon per FAQ chip (matched to faqQuestions' fixed order —
// PESEL/ID, documents, timing, online) instead of the same question-mark
// glyph repeated on every chip.
const FAQ_ICONS = [
  // ID card — "without PESEL / ID" question
  <svg key="id" className="h-[15px] w-[15px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <circle cx="8.5" cy="12" r="2" />
    <path strokeLinecap="round" d="M13.5 10h4M13.5 14h4" />
  </svg>,
  // Document — "which documents" question
  <svg key="docs" className="h-[15px] w-[15px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    <path strokeLinecap="round" d="M8.5 12.5h7M8.5 16h7" />
  </svg>,
  // Clock — "how many days" question
  <svg key="clock" className="h-[15px] w-[15px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3.5 2" />
  </svg>,
  // Phone — "can it be done online" question
  <svg key="phone" className="h-[15px] w-[15px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
    <path strokeLinecap="round" d="M11 18.5h2" />
  </svg>,
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
  const { t, lang } = useLanguage();
  const { profile } = useAuth();
  const router = useRouter();
  const [banks, setBanks] = useState<DocumentGuide[]>([]);
  const [loading, setLoading] = useState(true);
  const bankCardGridRef = useRef<BankCardGridHandle>(null);

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
        {/* Hero photo: dusk skyline of Warsaw's left bank (skyscrapers +
            Vistula reflections), by Oleslawlama, CC BY-SA 4.0, via Wikimedia
            Commons — https://commons.wikimedia.org/wiki/File:Evening_skyline_Warsaw_skyscrapers_Vistula_River.jpg */}
        <div className="relative isolate overflow-hidden">
          {/* Two independent linear masks (one per axis) feather all four
              edges of the photo into the page background — a radial mask
              centered off to one side can only fully fade the near edge,
              leaving the far/top/bottom edges hard; nesting a horizontal and
              a vertical fade composites into a soft rectangle with no
              visible photo boundary on any side. */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
              }}
            >
              <Image src="/hero/warsaw-skyline.jpg" alt="" fill priority className="object-cover" />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />


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
                  onClick={() => bankCardGridRef.current?.openRating()}
                  className="inline-flex flex-shrink-0 items-center gap-2 rounded-full border border-accent/50 px-4 py-2 text-sm font-semibold text-accent-bright transition-colors duration-150 hover:border-accent hover:bg-accent/10"
                >
                  {t.banks.topRankedViewRating}
                  <span aria-hidden>→</span>
                </button>

                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {CHOSEN_BY_AVATARS.map((src) => (
                      <Image
                        key={src}
                        src={src}
                        alt=""
                        width={32}
                        height={32}
                        className="h-8 w-8 flex-shrink-0 rounded-full border-2 border-surface-1 object-cover"
                      />
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
          ref={bankCardGridRef}
          guides={visibleBanks}
          loading={loading}
          emptyText={t.banks.emptyText}
          searchPlaceholder={t.guideCard.searchBanks}
        />
      </Reveal>

      <Reveal delay={200} className="mt-8">
        {/* Bolder, more eye-catching version of the same card language —
            a tinted gradient panel instead of a flat surface, two ambient
            glows for depth, a solid gradient icon badge, and filled
            (not just outlined) chips so this reads as an actual highlight
            rather than another quiet box. */}
        <div className="relative overflow-hidden rounded-2xl border border-accent/25 bg-gradient-to-br from-accent/10 via-surface-1 to-surface-1 p-5 shadow-lg shadow-accent/5 sm:p-6">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-14 -top-20 h-56 w-56 rounded-full bg-accent/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-accent-bright/10 blur-3xl"
          />
          <div className="relative flex items-center gap-3.5">
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-bright text-white shadow-lg shadow-accent/40 ring-2 ring-accent/20">
              {SPARKLE_ICON}
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-accent-bright">AI-помощник</p>
              <p className="text-lg font-extrabold text-text-primary">{t.banks.faqHeading}</p>
            </div>
          </div>
          <div className="relative mt-4 flex flex-wrap gap-2.5">
            {t.banks.faqQuestions.map((q, i) => (
              <button
                key={q}
                type="button"
                // Sends the full, bank-scoped question (faqQueries) to the AI
                // chat instead of the short chip label (faqQuestions) — the
                // short label alone has no bank context once it reaches a
                // general chat, so the AI used to answer about relocation
                // documents in general instead of bank-account documents.
                onClick={() => router.push(`/dashboard/ai?q=${encodeURIComponent(t.banks.faqQueries[i])}`)}
                className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/15 px-4 py-2.5 text-[13px] font-semibold text-accent-bright shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/30"
              >
                {FAQ_ICONS[i]}
                {q} →
              </button>
            ))}
          </div>
          <p className="relative mt-4 text-xs text-text-muted">{t.banks.faqCaption}</p>
        </div>
      </Reveal>
    </div>
  );
}
