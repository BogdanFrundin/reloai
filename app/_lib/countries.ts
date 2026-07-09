// ISO 3166-1 alpha-2 codes for all sovereign states (plus a handful of common territories).
// Display names are resolved at runtime via Intl.DisplayNames so we don't need to hand-translate
// ~195 country names into every supported language.
export const COUNTRY_CODES: string[] = [
  "AF", "AL", "DZ", "AD", "AO", "AG", "AR", "AM", "AU", "AT",
  "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BT",
  "BO", "BA", "BW", "BR", "BN", "BG", "BF", "BI", "CV", "KH",
  "CM", "CA", "CF", "TD", "CL", "CN", "CO", "KM", "CG", "CD",
  "CR", "CI", "HR", "CU", "CY", "CZ", "DK", "DJ", "DM", "DO",
  "EC", "EG", "SV", "GQ", "ER", "EE", "SZ", "ET", "FJ", "FI",
  "FR", "GA", "GM", "GE", "DE", "GH", "GR", "GD", "GT", "GN",
  "GW", "GY", "HT", "HN", "HU", "IS", "IN", "ID", "IR", "IQ",
  "IE", "IL", "IT", "JM", "JP", "JO", "KZ", "KE", "KI", "KP",
  "KR", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI",
  "LT", "LU", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MR",
  "MU", "MX", "FM", "MD", "MC", "MN", "ME", "MA", "MZ", "MM",
  "NA", "NR", "NP", "NL", "NZ", "NI", "NE", "NG", "MK", "NO",
  "OM", "PK", "PW", "PA", "PG", "PY", "PE", "PH", "PL", "PT",
  "QA", "RO", "RU", "RW", "KN", "LC", "VC", "WS", "SM", "ST",
  "SA", "SN", "RS", "SC", "SL", "SG", "SK", "SI", "SB", "SO",
  "ZA", "SS", "ES", "LK", "SD", "SR", "SE", "CH", "SY", "TW",
  "TJ", "TZ", "TH", "TL", "TG", "TO", "TT", "TN", "TR", "TM",
  "TV", "UG", "UA", "AE", "GB", "US", "UY", "UZ", "VU", "VA",
  "VE", "VN", "YE", "ZM", "ZW",
  "HK", "MO", "PS", "XK",
];

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
  return COUNTRY_CODES.map((code) => ({ code, name: getCountryName(code, lang), flag: getFlagEmoji(code) })).sort(
    (a, b) => a.name.localeCompare(b.name, lang),
  );
}
