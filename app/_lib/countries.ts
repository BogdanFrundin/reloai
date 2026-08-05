// ISO 3166-1 alpha-2 codes for all sovereign states (plus a handful of common territories).
// Display names are resolved at runtime via Intl.DisplayNames so we don't need to hand-translate
// ~195 country names into every supported language.
export const COUNTRY_CODES: string[] = [
  "UA", "MD", "GE", "AM",
  "BY", "RU", "UZ", "TJ", "KZ", "KG", "TM", "AZ", "TR",
  "DE", "FR", "IT", "ES", "NL", "BE", "AT", "SE", "DK", "FI", "CZ", "SK", "HU", "RO", "BG", "HR", "GR", "PT", "LT", "LV", "EE",
  "US", "CA", "AU", "JP", "IL", "KR", "NO", "CH", "GB",
];

export const COUNTRY_GROUP: Record<string, "A" | "B" | "V" | "G"> = {
  UA: "A", MD: "A", GE: "A", AM: "A",
  BY: "B", RU: "B", UZ: "B", TJ: "B", KZ: "B", KG: "B", TM: "B", AZ: "B", TR: "B",
  DE: "V", FR: "V", IT: "V", ES: "V", NL: "V", BE: "V", AT: "V", SE: "V", DK: "V", FI: "V", CZ: "V", SK: "V", HU: "V", RO: "V", BG: "V", HR: "V", GR: "V", PT: "V", LT: "V", LV: "V", EE: "V",
  US: "G", CA: "G", AU: "G", JP: "G", IL: "G", KR: "G", NO: "G", CH: "G", GB: "G",
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

const nameCache = new Map<string, Map<string, string>>();

export function getCountryName(code: string, lang: string): string {
  let langCache = nameCache.get(lang);
  if (!langCache) {
    langCache = new Map();
    nameCache.set(lang, langCache);
  }
  const cached = langCache.get(code);
  if (cached) return cached;

  let name = code;
  try {
    const displayNames = new Intl.DisplayNames([lang, "en"], { type: "region" });
    name = displayNames.of(code) ?? code;
  } catch {
    name = code;
  }
  langCache.set(code, name);
  return name;
}

export function getCountryList(lang: string): { code: string; name: string; flag: string }[] {
  return COUNTRY_CODES.map((code) => ({ code, name: getCountryName(code, lang), flag: code.toLowerCase() })).sort(
    (a, b) => a.name.localeCompare(b.name, lang),
  );
}
