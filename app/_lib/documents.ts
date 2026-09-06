import type { Dictionary } from "./i18n";
import type { Goal } from "./routeEngine";

export type DocCategory =
  | "passport"
  | "pesel"
  | "workPermit"
  | "insurance"
  | "bank"
  | "biometric"
  | "address"
  | "residencePermit"
  | "taxId"
  | "employment"
  | "business";
export type DocStatus = "verified" | "pending" | "missing" | "locked";
export type DocNameKey = keyof Dictionary["documents"]["docNames"];

export type DocumentItem = {
  id: string;
  nameKey: DocNameKey;
  category: DocCategory;
  status: DocStatus;
  fileName?: string;
  storagePath?: string;
  // Which onboarding goal(s) this document is actually relevant for —
  // undefined means it applies regardless of goal (basic paperwork every
  // relocation needs: passport, PESEL, insurance, bank, biometrics,
  // meldunek, karta pobytu). Goal-specific documents (work permit,
  // employment contract, business registration, etc.) list only the
  // goal(s) that need them, mirroring the goal_work/goal_study/... columns
  // on document_guides.
  goals?: Goal[];
  // Only relevant once the user has answered "yes" to already having a job
  // offer (see onboarding's jobOffer step / profile.job_offer).
  requiresJobOffer?: boolean;
};

export const DOCUMENT_CATALOG: DocumentItem[] = [
  { id: "passport-scan", nameKey: "passportScan", category: "passport", status: "missing" },
  { id: "passport-photo", nameKey: "passportPhoto", category: "passport", status: "missing" },
  { id: "pesel-form", nameKey: "peselForm", category: "pesel", status: "missing" },
  { id: "pesel-letter", nameKey: "peselLetter", category: "pesel", status: "missing" },
  { id: "work-permit-app", nameKey: "workPermitApp", category: "workPermit", status: "missing", goals: ["work"] },
  {
    id: "sponsorship-letter",
    nameKey: "sponsorshipLetter",
    category: "workPermit",
    status: "missing",
    goals: ["work"],
    requiresJobOffer: true,
  },
  { id: "health-insurance", nameKey: "healthInsurance", category: "insurance", status: "missing" },
  { id: "travel-insurance", nameKey: "travelInsurance", category: "insurance", status: "missing" },
  { id: "bank-confirmation", nameKey: "bankConfirmation", category: "bank", status: "missing" },
  { id: "proof-of-funds", nameKey: "proofOfFunds", category: "bank", status: "missing", goals: ["savings", "study", "business"] },
  { id: "relocation-letter", nameKey: "relocationLetter", category: "workPermit", status: "locked", goals: ["work"] },
  { id: "tax-residency", nameKey: "taxResidency", category: "bank", status: "locked", goals: ["business", "remote"] },
  { id: "biometric-confirmation", nameKey: "biometricConfirmation", category: "biometric", status: "missing" },
  { id: "address-confirmation", nameKey: "addressConfirmation", category: "address", status: "missing" },
  { id: "residence-permit-scan", nameKey: "residencePermitScan", category: "residencePermit", status: "missing" },
  {
    id: "tax-id-confirmation",
    nameKey: "taxIdConfirmation",
    category: "taxId",
    status: "missing",
    goals: ["work", "business", "remote"],
  },
  { id: "employment-contract", nameKey: "employmentContract", category: "employment", status: "missing", goals: ["work"] },
  {
    id: "business-registration-confirmation",
    nameKey: "businessRegistrationConfirmation",
    category: "business",
    status: "missing",
    goals: ["business"],
  },
];

// Filters the static catalog down to what's actually relevant for this
// user's onboarding answers. Mirrors the spirit of guideAppliesTo() in
// DocumentGuideList.tsx (goal_work/goal_study/... columns on
// document_guides), but for the fixed upload-tracker list above rather than
// the DB-driven guide matrix.
//
// If we don't know the user's goals yet (still in demo mode, or hasn't
// finished onboarding), nothing is filtered out — better to over-show than
// hide documents someone might actually need.
export function getRelevantDocuments(
  catalog: DocumentItem[],
  ctx: { goals?: string[] | null; jobOffer?: string | null },
): DocumentItem[] {
  const goals = ctx.goals?.length ? ctx.goals : null;
  if (!goals) return catalog;

  return catalog.filter((doc) => {
    if (doc.goals && !doc.goals.some((g) => goals.includes(g))) return false;
    if (doc.requiresJobOffer && ctx.jobOffer !== "yes") return false;
    return true;
  });
}

export const STATUS_BADGE_CLASS: Record<DocStatus, string> = {
  verified: "border-emerald-500/30 bg-emerald-500/15 text-emerald-400",
  pending: "border-amber-500/30 bg-amber-500/15 text-amber-400",
  missing: "border-border-strong bg-surface-1 text-text-muted",
  locked: "border-accent/30 bg-accent/10 text-accent-bright",
};
