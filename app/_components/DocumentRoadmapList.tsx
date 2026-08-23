"use client";

import { useState } from "react";
import type { DocumentRoadmapEntry, DocumentRoadmapSection } from "../_lib/documentRoadmap";
import { GuideDetails } from "./DocumentGuideList";
import { pressScale } from "../_lib/motion";

const URGENCY_TEXT_CLASS: Record<"urgent" | "upcoming" | "future", string> = {
  urgent: "text-red-400",
  upcoming: "text-amber-400",
  future: "text-text-muted",
};

const CHEVRON_ICON = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const WARNING_ICON = (
  <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 3.75h.008v.008H12v-.008zM9.401 3.6l-8.2 14.2A1.5 1.5 0 002.5 20h19a1.5 1.5 0 001.3-2.2l-8.2-14.2a1.5 1.5 0 00-2.6 0z" />
  </svg>
);

const CHECK_ICON = (
  <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.6 3.6 6.7-6.7a1 1 0 011.4 0z" />
  </svg>
);

function capitalize(text: string): string {
  return text.length > 0 ? text[0].toUpperCase() + text.slice(1) : text;
}

function StatusBadge({ done }: { done: boolean }) {
  return (
    <span
      className={`inline-flex flex-shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
        done
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
          : "border-border-strong bg-surface-1 text-text-muted"
      }`}
    >
      {done && CHECK_ICON}
      {done ? "Готово" : "Не начато"}
    </span>
  );
}

function StepRow({
  entry,
  done,
  onToggle,
}: {
  entry: DocumentRoadmapEntry;
  done: boolean;
  onToggle?: (documentId: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const { guide } = entry;

  return (
    <div id={`guide-${guide.id}`} className="scroll-mt-24 rounded-2xl border border-border-subtle bg-surface-1">
      <div className="flex items-center gap-4 p-4">
        <span
          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${
            done ? "bg-emerald-500 text-white" : "bg-accent text-white"
          }`}
        >
          {entry.stepNumber}
        </span>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          className="min-w-0 flex-1 text-left"
        >
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-text-primary">{guide.name}</p>
            {entry.warning && (
              <span className="text-amber-400" aria-label="Требует срочного внимания">
                {WARNING_ICON}
              </span>
            )}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-text-muted">
            <span className="rounded-full border border-border-subtle px-2 py-0.5 capitalize">{capitalize(guide.category)}</span>
            <span>{entry.timingLabel}</span>
            {entry.dateLabel && (
              <span className={`font-semibold ${entry.urgency ? URGENCY_TEXT_CLASS[entry.urgency] : "text-text-muted"}`}>
                {entry.dateLabel}
              </span>
            )}
          </div>
          {entry.warning && <p className="mt-1 text-xs font-medium text-amber-400">{entry.warning}</p>}
        </button>

        <div className="flex flex-shrink-0 items-center gap-2" onClick={(event) => event.stopPropagation()}>
          <button
            type="button"
            onClick={() => onToggle?.(`guide-${guide.id}`)}
            aria-pressed={done}
            className="flex-shrink-0"
          >
            <StatusBadge done={done} />
          </button>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            className={`flex flex-shrink-0 items-center gap-1 rounded-full bg-accent px-3.5 py-1.5 text-xs font-semibold text-white transition-colors duration-150 hover:bg-accent-bright ${pressScale}`}
          >
            {open ? "Свернуть" : "Начать"}
            <span className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`}>{CHEVRON_ICON}</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border-subtle px-4 py-4">
          <GuideDetails guide={guide} />
        </div>
      )}
    </div>
  );
}

export default function DocumentRoadmapList({
  sections,
  completed,
  onToggle,
  loading,
  emptyText,
}: {
  sections: DocumentRoadmapSection[];
  completed: Set<string>;
  onToggle?: (documentId: string) => void;
  loading: boolean;
  emptyText: string;
}) {
  if (loading) {
    return <p className="text-sm text-text-muted">Загрузка…</p>;
  }

  if (sections.length === 0) {
    return <p className="text-sm text-text-muted">{emptyText}</p>;
  }

  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <div key={section.key}>
          <h3 className="mb-3 text-sm font-semibold text-text-secondary">{section.title}</h3>
          <div className="space-y-3">
            {section.entries.map((entry) => (
              <StepRow
                key={entry.guide.id}
                entry={entry}
                done={completed.has(`guide-${entry.guide.id}`)}
                onToggle={onToggle}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
