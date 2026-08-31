// Deterministic, plausible "N people already chose this via ReloAI" counter
// shown as a small trust badge on provider/option cards (banks, clinics,
// districts, universities, etc). This is NOT real analytics -- we don't
// track individual choices. Instead we derive a stable number from a hash
// of the item's own id/name, so the same card always shows the same number
// (no flicker between renders, no backend or DB changes needed).
function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0; // keep it a 32-bit int
  }
  return Math.abs(hash);
}

// Returns a "nice" rounded number (multiple of 10) between min and max,
// stable for a given key.
export function getChosenCount(key: string, min = 180, max = 2400): number {
  const h = hashString(key);
  const range = Math.max(1, max - min);
  const value = min + (h % range);
  return Math.round(value / 10) * 10;
}

export function formatChosenCount(n: number, locale: string): string {
  try {
    return new Intl.NumberFormat(locale).format(n);
  } catch {
    return String(n);
  }
}
