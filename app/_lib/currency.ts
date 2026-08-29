// Currency switcher: one currency per language available on the site (see
// LANGUAGES in i18n.ts), plus PLN itself since that's what Poland actually
// prices things in. All source data in the DB is in PLN -- everything here
// converts *from* PLN using live rates fetched by CurrencyProvider.

export type CurrencyCode = "PLN" | "USD" | "EUR" | "RUB" | "UAH" | "GBP" | "TRY" | "UZS" | "TJS";

export type Currency = {
  code: CurrencyCode;
  symbol: string;
  // Fallback / Russian name, kept for callers that haven't switched to getCurrencyName(code, lang) yet.
  name: string;
  // ISO country code for the flag icon (flagcdn.com), "eu" for the EU flag.
  flag: string;
};

export const CURRENCIES: Currency[] = [
  { code: "PLN", symbol: "zł", name: "Польша (Злотый)", flag: "pl" },
  { code: "USD", symbol: "$", name: "США (Доллар)", flag: "us" },
  { code: "EUR", symbol: "€", name: "Евро", flag: "eu" },
  { code: "RUB", symbol: "₽", name: "Россия (Рубль)", flag: "ru" },
  { code: "UAH", symbol: "₴", name: "Украина (Гривна)", flag: "ua" },
  { code: "GBP", symbol: "£", name: "Великобритания (Фунт)", flag: "gb" },
  { code: "TRY", symbol: "₺", name: "Турция (Лира)", flag: "tr" },
  { code: "UZS", symbol: "so'm", name: "Узбекистан (Сум)", flag: "uz" },
  { code: "TJS", symbol: "смн", name: "Таджикистан (Сомони)", flag: "tj" },
];

// Hand-maintained per-language currency labels (same reasoning as COUNTRY_NAMES in
// countries.ts -- these are UI labels, not something we want left in Russian when the
// site language is switched).
const CURRENCY_NAMES: Record<string, Record<CurrencyCode, string>> = {
  ru: {
    PLN: "Польша (Злотый)", USD: "США (Доллар)", EUR: "Евро", RUB: "Россия (Рубль)",
    UAH: "Украина (Гривна)", GBP: "Великобритания (Фунт)", TRY: "Турция (Лира)",
    UZS: "Узбекистан (Сум)", TJS: "Таджикистан (Сомони)",
  },
  en: {
    PLN: "Poland (Zloty)", USD: "USA (Dollar)", EUR: "Euro", RUB: "Russia (Ruble)",
    UAH: "Ukraine (Hryvnia)", GBP: "UK (Pound)", TRY: "Turkey (Lira)",
    UZS: "Uzbekistan (Som)", TJS: "Tajikistan (Somoni)",
  },
  uz: {
    PLN: "Polsha (Zlotiy)", USD: "AQSh (Dollar)", EUR: "Yevro", RUB: "Rossiya (Rubl)",
    UAH: "Ukraina (Grivna)", GBP: "Buyuk Britaniya (Funt)", TRY: "Turkiya (Lira)",
    UZS: "O'zbekiston (So'm)", TJS: "Tojikiston (Somoni)",
  },
  tr: {
    PLN: "Polonya (Zloti)", USD: "ABD (Dolar)", EUR: "Euro", RUB: "Rusya (Ruble)",
    UAH: "Ukrayna (Grivna)", GBP: "Birleşik Krallık (Sterlin)", TRY: "Türkiye (Lira)",
    UZS: "Özbekistan (Som)", TJS: "Tacikistan (Somoni)",
  },
  tg: {
    PLN: "Полша (Злоти)", USD: "ИМА (Доллар)", EUR: "Евро", RUB: "Русия (Рубл)",
    UAH: "Украина (Гривна)", GBP: "Британияи Кабир (Фунт)", TRY: "Туркия (Лира)",
    UZS: "Узбекистон (Сум)", TJS: "Тоҷикистон (Сомонӣ)",
  },
  uk: {
    PLN: "Польща (Злотий)", USD: "США (Долар)", EUR: "Євро", RUB: "Росія (Рубль)",
    UAH: "Україна (Гривня)", GBP: "Велика Британія (Фунт)", TRY: "Туреччина (Ліра)",
    UZS: "Узбекистан (Сум)", TJS: "Таджикистан (Сомоні)",
  },
};

