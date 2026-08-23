// Citizenship groups used to filter which documents/visas apply to a user,
// mirroring the "Гр.А/Б/В/Г" columns in the document filtering matrix
// (document_guides.group_a/b/c/d — see the SQL migration delivered alongside
// this file). Groups reflect actual Polish/Schengen entry & residence rules,
// not arbitrary buckets:
//
//   A — Ukraine only: covered by the temporary protection regime (special,
//       simplified legal track — PESEL UKR, no Visa D needed).
//   B — third-country nationals who need a Schengen national Visa D to enter
//       Poland for work/study/business/family (no visa-waiver agreement).
//   C — EU / EEA / Switzerland: free movement, no visa or residence card
//       needed under Polish immigration law.
//   D — third-country nationals with a Schengen short-stay visa waiver, but
//       who still need a residence permit (karta pobytu) for stays beyond
//       90 days for work/study/business/family.
//
// Codes are ISO 3166-1 alpha-2, matching what's already stored in
// profiles.citizenship (see supabase/schema.sql) and in the existing
// document_guides.countries jsonb maps.
export type CitizenshipGroup = "A" | "B" | "C" | "D";

const GROUP_A: readonly string[] = ["UA"];

const GROUP_B: readonly string[] = ["AM", "BY", "RU", "UZ", "TJ", "KZ", "KG", "TM", "AZ", "TR"];

const GROUP_C: readonly string[] = [
  "DE", "FR", "IT", "ES", "NL", "BE", "AT", "SE", "DK", "FI",
  "CZ", "SK", "HU", "RO", "BG", "HR", "GR", "PT", "LT", "LV",
  "EE", "NO", "CH",
];

const GROUP_D: readonly string[] = ["MD", "GE", "GB", "US", "CA", "AU", "JP", "KR", "IL"];

const COUNTRY_GROUP: Record<string, CitizenshipGroup> = {};
for (const code of GROUP_A) COUNTRY_GROUP[code] = "A";
for (const code of GROUP_B) COUNTRY_GROUP[code] = "B";
for (const code of GROUP_C) COUNTRY_GROUP[code] = "C";
for (const code of GROUP_D) COUNTRY_GROUP[code] = "D";

export function citizenshipGroup(code: string | null | undefined): CitizenshipGroup | undefined {
  if (!code) return undefined;
  return COUNTRY_GROUP[code.toUpperCase()];
}
