// Background photos for district cards on the Housing page.
// Currently covers Warsaw's 18 districts (real photos sourced from Wikimedia
// Commons, stored in /public/districts). Other cities fall back to no photo
// until images are sourced for them too.
const WARSAW_DISTRICT_IMAGES: Record<string, string> = {
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
};

/** "Praga-Północ" / "żoliborz" / "Bialoleka" -> "praga-polnoc" / "zoliborz" / "bialoleka" */
function slugifyDistrictName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Returns the banner photo path for a district name, or undefined if none exists yet. */
export function getDistrictImage(districtName: string): string | undefined {
  return WARSAW_DISTRICT_IMAGES[slugifyDistrictName(districtName)];
}
