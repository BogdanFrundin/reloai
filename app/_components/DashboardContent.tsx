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

const RING_SIZE = 96;
const RING_STROKE = 7;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function ProgressRing({ percent }: { percent: number }) {
  const offset = RING_CIRCUMFERENCE * (1 - percent / 100);

  return (
    <div className="relative h-24 w-24 flex-shrink-0">
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
          className="stroke-accent-bright transition-[stroke-dashoffset] duration-700 ease-[var(--ease-out-strong)]"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-text-primary">
        {percent}%
      </span>
    </div>
  );
}

const SPARKLE_ICON = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.456-2.456L14.25 6l1.035-.259a3.375 3.375 0 002.456-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
    />
  </svg>
);

function motivationalMessage(
  percent: number,
  hasSteps: boolean,
  m: { noRoute: string; allDone: string; almostThere: string; thirdDone: string; goodStart: string; startFirst: string },
): string {
  if (!hasSteps) return m.noRoute;
  if (percent >= 100) return m.allDone;
  if (percent >= 66) return m.almostThere;
  if (percent >= 33) return m.thirdDone;
  if (percent > 0) return m.goodStart;
  return m.startFirst;
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
  const { user, profile } = useAuth();
  const { t, lang } = useLanguage();
  const {
    country,
    checklistSteps,
    phases,
    phaseStatuses,
    completed,
    progressPercent,
    loading,
    registerPromptOpen,
    setRegisterPromptOpen,
    isGeneratedPlan,
    isInteractivePlan,
    toggleStepCompletion,
    regeneratePlan,
    regenerating,
    regenerateError,
  } = useDashboardProgress();
  const countryEntry = t.countries.list[COUNTRY_INDEX[country] ?? 0];
  const goalLabel = isGoalKey(profile?.goal) ? t.onboarding.goalOptions[profile.goal] : undefined;
  const fromLabel = profile?.current_country ? getCountryName(profile.current_country, lang) : undefined;
  const displayName = profile?.name?.trim() || user?.email?.split("@")[0] || null;

  const doneCount = checklistSteps.filter((s) => completed.has(s.documentType)).length;
  const totalCount = checklistSteps.length;
  const currentPhase = phases.find((phase) => phaseStatuses[phase.key] === "in_progress");

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
        <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          {t.dashboard.relocation.replace("{country}", countryEntry?.nameDeclined ?? countryEntry?.name ?? country)}
        </h1>
      </Reveal>

      {!loading && phases.length > 0 && (
        <Reveal delay={40}>
          <div className="mt-6 overflow-hidden rounded-2xl border border-border-subtle bg-surface-1 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex min-w-0 items-center gap-4">
                <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-bright text-xl font-bold text-white">
                  {(displayName?.[0] ?? "R").toUpperCase()}
                </span>
                <div className="min-w-0">
                  <p className="flex flex-wrap items-center gap-2 text-lg font-bold text-text-primary sm:text-xl">
                    {displayName ?? "Ваш план переезда"}
                    {countryEntry?.flag && (
                      <Image
                        src={getFlagUrl(countryEntry.flag, "md")}
                        alt={countryEntry.name}
                        width={26}
                        height={19}
                        className="rounded-sm"
                        unoptimized
                      />
                    )}
                  </p>
                  {profile && fromLabel && goalLabel ? (
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-1 text-xs font-medium text-text-muted">
                        <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        {fromLabel}
                        {profile.city ? ` → ${profile.city}` : ""}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent-bright">
                        <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                        {goalLabel}
                      </span>
                    </div>
                  ) : (
                    <p className="mt-1 text-sm text-text-muted">{subtitle}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-shrink-0 items-center gap-5">
                <div className="text-right">
                  <p className="text-sm font-semibold text-text-primary">
                    {t.dashboard.docsReadyTemplate
                      .replace("{done}", String(doneCount))
                      .replace("{total}", String(totalCount))}
                  </p>
                  <p className="mt-1 text-xs font-medium text-accent-bright">
                    {currentPhase
                      ? t.dashboard.currentPhasePrefix.replace("{phase}", currentPhase.title)
                      : progressPercent >= 100
                        ? t.dashboard.allPhasesDone
                        : ""}
                  </p>
                </div>
                <ProgressRing percent={progressPercent} />
              </div>
            </div>
          </div>
        </Reveal>
      )}

      {!loading && phases.length > 0 && (
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
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
      <div className="mt-5">
        {!loading &&
          phases.map((phase, index) => (
            <PhaseCard
              key={phase.key}
              phase={phase}
              status={phaseStatuses[phase.key]}
              index={index}
              completed={completed}
              onToggleStep={isInteractivePlan ? toggleStepCompletion : undefined}
              isLast={index === phases.length - 1}
            />
          ))}
      </div>

      {!loading && phases.length > 0 && (
        <Reveal delay={60}>
          <div className="mt-2 flex items-center gap-3 rounded-2xl border border-accent/20 bg-accent/[0.05] p-5">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-bright">
              {SPARKLE_ICON}
            </span>
            <p className="text-sm font-medium text-text-primary">{motivationalMessage(progressPercent, totalCount > 0, t.dashboard.motivational)}</p>
          </div>
        </Reveal>
      )}

      <RegisterPromptModal open={registerPromptOpen} onClose={() => setRegisterPromptOpen(false)} />
    </div>
  );
}
