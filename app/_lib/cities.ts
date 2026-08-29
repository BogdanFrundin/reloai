// Cities with real data loaded into Supabase (public.clinics, public.education,
// public.housing_districts). Values must match the `city` column exactly.
// Варшава: данные загружены для clinics и education, но не для housing_districts —
// выбор Варшавы на /housing может давать пустой результат, пока эти данные не добавлены.
export const CITIES = [
  "Варшава",
  "Краков",
  "Вроцлав",
  "Гданьск",
  "Познань",
  "Лодзь",
  "Люблин",
  "Катовице",
  "Щецин",
] as const;

export type CityName = (typeof CITIES)[number];

export const DEFAULT_CITY: CityName = "Краков";

export function isCityName(value: string | null | undefined): value is CityName {
  return !!value && (CITIES as readonly string[]).includes(value);
}

// Display names per UI language. The canonical value stored everywhere (DB
// columns, query filters, the CITIES array above) stays the Russian name —
// this is purely for what's shown on screen, same pattern as getCountryName
// in countries.ts and getCurrencyName in currency.ts.
const CITY_NAMES: Record<string, Record<CityName, string>> = {
  ru: {
    "Варшава": "Варшава", "Краков": "Краков", "Вроцлав": "Вроцлав", "Гданьск": "Гданьск",
    "Познань": "Познань", "Лодзь": "Лодзь", "Люблин": "Люблин", "Катовице": "Катовице", "Щецин": "Щецин",
  },
  en: {
    "Варшава": "Warsaw", "Краков": "Krakow", "Вроцлав": "Wroclaw", "Гданьск": "Gdansk",
    "Познань": "Poznan", "Лодзь": "Lodz", "Люблин": "Lublin", "Катовице": "Katowice", "Щецин": "Szczecin",
  },
  uz: {
    "Варшава": "Varshava", "Краков": "Krakov", "Вроцлав": "Vrotslav", "Гданьск": "Gdansk",
    "Познань": "Poznan", "Лодзь": "Lodz", "Люблин": "Lyublin", "Катовице": "Katovitse", "Щецин": "Shchetsin",
  },
  tr: {
    "Варшава": "Varşova", "Краков": "Krakov", "Вроцлав": "Wrocław", "Гданьск": "Gdańsk",
    "Познань": "Poznań", "Лодзь": "Łódź", "Люблин": "Lublin", "Катовице": "Katowice", "Щецин": "Szczecin",
  },
  tg: {
    "Варшава": "Варшава", "Краков": "Краков", "Вроцлав": "Вроцлав", "Гданьск": "Гданьск",
    "Познань": "Познань", "Лодзь": "Лодзь", "Люблин": "Люблин", "Катовице": "Катовице", "Щецин": "Щецин",
  },
  uk: {
    "Варшава": "Варшава", "Краков": "Краків", "Вроцлав": "Вроцлав", "Гданьск": "Гданськ",
    "Познань": "Познань", "Лодзь": "Лодзь", "Люблин": "Люблін", "Катовице": "Катовіце", "Щецин": "Щецин",
  },
};

export function getCityName(city: CityName, lang: string): string {
  const table = CITY_NAMES[lang] ?? CITY_NAMES.en;
  return table[city] ?? city;
}
