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
import { buildDocumentRoadmap, documentRoadmapToPhases, type DocumentRoadmapSection } from "../_lib/documentRoadmap";
import type { DocumentGuide } from "./DocumentGuideList";

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
  isInteractivePlan: boolean;
  documentRoadmap: DocumentRoadmapSection[];
  // Every document_guides row (minus банки/insurance categories, which have
  // their own pages), unfiltered by citizenship/goal/route — the "browse
  // everything" list shown under the personalized documentRoadmap on
  // /documents, for anything the personalization might have missed.
  allGuides: DocumentGuide[];
  documentGuidesLoading: boolean;
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
  const [progressLoading, setProgressLoading] = useState(true);
  const [registerPromptOpen, setRegisterPromptOpen] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [regenerateError, setRegenerateError] = useState(false);
  const [guides, setGuides] = useState<DocumentGuide[]>([]);
  const [documentGuidesLoading, setDocumentGuidesLoading] = useState(true);

  const country = profile?.country || searchParams.get("country") || "Poland";

  const generatedPlan = isGeneratedRoadmapPlan(profile?.roadmap_plan) ? profile.roadmap_plan : null;
  const routeSteps = profile?.route_steps?.length ? profile.route_steps : profile?.selected_route?.steps ?? null;

  // The personalized, dated document checklist (see app/_lib/documentRoadmap.ts)
  // is built from document_guides — the same source /documents reads — filtered
  // by citizenship group/goal/has_car/has_children and anchored on the user's
  // move date. It's the most specific roadmap source, so it wins over the
  // AI-generated plan (app/_lib/generatedRoadmap.ts), which itself takes over
  // the generic static checklist that only branches on country/goal/citizenship.
  const documentRoadmap = useMemo(
    () =>
      buildDocumentRoadmap(
        guides,
        {
          citizenship: profile?.citizenship,
          citizenshipGroup: profile?.citizenship_group,
          goals: profile?.goals?.length ? profile.goals : profile?.goal ? [profile.goal] : null,
          hasCar: profile?.has_car,
          hasChildren: profile?.has_children,
        },
        routeSteps,
        profile?.timeline,
        t.dashboard.timelineSections,
      ),
    [
      guides,
      profile?.citizenship,
      profile?.citizenship_group,
      profile?.goals,
      profile?.goal,
      profile?.has_car,
      profile?.has_children,
      profile?.timeline,
      routeSteps,
      t.dashboard.timelineSections,
    ],
  );

  const phaseTitles: Record<PhaseKey, string> = {
    beforeDeparture: t.dashboard.phases.beforeDeparture,
    legalization: t.dashboard.phases.legalization,
    residenceCard: t.dashboard.phases.residenceCard,
    workTaxes: t.dashboard.phases.workTaxes,
  };

  const phases = documentRoadmap.length > 0
    ? documentRoadmapToPhases(documentRoadmap)
    : generatedPlan
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
      setProgressLoading(false);
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
        setProgressLoading(false);
      });

    return () => {
      active = false;
    };
  }, [user]);

  // document_guides is a public reference table (not per-user), so this is
  // fetched once regardless of auth state — same query documents/page.tsx
  // runs, minus the categories that have their own dedicated pages.
  useEffect(() => {
    let active = true;
    supabase
      .from("document_guides")
      .select("*")
      .not("category", "in", "(финансы,медицина)")
      .order("step_order", { nullsFirst: false })
      .then(({ data, error }) => {
        if (!active) return;
        if (error) console.error("Failed to load document guides:", error);
        setGuides((data as DocumentGuide[]) ?? []);
        setDocumentGuidesLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

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
  const loading = progressLoading || documentGuidesLoading;

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
        isGeneratedPlan: documentRoadmap.length === 0 && !!generatedPlan,
        isInteractivePlan: documentRoadmap.length > 0 || !!generatedPlan,
        documentRoadmap,
        allGuides: guides,
        documentGuidesLoading,
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
