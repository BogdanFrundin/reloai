// Cities with real data loaded into Supabase (public.clinics, public.education,
// public.housing_districts). Values must match the `city` column exactly.
export const CITIES = [
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
