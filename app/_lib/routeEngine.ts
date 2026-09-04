// Deterministic, rule-based relocation route generator. Replaces the old
// AI/static-fallback route engine (app/api/route/route.ts) with routes built
// directly from the user's own profile: citizenship_group (A/B/C/D), goal,
// and — for Group B jobseekers — whether they already have a job offer.
// See the product spec this was built from for the exact per-group rules.
//
// Every citizenship_group + goal combination MUST produce exactly 3 routes
// (Быстрый / Стандартный / Полный) — see threeTierSpecs() below, whose tuple
// input type enforces this at compile time so a combination can never
// silently ship with fewer than 3.
import type { Difficulty, Route, Speed } from "../api/route/route";
import type { CitizenshipGroup } from "./citizenshipGroups";

export type Goal = "work" | "study" | "business" | "family" | "remote" | "savings" | "other";

type SpeedLabel = "Высокая" | "Средняя" | "Низкая";
type ComplexityLabel = "Низкая" | "Средняя" | "Высокая";

type RouteSpec = {
  name: string;
  recommended: boolean;
  description: string;
  steps: string[];
  suitableFor: string;
  speed: SpeedLabel;
  complexity: ComplexityLabel;
  probability: number;
  timeline: string;
  cost: string;
  badge: string;
};

const SPEED_MAP: Record<SpeedLabel, Speed> = {
  Высокая: "fast",
  Средняя: "medium",
  Низкая: "slow",
};

const COMPLEXITY_MAP: Record<ComplexityLabel, Difficulty> = {
  Низкая: "easy",
  Средняя: "medium",
  Высокая: "hard",
};

function toRoute(spec: RouteSpec): Route {
  return {
    name: spec.name,
    description: spec.description,
    speed: SPEED_MAP[spec.speed],
    cost: spec.cost,
    difficulty: COMPLEXITY_MAP[spec.complexity],
    approval_rate: spec.probability,
    documents_needed: spec.steps,
    timeline: spec.timeline,
    recommended: spec.recommended,
    reason: spec.suitableFor,
    steps: spec.steps,
    bestFor: spec.suitableFor,
    badge: spec.badge,
  };
}

// The fixed per-tier identity (name/badge/recommended flag/speed/complexity/
// description) that's the same for every goal — only the steps, timeline,
// cost, probability, and suitableFor blurb vary per citizenship_group+goal.
const TIER_META: {
  name: string;
  badge: string;
  recommended: boolean;
  speed: SpeedLabel;
  complexity: ComplexityLabel;
  description: string;
}[] = [
  {
    name: "Быстрый маршрут",
    badge: "Быстрый",
    recommended: false,
    speed: "Высокая",
    complexity: "Низкая",
    description: "Минимальный набор документов — самый быстрый и недорогой путь легализации.",
  },
  {
    name: "Стандартный маршрут",
    badge: "Рекомендуем",
    recommended: true,
    speed: "Средняя",
    complexity: "Средняя",
    description: "Стандартный набор документов — оптимальный баланс сроков, стоимости и надёжности.",
  },
  {
    name: "Полный маршрут",
    badge: "Максимальная защита",
    recommended: false,
    speed: "Низкая",
    complexity: "Высокая",
    description: "Полный пакет документов, включая опциональные — максимальная правовая защита.",
  },
];

type TierInput = {
  steps: string[];
  timeline: string;
  cost: string;
  probability: number;
};

// Always returns exactly 3 specs: the [a, b, c] tuple parameter type makes it
// a compile error to pass fewer (or more) than 3 tiers for any combination.
function threeTierSpecs(suitableFor: string, tiers: [TierInput, TierInput, TierInput]): RouteSpec[] {
  return tiers.map((tier, i) => ({
    ...TIER_META[i],
    suitableFor,
    steps: tier.steps,
    timeline: tier.timeline,
    cost: tier.cost,
    probability: tier.probability,
  }));
}

// Ukraine (citizenship_group A) splits into 3 legal tracks that share almost
// nothing in common — see the "ukraineScenario" onboarding step and the
// August-2026-corrected source guide this was built from. Getting the wrong
// one wrong is a real-world problem, not a cosmetic one: PESEL UKR is only
// available to temporary-protection holders, self-relocating Ukrainians who
// request it get rejected and have to start over with a regular PESEL, and
// Revolut has required NIP + karta pobytu since 22.02.2026 (ZEN.com and Wise
// are the only options that work from day one).
export type UkraineScenario = "protection" | "self" | "already";

// Scenario 1 — temporary protection / UKR status. One route regardless of
// goal (the source guide is explicit: "Один маршрут для всех целей"), so the
// 3 tiers here differ only by how much of the timeline they cover, not by
// what the user is trying to do in Poland.
function specsForUkraineProtection(): RouteSpec[] {
  return threeTierSpecs("Временная защита — беженцы со статусом UKR", [
    {
      steps: ["SIM карта", "Временная защита", "PESEL UKR", "Мелдунок", "Банк (ZEN.com/Wise)"],
      timeline: "1 неделя",
      cost: "€0-30",
      probability: 97,
    },
    {
      steps: [
        "SIM карта",
        "Временная защита",
        "PESEL UKR",
        "Мелдунок",
        "Банк (ZEN.com/Wise)",
        "Работа без разрешения",
        "NFZ страховка",
        "NIP",
      ],
      timeline: "2-4 недели",
      cost: "€0-100",
      probability: 95,
    },
    {
      steps: [
        "SIM карта",
        "Временная защита",
        "PESEL UKR",
        "Мелдунок",
        "Банк (ZEN.com/Wise)",
        "Работа без разрешения",
        "NFZ страховка",
        "NIP",
        "Карта побыту или CUKR",
        "Декларация PIT",
      ],
      timeline: "1-3 месяца",
      cost: "€0-150",
      probability: 90,
    },
  ]);
}

// Scenario 3 — already in Poland, needs to renew or sort out existing
// documents. Also goal-independent — the source guide frames all 3 tiers as
// "urgent renewal" / "get everything in order" / "go for the permanent
// card", not as separate work/study/business paths.
function specsForUkraineAlready(): RouteSpec[] {
  return threeTierSpecs("Уже в Польше — продление и приведение в порядок документов", [
    {
      steps: ["Проверить срок карты побыту", "Подать на продление карты побыту"],
      timeline: "1-2 недели",
      cost: "€60-80",
      probability: 95,
    },
    {
      steps: [
        "Проверить срок карты побыту",
        "Подать на продление или карту CUKR",
        "Обновить мелдунок",
        "Проверить статус UKR / CUKR",
        "Декларация PIT",
        "Проверить NIP и ZUS",
      ],
      timeline: "2-6 недель",
      cost: "€60-150",
      probability: 90,
    },
    {
      steps: [
        "Проверить срок карты побыту",
        "Обновить все данные",
        "Декларация PIT",
        "Нострификация диплома",
        "Постоянная карта побыту",
      ],
      timeline: "3-12 месяцев",
      cost: "€150-400",
      probability: 85,
    },
  ]);
}

// Scenario 2 — relocating independently, NOT a refugee. Gets a REGULAR
// PESEL (not PESEL UKR), has a 90-day visa-free window in which the karta
// pobytu application must be filed, and needs ZEN.com/Wise instead of
// Revolut on day one — same as every other goal-based group, split per goal.
const UA_SELF_COMMON_STEPS = ["SIM карта", "Аренда жилья", "Мелдунок", "PESEL обычный", "Банк (ZEN.com/Wise)"];

const UA_SELF_SUITABLE_FOR: Record<Goal, string> = {
  work: "Работа по найму — самостоятельный переезд, не беженец",
  study: "Обучение в польском университете — самостоятельный переезд",
  business: "Открытие бизнеса — самостоятельный переезд",
  family: "Воссоединение с семьёй — самостоятельный переезд",
  remote: "Удалённая работа из Польши — самостоятельный переезд",
  savings: "Переезд на собственные средства — самостоятельный переезд",
  other: "Другие цели пребывания — самостоятельный переезд",
};

function specsForUkraineSelf(goal: Goal): RouteSpec[] {
  const suitableFor = UA_SELF_SUITABLE_FOR[goal];
  switch (goal) {
    case "work":
      return threeTierSpecs(suitableFor, [
        { steps: [...UA_SELF_COMMON_STEPS, "Работа без разрешения", "NFZ страховка"], timeline: "1-2 недели", cost: "€0-50", probability: 95 },
        {
          steps: [...UA_SELF_COMMON_STEPS, "Частная страховка", "Работа без разрешения", "NFZ", "NIP", "Карта побыту"],
          timeline: "1-3 месяца",
          cost: "€100-300",
          probability: 88,
        },
        {
          steps: [
            ...UA_SELF_COMMON_STEPS,
            "Частная страховка",
            "Работа без разрешения",
            "NFZ",
            "NIP",
            "ZUS",
            "Карта побыту",
            "Нострификация диплома",
            "Постоянная карта побыту",
          ],
          timeline: "3-12 месяцев",
          cost: "€200-600",
          probability: 82,
        },
      ]);
    case "study":
      return threeTierSpecs(suitableFor, [
        { steps: ["Зачисление в университет", ...UA_SELF_COMMON_STEPS], timeline: "2-4 недели", cost: "€50-150", probability: 92 },
        {
          steps: [
            "Зачисление в университет",
            ...UA_SELF_COMMON_STEPS,
            "Частная страховка",
            "Студенческая карта побыту",
            "NFZ",
          ],
          timeline: "1-3 месяца",
          cost: "€100-300",
          probability: 88,
        },
        {
          steps: [
            "Зачисление в университет",
            ...UA_SELF_COMMON_STEPS,
            "Частная страховка",
            "Студенческая карта побыту",
            "NFZ",
            "Нострификация диплома",
            "Карта ISIC",
          ],
          timeline: "2-4 месяца",
          cost: "€200-500",
          probability: 85,
        },
      ]);
    case "business":
      return threeTierSpecs(suitableFor, [
        { steps: [...UA_SELF_COMMON_STEPS, "Регистрация ИП", "NIP"], timeline: "2-4 недели", cost: "€50-200", probability: 92 },
        {
          steps: [...UA_SELF_COMMON_STEPS, "Регистрация ИП", "NIP", "ZUS", "Карта побыту"],
          timeline: "1-3 месяца",
          cost: "€150-400",
          probability: 88,
        },
        {
          steps: [...UA_SELF_COMMON_STEPS, "Счёт для бизнеса", "Регистрация ООО", "NIP", "REGON", "VAT", "ZUS", "Карта побыту"],
          timeline: "2-4 месяца",
          cost: "€500-1500",
          probability: 80,
        },
      ]);
    case "family":
      return threeTierSpecs(suitableFor, [
        { steps: [...UA_SELF_COMMON_STEPS, "Карта побыту семья"], timeline: "1-3 месяца", cost: "€50-200", probability: 88 },
        {
          steps: [...UA_SELF_COMMON_STEPS, "Частная страховка", "Карта побыту семья", "NFZ"],
          timeline: "2-4 месяца",
          cost: "€150-400",
          probability: 85,
        },
        {
          steps: [
            ...UA_SELF_COMMON_STEPS,
            "Частная страховка",
            "Карта побыту семья",
            "NFZ",
            "Документы детей школа/садик",
            "Постоянная карта побыту",
          ],
          timeline: "3-12 месяцев",
          cost: "€300-800",
          probability: 82,
        },
      ]);
    case "remote":
      return threeTierSpecs(suitableFor, [
        { steps: [...UA_SELF_COMMON_STEPS, "Работа удалённо"], timeline: "1-2 недели", cost: "€0-100", probability: 93 },
        {
          steps: [...UA_SELF_COMMON_STEPS, "Регистрация ИП", "NIP", "ZUS", "Карта побыту"],
          timeline: "1-3 месяца",
          cost: "€100-400",
          probability: 88,
        },
        {
          steps: [...UA_SELF_COMMON_STEPS, "Регистрация ИП", "NIP", "ZUS", "VAT", "Карта побыту", "Постоянная карта побыту"],
          timeline: "2-6 месяцев",
          cost: "€200-700",
          probability: 85,
        },
      ]);
    case "savings":
      return threeTierSpecs(suitableFor, [
        { steps: [...UA_SELF_COMMON_STEPS, "Частная страховка"], timeline: "1-2 недели", cost: "€100-300", probability: 80 },
        {
          steps: [...UA_SELF_COMMON_STEPS, "Частная страховка", "Карта побыту достаточные средства"],
          timeline: "1-3 месяца",
          cost: "€300-700",
          probability: 75,
        },
        {
          steps: [...UA_SELF_COMMON_STEPS, "Частная страховка", "Карта побыту достаточные средства", "NFZ", "Постоянная карта побыту"],
          timeline: "3-12 месяцев",
          cost: "€500-1500",
          probability: 70,
        },
      ]);
    case "other":
      return threeTierSpecs(suitableFor, [
        { steps: [...UA_SELF_COMMON_STEPS], timeline: "1-2 недели", cost: "€0-50", probability: 90 },
        { steps: [...UA_SELF_COMMON_STEPS, "Частная страховка"], timeline: "1-2 месяца", cost: "€100-300", probability: 85 },
        {
          steps: [...UA_SELF_COMMON_STEPS, "Частная страховка", "Карта побыту"],
          timeline: "1-3 месяца",
          cost: "€100-400",
          probability: 80,
        },
      ]);
  }
}

function specsForGroupA(goal: Goal, ukraineScenario: UkraineScenario | null | undefined): RouteSpec[] {
  switch (ukraineScenario) {
    case "protection":
      return specsForUkraineProtection();
    case "already":
      return specsForUkraineAlready();
    case "self":
    default:
      // No answer yet (older accounts from before this question existed, or
      // the step was skipped) defaults to "self" rather than "protection" —
      // PESEL UKR is only for confirmed temporary-protection holders, so
      // defaulting there for an unknown status would risk telling someone
      // to apply for a status they don't actually have.
      return specsForUkraineSelf(goal);
  }
}

