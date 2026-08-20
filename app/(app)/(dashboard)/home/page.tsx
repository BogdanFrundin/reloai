"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import Reveal from "../../../_components/Reveal";
import FlightProgress from "../../../_components/FlightProgress";
import { useAuth } from "../../../_components/AuthProvider";
import { useLanguage } from "../../../_components/LanguageProvider";
import { useDashboardProgress } from "../../../_components/DashboardProgressProvider";
import { NAV_ICONS } from "../../../_components/NavIcons";
import { getFlagUrl } from "../../../_lib/flags";

const COUNTRY_INDEX: Record<string, number> = { Poland: 0, Germany: 1, Spain: 2 };

const ROADMAP_ICON = (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
);

const AI_ICON = (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.5V4m6 2.5V4M6 9.5h12a1.5 1.5 0 011.5 1.5v7a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18v-7A1.5 1.5 0 016 9.5zM9 14v.01M15 14v.01M9.5 17.5h5" />
    <circle cx="12" cy="4" r="1" fill="currentColor" stroke="none" />
  </svg>
);

function StatCard({ label, value, compact = false }: { label: string; value: string; compact?: boolean }) {
  return (
    <div className="rounded-2xl border border-border-subtle bg-surface-1 p-5">
      <p className="text-xs text-text-muted">{label}</p>
      <p className={`mt-1.5 font-bold text-text-primary ${compact ? "text-base leading-snug" : "text-2xl"}`}>{value}</p>
    </div>
  );
}

export default function HomePage() {
  const { t } = useLanguage();
  const { user, profile } = useAuth();
  const { country, checklistSteps, phases, phaseStatuses, completed, progressPercent, loading } = useDashboardProgress();
  const h = t.dashboard.home;

  const countryEntry = t.countries.list[COUNTRY_INDEX[country] ?? 0];
  const displayName = profile?.name?.trim() || user?.email?.split("@")[0] || null;

  const currentPhase = phases.find((phase) => phaseStatuses[phase.key] === "in_progress");
  const currentPhaseLabel = currentPhase ? currentPhase.title : t.dashboard.phaseStatus.done;

  const daysSinceJoining = profile?.created_at
    ? Math.max(0, Math.floor((Date.now() - new Date(profile.created_at).getTime()) / (1000 * 60 * 60 * 24)))
    : null;

  const currentStep = useMemo(
    () => checklistSteps.find((step) => !completed.has(step.documentType)) ?? null,
    [checklistSteps, completed],
  );

  const isWorkGoal = profile?.goal === "work" || profile?.goal === "digitalNomad";

  const quickActions = [
    { key: "roadmap", href: "/dashboard", icon: ROADMAP_ICON, title: t.dashboard.sidebar.roadmap, desc: h.quickActionRoadmapDesc },
    { key: "documents", href: "/documents", icon: NAV_ICONS.documents, title: t.sidebar.documents, desc: h.quickActionDocumentsDesc },
    { key: "ai", href: "/dashboard/ai", icon: AI_ICON, title: t.dashboard.sidebar.aiAssistant, desc: h.quickActionAiDesc },
    isWorkGoal
      ? { key: "work", href: "/work", icon: NAV_ICONS.work, title: t.sidebar.work, desc: h.quickActionWorkDesc }
      : { key: "banks", href: "/banks", icon: NAV_ICONS.banks, title: t.sidebar.banks, desc: h.quickActionBanksDesc },
  ];

  return (
    <div className="px-6 py-8 lg:px-10 lg:py-10">
      <Reveal>
        <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          {displayName ? h.greeting.replace("{name}", displayName) : h.guestGreeting}
        </h1>
        <p className="mt-2 flex items-center gap-2 text-text-muted">
          {h.greetingSubtitle.replace("{country}", countryEntry?.nameDeclined ?? countryEntry?.name ?? country)}
          {countryEntry?.flag && (
            <Image src={getFlagUrl(countryEntry.flag, "sm")} alt={countryEntry.name} width={20} height={15} className="rounded-sm" unoptimized />
          )}
        </p>
      </Reveal>

      <Reveal delay={60} className="mt-6">
        <FlightProgress />
      </Reveal>

      <Reveal delay={100} className="mt-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label={t.dashboard.overallProgress} value={`${loading ? 0 : progressPercent}%`} />
          <StatCard label={h.stepsLabel} value={`${completed.size}/${checklistSteps.length}`} />
          <StatCard label={h.phaseLabel} value={currentPhaseLabel} compact />
          <StatCard label={h.daysLabel} value={daysSinceJoining !== null ? String(daysSinceJoining) : "—"} />
        </div>
      </Reveal>

      <Reveal delay={140} className="mt-8">
        <h2 className="text-lg font-semibold text-text-primary">{h.quickActionsHeading}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Link
              key={action.key}
              href={action.href}
              className="group rounded-2xl border border-border-subtle bg-surface-1 p-5 transition-[transform,border-color,background-color] duration-200 ease-[var(--ease-out-strong)] hover:-translate-y-1 hover:border-accent/40 hover:bg-surface-hover"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent-bright transition-transform duration-200 ease-[var(--ease-out-strong)] group-hover:scale-105">
                {action.icon}
              </span>
              <p className="mt-3 text-sm font-semibold text-text-primary">{action.title}</p>
              <p className="mt-1 text-xs text-text-muted">{action.desc}</p>
            </Link>
          ))}
        </div>
      </Reveal>

      <Reveal delay={180} className="mt-8">
        <div className="rounded-2xl border border-border-subtle bg-surface-1 p-6">
          <p className="text-sm font-semibold text-text-primary">{t.profile.currentStepLabel}</p>
          {currentStep ? (
            <Link
              href={`/dashboard#${currentStep.documentType}`}
              className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-accent/30 bg-accent/[0.06] px-4 py-3 transition-colors duration-150 hover:border-accent/50"
            >
              <div>
                <p className="text-sm font-medium text-text-primary">{currentStep.title}</p>
                <p className="mt-0.5 text-xs text-text-muted">{currentStep.description}</p>
              </div>
              <span className="flex-shrink-0 text-sm font-semibold text-accent-bright">{h.currentStepCta}</span>
            </Link>
          ) : (
            <p className="mt-3 text-sm font-medium text-text-primary">{t.profile.allStepsDone}</p>
          )}
        </div>
      </Reveal>
    </div>
  );
}
