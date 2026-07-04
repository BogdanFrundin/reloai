"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import PageTransition from "../_components/PageTransition";
import Reveal from "../_components/Reveal";
import { useLanguage } from "../_components/LanguageProvider";
import { useAuth } from "../_components/AuthProvider";
import { LANGUAGES, type Lang } from "../_lib/i18n";
import { STEPS_COMPLETED_ON_ONBOARDING } from "../_lib/checklist";
import { pressScale } from "../_lib/motion";
import { supabase } from "../../lib/supabase";

type Option = {
  id: string;
  label: string;
  icon: ReactNode;
};

const ICON_PROPS = {
  className: "h-7 w-7",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: 1.75,
} as const;

const WORK_ICON = (
  <svg {...ICON_PROPS}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5h18M3 7.5v10.5a1.5 1.5 0 001.5 1.5h15a1.5 1.5 0 001.5-1.5V7.5M8 7.5V5.25A1.5 1.5 0 019.5 3.75h5A1.5 1.5 0 0116 5.25V7.5" />
  </svg>
);
const STUDY_ICON = (
  <svg {...ICON_PROPS}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 9.5L12 5l8 4.5-8 4.5-8-4.5zM4 9.5V15M20 9.5V15M8 11.6V17a4 7 0 008 0v-5.4" />
  </svg>
);
const FAMILY_ICON = (
  <svg {...ICON_PROPS}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-4.35-9.5-8.5C.5 8.5 2.5 5 6 5c2 0 3.5 1.5 4 2.5.5-1 2-2.5 4-2.5 3.5 0 5.5 3.5 3.5 7.5C19 16.65 12 21 12 21z" />
  </svg>
);
const NOMAD_ICON = (
  <svg {...ICON_PROPS}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 19.5h18M5 19.5V8.25A1.5 1.5 0 016.5 6.75h11A1.5 1.5 0 0119 8.25V19.5M10 6.75V4.5a1 1 0 011-1h2a1 1 0 011 1v2.25" />
  </svg>
);
const SITUATION_ICONS = [
  <svg {...ICON_PROPS} key="home">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75V20a1 1 0 01-1 1h-4a1 1 0 01-1-1v-5H9v5a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z" />
  </svg>,
  <svg {...ICON_PROPS} key="visa">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg {...ICON_PROPS} key="plane">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l1.5-5.5L3 12l1-2 8-1 3-6 2 1-1.5 6.5L21 12l-1 2-7 1-1.5 6z" />
  </svg>,
  <svg {...ICON_PROPS} key="search">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>,
];
const TIMELINE_ICONS = [
  <svg {...ICON_PROPS} key="bolt">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 3L4 14h6l-1 7 9-11h-6l1-7z" />
  </svg>,
  <svg {...ICON_PROPS} key="calendar1">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z" />
  </svg>,
  <svg {...ICON_PROPS} key="calendar2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z" />
  </svg>,
  <svg {...ICON_PROPS} key="clock">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
];

function buildSteps(): { question: string; subheading: string; options: Option[] }[] {
  return [
    {
      question: "Where are you moving to?",
      subheading: "We'll tailor your roadmap to this country.",
      options: [
        { id: "Poland", label: "Poland", icon: <span className="text-3xl">🇵🇱</span> },
        { id: "Germany", label: "Germany", icon: <span className="text-3xl">🇩🇪</span> },
        { id: "Spain", label: "Spain", icon: <span className="text-3xl">🇪🇸</span> },
      ],
    },
    {
      question: "What's your main goal?",
      subheading: "This decides which visa track we'll guide you through.",
      options: [
        { id: "Work", label: "Work", icon: WORK_ICON },
        { id: "Study", label: "Study", icon: STUDY_ICON },
        { id: "Family", label: "Family", icon: FAMILY_ICON },
        { id: "Digital Nomad", label: "Digital Nomad", icon: NOMAD_ICON },
      ],
    },
    {
      question: "What's your current situation?",
      subheading: "Helps us skip steps you've already completed.",
      options: [
        { id: "home", label: "Still in my home country", icon: SITUATION_ICONS[0] },
        { id: "visa", label: "I already hold a visa", icon: SITUATION_ICONS[1] },
        { id: "shortstay", label: "Already there on a short stay", icon: SITUATION_ICONS[2] },
        { id: "exploring", label: "Just exploring my options", icon: SITUATION_ICONS[3] },
      ],
    },
    {
      question: "What's your timeline?",
      subheading: "We'll prioritize your checklist around this.",
      options: [
        { id: "asap", label: "As soon as possible", icon: TIMELINE_ICONS[0] },
        { id: "1-3", label: "Within 1–3 months", icon: TIMELINE_ICONS[1] },
        { id: "3-6", label: "Within 3–6 months", icon: TIMELINE_ICONS[2] },
        { id: "researching", label: "Just researching, no rush", icon: TIMELINE_ICONS[3] },
      ],
    },
    {
      question: "Choose your language",
      subheading: "ReloAI will speak with you in this language.",
      options: LANGUAGES.map((l) => ({
        id: l.code,
        label: l.name,
        icon: <span className="text-3xl">{l.flag}</span>,
      })),
    },
  ];
}

