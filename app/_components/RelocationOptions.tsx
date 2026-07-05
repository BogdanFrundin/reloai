"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import type { Dictionary } from "../_lib/i18n";
import type { Pathway, RouteResult } from "../api/route/route";

function ProbabilityBadge({ value }: { value: number }) {
  const tone =
    value >= 70
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
      : value >= 40
        ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
        : "border-red-500/30 bg-red-500/10 text-red-400";

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${tone}`}>
      {value}%
    </span>
  );
}

function PathwayCard({
  pathway,
  isRecommended,
  expanded,
  onToggle,
  labels,
}: {
  pathway: Pathway;
  isRecommended: boolean;
  expanded: boolean;
  onToggle: () => void;
  labels: Dictionary["dashboard"]["route"];
}) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-5 backdrop-blur-sm transition-[border-color,box-shadow] duration-200 ease-[var(--ease-out-strong)] ${
        isRecommended
          ? "border-accent/60 bg-accent/[0.06] shadow-[0_0_40px_-14px_var(--accent)]"
          : "border-white/10 bg-white/[0.03]"
      }`}
    >
      {isRecommended && (
        <span className="absolute -top-3 left-5 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-white shadow-[0_0_16px_-4px_var(--accent)]">
          {labels.recommended}
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <p className="text-base font-semibold text-white">{pathway.name}</p>
        <ProbabilityBadge value={pathway.successProbability} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-xs text-slate-500">{labels.timeline}</p>
          <p className="mt-0.5 font-medium text-slate-200">{pathway.timeline}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">{labels.cost}</p>
          <p className="mt-0.5 font-medium text-slate-200">{pathway.cost}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onToggle}
        className="mt-4 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:border-accent/40 hover:text-accent-bright"
      >
        {expanded ? labels.hidePlan : labels.viewFullPlan}
      </button>

      {expanded && (
        <div className="mt-4 space-y-4 border-t border-white/10 pt-4 text-sm">
          <p className="text-slate-400">{pathway.eligibility}</p>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{labels.requiredDocuments}</p>
            <ul className="mt-1.5 list-inside list-disc space-y-1 text-slate-300">
              {pathway.requiredDocuments.map((doc) => (
                <li key={doc}>{doc}</li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">{labels.pros}</p>
              <ul className="mt-1.5 list-inside list-disc space-y-1 text-slate-300">
                {pathway.pros.map((pro) => (
                  <li key={pro}>{pro}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-red-400">{labels.cons}</p>
              <ul className="mt-1.5 list-inside list-disc space-y-1 text-slate-300">
                {pathway.cons.map((con) => (
                  <li key={con}>{con}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RelocationOptions({
  route,
  labels,
}: {
  route: RouteResult | null | undefined;
  labels: Dictionary["dashboard"]["route"];
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (!route || !Array.isArray(route.pathways) || route.pathways.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-white">{labels.heading}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {route.pathways.map((pathway, index) => (
          <Reveal key={pathway.name} delay={index * 60}>
            <PathwayCard
              pathway={pathway}
              isRecommended={pathway.name === route.recommended}
              expanded={expanded === pathway.name}
              onToggle={() => setExpanded((prev) => (prev === pathway.name ? null : pathway.name))}
              labels={labels}
            />
          </Reveal>
        ))}
      </div>

      {route.reasoning && (
        <div className="mt-4 rounded-2xl border border-accent/20 bg-accent/[0.04] p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent-bright">{labels.reasoningTitle}</p>
          <p className="mt-1.5 text-sm text-slate-300">{route.reasoning}</p>
        </div>
      )}
    </div>
  );
}
