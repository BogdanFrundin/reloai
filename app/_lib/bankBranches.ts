// Google Maps links for finding a bank's branches in each of the 9 major
// Polish cities the site has real data for (same list as CITIES in
// cities.ts). Rather than hand-maintain one exact street address per bank
// per city (which we only have for a handful of banks — see
// bank-account-opening-research.md — and which goes stale when a branch
// moves), each link is a Google Maps *search* for "<bank name> <city>" —
// that reliably shows every branch pin of that bank across the whole city
// (every district, not just one address) and never goes stale.
//
// Deliberately NOT using the generic buildGoogleMapsUrl() (comma-joined
// "name, city, Poland" through the /maps/search/?api=1&query= endpoint):
// Maps sometimes parses a comma-joined string as a single structured
// address to geocode, and when it isn't one, returns "not found" instead of
// a places search — which is exactly the "ничего не найдено" bug users hit.
// The plain path-based /maps/search/<query> form (no api=1, no commas — the
// same URL shape Maps itself uses when you type a search and hit enter) is
// what reliably returns a places search with every branch pin, not a
// single-address lookup.
import { CITIES, type CityName } from "./cities";

// Polish spelling of each city — used for the search query itself (not for
// display; display uses getCityName(city, lang) from cities.ts) since we're
// searching addresses inside Poland and the Polish form matches best.
const CITY_QUERY_NAME: Record<CityName, string> = {
  "Варшава": "Warszawa",
  "Краков": "Kraków",
  "Вроцлав": "Wrocław",
  "Гданьск": "Gdańsk",
  "Познань": "Poznań",
  "Лодзь": "Łódź",
  "Люблин": "Lublin",
  "Катовице": "Katowice",
  "Щецин": "Szczecin",
};

export interface BankCityMapLink {
  city: CityName;
  url: string;
}

/** One Google Maps places-search link per city for this bank's branches. */
export function getBankCityMapLinks(bankName: string): BankCityMapLink[] {
  return CITIES.map((city) => ({
    city,
    url: `https://www.google.com/maps/search/${encodeURIComponent(`${bankName} ${CITY_QUERY_NAME[city]} Polska`)}`,
  }));
}
