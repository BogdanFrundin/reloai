import type { Dictionary } from "./i18n";

export type DocCategory = "passport" | "pesel" | "workPermit" | "insurance" | "bank";
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
  { id: "passport-scan", nameKey: "passportScan", category: "passport", status: "verified" },
  { id: "passport-photo", nameKey: "passportPhoto", category: "passport", status: "verified" },
  { id: "pesel-form", nameKey: "peselForm", category: "pesel", status: "pending" },
  { id: "pesel-letter", nameKey: "peselLetter", category: "pesel", status: "missing" },
  { id: "work-permit-app", nameKey: "workPermitApp", category: "workPermit", status: "pending" },
  { id: "sponsorship-letter", nameKey: "sponsorshipLetter", category: "workPermit", status: "missing" },
  { id: "health-insurance", nameKey: "healthInsurance", category: "insurance", status: "verified" },
  { id: "travel-insurance", nameKey: "travelInsurance", category: "insurance", status: "missing" },
  { id: "bank-confirmation", nameKey: "bankConfirmation", category: "bank", status: "pending" },
  { id: "proof-of-funds", nameKey: "proofOfFunds", category: "bank", status: "missing" },
  { id: "relocation-letter", nameKey: "relocationLetter", category: "workPermit", status: "locked" },
  { id: "tax-residency", nameKey: "taxResidency", category: "bank", status: "locked" },
];

export const STATUS_BADGE_CLASS: Record<DocStatus, string> = {
  verified: "border-emerald-500/30 bg-emerald-500/15 text-emerald-400",
  pending: "border-amber-500/30 bg-amber-500/15 text-amber-400",
  missing: "border-border-strong bg-surface-1 text-text-muted",
  locked: "border-accent/30 bg-accent/10 text-accent-bright",
};
