"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";
import HelpButton from "./HelpButton";
import { pressScale } from "../_lib/motion";
import type { Phase, PhaseStatus } from "../_lib/checklist";

const PHASE_ICONS: Record<string, ReactNode> = {
  beforeDeparture: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V6a3 3 0 013-3h1.5a3 3 0 013 3v3M4.5 9h15l-1 10.5a1.5 1.5 0 01-1.494 1.5H6.994A1.5 1.5 0 015.5 19.5L4.5 9z" />
    </svg>
  ),
  legalization: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m-7 5h8a2 2 0 002-2V7a2 2 0 00-2-2H9.5L6 8.5V19a2 2 0 002 2z" />
    </svg>
  ),
  residenceCard: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 8.25v10.5a1.5 1.5 0 001.5 1.5h16.5a1.5 1.5 0 001.5-1.5V8.25M2.25 8.25V6a1.5 1.5 0 011.5-1.5h16.5A1.5 1.5 0 0121.75 6v2.25M6 15h4.5" />
    </svg>
  ),
  workTaxes: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5h18M3 7.5v10.5a1.5 1.5 0 001.5 1.5h15a1.5 1.5 0 001.5-1.5V7.5M8 7.5V5.25A1.5 1.5 0 019.5 3.75h5A1.5 1.5 0 0116 5.25V7.5" />
    </svg>
  ),
};

// Generated plans (see app/_lib/generatedRoadmap.ts) have arbitrary phase
// keys the AI made up, so there's no fixed icon for them — fall back to a
// generic checklist glyph instead of leaving the badge empty.
const DEFAULT_PHASE_ICON = (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

function Checkbox({
  checked,
  onClick,
}: {
  checked: boolean;
  onClick?: () => void;
}) {
  const classes = `flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border transition-colors duration-150 ${
    checked ? "border-accent bg-accent text-white" : "border-border-strong bg-surface-1"
  }`;
  const icon = checked && (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.6 3.6 6.7-6.7a1 1 0 011.4 0z" />
    </svg>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onClick();
        }}
        aria-pressed={checked}
        className={`${classes} cursor-pointer hover:border-accent/60`}
      >
        {icon}
      </button>
    );
  }

  return <span className={classes}>{icon}</span>;
}

function StatusIcon({ status }: { status: PhaseStatus }) {
  if (status === "done") {
    return (
      <svg className="h-5 w-5 flex-shrink-0 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.6 3.6 6.7-6.7a1 1 0 011.4 0z" />
      </svg>
    );
  }

  if (status === "in_progress") {
    return (
      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center">
        <span className="h-2.5 w-2.5 rounded-full bg-accent-bright animate-glow-pulse motion-reduce:animate-none" />
      </span>
    );
  }

  return (
    <svg className="h-5 w-5 flex-shrink-0 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
  );
}

function StatusBadge({ status, label }: { status: PhaseStatus; label: string }) {
  const colors =
    status === "done"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
      : status === "in_progress"
        ? "border-accent/40 bg-accent/10 text-accent-bright"
        : "border-border-strong bg-surface-1 text-text-muted";

  return (
    <span className={`inline-block flex-shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${colors}`}>
      {label}
    </span>
  );
}

const CHEVRON_ICON = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const CALENDAR_ICON = (
  <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3.75 8.25h16.5M4.5 6h15a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75h-15a.75.75 0 01-.75-.75V6.75A.75.75 0 014.5 6z" />
  </svg>
);

const WARNING_ICON = (
  <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 3.75h.008v.008H12v-.008zM9.401 3.6l-8.2 14.2A1.5 1.5 0 002.5 20h19a1.5 1.5 0 001.3-2.2l-8.2-14.2a1.5 1.5 0 00-2.6 0z" />
  </svg>
);

const URGENCY_TEXT_CLASS: Record<"urgent" | "upcoming" | "future", string> = {
  urgent: "text-red-400",
  upcoming: "text-amber-400",
  future: "text-text-muted",
};