// Belarus (also citizenship_group B) gets its own branch for the same reason
// Ukraine does: the source guide for Belarus is materially different from
// the generic Group B rules — there is NO visa-free entry into Poland at all
// for any goal (unlike some other Group B countries), oświadczenie is valid
// for Belarusian citizens, and there's a genuinely different "already in
// Poland" split: holders of a karta pobytu/visa D go through ordinary
// renewal, but people who entered on a short-stay visa C with no residence
// status yet get an entirely different "legalize without leaving" pair of
// routes instead of the usual goal-based flow. See the "belarusScenario"
// onboarding step and app/onboarding/page.tsx's computeStepOrder(), which
// skips goal selection entirely for the no-status case.
export type BelarusScenario = "self" | "already_status" | "already_no_status";

// "Уже в Польше" + karta pobytu/visa D already held — ordinary renewal, and
// (per the source guide) goal-independent just like Ukraine's "already" case.
function specsForBelarusAlreadyStatus(): RouteSpec[] {
  return threeTierSpecs("Уже в Польше с картой побыту/визой D — продление и приведение в порядок документов", [
    {
      steps: ["Проверить срок карты побыту", "Подать на продление карты побыту"],
      timeline: "1 день на подачу",
      cost: "€80",
      probability: 95,
    },
    {
      steps: ["Проверить срок карты побыту", "Обновить мелдунок", "Декларация PIT", "Проверить NIP и ZUS"],
      timeline: "1-2 недели",
      cost: "€80-150",
      probability: 90,
    },
    {
      steps: [
        "Проверить/продлить карту побыту",
        "Обновить все данные",
        "Декларация PIT",
        "Нострификация диплома",
        "Постоянная карта побыту",
      ],
      timeline: "3-12 месяцев",
      cost: "€150-400",
      probability: 85,
    },
  ]);
}

// "Уже в Польше" на туристической визе C, статуса ещё нет — легализация без
// выезда. Источник даёт 2 реальных пути (не 3 уровня одного пути): Путь 1
// (ИП, без выезда) и Путь 2 (работа по найму через работодателя, с выездом
// за визой D). Оба уложены в 3 тира — быстрый/расширенный вариант Пути 1 и
// Путь 2 как самый основательный (и самый долгий/дорогой) вариант — так это
// остаётся goal-independent (выбор цели вообще пропускается для этой ветки).
function specsForBelarusNoStatus(): RouteSpec[] {
  return threeTierSpecs("Уже в Польше без статуса (виза C) — легализация без выезда из страны", [
    {
      steps: ["PESEL", "Регистрация ИП (JDG)"],
      timeline: "1-2 дня",
      cost: "€0-50",
      probability: 85,
    },
    {
      steps: ["PESEL", "Регистрация ИП (JDG)", "NIP + карта побыту (бизнес)"],
      timeline: "2-6 недель до истечения визы C",
      cost: "€100-300",
      probability: 80,
    },
    {
      steps: [
        "Работодатель регистрирует oświadczenie",
        "Выезд за визой D (Минск/Брест/Гродно по региону)",
        "Возвращение в Польшу и легализация (PESEL, ZUS, NFZ, карта побыту)",
      ],
      timeline: "5-9 недель (включая поездку)",
      cost: "€200-400",
      probability: 75,
    },
  ]);
}

const BY_SELF_SUITABLE_FOR: Record<Goal, string> = {
  work: "Работа по найму — самостоятельный переезд из Беларуси",
  study: "Обучение в польском университете — самостоятельный переезд из Беларуси",
  business: "Открытие бизнеса — самостоятельный переезд из Беларуси",
  family: "Воссоединение с семьёй — самостоятельный переезд из Беларуси",
  remote: "Удалённая работа из Польши — самостоятельный переезд из Беларуси",
  savings: "Переезд на собственные средства — самостоятельный переезд из Беларуси",
  other: "Другие цели пребывания — самостоятельный переезд из Беларуси",
};

// "Переезжаю сам" (Сценарий 1). Безвизового въезда нет ни для одной цели —
// виза D нужна всегда, поэтому (в отличие от общего Group B) её нет смысла
// делать общим шагом с другими странами: пошлина ниже (60 EUR вместо 80),
// консульство определяется по региону (Минск/Брест/Гродно), а банковский шаг
// явно указывает ZEN.com/Wise, потому что Revolut требует NIP и может
// отказывать держателям белорусских паспортов.
function specsForBelarusSelf(goal: Goal, hasJobOffer: boolean): RouteSpec[] {
  const suitableFor = BY_SELF_SUITABLE_FOR[goal];
  switch (goal) {
    case "work":
      return hasJobOffer
        ? threeTierSpecs(suitableFor, [
            {
              steps: [
                "Виза D (рабочая)",
                "Страховка для визы",
                "SIM карта",
                "Аренда жилья",
                "Мелдунок",
                "PESEL",
                "Банк (ZEN.com/Wise)",
                "Работа без разрешения (oświadczenie)",
                "NFZ",
                "Карта побыту",
              ],
              timeline: "3-5 месяцев",
              cost: "€300-600",
              probability: 82,
            },
            {
              steps: [
                "Виза D (рабочая)",
                "Страховка для визы",
                "SIM карта",
                "Аренда жилья",
                "Мелдунок",
                "PESEL",
                "Банк (ZEN.com/Wise)",
                "Работа без разрешения (oświadczenie)",
                "NIP",
                "Частная страховка",
                "NFZ",
                "Карта побыту",
              ],
              timeline: "4-6 месяцев",
              cost: "€400-800",
              probability: 80,
            },
            {
              steps: [
                "Виза D (рабочая)",
                "Страховка для визы",
                "Апостиль",
                "Перевод документов",
                "SIM карта",
                "Аренда жилья",
                "Мелдунок",
                "PESEL",
                "Банк (ZEN.com/Wise)",
                "Работа без разрешения (oświadczenie)",
                "NIP",
                "Частная страховка",
                "NFZ",
                "Карта побыту",
                "Продление oświadczenia / zezwolenie na pracę",
                "Нострификация диплома",
              ],
              timeline: "5-8 месяцев",
              cost: "€500-1200",
              probability: 75,
            },
          ])
        : threeTierSpecs(suitableFor, [
            {
              steps: [
                "Виза D",
                "Страховка для визы",
                "SIM карта",
                "Аренда жилья",
                "Мелдунок",
                "PESEL",
                "Банк (ZEN.com/Wise)",
                "Поиск работы",
              ],
              timeline: "3-5 месяцев",
              cost: "€300-600",
              probability: 70,
            },
            {
              steps: [
                "Виза D",
                "Страховка для визы",
                "SIM карта",
                "Аренда жилья",
                "Мелдунок",
                "PESEL",
                "Банк (ZEN.com/Wise)",
                "Поиск работы",
                "Работа без разрешения (oświadczenie)",
                "NFZ",
                "Карта побыту",
              ],
              timeline: "5-8 месяцев",
              cost: "€500-900",
              probability: 65,
            },
            {
              steps: [
                "Виза D",
                "Страховка для визы",
                "Апостиль",
                "Перевод документов",
                "SIM карта",
                "Аренда жилья",
                "Мелдунок",
                "PESEL",
                "Банк (ZEN.com/Wise)",
                "Поиск работы",
                "Работа без разрешения (oświadczenie)",
                "NIP",
                "ZUS",
                "NFZ",
                "Карта побыту",
                "Нострификация диплома",
              ],
              timeline: "6-10 месяцев",
              cost: "€700-1500",
              probability: 60,
            },
          ]);
    case "study":
      return threeTierSpecs(suitableFor, [
        {
          steps: [
            "Зачисление в университет",
            "Виза D (студенческая)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
          ],
          timeline: "4-6 недель",
          cost: "€150-300",
          probability: 85,
        },
        {
          steps: [
            "Зачисление в университет",
            "Виза D (студенческая)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Студенческая карта побыту",
            "NFZ",
          ],
          timeline: "2-4 месяца",
          cost: "€250-450",
          probability: 85,
        },
        {
          steps: [
            "Зачисление в университет",
            "Виза D (студенческая)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Студенческая карта побыту",
            "NFZ",
            "Нострификация диплома",
            "Карта ISIC",
          ],
          timeline: "3-5 месяцев",
          cost: "€350-650",
          probability: 80,
        },
      ]);
    case "business":
      return threeTierSpecs(suitableFor, [
        {
          steps: [
            "Виза D (бизнес)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Регистрация ИП",
            "NIP",
          ],
          timeline: "5-7 недель",
          cost: "€150-350",
          probability: 80,
        },
        {
          steps: [
            "Виза D (бизнес)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Регистрация ИП",
            "NIP",
            "ZUS",
            "Карта побыту",
          ],
          timeline: "2-4 месяца",
          cost: "€300-550",
          probability: 78,
        },
        {
          steps: [
            "Виза D (бизнес)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Счёт для бизнеса (mBank)",
            "Регистрация ООО",
            "NIP",
            "REGON",
            "VAT",
            "Карта побыту",
          ],
          timeline: "3-5 месяцев",
          cost: "€600-1500",
          probability: 75,
        },
      ]);
    case "family":
      return threeTierSpecs(suitableFor, [
        {
          steps: [
            "Виза D по Карте поляка (бесплатно)",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Карта побыту по Карте поляка",
          ],
          timeline: "2-3 месяца",
          cost: "€100-250",
          probability: 90,
        },
        {
          steps: [
            "Виза D (воссоединение семьи)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Карта побыту семья",
          ],
          timeline: "3-5 месяцев",
          cost: "€250-450",
          probability: 80,
        },
        {
          steps: [
            "Виза D (воссоединение семьи)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Карта побыту семья",
            "Документы детей школа/садик",
            "Постоянная карта побыту",
          ],
          timeline: "4-6 месяцев",
          cost: "€400-900",
          probability: 78,
        },
      ]);
    case "remote":
      return threeTierSpecs(suitableFor, [
        {
          steps: [
            "Виза D (на основании дохода)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (Wise + ZEN.com)",
          ],
          timeline: "4-6 недель",
          cost: "€150-300",
          probability: 80,
        },
        {
          steps: [
            "Виза D (на основании дохода)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (Wise + ZEN.com)",
            "Регистрация ИП",
            "NIP",
            "ZUS",
            "Карта побыту",
          ],
          timeline: "2-4 месяца",
          cost: "€250-450",
          probability: 78,
        },
        {
          steps: [
            "Виза D (на основании дохода)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (Wise + ZEN.com)",
            "Регистрация ИП",
            "NIP",
            "ZUS",
            "VAT",
            "Карта побыту",
            "Постоянная карта побыту",
          ],
          timeline: "3-5 месяцев",
          cost: "€350-700",
          probability: 75,
        },
      ]);
    case "savings":
      return threeTierSpecs(suitableFor, [
        {
          steps: [
            "Виза D (достаточные средства)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
          ],
          timeline: "4-6 недель",
          cost: "€200-350",
          probability: 75,
        },
        {
          steps: [
            "Виза D (достаточные средства)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Карта побыту (средства)",
          ],
          timeline: "2-4 месяца",
          cost: "€350-650",
          probability: 70,
        },
        {
          steps: [
            "Виза D (достаточные средства)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Карта побыту (средства)",
            "NFZ (добровольно через ZUS)",
            "Постоянная карта побыту",
          ],
          timeline: "3-5 месяцев",
          cost: "€550-1500",
          probability: 65,
        },
      ]);
    case "other":
      return threeTierSpecs(suitableFor, [
        {
          steps: ["Виза D", "Страховка для визы", "SIM карта", "Аренда жилья", "Мелдунок", "PESEL", "Банк (ZEN.com/Wise)"],
          timeline: "3-5 недель",
          cost: "€100-200",
          probability: 85,
        },
        {
          steps: [
            "Виза D",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Карта побыту",
          ],
          timeline: "2-4 месяца",
          cost: "€250-450",
          probability: 80,
        },
        {
          steps: [
            "Виза D",
            "Страховка для визы",
            "Апостиль",
            "Перевод документов",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Карта побыту",
            "NFZ",
          ],
          timeline: "3-5 месяцев",
          cost: "€350-650",
          probability: 75,
        },
      ]);
  }
}

function specsForBelarus(goal: Goal, hasJobOffer: boolean, belarusScenario: BelarusScenario | null | undefined): RouteSpec[] {
  switch (belarusScenario) {
    case "already_status":
      return specsForBelarusAlreadyStatus();
    case "already_no_status":
      return specsForBelarusNoStatus();
    case "self":
    default:
      // Same reasoning as Ukraine's default: an unanswered/older-account
      // scenario defaults to "self" rather than one of the "already in
      // Poland" branches, since defaulting to those would tell someone to
      // renew a card or take a no-status shortcut they may not actually be
      // eligible for.
      return specsForBelarusSelf(goal, hasJobOffer);
  }
}

// Uzbekistan is also citizenship_group B, and shares Belarus's "no visa-free
// entry at all" starting point — every goal needs visa D, always. But unlike
// Belarus, Uzbekistan never had oświadczenie access at all (it's only ever
// covered Armenia/Belarus/Moldova/Ukraine), so the WORK goal needs the full
// zezwolenie na pracę (same as Georgia), not a quick oświadczenie
// registration. On top of that, Tashkent is the single consulate for the
// whole country and visa D appointment bookings alone (before processing
// even starts) can queue 6-7+ months — a wrinkle no other country covered so
// far has, so it's folded into the timelines below rather than just left as
// a document_guides note.
export type UzbekistanScenario = "self" | "already_status" | "already_no_status";

function specsForUzbekistanAlreadyStatus(): RouteSpec[] {
  return threeTierSpecs("Уже в Польше с картой побыту/визой D — продление и приведение в порядок документов", [
    {
      steps: ["Проверить срок карты побыту", "Подать на продление карты побыту"],
      timeline: "1 день на подачу",
      cost: "€80",
      probability: 95,
    },
    {
      steps: ["Проверить срок карты побыту", "Обновить мелдунок", "Декларация PIT", "Проверить NIP и ZUS"],
      timeline: "1-2 недели",
      cost: "€80-150",
      probability: 90,
    },
    {
      steps: [
        "Проверить/продлить карту побыту",
        "Обновить все данные",
        "Декларация PIT",
        "Нострификация диплома",
        "Постоянная карта побыту",
      ],
      timeline: "3-12 месяцев",
      cost: "€150-400",
      probability: 85,
    },
  ]);
}

