"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import WelcomeToast from "./WelcomeToast";
import RegisterPromptModal from "./RegisterPromptModal";
import PhaseCard from "./PhaseCard";
import VisaCountdownBanner from "./VisaCountdownBanner";
import { useAuth } from "./AuthProvider";
import { useLanguage } from "./LanguageProvider";
import { useDashboardProgress } from "./DashboardProgressProvider";
import { getCountryName } from "../_lib/countries";

const COUNTRY_INDEX: Record<string, number> = { Poland: 0, Germany: 1, Spain: 2 };

const GOAL_KEYS = [
  "work",
  "study",
  "business",
  "passiveIncome",
  "digitalNomad",
  "familyReunification",
  "other",
] as const;
type GoalKey = (typeof GOAL_KEYS)[number];

function isGoalKey(value: string | null | undefined): value is GoalKey {
  return !!value && (GOAL_KEYS as readonly string[]).includes(value);
}

export default function DashboardContent() {
  const searchParams = useSearchParams();
  const { profile } = useAuth();
  const { t, lang } = useLanguage();
  const {
    country,
    phases,
    phaseStatuses,
    completed,
    saving,
    progressPercent,
    loading,
    toggleStep,
    registerPromptOpen,
    setRegisterPromptOpen,
  } = useDashboardProgress();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (searchParams.get("welcome") === "1") {
      setShowWelcome(true);
      const timer = setTimeout(() => setShowWelcome(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const countryEntry = t.countries.list[COUNTRY_INDEX[country] ?? 0];
  const goalLabel = isGoalKey(profile?.goal) ? t.onboarding.goalOptions[profile.goal] : undefined;
  const fromLabel = profile?.current_country ? getCountryName(profile.current_country, lang) : undefined;

  const subtitle =
    profile && fromLabel && goalLabel
      ? profile.city
        ? t.dashboard.subtitleTemplate
            .replace("{from}", fromLabel)
            .replace("{city}", profile.city)
            .replace("{goal}", goalLabel)
            .replace("{percent}", String(progressPercent))
        : t.dashboard.subtitleTemplateNoCity
            .replace("{from}", fromLabel)
            .replace("{goal}", goalLabel)
            .replace("{percent}", String(progressPercent))
      : t.dashboard.subtitle;

  return (
    <div>
      <WelcomeToast />

      <Reveal>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {t.dashboard.relocation.replace("{country}", countryEntry?.name ?? country)}
        </h1>
        <p className="mt-2 text-slate-400">{subtitle}</p>

        <div className="mt-6">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-slate-300">{t.dashboard.overallProgress}</span>
            <span className="font-semibold text-accent-bright">{loading ? "..." : `${progressPercent}%`}</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent to-accent-bright transition-[width] duration-700 ease-[var(--ease-out-strong)]"
              style={{ width: `${loading ? 0 : progressPercent}%` }}
            />
          </div>
        </div>

        {profile?.created_at && <VisaCountdownBanner createdAt={profile.created_at} />}
      </Reveal>

      {showWelcome && profile?.selected_route && (
        <Reveal>
          <div className="mt-8 rounded-2xl border border-accent/30 bg-accent/[0.06] p-6 shadow-[0_0_40px_-14px_var(--accent)]">
            <p className="font-semibold text-accent-bright">✓ Welcome!</p>
            <h2 className="mt-2 text-xl font-bold text-white">Your relocation plan is ready</h2>
            <p className="mt-2 text-sm text-slate-300">
              We&apos;ve selected <span className="font-semibold">{profile.selected_route.name}</span> as your
              recommended route based on your profile.
            </p>
            <p className="mt-1 text-xs text-slate-400">{profile.selected_route.description}</p>
          </div>
        </Reveal>
      )}

      {!loading && phases.length > 0 && (
        <h2 id="checklist" className="mt-8 scroll-mt-24 text-lg font-semibold text-white">
          {t.dashboard.route.checklistHeading}
        </h2>
      )}
      <div className="mt-4 space-y-4">
        {!loading &&
          phases.map((phase, index) => (
            <PhaseCard
              key={phase.key}
              phase={phase}
              status={phaseStatuses[phase.key]}
              index={index}
              completed={completed}
              saving={saving}
              onToggle={toggleStep}
            />
          ))}
      </div>

      <RegisterPromptModal open={registerPromptOpen} onClose={() => setRegisterPromptOpen(false)} />
    </div>
  );
}
