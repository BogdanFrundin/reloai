// Background photos for district cards on the Housing page.
// Real photos sourced from Wikimedia Commons, stored in /public/districts,
// covering Warsaw plus all 8 other Polish cities the app supports (Kraków,
// Wrocław, Gdańsk, Poznań, Łódź, Lublin, Szczecin, Katowice) — 65 districts
// total across 9 cities.
//
// Sourcing/verification process (September 2026 rebuild): a previous batch
// job wrote 80x53px thumbnails for the 8 non-Warsaw cities by mistake — they
// looked blurry/broken at the actual card size. Every image below was
// re-sourced from Wikimedia Commons and is verified >=600px wide (all are
// 900px wide in practice) before being committed here. Where a candidate
// photo's own title didn't clearly name the district, the depicted subject
// was independently cross-checked (web search, the source page, or the
// Commons category API) against the claimed district before acceptance —
// never assumed from title/thumbnail alone. See the project's
// "district-photos-safeguard" doc for the full process and the mandatory
// pre-commit resolution check, so this class of bug (broken/undersized
// thumbnails silently shipped) cannot recur.
//
// Keyed by the Russian city name used throughout the app (matches the
// `city` column / CitySelect values — see CITY_GENITIVE_RU in
// app/(app)/(dashboard)/housing/page.tsx for the canonical list), since
// district names like "Śródmieście" repeat across multiple Polish cities
// and a flat lookup would collide.
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
    debniki: "/districts/krakow/debniki.jpg",
    mistrzejowice: "/districts/krakow/mistrzejowice.jpg",
    bienczyce: "/districts/krakow/bienczyce.jpg",
    "biezanow-prokocim": "/districts/krakow/biezanow-prokocim.jpg",
    "podgorze-duchackie": "/districts/krakow/podgorze-duchackie.jpg",
    "pradnik-bialy": "/districts/krakow/pradnik-bialy.jpg",
    "nowa-huta": "/districts/krakow/nowa-huta.jpg",
    "wzgorza-krzeslawickie": "/districts/krakow/wzgorza-krzeslawickie.jpg",
    swoszowice: "/districts/krakow/swoszowice.jpg",
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
    baluty: "/districts/lodz/baluty.jpg",
    polesie: "/districts/lodz/polesie.jpg",
  },
  Люблин: {
    srodmiescie: "/districts/lublin/srodmiescie.jpg",
    czechow: "/districts/lublin/czechow.jpg",
    czuby: "/districts/lublin/czuby.jpg",
    weglin: "/districts/lublin/weglin.jpg",
  },
  Щецин: {
    srodmiescie: "/districts/szczecin/srodmiescie.jpg",
    pogodno: "/districts/szczecin/pogodno.jpg",
    warszewo: "/districts/szczecin/warszewo.jpg",
    niebuszewo: "/districts/szczecin/niebuszewo.jpg",
  },
  Катовице: {
    srodmiescie: "/districts/katowice/srodmiescie.jpg",
    koszutka: "/districts/katowice/koszutka.jpg",
    "ligota-panewniki": "/districts/katowice/ligota-panewniki.jpg",
    "brynow-osiedle-zgrzebnioka": "/districts/katowice/brynow-osiedle-zgrzebnioka.jpg",
    "osiedle-tysiaclecia": "/districts/katowice/osiedle-tysiaclecia.jpg",
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