// "Уже в Польше" на туристической визе C, статуса ещё нет. Путь 2 — самый
// медленный среди всех покрытых стран: полное zezwolenie na pracę (1-3
// месяца) плюс собственная очередь на запись визы в Ташкенте (может
// добавить ещё несколько месяцев сверху).
function specsForUzbekistanNoStatus(): RouteSpec[] {
  return threeTierSpecs("Уже в Польше без статуса (виза C) — легализация без выезда из страны", [
    {
      steps: ["PESEL", "Регистрация ИП (JDG)"],
      timeline: "1-2 дня",
      cost: "€0-50",
      probability: 85,
    },
    {
      steps: ["PESEL", "Регистрация ИП (JDG)", "NIP + карта побыту (бизнес)"],
      timeline: "2-6 недель до истечения визы C",
      cost: "€100-300",
      probability: 80,
    },
    {
      steps: [
        "Работодатель подаёт на zezwolenie na pracę",
        "Запись на визу D в Ташкенте (очередь может занять месяцы)",
        "Выезд за визой D в Ташкент",
        "Возвращение в Польшу и легализация (PESEL, ZUS, NFZ, карта побыту)",
      ],
      timeline: "4-8 месяцев (включая ожидание zezwolenia и поездку)",
      cost: "€500-800",
      probability: 65,
    },
  ]);
}

const UZ_SELF_SUITABLE_FOR: Record<Goal, string> = {
  work: "Работа по найму — самостоятельный переезд из Узбекистана",
  study: "Обучение в польском университете — самостоятельный переезд из Узбекистана",
  business: "Открытие бизнеса — самостоятельный переезд из Узбекистана",
  family: "Воссоединение с семьёй — самостоятельный переезд из Узбекистана",
  remote: "Удалённая работа из Польши — самостоятельный переезд из Узбекистана",
  savings: "Переезд на собственные средства — самостоятельный переезд из Узбекистана",
  other: "Другие цели пребывания — самостоятельный переезд из Узбекистана",
};

// "Переезжаю сам" (Сценарий 1). Безвизового въезда нет ни для одной цели —
// виза D нужна всегда. Для работы нужен zezwolenie na pracę (не
// oświadczenie — недоступен для Узбекистана), и весь маршрут учитывает
// очередь на запись визы в Ташкенте (6-7+ месяцев только на саму запись).
function specsForUzbekistanSelf(goal: Goal, hasJobOffer: boolean): RouteSpec[] {
  const suitableFor = UZ_SELF_SUITABLE_FOR[goal];
  switch (goal) {
    case "work":
      return hasJobOffer
        ? threeTierSpecs(suitableFor, [
            {
              steps: [
                "Zezwolenie na pracę",
                "Запись на визу D в Ташкенте (очередь может занять месяцы)",
                "Виза D (рабочая, на основании zezwolenia)",
                "Страховка для визы",
                "SIM карта",
                "Аренда жилья",
                "Мелдунок",
                "PESEL",
                "Банк (ZEN.com/Wise)",
                "Работа по найму",
                "NFZ",
                "Карта побыту",
              ],
              timeline: "5-8 месяцев (включая ожидание записи и zezwolenia)",
              cost: "€400-700",
              probability: 72,
            },
            {
              steps: [
                "Zezwolenie na pracę",
                "Запись на визу D в Ташкенте (очередь может занять месяцы)",
                "Виза D (рабочая, на основании zezwolenia)",
                "Страховка для визы",
                "SIM карта",
                "Аренда жилья",
                "Мелдунок",
                "PESEL",
                "Банк (ZEN.com/Wise)",
                "Работа по найму",
                "NIP",
                "Частная страховка",
                "NFZ",
                "Карта побыту",
              ],
              timeline: "6-9 месяцев",
              cost: "€500-900",
              probability: 68,
            },
            {
              steps: [
                "Zezwolenie na pracę",
                "Запись на визу D в Ташкенте (очередь может занять месяцы)",
                "Виза D (рабочая, на основании zezwolenia)",
                "Страховка для визы",
                "SIM карта",
                "Аренда жилья",
                "Мелдунок",
                "PESEL",
                "Банк (ZEN.com/Wise)",
                "Работа по найму",
                "NIP",
                "Частная страховка",
                "NFZ",
                "Карта побыту",
                "Продление zezwolenia na pracę",
                "Нострификация диплома",
                "Постоянная карта побыту",
              ],
              // Источник даёт для "Полный" тот же диапазон 5-8 мес., что и для
              // "Быстрый" — при том что здесь на 6 шагов больше, включая
              // продление zezwolenia и постоянную карту побыту (5 лет
              // легального проживания). Это внутреннее противоречие в
              // документе; здесь используется реалистичная оценка длиннее
              // "Стандартного" (6-9 мес.), а не скопированная как есть.
              timeline: "7-11 месяцев",
              cost: "€500-1200",
              probability: 75,
            },
          ])
        : threeTierSpecs(suitableFor, [
            {
              steps: [
                "Поиск работы (дистанционно, находясь в Узбекистане)",
                "Zezwolenie na pracę (после нахождения работодателя)",
                "Запись на визу D в Ташкенте (очередь может занять месяцы)",
                "Виза D (рабочая, на основании zezwolenia)",
                "Страховка для визы",
                "SIM карта",
                "Аренда жилья",
                "Мелдунок",
                "PESEL",
                "Банк (ZEN.com/Wise)",
              ],
              timeline: "6-9 месяцев",
              cost: "€400-700",
              probability: 58,
            },
            {
              steps: [
                "Поиск работы (дистанционно, находясь в Узбекистане)",
                "Zezwolenie na pracę (после нахождения работодателя)",
                "Запись на визу D в Ташкенте (очередь может занять месяцы)",
                "Виза D (рабочая, на основании zezwolenia)",
                "Страховка для визы",
                "SIM карта",
                "Аренда жилья",
                "Мелдунок",
                "PESEL",
                "Банк (ZEN.com/Wise)",
                "NFZ",
                "Карта побыту",
              ],
              timeline: "7-10 месяцев",
              cost: "€500-900",
              probability: 55,
            },
            {
              steps: [
                "Поиск работы (дистанционно, находясь в Узбекистане)",
                "Zezwolenie na pracę (после нахождения работодателя)",
                "Запись на визу D в Ташкенте (очередь может занять месяцы)",
                "Виза D (рабочая, на основании zezwolenia)",
                "Страховка для визы",
                "SIM карта",
                "Аренда жилья",
                "Мелдунок",
                "PESEL",
                "Банк (ZEN.com/Wise)",
                "NIP",
                "ZUS",
                "NFZ",
                "Карта побыту",
                "Нострификация диплома",
              ],
              timeline: "8-12 месяцев",
              cost: "€700-1500",
              probability: 50,
            },
          ]);
    case "study":
      return threeTierSpecs(suitableFor, [
        {
          steps: [
            "Зачисление в университет",
            "Виза D (студенческая)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
          ],
          timeline: "4-6 недель",
          cost: "€150-300",
          probability: 85,
        },
        {
          steps: [
            "Зачисление в университет",
            "Виза D (студенческая)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Студенческая карта побыту",
            "NFZ",
          ],
          timeline: "2-4 месяца",
          cost: "€250-450",
          probability: 85,
        },
        {
          steps: [
            "Зачисление в университет",
            "Виза D (студенческая)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Студенческая карта побыту",
            "NFZ",
            "Нострификация диплома",
            "Карта ISIC",
          ],
          timeline: "3-5 месяцев",
          cost: "€350-650",
          probability: 80,
        },
      ]);
    case "business":
      return threeTierSpecs(suitableFor, [
        {
          steps: [
            "Виза D (бизнес)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Регистрация ИП",
            "NIP",
          ],
          timeline: "5-7 недель",
          cost: "€150-350",
          probability: 80,
        },
        {
          steps: [
            "Виза D (бизнес)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Регистрация ИП",
            "NIP",
            "ZUS",
            "Карта побыту",
          ],
          timeline: "2-4 месяца",
          cost: "€300-550",
          probability: 78,
        },
        {
          steps: [
            "Виза D (бизнес)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Счёт для бизнеса (mBank)",
            "Регистрация ООО",
            "NIP",
            "REGON",
            "VAT",
            "Карта побыту",
          ],
          timeline: "3-5 месяцев",
          cost: "€600-1500",
          probability: 75,
        },
      ]);
    case "family":
      return threeTierSpecs(suitableFor, [
        {
          steps: [
            "Виза D по Карте поляка (бесплатно)",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Карта побыту по Карте поляка",
          ],
          timeline: "2-3 месяца",
          cost: "€100-250",
          probability: 90,
        },
        {
          steps: [
            "Виза D (воссоединение семьи)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Карта побыту семья",
          ],
          timeline: "3-5 месяцев",
          cost: "€250-450",
          probability: 80,
        },
        {
          steps: [
            "Виза D (воссоединение семьи)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Карта побыту семья",
            "Документы детей школа/садик",
            "Постоянная карта побыту",
          ],
          timeline: "4-6 месяцев",
          cost: "€400-900",
          probability: 78,
        },
      ]);
    case "remote":
      return threeTierSpecs(suitableFor, [
        {
          steps: [
            "Виза D (на основании дохода)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (Wise + ZEN.com)",
          ],
          timeline: "4-6 недель",
          cost: "€150-300",
          probability: 80,
        },
        {
          steps: [
            "Виза D (на основании дохода)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (Wise + ZEN.com)",
            "Регистрация ИП",
            "NIP",
            "ZUS",
            "Карта побыту",
          ],
          timeline: "2-4 месяца",
          cost: "€250-450",
          probability: 78,
        },
        {
          steps: [
            "Виза D (на основании дохода)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (Wise + ZEN.com)",
            "Регистрация ИП",
            "NIP",
            "ZUS",
            "VAT",
            "Карта побыту",
            "Постоянная карта побыту",
          ],
          timeline: "3-5 месяцев",
          cost: "€350-700",
          probability: 75,
        },
      ]);
    case "savings":
      return threeTierSpecs(suitableFor, [
        {
          steps: [
            "Виза D (достаточные средства)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
          ],
          timeline: "4-6 недель",
          cost: "€200-350",
          probability: 75,
        },
        {
          steps: [
            "Виза D (достаточные средства)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Карта побыту (средства)",
          ],
          timeline: "2-4 месяца",
          cost: "€350-650",
          probability: 70,
        },
        {
          steps: [
            "Виза D (достаточные средства)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Карта побыту (средства)",
            "NFZ (добровольно через ZUS)",
            "Постоянная карта побыту",
          ],
          timeline: "3-5 месяцев",
          cost: "€550-1500",
          probability: 65,
        },
      ]);
    case "other":
      return threeTierSpecs(suitableFor, [
        {
          steps: ["Виза D", "Страховка для визы", "SIM карта", "Аренда жилья", "Мелдунок", "PESEL", "Банк (ZEN.com/Wise)"],
          timeline: "2-4 недели",
          cost: "€100-200",
          probability: 85,
        },
        {
          steps: [
            "Виза D",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Карта побыту",
          ],
          timeline: "2-4 месяца",
          cost: "€250-450",
          probability: 80,
        },
        {
          steps: [
            "Виза D",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Карта побыту",
            "NFZ",
          ],
          timeline: "3-5 месяцев",
          cost: "€350-650",
          probability: 75,
        },
      ]);
  }
}

function specsForUzbekistan(
  goal: Goal,
  hasJobOffer: boolean,
  uzbekistanScenario: UzbekistanScenario | null | undefined,
): RouteSpec[] {
  switch (uzbekistanScenario) {
    case "already_status":
      return specsForUzbekistanAlreadyStatus();
    case "already_no_status":
      return specsForUzbekistanNoStatus();
    case "self":
    default:
      return specsForUzbekistanSelf(goal, hasJobOffer);
  }
}

// Turkey is also citizenship_group B, and shares the same "no visa-free
// entry at all, no oświadczenie access" profile as Uzbekistan — every goal
// needs visa D, and the WORK goal needs the full zezwolenie na pracę. The
// distinctive Turkey wrinkle isn't a queue like Uzbekistan's Tashkent
// appointment backlog — it's that applications can't be submitted directly
// at the embassy/consulate at all: everything goes through VFS Global in
// the applicant's consular district (Ankara district → VFS Ankara/Antalya;
// Istanbul district → VFS Istanbul/Izmir/Gaziantep/Trabzon). That's folded
// into the step lists below rather than left as a document_guides-only note,
// since it affects every single visa-requiring route.
export type TurkeyScenario = "self" | "already_status" | "already_no_status";

function specsForTurkeyAlreadyStatus(): RouteSpec[] {
  return threeTierSpecs("Уже в Польше с картой побыту/визой D — продление и приведение в порядок документов", [
    {
      steps: ["Проверить срок карты побыту", "Подать на продление карты побыту"],
      timeline: "1 день на подачу",
      cost: "€80",
      probability: 95,
    },
    {
      steps: ["Проверить срок карты побыту", "Обновить мельдунок", "Декларация PIT", "Проверить NIP и ZUS"],
      timeline: "1-2 недели",
      cost: "€80-150",
      probability: 90,
    },
    {
      steps: [
        "Проверить/продлить карту побыту",
        "Обновить все данные",
        "Декларация PIT",
        "Нострификация диплома",
        "Постоянная карта побыту",
      ],
      timeline: "3-12 месяцев",
      cost: "€150-400",
      probability: 85,
    },
  ]);
}