export default function OnboardingPage() {
  const router = useRouter();
  const { setLang } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const steps = buildSteps();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/register");
    }
  }, [authLoading, user, router]);

  const current = steps[step];
  const selected = answers[step];
  const isLast = step === steps.length - 1;

  function selectOption(id: string) {
    setAnswers((prev) => ({ ...prev, [step]: id }));
  }

  async function handleContinue() {
    if (!selected || !user) return;

    if (isLast) {
      setError(null);
      setSaving(true);

      const country = answers[0] ?? "Poland";
      const goal = answers[1] ?? "Work";

      const { error: profileError } = await supabase.from("profiles").upsert({
        id: user.id,
        name: (user.user_metadata?.name as string | undefined) ?? null,
        email: user.email,
        country,
        goal,
        language: selected,
      });

      if (profileError) {
        setError(profileError.message);
        setSaving(false);
        return;
      }

      const progressRows = STEPS_COMPLETED_ON_ONBOARDING.map((documentType) => ({
        user_id: user.id,
        country,
        document_type: documentType,
        steps_completed: 1,
        total_steps: 1,
      }));

      const { error: progressError } = await supabase
        .from("progress")
        .upsert(progressRows, { onConflict: "user_id,document_type" });

      if (progressError) {
        setError(progressError.message);
        setSaving(false);
        return;
      }

      if (LANGUAGES.some((l) => l.code === selected)) {
        setLang(selected as Lang);
      }
      router.push("/pricing");
      return;
    }

    setStep((s) => s + 1);
  }

  function handleBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  if (authLoading || !user) {
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

        <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-bright text-sm font-bold text-white">
                R
              </span>
              <span className="text-sm font-semibold tracking-tight text-white">ReloAI</span>
            </Link>
            <p className="text-sm text-slate-500">
              Step {step + 1} of {steps.length}
            </p>
          </div>

          <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent to-accent-bright transition-[width] duration-500 ease-[var(--ease-out-strong)]"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>

          <div className="flex flex-1 flex-col justify-center py-12">
            <Reveal key={step}>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {current.question}
              </h1>
              <p className="mt-3 text-slate-400">{current.subheading}</p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {current.options.map((option) => {
                  const isSelected = selected === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => selectOption(option.id)}
                      className={`flex items-center gap-4 rounded-2xl border p-5 text-left backdrop-blur-sm transition-[border-color,background-color,box-shadow,transform] duration-200 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-0.5 ${
                        isSelected
                          ? "border-accent/60 bg-accent/10 shadow-[0_0_30px_-10px_var(--accent)]"
                          : "border-white/10 bg-white/[0.03] [@media(hover:hover)_and_(pointer:fine)]:hover:border-white/20 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/[0.06]"
                      }`}
                    >
                      <span
                        className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${
                          isSelected ? "bg-accent/20 text-accent-bright" : "bg-white/5 text-slate-300"
                        }`}
                      >
                        {option.icon}
                      </span>
                      <span className="flex-1 text-sm font-semibold text-white">
                        {option.label}
                      </span>
                      <span
                        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border transition-colors duration-150 ${
                          isSelected ? "border-accent bg-accent text-white" : "border-white/20"
                        }`}
                      >
                        {isSelected && (
                          <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.6 3.6 6.7-6.7a1 1 0 011.4 0z" />
                          </svg>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </Reveal>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 0}
              className={`rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:border-white/30 disabled:cursor-not-allowed disabled:opacity-0 ${pressScale}`}
            >
              Back
            </button>
            <div className="flex flex-col items-end gap-2">
              {error && <p className="text-xs text-red-400">{error}</p>}
              <button
                type="button"
                onClick={handleContinue}
                disabled={!selected || saving}
                className={`rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-8px_var(--accent)] transition-colors duration-150 hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-40 ${pressScale}`}
              >
                {saving ? "Saving..." : isLast ? "Finish" : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
