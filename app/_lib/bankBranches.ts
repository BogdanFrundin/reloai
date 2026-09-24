// Google Maps links for finding a bank's branches in each of the 9 major
// Polish cities the site has real data for (same list as CITIES in
// cities.ts). Rather than hand-maintain one exact street address per bank
// per city (which we only have for a handful of banks — see
// bank-account-opening-research.md — and which goes stale when a branch
// moves), each link is a Google Maps *search* for "<bank name> <city>,
// Poland". That reliably shows every branch pin of that bank across the
// whole city — every district, not just one address — and never goes
// stale. Used in the bank details modal's "branches by city" section.

import { CITIES, type CityName } from "./cities";
import { buildGoogleMapsUrl } from "./mapsLink";

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

/** One Google Maps search link per city for this bank's branches. */
export function getBankCityMapLinks(bankName: string): BankCityMapLink[] {
  return CITIES.map((city) => ({
    city,
    url: buildGoogleMapsUrl([bankName, CITY_QUERY_NAME[city], "Poland"]),
  }));
}
