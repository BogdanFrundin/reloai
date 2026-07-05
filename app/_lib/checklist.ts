import type { Dictionary } from "./i18n";

export type ChecklistStepDef = {
  documentType: string;
  title: string;
  description: string;
};

export const STEPS_COMPLETED_ON_ONBOARDING = ["account", "onboarding", "visa_eligibility"];

type GoalBucket = "work" | "study" | "business" | "family";
type CountryKey = "poland" | "germany" | "spain";

function goalBucket(goal: string | null | undefined): GoalBucket {
  if (goal === "study") return "study";
  if (goal === "business" || goal === "investment") return "business";
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
  const isEuCitizen = citizenship === "OtherEU";
  const bucket = goalBucket(goal);

  const visaDescription = isEuCitizen ? s.visa.euDesc : s.visa.byCountry[countryKey(country)][bucket];

  const steps: ChecklistStepDef[] = [
    { documentType: "account", title: s.account.title, description: s.account.desc },
    { documentType: "onboarding", title: s.onboarding.title, description: s.onboarding.desc },
    { documentType: "visa_eligibility", title: s.visa.title, description: visaDescription },
  ];

  if (bucket === "business") {
    steps.push({ documentType: "business_registration", title: s.business.title, description: s.business.desc });
  }

  steps.push(
    { documentType: "documents", title: s.documents.title, description: s.documents.desc },
    { documentType: "biometric", title: s.biometric.title, description: s.biometric.desc },
    { documentType: "residence_permit", title: s.residence.title, description: s.residence.desc },
    { documentType: "address_registration", title: s.address.title, description: s.address.desc },
  );

  return steps;
}
