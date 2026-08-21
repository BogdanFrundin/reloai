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
import type { Route, RouteEngineResult } from "../../api/route/route";

const OPENAI_TIMEOUT_MS = 5000;
const FAKE_LOADING_MS = 3000;

const STATIC_FALLBACK_ROUTES: Route[] = [
  {
    name: "Быстрый маршрут",
    description: "Самый быстрый путь для тех, кто уже нашёл работу в Польше.",
    speed: "fast",
    cost: "€300–800",
    difficulty: "easy",
    approval_rate: 80,
    documents_needed: ["Виза", "PESEL", "Банк", "Работа"],
    timeline: "3-6 месяцев",
    recommended: false,
    reason: "Оптимальный вариант, если у вас уже есть предложение о работе.",
    steps: ["Виза", "PESEL", "Банк", "Работа"],
    bestFor: "работа по найму",
  },
  {
    name: "Стандартный маршрут",
    description: "Полный путь легализации для тех, кто планирует остаться в Польше надолго.",
    speed: "medium",
    cost: "€800–2000",
    difficulty: "medium",
    approval_rate: 65,
    documents_needed: ["Виза", "Карта побыту", "PESEL", "Банк", "Жильё", "Работа"],
    timeline: "6-12 месяцев",
    recommended: true,
    reason: "Самый сбалансированный маршрут для долгосрочного переезда.",
    steps: ["Виза", "Карта побыту", "PESEL", "Банк", "Жильё", "Работа"],
    bestFor: "долгосрочное проживание",
  },
  {
    name: "Бизнес маршрут",
    description: "Путь для предпринимателей, которые хотят открыть бизнес в Польше.",
    speed: "medium",
    cost: "€1500–4000",
    difficulty: "hard",
    approval_rate: 55,
    documents_needed: ["Виза", "PESEL", "Банк", "Регистрация компании", "ВНЖ"],
    timeline: "6-9 месяцев",
    recommended: false,
    reason: "Подходит для тех, кто хочет вести бизнес и получить ВНЖ через компанию.",
    steps: ["Виза", "PESEL", "Банк", "Регистрация компании", "ВНЖ"],
    bestFor: "открытие бизнеса",
  },
];

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
      className={`relative flex h-full flex-col rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300 ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1.5 [@media(hover:hover)_and_(pointer:fine)]:hover:scale-[1.02] motion-reduce:transition-none motion-reduce:transform-none ${
        isRecommended
          ? "border-accent/60 bg-accent/[0.06] shadow-[0_0_40px_-14px_var(--accent)] [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_0_60px_-8px_var(--accent)]"
          : "border-border-subtle bg-surface-1 [@media(hover:hover)_and_(pointer:fine)]:hover:border-accent/50 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_12px_32px_-12px_rgba(33,85,212,0.45)]"
      }`}
    >
      {isRecommended && (
        <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-white shadow-[0_0_16px_-4px_var(--accent)]">
          {labels.results.recommended}
        </span>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="min-h-[92px] flex-1">
          <h3 className="text-lg font-semibold text-text-primary">{route.name}</h3>
          <p className="mt-1 line-clamp-3 text-sm text-text-secondary">{route.description}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <SpeedBadge speed={route.speed} label={speedLabel} />
        <DifficultyBadge difficulty={route.difficulty} label={difficultyLabel} />
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3 text-sm">
        <div>
          <p className="text-xs text-text-muted">{labels.results.approvalRate}</p>
          <p className="mt-1 font-semibold text-text-secondary">{route.approval_rate}%</p>
        </div>
        <div>
          <p className="text-xs text-text-muted">{labels.results.timeline}</p>
          <p className="mt-1 font-semibold text-text-secondary">{route.timeline}</p>
        </div>
        <div>
          <p className="text-xs text-text-muted">{labels.results.cost}</p>
          <p className="mt-1 font-semibold text-text-secondary">{route.cost}</p>
        </div>
      </div>

      {route.steps && route.steps.length > 0 && (
        <div className="mt-4 min-h-[86px]">
          <p className="text-xs text-text-muted">{labels.results.steps}</p>
          <p className="mt-1.5 flex flex-wrap items-center gap-1.5 text-sm font-medium text-text-secondary">
            {route.steps.map((step, index) => (
              <span key={step} className="flex items-center gap-1.5">
                {index > 0 && <span className="text-slate-600">→</span>}
                {step}
              </span>
            ))}
          </p>
        </div>
      )}

      {route.bestFor && (
        <p className="mt-3 line-clamp-2 min-h-[32px] text-xs text-text-muted">
          {labels.results.bestFor}: <span className="text-text-secondary">{route.bestFor}</span>
        </p>
      )}

      <button
        onClick={() => onSelect(route)}
        disabled={selectingId !== null}
        className="mt-auto w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-accent-bright disabled:opacity-50"
      >
        {selectingId === route.name ? "Selecting..." : labels.results.selectButton}
      </button>
    </div>
  );
}

