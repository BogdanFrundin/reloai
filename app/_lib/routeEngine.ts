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

function specsForGroupA(goal: Goal): RouteSpec[] {
  switch (goal) {
    case "work":
      return threeTierSpecs("Работа по найму", [
        { steps: ["PESEL UKR", "Мелдунок", "Банк (Revolut)", "Работа"], timeline: "1-2 недели", cost: "€0-50", probability: 95 },
        {
          steps: ["Временная защита", "PESEL UKR", "Мелдунок", "Банк", "Работа", "NFZ страховка", "Карта побыту"],
          timeline: "1-3 месяца",
          cost: "€100-300",
          probability: 90,
        },
        {
          steps: [
            "Временная защита",
            "PESEL UKR",
            "Мелдунок",
            "Банк",
            "Работа",
            "NFZ",
            "Карта побыту",
            "Нострификация диплома",
            "Постоянная карта побыту",
          ],
          timeline: "3-12 месяцев",
          cost: "€200-600",
          probability: 85,
        },
      ]);
    case "business":
      return threeTierSpecs("Самозанятость и бизнес", [
        { steps: ["PESEL UKR", "Мелдунок", "Банк", "Регистрация ИП", "NIP"], timeline: "2-4 недели", cost: "€50-200", probability: 92 },
        {
          steps: ["PESEL UKR", "Мелдунок", "Банк", "Регистрация ИП", "NIP", "ZUS", "Карта побыту"],
          timeline: "1-3 месяца",
          cost: "€150-400",
          probability: 88,
        },
        {
          steps: ["PESEL UKR", "Мелдунок", "Банк", "Регистрация ООО", "NIP", "REGON", "VAT", "ZUS", "Карта побыту"],
          timeline: "2-4 месяца",
          cost: "€500-1500",
          probability: 82,
        },
      ]);
    case "study":
      return threeTierSpecs("Обучение в польском университете", [
        { steps: ["Зачисление в университет", "PESEL UKR", "Мелдунок", "Банк"], timeline: "2-4 недели", cost: "€50-150", probability: 92 },
        {
          steps: ["Зачисление в университет", "PESEL UKR", "Мелдунок", "Банк", "Студенческая карта побыту"],
          timeline: "1-2 месяца",
          cost: "€100-300",
          probability: 88,
        },
        {
          steps: [
            "Зачисление в университет",
            "PESEL UKR",
            "Мелдунок",
            "Банк",
            "Студенческая карта побыту",
            "NFZ",
            "Нострификация диплома",
            "ISIC карта",
          ],
          timeline: "2-4 месяца",
          cost: "€200-500",
          probability: 85,
        },
      ]);
    case "family":
      return threeTierSpecs("Воссоединение с семьёй", [
        { steps: ["PESEL UKR", "Мелдунок", "Банк", "Карта побыту семья"], timeline: "1-3 месяца", cost: "€50-200", probability: 88 },
        {
          steps: ["PESEL UKR", "Мелдунок", "Банк", "Частная страховка", "Карта побыту семья", "NFZ"],
          timeline: "2-4 месяца",
          cost: "€150-400",
          probability: 85,
        },
        {
          steps: ["PESEL UKR", "Мелдунок", "Банк", "Частная страховка", "Карта побыту семья", "NFZ", "Постоянная карта побыту"],
          timeline: "3-12 месяцев",
          cost: "€300-800",
          probability: 82,
        },
      ]);
    case "remote":
      return threeTierSpecs("Удалённая работа из Польши", [
        { steps: ["PESEL UKR", "Мелдунок", "Банк", "Работа удалённо"], timeline: "1-2 недели", cost: "€0-100", probability: 93 },
        {
          steps: ["PESEL UKR", "Мелдунок", "Банк", "Регистрация ИП", "NIP", "ZUS", "Карта побыту"],
          timeline: "1-3 месяца",
          cost: "€100-400",
          probability: 88,
        },
        {
          steps: ["PESEL UKR", "Мелдунок", "Банк", "Регистрация ИП", "NIP", "ZUS", "VAT", "Карта побыту", "Постоянная карта побыту"],
          timeline: "2-6 месяцев",
          cost: "€200-700",
          probability: 85,
        },
      ]);
    case "savings":
      return threeTierSpecs("Переезд на собственные средства", [
        {
          steps: ["PESEL UKR", "Мелдунок", "Банк", "Частная страховка", "Карта побыту средства"],
          timeline: "1-3 месяца",
          cost: "€200-500",
          probability: 80,
        },
        {
          steps: ["PESEL UKR", "Мелдунок", "Банк", "Частная страховка", "Карта побыту средства", "NFZ"],
          timeline: "2-4 месяца",
          cost: "€300-700",
          probability: 75,
        },
        {
          steps: ["PESEL UKR", "Мелдунок", "Банк", "Частная страховка", "Карта побыту средства", "NFZ", "Постоянная карта побыту"],
          timeline: "3-12 месяцев",
          cost: "€500-1500",
          probability: 70,
        },
      ]);
    case "other":
      return threeTierSpecs("Другие цели пребывания", [
        { steps: ["PESEL UKR", "Мелдунок", "Банк"], timeline: "1-2 недели", cost: "€0-50", probability: 90 },
        { steps: ["PESEL UKR", "Мелдунок", "Банк", "Частная страховка"], timeline: "2-4 недели", cost: "€50-150", probability: 85 },
        {
          steps: ["PESEL UKR", "Мелдунок", "Банк", "Частная страховка", "Карта побыту"],
          timeline: "1-3 месяца",
          cost: "€100-400",
          probability: 80,
        },
      ]);
  }
}

function specsForGroupB(goal: Goal, hasJobOffer: boolean): RouteSpec[] {
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

// Group C (EU/EEA/Switzerland) and Group D (visa-waiver third countries) get
// identical routes: no visa, no residence permit for short stays — just
// registration steps plus the goal's own main activity, which is the only
// thing that varies across goals for these groups.
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

function specsForGroupCD(goal: Goal): RouteSpec[] {
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

function normalizeGoal(raw: string | null | undefined): Goal {
  const goals: Goal[] = ["work", "study", "business", "family", "remote", "savings", "other"];
  return goals.includes(raw as Goal) ? (raw as Goal) : "work";
}

export function generateRoutes(input: {
  citizenshipGroup: CitizenshipGroup | null | undefined;
  goal: string | null | undefined;
  hasJobOffer: boolean;
}): Route[] {
  const goal = normalizeGoal(input.goal);

  const specs =
    input.citizenshipGroup === "B"
      ? specsForGroupB(goal, input.hasJobOffer)
      : input.citizenshipGroup === "C" || input.citizenshipGroup === "D"
        ? specsForGroupCD(goal)
        : specsForGroupA(goal);

  // threeTierSpecs() already guarantees exactly 3 — no slice() needed, and
  // none should ever be dropped here (that was the source of the "only 1
  // route" bug for citizenship groups C/D, whose old specs had just 1).
  return specs.map(toRoute);
}
