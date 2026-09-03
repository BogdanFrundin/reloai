// The route-option card design first built for /onboarding/results. Pulled
// out into its own file so anywhere else that needs to show "the route,
// exactly as it looked when you picked it in the questionnaire" (e.g.
// RouteSelectModal.tsx, opened from /profile) renders the identical
// component instead of a re-approximation of it.
"use client";

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
      className={`group relative flex h-full flex-col rounded-[28px] bg-[#1c1f26] p-6 transition-[transform,box-shadow,background-color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#20242d] [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_16px_36px_-14px_rgba(33,85,212,0.4)] motion-reduce:transition-none ${
        isRecommended ? "ring-1 ring-accent/50" : ""
      }`}
    >
      {isCurrentSelection ? (
        <span className="absolute -top-3 left-6 rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-semibold text-white shadow-[0_0_16px_-4px_rgba(16,185,129,0.6)]">
          {labels.results.currentRoute}
        </span>
      ) : isRecommended ? (
        <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-white shadow-[0_0_16px_-4px_var(--accent)]">
          {route.badge ?? labels.results.recommended}
        </span>
      ) : (
        route.badge && (
          <span className="absolute -top-3 left-6 rounded-full border border-white/15 bg-[#1c1f26] px-3 py-1 text-[11px] font-semibold text-white/70">
            {route.badge}
          </span>
        )
      )}

      <div className="h-[68px] overflow-hidden">
        <h3 className="text-[19px] font-bold leading-tight text-white">{route.name}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-white/60">{route.description}</p>
      </div>

      {/* The numbers a person actually compares routes by — lead with these,
          bold and colored, so they're the first thing that registers. */}
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <div className="flex min-h-[104px] flex-col items-center justify-center rounded-2xl bg-white/[0.05] px-2 py-3 text-center">
          <p className="text-balance text-[10px] uppercase leading-tight tracking-wide text-white/35">
            {labels.results.approvalRate}
          </p>
          <p className="mt-2 text-3xl font-extrabold leading-none text-accent-bright">{route.approval_rate}%</p>
        </div>
        <div className="flex min-h-[104px] flex-col items-center justify-center rounded-2xl bg-white/[0.05] px-2 py-3 text-center">
          <p className="text-balance text-[10px] uppercase leading-tight tracking-wide text-white/35">
            {labels.results.timeline}
          </p>
          <p className="text-balance mt-2 text-2xl font-extrabold leading-tight text-white">{route.timeline}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <SpeedBadge speed={route.speed} label={speedLabel} />
        <DifficultyBadge difficulty={route.difficulty} label={difficultyLabel} />
      </div>

      {/* No fixed height here (used to be h-[116px] overflow-hidden, which
          silently clipped mid-word for any route with more than ~4 steps --
          e.g. a custom-generated route with 6-7 steps). Let it grow to fit
          every step instead; the grid's items-stretch keeps cards in a row
          the same height regardless. */}
      {route.steps && route.steps.length > 0 && (
        <div className="mt-4 rounded-2xl bg-white/[0.04] p-3.5">
          <p className="text-xs text-white/40">{labels.results.steps}</p>
          <p className="mt-1.5 flex flex-wrap items-center gap-1.5 text-sm font-medium text-white/80">
            {route.steps.map((step, index) => (
              <span key={step} className="flex items-center gap-1.5">
                {index > 0 && <span className="text-white/25">→</span>}
                {step}
              </span>
            ))}
          </p>
        </div>
      )}

      {route.bestFor && (
        <p className="mt-3 line-clamp-2 h-[32px] overflow-hidden text-xs text-white/40">
          {labels.results.bestFor}: <span className="text-white/70">{route.bestFor}</span>
        </p>
      )}

      <div className="mt-auto pt-4 text-center">
        <p className="text-[10px] uppercase tracking-wide text-white/35">{labels.results.cost}</p>
        <p className="mt-1 text-2xl font-extrabold text-white">{route.cost}</p>

        <button
          onClick={() => onSelect(route)}
          disabled={selectingId !== null || isCurrentSelection}
          className="mt-3 w-full rounded-2xl bg-accent py-3 text-sm font-bold text-white transition-colors duration-150 hover:bg-accent-bright disabled:opacity-50"
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
