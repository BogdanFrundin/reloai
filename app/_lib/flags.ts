// Convert ISO country or language code to flagcdn URL
export function getFlagUrl(code: string, size: "sm" | "md" | "lg" = "md"): string {
  const sizes: Record<string, string> = {
    sm: "24x18",
    md: "32x24",
    lg: "48x36",
  };

  const normalizedCode = code.toLowerCase();
  return `https://flagcdn.com/${sizes[size]}/${normalizedCode}.png`;
}

// Common language to country code mappings for flags
export const LANG_TO_COUNTRY: Record<string, string> = {
  en: "gb", // English -> Great Britain
  ru: "ru", // Russian
  uz: "uz", // Uzbek
  tr: "tr", // Turkish
  tg: "tj", // Tajik
};

// Get flag URL for a language code
export function getLanguageFlagUrl(langCode: string, size: "sm" | "md" | "lg" = "md"): string {
  const countryCode = LANG_TO_COUNTRY[langCode.toLowerCase()] || langCode.toLowerCase();
  return getFlagUrl(countryCode, size);
}

// Convert a two-letter ISO country code to its flag emoji (e.g. "ru" -> 🇷🇺)
export function getFlagEmoji(countryCode: string): string {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}
