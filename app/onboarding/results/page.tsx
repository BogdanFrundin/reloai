"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import PageTransition from "../../_components/PageTransition";
import Reveal from "../../_components/Reveal";
import { useAuth } from "../../_components/AuthProvider";
import { useLanguage } from "../../_components/LanguageProvider";
import { RouteCard } from "../../_components/RouteCard";
import { fireConfetti } from "../../_lib/confetti";
import { applySelectedRoute } from "../../_lib/applySelectedRoute";
import type { Route } from "../../api/route/route";
import { generateRoutes } from "../../_lib/routeEngine";
import type { CitizenshipGroup } from "../../_lib/citizenshipGroups";

export default function OnboardingResultsPage() {
  const router = useRouter();
  const { user, profile, refreshProfile } = useAuth();
  const { t, lang } = useLanguage();
  const [selectingId, setSelectingId] = useState<string | null>(null);
  const [selectError, setSelectError] = useState(false);
  const confettiFiredRef = useRef(false);

  // The profile sitting in AuthProvider's context can be stale here:
  // finishOnboarding() (app/onboarding/page.tsx) writes the just-answered
  // citizenship/goal fields straight to Postgres via upsert(), which is a
  // plain DB write, not an auth event — it never fires AuthProvider's
  // onAuthStateChange listener, so nothing else was pulling the fresh row
  // in. In practice that meant this page was often waiting on a fetch that
  // was never actually in flight. Force one the instant this page mounts so
  // the wait is a real, immediate request instead of an indefinite stall.
  useEffect(() => {
    refreshProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount only; refreshProfile's identity changes every AuthProvider render
  }, []);

  // Route generation itself is instant (generateRoutes() is a synchronous,
  // rule-based lookup) — the only real wait here is the profile fetch in
  // AuthProvider. There's no genuine byte-by-byte progress to report, so
  // this simulates one: it eases up toward 92% while we wait (fast at
  // first, slowing down the closer it gets, so it never looks "stuck" at a
  // round number) and only the real profile arrival is allowed to push it
  // past that toward 100% — the bar never claims to be done before the data
  // actually is.
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (profile) {
      setLoadingProgress(100);
      return;
    }
    setLoadingProgress(8);
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 92) return prev;
        const remaining = 92 - prev;
        return Math.min(92, prev + Math.max(remaining * 0.1, 0.6));
      });
    }, 150);
    return () => clearInterval(interval);
  }, [profile]);

  // Profile is missing the fields the route engine needs (e.g. onboarding was
  // exited before citizenship/goal were answered) — never happens on the
  // normal flow since finishOnboarding() always fills in defaults, but guards
  // against direct navigation or stale accounts.
  const profileIncomplete = !!profile && (!profile.citizenship_group || !profile.goal);

  const routes =
    profile && !profileIncomplete
      ? generateRoutes({
          citizenshipGroup: profile.citizenship_group as CitizenshipGroup | null,
          goals: profile.goals?.length ? profile.goals : profile.goal ? [profile.goal] : null,
          hasJobOffer: profile.job_offer === "yes",
          ukraineScenario: profile.ukraine_scenario,
          citizenship: profile.citizenship,
          belarusScenario: profile.belarus_scenario,
          georgiaScenario: profile.georgia_scenario,
          moldovaScenario: profile.moldova_scenario,
          uzbekistanScenario: profile.uzbekistan_scenario,
          turkeyScenario: profile.turkey_scenario,
          kazakhstanScenario: profile.kazakhstan_scenario,
        })
      : null;

  useEffect(() => {
    if (routes && !confettiFiredRef.current) {
      confettiFiredRef.current = true;
      fireConfetti();
    }
  }, [routes]);

  async function handleSelectRoute(route: Route) {
    if (!user) return;

    setSelectingId(route.name);
    setSelectError(false);

    try {
      await applySelectedRoute({ userId: user.id, profile, route, lang });
      await refreshProfile();
      router.push("/home");
    } catch (err) {
      console.error("Failed to save selected route:", err);
      setSelectError(true);
      setSelectingId(null);
    }
  }

  if (!user) {
    return (
      <PageTransition>
        <div className="flex min-h-screen items-center justify-center">
          <svg className="h-6 w-6 animate-spin text-accent-bright" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="relative flex min-h-dvh flex-col overflow-x-hidden px-6 py-10">
        <div
          aria-hidden
          className="animate-blob-drift absolute left-1/2 top-1/4 -z-10 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 opacity-70 blur-[120px] motion-reduce:animate-none"
        />

        <div className="mx-auto flex w-full max-w-4xl flex-col">
          <div className="mb-12 text-center">
            <Reveal>
              <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">{t.onboarding.results.heading}</h1>
            </Reveal>
          </div>

          {!profile && (
            <Reveal>
              <div className="flex flex-col items-center justify-center gap-5 py-20">
                <svg className="h-10 w-10 animate-spin text-accent-bright" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                <div className="flex flex-col items-center gap-2">
                  <div className="relative h-1.5 w-56 overflow-hidden rounded-full bg-white/10">
                    <span
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent to-accent-bright transition-[width] duration-150 ease-out"
                      style={{ width: `${Math.round(loadingProgress)}%` }}
                    />
                  </div>
                  <p className="text-xs font-semibold tabular-nums text-accent-bright">{Math.round(loadingProgress)}%</p>
                </div>
                <p className="text-sm text-text-muted">{t.onboarding.results.loading}</p>
              </div>
            </Reveal>
          )}

          {profileIncomplete && (
            <Reveal>
              <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                <p className="max-w-md text-text-muted">{t.onboarding.results.incompleteHeading}</p>
                <button
                  onClick={() => router.push("/onboarding")}
                  className="rounded-2xl bg-accent px-6 py-3 text-sm font-bold text-white transition-colors duration-150 hover:bg-accent-bright"
                >
                  {t.onboarding.results.incompleteCta}
                </button>
              </div>
            </Reveal>
          )}

          {selectError && (
            <Reveal>
              <p className="mb-6 text-center text-sm text-red-400">{t.onboarding.results.selectError}</p>
            </Reveal>
          )}

          {routes && (
            <div className="grid gap-6 sm:grid-cols-3">
              {routes.map((route, index) => (
                <Reveal key={route.name} delay={index * 100} className="h-full">
                  <RouteCard
                    route={route}
                    isRecommended={route.recommended}
                    onSelect={handleSelectRoute}
                    selectingId={selectingId}
                    labels={t.onboarding}
                  />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
