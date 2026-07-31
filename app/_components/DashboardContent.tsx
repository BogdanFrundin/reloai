"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import WelcomeToast from "./WelcomeToast";
import RegisterPromptModal from "./RegisterPromptModal";
import PhaseCard from "./PhaseCard";
import { useAuth } from "./AuthProvider";
import { useLanguage } from "./LanguageProvider";
import { useDashboardProgress } from "./DashboardProgressProvider";
import { getCountryName } from "../_lib/countries";
import { getFlagUrl } from "../_lib/flags";

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
  const { profile } = useAuth();
  const { t, lang } = useLanguage();
  const {
    country,
    phases,
    phaseStatuses,
    completed,
    progressPercent,
    loading,
    registerPromptOpen,
    setRegisterPromptOpen,
  } = useDashboardProgress();
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
        <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          {t.dashboard.relocation.replace("{country}", countryEntry?.nameDeclined ?? countryEntry?.name ?? country)}
          {countryEntry?.flag && (
            <Image src={getFlagUrl(countryEntry.flag, "md")} alt={countryEntry.name} width={32} height={24} className="rounded-sm" unoptimized />
          )}
        </h1>
        <p className="mt-2 text-text-muted">{subtitle}</p>
      </Reveal>

      {!loading && phases.length > 0 && (
        <Reveal delay={40}>
          <div className="mt-8 rounded-2xl border border-border-subtle bg-surface-1 p-5">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-text-primary">{t.dashboard.overallProgress}</p>
              <span className="text-lg font-bold text-accent-bright">{progressPercent}%</span>
            </div>
            <div className="mt-4 flex items-center gap-2">
              {phases.map((phase) => {
                const status = phaseStatuses[phase.key];
                return (
                  <div key={phase.key} className="min-w-0 flex-1">
                    <div
                      className={`h-2 rounded-full transition-colors duration-300 ${
                        status === "done"
                          ? "bg-emerald-400"
                          : status === "in_progress"
                            ? "bg-accent-bright animate-glow-pulse motion-reduce:animate-none"
                            : "bg-surface-2"
                      }`}
                    />
                    <p className="mt-2 truncate text-center text-[11px] font-medium text-text-muted">
                      {t.dashboard.phases[phase.key]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      )}

      {!loading && phases.length > 0 && (
        <h2 id="checklist" className="mt-8 scroll-mt-24 text-lg font-semibold text-text-primary">
          {t.dashboard.route.checklistHeading}
        </h2>
      )}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {!loading &&
          phases.map((phase, index) => (
            <PhaseCard
              key={phase.key}
              phase={phase}
              status={phaseStatuses[phase.key]}
              index={index}
              completed={completed}
            />
          ))}
      </div>

      <RegisterPromptModal open={registerPromptOpen} onClose={() => setRegisterPromptOpen(false)} />
    </div>
  );
}
