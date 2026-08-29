import type { Lang } from "./i18n";

// document_guides rows carry the original Russian text in the base columns
// (name, description, ...) plus translated copies in <field>_en/_uz/_tr/_tg/_uk
// (see add-document-guides-i18n-columns.sql). This swaps the base fields for
// the current language's translation, purely for display — it never mutates
// the row Supabase returned, and callers that filter by the base "category"
// column should do that filtering in the query itself (before this runs) so
// it always compares against the untouched Russian value.
const SCALAR_FIELDS = [
  "name",
  "description",
  "when_to_get",
  "where_to_submit",
  "working_hours",
  "online_booking",
  "cost",
  "waiting_time",
  "important_2026",
  "category",
  "price_label",
] as const;

const ARRAY_FIELDS = ["required_docs", "instructions", "common_mistakes", "tips"] as const;

export function localizeDocumentGuide<T extends Record<string, unknown>>(row: T, lang: Lang): T {
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

export function localizeDocumentGuides<T extends Record<string, unknown>>(rows: T[], lang: Lang): T[] {
  return rows.map((row) => localizeDocumentGuide(row, lang));
}
