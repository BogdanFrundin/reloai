// Background photos for district cards on the Housing page.
// Currently covers Warsaw's 18 districts (real photos sourced from Wikimedia
// Commons, stored in /public/districts). Other cities fall back to no photo
// until images are sourced for them too. Keyed by the Russian city name used
// throughout the app (matches the `city` column / CitySelect values), since
// district names like "Śródmieście" repeat across multiple Polish cities and
// a flat lookup would collide.
const CITY_DISTRICT_IMAGES: Record<string, Record<string, string>> = {
  Варшава: {
    mokotow: "/districts/mokotow.jpg",
    wola: "/districts/wola.jpg",
    zoliborz: "/districts/zoliborz.jpg",
    ochota: "/districts/ochota.jpg",
    srodmiescie: "/districts/srodmiescie.jpg",
    ursynow: "/districts/ursynow.jpg",
    "praga-polnoc": "/districts/praga-polnoc.jpg",
    "praga-poludnie": "/districts/praga-poludnie.jpg",
    bemowo: "/districts/bemowo.jpg",
    bielany: "/districts/bielany.jpg",
    targowek: "/districts/targowek.jpg",
    bialoleka: "/districts/bialoleka.jpg",
    wilanow: "/districts/wilanow.jpg",
    wlochy: "/districts/wlochy.jpg",
    rembertow: "/districts/rembertow.jpg",
    wawer: "/districts/wawer.jpg",
    wesola: "/districts/wesola.jpg",
    ursus: "/districts/ursus.jpg",
  },
};

// Polish letters that don't decompose via NFD (most notably "ł") need an
// explicit mapping, or slugification silently fails for names containing them
// (e.g. "Praga-Południe", "Wesoła", "Włochy", "Białołęka").
const POLISH_CHAR_MAP: Record<string, string> = {
  ą: "a",
  ć: "c",
  ę: "e",
  ł: "l",
  ń: "n",
  ó: "o",
  ś: "s",
  ź: "z",
  ż: "z",
};

/** "Praga-Północ" / "żoliborz" / "Bialoleka" -> "praga-polnoc" / "zoliborz" / "bialoleka" */
function slugifyDistrictName(name: string): string {
  return name
    .toLowerCase()
    .split("")
    .map((ch) => POLISH_CHAR_MAP[ch] ?? ch)
    .join("")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Returns the banner photo path for a district name in a given city, or undefined if none exists yet. */
export function getDistrictImage(city: string, districtName: string): string | undefined {
  const cityMap = CITY_DISTRICT_IMAGES[city];
  if (!cityMap) return undefined;
  return cityMap[slugifyDistrictName(districtName)];
}
