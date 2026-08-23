"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import WelcomeToast from "./WelcomeToast";
import RegisterPromptModal from "./RegisterPromptModal";
import PhaseCard from "./PhaseCard";
import PhaseStepper from "./PhaseStepper";
import { useAuth } from "./AuthProvider";
import { useLanguage } from "./LanguageProvider";
import { useDashboardProgress } from "./DashboardProgressProvider";
import { getCountryName } from "../_lib/countries";
import { getFlagUrl } from "../_lib/flags";

const RING_SIZE = 64;
const RING_STROKE = 5;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function ProgressRing({ percent }: { percent: number }) {
  const offset = RING_CIRCUMFERENCE * (1 - percent / 100);

  return (
    <div className="relative h-16 w-16 flex-shrink-0">
      <svg width={RING_SIZE} height={RING_SIZE} viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`} className="-rotate-90">
        <circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_RADIUS}
          fill="none"
          strokeWidth={RING_STROKE}
          className="stroke-surface-2"
        />
        <circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_RADIUS}
          fill="none"
          strokeWidth={RING_STROKE}
          strokeLinecap="round"
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={offset}
          className="stroke-accent-bright transition-[stroke-dashoffset] duration-500 ease-[var(--ease-out-strong)]"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-text-primary">
        {percent}%
      </span>
    </div>
  );
}

const COUNTRY_INDEX: Record<string, number> = { Poland: 0, Germany: 1, Spain: 2 };

const GOAL_KEYS = [
  "work",
  "study",
  "business",
  "savings",
  "remote",
  "family",
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
    isGeneratedPlan,
    toggleStepCompletion,
    regeneratePlan,
    regenerating,
    regenerateError,
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
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              {t.dashboard.relocation.replace("{country}", countryEntry?.nameDeclined ?? countryEntry?.name ?? country)}
              {countryEntry?.flag && (
                <Image src={getFlagUrl(countryEntry.flag, "md")} alt={countryEntry.name} width={32} height={24} className="rounded-sm" unoptimized />
              )}
            </h1>
            <p className="mt-2 text-text-muted">{subtitle}</p>
          </div>
          {!loading && phases.length > 0 && <ProgressRing percent={progressPercent} />}
        </div>
      </Reveal>

      {!loading && phases.length > 0 && (
        <Reveal delay={40}>
          <div className="mt-8">
            <PhaseStepper phases={phases} phaseStatuses={phaseStatuses} />
          </div>
        </Reveal>
      )}

      {!loading && phases.length > 0 && (
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <h2 id="checklist" className="scroll-mt-24 text-lg font-semibold text-text-primary">
            {t.dashboard.route.checklistHeading}
          </h2>
          {isGeneratedPlan && (
            <button
              type="button"
              onClick={() => {
                if (regenerating) return;
                if (window.confirm("Сгенерировать план заново? Отмеченные выполненными шаги сбросятся.")) {
                  regeneratePlan();
                }
              }}
              disabled={regenerating}
              className="flex items-center gap-2 rounded-full border border-border-subtle bg-surface-1 px-4 py-2 text-xs font-semibold text-text-muted transition-colors duration-150 hover:border-accent/40 hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              <svg
                className={`h-3.5 w-3.5 ${regenerating ? "animate-spin" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {regenerating ? "Генерируем..." : "Пересоздать план"}
            </button>
          )}
        </div>
      )}
      {regenerateError && (
        <p className="mt-2 text-xs text-red-400">Не удалось пересоздать план. Попробуйте ещё раз.</p>
      )}
      <div className="mt-4 space-y-3">
        {!loading &&
          phases.map((phase, index) => (
            <PhaseCard
              key={phase.key}
              phase={phase}
              status={phaseStatuses[phase.key]}
              index={index}
              completed={completed}
              onToggleStep={isGeneratedPlan ? toggleStepCompletion : undefined}
            />
          ))}
      </div>

      <RegisterPromptModal open={registerPromptOpen} onClose={() => setRegisterPromptOpen(false)} />
    </div>
  );
}
