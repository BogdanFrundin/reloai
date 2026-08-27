// Builds a Google Maps search URL from whatever address-ish text is
// available (street address, district, city, institution name, "Poland" as
// a fallback anchor) — used anywhere a card shows a physical location
// (universities, clinics, document-submission offices, etc.) so the address
// is always one tap away from an actual map instead of just being inert text.
export function buildGoogleMapsUrl(parts: (string | null | undefined)[]): string {
  const query = encodeURIComponent(parts.filter(Boolean).join(", "));
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
