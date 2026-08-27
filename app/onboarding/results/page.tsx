"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import PageTransition from "../../_components/PageTransition";
import Reveal from "../../_components/Reveal";
import { useAuth } from "../../_components/AuthProvider";
import { useLanguage } from "../../_components/LanguageProvider";
import { supabase } from "../../../lib/supabase";
import { fireConfetti } from "../../_lib/confetti";
import { createNotification } from "../../_lib/notifications";
import type { Dictionary } from "../../_lib/i18n";
import type { Route } from "../../api/route/route";
import { generateRoutes } from "../../_lib/routeEngine";
import type { CitizenshipGroup } from "../../_lib/citizenshipGroups";

function SpeedBadge({ speed, label }: { speed: string; label: string }) {
  const colors =
    speed === "fast"
      ? "bg-emerald-500/15 text-emerald-400"
      : speed === "medium"
        ? "bg-amber-500/15 text-amber-400"
        : "bg-red-500/15 text-red-400";

  return <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${colors}`}>{label}</span>;
}

function DifficultyBadge({ difficulty, label }: { difficulty: string; label: string }) {
  const colors =
    difficulty === "easy"
      ? "bg-emerald-500/15 text-emerald-400"
      : difficulty === "medium"
        ? "bg-amber-500/15 text-amber-400"
        : "bg-red-500/15 text-red-400";

  return <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${colors}`}>{label}</span>;
}

function RouteCard({
  route,
  isRecommended,
  onSelect,
  selectingId,
  labels,
}: {
  route: Route;
  isRecommended: boolean;
  onSelect: (route: Route) => void;
  selectingId: string | null;
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

  return (
    <div
      className={`group relative flex h-full flex-col rounded-[28px] bg-[#1c1f26] p-6 transition-[transform,box-shadow,background-color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#20242d] [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_16px_36px_-14px_rgba(33,85,212,0.4)] motion-reduce:transition-none ${
        isRecommended ? "ring-1 ring-accent/50" : ""
      }`}
    >
      {isRecommended ? (
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

      {route.steps && route.steps.length > 0 && (
        <div className="mt-4 h-[116px] overflow-hidden rounded-2xl bg-white/[0.04] p-3.5">
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
          disabled={selectingId !== null}
          className="mt-3 w-full rounded-2xl bg-accent py-3 text-sm font-bold text-white transition-colors duration-150 hover:bg-accent-bright disabled:opacity-50"
        >
          {selectingId === route.name ? "Selecting..." : labels.results.selectButton}
        </button>
      </div>
    </div>
  );
}

export default function OnboardingResultsPage() {
  const router = useRouter();
  const { user, profile, refreshProfile } = useAuth();
  const { t, lang } = useLanguage();
  const [selectingId, setSelectingId] = useState<string | null>(null);
  const [selectError, setSelectError] = useState(false);
  const confettiFiredRef = useRef(false);

  // Profile is missing the fields the route engine needs (e.g. onboarding was
  // exited before citizenship/goal were answered) — never happens on the
  // normal flow since finishOnboarding() always fills in defaults, but guards
  // against direct navigation or stale accounts.
  const profileIncomplete = !!profile && (!profile.citizenship_group || !profile.goal);

  const routes =
    profile && !profileIncomplete
      ? generateRoutes({
          citizenshipGroup: profile.citizenship_group as CitizenshipGroup | null,
          goal: profile.goal,
          hasJobOffer: profile.job_offer === "yes",
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

    // A user who already has a selected_route has been through onboarding
    // before -- they're redoing/recreating their roadmap, not registering
    // for the first time. Capture this before we overwrite selected_route
    // below, so the notification wording matches what actually happened.
    const isFirstOnboarding = !profile?.selected_route;

    setSelectingId(route.name);
    setSelectError(false);

    try {
      await supabase
        .from("profiles")
        .update({ selected_route: route, route_steps: route.steps ?? [] })
        .eq("id", user.id);

      // Generate the user's real, personalized step-by-step plan right now
      // (not just the 3-option route summary) so it's already sitting on
      // their profile and driving the dashboard roadmap the moment they land
      // on /home — see app/api/roadmap and DashboardProgressProvider.
      try {
        const roadmapResponse = await fetch("/api/roadmap", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            citizenship: profile?.citizenship,
            current_country: profile?.current_country,
            country: profile?.country,
            city: profile?.city,
            goal: profile?.goal,
            selected_route: route,
            language: lang,
          }),
        });
        if (roadmapResponse.ok) {
          const plan = await roadmapResponse.json();
          // Clear roadmap_completed_steps along with the new plan — those IDs
          // are generated fresh by the AI each time and won't match the old
          // plan's step IDs, so leaving stale ones behind just orphans them
          // and makes progress silently look reset without explanation.
          await supabase
            .from("profiles")
            .update({ roadmap_plan: plan, roadmap_completed_steps: [] })
            .eq("id", user.id);
        }
      } catch (roadmapErr) {
        // Non-fatal — the dashboard falls back to the static checklist if
        // roadmap_plan never gets set, so don't block registration on this.
        console.error("Failed to generate personalized roadmap:", roadmapErr);
      }

      await refreshProfile();

      if (isFirstOnboarding) {
        // The "welcome / thanks for registering" notification already fired
        // once at account creation (see app/register/page.tsx) -- this one
        // is about finishing the onboarding questionnaire, not registering.
        createNotification({
          title: "Анкета заполнена! 🎉",
          message: `Вы успешно заполнили данные анкеты и выбрали план релокации (${route.name}). Вы можете изменить эти данные в любой момент в настройках профиля.`,
          type: "welcome",
        });
      } else {
        createNotification({
          title: "Дорожная карта обновлена ✅",
          message: `Вы пересоздали план релокации (${route.name}). Прогресс по новой дорожной карте начнётся заново — прежние данные анкеты можно посмотреть и изменить в настройках профиля.`,
          type: "checklist",
        });
      }

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
              <div className="flex flex-col items-center justify-center py-20">
                <svg className="h-8 w-8 animate-spin text-accent-bright" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
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