export default function OnboardingResultsPage() {
  const router = useRouter();
  const { user, profile, refreshProfile } = useAuth();
  const { t, lang } = useLanguage();
  const [result, setResult] = useState<RouteEngineResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [selectingId, setSelectingId] = useState<string | null>(null);
  const [selectError, setSelectError] = useState(false);
  const confettiFiredRef = useRef(false);

  useEffect(() => {
    if (!loading && result?.routes && !confettiFiredRef.current) {
      confettiFiredRef.current = true;
      fireConfetti();
    }
  }, [loading, result]);

  // Drives the progress bar shown while routes are being generated. Caps at
  // 96% so it never visually claims "done" before the real result lands —
  // the last stretch snaps to 100% once loading actually flips to false.
  useEffect(() => {
    if (!loading) {
      setLoadingProgress(0);
      return;
    }
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      setLoadingProgress(Math.min(96, Math.round((elapsed / FAKE_LOADING_MS) * 100)));
    }, 100);
    return () => clearInterval(timer);
  }, [loading]);

  useEffect(() => {
    if (!user || !profile) return;
    let active = true;
    let settled = false;

    setLoading(true);

    const controller = new AbortController();
    const abortTimer = setTimeout(() => controller.abort(), OPENAI_TIMEOUT_MS);

    // Never keep the user waiting more than a few seconds — if the AI route
    // engine hasn't answered by then, show the static Poland routes instead.
    const fallbackTimer = setTimeout(() => {
      if (!active || settled) return;
      settled = true;
      controller.abort();
      setResult({ routes: STATIC_FALLBACK_ROUTES });
      setLoading(false);
    }, FAKE_LOADING_MS);

    async function loadRoutes() {
      try {
        const response = await fetch("/api/route", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            citizenship: profile?.citizenship,
            current_country: profile?.current_country,
            country: profile?.country,
            goal: profile?.goal,
            language: lang,
          }),
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Route API returned ${response.status}`);
        }

        const data = (await response.json()) as RouteEngineResult;
        if (!active || settled) return;
        settled = true;
        clearTimeout(fallbackTimer);
        setResult(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load relocation routes, using static fallback:", err);
        if (!active || settled) return;
        settled = true;
        clearTimeout(fallbackTimer);
        setResult({ routes: STATIC_FALLBACK_ROUTES });
        setLoading(false);
      } finally {
        clearTimeout(abortTimer);
      }
    }

    loadRoutes();
    return () => {
      active = false;
      clearTimeout(abortTimer);
      clearTimeout(fallbackTimer);
    };
  }, [user, profile]);

  async function handleSelectRoute(route: Route) {
    if (!user) return;

    setSelectingId(route.name);
    setSelectError(false);

    try {
      await supabase.from("profiles").update({ selected_route: route }).eq("id", user.id);

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
          await supabase.from("profiles").update({ roadmap_plan: plan }).eq("id", user.id);
        }
      } catch (roadmapErr) {
        // Non-fatal — the dashboard falls back to the static checklist if
        // roadmap_plan never gets set, so don't block registration on this.
        console.error("Failed to generate personalized roadmap:", roadmapErr);
      }

      await refreshProfile();

      createNotification({
        title: "Спасибо за регистрацию! 🎉",
        message: `Вы успешно заполнили данные анкеты и выбрали план релокации (${route.name}). Вы можете изменить эти данные в любой момент в настройках профиля.`,
        type: "welcome",
      });

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
      <div className="relative flex min-h-screen flex-col overflow-hidden px-6 py-10">
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

          {loading && (
            <Reveal>
              <div className="flex flex-col items-center justify-center py-20">
                <svg className="h-8 w-8 animate-spin text-accent-bright" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                <p className="mt-4 text-text-muted">{t.onboarding.results.loading}</p>

                <div className="mt-6 w-full max-w-xs">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                    <div
                      className="h-full rounded-full bg-accent transition-[width] duration-150 ease-out"
                      style={{ width: `${loadingProgress}%` }}
                    />
                  </div>
                </div>
                <p className="mt-3 text-center text-xs text-text-muted">
                  Обычно это занимает несколько секунд. Подождите — не закрывайте и не обновляйте вкладку.
                </p>
              </div>
            </Reveal>
          )}

          {selectError && !loading && (
            <Reveal>
              <p className="mb-6 text-center text-sm text-red-400">{t.onboarding.results.selectError}</p>
            </Reveal>
          )}

          {!loading && result && result.routes && (
            <div className="grid gap-6 sm:grid-cols-3">
              {result.routes.map((route, index) => (
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
