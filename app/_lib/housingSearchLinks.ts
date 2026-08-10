const CITY_SLUGS: Record<string, string> = {
  "Варшава": "warszawa",
  "Краков": "krakow",
  "Вроцлав": "wroclaw",
  "Гданьск": "gdansk",
  "Познань": "poznan",
  "Щецин": "szczecin",
  "Лодзь": "lodz",
  "Люблин": "lublin",
  "Катовице": "katowice",
};

const ROOMS_LABEL: Record<string, string> = {
  studio: "kawalerka",
  "2room": "2 pokoje",
  "3room": "3 pokoje",
};

// Otodom's district-level filtering lives in a location path hierarchy
// (voivodeship/city/city/district) that differs per city and isn't safely
// derivable from the district names we store, so buildOtodomUrl only narrows
// by city — that's expected, not a bug. OLX supports a reliable free-text
// query segment in its URL, so buildOlxUrl narrows by city + district + room count.

export function buildOlxUrl(city: string, district?: string, rooms?: string): string {
  const slug = CITY_SLUGS[city] ?? "polska";
  const queryParts = [district, rooms ? ROOMS_LABEL[rooms] : null].filter(Boolean);
  const query = queryParts.join(" ").trim();
  if (!query) return `https://www.olx.pl/nieruchomosci/mieszkania/wynajem/${slug}/`;
  const qSlug = query
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `https://www.olx.pl/nieruchomosci/mieszkania/wynajem/${slug}/q-${qSlug}/`;
}

export function buildOtodomUrl(city: string): string {
  const slug = CITY_SLUGS[city] ?? "cala-polska";
  return `https://www.otodom.pl/pl/oferty/wynajem/mieszkanie/${slug}`;
}

// Gratka's URL scheme for city/district-level filtering isn't verified, so this
// only links to the general rental listings page — same honesty tradeoff as Otodom.
export function buildGratkaUrl(): string {
  return "https://gratka.pl/nieruchomosci/do-wynajecia";
}
