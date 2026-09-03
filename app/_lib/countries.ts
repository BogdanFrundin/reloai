// ISO 3166-1 alpha-2 codes for the countries used across the app.
// Display names are hand-maintained per language below (COUNTRY_NAMES) rather than
// resolved via Intl.DisplayNames: real-world testing showed that browsers (Edge/Chrome
// on Windows in particular) have incomplete ICU data for locales like "uz" and silently
// fall back to the OS display language (e.g. Russian) instead of the requested language
// or even the "en" fallback. Since Intl.DisplayNames can't be trusted across browsers,
// we hardcode names for the small, fixed list of countries this app actually offers.
// Trimmed to the 10 countries the app actually supports (CIS + Turkey) —
// see the country-groups cleanup: the rest of the world (EU/US/etc.) isn't
// part of the onboarding audience even though citizenshipGroups.ts still
// carries route/document logic for them.
export const COUNTRY_CODES: string[] = [
  "UA", "MD", "GE",
  "BY", "RU", "UZ", "TJ", "KZ", "AZ", "TR",
];

export const COUNTRY_GROUP: Record<string, "A" | "B" | "V" | "G"> = {
  UA: "A", MD: "A", GE: "A",
  BY: "B", RU: "B", UZ: "B", TJ: "B", KZ: "B", AZ: "B", TR: "B",
};

export const EU_COUNTRY_CODES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR",
  "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL",
  "PL", "PT", "RO", "SK", "SI", "ES", "SE",
]);

export function isEuCountry(code: string | null | undefined): boolean {
  return !!code && EU_COUNTRY_CODES.has(code);
}

export function getFlagEmoji(code: string): string {
  if (!/^[A-Za-z]{2}$/.test(code)) return "🌍";
  return [...code.toUpperCase()].map((char) => String.fromCodePoint(127397 + char.charCodeAt(0))).join("");
}

// Hand-maintained country names per supported language. Keys must match COUNTRY_CODES.
const COUNTRY_NAMES: Record<string, Record<string, string>> = {
  ru: {
    UA: "Украина", MD: "Молдова", GE: "Грузия",
    BY: "Беларусь", RU: "Россия", UZ: "Узбекистан", TJ: "Таджикистан", KZ: "Казахстан", AZ: "Азербайджан", TR: "Турция",
  },
  en: {
    UA: "Ukraine", MD: "Moldova", GE: "Georgia",
    BY: "Belarus", RU: "Russia", UZ: "Uzbekistan", TJ: "Tajikistan", KZ: "Kazakhstan", AZ: "Azerbaijan", TR: "Turkey",
  },
  uz: {
    UA: "Ukraina", MD: "Moldova", GE: "Gruziya",
    BY: "Belarus", RU: "Rossiya", UZ: "O'zbekiston", TJ: "Tojikiston", KZ: "Qozog'iston", AZ: "Ozarbayjon", TR: "Turkiya",
  },
  tr: {
    UA: "Ukrayna", MD: "Moldova", GE: "Gürcistan",
    BY: "Belarus", RU: "Rusya", UZ: "Özbekistan", TJ: "Tacikistan", KZ: "Kazakistan", AZ: "Azerbaycan", TR: "Türkiye",
  },
  tg: {
    UA: "Украина", MD: "Молдова", GE: "Гурҷистон",
    BY: "Беларус", RU: "Русия", UZ: "Узбекистон", TJ: "Тоҷикистон", KZ: "Қазоқистон", AZ: "Озарбойҷон", TR: "Туркия",
  },
  uk: {
    UA: "Україна", MD: "Молдова", GE: "Грузія",
    BY: "Білорусь", RU: "Росія", UZ: "Узбекистан", TJ: "Таджикистан", KZ: "Казахстан", AZ: "Азербайджан", TR: "Туреччина",
  },
};

export function getCountryName(code: string, lang: string): string {
  const table = COUNTRY_NAMES[lang] ?? COUNTRY_NAMES.en;
  return table[code] ?? COUNTRY_NAMES.en[code] ?? code;
}

export function getCountryList(lang: string): { code: string; name: string; flag: string }[] {
  return COUNTRY_CODES.map((code) => ({ code, name: getCountryName(code, lang), flag: code.toLowerCase() })).sort(
    (a, b) => a.name.localeCompare(b.name, lang),
  );
}
