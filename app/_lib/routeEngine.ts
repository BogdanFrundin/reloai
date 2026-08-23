// Deterministic, rule-based relocation route generator. Replaces the old
// AI/static-fallback route engine (app/api/route/route.ts) with routes built
// directly from the user's own profile: citizenship_group (A/B/C/D), goal,
// and — for Group B jobseekers — whether they already have a job offer.
// See the product spec this was built from for the exact per-group rules.
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
  };
}

function specsForGroupA(goal: Goal): RouteSpec[] {
  switch (goal) {
    case "work":
      return [
        {
          name: "Быстрый маршрут",
          recommended: true,
          description: "Самый быстрый путь для граждан безвизовых стран",
          steps: ["Временная защита", "PESEL UKR", "Мелдунок", "Банковский счёт", "Поиск работы / Выход на работу"],
          suitableFor: "Работа по найму без визы",
          speed: "Высокая",
          complexity: "Низкая",
          probability: 95,
          timeline: "1-4 недели",
          cost: "€0-100",
        },
        {
          name: "Стандартный маршрут",
          recommended: false,
          description: "Полный путь легализации с картой побыту",
          steps: ["PESEL UKR", "Мелдунок", "Банковский счёт", "Работа", "NFZ страховка", "Карта побыту (работа)"],
          suitableFor: "Долгосрочное проживание и работа",
          speed: "Средняя",
          complexity: "Средняя",
          probability: 85,
          timeline: "1-3 месяца",
          cost: "€100-300",
        },
      ];
    case "business":
      return [
        {
          name: "Маршрут ИП (JDG)",
          recommended: true,
          description: "Путь для самозанятых и фрилансеров, регистрирующих собственное ИП в Польше.",
          steps: ["PESEL UKR", "Мелдунок", "Банковский счёт", "Регистрация ИП", "NIP", "ZUS", "Карта побыту (бизнес)"],
          suitableFor: "Самозанятость и фриланс",
          speed: "Средняя",
          complexity: "Средняя",
          probability: 90,
          timeline: "1-3 месяца",
          cost: "€100-400",
        },
        {
          name: "Маршрут ООО (Sp. z o.o.)",
          recommended: false,
          description: "Путь для тех, кто открывает компанию с партнёрами и планирует расти за рамки самозанятости.",
          steps: ["PESEL UKR", "Мелдунок", "Банковский счёт", "Регистрация ООО", "NIP", "REGON", "VAT", "Карта побыту (бизнес)"],
          suitableFor: "Открытие компании с партнёрами",
          speed: "Средняя",
          complexity: "Высокая",
          probability: 80,
          timeline: "2-4 месяца",
          cost: "€500-1500",
        },
      ];
    case "study":
      return [
        {
          name: "Студенческий маршрут",
          recommended: true,
          description: "Путь для поступления и легализации в статусе студента польского университета.",
          steps: ["Зачисление в университет", "PESEL UKR", "Мелдунок", "Банковский счёт", "Студенческая карта побыту"],
          suitableFor: "Обучение в польском университете",
          speed: "Средняя",
          complexity: "Низкая",
          probability: 90,
          timeline: "1-2 месяца",
          cost: "€50-200",
        },
      ];
    case "family":
      return [
        {
          name: "Семейный маршрут",
          recommended: true,
          description: "Путь для воссоединения с семьёй, уже проживающей в Польше.",
          steps: ["PESEL UKR", "Мелдунок", "Банковский счёт", "Карта побыту (семья)"],
          suitableFor: "Воссоединение с семьёй в Польше",
          speed: "Средняя",
          complexity: "Средняя",
          probability: 85,
          timeline: "1-4 месяца",
          cost: "€100-400",
        },
      ];
    case "remote":
      return [
        {
          name: "Маршрут удалёнщика",
          recommended: true,
          description: "Путь для тех, кто работает удалённо на зарубежного работодателя или как фрилансер.",
          steps: ["PESEL UKR", "Мелдунок", "Банковский счёт", "Регистрация ИП (опционально)", "Карта побыту"],
          suitableFor: "Фриланс и удалённая работа",
          speed: "Средняя",
          complexity: "Низкая",
          probability: 88,
          timeline: "1-3 месяца",
          cost: "€100-400",
        },
      ];
    case "savings":
      return [
        {
          name: "Маршрут на средства",
          recommended: true,
          description: "Путь для переезда без работы и учёбы, на основании подтверждённых собственных средств.",
          steps: ["PESEL UKR", "Мелдунок", "Банковский счёт", "Частная страховка", "Карта побыту (средства)"],
          suitableFor: "Переезд на собственные сбережения",
          speed: "Средняя",
          complexity: "Средняя",
          probability: 75,
          timeline: "2-4 месяца",
          cost: "€300-800",
        },
      ];
    case "other":
      return [
        {
          name: "Базовый маршрут",
          recommended: true,
          description: "Базовая легализация для целей, не связанных напрямую с работой, учёбой или бизнесом.",
          steps: ["PESEL UKR", "Мелдунок", "Банковский счёт"],
          suitableFor: "Другие цели пребывания",
          speed: "Высокая",
          complexity: "Низкая",
          probability: 85,
          timeline: "2-6 недель",
          cost: "€0-150",
        },
      ];
  }
}

