"use client";

import { Fragment } from "react";
import { useLanguage } from "./LanguageProvider";
import type { Phase, PhaseKey, PhaseStatus } from "../_lib/checklist";

const CHECK_ICON = (
  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
    <path d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.6 3.6 6.7-6.7a1 1 0 011.4 0z" />
  </svg>
);

const LOCK_ICON = (
  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
    />
  </svg>
);

function StepperNode({ status }: { status: PhaseStatus }) {
  if (status === "done") {
    return (
      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-400 text-white">
        {CHECK_ICON}
      </span>
    );
  }

  if (status === "in_progress") {
    return (
      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-accent-bright bg-accent/15">
        <span className="h-2.5 w-2.5 rounded-full bg-accent-bright animate-glow-pulse motion-reduce:animate-none" />
      </span>
    );
  }

  return (
    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-border-strong bg-surface-1 text-text-muted">
      {LOCK_ICON}
    </span>
  );
}

export default function PhaseStepper({
  phases,
  phaseStatuses,
}: {
  phases: Phase[];
  phaseStatuses: Record<PhaseKey, PhaseStatus>;
}) {
  const { t } = useLanguage();

  const columns = phases.map((_, i) => (i === phases.length - 1 ? "4.5rem" : "4.5rem 1fr")).join(" ");

  return (
    <div className="grid" style={{ gridTemplateColumns: columns }}>
      {phases.map((phase, index) => {
        const status = phaseStatuses[phase.key];
        const isLast = index === phases.length - 1;
        const nodeCol = index * 2 + 1;

        return (
          <Fragment key={phase.key}>
            <div style={{ gridColumn: nodeCol, gridRow: 1 }} className="flex justify-center">
              <StepperNode status={status} />
            </div>
            {!isLast && (
              <div
                style={{ gridColumn: nodeCol + 1, gridRow: 1 }}
                className={`h-0.5 self-center transition-colors duration-300 ${
                  status === "done" ? "bg-emerald-400" : "bg-surface-2"
                }`}
              />
            )}
            <div style={{ gridColumn: nodeCol, gridRow: 2 }} className="mt-2 px-1">
              <p className="truncate text-center text-[11px] font-medium text-text-muted">
                {t.dashboard.phases[phase.key]}
              </p>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