export function getCurrencyName(code: CurrencyCode, lang: string): string {
  const table = CURRENCY_NAMES[lang] ?? CURRENCY_NAMES.en;
  return table[code] ?? CURRENCY_NAMES.en[code] ?? code;
}

export const DEFAULT_CURRENCY: CurrencyCode = "PLN";

// PLN -> 1 unit of that currency (i.e. amountInCurrency = amountPln * rate).
export type RatesMap = Partial<Record<CurrencyCode, number>>;

export function isCurrencyCode(value: unknown): value is CurrencyCode {
  return typeof value === "string" && CURRENCIES.some((c) => c.code === value);
}

export function currencySymbol(code: CurrencyCode): string {
  return CURRENCIES.find((c) => c.code === code)?.symbol ?? code;
}

export function formatNumber(n: number): string {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function convertAmount(amountPln: number, code: CurrencyCode, rates: RatesMap | null): number {
  if (code === "PLN") return amountPln;
  const rate = rates?.[code];
  if (!rate) return amountPln;
  return amountPln * rate;
}

export function formatMoney(amountPln: number, code: CurrencyCode, rates: RatesMap | null): string {
  return `${formatNumber(convertAmount(amountPln, code, rates))} ${currencySymbol(code)}`;
}

export function formatMoneyRange(
  minPln: number | null | undefined,
  maxPln: number | null | undefined,
  code: CurrencyCode,
  rates: RatesMap | null
): string | null {
  if (minPln == null && maxPln == null) return null;
  if (minPln != null && maxPln != null) {
    const a = convertAmount(minPln, code, rates);
    const b = convertAmount(maxPln, code, rates);
    return `${formatNumber(a)} – ${formatNumber(b)} ${currencySymbol(code)}`;
  }
  const only = convertAmount((minPln ?? maxPln) as number, code, rates);
  return `${formatNumber(only)} ${currencySymbol(code)}`;
}

// Matches PLN amounts embedded in free-text price strings, e.g.
// "700–2500 PLN за курс", "150 злотых/месяц", "От 700 до 2500 PLN", "0 zł".
// Longest currency-word forms are listed first so "złotych"/"злотых" match
// in full rather than stopping at "zł"/"злот".
const PRICE_RE =
  /(\d[\d\s .,]{0,9}\d|\d)(?:\s*(?:[-–—]|до)\s*(\d[\d\s .,]{0,9}\d|\d))?\s*(złotych|złoty|zł|PLN|злотых|злотый|злоты|злот)/giu;

function parseNum(raw: string): number {
  const cleaned = raw.replace(/[\s ]/g, "").replace(/,/g, "");
  return parseFloat(cleaned) || 0;
}

// Best-effort: converts just the number + currency-word portion of a
// free-text price string into the selected currency, leaving surrounding
// text (conditions, periods, "уточняйте на сайте" etc.) untouched. Returns
// the original text unchanged if the currency is PLN, rates aren't loaded
// yet, or no PLN amount is found.
export function convertPlnText(
  text: string | null | undefined,
  code: CurrencyCode,
  rates: RatesMap | null
): string {
  if (!text) return text ?? "";
  if (code === "PLN" || !rates) return text;
  const symbol = currencySymbol(code);
  return text.replace(PRICE_RE, (_match, num1: string, num2: string | undefined) => {
    const n1 = convertAmount(parseNum(num1), code, rates);
    if (num2) {
      const n2 = convertAmount(parseNum(num2), code, rates);
      return `${formatNumber(n1)} – ${formatNumber(n2)} ${symbol}`;
    }
    return `${formatNumber(n1)} ${symbol}`;
  });
}
