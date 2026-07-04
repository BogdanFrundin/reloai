"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import AiChatPanel from "./AiChatPanel";
import WelcomeToast from "./WelcomeToast";
import { useAuth } from "./AuthProvider";
import { CHECKLIST_STEPS } from "../_lib/checklist";
import { supabase } from "../../lib/supabase";
import { useLanguage } from "./LanguageProvider";
import type { Dictionary } from "../_lib/i18n";

type StepKey = keyof Dictionary["dashboard"]["steps"];

const STEP_KEY_BY_DOCUMENT_TYPE: Record<string, StepKey> = {
  account: "account",
  onboarding: "onboarding",
  visa_eligibility: "visa",
  documents: "documents",
  biometric: "biometric",
  residence_permit: "residence",
  address_registration: "address",
};

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <span
      className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg border transition-colors duration-150 ${
        checked ? "border-accent bg-accent text-white" : "border-white/20 bg-white/5"
      }`}
    >
      {checked && (
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.6 3.6 6.7-6.7a1 1 0 011.4 0z" />
        </svg>
      )}
    </span>
  );
}

export default function DashboardContent() {
  const searchParams = useSearchParams();
  const { user, profile } = useAuth();
  const { t } = useLanguage();
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  const country = profile?.country || searchParams.get("country") || "Poland";

  useEffect(() => {
    if (!user) return;
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

  const progressPercent = Math.round((completed.size / CHECKLIST_STEPS.length) * 100);

  async function toggleStep(documentType: string) {
    if (!user || saving) return;
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
    <div className="px-6 py-8 lg:px-10 lg:py-10">
      <WelcomeToast />
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div>
          <Reveal>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t.dashboard.relocation.replace("{country}", country)}
            </h1>
            <p className="mt-2 text-slate-400">{t.dashboard.subtitle}</p>

            <div className="mt-6">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-300">{t.dashboard.overallProgress}</span>
                <span className="font-semibold text-accent-bright">
                  {loading ? "..." : `${progressPercent}%`}
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-accent-bright transition-[width] duration-700 ease-[var(--ease-out-strong)]"
                  style={{ width: `${loading ? 0 : progressPercent}%` }}
                />
              </div>
            </div>
          </Reveal>

          <div className="mt-8 space-y-3">
            {!loading &&
              CHECKLIST_STEPS.map((step, index) => {
                const checked = completed.has(step.documentType);
                const stepText = t.dashboard.steps[STEP_KEY_BY_DOCUMENT_TYPE[step.documentType]];
                return (
                  <Reveal key={step.documentType} delay={index * 50}>
                    <div
                      className={`flex items-center gap-4 rounded-2xl border p-4 backdrop-blur-sm transition-[border-color,box-shadow] duration-200 ease-[var(--ease-out-strong)] ${
                        checked
                          ? "border-emerald-500/30 bg-emerald-500/[0.04]"
                          : "border-white/10 bg-white/[0.03]"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleStep(step.documentType)}
                        disabled={saving === step.documentType}
                        aria-pressed={checked}
                        aria-label={stepText.title}
                        className="flex-shrink-0 disabled:opacity-60"
                      >
                        <Checkbox checked={checked} />
                      </button>
                      <div className="flex-1">
                        <p className={`text-sm font-semibold ${checked ? "text-slate-300" : "text-white"}`}>
                          {stepText.title}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-500">{stepText.desc}</p>
                      </div>
                      {step.documentType === "documents" && (
                        <Link
                          href="/documents"
                          className="flex-shrink-0 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:border-accent/40 hover:text-accent-bright"
                        >
                          {t.dashboard.openBtn}
                        </Link>
                      )}
                    </div>
                  </Reveal>
                );
              })}
          </div>
        </div>

        <Reveal delay={120} className="h-[600px] lg:h-auto">
          <AiChatPanel />
        </Reveal>
      </div>
    </div>
  );
}
