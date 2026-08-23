// Deterministic timing engine for the dashboard roadmap page. Turns a
// selected route's document list (Route.steps, see app/_lib/routeEngine.ts)
// into a dated, four-phase timeline ("до отъезда" / "первая неделя" /
// "первый месяц" / "долгосрочно") anchored on the user's own "when do you
// plan to move?" onboarding answer (profiles.timeline).
import type { ChecklistStepDef, Phase } from "./checklist";

export type TimelineCategory = "before_departure" | "first_week" | "first_month" | "longterm";

const CATEGORY_ORDER: TimelineCategory[] = ["before_departure", "first_week", "first_month", "longterm"];

const CATEGORY_TITLES: Record<TimelineCategory, string> = {
  before_departure: "До отъезда",
  first_week: "Первая неделя",
  first_month: "Первый месяц",
  longterm: "Долгосрочно",
};

// Maps the onboarding "timeline" step answer (see STEP_ORDER/timelineOptions
// in app/onboarding/page.tsx) to how many days from today the move's start
// date is. null means "exploring" — show relative timing only, no exact dates.
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

const RU_MONTHS_GENITIVE = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

function formatDateRu(date: Date): string {
  const day = date.getDate();
  const month = RU_MONTHS_GENITIVE[date.getMonth()];
  const currentYear = new Date().getFullYear();
  const year = date.getFullYear();
  return year === currentYear ? `${day} ${month}` : `${day} ${month} ${year}`;
}

type TimingRule = {
  test: (name: string) => boolean;
  category: TimelineCategory;
  offsetDays: number;
  label: string;
  warning?: string;
  recurring?: boolean;
};

// Ordered by specificity — first match wins. Offsets are relative to the
// move's start date (negative = before departure, positive = after arrival),
// following the product's TIMING LOGIC spec. Documents that appear in
// generateRoutes() (app/_lib/routeEngine.ts) but weren't given an explicit
// rule in that spec are extrapolated using the same pattern as their
// neighbors, then a generic catch-all rule covers anything left over.
// Predicates receive the already-lowercased document name (see matchRule) so
// they only need lowercase search terms, regardless of how the route step's
// display string capitalizes them (e.g. "Карта побыту" vs "...карта побыту").
const TIMING_RULES: TimingRule[] = [
  { test: (n) => n.includes("виза d"), category: "before_departure", offsetDays: -45, label: "Подать за 45 дней до отъезда" },
  { test: (n) => n.includes("путешеств"), category: "before_departure", offsetDays: -7, label: "Оформить за 7 дней до отъезда" },
  { test: (n) => n === "страховка", category: "before_departure", offsetDays: -7, label: "Оформить за 7 дней до отъезда" },
  { test: (n) => n.includes("медицинская справка"), category: "before_departure", offsetDays: -30, label: "Получить за 30 дней до отъезда" },
  { test: (n) => n.includes("апостиль"), category: "before_departure", offsetDays: -30, label: "Сделать за 30 дней до отъезда" },
  { test: (n) => n.includes("перевод документов"), category: "before_departure", offsetDays: -20, label: "Сделать за 20 дней до отъезда" },
  { test: (n) => n.includes("зачисление в университет"), category: "before_departure", offsetDays: -90, label: "Подать за 3 месяца до отъезда" },

  { test: (n) => n.includes("временная защита"), category: "first_week", offsetDays: 1, label: "День 1 после приезда" },
  { test: (n) => n.includes("sim"), category: "first_week", offsetDays: 1, label: "День 1 после приезда" },
  { test: (n) => n.includes("мелдунок"), category: "first_week", offsetDays: 3, label: "День 3 после приезда" },
  { test: (n) => n.includes("pesel"), category: "first_week", offsetDays: 5, label: "День 3-7 после приезда" },
  { test: (n) => n.includes("частная"), category: "first_week", offsetDays: 3, label: "День 3 после приезда" },
  { test: (n) => n.includes("воссоединение с семьёй"), category: "first_week", offsetDays: 5, label: "После приезда" },
  { test: (n) => n.includes("польск") && n.includes("банк"), category: "first_month", offsetDays: 14, label: "Неделя 2" },
  { test: (n) => n.includes("банк"), category: "first_week", offsetDays: 2, label: "День 2 после приезда" },

  { test: (n) => n.includes("заявление о намерении"), category: "first_month", offsetDays: 14, label: "Неделя 2" },
  { test: (n) => n.includes("разрешение на работу"), category: "first_month", offsetDays: 14, label: "Неделя 2 (подавать сразу!)" },
  { test: (n) => n.includes("nip"), category: "first_month", offsetDays: 20, label: "Неделя 3" },
  { test: (n) => n.includes("zus"), category: "first_month", offsetDays: 21, label: "После трудоустройства" },
  { test: (n) => n.includes("nfz"), category: "first_month", offsetDays: 21, label: "После трудоустройства" },
  { test: (n) => n.includes("регистрация ип"), category: "first_month", offsetDays: 14, label: "Неделя 2" },
  { test: (n) => n.includes("регистрация ооо"), category: "first_month", offsetDays: 14, label: "Неделя 2" },
  { test: (n) => n.includes("regon"), category: "first_month", offsetDays: 18, label: "Неделя 3" },
  { test: (n) => n.includes("vat"), category: "first_month", offsetDays: 25, label: "Неделя 4" },
  { test: (n) => n.includes("курсы польского"), category: "first_month", offsetDays: 14, label: "По желанию" },

  {
    test: (n) => n.includes("постоянн") && n.includes("карта побыту"),
    category: "longterm",
    offsetDays: 1825,
    label: "После 5 лет проживания",
  },
  {
    test: (n) => n.includes("карта побыту"),
    category: "longterm",
    offsetDays: 30,
    label: "Месяц 1-2 (подавать сразу после приезда!)",
    warning: "Подавайте сразу! Срок ожидания 3-6 месяцев",
  },
  { test: (n) => n.includes("нострификация"), category: "longterm", offsetDays: 60, label: "Месяц 2-3" },
  { test: (n) => n.includes("pit"), category: "longterm", offsetDays: 0, label: "Раз в год до 30 апреля", recurring: true },

  {
    test: (n) => /работа$|выход на работу|поиск работы|удалённой работы/.test(n),
    category: "first_month",
    offsetDays: 14,
    label: "После оформления документов",
  },
];

