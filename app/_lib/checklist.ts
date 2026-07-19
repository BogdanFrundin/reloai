import type { Dictionary } from "./i18n";
import { isEuCountry } from "./countries";

export type PhaseKey = "beforeDeparture" | "legalization" | "residenceCard" | "workTaxes";

export const PHASE_ORDER: PhaseKey[] = ["beforeDeparture", "legalization", "residenceCard", "workTaxes"];

export type ChecklistStepDef = {
  documentType: string;
  title: string;
  description: string;
  phase: PhaseKey;
};

export const STEPS_COMPLETED_ON_ONBOARDING = ["account", "onboarding", "visa_eligibility"];

type GoalBucket = "work" | "study" | "business" | "family";
type CountryKey = "poland" | "germany" | "spain";

function goalBucket(goal: string | null | undefined): GoalBucket {
  if (goal === "study") return "study";
  if (goal === "business" || goal === "investment" || goal === "passiveIncome") return "business";
  if (goal === "work" || goal === "digitalNomad") return "work";
  return "family";
}

function countryKey(country: string | null | undefined): CountryKey {
  if (country === "Germany") return "germany";
  if (country === "Spain") return "spain";
  return "poland";
}

export function buildChecklistSteps(
  t: Dictionary,
  country: string | null | undefined,
  goal: string | null | undefined,
  citizenship: string | null | undefined,
): ChecklistStepDef[] {
  const s = t.dashboard.steps;
  const isEuCitizen = isEuCountry(citizenship);
  const bucket = goalBucket(goal);
  const key = countryKey(country);

  const visaDescription = isEuCitizen ? s.visa.euDesc : s.visa.byCountry[key][bucket];

  const steps: ChecklistStepDef[] = [
    { documentType: "account", title: s.account.title, description: s.account.desc, phase: "beforeDeparture" },
    { documentType: "onboarding", title: s.onboarding.title, description: s.onboarding.desc, phase: "beforeDeparture" },
    { documentType: "visa_eligibility", title: s.visa.title, description: visaDescription, phase: "beforeDeparture" },
  ];

  if (bucket === "business") {
    steps.push({
      documentType: "business_registration",
      title: s.business.title,
      description: s.business.desc,
      phase: "legalization",
    });
  }

  steps.push(
    { documentType: "documents", title: s.documents.title, description: s.documents.desc, phase: "legalization" },
    { documentType: "biometric", title: s.biometric.title, description: s.biometric.desc, phase: "legalization" },
    {
      documentType: "address_registration",
      title: s.address.title,
      description: s.address.desc,
      phase: "legalization",
    },
    {
      documentType: "residence_permit",
      title: s.residence.title,
      description: s.residence.desc,
      phase: "residenceCard",
    },
    {
      documentType: "tax_id",
      title: s.taxId.title,
      description: s.taxId.byCountry[key],
      phase: "workTaxes",
    },
    {
      documentType: "employment_registration",
      title: s.employmentRegistration.title,
      description: s.employmentRegistration.byCountry[key],
      phase: "workTaxes",
    },
  );

  return steps;
}

export type Phase = {
  key: PhaseKey;
  steps: ChecklistStepDef[];
};

export function buildPhases(steps: ChecklistStepDef[]): Phase[] {
  return PHASE_ORDER.map((key) => ({ key, steps: steps.filter((step) => step.phase === key) })).filter(
    (phase) => phase.steps.length > 0,
  );
}

export type PhaseStatus = "done" | "in_progress" | "waiting";

export function derivePhaseStatuses(
  phases: Phase[],
  completed: Set<string>,
): Record<PhaseKey, PhaseStatus> {
  const statuses = {} as Record<PhaseKey, PhaseStatus>;
  let sawInProgress = false;

  for (const phase of phases) {
    const isDone = phase.steps.every((step) => completed.has(step.documentType));
    if (isDone) {
      statuses[phase.key] = "done";
    } else if (!sawInProgress) {
      statuses[phase.key] = "in_progress";
      sawInProgress = true;
    } else {
      statuses[phase.key] = "waiting";
    }
  }

  return statuses;
}
