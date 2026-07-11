"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";
import type { Phase, PhaseStatus } from "../_lib/checklist";

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <span
      className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg border transition-colors duration-150 ${
        checked ? "border-accent bg-accent text-white" : "border-white/20 bg-white/5"
      }`}
    >
      {checked && (
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.6 3.6 6.7-6.7a1 1 0 011.4 0z" />
        </svg>
      )}
    </span>
  );
}

function StatusIcon({ status }: { status: PhaseStatus }) {
  if (status === "done") {
    return (
      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.6 3.6 6.7-6.7a1 1 0 011.4 0z" />
        </svg>
      </span>
    );
  }

  if (status === "in_progress") {
    return (
      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10">
        <span className="h-2.5 w-2.5 rounded-full bg-accent-bright animate-glow-pulse motion-reduce:animate-none" />
      </span>
    );
  }

  return (
    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-400">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
        />
      </svg>
    </span>
  );
}

function StatusBadge({ status, label }: { status: PhaseStatus; label: string }) {
  const colors =
    status === "done"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
      : status === "in_progress"
        ? "border-accent/40 bg-accent/10 text-accent-bright"
        : "border-white/15 bg-white/5 text-slate-400";

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

export default function PhaseCard({
  phase,
  status,
  index,
  completed,
  saving,
  onToggle,
}: {
  phase: Phase;
  status: PhaseStatus;
  index: number;
  completed: Set<string>;
  saving: string | null;
  onToggle: (documentType: string) => void;
}) {
  const { t } = useLanguage();
  const d = t.dashboard;
  const [expanded, setExpanded] = useState(status === "in_progress");
  const isWaiting = status === "waiting";

  const statusLabel =
    status === "done" ? d.phaseStatus.done : status === "in_progress" ? d.phaseStatus.inProgress : d.phaseStatus.waiting;

  return (
    <Reveal delay={index * 60}>
      <div
        className={`rounded-2xl border backdrop-blur-sm transition-[border-color,box-shadow] duration-200 ease-[var(--ease-out-strong)] ${
          status === "done"
            ? "border-emerald-500/30 bg-emerald-500/[0.04]"
            : isWaiting
              ? "border-white/10 bg-white/[0.03] opacity-60"
              : "border-accent/40 bg-accent/[0.04]"
        }`}
      >
        <button
          type="button"
          onClick={() => !isWaiting && setExpanded((prev) => !prev)}
          disabled={isWaiting}
          aria-expanded={expanded}
          aria-label={expanded ? d.collapseBtn : d.expandBtn}
          className="flex w-full items-center gap-3 px-5 py-4 text-left disabled:cursor-not-allowed"
        >
          <StatusIcon status={status} />
          <span className="flex-1 text-sm font-semibold text-white">{d.phases[phase.key]}</span>
          <StatusBadge status={status} label={statusLabel} />
          {!isWaiting && (
            <span className={`flex-shrink-0 text-slate-400 transition-transform duration-150 ${expanded ? "rotate-180" : ""}`}>
              {CHEVRON_ICON}
            </span>
          )}
        </button>

        {expanded && !isWaiting && (
          <div className="space-y-3 border-t border-white/10 px-5 py-4">
            {phase.steps.map((step) => {
              const checked = completed.has(step.documentType);
              return (
                <div
                  key={step.documentType}
                  className={`flex items-center gap-4 rounded-xl border p-3.5 transition-colors duration-150 ${
                    checked ? "border-emerald-500/30 bg-emerald-500/[0.04]" : "border-white/10 bg-white/[0.03]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => onToggle(step.documentType)}
                    disabled={saving === step.documentType}
                    aria-pressed={checked}
                    aria-label={step.title}
                    className="flex-shrink-0 disabled:opacity-60"
                  >
                    <Checkbox checked={checked} />
                  </button>
                  <div className="flex-1">
                    <p className={`text-sm font-semibold ${checked ? "text-slate-300" : "text-white"}`}>{step.title}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{step.description}</p>
                  </div>
                  {step.documentType === "documents" && (
                    <Link
                      href="/documents"
                      className="flex-shrink-0 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:border-accent/40 hover:text-accent-bright"
                    >
                      {d.openBtn}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Reveal>
  );
}
