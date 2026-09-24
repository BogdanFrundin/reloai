// Real photos of each bank's own building/branch, used as the card header
// image on the /banks page. Every bank not in this map keeps the plain
// (no-photo) card layout rather than showing a stock photo that isn't
// really theirs.
//
// Note on "Toyota Bank Polska": the photo used here is a generic Toyota
// dealership sign, not a Toyota Bank Polska branded office — this bank has
// no physical branches at all (online application + courier identity
// verification only). Kept in per explicit user decision (2026-09-24);
// see bank-account-opening-research.md in the project docs if this needs
// revisiting.
//
// Note on "Erste Bank Polska": the photo shows a real ERSTE Sparkasse
// branch, but in Vienna, Austria (visible street sign), not Poland. Kept
// in per explicit user decision (2026-09-24) — see the same doc.
const BANK_IMAGES: Record<string, string> = {
  "mBank": "/banks/mbank.jpg",
  "ING Bank Śląski": "/banks/ing.jpg",
  "PKO Bank Polski": "/banks/pko.jpg",
  "Bank Millennium": "/banks/millennium.jpg",
  "BOŚ Bank": "/banks/bos.jpg",
  "Bank Pocztowy": "/banks/pocztowy.jpg",
  "Bank Pekao S.A.": "/banks/pekao.jpg",
  "Credit Agricole Bank Polska": "/banks/credit-agricole.jpg",
  "Erste Bank Polska": "/banks/erste.jpg",
  "Nest Bank": "/banks/nest.jpg",
  "Plus Bank": "/banks/plus-bank.jpg",
  "Toyota Bank Polska": "/banks/toyota.jpg",
  "Volkswagen Bank Polska": "/banks/volkswagen.jpg",
  "BNP Paribas Bank Polska": "/banks/bnp-paribas.jpg",
  "VeloBank": "/banks/velobank.jpg",
  Revolut: "/banks/revolut.jpg",
  Wise: "/banks/wise.jpg",
  N26: "/banks/n26.jpg",
};

export function getBankImage(name: string): string | null {
  return BANK_IMAGES[name] || null;
}

// Attribution for the CC-BY / CC-BY-SA licensed photos below (public-domain
// ones need no credit but are listed for completeness). Not shown in the UI
// yet — add a small credits line if/when required.
//
// The 9 photos added 2026-09-24 (pekao, credit-agricole, erste, nest,
// plus-bank, toyota, volkswagen, bnp-paribas, velobank), plus revolut,
// wise and n26 added the same day, were supplied directly by the site
// owner — source/license unconfirmed, so no credit line is listed for
// them yet. Fill in here if/when the source is known.
export const BANK_IMAGE_CREDITS: Record<string, string> = {
  "/banks/mbank.jpg": "Luks089, public domain, via Wikimedia Commons",
  "/banks/ing.jpg": "Joa~commonswiki, public domain, via Wikimedia Commons",
  "/banks/pko.jpg": "Jan Mencwel, CC BY-SA 4.0, via Wikimedia Commons",
  "/banks/millennium.jpg": "Mm1970, CC BY 3.0, via Wikimedia Commons",
  "/banks/bos.jpg": "Wistula, CC BY-SA 4.0, via Wikimedia Commons",
  "/banks/pocztowy.jpg": "Przemysław Jahr, public domain, via Wikimedia Commons",
};
