"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { useLanguage } from "./LanguageProvider";
import { supabase } from "../../lib/supabase";
import {
  buildChecklistSteps,
  buildPhases,
  derivePhaseStatuses,
  type ChecklistStepDef,
  type Phase,
  type PhaseKey,
  type PhaseStatus,
} from "../_lib/checklist";
import { generatedPlanToPhases, isGeneratedRoadmapPlan } from "../_lib/generatedRoadmap";

type DashboardProgressValue = {
  country: string;
  checklistSteps: ChecklistStepDef[];
  phases: Phase[];
  phaseStatuses: Record<string, PhaseStatus>;
  completed: Set<string>;
  progressPercent: number;
  loading: boolean;
  registerPromptOpen: boolean;
  setRegisterPromptOpen: (open: boolean) => void;
  isGeneratedPlan: boolean;
  toggleStepCompletion: (documentType: string) => void;
  regeneratePlan: () => Promise<void>;
  regenerating: boolean;
  regenerateError: boolean;
};

const DashboardProgressContext = createContext<DashboardProgressValue | null>(null);

export function DashboardProgressProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const { user, profile, refreshProfile } = useAuth();
  const { t, lang } = useLanguage();
  const [progressCompleted, setProgressCompleted] = useState<Set<string>>(new Set());
  const [roadmapCompleted, setRoadmapCompleted] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [registerPromptOpen, setRegisterPromptOpen] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [regenerateError, setRegenerateError] = useState(false);

  const country = profile?.country || searchParams.get("country") || "Poland";

  const generatedPlan = isGeneratedRoadmapPlan(profile?.roadmap_plan) ? profile.roadmap_plan : null;

  const phaseTitles: Record<PhaseKey, string> = {
    beforeDeparture: t.dashboard.phases.beforeDeparture,
    legalization: t.dashboard.phases.legalization,
    residenceCard: t.dashboard.phases.residenceCard,
    workTaxes: t.dashboard.phases.workTaxes,
  };

  // A user's AI-generated personal plan (see app/_lib/generatedRoadmap.ts)
  // takes over the roadmap entirely once it exists; otherwise fall back to
  // the built-in static checklist that only branches on country/goal/citizenship.
  const phases = generatedPlan
    ? generatedPlanToPhases(generatedPlan)
    : buildPhases(buildChecklistSteps(t, country, profile?.goal, profile?.citizenship), phaseTitles);
  const checklistSteps = phases.flatMap((phase) => phase.steps);
  const completed = useMemo(
    () => new Set<string>([...progressCompleted, ...roadmapCompleted]),
    [progressCompleted, roadmapCompleted],
  );
  const phaseStatuses = derivePhaseStatuses(phases, completed);

  useEffect(() => {
    if (!user) {
      // Demo/preview mode: nothing has actually been done yet, so don't fake progress.
      setProgressCompleted(new Set());
      setLoading(false);
      return;
    }
    let active = true;

    supabase
      .from("progress")
      .select("document_type, steps_completed, total_steps")
      .eq("user_id", user.id)
      .then(({ data }) => {
        if (!active) return;
        const done = new Set(
          (data ?? [])
            .filter((row) => row.steps_completed >= row.total_steps)
            .map((row) => row.document_type),
        );
        setProgressCompleted(done);
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [user]);

  // Steps in an AI-generated plan aren't tied to any real action elsewhere
  // in the app (document upload, biometric booking, etc.), so they're
  // checked off manually — this mirrors that from the profile row.
  useEffect(() => {
    setRoadmapCompleted(new Set(profile?.roadmap_completed_steps ?? []));
  }, [profile?.roadmap_completed_steps]);

  function toggleStepCompletion(documentType: string) {
    if (!user) return;
    const next = new Set(roadmapCompleted);
    if (next.has(documentType)) {
      next.delete(documentType);
    } else {
      next.add(documentType);
    }
    setRoadmapCompleted(next);
    supabase
      .from("profiles")
      .update({ roadmap_completed_steps: Array.from(next) })
      .eq("id", user.id)
      .then(({ error }) => {
        if (error) console.error("Failed to save step completion:", error);
      });
  }

  async function regeneratePlan() {
    if (!user || !profile) return;
    setRegenerating(true);
    setRegenerateError(false);
    try {
      const response = await fetch("/api/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          citizenship: profile.citizenship,
          current_country: profile.current_country,
          country: profile.country,
          city: profile.city,
          goal: profile.goal,
          selected_route: profile.selected_route,
          language: lang,
        }),
      });
      if (!response.ok) throw new Error(`Roadmap API returned ${response.status}`);
      const plan = await response.json();

      const { error } = await supabase
        .from("profiles")
        .update({ roadmap_plan: plan, roadmap_completed_steps: [] })
        .eq("id", user.id);
      if (error) throw error;

      setRoadmapCompleted(new Set());
      await refreshProfile();
    } catch (err) {
      console.error("Failed to regenerate roadmap plan:", err);
      setRegenerateError(true);
    } finally {
      setRegenerating(false);
    }
  }

  const progressPercent =
    checklistSteps.length > 0 ? Math.round((completed.size / checklistSteps.length) * 100) : 0;

  return (
    <DashboardProgressContext.Provider
      value={{
        country,
        checklistSteps,
        phases,
        phaseStatuses,
        completed,
        progressPercent,
        loading,
        registerPromptOpen,
        setRegisterPromptOpen,
        isGeneratedPlan: !!generatedPlan,
        toggleStepCompletion,
        regeneratePlan,
        regenerating,
        regenerateError,
      }}
    >
      {children}
    </DashboardProgressContext.Provider>
  );
}

export function useDashboardProgress() {
  const ctx = useContext(DashboardProgressContext);
  if (!ctx) {
    throw new Error("useDashboardProgress must be used within a DashboardProgressProvider");
  }
  return ctx;
}
