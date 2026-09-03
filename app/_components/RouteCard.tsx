// The route-option card design first built for /onboarding/results. Pulled
// out into its own file so anywhere else that needs to show "the route,
// exactly as it looked when you picked it in the questionnaire" (e.g.
// RouteSelectModal.tsx, opened from /profile) renders the identical
// component instead of a re-approximation of it.
"use client";

import { useState } from "react";
import type { Dictionary } from "../_lib/i18n";
import type { Route } from "../api/route/route";

export function SpeedBadge({ speed, label }: { speed: string; label: string }) {
  const colors =
    speed === "fast"
      ? "bg-emerald-500/15 text-emerald-400"
      : speed === "medium"
        ? "bg-amber-500/15 text-amber-400"
        : "bg-red-500/15 text-red-400";

  return <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${colors}`}>{label}</span>;
}

export function DifficultyBadge({ difficulty, label }: { difficulty: string; label: string }) {
  const colors =
    difficulty === "easy"
      ? "bg-emerald-500/15 text-emerald-400"
      : difficulty === "medium"
        ? "bg-amber-500/15 text-amber-400"
        : "bg-red-500/15 text-red-400";

  return <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${colors}`}>{label}</span>;
}

export function RouteCard({
  route,
  isRecommended,
  onSelect,
  selectingId,
  labels,
  // True when this card is the route already saved on the user's profile —
  // used by RouteSelectModal's "re-pick" view so the current choice reads
  // as already selected instead of looking identical to the other two.
  isCurrentSelection,
}: {
  route: Route;
  isRecommended: boolean;
  onSelect: (route: Route) => void;
  selectingId: string | null;
  labels: Dictionary["onboarding"];
  isCurrentSelection?: boolean;
}) {
  const [stepsExpanded, setStepsExpanded] = useState(false);

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

  return (
    <div
      className={`group relative flex h-full flex-col rounded-[24px] bg-[#1c1f26] p-4 transition-[transform,box-shadow,background-color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#20242d] [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_16px_36px_-14px_rgba(33,85,212,0.4)] motion-reduce:transition-none ${
        isRecommended ? "ring-1 ring-accent/50" : ""
      }`}
    >
      {isCurrentSelection ? (
        <span className="absolute -top-2.5 left-5 rounded-full bg-emerald-500 px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-[0_0_16px_-4px_rgba(16,185,129,0.6)]">
          {labels.results.currentRoute}
        </span>
      ) : isRecommended ? (
        <span className="absolute -top-2.5 left-5 rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-[0_0_16px_-4px_var(--accent)]">
          {route.badge ?? labels.results.recommended}
        </span>
      ) : (
        route.badge && (
          <span className="absolute -top-2.5 left-5 rounded-full border border-white/15 bg-[#1c1f26] px-2.5 py-0.5 text-[10px] font-semibold text-white/70">
            {route.badge}
          </span>
        )
      )}

      <div className="h-[50px] overflow-hidden pt-1">
        <h3 className="text-[16px] font-bold leading-tight text-white">{route.name}</h3>
        <p className="mt-1 line-clamp-1 text-xs text-white/60">{route.description}</p>
      </div>

      {/* The numbers a person actually compares routes by — lead with these,
          bold and colored, so they're the first thing that registers. */}
      <div className="mt-2.5 grid grid-cols-2 gap-2">
        <div className="flex min-h-[68px] flex-col items-center justify-center rounded-xl bg-white/[0.05] px-2 py-2 text-center">
          <p className="text-balance text-[9px] uppercase leading-tight tracking-wide text-white/35">
            {labels.results.approvalRate}
          </p>
          <p className="mt-1 text-xl font-semibold leading-none text-accent-bright">{route.approval_rate}%</p>
        </div>
        <div className="flex min-h-[68px] flex-col items-center justify-center rounded-xl bg-white/[0.05] px-1.5 py-2 text-center">
          <p className="text-balance text-[9px] uppercase leading-tight tracking-wide text-white/35">
            {labels.results.timeline}
          </p>
          {/* text-base, not text-xl like the approval-rate number -- longer
              strings like "3-5 месяцев" were pushing right up against the
              edges of this narrower half of the box. */}
          <p className="text-balance mt-1 text-base font-extrabold leading-tight text-white">{route.timeline}</p>
        </div>
      </div>

      <div className="mt-2.5 flex flex-wrap gap-1.5">
        <SpeedBadge speed={route.speed} label={speedLabel} />
        <DifficultyBadge difficulty={route.difficulty} label={difficultyLabel} />
      </div>

      {/* A route can have anywhere from 4 to 9+ steps, so showing every one
          by default made cards wildly different heights (items-stretch just
          filled the shorter cards with dead space instead). Cap the preview
          at 4 and make the "+N" chip a real toggle -- clicking it reveals
          the rest in place, same idea as the program chips on the education
          cards but actually openable instead of a dead-end label. */}
      {route.steps && route.steps.length > 0 && (
        <div className="mt-2.5 min-h-[60px] rounded-xl bg-white/[0.04] p-2.5">
          <p className="text-[10px] text-white/40">{labels.results.steps}</p>
          <p className="mt-1 flex flex-wrap items-center gap-1 text-xs font-medium text-white/80">
            {(stepsExpanded ? route.steps : route.steps.slice(0, 4)).map((step, index) => (
              <span key={step} className="flex items-center gap-1">
                {index > 0 && <span className="text-white/25">→</span>}
                {step}
              </span>
            ))}
            {route.steps.length > 4 && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setStepsExpanded((prev) => !prev);
                }}
                className="flex items-center gap-1 rounded-lg bg-white/[0.08] px-1.5 py-0.5 text-[10px] text-white/50 transition-colors duration-150 hover:bg-white/[0.15] hover:text-white/80"
              >
                {stepsExpanded ? (
                  <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 15l-6-6-6 6" />
                  </svg>
                ) : (
                  `+${route.steps.length - 4}`
                )}
              </button>
            )}
          </p>
        </div>
      )}

      {route.bestFor && (
        <p className="mt-2 line-clamp-1 overflow-hidden text-[10px] text-white/40">
          {labels.results.bestFor}: <span className="text-white/70">{route.bestFor}</span>
        </p>
      )}

      <div className="mt-auto pt-2.5 text-center">
        <p className="text-[9px] uppercase tracking-wide text-white/35">{labels.results.cost}</p>
        <p className="mt-0.5 text-lg font-extrabold text-white">{route.cost}</p>

        <button
          onClick={() => onSelect(route)}
          disabled={selectingId !== null || isCurrentSelection}
          className="mt-2 w-full rounded-xl bg-accent py-2 text-xs font-bold text-white transition-colors duration-150 hover:bg-accent-bright disabled:opacity-50"
        >
          {isCurrentSelection
            ? labels.results.currentRoute
            : selectingId === route.name
              ? labels.results.selecting
              : labels.results.selectButton}
        </button>
      </div>
    </div>
  );
}
