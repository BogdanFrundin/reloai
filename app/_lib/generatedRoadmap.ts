import type { ChecklistStepDef, Phase } from "./checklist";

// Shape returned by /api/roadmap and stored in profiles.roadmap_plan. Unlike
// the static built-in checklist (checklist.ts), phases/steps here are fully
// written by the AI for this specific user — arbitrary keys/titles, no fixed
// PhaseKey union, no tie to real app actions (document uploads etc.).
export type GeneratedStep = {
  id: string;
  title: string;
  description: string;
};

export type GeneratedPhase = {
  key: string;
  title: string;
  steps: GeneratedStep[];
};

export type GeneratedRoadmapPlan = {
  phases: GeneratedPhase[];
};

export function isGeneratedRoadmapPlan(value: unknown): value is GeneratedRoadmapPlan {
  if (!value || typeof value !== "object") return false;
  const phases = (value as { phases?: unknown }).phases;
  if (!Array.isArray(phases) || phases.length === 0) return false;
  return phases.every(
    (p) =>
      p &&
      typeof p === "object" &&
      typeof (p as GeneratedPhase).key === "string" &&
      typeof (p as GeneratedPhase).title === "string" &&
      Array.isArray((p as GeneratedPhase).steps),
  );
}

// Converts the AI-generated plan into the same Phase[] shape PhaseCard /
// PhaseStepper already render for the static checklist, so neither
// component needs to know which source it's looking at.
export function generatedPlanToPhases(plan: GeneratedRoadmapPlan): Phase[] {
  return plan.phases.map((phase) => ({
    key: phase.key,
    title: phase.title,
    steps: phase.steps.map(
      (step): ChecklistStepDef => ({
        documentType: step.id,
        title: step.title,
        description: step.description,
        phase: phase.key,
      }),
    ),
  }));
}
