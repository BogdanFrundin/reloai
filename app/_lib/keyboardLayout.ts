// Fixes the classic typo where a user types Russian while their physical
// keyboard is still switched to the English/Latin layout (e.g. typing
// "ghbdtn" while meaning to type "привет"). Maps each Latin QWERTY key to
// the Cyrillic letter sitting in the same physical position on a standard
// Russian ЙЦУКЕН layout, then only applies the conversion when it clearly
// produces more recognizable Russian than the original text did -- this
// keeps genuine English/other-language messages untouched.

const EN_TO_RU: Record<string, string> = {
  q: "й", w: "ц", e: "у", r: "к", t: "е", y: "н", u: "г", i: "ш", o: "щ", p: "з",
  "[": "х", "]": "ъ",
  a: "ф", s: "ы", d: "в", f: "а", g: "п", h: "р", j: "о", k: "л", l: "д", ";": "ж", "'": "э",
  z: "я", x: "ч", c: "с", v: "м", b: "и", n: "т", m: "ь", ",": "б", ".": "ю", "/": ".",
  "`": "ё",
};

function convertEnLayoutToRu(text: string): string {
  let out = "";
  for (const ch of text) {
    const lower = ch.toLowerCase();
    const mapped = EN_TO_RU[lower];
    if (!mapped) {
      out += ch;
      continue;
    }
    out += ch === lower ? mapped : mapped.toUpperCase();
  }
  return out;
}

// A short list of very common Russian words/stems, used only to score
// whether a layout-converted string "looks like" real Russian -- doesn't
// need to be exhaustive, just common enough to catch typical chat messages.
const COMMON_RU_WORDS = new Set([
  "и", "в", "не", "на", "что", "как", "это", "я", "мы", "вы", "ты", "он", "она",
  "где", "когда", "почему", "который", "нужно", "нужен", "нужна", "можно",
  "сколько", "какой", "какая", "спасибо", "пожалуйста", "привет", "здравствуйте",
  "документ", "документы", "виза", "визу", "банк", "жилье", "жильё", "квартира",
  "помощь", "вопрос", "для", "или", "чтобы", "если", "но", "да", "нет", "хочу",
  "работа", "город", "страна", "деньги", "сейчас", "быстро", "долго", "подскажи",
  "расскажи", "стоит", "лучше", "меня", "мне", "тебя", "тебе", "всё", "все",
]);

function score(text: string): number {
  const words = text.toLowerCase().match(/[а-яё]+/g) ?? [];
  let hits = 0;
  for (const w of words) {
    if (COMMON_RU_WORDS.has(w)) hits++;
  }
  return hits;
}

/**
 * If `text` looks like it was typed in Russian but with the keyboard stuck
 * on an English layout, returns the corrected Cyrillic text. Otherwise
 * returns the original text unchanged. Deliberately conservative -- only
 * converts when the converted version scores clearly better against a list
 * of common Russian words, so normal English messages are left alone.
 */
export function fixRussianKeyboardLayout(text: string): string {
  // Only worth trying when the text is mostly Latin letters with no
  // Cyrillic already present -- if it already has real Cyrillic in it,
  // it's not a layout-mistype.
  const latinLetters = text.match(/[a-z]/gi)?.length ?? 0;
  const cyrillicLetters = text.match(/[а-яё]/gi)?.length ?? 0;
  if (latinLetters < 4 || cyrillicLetters > 0) return text;

  const converted = convertEnLayoutToRu(text);
  const words = converted.toLowerCase().match(/[а-яё]+/g) ?? [];
  const hits = score(converted);
  // Short messages (like a lone "ghbdtn" -> "привет") need a lower bar than
  // longer ones, where we want more evidence before rewriting the text.
  const threshold = words.length <= 2 ? 1 : 2;

  return hits >= threshold ? converted : text;
}
