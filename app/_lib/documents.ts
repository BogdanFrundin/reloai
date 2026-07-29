import type { Dictionary } from "./i18n";

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
};

export const DOCUMENT_CATALOG: DocumentItem[] = [
  { id: "passport-scan", nameKey: "passportScan", category: "passport", status: "missing" },
  { id: "passport-photo", nameKey: "passportPhoto", category: "passport", status: "missing" },
  { id: "pesel-form", nameKey: "peselForm", category: "pesel", status: "missing" },
  { id: "pesel-letter", nameKey: "peselLetter", category: "pesel", status: "missing" },
  { id: "work-permit-app", nameKey: "workPermitApp", category: "workPermit", status: "missing" },
  { id: "sponsorship-letter", nameKey: "sponsorshipLetter", category: "workPermit", status: "missing" },
  { id: "health-insurance", nameKey: "healthInsurance", category: "insurance", status: "missing" },
  { id: "travel-insurance", nameKey: "travelInsurance", category: "insurance", status: "missing" },
  { id: "bank-confirmation", nameKey: "bankConfirmation", category: "bank", status: "missing" },
  { id: "proof-of-funds", nameKey: "proofOfFunds", category: "bank", status: "missing" },
  { id: "relocation-letter", nameKey: "relocationLetter", category: "workPermit", status: "locked" },
  { id: "tax-residency", nameKey: "taxResidency", category: "bank", status: "locked" },
  { id: "biometric-confirmation", nameKey: "biometricConfirmation", category: "biometric", status: "missing" },
  { id: "address-confirmation", nameKey: "addressConfirmation", category: "address", status: "missing" },
  { id: "residence-permit-scan", nameKey: "residencePermitScan", category: "residencePermit", status: "missing" },
  { id: "tax-id-confirmation", nameKey: "taxIdConfirmation", category: "taxId", status: "missing" },
  { id: "employment-contract", nameKey: "employmentContract", category: "employment", status: "missing" },
  { id: "business-registration-confirmation", nameKey: "businessRegistrationConfirmation", category: "business", status: "missing" },
];

export const STATUS_BADGE_CLASS: Record<DocStatus, string> = {
  verified: "border-emerald-500/30 bg-emerald-500/15 text-emerald-400",
  pending: "border-amber-500/30 bg-amber-500/15 text-amber-400",
  missing: "border-border-strong bg-surface-1 text-text-muted",
  locked: "border-accent/30 bg-accent/10 text-accent-bright",
};
