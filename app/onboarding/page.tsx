"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import PageTransition from "../_components/PageTransition";
import Reveal from "../_components/Reveal";
import SearchableCountrySelect from "../_components/SearchableCountrySelect";
import { useLanguage } from "../_components/LanguageProvider";
import { useAuth } from "../_components/AuthProvider";
import { LANGUAGES, type Lang } from "../_lib/i18n";
import { STEPS_COMPLETED_ON_ONBOARDING } from "../_lib/checklist";
import { pressScale } from "../_lib/motion";
import { getFlagUrl } from "../_lib/flags";
import { supabase } from "../../lib/supabase";

type Option = {
  id: string;
  label: string;
  icon: ReactNode;
  bareIcon?: boolean;
};

type Answers = {
  language?: string;
  citizenship?: string;
  currentCountry?: string;
  destination?: string;
  goal?: string;
};

type ProfileFields = {
  language?: string;
  citizenship?: string;
  current_country?: string;
  country?: string;
  goal?: string;
  onboarding_skipped?: boolean;
  skipped_steps?: string[];
};

const STEP_ORDER = ["language", "citizenship", "currentCountry", "destination", "goal"] as const;
type StepKey = (typeof STEP_ORDER)[number];

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
const BUSINESS_ICON = (
  <svg {...ICON_PROPS}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M4 21V10.5L12 4l8 6.5V21M9 21v-6h6v6" />
  </svg>
);
const INVESTMENT_ICON = (
  <svg {...ICON_PROPS}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8m0 0h-5m5 0v5" />
  </svg>
);
const OTHER_ICON = (
  <svg {...ICON_PROPS}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21a9 9 0 100-18 9 9 0 000 18zM8.25 12h.008v.008H8.25V12zm3.75 0h.008v.008H12v.008h-.008V12zm3.75 0h.008v.008h-.008V12z"
    />
  </svg>
);

