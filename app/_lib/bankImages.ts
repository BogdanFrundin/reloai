// Real photos of each bank's own building/branch, used as the card header
// image on the /banks page. Sourced from Wikimedia Commons (public-domain or
// CC-BY / CC-BY-SA, see credits below) — only banks with an actual,
// identifiable photo are listed here. Every bank not in this map keeps the
// plain (no-photo) card layout rather than showing a stock photo that isn't
// really theirs.
const BANK_IMAGES: Record<string, string> = {
  "mBank": "/banks/mbank.jpg",
  "ING Bank Śląski": "/banks/ing.jpg",
  "PKO Bank Polski": "/banks/pko.jpg",
  "Bank Millennium": "/banks/millennium.jpg",
  "BOŚ Bank": "/banks/bos.jpg",
  "Bank Pocztowy": "/banks/pocztowy.jpg",
};

export function getBankImage(name: string): string | null {
  return BANK_IMAGES[name] || null;
}

// Attribution for the CC-BY / CC-BY-SA licensed photos above (public-domain
// ones need no credit but are listed for completeness). Not shown in the UI
// yet — add a small credits line if/when required.
export const BANK_IMAGE_CREDITS: Record<string, string> = {
  "/banks/mbank.jpg": "Luks089, public domain, via Wikimedia Commons",
  "/banks/ing.jpg": "Joa~commonswiki, public domain, via Wikimedia Commons",
  "/banks/pko.jpg": "Jan Mencwel, CC BY-SA 4.0, via Wikimedia Commons",
  "/banks/millennium.jpg": "Mm1970, CC BY 3.0, via Wikimedia Commons",
  "/banks/bos.jpg": "Wistula, CC BY-SA 4.0, via Wikimedia Commons",
  "/banks/pocztowy.jpg": "Przemysław Jahr, public domain, via Wikimedia Commons",
};
