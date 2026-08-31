import type { Lang } from "./i18n";

// clinics rows carry the original Russian text in the base columns
// (category, description, specializations, required_docs) plus translated
// copies in <field>_en/_uz/_tr/_tg/_uk (see add-clinics-i18n-columns.sql).
// This swaps the base fields for the current language's translation, purely
// for display — it never mutates the row Supabase returned. name/address/
// district/city are never swapped: they're proper nouns and addresses that
// stay the same in every language.
const SCALAR_FIELDS = ["category", "description"] as const;
const ARRAY_FIELDS = ["specializations", "required_docs"] as const;

export function localizeClinic<T extends Record<string, unknown>>(row: T, lang: Lang): T {
  if (lang === "ru") return row;
  const out: Record<string, unknown> = { ...row };
  for (const field of SCALAR_FIELDS) {
    const val = row[`${field}_${lang}`];
    if (typeof val === "string" && val.trim() !== "") {
      out[field] = val;
    }
  }
  for (const field of ARRAY_FIELDS) {
    const val = row[`${field}_${lang}`];
    if (Array.isArray(val) && val.length > 0) {
      out[field] = val;
    }
  }
  return out as T;
}

export function localizeClinics<T extends Record<string, unknown>>(rows: T[], lang: Lang): T[] {
  return rows.map((row) => localizeClinic(row, lang));
}
