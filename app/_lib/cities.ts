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