// "Уже в Польше" на туристической визе C, статуса ещё нет. Источник прямо
// отмечает, что эта ветка встречается для Турции ЧАЩЕ, чем у Молдовы/Грузии,
// поскольку у Турции нет безвизового въезда вообще — приезжают почти всегда
// по визе C. Путь 2 — как и у Узбекистана, самый медленный из-за отсутствия
// oświadczenie: полное zezwolenie na pracę (1-3 месяца) плюс обязательный
// выезд за визой D через VFS Global.
function specsForTurkeyNoStatus(): RouteSpec[] {
  return threeTierSpecs("Уже в Польше без статуса (виза C) — легализация без выезда из страны", [
    {
      steps: ["PESEL", "Регистрация ИП (JDG)"],
      timeline: "1-2 дня",
      cost: "€0-50",
      probability: 85,
    },
    {
      steps: ["PESEL", "Регистрация ИП (JDG)", "NIP + карта побыту (бизнес)"],
      timeline: "2-6 недель до истечения визы C",
      cost: "€100-300",
      probability: 80,
    },
    {
      steps: [
        "Работодатель подаёт на zezwolenie na pracę",
        "Выезд за визой D в Турцию (подача только через VFS Global по консульскому округу)",
        "Возвращение в Польшу и легализация (PESEL, ZUS, NFZ, карта побыту)",
      ],
      timeline: "3-6 месяцев (включая ожидание zezwolenia и поездку)",
      cost: "€500-800",
      probability: 70,
    },
  ]);
}

const TR_SELF_SUITABLE_FOR: Record<Goal, string> = {
  work: "Работа по найму — самостоятельный переезд из Турции",
  study: "Обучение в польском университете — самостоятельный переезд из Турции",
  business: "Открытие бизнеса — самостоятельный переезд из Турции",
  family: "Воссоединение с семьёй — самостоятельный переезд из Турции",
  remote: "Удалённая работа из Польши — самостоятельный переезд из Турции",
  savings: "Переезд на собственные средства — самостоятельный переезд из Турции",
  other: "Другие цели пребывания — самостоятельный переезд из Турции",
};

// "Переезжаю сам" (Сценарий 1). Безвизового въезда нет ни для одной цели —
// виза D нужна всегда, и подаётся только через VFS Global по консульскому
// округу (Анкара или Стамбул), напрямую в посольство/консульство не
// принимают. Для работы нужен zezwolenie na pracę (oświadczenie недоступен).
function specsForTurkeySelf(goal: Goal, hasJobOffer: boolean): RouteSpec[] {
  const suitableFor = TR_SELF_SUITABLE_FOR[goal];
  switch (goal) {
    case "work":
      return hasJobOffer
        ? threeTierSpecs(suitableFor, [
            {
              steps: [
                "Zezwolenie na pracę",
                "Виза D (рабочая, на основании zezwolenia, подача через VFS Global по консульскому округу)",
                "Страховка для визы",
                "SIM карта",
                "Аренда жилья",
                "Мельдунок",
                "PESEL",
                "Банк (ZEN.com/Wise)",
                "Работа по найму",
                "NFZ",
                "Карта побыту",
              ],
              timeline: "5-8 месяцев (включая ожидание записи и zezwolenia)",
              cost: "€400-700",
              probability: 72,
            },
            {
              steps: [
                "Zezwolenie na pracę",
                "Виза D (рабочая, на основании zezwolenia, подача через VFS Global по консульскому округу)",
                "Страховка для визы",
                "SIM карта",
                "Аренда жилья",
                "Мельдунок",
                "PESEL",
                "Банк (ZEN.com/Wise)",
                "Работа по найму",
                "NIP",
                "Частная страховка",
                "NFZ",
                "Карта побыту",
              ],
              timeline: "6-9 месяцев",
              cost: "€500-900",
              probability: 68,
            },
            {
              steps: [
                "Zezwolenie na pracę",
                "Виза D (рабочая, на основании zezwolenia, подача через VFS Global по консульскому округу)",
                "Страховка для визы",
                "SIM карта",
                "Аренда жилья",
                "Мельдунок",
                "PESEL",
                "Банк (ZEN.com/Wise)",
                "Работа по найму",
                "NIP",
                "Частная страховка",
                "NFZ",
                "Карта побыту",
                "Продление zezwolenia na pracę",
                "Нострификация диплома",
                "Постоянная карта побыту",
              ],
              // Источник даёт для "Полный" тот же диапазон 5-8 мес., что и для
              // "Быстрый" — при том что здесь на 3 шага больше сверх
              // "Стандартного" (6-9 мес.), включая продление zezwolenia
              // (1-2 мес.) и нострификацию (2-4 мес.). Это внутреннее
              // противоречие в документе — та же ошибка, что и в гайде для
              // Узбекистана; здесь используется реалистичная оценка длиннее
              // "Стандартного", а не скопированная как есть.
              timeline: "7-11 месяцев",
              cost: "€500-1200",
              probability: 75,
            },
          ])
        : threeTierSpecs(suitableFor, [
            {
              steps: [
                "Поиск работы (дистанционно, находясь в Турции)",
                "Zezwolenie na pracę (после нахождения работодателя)",
                "Виза D (рабочая, на основании zezwolenia, подача через VFS Global по консульскому округу)",
                "Страховка для визы",
                "SIM карта",
                "Аренда жилья",
                "Мельдунок",
                "PESEL",
                "Банк (ZEN.com/Wise)",
              ],
              timeline: "6-9 месяцев",
              cost: "€400-700",
              probability: 58,
            },
            {
              steps: [
                "Поиск работы (дистанционно, находясь в Турции)",
                "Zezwolenie na pracę (после нахождения работодателя)",
                "Виза D (рабочая, на основании zezwolenia, подача через VFS Global по консульскому округу)",
                "Страховка для визы",
                "SIM карта",
                "Аренда жилья",
                "Мельдунок",
                "PESEL",
                "Банк (ZEN.com/Wise)",
                "NFZ",
                "Карта побыту",
              ],
              timeline: "7-10 месяцев",
              cost: "€500-900",
              probability: 55,
            },
            {
              steps: [
                "Поиск работы (дистанционно, находясь в Турции)",
                "Zezwolenie na pracę (после нахождения работодателя)",
                "Виза D (рабочая, на основании zezwolenia, подача через VFS Global по консульскому округу)",
                "Страховка для визы",
                "SIM карта",
                "Аренда жилья",
                "Мельдунок",
                "PESEL",
                "Банк (ZEN.com/Wise)",
                "NIP",
                "ZUS",
                "NFZ",
                "Карта побыту",
                "Нострификация диплома",
              ],
              timeline: "8-12 месяцев",
              cost: "€700-1500",
              probability: 50,
            },
          ]);
    case "study":
      return threeTierSpecs(suitableFor, [
        {
          steps: [
            "Зачисление в университет",
            "Виза D (студенческая, подача через VFS Global по консульскому округу)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мельдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
          ],
          timeline: "4-6 недель",
          cost: "€150-300",
          probability: 85,
        },
        {
          steps: [
            "Зачисление в университет",
            "Виза D (студенческая, подача через VFS Global по консульскому округу)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мельдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Студенческая карта побыту",
            "NFZ",
          ],
          timeline: "2-4 месяца",
          cost: "€250-450",
          probability: 85,
        },
        {
          steps: [
            "Зачисление в университет",
            "Виза D (студенческая, подача через VFS Global по консульскому округу)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мельдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Студенческая карта побыту",
            "NFZ",
            "Нострификация диплома",
            "Карта ISIC",
          ],
          timeline: "3-5 месяцев",
          cost: "€350-650",
          probability: 80,
        },
      ]);
    case "business":
      return threeTierSpecs(suitableFor, [
        {
          steps: [
            "Виза D (бизнес, подача через VFS Global по консульскому округу)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мельдунок",
            "PESEL",
            "Регистрация ИП",
            "NIP",
          ],
          timeline: "5-7 недель",
          cost: "€150-350",
          probability: 80,
        },
        {
          steps: [
            "Виза D (бизнес, подача через VFS Global по консульскому округу)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мельдунок",
            "PESEL",
            "Регистрация ИП",
            "NIP",
            "ZUS",
            "Карта побыту",
          ],
          timeline: "2-4 месяца",
          cost: "€300-550",
          probability: 78,
        },
        {
          steps: [
            "Виза D (бизнес, подача через VFS Global по консульскому округу)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мельдунок",
            "PESEL",
            "Счёт для бизнеса (mBank)",
            "Регистрация ООО",
            "NIP",
            "REGON",
            "VAT",
            "Карта побыту",
          ],
          timeline: "3-5 месяцев",
          cost: "€600-1500",
          probability: 75,
        },
      ]);
    case "family":
      return threeTierSpecs(suitableFor, [
        {
          steps: [
            "Виза D по Карте поляка (бесплатно, подача через VFS Global по консульскому округу)",
            "SIM карта",
            "Аренда жилья",
            "Мельдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Карта побыту по Карте поляка",
          ],
          timeline: "2-3 месяца",
          cost: "€100-250",
          probability: 90,
        },
        {
          steps: [
            "Виза D (воссоединение семьи, подача через VFS Global по консульскому округу)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мельдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Карта побыту семья",
          ],
          timeline: "3-5 месяцев",
          cost: "€250-450",
          probability: 80,
        },
        {
          steps: [
            "Виза D (воссоединение семьи, подача через VFS Global по консульскому округу)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мельдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Карта побыту семья",
            "Документы детей школа/садик",
            "Постоянная карта побыту",
          ],
          timeline: "4-6 месяцев",
          cost: "€400-900",
          probability: 78,
        },
      ]);
    case "remote":
      return threeTierSpecs(suitableFor, [
        {
          steps: [
            "Виза D (на основании дохода, подача через VFS Global по консульскому округу)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мельдунок",
            "PESEL",
            "Банк (Wise + ZEN.com)",
          ],
          timeline: "4-6 недель",
          cost: "€150-300",
          probability: 80,
        },
        {
          steps: [
            "Виза D (на основании дохода, подача через VFS Global по консульскому округу)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мельдунок",
            "PESEL",
            "Банк (Wise + ZEN.com)",
            "Регистрация ИП",
            "NIP",
            "ZUS",
            "Карта побыту",
          ],
          timeline: "2-4 месяца",
          cost: "€250-450",
          probability: 78,
        },
        {
          steps: [
            "Виза D (на основании дохода, подача через VFS Global по консульскому округу)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мельдунок",
            "PESEL",
            "Банк (Wise + ZEN.com)",
            "Регистрация ИП",
            "NIP",
            "ZUS",
            "VAT",
            "Карта побыту",
            "Постоянная карта побыту",
          ],
          timeline: "3-5 месяцев",
          cost: "€350-700",
          probability: 75,
        },
      ]);
    case "savings":
      return threeTierSpecs(suitableFor, [
        {
          steps: [
            "Виза D (достаточные средства, подача через VFS Global по консульскому округу)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мельдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
          ],
          timeline: "4-6 недель",
          cost: "€200-350",
          probability: 75,
        },
        {
          steps: [
            "Виза D (достаточные средства, подача через VFS Global по консульскому округу)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мельдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Карта побыту (средства)",
          ],
          timeline: "2-4 месяца",
          cost: "€350-650",
          probability: 70,
        },
        {
          steps: [
            "Виза D (достаточные средства, подача через VFS Global по консульскому округу)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мельдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Карта побыту (средства)",
            "NFZ (добровольно через ZUS)",
            "Постоянная карта побыту",
          ],
          timeline: "3-5 месяцев",
          cost: "€550-1500",
          probability: 65,
        },
      ]);
    case "other":
      return threeTierSpecs(suitableFor, [
        {
          steps: [
            "Виза D (подача через VFS Global по консульскому округу)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мельдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
          ],
          timeline: "2-4 недели",
          cost: "€100-200",
          probability: 85,
        },
        {
          steps: [
            "Виза D (подача через VFS Global по консульскому округу)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мельдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Карта побыту",
          ],
          timeline: "2-4 месяца",
          cost: "€250-450",
          probability: 80,
        },
        {
          steps: [
            "Виза D (подача через VFS Global по консульскому округу)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мельдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Карта побыту",
            "NFZ",
          ],
          timeline: "3-5 месяцев",
          cost: "€350-650",
          probability: 75,
        },
      ]);
  }
}

function specsForTurkey(
  goal: Goal,
  hasJobOffer: boolean,
  turkeyScenario: TurkeyScenario | null | undefined,
): RouteSpec[] {
  switch (turkeyScenario) {
    case "already_status":
      return specsForTurkeyAlreadyStatus();
    case "already_no_status":
      return specsForTurkeyNoStatus();
    case "self":
    default:
      return specsForTurkeySelf(goal, hasJobOffer);
  }
}

// Kazakhstan is also citizenship_group B, and shares the same "no visa-free
// entry at all, no oświadczenie access" profile as Turkey and Uzbekistan —
// every goal needs visa D, and the WORK goal needs the full zezwolenie na
// pracę. The distinctive Kazakhstan wrinkle is different from Turkey's: there
// is no VFS Global — applications go directly to the Astana embassy or
// Almaty consulate general by region — but a high-demand lottery (жеребьёвка)
// can gate the appointment slot, and visa D processing itself runs a minimum
// 30 working days, longer than most other countries covered. That's folded
// into the step lists and timelines below rather than left as a
// document_guides-only note, since it affects every single visa-requiring
// route.
export type KazakhstanScenario = "self" | "already_status" | "already_no_status";

function specsForKazakhstanAlreadyStatus(): RouteSpec[] {
  return threeTierSpecs("Уже в Польше с картой побыту/визой D — продление и приведение в порядок документов", [
    {
      steps: ["Проверить срок карты побыту", "Подать на продление карты побыту"],
      timeline: "1 день на подачу",
      cost: "€80",
      probability: 95,
    },
    {
      steps: ["Проверить срок карты побыту", "Обновить мельдунок", "Декларация PIT", "Проверить NIP и ZUS"],
      timeline: "1-2 недели",
      cost: "€80-150",
      probability: 90,
    },
    {
      steps: [
        "Проверить/продлить карту побыту",
        "Обновить все данные",
        "Декларация PIT",
        "Нострификация диплома",
        "Постоянная карта побыту",
      ],
      timeline: "3-12 месяцев",
      cost: "€150-400",
      probability: 85,
    },
  ]);
}

