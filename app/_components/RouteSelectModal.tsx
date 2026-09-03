"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "./AuthProvider";
import { useLanguage } from "./LanguageProvider";
import { RouteCard } from "./RouteCard";
import { generateRoutes } from "../_lib/routeEngine";
import { applySelectedRoute } from "../_lib/applySelectedRoute";
import type { CitizenshipGroup } from "../_lib/citizenshipGroups";
import type { Route } from "../api/route/route";

const CLOSE_ICON = (
  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
  </svg>
);

// Re-picking a route from /profile without leaving the page. Deliberately
// regenerates all 3 tiers from the user's current profile — same
// generateRoutes() call and the same shared RouteCard component as
// /onboarding/results — so what's shown here is pixel-identical to what the
// user saw in the questionnaire, not a re-approximation of it.
export default function RouteSelectModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user, profile, refreshProfile } = useAuth();
  const { t, lang } = useLanguage();
  const [selectingId, setSelectingId] = useState<string | null>(null);
  const [selectError, setSelectError] = useState(false);

  // `open` only ever becomes true from a client-side click after hydration,
  // so document.body is always available here — no mount-detection needed.
  if (!open) return null;

  const routes = profile
    ? generateRoutes({
        citizenshipGroup: profile.citizenship_group as CitizenshipGroup | null,
        goals: profile.goals?.length ? profile.goals : profile.goal ? [profile.goal] : null,
        hasJobOffer: profile.job_offer === "yes",
      })
    : [];

  async function handleSelect(route: Route) {
    if (!user) return;
    setSelectingId(route.name);
    setSelectError(false);
    try {
      await applySelectedRoute({ userId: user.id, profile, route, lang });
      await refreshProfile();
      setSelectingId(null);
      onClose();
    } catch (err) {
      console.error("Failed to save selected route:", err);
      setSelectError(true);
      setSelectingId(null);
    }
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-[opacity] duration-150 ease-[var(--ease-out-strong)] starting:opacity-0"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="max-h-[95vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-border-subtle bg-panel p-4 shadow-2xl shadow-black/40 transition-[opacity,transform] duration-150 ease-[var(--ease-out-strong)] starting:opacity-0 starting:scale-95 sm:p-5"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-text-primary">{t.onboarding.results.heading}</h2>
            <p className="mt-0.5 text-xs text-text-muted">{t.profile.routeModalSubheading}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.common.cancelBtn}
            className="flex-shrink-0 rounded-full border border-border-strong bg-surface-1 p-2 text-text-muted transition-colors duration-150 hover:border-border-strong hover:text-text-primary"
          >
            {CLOSE_ICON}
          </button>
        </div>

        {selectError && <p className="mt-3 text-sm text-red-400">{t.onboarding.results.selectError}</p>}

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {routes.map((route) => (
            <RouteCard
              key={route.name}
              route={route}
              isRecommended={route.recommended}
              onSelect={handleSelect}
              selectingId={selectingId}
              labels={t.onboarding}
              isCurrentSelection={profile?.selected_route?.name === route.name}
            />
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}
