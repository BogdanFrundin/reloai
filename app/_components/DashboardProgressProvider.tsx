"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { useLanguage } from "./LanguageProvider";
import { supabase } from "../../lib/supabase";
import {
  STEPS_COMPLETED_ON_ONBOARDING,
  buildChecklistSteps,
  buildPhases,
  derivePhaseStatuses,
  type ChecklistStepDef,
  type Phase,
  type PhaseKey,
  type PhaseStatus,
} from "../_lib/checklist";

type DashboardProgressValue = {
  country: string;
  checklistSteps: ChecklistStepDef[];
  phases: Phase[];
  phaseStatuses: Record<PhaseKey, PhaseStatus>;
  completed: Set<string>;
  progressPercent: number;
  loading: boolean;
  saving: string | null;
  toggleStep: (documentType: string) => Promise<void>;
  registerPromptOpen: boolean;
  setRegisterPromptOpen: (open: boolean) => void;
};

const DashboardProgressContext = createContext<DashboardProgressValue | null>(null);

export function DashboardProgressProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const { user, profile } = useAuth();
  const { t } = useLanguage();
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [registerPromptOpen, setRegisterPromptOpen] = useState(false);

  const country = profile?.country || searchParams.get("country") || "Poland";
  const checklistSteps = buildChecklistSteps(t, country, profile?.goal, profile?.citizenship);
  const phases = buildPhases(checklistSteps);
  const phaseStatuses = derivePhaseStatuses(phases, completed);

  useEffect(() => {
    if (!user) {
      // Demo/preview mode: seed believable sample progress instead of hitting Supabase.
      setCompleted(new Set(STEPS_COMPLETED_ON_ONBOARDING));
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
        setCompleted(done);
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [user]);

  const progressPercent =
    checklistSteps.length > 0 ? Math.round((completed.size / checklistSteps.length) * 100) : 0;

  async function toggleStep(documentType: string) {
    if (!user) {
      setRegisterPromptOpen(true);
      return;
    }
    if (saving) return;
    const isChecked = completed.has(documentType);
    const nextChecked = !isChecked;

    setSaving(documentType);
    setCompleted((prev) => {
      const next = new Set(prev);
      if (nextChecked) next.add(documentType);
      else next.delete(documentType);
      return next;
    });

    const { error } = await supabase.from("progress").upsert(
      {
        user_id: user.id,
        country,
        document_type: documentType,
        steps_completed: nextChecked ? 1 : 0,
        total_steps: 1,
      },
      { onConflict: "user_id,document_type" },
    );

    if (error) {
      // Revert the optimistic update if the write failed.
      setCompleted((prev) => {
        const next = new Set(prev);
        if (nextChecked) next.delete(documentType);
        else next.add(documentType);
        return next;
      });
    }

    setSaving(null);
  }

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
        saving,
        toggleStep,
        registerPromptOpen,
        setRegisterPromptOpen,
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