const FALLBACK_RULE: TimingRule = {
  test: () => true,
  category: "first_month",
  offsetDays: 14,
  label: "После приезда",
};

function matchRule(name: string): TimingRule {
  const normalized = name.toLowerCase();
  return TIMING_RULES.find((rule) => rule.test(normalized)) ?? FALLBACK_RULE;
}

export type Urgency = "urgent" | "upcoming" | "future";

function urgencyFor(date: Date | null): Urgency | undefined {
  if (!date) return undefined;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Math.round((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (days <= 3) return "urgent";
  if (days <= 30) return "upcoming";
  return "future";
}

// Builds the 4-phase dated timeline for a route's document list. Returns
// null when there's nothing to build from, so callers can fall back to
// another roadmap source (AI-generated plan or the static checklist).
export function buildRouteTimelinePhases(
  steps: string[] | null | undefined,
  timeline: string | null | undefined,
): Phase[] | null {
  if (!steps || steps.length === 0) return null;

  const startDate = computeStartDate(timeline);

  const entries = steps.map((name, index) => {
    const rule = matchRule(name);
    const exactDate = !rule.recurring && startDate ? addDays(startDate, rule.offsetDays) : null;

    const step: ChecklistStepDef = {
      documentType: `route-${index}`,
      title: name,
      description: rule.label,
      phase: rule.category,
      dateLabel: exactDate ? formatDateRu(exactDate) : undefined,
      warning: rule.warning,
      urgency: urgencyFor(exactDate),
      linkToDocuments: true,
    };

    return { step, offsetDays: rule.offsetDays };
  });

  return CATEGORY_ORDER.map((category) => ({
    key: category,
    title: CATEGORY_TITLES[category],
    steps: entries
      .filter((e) => e.step.phase === category)
      .sort((a, b) => a.offsetDays - b.offsetDays)
      .map((e) => e.step),
  })).filter((phase) => phase.steps.length > 0);
}