function specsForGroupB(goal: Goal, hasJobOffer: boolean): RouteSpec[] {
  switch (goal) {
    case "work":
      return hasJobOffer
        ? [
            {
              name: "Быстрый маршрут",
              recommended: true,
              description: "Путь для тех, у кого уже есть предложение о работе от польского работодателя.",
              steps: ["Виза D (рабочая)", "Страховка путешественника", "Мелдунок", "PESEL", "Банковский счёт", "Разрешение на работу тип A", "Карта побыту (работа)"],
              suitableFor: "Работа по найму с оффером",
              speed: "Высокая",
              complexity: "Средняя",
              probability: 90,
              timeline: "3-5 месяцев",
              cost: "€200-500",
            },
            {
              name: "Стандартный маршрут",
              recommended: false,
              description: "Полный путь легализации для долгосрочного проживания и работы в Польше.",
              steps: ["Виза D (рабочая)", "Страховка", "Мелдунок", "PESEL", "Банковский счёт", "Разрешение на работу", "NFZ страховка", "Карта побыту (работа)"],
              suitableFor: "Долгосрочное проживание и работа",
              speed: "Средняя",
              complexity: "Средняя",
              probability: 80,
              timeline: "4-6 месяцев",
              cost: "€400-800",
            },
          ]
        : [
            {
              name: "Стандартный маршрут",
              recommended: true,
              description: "Путь для тех, кто переезжает в Польшу для поиска работы без готового оффера.",
              steps: ["Виза D (рабочая)", "Страховка", "Мелдунок", "PESEL", "Банковский счёт", "Поиск работы", "Разрешение на работу", "Карта побыту (работа)"],
              suitableFor: "Поиск работы в Польше",
              speed: "Средняя",
              complexity: "Средняя",
              probability: 70,
              timeline: "4-7 месяцев",
              cost: "€400-900",
            },
            {
              name: "Расширенный маршрут",
              recommended: false,
              description: "Путь для тех, кто планирует выучить польский язык параллельно с поиском работы.",
              steps: ["Виза D", "Страховка", "PESEL", "Мелдунок", "Банк", "Курсы польского языка", "Поиск работы", "Разрешение на работу", "Карта побыту"],
              suitableFor: "Переезд с изучением языка",
              speed: "Низкая",
              complexity: "Высокая",
              probability: 65,
              timeline: "6-10 месяцев",
              cost: "€600-1500",
            },
          ];
    case "business":
      return [
        {
          name: "Маршрут ИП (JDG)",
          recommended: true,
          description: "Путь для самозанятых и фрилансеров, регистрирующих собственное ИП в Польше.",
          steps: ["Виза D (бизнес)", "Страховка", "PESEL", "Мелдунок", "Банковский счёт", "Регистрация ИП", "NIP", "ZUS", "Карта побыту (бизнес)"],
          suitableFor: "Самозанятость и фриланс",
          speed: "Средняя",
          complexity: "Средняя",
          probability: 85,
          timeline: "3-5 месяцев",
          cost: "€300-700",
        },
        {
          name: "Маршрут ООО (Sp. z o.o.)",
          recommended: false,
          description: "Путь для открытия полноценной компании в Польше.",
          steps: ["Виза D (бизнес)", "Страховка", "PESEL", "Мелдунок", "Банк", "Регистрация ООО", "NIP", "REGON", "VAT", "Карта побыту (бизнес)"],
          suitableFor: "Открытие компании",
          speed: "Средняя",
          complexity: "Высокая",
          probability: 75,
          timeline: "4-7 месяцев",
          cost: "€800-2500",
        },
      ];
    case "study":
      return [
        {
          name: "Студенческий маршрут",
          recommended: true,
          description: "Путь для поступления и легализации в статусе студента польского университета.",
          steps: ["Зачисление в университет", "Виза D (студенческая)", "Страховка", "PESEL", "Мелдунок", "Банковский счёт", "Студенческая карта побыту"],
          suitableFor: "Обучение в польском университете",
          speed: "Средняя",
          complexity: "Средняя",
          probability: 85,
          timeline: "2-4 месяца",
          cost: "€200-500",
        },
      ];
    case "family":
      return [
        {
          name: "Семейный маршрут",
          recommended: true,
          description: "Путь для воссоединения с семьёй, уже проживающей в Польше.",
          steps: ["Виза D (семья)", "Страховка", "PESEL", "Мелдунок", "Банковский счёт", "Карта побыту (семья)"],
          suitableFor: "Воссоединение с семьёй",
          speed: "Средняя",
          complexity: "Средняя",
          probability: 80,
          timeline: "3-6 месяцев",
          cost: "€300-700",
        },
      ];
    case "remote":
      return [
        {
          name: "Маршрут без ИП",
          recommended: true,
          description: "Путь для тех, кто продолжает работать на иностранного работодателя удалённо.",
          steps: ["Виза D", "Страховка", "PESEL", "Мелдунок", "Банковский счёт", "Карта побыту"],
          suitableFor: "Удалённая работа на иностранного работодателя",
          speed: "Средняя",
          complexity: "Низкая",
          probability: 82,
          timeline: "3-5 месяцев",
          cost: "€200-500",
        },
        {
          name: "Маршрут с ИП",
          recommended: false,
          description: "Путь для фрилансеров, которые хотят официально зарегистрировать деятельность в Польше.",
          steps: ["Виза D", "Страховка", "PESEL", "Мелдунок", "Банк", "Регистрация ИП", "NIP", "ZUS", "Карта побыту"],
          suitableFor: "Фриланс с официальной регистрацией",
          speed: "Средняя",
          complexity: "Средняя",
          probability: 80,
          timeline: "4-6 месяцев",
          cost: "€400-800",
        },
      ];
    case "savings":
      return [
        {
          name: "Маршрут на средства",
          recommended: true,
          description: "Путь для переезда без работы и учёбы, на основании подтверждённых собственных средств.",
          steps: ["Виза D", "Страховка", "PESEL", "Мелдунок", "Банковский счёт", "Частная страховка", "Карта побыту (средства)"],
          suitableFor: "Переезд на собственные сбережения",
          speed: "Средняя",
          complexity: "Средняя",
          probability: 70,
          timeline: "3-6 месяцев",
          cost: "€500-1200",
        },
      ];
    case "other":
      return [
        {
          name: "Базовый маршрут",
          recommended: true,
          description: "Базовая легализация через визу D для целей, не связанных напрямую с работой, учёбой или бизнесом.",
          steps: ["Виза D", "Страховка", "PESEL", "Мелдунок", "Банковский счёт"],
          suitableFor: "Другие цели пребывания",
          speed: "Средняя",
          complexity: "Средняя",
          probability: 70,
          timeline: "3-5 месяцев",
          cost: "€200-500",
        },
      ];
  }
}

