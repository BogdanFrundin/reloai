// Turns the free-text `document_guides.timing` column (e.g. "День 3 после
// приезда", "Неделя 2", "Месяц 1-2", "Раз в год до 30 апреля") into a
// structured timeline: which of the 4 dashboard/documents sections a guide
// belongs to, and — once the user's move date is known — an exact deadline
// date. Deliberately generic (regex over the DB text) rather than a
// per-document lookup table, so it keeps working as document_guides grows.
export type TimelineSection = "before_departure" | "first_week" | "first_month" | "longterm";

export const SECTION_ORDER: TimelineSection[] = ["before_departure", "first_week", "first_month", "longterm"];

export const SECTION_TITLES: Record<TimelineSection, string> = {
  before_departure: "До отъезда",
  first_week: "Первая неделя",
  first_month: "Первый месяц",
  longterm: "Долгосрочно",
};

// The onboarding "when do you plan to move?" answer (see the "timeline" step
// in app/onboarding/page.tsx) mapped to days-from-today for the move's start
// date. null = "exploring" — no exact dates, relative labels only.
const START_OFFSET_DAYS: Record<string, number | null> = {
  already: 0,
  month1: 30,
  months3: 90,
  months6: 180,
  year1: 365,
  exploring: null,
};

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function computeStartDate(timeline: string | null | undefined): Date | null {
  if (!timeline || !(timeline in START_OFFSET_DAYS)) return null;
  const offset = START_OFFSET_DAYS[timeline];
  if (offset === null) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return addDays(today, offset);
}

// The "До отъезда" section only makes sense when the user has a genuine
// future move date — not for someone already in Poland ("already") and not
// for someone still "exploring" with no committed date.
export function hasFutureMoveDate(timeline: string | null | undefined): boolean {
  if (!timeline || !(timeline in START_OFFSET_DAYS)) return false;
  const offset = START_OFFSET_DAYS[timeline];
  return typeof offset === "number" && offset > 0;
}

const RU_MONTHS_GENITIVE = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];

export function formatDateRu(date: Date): string {
  const day = date.getDate();
  const month = RU_MONTHS_GENITIVE[date.getMonth()];
  const year = date.getFullYear();
  const currentYear = new Date().getFullYear();
  return year === currentYear ? `${day} ${month}` : `${day} ${month} ${year}`;
}

export type ParsedTiming = {
  section: TimelineSection;
  offsetDays: number | null;
  recurring: boolean;
  urgent: boolean;
  label: string;
};

// Some document_guides rows have their `timing` column set to the raw
// English section-key (e.g. "before_departure") instead of a human-readable
// Russian description — likely leftover from a bulk edit that used the
// internal key as a placeholder. Since these are plain English tokens, none
// of the Russian regexes below ever match them, so without this table they
// silently fall through to the generic "first_month" default AND get
// rendered to the user as literal untranslated key text (the exact bug this
// fixes). Recognize them up front and translate straight to a proper
// section + Russian label instead of treating them as unstructured text.
const RAW_SECTION_KEY_ALIASES: Record<string, TimelineSection> = {
  before_departure: "before_departure",
  beforedeparture: "before_departure",
  first_week: "first_week",
  firstweek: "first_week",
  first_month: "first_month",
  firstmonth: "first_month",
  longterm: "longterm",
  long_term: "longterm",
};

// Parses a document_guides.timing string into a section + day offset from
// the move's start date. Falls back to "first_month"/no exact offset for
// text it doesn't recognize, so an unusual timing string still renders
// (just without a computed deadline date) instead of breaking the page.
//
// `sectionTitles` overrides the section-name labels used when a timing
// value is one of the RAW_SECTION_KEY_ALIASES (rather than free-text) —
// pass the current UI language's translated titles so this label isn't
// stuck in Russian. Defaults to SECTION_TITLES (Russian) for callers that
// don't have a Dictionary handy.
export function parseTiming(
  raw: string | null | undefined,
  sectionTitles: Record<TimelineSection, string> = SECTION_TITLES,
): ParsedTiming {
  const label = (raw ?? "").replace(/⚠️?/g, "").trim();
  const lower = label.toLowerCase();
  const urgent = /⚠|сразу/i.test(raw ?? "");
  const recurring = /раз в год|каждый год|ежегодно/.test(lower);

  if (!label) {
    return { section: "first_month", offsetDays: null, recurring: false, urgent: false, label: "" };
  }

  const aliasedSection = RAW_SECTION_KEY_ALIASES[lower.replace(/\s+/g, "")];
  if (aliasedSection) {
    return { section: aliasedSection, offsetDays: null, recurring: false, urgent, label: sectionTitles[aliasedSection] };
  }

  if (recurring) {
    return { section: "longterm", offsetDays: null, recurring: true, urgent, label };
  }

  if (lower.includes("до отъезда")) {
    const daysMatch = lower.match(/(\d+)\s*дн/);
    const offsetDays = daysMatch ? -Number(daysMatch[1]) : -14;
    return { section: "before_departure", offsetDays, recurring: false, urgent, label };
  }

  const dayMatch = lower.match(/день\s*(\d+)/);
  if (dayMatch) {
    const day = Number(dayMatch[1]);
    return { section: day <= 7 ? "first_week" : day <= 30 ? "first_month" : "longterm", offsetDays: day, recurring: false, urgent, label };
  }

  if (lower.includes("первые 7 дней") || lower.includes("первая неделя")) {
    return { section: "first_week", offsetDays: 6, recurring: false, urgent, label };
  }

  const weekMatch = lower.match(/недел[юяи]\s*(\d+)/);
  if (weekMatch) {
    const week = Number(weekMatch[1]);
    return { section: week <= 1 ? "first_week" : "first_month", offsetDays: week * 7, recurring: false, urgent, label };
  }

  const monthMatch = lower.match(/месяц[аеы]?\s*(\d+)/);
  if (monthMatch) {
    const month = Number(monthMatch[1]);
    return { section: "longterm", offsetDays: month * 30, recurring: false, urgent, label };
  }

  const yearsMatch = lower.match(/после\s*(\d+)\s*лет/);
  if (yearsMatch) {
    return { section: "longterm", offsetDays: Number(yearsMatch[1]) * 365, recurring: false, urgent, label };
  }

  if (lower.includes("после трудоустройства") || lower.includes("по желанию")) {
    return { section: "first_month", offsetDays: null, recurring: false, urgent, label };
  }

  return { section: "first_month", offsetDays: null, recurring: false, urgent, label };
}