export default function OnboardingPage() {
  const router = useRouter();
  const { t, lang, setLang } = useLanguage();
  const { user, profile, loading: authLoading } = useAuth();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [skippedSteps, setSkippedSteps] = useState<StepKey[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSkipTip, setShowSkipTip] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/register");
    }
  }, [authLoading, user, router]);

  // Resume in-progress onboarding: restore previously answered/skipped steps
  // instead of starting over from step 1.
  useEffect(() => {
    if (hydrated || !profile) return;

    const restoredAnswers: Answers = {
      language: profile.language ?? undefined,
      citizenship: profile.citizenship ?? undefined,
      currentCountry: profile.current_country ?? undefined,
      destination: profile.country ?? undefined,
      goal: profile.goal ?? undefined,
    };
    const restoredSkipped = (profile.skipped_steps ?? []).filter((key): key is StepKey =>
      STEP_ORDER.includes(key as StepKey),
    );

    if (Object.values(restoredAnswers).some(Boolean) || restoredSkipped.length > 0) {
      setAnswers(restoredAnswers);
      setSkippedSteps(restoredSkipped);

      const resumeIndex = STEP_ORDER.findIndex((key) => restoredSkipped.includes(key));
      if (resumeIndex !== -1) setStep(resumeIndex);
    }

    setHydrated(true);
  }, [profile, hydrated]);

  const stepKey: StepKey = STEP_ORDER[step];
  const isLast = step === STEP_ORDER.length - 1;

  const canContinue =
    stepKey === "language"
      ? !!answers.language
      : stepKey === "citizenship"
        ? !!answers.citizenship
        : stepKey === "currentCountry"
          ? !!answers.currentCountry
          : stepKey === "destination"
            ? !!answers.destination
            : !!answers.goal;

  async function saveFields(fields: ProfileFields) {
    if (!user) return;
    await supabase.from("profiles").upsert({
      id: user.id,
      name: (user.user_metadata?.name as string | undefined) ?? null,
      email: user.email,
      ...fields,
    });
  }

  function selectLanguage(id: string) {
    setAnswers((prev) => ({ ...prev, language: id }));
    if (LANGUAGES.some((l) => l.code === id)) setLang(id as Lang);
    saveFields({ language: id });
  }

  function selectCitizenship(code: string) {
    setAnswers((prev) => ({ ...prev, citizenship: code }));
    saveFields({ citizenship: code });
  }

  function selectCurrentCountry(code: string) {
    setAnswers((prev) => ({ ...prev, currentCountry: code }));
    saveFields({ current_country: code });
  }

  function selectDestination(id: string) {
    if (id === "Other") return;
    setAnswers((prev) => ({ ...prev, destination: id }));
    saveFields({ country: id });
  }

  function selectGoal(id: string) {
    setAnswers((prev) => ({ ...prev, goal: id }));
    saveFields({ goal: id });
  }

  function answeredFields(a: Answers): ProfileFields {
    const fields: ProfileFields = {};
    if (a.language) fields.language = a.language;
    if (a.citizenship) fields.citizenship = a.citizenship;
    if (a.currentCountry) fields.current_country = a.currentCountry;
    if (a.destination) fields.country = a.destination;
    if (a.goal) fields.goal = a.goal;
    return fields;
  }

  // Finalizes onboarding once every step has been answered or skipped, and
  // sends the user to the AI route results — never before that point.
  async function finishOnboarding(finalSkipped: StepKey[]) {
    if (!user) return;
    setError(null);
    setSaving(true);

    const finalAnswers = {
      language: answers.language ?? "ru",
      country: answers.destination ?? "Poland",
      citizenship: answers.citizenship ?? "Other",
      current_country: answers.currentCountry ?? "Other",
      goal: answers.goal ?? "work",
    };

    const { error: profileError } = await supabase.from("profiles").upsert({
      id: user.id,
      name: (user.user_metadata?.name as string | undefined) ?? null,
      email: user.email,
      skipped_steps: finalSkipped,
      onboarding_skipped: finalSkipped.length > 0,
      ...finalAnswers,
    });

    if (profileError) {
      setError(profileError.message);
      setSaving(false);
      return;
    }

    const progressRows = STEPS_COMPLETED_ON_ONBOARDING.map((documentType) => ({
      user_id: user.id,
      country: finalAnswers.country,
      document_type: documentType,
      steps_completed: 1,
      total_steps: 1,
    }));

    await supabase.from("progress").upsert(progressRows, { onConflict: "user_id,document_type" });

    router.push("/onboarding/results");
  }

  async function handleSkip() {
    if (!user || saving) return;
    setError(null);
    setSaving(true);

    const updatedSkipped = skippedSteps.includes(stepKey) ? skippedSteps : [...skippedSteps, stepKey];
    setSkippedSteps(updatedSkipped);

    // Persist whatever's been answered so far, plus which step is being
    // skipped, before moving on — so nothing is lost if the user leaves.
    await saveFields({
      ...answeredFields(answers),
      skipped_steps: updatedSkipped,
      onboarding_skipped: true,
    });

    if (isLast) {
      await finishOnboarding(updatedSkipped);
    } else {
      setStep((s) => s + 1);
      setSaving(false);
    }
  }

  async function handleContinue() {
    if (!canContinue || !user) return;

    if (isLast) {
      await finishOnboarding(skippedSteps);
      return;
    }

    setStep((s) => s + 1);
  }

  function handleBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  function handleCancel() {
    router.push(user ? "/dashboard" : "/");
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

  const question = t.onboarding.steps[stepKey].question;
  const subheading = t.onboarding.steps[stepKey].subheading;

  const languageOptions: Option[] = LANGUAGES.map((l) => (
    {
      id: l.code,
      label: l.name,
      icon: (
        <Image
          src={getFlagUrl(l.flag, "md")}
          alt={l.name}
          width={32}
          height={24}
          className="rounded-sm"
          unoptimized
        />
      ),
      bareIcon: true,
    }
  ));

  const destinationOptions: (Option & { disabled?: boolean })[] = [
    { id: "Poland", label: t.countries.list[0].name, icon: <Image src={getFlagUrl("pl", "lg")} alt="Poland" width={48} height={36} className="rounded-lg" unoptimized /> },
    { id: "Germany", label: t.countries.list[1].name, icon: <Image src={getFlagUrl("de", "lg")} alt="Germany" width={48} height={36} className="rounded-lg" unoptimized />, disabled: true },
    { id: "Spain", label: t.countries.list[2].name, icon: <Image src={getFlagUrl("es", "lg")} alt="Spain" width={48} height={36} className="rounded-lg" unoptimized />, disabled: true },
    { id: "Other", label: t.onboarding.goalOptions.other, icon: <span className="text-3xl">🌍</span>, disabled: true },
  ];

  const goalOptions: Option[] = [
    { id: "work", label: t.onboarding.goalOptions.work, icon: WORK_ICON },
    { id: "study", label: t.onboarding.goalOptions.study, icon: STUDY_ICON },
    { id: "business", label: t.onboarding.goalOptions.business, icon: BUSINESS_ICON },
    { id: "passiveIncome", label: t.onboarding.goalOptions.passiveIncome, icon: INVESTMENT_ICON },
    { id: "digitalNomad", label: t.onboarding.goalOptions.digitalNomad, icon: NOMAD_ICON },
    { id: "familyReunification", label: t.onboarding.goalOptions.familyReunification, icon: FAMILY_ICON },
    { id: "other", label: t.onboarding.goalOptions.other, icon: OTHER_ICON },
  ];

  function renderOptionCard(
    option: Option & { disabled?: boolean },
    isSelected: boolean,
    onClick: () => void,
  ) {
    return (
      <button
        key={option.id}
        type="button"
        onClick={onClick}
        disabled={option.disabled}
        className={`relative flex items-center gap-4 rounded-2xl border p-5 text-left backdrop-blur-sm transition-[border-color,background-color,box-shadow,transform] duration-200 ease-[var(--ease-out-strong)] ${
          option.disabled
            ? "cursor-not-allowed border-border-subtle bg-surface-1 opacity-50"
            : `[@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-0.5 ${
                isSelected
                  ? "border-accent/60 bg-accent/10 shadow-[0_0_30px_-10px_var(--accent)]"
                  : "border-border-subtle bg-surface-1 [@media(hover:hover)_and_(pointer:fine)]:hover:border-border-strong [@media(hover:hover)_and_(pointer:fine)]:hover:bg-surface-hover"
              }`
        }`}
      >
        {option.bareIcon ? (
          <span className="flex flex-shrink-0 items-center justify-center">{option.icon}</span>
        ) : (
          <span
            className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${
              isSelected ? "bg-accent/20 text-accent-bright" : "bg-surface-1 text-text-secondary"
            }`}
          >
            {option.icon}
          </span>
        )}
        <span className="flex-1 text-sm font-semibold text-text-primary">{option.label}</span>
        {option.disabled ? (
          <span className="rounded-full border border-border-strong px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-text-muted">
            {t.onboarding.comingSoon}
          </span>
        ) : (
          <span
            className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border transition-colors duration-150 ${
              isSelected ? "border-accent bg-accent text-white" : "border-border-strong"
            }`}
          >
            {isSelected && (
              <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.6 3.6 6.7-6.7a1 1 0 011.4 0z" />
              </svg>
            )}
          </span>
        )}
      </button>
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
              <span className="text-sm font-semibold tracking-tight text-text-primary">ReloAI</span>
            </Link>
            <p className="text-sm text-text-muted">
              {t.onboarding.stepLabel.replace("{current}", String(step + 1)).replace("{total}", String(STEP_ORDER.length))}
            </p>
          </div>

          <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-border-subtle">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent to-accent-bright transition-[width] duration-500 ease-[var(--ease-out-strong)]"
              style={{ width: `${((step + 1) / STEP_ORDER.length) * 100}%` }}
            />
          </div>

          <div className="flex flex-1 flex-col justify-center py-12">
            <Reveal key={step}>
              <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">{question}</h1>
              <p className="mt-3 text-text-muted">{subheading}</p>

              {stepKey === "language" && (
                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  {languageOptions.map((option) =>
                    renderOptionCard(option, answers.language === option.id, () => selectLanguage(option.id)),
                  )}
                </div>
              )}

              {stepKey === "citizenship" && (
                <div className="mt-10">
                  <label className="text-sm font-medium text-text-secondary">{t.onboarding.citizenshipLabel}</label>
                  <div className="mt-1.5">
                    <SearchableCountrySelect
                      lang={lang}
                      value={answers.citizenship}
                      onSelect={selectCitizenship}
                      placeholder={t.onboarding.citizenshipPlaceholder}
                    />
                  </div>
                </div>
              )}

              {stepKey === "currentCountry" && (
                <div className="mt-10">
                  <label className="text-sm font-medium text-text-secondary">{t.onboarding.currentCountryLabel}</label>
                  <div className="mt-1.5">
                    <SearchableCountrySelect
                      lang={lang}
                      value={answers.currentCountry}
                      onSelect={selectCurrentCountry}
                      placeholder={t.onboarding.currentCountryPlaceholder}
                    />
                  </div>
                </div>
              )}

              {stepKey === "destination" && (
                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  {destinationOptions.map((option) =>
                    renderOptionCard(option, answers.destination === option.id, () => selectDestination(option.id)),
                  )}
                </div>
              )}

              {stepKey === "goal" && (
                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  {goalOptions.map((option) =>
                    renderOptionCard(option, answers.goal === option.id, () => selectGoal(option.id)),
                  )}
                </div>
              )}
            </Reveal>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={step === 0 ? handleCancel : handleBack}
              className={`rounded-full border border-border-strong bg-surface-1 px-6 py-3 text-sm font-semibold text-text-primary transition-colors duration-150 hover:border-border-strong hover:bg-surface-hover ${pressScale}`}
            >
              {step === 0 ? t.onboarding.cancel : t.onboarding.back}
            </button>
            <div className="flex flex-col items-end gap-2">
              {error && <p className="text-xs text-red-400">{error}</p>}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <button
                    type="button"
                    onClick={handleSkip}
                    disabled={saving}
                    onMouseEnter={() => setShowSkipTip(true)}
                    onMouseLeave={() => setShowSkipTip(false)}
                    onFocus={() => setShowSkipTip(true)}
                    onBlur={() => setShowSkipTip(false)}
                    className={`rounded-full border border-border-strong bg-surface-1 px-6 py-3 text-sm font-semibold text-text-secondary transition-colors duration-150 hover:border-border-strong hover:bg-surface-hover hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40 ${pressScale}`}
                  >
                    {t.onboarding.skip}
                  </button>
                  {showSkipTip && (
                    <div
                      role="tooltip"
                      className="absolute bottom-full right-0 z-10 mb-2 w-56 rounded-xl border border-border-subtle bg-panel/95 px-3 py-2 text-xs leading-relaxed text-text-secondary shadow-xl shadow-black/40 backdrop-blur-xl"
                    >
                      {t.onboarding.skipTooltip}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={!canContinue || saving}
                  className={`rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-8px_var(--accent)] transition-colors duration-150 hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-40 ${pressScale}`}
                >
                  {saving ? t.onboarding.saving : isLast ? t.onboarding.finish : t.onboarding.continueBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