// "Уже в Польше" на туристической визе C, статуса ещё нет. Источник прямо
// отмечает, что эта ветка встречается для Казахстана ЧАЩЕ, чем у
// Молдовы/Грузии, поскольку у Казахстана нет безвизового въезда вообще.
// Путь 2 здесь медленнее, чем у Турции — из-за минимум 30 рабочих дней на
// рассмотрение визы D плюс возможная жеребьёвка на запись.
function specsForKazakhstanNoStatus(): RouteSpec[] {
  return threeTierSpecs("Уже в Польше без статуса (виза C) — легализация без выезда из страны", [
    {
      steps: ["PESEL", "Регистрация ИП (JDG)"],
      timeline: "1-2 дня",
      cost: "€0-50",
      probability: 85,
    },
    {
      steps: ["PESEL", "Регистрация ИП (JDG)", "NIP + карта побыту (бизнес)"],
      timeline: "2-6 недель до истечения визы C",
      cost: "€100-300",
      probability: 80,
    },
    {
      steps: [
        "Работодатель подаёт на zezwolenie na pracę",
        "Выезд за визой D в Казахстан (Астана или Алматы по региону, возможна жеребьёвка на запись)",
        "Возвращение в Польшу и легализация (PESEL, ZUS, NFZ, карта побыту)",
      ],
      timeline: "4-6 месяцев (включая ожидание zezwolenia и поездку)",
      cost: "€500-800",
      probability: 65,
    },
  ]);
}

const KZ_SELF_SUITABLE_FOR: Record<Goal, string> = {
  work: "Работа по найму — самостоятельный переезд из Казахстана",
  study: "Обучение в польском университете — самостоятельный переезд из Казахстана",
  business: "Открытие бизнеса — самостоятельный переезд из Казахстана",
  family: "Воссоединение с семьёй — самостоятельный переезд из Казахстана",
  remote: "Удалённая работа из Польши — самостоятельный переезд из Казахстана",
  savings: "Переезд на собственные средства — самостоятельный переезд из Казахстана",
  other: "Другие цели пребывания — самостоятельный переезд из Казахстана",
};

// "Переезжаю сам" (Сценарий 1). Безвизового въезда нет ни для одной цели —
// виза D нужна всегда, подаётся напрямую в консульство своего региона
// (Астана или Алматы), но рассмотрение занимает от 30 рабочих дней, а при
// высоком спросе запись идёт через жеребьёвку. Для работы нужен zezwolenie
// na pracę (oświadczenie недоступен).
function specsForKazakhstanSelf(goal: Goal, hasJobOffer: boolean): RouteSpec[] {
  const suitableFor = KZ_SELF_SUITABLE_FOR[goal];
  switch (goal) {
    case "work":
      return hasJobOffer
        ? threeTierSpecs(suitableFor, [
            {
              steps: [
                "Zezwolenie na pracę",
                "Виза D (рабочая, на основании zezwolenia, подача напрямую в консульство региона — Астана/Алматы)",
                "Страховка для визы",
                "SIM карта",
                "Аренда жилья",
                "Мельдунок",
                "PESEL",
                "Банк (ZEN.com/Wise)",
                "Работа по найму",
                "NFZ",
                "Карта побыту",
              ],
              timeline: "5-8 месяцев (включая ожидание записи и zezwolenia)",
              cost: "€400-700",
              probability: 70,
            },
            {
              steps: [
                "Zezwolenie na pracę",
                "Виза D (рабочая, на основании zezwolenia, подача напрямую в консульство региона — Астана/Алматы)",
                "Страховка для визы",
                "SIM карта",
                "Аренда жилья",
                "Мельдунок",
                "PESEL",
                "Банк (ZEN.com/Wise)",
                "Работа по найму",
                "NIP",
                "Частная страховка",
                "NFZ",
                "Карта побыту",
              ],
              timeline: "6-9 месяцев",
              cost: "€500-900",
              probability: 68,
            },
            {
              steps: [
                "Zezwolenie na pracę",
                "Виза D (рабочая, на основании zezwolenia, подача напрямую в консульство региона — Астана/Алматы)",
                "Страховка для визы",
                "SIM карта",
                "Аренда жилья",
                "Мельдунок",
                "PESEL",
                "Банк (ZEN.com/Wise)",
                "Работа по найму",
                "NIP",
                "Частная страховка",
                "NFZ",
                "Карта побыту",
                "Продление zezwolenia na pracę",
                "Нострификация диплома",
                "Постоянная карта побыту",
              ],
              // Источник даёт для "Полный" тот же диапазон 5-8 мес., что и для
              // "Быстрый" — при том что здесь на 3 шага больше сверх
              // "Стандартного" (6-9 мес.), включая продление zezwolenia
              // (1-2 мес.) и нострификацию (2-4 мес.). Это внутреннее
              // противоречие в документе — та же ошибка, что и в гайдах для
              // Узбекистана и Турции; здесь используется реалистичная оценка
              // длиннее "Стандартного", а не скопированная как есть.
              timeline: "7-11 месяцев",
              cost: "€500-1200",
              probability: 75,
            },
          ])
        : threeTierSpecs(suitableFor, [
            {
              steps: [
                "Поиск работы (дистанционно, находясь в Казахстане)",
                "Zezwolenie na pracę (после нахождения работодателя)",
                "Виза D (рабочая, на основании zezwolenia, подача напрямую в консульство региона — Астана/Алматы)",
                "Страховка для визы",
                "SIM карта",
                "Аренда жилья",
                "Мельдунок",
                "PESEL",
                "Банк (ZEN.com/Wise)",
              ],
              timeline: "6-9 месяцев",
              cost: "€400-700",
              probability: 56,
            },
            {
              steps: [
                "Поиск работы (дистанционно, находясь в Казахстане)",
                "Zezwolenie na pracę (после нахождения работодателя)",
                "Виза D (рабочая, на основании zezwolenia, подача напрямую в консульство региона — Астана/Алматы)",
                "Страховка для визы",
                "SIM карта",
                "Аренда жилья",
                "Мельдунок",
                "PESEL",
                "Банк (ZEN.com/Wise)",
                "NFZ",
                "Карта побыту",
              ],
              timeline: "7-10 месяцев",
              cost: "€500-900",
              probability: 53,
            },
            {
              steps: [
                "Поиск работы (дистанционно, находясь в Казахстане)",
                "Zezwolenie na pracę (после нахождения работодателя)",
                "Виза D (рабочая, на основании zezwolenia, подача напрямую в консульство региона — Астана/Алматы)",
                "Страховка для визы",
                "SIM карта",
                "Аренда жилья",
                "Мельдунок",
                "PESEL",
                "Банк (ZEN.com/Wise)",
                "NIP",
                "ZUS",
                "NFZ",
                "Карта побыту",
                "Нострификация диплома",
              ],
              timeline: "8-12 месяцев",
              cost: "€700-1500",
              probability: 48,
            },
          ]);
    case "study":
      return threeTierSpecs(suitableFor, [
        {
          steps: [
            "Зачисление в университет",
            "Виза D (студенческая, подача напрямую в консульство региона — Астана/Алматы)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мельдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
          ],
          timeline: "4-6 недель",
          cost: "€150-300",
          probability: 85,
        },
        {
          steps: [
            "Зачисление в университет",
            "Виза D (студенческая, подача напрямую в консульство региона — Астана/Алматы)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мельдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Студенческая карта побыту",
            "NFZ",
          ],
          timeline: "2-4 месяца",
          cost: "€250-450",
          probability: 85,
        },
        {
          steps: [
            "Зачисление в университет",
            "Виза D (студенческая, подача напрямую в консульство региона — Астана/Алматы)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мельдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Студенческая карта побыту",
            "NFZ",
            "Нострификация диплома",
            "Карта ISIC",
          ],
          timeline: "3-5 месяцев",
          cost: "€350-650",
          probability: 80,
        },
      ]);
    case "business":
      return threeTierSpecs(suitableFor, [
        {
          steps: [
            "Виза D (бизнес, подача напрямую в консульство региона — Астана/Алматы)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мельдунок",
            "PESEL",
            "Регистрация ИП",
            "NIP",
          ],
          timeline: "5-7 недель",
          cost: "€150-350",
          probability: 80,
        },
        {
          steps: [
            "Виза D (бизнес, подача напрямую в консульство региона — Астана/Алматы)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мельдунок",
            "PESEL",
            "Регистрация ИП",
            "NIP",
            "ZUS",
            "Карта побыту",
          ],
          timeline: "2-4 месяца",
          cost: "€300-550",
          probability: 78,
        },
        {
          steps: [
            "Виза D (бизнес, подача напрямую в консульство региона — Астана/Алматы)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мельдунок",
            "PESEL",
            "Счёт для бизнеса (mBank)",
            "Регистрация ООО",
            "NIP",
            "REGON",
            "VAT",
            "Карта побыту",
          ],
          timeline: "3-5 месяцев",
          cost: "€600-1500",
          probability: 75,
        },
      ]);
    case "family":
      return threeTierSpecs(suitableFor, [
        {
          steps: [
            "Виза D по Карте поляка (бесплатно, подача напрямую в консульство региона — Астана/Алматы)",
            "SIM карта",
            "Аренда жилья",
            "Мельдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Карта побыту по Карте поляка",
          ],
          timeline: "2-3 месяца",
          cost: "€100-250",
          probability: 90,
        },
        {
          steps: [
            "Виза D (воссоединение семьи, подача напрямую в консульство региона — Астана/Алматы)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мельдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Карта побыту семья",
          ],
          timeline: "3-5 месяцев",
          cost: "€250-450",
          probability: 80,
        },
        {
          steps: [
            "Виза D (воссоединение семьи, подача напрямую в консульство региона — Астана/Алматы)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мельдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Карта побыту семья",
            "Документы детей школа/садик",
            "Постоянная карта побыту",
          ],
          timeline: "4-6 месяцев",
          cost: "€400-900",
          probability: 78,
        },
      ]);
    case "remote":
      return threeTierSpecs(suitableFor, [
        {
          steps: [
            "Виза D (на основании дохода, подача напрямую в консульство региона — Астана/Алматы)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мельдунок",
            "PESEL",
            "Банк (Wise + ZEN.com)",
          ],
          timeline: "4-6 недель",
          cost: "€150-300",
          probability: 80,
        },
        {
          steps: [
            "Виза D (на основании дохода, подача напрямую в консульство региона — Астана/Алматы)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мельдунок",
            "PESEL",
            "Банк (Wise + ZEN.com)",
            "Регистрация ИП",
            "NIP",
            "ZUS",
            "Карта побыту",
          ],
          timeline: "2-4 месяца",
          cost: "€250-450",
          probability: 78,
        },
        {
          steps: [
            "Виза D (на основании дохода, подача напрямую в консульство региона — Астана/Алматы)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мельдунок",
            "PESEL",
            "Банк (Wise + ZEN.com)",
            "Регистрация ИП",
            "NIP",
            "ZUS",
            "VAT",
            "Карта побыту",
            "Постоянная карта побыту",
          ],
          timeline: "3-5 месяцев",
          cost: "€350-700",
          probability: 75,
        },
      ]);
    case "savings":
      return threeTierSpecs(suitableFor, [
        {
          steps: [
            "Виза D (достаточные средства, подача напрямую в консульство региона — Астана/Алматы)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мельдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
          ],
          timeline: "4-6 недель",
          cost: "€200-350",
          probability: 75,
        },
        {
          steps: [
            "Виза D (достаточные средства, подача напрямую в консульство региона — Астана/Алматы)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мельдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Карта побыту (средства)",
          ],
          timeline: "2-4 месяца",
          cost: "€350-650",
          probability: 70,
        },
        {
          steps: [
            "Виза D (достаточные средства, подача напрямую в консульство региона — Астана/Алматы)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мельдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Карта побыту (средства)",
            "NFZ (добровольно через ZUS)",
            "Постоянная карта побыту",
          ],
          timeline: "3-5 месяцев",
          cost: "€550-1500",
          probability: 65,
        },
      ]);
    case "other":
      return threeTierSpecs(suitableFor, [
        {
          steps: [
            "Виза D (подача напрямую в консульство региона — Астана/Алматы)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мельдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
          ],
          timeline: "2-4 недели",
          cost: "€100-200",
          probability: 85,
        },
        {
          steps: [
            "Виза D (подача напрямую в консульство региона — Астана/Алматы)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мельдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Карта побыту",
          ],
          timeline: "2-4 месяца",
          cost: "€250-450",
          probability: 80,
        },
        {
          steps: [
            "Виза D (подача напрямую в консульство региона — Астана/Алматы)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мельдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Карта побыту",
            "NFZ",
          ],
          timeline: "3-5 месяцев",
          cost: "€350-650",
          probability: 75,
        },
      ]);
  }
}

function specsForKazakhstan(
  goal: Goal,
  hasJobOffer: boolean,
  kazakhstanScenario: KazakhstanScenario | null | undefined,
): RouteSpec[] {
  switch (kazakhstanScenario) {
    case "already_status":
      return specsForKazakhstanAlreadyStatus();
    case "already_no_status":
      return specsForKazakhstanNoStatus();
    case "self":
    default:
      return specsForKazakhstanSelf(goal, hasJobOffer);
  }
}

