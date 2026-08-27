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
import { citizenshipGroup } from "../_lib/citizenshipGroups";
import { pressScale } from "../_lib/motion";
import { getFlagUrl } from "../_lib/flags";
import { supabase } from "../../lib/supabase";

type Option = {
  id: string;
  label: string;
  description?: string;
  icon: ReactNode;
  bareIcon?: boolean;
};

type Answers = {
  language?: string;
  citizenship?: string;
  currentCountry?: string;
  destination?: string;
  goal?: string;
  // Dynamic follow-up answers — only ever populated for the goal that
  // triggers them, everything else stays undefined.
  jobOffer?: string; // reuses the existing job_offer profile column
  alreadyAdmitted?: string; // reuses the existing already_admitted profile column
  studyLevel?: string;
  businessType?: string;
  familyMemberType?: string;
  hasChildren?: string;
  hasForeignEmployer?: string;
  willRegisterIp?: string;
  timeline?: string;
  hasCar?: string;
};

type ProfileFields = {
  language?: string;
  citizenship?: string;
  citizenship_group?: string | null;
  current_country?: string;
  country?: string;
  goal?: string;
  job_offer?: string;
  already_admitted?: string;
  study_level?: string;
  business_type?: string;
  family_member_type?: string;
  has_children?: string;
  has_foreign_employer?: string;
  will_register_ip?: string;
  timeline?: string;
  has_car?: string;
  onboarding_skipped?: boolean;
  skipped_steps?: string[];
};

// Every possible step across every path. The actual order shown to a given
// user is computed by computeStepOrder() below, based on their goal answer —
// see the big comment there for why.
const ALL_STEP_KEYS = [
  "language",
  "citizenship",
  "currentCountry",
  "destination",
  "goal",
  "jobOffer",
  "universityAccepted",
  "studyLevel",
  "businessType",
  "familyMemberType",
  "hasChildren",
  "foreignEmployer",
  "registerIp",
  "timeline",
  "hasCar",
] as const;
type StepKey = (typeof ALL_STEP_KEYS)[number];

type DynamicStepKey =
  | "jobOffer"
  | "universityAccepted"
  | "studyLevel"
  | "businessType"
  | "familyMemberType"
  | "hasChildren"
  | "foreignEmployer"
  | "registerIp"
  | "timeline"
  | "hasCar";

const DYNAMIC_STEP_KEYS: readonly DynamicStepKey[] = [
  "jobOffer",
  "universityAccepted",
  "studyLevel",
  "businessType",
  "familyMemberType",
  "hasChildren",
  "foreignEmployer",
  "registerIp",
  "timeline",
  "hasCar",
];

function isDynamicStep(key: StepKey): key is DynamicStepKey {
  return (DYNAMIC_STEP_KEYS as readonly string[]).includes(key);
}

// Maps each dynamic step to the Answers field it reads/writes. jobOffer and
// universityAccepted deliberately reuse the existing job_offer /
// already_admitted answers (see ProfileFields) instead of introducing
// duplicate columns.
const DYNAMIC_STEP_ANSWER_FIELD: Record<DynamicStepKey, keyof Answers> = {
  jobOffer: "jobOffer",
  universityAccepted: "alreadyAdmitted",
  studyLevel: "studyLevel",
  businessType: "businessType",
  familyMemberType: "familyMemberType",
  hasChildren: "hasChildren",
  foreignEmployer: "hasForeignEmployer",
  registerIp: "willRegisterIp",
  timeline: "timeline",
  hasCar: "hasCar",
};

const DYNAMIC_STEP_DB_FIELD: Record<DynamicStepKey, keyof ProfileFields> = {
  jobOffer: "job_offer",
  universityAccepted: "already_admitted",
  studyLevel: "study_level",
  businessType: "business_type",
  familyMemberType: "family_member_type",
  hasChildren: "has_children",
  foreignEmployer: "has_foreign_employer",
  registerIp: "will_register_ip",
  timeline: "timeline",
  hasCar: "has_car",
};