// Group C (EU/EEA/Switzerland) and Group D (visa-waiver third countries) get
// identical routes: no visa, no residence permit — just registration steps
// plus whatever the goal itself requires. Only work/business are defined by
// the product spec; the rest are extrapolated using the same no-visa pattern.
function specsForGroupCD(goal: Goal): RouteSpec[] {
  switch (goal) {
    case "work":
      return [
        {
          name: "Быстрый маршрут",
          recommended: true,
          description: "Самый быстрый путь для граждан ЕС и других безвизовых стран с широкими правами проживания.",
          steps: ["Мелдунок", "PESEL", "Банковский счёт", "Выход на работу", "NIP", "ZUS"],
          suitableFor: "Работа в Польше без визы",
          speed: "Высокая",
          complexity: "Низкая",
          probability: 98,
          timeline: "1-2 недели",
          cost: "€0-50",
        },
      ];
    case "business":
      return [
        {
          name: "Маршрут ИП",
          recommended: true,
          description: "Быстрая регистрация самозанятости или бизнеса без визовых ограничений.",
          steps: ["Мелдунок", "PESEL", "Банковский счёт", "Регистрация ИП", "NIP", "ZUS"],
          suitableFor: "Открытие бизнеса гражданами ЕС",
          speed: "Высокая",
          complexity: "Низкая",
          probability: 98,
          timeline: "2-4 недели",
          cost: "€50-200",
        },
      ];
    case "study":
      return [
        {
          name: "Студенческий маршрут",
          recommended: true,
          description: "Быстрое оформление для обучения в польском университете без визовых ограничений.",
          steps: ["Мелдунок", "PESEL", "Банковский счёт", "Зачисление в университет"],
          suitableFor: "Обучение в польском университете",
          speed: "Высокая",
          complexity: "Низкая",
          probability: 95,
          timeline: "1-2 недели",
          cost: "€0-100",
        },
      ];
    case "family":
      return [
        {
          name: "Семейный маршрут",
          recommended: true,
          description: "Быстрое оформление для переезда к семье без визовых ограничений.",
          steps: ["Мелдунок", "PESEL", "Банковский счёт", "Воссоединение с семьёй"],
          suitableFor: "Воссоединение с семьёй в Польше",
          speed: "Высокая",
          complexity: "Низкая",
          probability: 96,
          timeline: "1-2 недели",
          cost: "€0-100",
        },
      ];
    case "remote":
      return [
        {
          name: "Маршрут удалёнщика",
          recommended: true,
          description: "Быстрое оформление для тех, кто продолжает удалённую работу, проживая в Польше.",
          steps: ["Мелдунок", "PESEL", "Банковский счёт", "Начало удалённой работы"],
          suitableFor: "Удалённая работа из Польши",
          speed: "Высокая",
          complexity: "Низкая",
          probability: 96,
          timeline: "1-2 недели",
          cost: "€0-100",
        },
      ];
    case "savings":
      return [
        {
          name: "Маршрут на средства",
          recommended: true,
          description: "Быстрое оформление проживания на основании собственных средств без визовых ограничений.",
          steps: ["Мелдунок", "PESEL", "Банковский счёт"],
          suitableFor: "Переезд на собственные сбережения",
          speed: "Высокая",
          complexity: "Низкая",
          probability: 97,
          timeline: "1-2 недели",
          cost: "€0-50",
        },
      ];
    case "other":
      return [
        {
          name: "Базовый маршрут",
          recommended: true,
          description: "Базовое оформление проживания в Польше без визовых ограничений.",
          steps: ["Мелдунок", "PESEL", "Банковский счёт"],
          suitableFor: "Другие цели пребывания",
          speed: "Высокая",
          complexity: "Низкая",
          probability: 95,
          timeline: "1-2 недели",
          cost: "€0-50",
        },
      ];
  }
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

  return specs.slice(0, 3).map(toRoute);
}