function specsForGroupB(
  goal: Goal,
  hasJobOffer: boolean,
  citizenship: string | null | undefined,
  belarusScenario: BelarusScenario | null | undefined,
  uzbekistanScenario: UzbekistanScenario | null | undefined,
  turkeyScenario: TurkeyScenario | null | undefined,
  kazakhstanScenario: KazakhstanScenario | null | undefined,
): RouteSpec[] {
  if (citizenship === "KZ") {
    return specsForKazakhstan(goal, hasJobOffer, kazakhstanScenario);
  }
  if (citizenship === "TR") {
    return specsForTurkey(goal, hasJobOffer, turkeyScenario);
  }
  if (citizenship === "UZ") {
    return specsForUzbekistan(goal, hasJobOffer, uzbekistanScenario);
  }
  if (citizenship === "BY") {
    return specsForBelarus(goal, hasJobOffer, belarusScenario);
  }
  switch (goal) {
    case "work":
      return hasJobOffer
        ? threeTierSpecs("Работа по найму с оффером", [
            {
              steps: ["Виза D", "Страховка", "Мелдунок", "PESEL", "Банк", "Разрешение на работу"],
              timeline: "3-4 месяца",
              cost: "€200-400",
              probability: 90,
            },
            {
              steps: ["Виза D", "Страховка", "Мелдунок", "PESEL", "Банк", "Разрешение на работу", "NFZ", "Карта побыту"],
              timeline: "4-6 месяцев",
              cost: "€400-700",
              probability: 85,
            },
            {
              steps: [
                "Виза D",
                "Страховка",
                "Апостиль",
                "Перевод документов",
                "Мелдунок",
                "PESEL",
                "Банк",
                "Разрешение на работу",
                "NIP",
                "ZUS",
                "NFZ",
                "Карта побыту",
                "Нострификация диплома",
              ],
              timeline: "5-8 месяцев",
              cost: "€600-1200",
              probability: 80,
            },
          ])
        : threeTierSpecs("Поиск работы в Польше", [
            {
              steps: ["Виза D", "Страховка", "Мелдунок", "PESEL", "Банк", "Поиск работы"],
              timeline: "3-5 месяцев",
              cost: "€300-600",
              probability: 70,
            },
            {
              steps: ["Виза D", "Страховка", "Мелдунок", "PESEL", "Банк", "Поиск работы", "Разрешение на работу", "Карта побыту"],
              timeline: "5-8 месяцев",
              cost: "€500-900",
              probability: 65,
            },
            {
              steps: [
                "Виза D",
                "Страховка",
                "Апостиль",
                "Перевод документов",
                "Мелдунок",
                "PESEL",
                "Банк",
                "Курсы польского",
                "Поиск работы",
                "Разрешение на работу",
                "NIP",
                "ZUS",
                "NFZ",
                "Карта побыту",
              ],
              timeline: "6-10 месяцев",
              cost: "€700-1500",
              probability: 60,
            },
          ]);
    case "business":
      return threeTierSpecs("Открытие бизнеса в Польше", [
        {
          steps: ["Виза D", "Страховка", "PESEL", "Мелдунок", "Банк", "Регистрация ИП", "NIP"],
          timeline: "3-5 месяцев",
          cost: "€300-600",
          probability: 85,
        },
        {
          steps: ["Виза D", "Страховка", "PESEL", "Мелдунок", "Банк", "Регистрация ИП", "NIP", "ZUS", "Карта побыту"],
          timeline: "4-6 месяцев",
          cost: "€400-800",
          probability: 80,
        },
        {
          steps: [
            "Виза D",
            "Страховка",
            "Апостиль",
            "PESEL",
            "Мелдунок",
            "Банк",
            "Регистрация ООО",
            "NIP",
            "REGON",
            "VAT",
            "ZUS",
            "Карта побыту",
          ],
          timeline: "5-8 месяцев",
          cost: "€800-2500",
          probability: 75,
        },
      ]);
    case "study":
      return threeTierSpecs("Обучение в польском университете", [
        {
          steps: ["Зачисление в университет", "Виза D студенческая", "Страховка", "PESEL", "Мелдунок", "Банк"],
          timeline: "2-3 месяца",
          cost: "€200-400",
          probability: 88,
        },
        {
          steps: [
            "Зачисление в университет",
            "Виза D студенческая",
            "Страховка",
            "PESEL",
            "Мелдунок",
            "Банк",
            "Студенческая карта побыту",
          ],
          timeline: "3-5 месяцев",
          cost: "€300-600",
          probability: 85,
        },
        {
          steps: [
            "Зачисление в университет",
            "Апостиль",
            "Перевод документов",
            "Виза D студенческая",
            "Страховка",
            "PESEL",
            "Мелдунок",
            "Банк",
            "Студенческая карта побыту",
            "NFZ",
            "Нострификация диплома",
            "ISIC",
          ],
          timeline: "4-6 месяцев",
          cost: "€400-900",
          probability: 82,
        },
      ]);
    case "family":
      return threeTierSpecs("Воссоединение с семьёй", [
        {
          steps: ["Виза D семья", "Страховка", "PESEL", "Мелдунок", "Банк", "Карта побыту семья"],
          timeline: "3-5 месяцев",
          cost: "€300-600",
          probability: 82,
        },
        {
          steps: ["Виза D семья", "Страховка", "Апостиль", "PESEL", "Мелдунок", "Банк", "Карта побыту семья", "NFZ"],
          timeline: "4-6 месяцев",
          cost: "€400-800",
          probability: 78,
        },
        {
          steps: [
            "Виза D семья",
            "Страховка",
            "Апостиль",
            "Перевод документов",
            "PESEL",
            "Мелдунок",
            "Банк",
            "Карта побыту семья",
            "NFZ",
            "Постоянная карта побыту",
          ],
          timeline: "5-12 месяцев",
          cost: "€600-1500",
          probability: 75,
        },
      ]);
    case "remote":
      return threeTierSpecs("Удалённая работа на иностранного работодателя", [
        {
          steps: ["Виза D", "Страховка", "PESEL", "Мелдунок", "Банк", "Карта побыту"],
          timeline: "3-5 месяцев",
          cost: "€200-500",
          probability: 85,
        },
        {
          steps: ["Виза D", "Страховка", "PESEL", "Мелдунок", "Банк", "Регистрация ИП", "NIP", "ZUS", "Карта побыту"],
          timeline: "4-6 месяцев",
          cost: "€400-800",
          probability: 80,
        },
        {
          steps: [
            "Виза D",
            "Страховка",
            "Апостиль",
            "PESEL",
            "Мелдунок",
            "Банк",
            "Регистрация ИП",
            "NIP",
            "ZUS",
            "VAT",
            "Карта побыту",
          ],
          timeline: "5-8 месяцев",
          cost: "€600-1200",
          probability: 75,
        },
      ]);
    case "savings":
      return threeTierSpecs("Переезд на собственные средства", [
        {
          steps: ["Виза D", "Страховка", "PESEL", "Мелдунок", "Банк", "Частная страховка", "Карта побыту средства"],
          timeline: "3-5 месяцев",
          cost: "€400-800",
          probability: 75,
        },
        {
          steps: [
            "Виза D",
            "Страховка",
            "Апостиль",
            "PESEL",
            "Мелдунок",
            "Банк",
            "Частная страховка",
            "Карта побыту средства",
            "NFZ",
          ],
          timeline: "4-6 месяцев",
          cost: "€600-1200",
          probability: 70,
        },
        {
          steps: [
            "Виза D",
            "Страховка",
            "Апостиль",
            "Перевод документов",
            "PESEL",
            "Мелдунок",
            "Банк",
            "Частная страховка",
            "Карта побыту средства",
            "NFZ",
            "Постоянная карта побыту",
          ],
          timeline: "5-12 месяцев",
          cost: "€800-2000",
          probability: 65,
        },
      ]);
    case "other":
      return threeTierSpecs("Другие цели пребывания", [
        { steps: ["Виза D", "Страховка", "PESEL", "Мелдунок", "Банк"], timeline: "3-4 месяца", cost: "€200-400", probability: 80 },
        {
          steps: ["Виза D", "Страховка", "PESEL", "Мелдунок", "Банк", "Частная страховка", "Карта побыту"],
          timeline: "4-6 месяцев",
          cost: "€300-700",
          probability: 75,
        },
        {
          steps: ["Виза D", "Страховка", "Апостиль", "PESEL", "Мелдунок", "Банк", "Частная страховка", "Карта побыту", "NFZ"],
          timeline: "5-8 месяцев",
          cost: "€500-1200",
          probability: 70,
        },
      ]);
  }
}

// Georgia is citizenship_group D (visa-waiver, 90 days) like Moldova/US/UK/etc,
// but since 15.08.2026 the WORK goal specifically no longer gets the generic
// visa-free treatment: Poland requires a visa D backed by a full zezwolenie na
// pracę for work, because oświadczenie stopped covering Georgian citizens on
// 1.12.2025 (Georgia was dropped from that list; only Armenia/Belarus/Moldova/
// Ukraine still have it). Every other goal (study/business/family/remote/
// savings/other) keeps the ordinary 90-day visa-free entry. See the
// "georgiaScenario" onboarding step, which — same as Belarus — also splits
// "already in Poland" into ordinary renewal vs. a no-status legalization path,
// except Georgia's Путь 2 (employer route) is much slower because it needs the
// full zezwolenie na pracę (1-3 months for a voivode's decision) instead of a
// quick oświadczenie registration.
export type GeorgiaScenario = "self" | "already_status" | "already_no_status";

function specsForGeorgiaAlreadyStatus(): RouteSpec[] {
  return threeTierSpecs("Уже в Польше с картой побыту/визой D — продление и приведение в порядок документов", [
    {
      steps: ["Проверить срок карты побыту", "Подать на продление карты побыту"],
      timeline: "1 день на подачу",
      cost: "€80",
      probability: 95,
    },
    {
      steps: ["Проверить срок карты побыту", "Обновить мелдунок", "Декларация PIT", "Проверить NIP и ZUS"],
      timeline: "1-2 недели",
      cost: "€80-150",
      probability: 90,
    },
    {
      steps: [
        "Проверить/продлить карту побыту",
        "Обновить все данные",
        "Декларация PIT",
        "Нострификация диплома",
        "Постоянная карта побыту",
      ],
      timeline: "3-12 месяцев",
      cost: "€150-400",
      probability: 85,
    },
  ]);
}

// "Уже в Польше" на визе-free 90 днях, статуса ещё нет. Путь 1 (ИП, без
// выезда) идентичен другим странам, но Путь 2 у Грузии заметно дольше — вместо
// oświadczenie (7-30 дней) нужно полное zezwolenie na pracę (1-3 месяца
// ожидания решения воеводы) плюс поездка в Тбилиси за визой D.
function specsForGeorgiaNoStatus(): RouteSpec[] {
  return threeTierSpecs("Уже в Польше без статуса (безвиз 90 дней) — легализация без выезда из страны", [
    {
      steps: ["PESEL", "Регистрация ИП (JDG)"],
      timeline: "1-2 дня",
      cost: "€0-50",
      probability: 85,
    },
    {
      steps: ["PESEL", "Регистрация ИП (JDG)", "NIP + карта побыту (бизнес)"],
      timeline: "2-8 недель до истечения безвиза",
      cost: "€100-300",
      probability: 80,
    },
    {
      steps: [
        "Работодатель подаёт на zezwolenie na pracę",
        "Поездка в Тбилиси за визой D",
        "Возвращение в Польшу и легализация (PESEL, ZUS, NFZ, карта побыту)",
      ],
      timeline: "3-5 месяцев (включая ожидание zezwolenia и поездку)",
      cost: "€500-800",
      probability: 70,
    },
  ]);
}

const GE_SELF_SUITABLE_FOR: Record<Goal, string> = {
  work: "Работа по найму — самостоятельный переезд из Грузии",
  study: "Обучение в польском университете — самостоятельный переезд из Грузии",
  business: "Открытие бизнеса — самостоятельный переезд из Грузии",
  family: "Воссоединение с семьёй — самостоятельный переезд из Грузии",
  remote: "Удалённая работа из Польши — самостоятельный переезд из Грузии",
  savings: "Переезд на собственные средства — самостоятельный переезд из Грузии",
  other: "Другие цели пребывания — самостоятельный переезд из Грузии",
};

