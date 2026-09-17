"use client";

import type { Route } from "../api/route/route";
import type { Dictionary } from "../_lib/i18n";

export function RouteSummaryCard({
  route,
  labels,
}: {
  route: Route;
  labels: Dictionary["onboarding"];
}) {
  const speedLabel =
    route.speed === "fast"
      ? labels.results.speedFast
      : route.speed === "medium"
        ? labels.results.speedMedium
        : labels.results.speedSlow;

  const difficultyLabel =
    route.difficulty === "easy"
      ? labels.results.difficultyEasy
      : route.difficulty === "medium"
        ? labels.results.difficultyMedium
        : labels.results.difficultyHard;

  const speedColors =
    route.speed === "fast"
      ? "bg-emerald-500/15 text-emerald-400"
      : route.speed === "medium"
        ? "bg-amber-500/15 text-amber-400"
        : "bg-red-500/15 text-red-400";

  const difficultyColors =
    route.difficulty === "easy"
      ? "bg-emerald-500/15 text-emerald-400"
      : route.difficulty === "medium"
        ? "bg-amber-500/15 text-amber-400"
        : "bg-red-500/15 text-red-400";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-purple-500/10 via-[#1c1f26] to-[#1c1f26] p-6 shadow-lg shadow-accent/20">
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-purple-300 to-purple-200 bg-clip-text text-transparent">
              {route.name}
            </h3>
            <p className="mt-1.5 text-sm text-text-muted">{route.description}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${speedColors}`}>
            {speedLabel}
          </span>
          <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${difficultyColors}`}>
            {difficultyLabel}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-text-muted">{labels.results.approvalRate}</p>
            <p className="mt-2 text-2xl font-bold text-purple-300">{route.approval_rate}%</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-text-muted">{labels.results.timeline}</p>
            <p className="text-balance mt-2 text-lg font-bold text-white">{route.timeline}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-text-muted">{labels.results.cost}</p>
            <p className="mt-2 text-2xl font-bold text-white">{route.cost}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