export default function PhaseCard({
  phase,
  status,
  index,
  completed,
  onToggleStep,
}: {
  phase: Phase;
  status: PhaseStatus;
  index: number;
  completed: Set<string>;
  onToggleStep?: (documentType: string) => void;
}) {
  const { t } = useLanguage();
  const d = t.dashboard;
  const isDone = status === "done";
  const isActive = status === "in_progress";
  const [expanded, setExpanded] = useState(isActive);
  const showSteps = expanded;

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && phase.steps.some((step) => step.documentType === hash)) {
      setExpanded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount only, to react to the URL the page was loaded with
  }, []);

  useEffect(() => {
    if (!showSteps) return;
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [showSteps]);

  const statusLabel = isDone ? d.phaseStatus.done : isActive ? d.phaseStatus.inProgress : d.phaseStatus.waiting;

  const doneStepsCount = phase.steps.filter((s) => completed.has(s.documentType)).length;
  const nextStepId = phase.steps.find((s) => !completed.has(s.documentType))?.documentType;

  function renderSteps() {
    return (
      <div className="mt-4 flex flex-col gap-1">
        {phase.steps.map((step) => {
          const checked = completed.has(step.documentType);
          const guide = d.stepGuides[step.documentType];
          const isNext = isActive && step.documentType === nextStepId;
          const isFuture = !checked && !isNext;
          return (
            <div
              key={step.documentType}
              id={step.documentType}
              className={`flex scroll-mt-24 items-start gap-3 rounded-xl border p-3 transition-colors duration-150 ${
                isNext ? "border-accent/25 bg-accent/[0.08]" : "border-transparent"
              } ${isFuture ? "opacity-50" : ""}`}
            >
              <span className="mt-0.5 flex-shrink-0" aria-hidden={!onToggleStep}>
                <Checkbox
                  checked={checked}
                  onClick={onToggleStep ? () => onToggleStep(step.documentType) : undefined}
                />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  {step.stepNumber && (
                    <span className="flex-shrink-0 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-bold text-accent-bright">
                      Шаг {step.stepNumber}
                    </span>
                  )}
                  <p className={`text-sm font-medium ${checked ? "text-text-muted" : "text-text-primary"}`}>{step.title}</p>
                  {step.dateLabel && (
                    <span
                      className={`flex items-center gap-1 text-xs font-semibold ${
                        step.urgency ? URGENCY_TEXT_CLASS[step.urgency] : "text-text-muted"
                      }`}
                    >
                      {CALENDAR_ICON}
                      {step.dateLabel}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-text-muted">{step.description}</p>
                {step.warning && (
                  <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-400">
                    {WARNING_ICON}
                    {step.warning}
                  </p>
                )}
              </div>
              <div className="flex flex-shrink-0 items-center gap-2" onClick={(event) => event.stopPropagation()}>
                {(step.documentType === "documents" || step.linkToDocuments) && (
                  <Link
                    href={step.linkAnchor ? `/documents#${step.linkAnchor}` : "/documents"}
                    onClick={(event) => event.stopPropagation()}
                    className={
                      isNext
                        ? `flex-shrink-0 rounded-full bg-accent px-3.5 py-1.5 text-xs font-semibold text-white transition-colors duration-150 hover:bg-accent-bright ${pressScale}`
                        : "flex-shrink-0 rounded-full border border-border-strong bg-surface-1 px-3 py-1.5 text-xs font-semibold text-text-primary transition-colors duration-150 hover:border-accent/40 hover:text-accent-bright"
                    }
                  >
                    {d.openBtn}
                  </Link>
                )}
                {guide && (
                  <HelpButton
                    compact
                    guideHeading={guide.heading}
                    guideSteps={guide.steps}
                    aiQuestion={d.howToGetQuestion.replace("{title}", step.title)}
                    label={t.helpButton.label}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (isActive) {
    return (
      <Reveal delay={index * 60}>
        <div className="relative flex w-full flex-col overflow-hidden rounded-2xl border border-accent/60 bg-accent/[0.05] p-5 shadow-[0_0_40px_-12px_var(--accent)] transition-[border-color,opacity,background-color] duration-200 ease-[var(--ease-out-strong)]">
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-1.5 rounded-t-2xl bg-gradient-to-r from-accent via-accent-bright to-accent shadow-[0_0_12px_-1px_var(--accent-bright)]"
          />
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
            aria-label={expanded ? d.collapseBtn : d.expandBtn}
            className="flex w-full items-center justify-between gap-3 text-left"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-accent/15 text-sm font-semibold text-accent-bright">
                0{index + 1}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-text-primary">{phase.title}</p>
                <p className="mt-0.5 text-xs text-text-muted">
                  {d.stepsCompletedTemplate.replace("{done}", String(doneStepsCount)).replace("{total}", String(phase.steps.length))}
                </p>
              </div>
            </div>
            <div className="flex flex-shrink-0 items-center gap-2">
              <StatusBadge status={status} label={statusLabel} />
              <span className={`text-text-muted transition-transform duration-150 ${expanded ? "rotate-180" : ""}`}>
                {CHEVRON_ICON}
              </span>
            </div>
          </button>

          <div className="mt-4 flex gap-1">
            {phase.steps.map((step, i) => (
              <div
                key={step.documentType}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i < doneStepsCount ? "bg-accent" : "bg-surface-2"}`}
              />
            ))}
          </div>

          {showSteps && renderSteps()}
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal delay={index * 60}>
      <div
        className={`relative flex w-full flex-col overflow-hidden rounded-2xl transition-[border-color,opacity,background-color] duration-200 ease-[var(--ease-out-strong)] ${
          isDone
            ? "border border-border-subtle border-l-4 border-l-emerald-400 bg-emerald-500/[0.03] p-5"
            : "border border-border-subtle bg-surface-1 p-5 opacity-[0.48]"
        }`}
      >
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          aria-label={expanded ? d.collapseBtn : d.expandBtn}
          className="flex w-full items-center gap-3 text-left"
        >
          <span
            className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${
              isDone ? "bg-emerald-500/15 text-emerald-400" : "bg-surface-2 text-text-muted"
            }`}
          >
            {PHASE_ICONS[phase.key] ?? DEFAULT_PHASE_ICON}
          </span>
          <span className="min-w-0 flex-1 truncate text-sm font-semibold text-text-primary">{phase.title}</span>
          <span className="flex-shrink-0 text-xs font-medium text-text-muted">
            {d.stepsCompletedTemplate
              .replace("{done}", String(doneStepsCount))
              .replace("{total}", String(phase.steps.length))}
          </span>
          <span className={`flex-shrink-0 text-text-muted transition-transform duration-150 ${expanded ? "rotate-180" : ""}`}>
            {CHEVRON_ICON}
          </span>
        </button>

        {showSteps && renderSteps()}
      </div>
    </Reveal>
  );
}
