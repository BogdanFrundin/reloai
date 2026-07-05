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

type Answers = {
  language?: string;
  destination?: string;
  city?: string;
  citizenship?: string;
  currentLocation?: string;
  goal?: string;
  jobOffer?: string;
  alreadyAdmitted?: string;
};

type ProfileFields = {
  language?: string;
  country?: string;
  city?: string;
  citizenship?: string;
  current_country?: string;
  goal?: string;
  job_offer?: string;
  already_admitted?: string;
  onboarding_skipped?: boolean;
};

const STEP_ORDER = ["language", "destination", "citizenship", "currentLocation", "goal"] as const;
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
const HOME_ICON = (
  <svg {...ICON_PROPS}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75V20a1 1 0 01-1 1h-4a1 1 0 01-1-1v-5H9v5a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z" />
  </svg>
);
const DESTINATION_ICON = (
  <svg {...ICON_PROPS}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const TRANSIT_ICON = (
  <svg {...ICON_PROPS}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l1.5-5.5L3 12l1-2 8-1 3-6 2 1-1.5 6.5L21 12l-1 2-7 1-1.5 6z" />
  </svg>
);
const GLOBE_ICON = (
  <svg {...ICON_PROPS}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M11.5 3a17 17 0 000 18M12.5 3a17 17 0 010 18" />
  </svg>
);

const inputCls =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 transition-[border-color,box-shadow] duration-150 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

export default function OnboardingPage() {
  const router = useRouter();
  const { t, setLang } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSkipTip, setShowSkipTip] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/register");
    }
  }, [authLoading, user, router]);

  const stepKey: StepKey = STEP_ORDER[step];
  const isLast = step === STEP_ORDER.length - 1;

  const goalNeedsSubAnswer =
    answers.goal === "work" ? !answers.jobOffer : answers.goal === "study" ? !answers.alreadyAdmitted : false;

  const canContinue =
    stepKey === "language"
      ? !!answers.language
      : stepKey === "destination"
        ? !!answers.destination
        : stepKey === "citizenship"
          ? !!answers.citizenship
          : stepKey === "currentLocation"
            ? !!answers.currentLocation
            : !!answers.goal && !goalNeedsSubAnswer;

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

  function selectDestination(id: string) {
    setAnswers((prev) => ({ ...prev, destination: id }));
    saveFields({ country: id });
  }

  function selectCitizenship(id: string) {
    setAnswers((prev) => ({ ...prev, citizenship: id }));
    saveFields({ citizenship: id });
  }

  function selectCurrentLocation(id: string) {
    setAnswers((prev) => ({ ...prev, currentLocation: id }));
    saveFields({ current_country: id });
  }

  function selectGoal(id: string) {
    setAnswers((prev) => ({ ...prev, goal: id, jobOffer: undefined, alreadyAdmitted: undefined }));
    saveFields({ goal: id });
  }

  function selectJobOffer(id: string) {
    setAnswers((prev) => ({ ...prev, jobOffer: id }));
    saveFields({ job_offer: id });
  }

  function selectAlreadyAdmitted(id: string) {
    setAnswers((prev) => ({ ...prev, alreadyAdmitted: id }));
    saveFields({ already_admitted: id });
  }

  function handleCityBlur() {
    if (answers.city !== undefined) saveFields({ city: answers.city });
  }

  async function handleSkip() {
    if (!user) return;
    setSaving(true);
    await saveFields({ onboarding_skipped: true });
    await supabase.from("progress").upsert(
      { user_id: user.id, country: answers.destination ?? null, document_type: "account", steps_completed: 1, total_steps: 1 },
      { onConflict: "user_id,document_type" },
    );
    router.push("/pricing");
  }

  async function handleContinue() {
    if (!canContinue || !user) return;

    if (isLast) {
      setError(null);
      setSaving(true);

      const { error: profileError } = await supabase.from("profiles").upsert({
        id: user.id,
        name: (user.user_metadata?.name as string | undefined) ?? null,
        email: user.email,
        language: answers.language ?? "ru",
        country: answers.destination ?? "Poland",
        city: answers.city ?? null,
        citizenship: answers.citizenship ?? "Other",
        current_country: answers.currentLocation ?? "home",
        goal: answers.goal ?? "work",
        job_offer: answers.jobOffer ?? null,
        already_admitted: answers.alreadyAdmitted ?? null,
      });

      if (profileError) {
        setError(profileError.message);
        setSaving(false);
        return;
      }

      const progressRows = STEPS_COMPLETED_ON_ONBOARDING.map((documentType) => ({
        user_id: user.id,
        country: answers.destination ?? "Poland",
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

  const question = t.onboarding.steps[stepKey].question;
  const subheading = t.onboarding.steps[stepKey].subheading;

  const languageOptions: Option[] = LANGUAGES.map((l) => ({
    id: l.code,
    label: l.name,
    icon: <span className="text-3xl">{l.flag}</span>,
  }));

  const destinationOptions: Option[] = [
    { id: "Poland", label: t.countries.list[0].name, icon: <span className="text-3xl">🇵🇱</span> },
    { id: "Germany", label: t.countries.list[1].name, icon: <span className="text-3xl">🇩🇪</span> },
    { id: "Spain", label: t.countries.list[2].name, icon: <span className="text-3xl">🇪🇸</span> },
  ];

  const citizenshipOptions: { id: string; label: string; flag: string }[] = [
    { id: "Ukraine", label: t.onboarding.citizenshipOptions.ukraine, flag: "🇺🇦" },
    { id: "Russia", label: t.onboarding.citizenshipOptions.russia, flag: "🇷🇺" },
    { id: "Belarus", label: t.onboarding.citizenshipOptions.belarus, flag: "🇧🇾" },
    { id: "Kazakhstan", label: t.onboarding.citizenshipOptions.kazakhstan, flag: "🇰🇿" },
    { id: "Uzbekistan", label: t.onboarding.citizenshipOptions.uzbekistan, flag: "🇺🇿" },
    { id: "Tajikistan", label: t.onboarding.citizenshipOptions.tajikistan, flag: "🇹🇯" },
    { id: "Turkey", label: t.onboarding.citizenshipOptions.turkey, flag: "🇹🇷" },
    { id: "OtherEU", label: t.onboarding.citizenshipOptions.otherEu, flag: "🇪🇺" },
    { id: "Other", label: t.onboarding.citizenshipOptions.other, flag: "🌍" },
  ];

  const currentLocationOptions: Option[] = [
    { id: "home", label: t.onboarding.currentLocationOptions.home, icon: HOME_ICON },
    { id: "destination", label: t.onboarding.currentLocationOptions.destination, icon: DESTINATION_ICON },
    { id: "transit", label: t.onboarding.currentLocationOptions.transit, icon: TRANSIT_ICON },
    { id: "otherEu", label: t.onboarding.currentLocationOptions.otherEu, icon: GLOBE_ICON },
  ];

  const goalOptions: Option[] = [
    { id: "work", label: t.onboarding.goalOptions.work, icon: WORK_ICON },
    { id: "study", label: t.onboarding.goalOptions.study, icon: STUDY_ICON },
    { id: "business", label: t.onboarding.goalOptions.business, icon: BUSINESS_ICON },
    { id: "familyReunification", label: t.onboarding.goalOptions.familyReunification, icon: FAMILY_ICON },
    { id: "digitalNomad", label: t.onboarding.goalOptions.digitalNomad, icon: NOMAD_ICON },
    { id: "investment", label: t.onboarding.goalOptions.investment, icon: INVESTMENT_ICON },
    { id: "other", label: t.onboarding.goalOptions.other, icon: OTHER_ICON },
  ];

  function renderOptionCard(option: Option, isSelected: boolean, onClick: () => void) {
    return (
      <button
        key={option.id}
        type="button"
        onClick={onClick}
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
        <span className="flex-1 text-sm font-semibold text-white">{option.label}</span>
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
  }

  function renderYesNo(value: string | undefined, onSelect: (id: string) => void) {
    return (
      <div className="flex gap-2">
        {[
          { id: "yes", label: t.onboarding.yes },
          { id: "no", label: t.onboarding.no },
        ].map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onSelect(opt.id)}
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors duration-150 ${
              value === opt.id
                ? "border-accent bg-accent/15 text-accent-bright"
                : "border-white/15 bg-white/[0.03] text-slate-300 hover:border-white/30 hover:text-white"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
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
            <div className="flex items-center gap-3">
              <p className="text-sm text-slate-500">
                {t.onboarding.stepLabel.replace("{current}", String(step + 1)).replace("{total}", String(STEP_ORDER.length))}
              </p>
              <div className="relative">
                <button
                  type="button"
                  onClick={handleSkip}
                  onMouseEnter={() => setShowSkipTip(true)}
                  onMouseLeave={() => setShowSkipTip(false)}
                  onFocus={() => setShowSkipTip(true)}
                  onBlur={() => setShowSkipTip(false)}
                  className="text-xs font-medium text-slate-500 underline decoration-dotted underline-offset-4 transition-colors duration-150 hover:text-slate-300"
                >
                  {t.onboarding.skip}
                </button>
                {showSkipTip && (
                  <div
                    role="tooltip"
                    className="absolute right-0 top-full z-10 mt-2 w-56 rounded-xl border border-white/10 bg-[#0d0d0f]/95 px-3 py-2 text-xs leading-relaxed text-slate-300 shadow-xl shadow-black/40 backdrop-blur-xl"
                  >
                    {t.onboarding.skipTooltip}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent to-accent-bright transition-[width] duration-500 ease-[var(--ease-out-strong)]"
              style={{ width: `${((step + 1) / STEP_ORDER.length) * 100}%` }}
            />
          </div>

          <div className="flex flex-1 flex-col justify-center py-12">
            <Reveal key={step}>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{question}</h1>
              <p className="mt-3 text-slate-400">{subheading}</p>

              {stepKey === "language" && (
                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  {languageOptions.map((option) =>
                    renderOptionCard(option, answers.language === option.id, () => selectLanguage(option.id)),
                  )}
                </div>
              )}

              {stepKey === "destination" && (
                <>
                  <div className="mt-10 grid gap-4 sm:grid-cols-2">
                    {destinationOptions.map((option) =>
                      renderOptionCard(option, answers.destination === option.id, () => selectDestination(option.id)),
                    )}
                  </div>
                  <div className="mt-6">
                    <label htmlFor="city" className="text-sm font-medium text-slate-300">
                      {t.onboarding.cityLabel}
                    </label>
                    <input
                      id="city"
                      type="text"
                      value={answers.city ?? ""}
                      onChange={(event) => setAnswers((prev) => ({ ...prev, city: event.target.value }))}
                      onBlur={handleCityBlur}
                      placeholder={t.onboarding.cityPlaceholder}
                      className={`mt-1.5 ${inputCls}`}
                    />
                  </div>
                </>
              )}

              {stepKey === "citizenship" && (
                <div className="mt-10">
                  <select
                    value={answers.citizenship ?? ""}
                    onChange={(event) => selectCitizenship(event.target.value)}
                    className={`${inputCls} appearance-none bg-[#0d0d0f]`}
                  >
                    <option value="" disabled>
                      —
                    </option>
                    {citizenshipOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.flag} {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {stepKey === "currentLocation" && (
                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  {currentLocationOptions.map((option) =>
                    renderOptionCard(option, answers.currentLocation === option.id, () =>
                      selectCurrentLocation(option.id),
                    ),
                  )}
                </div>
              )}

              {stepKey === "goal" && (
                <>
                  <div className="mt-10 grid gap-4 sm:grid-cols-2">
                    {goalOptions.map((option) =>
                      renderOptionCard(option, answers.goal === option.id, () => selectGoal(option.id)),
                    )}
                  </div>

                  {answers.goal === "work" && (
                    <div className="mt-6 rounded-2xl border border-accent/20 bg-accent/[0.04] p-5">
                      <p className="text-sm font-semibold text-white">{t.onboarding.subQuestions.jobOffer}</p>
                      <div className="mt-3">{renderYesNo(answers.jobOffer, selectJobOffer)}</div>
                    </div>
                  )}

                  {answers.goal === "study" && (
                    <div className="mt-6 rounded-2xl border border-accent/20 bg-accent/[0.04] p-5">
                      <p className="text-sm font-semibold text-white">{t.onboarding.subQuestions.alreadyAdmitted}</p>
                      <div className="mt-3">{renderYesNo(answers.alreadyAdmitted, selectAlreadyAdmitted)}</div>
                    </div>
                  )}
                </>
              )}
            </Reveal>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 0}
              className={`rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:border-white/30 disabled:cursor-not-allowed disabled:opacity-0 ${pressScale}`}
            >
              {t.onboarding.back}
            </button>
            <div className="flex flex-col items-end gap-2">
              {error && <p className="text-xs text-red-400">{error}</p>}
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
    </PageTransition>
  );
}