// "Переезжаю сам" (Сценарий 1). Только цель "работа" требует визу D — и то
// лишь потому, что она привязана к обязательному zezwolenie na pracę
// (oświadczenie для Грузии недоступен с 1.12.2025). Все остальные цели
// используют обычный безвизовый въезд на 90 дней, как и весь Group D.
function specsForGeorgiaSelf(goal: Goal, hasJobOffer: boolean): RouteSpec[] {
  const suitableFor = GE_SELF_SUITABLE_FOR[goal];
  switch (goal) {
    case "work":
      return hasJobOffer
        ? threeTierSpecs(suitableFor, [
            {
              steps: [
                "Zezwolenie na pracę",
                "Виза D (рабочая, на основании zezwolenia)",
                "Страховка для визы",
                "SIM карта",
                "Аренда жилья",
                "Мелдунок",
                "PESEL",
                "Банк (ZEN.com/Wise)",
                "Работа по найму",
                "NFZ",
                "Карта побыту",
              ],
              timeline: "4-7 месяцев (включая ожидание zezwolenia)",
              cost: "€400-700",
              probability: 78,
            },
            {
              steps: [
                "Zezwolenie na pracę",
                "Виза D (рабочая, на основании zezwolenia)",
                "Страховка для визы",
                "SIM карта",
                "Аренда жилья",
                "Мелдунок",
                "PESEL",
                "Банк (ZEN.com/Wise)",
                "Работа по найму",
                "NIP",
                "Частная страховка",
                "NFZ",
                "Карта побыту",
              ],
              timeline: "5-8 месяцев",
              cost: "€500-900",
              probability: 75,
            },
            {
              steps: [
                "Zezwolenie na pracę",
                "Виза D (рабочая, на основании zezwolenia)",
                "Страховка для визы",
                "Апостиль",
                "Перевод документов",
                "SIM карта",
                "Аренда жилья",
                "Мелдунок",
                "PESEL",
                "Банк (ZEN.com/Wise)",
                "Работа по найму",
                "NIP",
                "Частная страховка",
                "NFZ",
                "Карта побыту",
                "Продление zezwolenia na pracę",
                "Нострификация диплома",
              ],
              timeline: "6-10 месяцев",
              cost: "€600-1400",
              probability: 70,
            },
          ])
        : threeTierSpecs(suitableFor, [
            {
              steps: [
                "Поиск работы (дистанционно, находясь в Грузии)",
                "Zezwolenie na pracę (после нахождения работодателя)",
                "Виза D (рабочая, на основании zezwolenia)",
                "Страховка для визы",
                "SIM карта",
                "Аренда жилья",
                "Мелдунок",
                "PESEL",
                "Банк (ZEN.com/Wise)",
              ],
              timeline: "5-8 месяцев",
              cost: "€400-700",
              probability: 60,
            },
            {
              steps: [
                "Поиск работы (дистанционно, находясь в Грузии)",
                "Zezwolenie na pracę (после нахождения работодателя)",
                "Виза D (рабочая, на основании zezwolenia)",
                "Страховка для визы",
                "SIM карта",
                "Аренда жилья",
                "Мелдунок",
                "PESEL",
                "Банк (ZEN.com/Wise)",
                "NFZ",
                "Карта побыту",
              ],
              timeline: "6-9 месяцев",
              cost: "€500-900",
              probability: 58,
            },
            {
              steps: [
                "Поиск работы (дистанционно, находясь в Грузии)",
                "Zezwolenie na pracę (после нахождения работодателя)",
                "Виза D (рабочая, на основании zezwolenia)",
                "Страховка для визы",
                "Апостиль",
                "Перевод документов",
                "SIM карта",
                "Аренда жилья",
                "Мелдунок",
                "PESEL",
                "Банк (ZEN.com/Wise)",
                "NIP",
                "ZUS",
                "NFZ",
                "Карта побыту",
                "Нострификация диплома",
              ],
              timeline: "7-11 месяцев",
              cost: "€700-1500",
              probability: 55,
            },
          ]);
    case "study":
      return threeTierSpecs(suitableFor, [
        {
          steps: ["Зачисление в университет", "SIM карта", "Аренда жилья", "Мелдунок", "PESEL", "Банк (ZEN.com/Wise)"],
          timeline: "1-2 недели",
          cost: "€30-150",
          probability: 92,
        },
        {
          steps: [
            "Зачисление в университет",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Студенческая карта побыту",
            "NFZ",
          ],
          timeline: "1-3 месяца",
          cost: "€100-300",
          probability: 88,
        },
        {
          steps: [
            "Зачисление в университет",
            "Виза D (студенческая)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Студенческая карта побыту",
            "NFZ",
            "Нострификация диплома",
            "Карта ISIC",
          ],
          timeline: "2-4 месяца",
          cost: "€200-500",
          probability: 85,
        },
      ]);
    case "business":
      return threeTierSpecs(suitableFor, [
        {
          steps: ["SIM карта", "Аренда жилья", "Мелдунок", "PESEL", "Банк (ZEN.com/Wise)", "Регистрация ИП", "NIP"],
          timeline: "2-4 недели",
          cost: "€50-200",
          probability: 90,
        },
        {
          steps: [
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Регистрация ИП",
            "NIP",
            "ZUS",
            "Карта побыту",
          ],
          timeline: "1-3 месяца",
          cost: "€150-400",
          probability: 87,
        },
        {
          steps: [
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Счёт для бизнеса (mBank)",
            "Регистрация ООО",
            "NIP",
            "REGON",
            "VAT",
            "Карта побыту",
          ],
          timeline: "2-4 месяца",
          cost: "€500-1500",
          probability: 80,
        },
      ]);
    case "family":
      return threeTierSpecs(suitableFor, [
        {
          steps: ["SIM карта", "Аренда жилья", "Мелдунок", "PESEL", "Банк (ZEN.com/Wise)", "Карта побыту семья"],
          timeline: "1-3 месяца",
          cost: "€50-200",
          probability: 88,
        },
        {
          steps: [
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Карта побыту семья",
          ],
          timeline: "2-4 месяца",
          cost: "€150-400",
          probability: 85,
        },
        {
          steps: [
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "NFZ",
            "Карта побыту семья",
            "Документы детей школа/садик",
            "Постоянная карта побыту",
          ],
          timeline: "3-12 месяцев",
          cost: "€300-800",
          probability: 82,
        },
      ]);
    case "remote":
      return threeTierSpecs(suitableFor, [
        {
          steps: ["SIM карта", "Аренда жилья", "Мелдунок", "PESEL", "Банк (Wise + ZEN.com)"],
          timeline: "1-2 недели",
          cost: "€0-100",
          probability: 93,
        },
        {
          steps: [
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (Wise + ZEN.com)",
            "Регистрация ИП",
            "NIP",
            "ZUS",
            "Карта побыту",
          ],
          timeline: "1-3 месяца",
          cost: "€100-400",
          probability: 88,
        },
        {
          steps: [
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (Wise + ZEN.com)",
            "Регистрация ИП",
            "NIP",
            "ZUS",
            "VAT",
            "Карта побыту",
            "Постоянная карта побыту",
          ],
          timeline: "2-6 месяцев",
          cost: "€200-700",
          probability: 85,
        },
      ]);
    case "savings":
      return threeTierSpecs(suitableFor, [
        {
          steps: ["SIM карта", "Аренда жилья", "Мелдунок", "PESEL", "Банк (ZEN.com/Wise)", "Частная страховка"],
          timeline: "1-2 недели",
          cost: "€100-300",
          probability: 80,
        },
        {
          steps: [
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Карта побыту (средства)",
          ],
          timeline: "1-3 месяца",
          cost: "€300-700",
          probability: 75,
        },
        {
          steps: [
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Карта побыту (средства)",
            "NFZ (добровольно через ZUS)",
            "Постоянная карта побыту",
          ],
          timeline: "3-12 месяцев",
          cost: "€500-1500",
          probability: 70,
        },
      ]);
    case "other":
      return threeTierSpecs(suitableFor, [
        {
          steps: ["SIM карта", "Аренда жилья", "Мелдунок", "PESEL", "Банк (ZEN.com/Wise)"],
          timeline: "2-4 недели",
          cost: "€50-150",
          probability: 85,
        },
        {
          steps: [
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Карта побыту",
          ],
          timeline: "1-3 месяца",
          cost: "€100-300",
          probability: 80,
        },
        {
          steps: [
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Карта побыту",
            "NFZ",
          ],
          timeline: "2-4 месяца",
          cost: "€200-450",
          probability: 75,
        },
      ]);
  }
}

function specsForGeorgia(goal: Goal, hasJobOffer: boolean, georgiaScenario: GeorgiaScenario | null | undefined): RouteSpec[] {
  switch (georgiaScenario) {
    case "already_status":
      return specsForGeorgiaAlreadyStatus();
    case "already_no_status":
      return specsForGeorgiaNoStatus();
    case "self":
    default:
      return specsForGeorgiaSelf(goal, hasJobOffer);
  }
}

// Moldova is citizenship_group D (visa-waiver, 90 days) like Georgia, but
// unlike Georgia it's still one of the 4 countries oświadczenie covers
// (Armenia/Belarus/Moldova/Ukraine), so the WORK goal only needs a visa D
// backed by a quick oświadczenie registration (7-30 days), not a full
// zezwolenie na pracę — a fast track much closer to Belarus's than Georgia's.
// Every other goal (study/business/family/remote/savings/other) keeps the
// ordinary 90-day visa-free entry, same as the rest of Group D. See the
// "moldovaScenario" onboarding step, which — same shape as Belarus/Georgia —
// also splits "already in Poland" into ordinary renewal vs. a no-status
// legalization path, with Moldova's Путь 2 (employer route) fast like
// Belarus's since it also relies on oświadczenie rather than zezwolenie.
export type MoldovaScenario = "self" | "already_status" | "already_no_status";

function specsForMoldovaAlreadyStatus(): RouteSpec[] {
  return threeTierSpecs("Уже в Польше с картой побыту/визой D — продление и приведение в порядок документов", [
    {
      steps: ["Проверить срок карты побыту", "Подать на продление карты побыту"],
      timeline: "1 день на подачу",
      cost: "€80",
      probability: 95,
    },
    {
      steps: ["Проверить срок карты побыту", "Обновить мелдунок", "Декларация PIT", "Проверить NIP и ZUS"],
      timeline: "1-2 недели",
      cost: "€80-150",
      probability: 90,
    },
    {
      steps: [
        "Проверить/продлить карту побыту",
        "Обновить все данные",
        "Декларация PIT",
        "Нострификация диплома",
        "Постоянная карта побыту",
      ],
      timeline: "3-12 месяцев",
      cost: "€150-400",
      probability: 85,
    },
  ]);
}

// "Уже в Польше" на визе-free 90 днях, статуса ещё нет. Путь 2 у Молдовы
// быстрый (как у Беларуси) — oświadczenie регистрируется за 7-30 дней,
// затем короткая поездка в Кишинёв за визой D, в отличие от Грузии, где
// нужно ждать 1-3 месяца решения воеводы по zezwolenie na pracę.
function specsForMoldovaNoStatus(): RouteSpec[] {
  return threeTierSpecs("Уже в Польше без статуса (безвиз 90 дней) — легализация без выезда из страны", [
    {
      steps: ["PESEL", "Регистрация ИП (JDG)"],
      timeline: "1-2 дня",
      cost: "€0-50",
      probability: 85,
    },
    {
      steps: ["PESEL", "Регистрация ИП (JDG)", "NIP + карта побыту (бизнес)"],
      timeline: "2-8 недель до истечения безвиза",
      cost: "€100-300",
      probability: 80,
    },
    {
      steps: [
        "Работодатель регистрирует oświadczenie",
        "Короткая поездка в Кишинёв за визой D",
        "Возвращение в Польшу и легализация (PESEL, ZUS, NFZ, карта побыту)",
      ],
      timeline: "4-8 недель (включая поездку)",
      cost: "€200-400",
      probability: 82,
    },
  ]);
}

const MD_SELF_SUITABLE_FOR: Record<Goal, string> = {
  work: "Работа по найму — самостоятельный переезд из Молдовы",
  study: "Обучение в польском университете — самостоятельный переезд из Молдовы",
  business: "Открытие бизнеса — самостоятельный переезд из Молдовы",
  family: "Воссоединение с семьёй — самостоятельный переезд из Молдовы",
  remote: "Удалённая работа из Польши — самостоятельный переезд из Молдовы",
  savings: "Переезд на собственные средства — самостоятельный переезд из Молдовы",
  other: "Другие цели пребывания — самостоятельный переезд из Молдовы",
};

// "Переезжаю сам" (Сценарий 1). Только цель "работа" требует визу D — по
// oświadczeniu, оформляется в Кишинёве. Все остальные цели используют
// обычный безвизовый въезд на 90 дней, как и весь Group D.
function specsForMoldovaSelf(goal: Goal, hasJobOffer: boolean): RouteSpec[] {
  const suitableFor = MD_SELF_SUITABLE_FOR[goal];
  switch (goal) {
    case "work":
      return hasJobOffer
        ? threeTierSpecs(suitableFor, [
            {
              steps: [
                "Виза D (рабочая, по oświadczeniu)",
                "Страховка для визы",
                "SIM карта",
                "Аренда жилья",
                "Мелдунок",
                "PESEL",
                "Банк (ZEN.com/Wise)",
                "Работа без разрешения (oświadczenie)",
                "NFZ",
                "Карта побыту",
              ],
              timeline: "3-5 месяцев",
              cost: "€300-600",
              probability: 85,
            },
            {
              steps: [
                "Виза D (рабочая, по oświadczeniu)",
                "Страховка для визы",
                "SIM карта",
                "Аренда жилья",
                "Мелдунок",
                "PESEL",
                "Банк (ZEN.com/Wise)",
                "Работа без разрешения (oświadczenie)",
                "NIP",
                "Частная страховка",
                "NFZ",
                "Карта побыту",
              ],
              timeline: "4-6 месяцев",
              cost: "€400-800",
              probability: 82,
            },
            {
              steps: [
                "Виза D (рабочая, по oświadczeniu)",
                "Страховка для визы",
                "SIM карта",
                "Аренда жилья",
                "Мелдунок",
                "PESEL",
                "Банк (ZEN.com/Wise)",
                "Работа без разрешения (oświadczenie)",
                "NIP",
                "Частная страховка",
                "NFZ",
                "Карта побыту",
                "Продление oświadczenia / zezwolenie na pracę",
                "Нострификация диплома",
                "Постоянная карта побыту",
              ],
              timeline: "5-8 месяцев",
              cost: "€500-1200",
              probability: 78,
            },
          ])
        : threeTierSpecs(suitableFor, [
            {
              steps: [
                "Виза D",
                "Страховка для визы",
                "SIM карта",
                "Аренда жилья",
                "Мелдунок",
                "PESEL",
                "Банк (ZEN.com/Wise)",
                "Поиск работы",
              ],
              timeline: "3-5 месяцев",
              cost: "€300-600",
              probability: 70,
            },
            {
              steps: [
                "Виза D",
                "Страховка для визы",
                "SIM карта",
                "Аренда жилья",
                "Мелдунок",
                "PESEL",
                "Банк (ZEN.com/Wise)",
                "Поиск работы",
                "Работа без разрешения (oświadczenie)",
                "NFZ",
                "Карта побыту",
              ],
              timeline: "5-8 месяцев",
              cost: "€500-900",
              probability: 65,
            },
            {
              steps: [
                "Виза D",
                "Страховка для визы",
                "SIM карта",
                "Аренда жилья",
                "Мелдунок",
                "PESEL",
                "Банк (ZEN.com/Wise)",
                "Поиск работы",
                "Работа без разрешения (oświadczenie)",
                "NIP",
                "ZUS",
                "NFZ",
                "Карта побыту",
                "Нострификация диплома",
              ],
              timeline: "6-10 месяцев",
              cost: "€700-1500",
              probability: 60,
            },
          ]);
    case "study":
      return threeTierSpecs(suitableFor, [
        {
          steps: ["Зачисление в университет", "SIM карта", "Аренда жилья", "Мелдунок", "PESEL", "Банк (ZEN.com/Wise)"],
          timeline: "1-2 недели",
          cost: "€30-150",
          probability: 92,
        },
        {
          steps: [
            "Зачисление в университет",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Студенческая карта побыту",
            "NFZ",
          ],
          timeline: "1-3 месяца",
          cost: "€100-300",
          probability: 88,
        },
        {
          steps: [
            "Зачисление в университет",
            "Виза D (студенческая)",
            "Страховка для визы",
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Студенческая карта побыту",
            "NFZ",
            "Нострификация диплома",
            "Карта ISIC",
          ],
          timeline: "2-4 месяца",
          cost: "€200-500",
          probability: 85,
        },
      ]);
    case "business":
      return threeTierSpecs(suitableFor, [
        {
          steps: ["SIM карта", "Аренда жилья", "Мелдунок", "PESEL", "Банк (ZEN.com/Wise)", "Регистрация ИП", "NIP"],
          timeline: "2-4 недели",
          cost: "€50-200",
          probability: 90,
        },
        {
          steps: [
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Регистрация ИП",
            "NIP",
            "ZUS",
            "Карта побыту",
          ],
          timeline: "1-3 месяца",
          cost: "€150-400",
          probability: 87,
        },
        {
          steps: [
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Счёт для бизнеса (mBank)",
            "Регистрация ООО",
            "NIP",
            "REGON",
            "VAT",
            "Карта побыту",
          ],
          timeline: "2-4 месяца",
          cost: "€500-1500",
          probability: 80,
        },
      ]);
    case "family":
      return threeTierSpecs(suitableFor, [
        {
          steps: ["SIM карта", "Аренда жилья", "Мелдунок", "PESEL", "Банк (ZEN.com/Wise)", "Карта побыту семья"],
          timeline: "1-3 месяца",
          cost: "€50-200",
          probability: 88,
        },
        {
          steps: [
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Карта побыту семья",
          ],
          timeline: "2-4 месяца",
          cost: "€150-400",
          probability: 85,
        },
        {
          steps: [
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "NFZ",
            "Карта побыту семья",
            "Документы детей школа/садик",
            "Постоянная карта побыту",
          ],
          timeline: "3-12 месяцев",
          cost: "€300-800",
          probability: 82,
        },
      ]);
    case "remote":
      return threeTierSpecs(suitableFor, [
        {
          steps: ["SIM карта", "Аренда жилья", "Мелдунок", "PESEL", "Банк (Wise + ZEN.com)"],
          timeline: "1-2 недели",
          cost: "€0-100",
          probability: 93,
        },
        {
          steps: [
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (Wise + ZEN.com)",
            "Регистрация ИП",
            "NIP",
            "ZUS",
            "Карта побыту",
          ],
          timeline: "1-3 месяца",
          cost: "€100-400",
          probability: 88,
        },
        {
          steps: [
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (Wise + ZEN.com)",
            "Регистрация ИП",
            "NIP",
            "ZUS",
            "VAT",
            "Карта побыту",
            "Постоянная карта побыту",
          ],
          timeline: "2-6 месяцев",
          cost: "€200-700",
          probability: 85,
        },
      ]);
    case "savings":
      return threeTierSpecs(suitableFor, [
        {
          steps: ["SIM карта", "Аренда жилья", "Мелдунок", "PESEL", "Банк (ZEN.com/Wise)", "Частная страховка"],
          timeline: "1-2 недели",
          cost: "€100-300",
          probability: 80,
        },
        {
          steps: [
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Карта побыту (средства)",
          ],
          timeline: "1-3 месяца",
          cost: "€300-700",
          probability: 75,
        },
        {
          steps: [
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Карта побыту (средства)",
            "NFZ (добровольно через ZUS)",
            "Постоянная карта побыту",
          ],
          timeline: "3-12 месяцев",
          cost: "€500-1500",
          probability: 70,
        },
      ]);
    case "other":
      return threeTierSpecs(suitableFor, [
        {
          steps: ["SIM карта", "Аренда жилья", "Мелдунок", "PESEL", "Банк (ZEN.com/Wise)"],
          timeline: "2-4 недели",
          cost: "€50-150",
          probability: 85,
        },
        {
          steps: [
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Карта побыту",
          ],
          timeline: "1-3 месяца",
          cost: "€100-300",
          probability: 80,
        },
        {
          steps: [
            "SIM карта",
            "Аренда жилья",
            "Мелдунок",
            "PESEL",
            "Банк (ZEN.com/Wise)",
            "Частная страховка",
            "Карта побыту",
            "NFZ",
          ],
          timeline: "2-4 месяца",
          cost: "€200-450",
          probability: 75,
        },
      ]);
  }
}

