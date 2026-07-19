"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageTransition from "../../_components/PageTransition";
import Reveal from "../../_components/Reveal";
import { useAuth } from "../../_components/AuthProvider";
import { useLanguage } from "../../_components/LanguageProvider";
import { pressScale } from "../../_lib/motion";
import { supabase } from "../../../lib/supabase";
import type { Dictionary } from "../../_lib/i18n";
import type { Route, RouteEngineResult } from "../../api/route/route";

const CLIENT_FETCH_TIMEOUT_MS = 20000;

function SpeedBadge({ speed, label }: { speed: string; label: string }) {
  const colors =
    speed === "fast"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
      : speed === "medium"
        ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
        : "border-red-500/30 bg-red-500/10 text-red-400";

  return <span className={`inline-block rounded-full border px-2.5 py-1 text-xs font-semibold ${colors}`}>{label}</span>;
}

function DifficultyBadge({ difficulty, label }: { difficulty: string; label: string }) {
  const colors =
    difficulty === "easy"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
      : difficulty === "medium"
        ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
        : "border-red-500/30 bg-red-500/10 text-red-400";

  return <span className={`inline-block rounded-full border px-2.5 py-1 text-xs font-semibold ${colors}`}>{label}</span>;
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
      className={`relative flex flex-col rounded-2xl border p-6 backdrop-blur-sm transition-[border-color,box-shadow] duration-200 ${
        isRecommended
          ? "border-accent/60 bg-accent/[0.06] shadow-[0_0_40px_-14px_var(--accent)]"
          : "border-white/10 bg-white/[0.03]"
      }`}
    >
      {isRecommended && (
        <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-white shadow-[0_0_16px_-4px_var(--accent)]">
          {labels.results.recommended}
        </span>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">{route.name}</h3>
          <p className="mt-1 text-sm text-slate-300">{route.description}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <SpeedBadge speed={route.speed} label={speedLabel} />
        <DifficultyBadge difficulty={route.difficulty} label={difficultyLabel} />
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3 text-sm">
        <div>
          <p className="text-xs text-slate-500">{labels.results.approvalRate}</p>
          <p className="mt-1 font-semibold text-slate-200">{route.approval_rate}%</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">{labels.results.timeline}</p>
          <p className="mt-1 font-semibold text-slate-200">{route.timeline}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">{labels.results.cost}</p>
          <p className="mt-1 font-semibold text-slate-200">{route.cost}</p>
        </div>
      </div>

      <button
        onClick={() => onSelect(route)}
        disabled={selectingId !== null}
        className="mt-5 w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-accent-bright disabled:opacity-50"
      >
        {selectingId === route.name ? "Selecting..." : labels.results.selectButton}
      </button>
    </div>
  );
}

export default function OnboardingResultsPage() {
  const router = useRouter();
  const { user, profile, refreshProfile } = useAuth();
  const { t } = useLanguage();
  const [result, setResult] = useState<RouteEngineResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectingId, setSelectingId] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    if (!user || !profile) return;
    let active = true;

    async function loadRoutes() {
      setLoading(true);
      setError(false);

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), CLIENT_FETCH_TIMEOUT_MS);

      try {
        const response = await fetch("/api/route", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            citizenship: profile?.citizenship,
            current_country: profile?.current_country,
            country: profile?.country,
            goal: profile?.goal,
            language: profile?.language,
          }),
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Route API returned ${response.status}`);
        }

        const data = (await response.json()) as RouteEngineResult;
        if (!active) return;
        setResult(data);
      } catch (err) {
        if (!active) return;
        console.error("Failed to load relocation routes:", err);
        setError(true);
      } finally {
        clearTimeout(timeout);
        if (active) setLoading(false);
      }
    }

    loadRoutes();
    return () => {
      active = false;
    };
  }, [user, profile, retryKey]);

  async function handleSelectRoute(route: Route) {
    if (!user) return;

    setSelectingId(route.name);

    try {
      await supabase.from("profiles").update({ selected_route: route }).eq("id", user.id);
      await refreshProfile();
      router.push("/dashboard?welcome=1");
    } catch (err) {
      console.error("Failed to save selected route:", err);
      setError(true);
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
      <div className="relative flex min-h-screen flex-col overflow-hidden px-6 py-10">
        <div
          aria-hidden
          className="animate-blob-drift absolute left-1/2 top-1/4 -z-10 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 opacity-70 blur-[120px] motion-reduce:animate-none"
        />

        <div className="mx-auto flex w-full max-w-4xl flex-col">
          <div className="mb-12 text-center">
            <Reveal>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{t.onboarding.results.heading}</h1>
            </Reveal>
          </div>

          {loading && (
            <Reveal>
              <div className="flex flex-col items-center justify-center py-20">
                <svg className="h-8 w-8 animate-spin text-accent-bright" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                <p className="mt-4 text-slate-400">{t.onboarding.results.loading}</p>
              </div>
            </Reveal>
          )}

          {error && !loading && (
            <Reveal>
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center">
                <p className="text-lg font-semibold text-red-400">{t.onboarding.results.errorHeading}</p>
                <p className="mt-2 text-sm text-slate-400">{t.onboarding.results.errorBody}</p>
                <button
                  type="button"
                  onClick={() => setRetryKey((prev) => prev + 1)}
                  className={`mt-5 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-accent-bright ${pressScale}`}
                >
                  {t.onboarding.results.retryButton}
                </button>
              </div>
            </Reveal>
          )}

          {!loading && result && result.routes && (
            <div className="grid gap-6 sm:grid-cols-3">
              {result.routes.map((route, index) => (
                <Reveal key={route.name} delay={index * 100}>
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
