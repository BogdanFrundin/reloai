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
  Катовице: {
    srodmiescie: "/districts/katowice/srodmiescie.jpg",
    "ligota-panewniki": "/districts/katowice/ligota-panewniki.jpg",
    koszutka: "/districts/katowice/koszutka.jpg",
    "brynow-osiedle-zgrzebnioka": "/districts/katowice/brynow-osiedle-zgrzebnioka.jpg",
    "osiedle-tysiaclecia-witosa": "/districts/katowice/osiedle-tysiaclecia.jpg",
  },
  Вроцлав: {
    "stare-miasto": "/districts/wroclaw/stare-miasto.jpg",
    srodmiescie: "/districts/wroclaw/srodmiescie.jpg",
    krzyki: "/districts/wroclaw/krzyki.jpg",
    fabryczna: "/districts/wroclaw/fabryczna.jpg",
  },
  Гданьск: {
    wrzeszcz: "/districts/gdansk/wrzeszcz.jpg",
    oliwa: "/districts/gdansk/oliwa.jpg",
    przymorze: "/districts/gdansk/przymorze.jpg",
    "piecki-migowo-morena": "/districts/gdansk/piecki-migowo-morena.jpg",
  },
  Познань: {
    jezyce: "/districts/poznan/jezyce.jpg",
    grunwald: "/districts/poznan/grunwald.jpg",
    wilda: "/districts/poznan/wilda.jpg",
    "rataje-czesc-nowe-miasto": "/districts/poznan/rataje-czesc-nowe-miasto.jpg",
  },
  Лодзь: {
    srodmiescie: "/districts/lodz/srodmiescie.jpg",
    widzew: "/districts/lodz/widzew.jpg",
    polesie: "/districts/lodz/polesie.jpg",
    baluty: "/districts/lodz/baluty.jpg",
  },
  Люблин: {
    srodmiescie: "/districts/lublin/srodmiescie.jpg",
    czechow: "/districts/lublin/czechow.jpg",
    weglin: "/districts/lublin/weglin.jpg",
    czuby: "/districts/lublin/czuby.jpg",
  },
  Щецин: {
    srodmiescie: "/districts/szczecin/srodmiescie.jpg",
    pogodno: "/districts/szczecin/pogodno.jpg",
    warszewo: "/districts/szczecin/warszewo.jpg",
    niebuszewo: "/districts/szczecin/niebuszewo.jpg",
  },
  Краков: {
    "stare-miasto": "/districts/krakow/stare-miasto.jpg",
    grzegorzki: "/districts/krakow/grzegorzki.jpg",
    zwierzyniec: "/districts/krakow/zwierzyniec.jpg",
    krowodrza: "/districts/krakow/krowodrza.jpg",
    podgorze: "/districts/krakow/podgorze.jpg",
    bronowice: "/districts/krakow/bronowice.jpg",
    "pradnik-czerwony": "/districts/krakow/pradnik-czerwony.jpg",
    "lagiewniki-borek-falecki": "/districts/krakow/lagiewniki-borek-falecki.jpg",
    czyzyny: "/districts/krakow/czyzyny.jpg",
    "podgorze-duchackie": "/districts/krakow/podgorze-duchackie.jpg",
    "pradnik-bialy": "/districts/krakow/pradnik-bialy.jpg",
    debniki: "/districts/krakow/debniki.jpg",
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