// Builds the actual step sequence for this user. destination is answered
// before goal, and goal is answered before any of these, so by the time we
// need to know which follow-ups to show, we already know the answer.
function computeStepOrder(goal: string | undefined): StepKey[] {
  const base: StepKey[] = ["language", "citizenship", "currentCountry", "destination", "goal"];
  const dynamic: StepKey[] = [];

  if (goal === "work") {
    dynamic.push("jobOffer");
  } else if (goal === "study") {
    dynamic.push("universityAccepted", "studyLevel");
  } else if (goal === "business") {
    dynamic.push("businessType");
  } else if (goal === "family") {
    dynamic.push("familyMemberType", "hasChildren");
  } else if (goal === "remote") {
    dynamic.push("foreignEmployer", "registerIp");
  }
  // savings and other: no extra questions, straight to timeline.

  return [...base, ...dynamic, "timeline", "hasCar"];
}

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
// Laptop — represents remote/location-independent work, distinct from the
// briefcase used for WORK_ICON so the two goals don't look identical.
const NOMAD_ICON = (
  <svg {...ICON_PROPS}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16.5V6a1 1 0 011-1h14a1 1 0 011 1v10.5M2.5 19.5h19a1 1 0 00.95-1.32l-.5-1.5a1 1 0 00-.95-.68H3a1 1 0 00-.95.68l-.5 1.5a1 1 0 00.95 1.32zM9 8.5h6"
    />
  </svg>
);
// City skyline (office buildings) — was previously a house silhouette, which
// visually read as "housing" rather than "business" (see onboarding screenshot).
const BUSINESS_ICON = (
  <svg {...ICON_PROPS}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 21V6a1 1 0 011-1h4a1 1 0 011 1v15M10 21V3a1 1 0 011-1h2a1 1 0 011 1v18M14 21V9a1 1 0 011-1h4a1 1 0 011 1v12M3 21h18M7 8.5h.01M7 12h.01M7 15.5h.01M17 12h.01M17 15.5h.01"
    />
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
const YES_ICON = (
  <svg {...ICON_PROPS}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 12.75l2.5 2.5 5-5.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const NO_ICON = (
  <svg {...ICON_PROPS}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const CLOCK_ICON = (
  <svg {...ICON_PROPS}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75v5.25l3.5 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const CAR_ICON = (
  <svg {...ICON_PROPS}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 16.5v-3.375c0-.621.504-1.125 1.125-1.125h.375l1.5-3.75a1.5 1.5 0 011.382-1h7.736a1.5 1.5 0 011.382 1l1.5 3.75h.375c.621 0 1.125.504 1.125 1.125V16.5M3.75 16.5a1.5 1.5 0 001.5 1.5h.75a1.5 1.5 0 001.5-1.5M3.75 16.5v1.125c0 .621.504 1.125 1.125 1.125h.375m13.5-2.25a1.5 1.5 0 01-1.5 1.5h-.75a1.5 1.5 0 01-1.5-1.5m3.75 0v1.125c0 .621-.504 1.125-1.125 1.125h-.375M6.75 13.5h10.5"
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
  // True while the citizenship/currentCountry searchable dropdown is open —
  // its list can extend down over the skip button, so we fade the button
  // out (not unmount it) while that's happening, then fade it back in.
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);

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
      jobOffer: profile.job_offer ?? undefined,
      alreadyAdmitted: profile.already_admitted ?? undefined,
      studyLevel: profile.study_level ?? undefined,
      businessType: profile.business_type ?? undefined,
      familyMemberType: profile.family_member_type ?? undefined,
      hasChildren: profile.has_children ?? undefined,
      hasForeignEmployer: profile.has_foreign_employer ?? undefined,
      willRegisterIp: profile.will_register_ip ?? undefined,
      timeline: profile.timeline ?? undefined,
      hasCar: profile.has_car ?? undefined,
    };
    const restoredSkipped = (profile.skipped_steps ?? []).filter((key): key is StepKey =>
      (ALL_STEP_KEYS as readonly string[]).includes(key),
    );

    if (Object.values(restoredAnswers).some(Boolean) || restoredSkipped.length > 0) {
      setAnswers(restoredAnswers);
      setSkippedSteps(restoredSkipped);

      // Resolve the resume index against the step order this user's actual
      // goal produces, not the order at the time this effect happens to run.
      const resumeStepOrder = computeStepOrder(restoredAnswers.goal);
      const resumeIndex = resumeStepOrder.findIndex((key) => restoredSkipped.includes(key));
      if (resumeIndex !== -1) setStep(resumeIndex);
    }

    setHydrated(true);
  }, [profile, hydrated]);

  const STEP_ORDER = computeStepOrder(answers.goal);
  const stepIndex = Math.min(step, STEP_ORDER.length - 1);
  const stepKey: StepKey = STEP_ORDER[stepIndex];
  const isLast = stepIndex === STEP_ORDER.length - 1;

  // The country dropdown unmounts on every step change (Reveal below is
  // keyed by stepKey), so make sure the skip button doesn't stay faded out
  // if a step change happened while it was open.
  useEffect(() => {
    setCountryDropdownOpen(false);
  }, [stepKey]);

  function isStepAnswered(key: StepKey, a: Answers): boolean {
    switch (key) {
      case "language":
        return !!a.language;
      case "citizenship":
        return !!a.citizenship;
      case "currentCountry":
        return !!a.currentCountry;
      case "destination":
        return !!a.destination;
      case "goal":
        return !!a.goal;
      default:
        return !!a[DYNAMIC_STEP_ANSWER_FIELD[key]];
    }
  }

  const canContinue = isStepAnswered(stepKey, answers);

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
    saveFields({ citizenship: code, citizenship_group: citizenshipGroup(code) ?? null });
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

  function selectDynamicAnswer(key: DynamicStepKey, value: string) {
    const answerField = DYNAMIC_STEP_ANSWER_FIELD[key];
    const dbField = DYNAMIC_STEP_DB_FIELD[key];
    setAnswers((prev) => ({ ...prev, [answerField]: value }));
    saveFields({ [dbField]: value } as ProfileFields);
  }

  function answeredFields(a: Answers): ProfileFields {
    const fields: ProfileFields = {};
    if (a.language) fields.language = a.language;
    if (a.citizenship) {
      fields.citizenship = a.citizenship;
      fields.citizenship_group = citizenshipGroup(a.citizenship) ?? null;
    }
    if (a.currentCountry) fields.current_country = a.currentCountry;
    if (a.destination) fields.country = a.destination;
    if (a.goal) fields.goal = a.goal;
    if (a.jobOffer) fields.job_offer = a.jobOffer;
    if (a.alreadyAdmitted) fields.already_admitted = a.alreadyAdmitted;
    if (a.studyLevel) fields.study_level = a.studyLevel;
    if (a.businessType) fields.business_type = a.businessType;
    if (a.familyMemberType) fields.family_member_type = a.familyMemberType;
    if (a.hasChildren) fields.has_children = a.hasChildren;
    if (a.hasForeignEmployer) fields.has_foreign_employer = a.hasForeignEmployer;
    if (a.willRegisterIp) fields.will_register_ip = a.willRegisterIp;
    if (a.timeline) fields.timeline = a.timeline;
    if (a.hasCar) fields.has_car = a.hasCar;
    return fields;
  }

  // Finalizes onboarding once every step has been answered or skipped, and
  // sends the user to the AI route results — never before that point.
  async function finishOnboarding(finalSkipped: StepKey[]) {
    if (!user) return;
    setError(null);
    setSaving(true);

    const baseFields: ProfileFields = {
      language: answers.language ?? "ru",
      country: answers.destination ?? "Poland",
      citizenship: answers.citizenship ?? "Other",
      citizenship_group: citizenshipGroup(answers.citizenship) ?? null,
      current_country: answers.currentCountry ?? "Other",
      goal: answers.goal ?? "work",
    };

    const { error: profileError } = await supabase.from("profiles").upsert({
      id: user.id,
      name: (user.user_metadata?.name as string | undefined) ?? null,
      email: user.email,
      skipped_steps: finalSkipped,
      onboarding_skipped: finalSkipped.length > 0,
      ...baseFields,
      ...answeredFields(answers),
    });

    if (profileError) {
      setError(profileError.message);
      setSaving(false);
      return;
    }

    const progressRows = STEPS_COMPLETED_ON_ONBOARDING.map((documentType) => ({
      user_id: user.id,
      country: baseFields.country,
      document_type: documentType,
      steps_completed: 1,
      total_steps: 1,
    }));

    const { error: progressError } = await supabase
      .from("progress")
      .upsert(progressRows, { onConflict: "user_id,document_type" });

    if (progressError) {
      // Non-fatal for navigation (the user still finished onboarding), but
      // if this silently fails the dashboard's "Текущий этап" gets stuck on
      // the first phase forever since account/onboarding/visa_eligibility
      // never register as done. Surface it so it's visible in monitoring.
      console.error("Failed to mark onboarding progress steps complete:", progressError.message);
    }

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

  // Every goal maps to a real legal basis for a Polish residence permit
  // (praca, studia, działalność gospodarcza, łączenie rodzin, inne
  // okoliczności), so no id needs to be removed for Poland — the ids
  // themselves are load-bearing (matched exactly in checklist.ts, the home
  // and profile pages, the AI chat route, and the document filtering
  // matrix), so only order/labels/icons are customized per destination,
  // never the id strings.
  const ALL_GOAL_OPTIONS: Record<string, Option> = {
    work: { id: "work", label: t.onboarding.goalOptions.work, description: t.onboarding.goalOptions.workDesc, icon: WORK_ICON },
    study: { id: "study", label: t.onboarding.goalOptions.study, description: t.onboarding.goalOptions.studyDesc, icon: STUDY_ICON },
    business: { id: "business", label: t.onboarding.goalOptions.business, description: t.onboarding.goalOptions.businessDesc, icon: BUSINESS_ICON },
    family: { id: "family", label: t.onboarding.goalOptions.family, description: t.onboarding.goalOptions.familyDesc, icon: FAMILY_ICON },
    remote: { id: "remote", label: t.onboarding.goalOptions.remote, description: t.onboarding.goalOptions.remoteDesc, icon: NOMAD_ICON },
    savings: { id: "savings", label: t.onboarding.goalOptions.savings, description: t.onboarding.goalOptions.savingsDesc, icon: INVESTMENT_ICON },
    other: { id: "other", label: t.onboarding.goalOptions.other, icon: OTHER_ICON },
  };

  // Order per destination country. Poland (the only currently-selectable
  // destination) leads with the four goals that map to a dedicated,
  // well-established Polish residence-permit basis (work/study/business
  // visas, family reunification), then the two "inne okoliczności" /
  // freelance-adjacent goals (Poland has no dedicated digital-nomad or
  // passive-income visa, unlike Spain/Portugal), then "other" last.
  const GOAL_ORDER_BY_DESTINATION: Record<string, string[]> = {
    Poland: ["work", "study", "business", "family", "savings", "remote", "other"],
  };
  const DEFAULT_GOAL_ORDER = ["work", "study", "business", "savings", "remote", "family", "other"];

  const goalOptions: Option[] = (GOAL_ORDER_BY_DESTINATION[answers.destination ?? ""] ?? DEFAULT_GOAL_ORDER).map(
    (id) => ALL_GOAL_OPTIONS[id]
  );

  function binaryOptions(dict: { yes: string; no: string }, yesIcon: ReactNode = YES_ICON, noIcon: ReactNode = NO_ICON): Option[] {
    return [
      { id: "yes", label: dict.yes, icon: yesIcon },
      { id: "no", label: dict.no, icon: noIcon },
    ];
  }

  function dynamicStepOptions(key: DynamicStepKey): Option[] {
    switch (key) {
      case "jobOffer":
        return binaryOptions(t.onboarding.jobOfferOptions);
      case "universityAccepted":
        return binaryOptions(t.onboarding.universityAcceptedOptions);
      case "studyLevel":
        return [
          { id: "bachelor", label: t.onboarding.studyLevelOptions.bachelor, icon: STUDY_ICON },
          { id: "master", label: t.onboarding.studyLevelOptions.master, icon: STUDY_ICON },
          { id: "phd", label: t.onboarding.studyLevelOptions.phd, icon: STUDY_ICON },
        ];
      case "businessType":
        return [
          { id: "jdg", label: t.onboarding.businessTypeOptions.jdg, icon: BUSINESS_ICON },
          { id: "spzoo", label: t.onboarding.businessTypeOptions.spzoo, icon: BUSINESS_ICON },
          { id: "undecided", label: t.onboarding.businessTypeOptions.undecided, icon: OTHER_ICON },
        ];
      case "familyMemberType":
        return [
          { id: "spouse", label: t.onboarding.familyMemberTypeOptions.spouse, icon: FAMILY_ICON },
          { id: "parent", label: t.onboarding.familyMemberTypeOptions.parent, icon: FAMILY_ICON },
          { id: "child", label: t.onboarding.familyMemberTypeOptions.child, icon: FAMILY_ICON },
          { id: "multiple", label: t.onboarding.familyMemberTypeOptions.multiple, icon: FAMILY_ICON },
        ];
      case "hasChildren":
        return binaryOptions(t.onboarding.hasChildrenOptions);
      case "foreignEmployer":
        return binaryOptions(t.onboarding.foreignEmployerOptions);
      case "registerIp":
        return binaryOptions(t.onboarding.registerIpOptions);
      case "timeline":
        return [
          { id: "already", label: t.onboarding.timelineOptions.already, icon: CLOCK_ICON },
          { id: "month1", label: t.onboarding.timelineOptions.month1, icon: CLOCK_ICON },
          { id: "months3", label: t.onboarding.timelineOptions.months3, icon: CLOCK_ICON },
          { id: "months6", label: t.onboarding.timelineOptions.months6, icon: CLOCK_ICON },
          { id: "year1", label: t.onboarding.timelineOptions.year1, icon: CLOCK_ICON },
          { id: "exploring", label: t.onboarding.timelineOptions.exploring, icon: OTHER_ICON },
        ];
      case "hasCar":
        return binaryOptions(t.onboarding.hasCarOptions, CAR_ICON, NO_ICON);
    }
  }

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
        <span className="flex-1">
          <span className="block text-sm font-semibold text-text-primary">{option.label}</span>
          {option.description && (
            <span className="mt-0.5 block text-xs leading-snug text-text-muted">{option.description}</span>
          )}
        </span>
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
      <div className="relative flex min-h-dvh flex-col overflow-x-hidden px-6 py-10">
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
              {t.onboarding.stepLabel.replace("{current}", String(stepIndex + 1)).replace("{total}", String(STEP_ORDER.length))}
            </p>
          </div>

          <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-border-subtle">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent to-accent-bright transition-[width] duration-500 ease-[var(--ease-out-strong)]"
              style={{ width: `${((stepIndex + 1) / STEP_ORDER.length) * 100}%` }}
            />
          </div>

          <div className="flex flex-1 flex-col justify-center py-12">
            <Reveal key={stepKey}>
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
                      onOpenChange={setCountryDropdownOpen}
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
                      onOpenChange={setCountryDropdownOpen}
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

              {isDynamicStep(stepKey) && (
                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  {dynamicStepOptions(stepKey).map((option) =>
                    renderOptionCard(
                      option,
                      answers[DYNAMIC_STEP_ANSWER_FIELD[stepKey]] === option.id,
                      () => selectDynamicAnswer(stepKey, option.id),
                    ),
                  )}
                </div>
              )}
            </Reveal>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={stepIndex === 0 ? handleCancel : handleBack}
              className={`rounded-full border border-border-strong bg-surface-1 px-6 py-3 text-sm font-semibold text-text-primary transition-colors duration-150 hover:border-border-strong hover:bg-surface-hover ${pressScale}`}
            >
              {stepIndex === 0 ? t.onboarding.cancel : t.onboarding.back}
            </button>
            <div className="flex flex-col items-end gap-2">
              {error && <p className="text-xs text-red-400">{error}</p>}
              <div className="flex items-center gap-3">
                {/* Fades out (doesn't unmount) while the citizenship/currentCountry
                    dropdown is open — its list can extend down over this button. */}
                <div
                  className={`relative transition-opacity duration-200 ease-[var(--ease-out-strong)] ${
                    countryDropdownOpen ? "pointer-events-none opacity-0" : "opacity-100"
                  }`}
                >
                  <button
                    type="button"
                    tabIndex={countryDropdownOpen ? -1 : 0}
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
                  {showSkipTip && !countryDropdownOpen && (
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