function specsForMoldova(goal: Goal, hasJobOffer: boolean, moldovaScenario: MoldovaScenario | null | undefined): RouteSpec[] {
  switch (moldovaScenario) {
    case "already_status":
      return specsForMoldovaAlreadyStatus();
    case "already_no_status":
      return specsForMoldovaNoStatus();
    case "self":
    default:
      return specsForMoldovaSelf(goal, hasJobOffer);
  }
}

// Group C (EU/EEA/Switzerland) and Group D (visa-waiver third countries) get
// identical routes: no visa, no residence permit for short stays — just
// registration steps plus the goal's own main activity, which is the only
// thing that varies across goals for these groups. Georgia and Moldova (also
// Group D) are the exceptions — see specsForGeorgia()/specsForMoldova() above.
const GOAL_ACTION_WORD: Record<Goal, string> = {
  work: "Работа",
  remote: "Работа",
  business: "Бизнес",
  study: "Учёба",
  family: "Воссоединение с семьёй",
  savings: "Оформление проживания",
  other: "Оформление",
};

const GOAL_SUITABLE_FOR_CD: Record<Goal, string> = {
  work: "Работа в Польше без визовых ограничений",
  remote: "Удалённая работа без визовых ограничений",
  business: "Открытие бизнеса без визовых ограничений",
  study: "Обучение в польском университете без визовых ограничений",
  family: "Воссоединение с семьёй без визовых ограничений",
  savings: "Переезд на собственные средства без визовых ограничений",
  other: "Другие цели пребывания без визовых ограничений",
};

function specsForGroupCD(
  goal: Goal,
  hasJobOffer: boolean,
  citizenship: string | null | undefined,
  georgiaScenario: GeorgiaScenario | null | undefined,
  moldovaScenario: MoldovaScenario | null | undefined,
): RouteSpec[] {
  if (citizenship === "GE") {
    return specsForGeorgia(goal, hasJobOffer, georgiaScenario);
  }
  if (citizenship === "MD") {
    return specsForMoldova(goal, hasJobOffer, moldovaScenario);
  }
  const action = GOAL_ACTION_WORD[goal];
  return threeTierSpecs(GOAL_SUITABLE_FOR_CD[goal], [
    { steps: ["Мелдунок", "PESEL", "Банк", action], timeline: "1-2 недели", cost: "€0-100", probability: 99 },
    {
      steps: ["Мелдунок", "PESEL", "Банк", action, "NIP", "ZUS", "NFZ"],
      timeline: "2-4 недели",
      cost: "€50-200",
      probability: 98,
    },
    {
      steps: ["Мелдунок", "PESEL", "Банк", action, "NIP", "ZUS", "NFZ", "Карта побыту", "Постоянная карта побыту"],
      timeline: "1-6 месяцев",
      cost: "€100-500",
      probability: 97,
    },
  ]);
}

function specsForGoal(
  goal: Goal,
  citizenshipGroup: CitizenshipGroup | null | undefined,
  hasJobOffer: boolean,
  ukraineScenario: UkraineScenario | null | undefined,
  citizenship: string | null | undefined,
  belarusScenario: BelarusScenario | null | undefined,
  georgiaScenario: GeorgiaScenario | null | undefined,
  moldovaScenario: MoldovaScenario | null | undefined,
  uzbekistanScenario: UzbekistanScenario | null | undefined,
  turkeyScenario: TurkeyScenario | null | undefined,
  kazakhstanScenario: KazakhstanScenario | null | undefined,
): RouteSpec[] {
  return citizenshipGroup === "B"
    ? specsForGroupB(goal, hasJobOffer, citizenship, belarusScenario, uzbekistanScenario, turkeyScenario, kazakhstanScenario)
    : citizenshipGroup === "C" || citizenshipGroup === "D"
      ? specsForGroupCD(goal, hasJobOffer, citizenship, georgiaScenario, moldovaScenario)
      : specsForGroupA(goal, ukraineScenario);
}

// --- Multi-goal merging -----------------------------------------------
// A user can now select more than one goal in onboarding (e.g. "Бизнес" +
// "Удалёнка"). Each goal independently produces its own well-formed 3-tier
// spec set; when 2+ goals are selected, generateRoutes() combines them into
// ONE 3-tier set (still exactly Быстрый/Стандартный/Полный) instead of
// showing a separate set of 3 cards per goal — see tier merge below.

function parseCostRange(cost: string): [number, number] | null {
  const m = cost.match(/€\s*(\d+)\s*-\s*(\d+)/);
  return m ? [Number(m[1]), Number(m[2])] : null;
}

// Costs are additive across goals — registering a business AND enrolling at
// a university genuinely costs more than either alone — and €-amounts have
// no pluralization to worry about, so summing and reformatting is safe.
function mergeCost(costs: string[]): string {
  const parsed = costs.map(parseCostRange);
  if (parsed.every((p): p is [number, number] => p !== null)) {
    const min = parsed.reduce((sum, [lo]) => sum + lo, 0);
    const max = parsed.reduce((sum, [, hi]) => sum + hi, 0);
    return `€${min}-${max}`;
  }
  return Array.from(new Set(costs)).join(" + ");
}

function timelineToDays(timeline: string): number | null {
  const m = timeline.match(/(\d+)\s*-\s*(\d+)\s*(недел|месяц)/i);
  if (!m) return null;
  return m[3].toLowerCase().startsWith("недел") ? Number(m[2]) * 7 : Number(m[2]) * 30;
}

// Unlike cost, timelines aren't summed — several goals' paperwork can often
// run in parallel, so the combined route is bounded below by whichever
// individual goal takes longest. Picking that goal's own (already correctly
// pluralized) string instead of reformatting a new number avoids having to
// reconstruct Russian недель/месяц/месяцев plural forms ourselves.
function mergeTimeline(timelines: string[]): string {
  let best = timelines[0];
  let bestDays = timelineToDays(best) ?? -1;
  for (const t of timelines.slice(1)) {
    const days = timelineToDays(t) ?? -1;
    if (days > bestDays) {
      best = t;
      bestDays = days;
    }
  }
  return best;
}

function mergeSteps(stepLists: string[][]): string[] {
  const seen = new Set<string>();
  const merged: string[] = [];
  for (const steps of stepLists) {
    for (const step of steps) {
      if (!seen.has(step)) {
        seen.add(step);
        merged.push(step);
      }
    }
  }
  return merged;
}

// Combined, more conservative estimate: satisfying two goals at once has
// more that can go wrong than satisfying just one, so the weakest-link
// (lowest) individual probability wins rather than an average.
function mergeTierSpecs(specsPerGoal: RouteSpec[][]): RouteSpec[] {
  // Every goal's spec array is exactly 3 tiers (Быстрый/Стандартный/Полный),
  // always in the same order (see threeTierSpecs()), so tier index lines up
  // across goals — merge index-by-index.
  return specsPerGoal[0].map((_, tierIndex) => {
    const tierAcrossGoals = specsPerGoal.map((goalSpecs) => goalSpecs[tierIndex]);
    return {
      // name/badge/recommended/speed/complexity/description come straight
      // from TIER_META and are identical across goals for the same tier —
      // only the goal-specific fields below actually need merging.
      ...tierAcrossGoals[0],
      suitableFor: Array.from(new Set(tierAcrossGoals.map((t) => t.suitableFor))).join(" + "),
      steps: mergeSteps(tierAcrossGoals.map((t) => t.steps)),
      timeline: mergeTimeline(tierAcrossGoals.map((t) => t.timeline)),
      cost: mergeCost(tierAcrossGoals.map((t) => t.cost)),
      probability: Math.min(...tierAcrossGoals.map((t) => t.probability)),
    };
  });
}

function normalizeGoals(raw: string[] | null | undefined): Goal[] {
  const valid: Goal[] = ["work", "study", "business", "family", "remote", "savings", "other"];
  const filtered = (raw ?? []).filter((g): g is Goal => valid.includes(g as Goal));
  const unique = Array.from(new Set(filtered));
  return unique.length > 0 ? unique : ["work"];
}

export function generateRoutes(input: {
  citizenshipGroup: CitizenshipGroup | null | undefined;
  goals: string[] | null | undefined;
  hasJobOffer: boolean;
  ukraineScenario?: string | null;
  citizenship?: string | null;
  belarusScenario?: string | null;
  georgiaScenario?: string | null;
  moldovaScenario?: string | null;
  uzbekistanScenario?: string | null;
  turkeyScenario?: string | null;
  kazakhstanScenario?: string | null;
}): Route[] {
  const goals = normalizeGoals(input.goals);
  const ukraineScenario: UkraineScenario | null =
    input.ukraineScenario === "protection" || input.ukraineScenario === "self" || input.ukraineScenario === "already"
      ? input.ukraineScenario
      : null;
  const belarusScenario: BelarusScenario | null =
    input.belarusScenario === "self" ||
    input.belarusScenario === "already_status" ||
    input.belarusScenario === "already_no_status"
      ? input.belarusScenario
      : null;
  const georgiaScenario: GeorgiaScenario | null =
    input.georgiaScenario === "self" ||
    input.georgiaScenario === "already_status" ||
    input.georgiaScenario === "already_no_status"
      ? input.georgiaScenario
      : null;
  const moldovaScenario: MoldovaScenario | null =
    input.moldovaScenario === "self" ||
    input.moldovaScenario === "already_status" ||
    input.moldovaScenario === "already_no_status"
      ? input.moldovaScenario
      : null;
  const uzbekistanScenario: UzbekistanScenario | null =
    input.uzbekistanScenario === "self" ||
    input.uzbekistanScenario === "already_status" ||
    input.uzbekistanScenario === "already_no_status"
      ? input.uzbekistanScenario
      : null;
  const turkeyScenario: TurkeyScenario | null =
    input.turkeyScenario === "self" ||
    input.turkeyScenario === "already_status" ||
    input.turkeyScenario === "already_no_status"
      ? input.turkeyScenario
      : null;
  const kazakhstanScenario: KazakhstanScenario | null =
    input.kazakhstanScenario === "self" ||
    input.kazakhstanScenario === "already_status" ||
    input.kazakhstanScenario === "already_no_status"
      ? input.kazakhstanScenario
      : null;

  const specsPerGoal = goals.map((goal) =>
    specsForGoal(
      goal,
      input.citizenshipGroup,
      input.hasJobOffer,
      ukraineScenario,
      input.citizenship,
      belarusScenario,
      georgiaScenario,
      moldovaScenario,
      uzbekistanScenario,
      turkeyScenario,
      kazakhstanScenario,
    ),
  );
  // threeTierSpecs() already guarantees exactly 3 tiers per goal — no
  // slice() needed, and none should ever be dropped here (that was the
  // source of the earlier "only 1 route" bug for citizenship groups C/D).
  const specs = specsPerGoal.length === 1 ? specsPerGoal[0] : mergeTierSpecs(specsPerGoal);

  return specs.map(toRoute);
}
