// ISO 3166-1 alpha-2 codes for the countries used across the app.
// Display names are hand-maintained per language below (COUNTRY_NAMES) rather than
// resolved via Intl.DisplayNames: real-world testing showed that browsers (Edge/Chrome
// on Windows in particular) have incomplete ICU data for locales like "uz" and silently
// fall back to the OS display language (e.g. Russian) instead of the requested language
// or even the "en" fallback. Since Intl.DisplayNames can't be trusted across browsers,
// we hardcode names for the small, fixed list of countries this app actually offers.
export const COUNTRY_CODES: string[] = [
  "UA", "MD", "GE", "AM",
  "BY", "RU", "UZ", "TJ", "KZ", "KG", "TM", "AZ", "TR",
  "DE", "FR", "IT", "ES", "NL", "BE", "AT", "SE", "DK", "FI", "CZ", "SK", "HU", "RO", "BG", "HR", "GR", "PT", "LT", "LV", "EE",
  "US", "CA", "AU", "JP", "IL", "KR", "NO", "CH", "GB",
];

export const COUNTRY_GROUP: Record<string, "A" | "B" | "V" | "G"> = {
  UA: "A", MD: "A", GE: "A", AM: "A",
  BY: "B", RU: "B", UZ: "B", TJ: "B", KZ: "B", KG: "B", TM: "B", AZ: "B", TR: "B",
  DE: "V", FR: "V", IT: "V", ES: "V", NL: "V", BE: "V", AT: "V", SE: "V", DK: "V", FI: "V", CZ: "V", SK: "V", HU: "V", RO: "V", BG: "V", HR: "V", GR: "V", PT: "V", LT: "V", LV: "V", EE: "V",
  US: "G", CA: "G", AU: "G", JP: "G", IL: "G", KR: "G", NO: "G", CH: "G", GB: "G",
};

export const EU_COUNTRY_CODES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR",
  "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL",
  "PL", "PT", "RO", "SK", "SI", "ES", "SE",
]);

export function isEuCountry(code: string | null | undefined): boolean {
  return !!code && EU_COUNTRY_CODES.has(code);
}

export function getFlagEmoji(code: string): string {
  if (!/^[A-Za-z]{2}$/.test(code)) return "🌍";
  return [...code.toUpperCase()].map((char) => String.fromCodePoint(127397 + char.charCodeAt(0))).join("");
}

// Hand-maintained country names per supported language. Keys must match COUNTRY_CODES.
const COUNTRY_NAMES: Record<string, Record<string, string>> = {
  ru: {
    UA: "Украина", MD: "Молдова", GE: "Грузия", AM: "Армения",
    BY: "Беларусь", RU: "Россия", UZ: "Узбекистан", TJ: "Таджикистан", KZ: "Казахстан", KG: "Кыргызстан", TM: "Туркменистан", AZ: "Азербайджан", TR: "Турция",
    DE: "Германия", FR: "Франция", IT: "Италия", ES: "Испания", NL: "Нидерланды", BE: "Бельгия", AT: "Австрия", SE: "Швеция", DK: "Дания", FI: "Финляндия", CZ: "Чехия", SK: "Словакия", HU: "Венгрия", RO: "Румыния", BG: "Болгария", HR: "Хорватия", GR: "Греция", PT: "Португалия", LT: "Литва", LV: "Латвия", EE: "Эстония",
    US: "США", CA: "Канада", AU: "Австралия", JP: "Япония", IL: "Израиль", KR: "Южная Корея", NO: "Норвегия", CH: "Швейцария", GB: "Великобритания",
  },
  en: {
    UA: "Ukraine", MD: "Moldova", GE: "Georgia", AM: "Armenia",
    BY: "Belarus", RU: "Russia", UZ: "Uzbekistan", TJ: "Tajikistan", KZ: "Kazakhstan", KG: "Kyrgyzstan", TM: "Turkmenistan", AZ: "Azerbaijan", TR: "Turkey",
    DE: "Germany", FR: "France", IT: "Italy", ES: "Spain", NL: "Netherlands", BE: "Belgium", AT: "Austria", SE: "Sweden", DK: "Denmark", FI: "Finland", CZ: "Czechia", SK: "Slovakia", HU: "Hungary", RO: "Romania", BG: "Bulgaria", HR: "Croatia", GR: "Greece", PT: "Portugal", LT: "Lithuania", LV: "Latvia", EE: "Estonia",
    US: "United States", CA: "Canada", AU: "Australia", JP: "Japan", IL: "Israel", KR: "South Korea", NO: "Norway", CH: "Switzerland", GB: "United Kingdom",
  },
  uz: {
    UA: "Ukraina", MD: "Moldova", GE: "Gruziya", AM: "Armaniston",
    BY: "Belarus", RU: "Rossiya", UZ: "O'zbekiston", TJ: "Tojikiston", KZ: "Qozog'iston", KG: "Qirg'iziston", TM: "Turkmaniston", AZ: "Ozarbayjon", TR: "Turkiya",
    DE: "Germaniya", FR: "Fransiya", IT: "Italiya", ES: "Ispaniya", NL: "Niderlandiya", BE: "Belgiya", AT: "Avstriya", SE: "Shvetsiya", DK: "Daniya", FI: "Finlyandiya", CZ: "Chexiya", SK: "Slovakiya", HU: "Vengriya", RO: "Ruminiya", BG: "Bolgariya", HR: "Xorvatiya", GR: "Gretsiya", PT: "Portugaliya", LT: "Litva", LV: "Latviya", EE: "Estoniya",
    US: "Amerika Qo'shma Shtatlari", CA: "Kanada", AU: "Avstraliya", JP: "Yaponiya", IL: "Isroil", KR: "Janubiy Koreya", NO: "Norvegiya", CH: "Shveytsariya", GB: "Buyuk Britaniya",
  },
  tr: {
    UA: "Ukrayna", MD: "Moldova", GE: "Gürcistan", AM: "Ermenistan",
    BY: "Belarus", RU: "Rusya", UZ: "Özbekistan", TJ: "Tacikistan", KZ: "Kazakistan", KG: "Kırgızistan", TM: "Türkmenistan", AZ: "Azerbaycan", TR: "Türkiye",
    DE: "Almanya", FR: "Fransa", IT: "İtalya", ES: "İspanya", NL: "Hollanda", BE: "Belçika", AT: "Avusturya", SE: "İsveç", DK: "Danimarka", FI: "Finlandiya", CZ: "Çekya", SK: "Slovakya", HU: "Macaristan", RO: "Romanya", BG: "Bulgaristan", HR: "Hırvatistan", GR: "Yunanistan", PT: "Portekiz", LT: "Litvanya", LV: "Letonya", EE: "Estonya",
    US: "Amerika Birleşik Devletleri", CA: "Kanada", AU: "Avustralya", JP: "Japonya", IL: "İsrail", KR: "Güney Kore", NO: "Norveç", CH: "İsviçre", GB: "Birleşik Krallık",
  },
  tg: {
    UA: "Украина", MD: "Молдова", GE: "Гурҷистон", AM: "Арманистон",
    BY: "Беларус", RU: "Русия", UZ: "Узбекистон", TJ: "Тоҷикистон", KZ: "Қазоқистон", KG: "Қирғизистон", TM: "Туркманистон", AZ: "Озарбойҷон", TR: "Туркия",
    DE: "Олмон", FR: "Фаронса", IT: "Итолиё", ES: "Испания", NL: "Нидерландия", BE: "Белгия", AT: "Австрия", SE: "Шветсия", DK: "Дания", FI: "Финландия", CZ: "Чехия", SK: "Словакия", HU: "Маҷористон", RO: "Руминия", BG: "Булғористон", HR: "Хорватия", GR: "Юнон", PT: "Португалия", LT: "Литва", LV: "Латвия", EE: "Эстония",
    US: "ИМА", CA: "Канада", AU: "Австралия", JP: "Япония", IL: "Исроил", KR: "Кореяи Ҷанубӣ", NO: "Норвегия", CH: "Швейтсария", GB: "Британияи Кабир",
  },
  uk: {
    UA: "Україна", MD: "Молдова", GE: "Грузія", AM: "Вірменія",
    BY: "Білорусь", RU: "Росія", UZ: "Узбекистан", TJ: "Таджикистан", KZ: "Казахстан", KG: "Киргизстан", TM: "Туркменістан", AZ: "Азербайджан", TR: "Туреччина",
    DE: "Німеччина", FR: "Франція", IT: "Італія", ES: "Іспанія", NL: "Нідерланди", BE: "Бельгія", AT: "Австрія", SE: "Швеція", DK: "Данія", FI: "Фінляндія", CZ: "Чехія", SK: "Словаччина", HU: "Угорщина", RO: "Румунія", BG: "Болгарія", HR: "Хорватія", GR: "Греція", PT: "Португалія", LT: "Литва", LV: "Латвія", EE: "Естонія",
    US: "США", CA: "Канада", AU: "Австралія", JP: "Японія", IL: "Ізраїль", KR: "Південна Корея", NO: "Норвегія", CH: "Швейцарія", GB: "Велика Британія",
  },
};

export function getCountryName(code: string, lang: string): string {
  const table = COUNTRY_NAMES[lang] ?? COUNTRY_NAMES.en;
  return table[code] ?? COUNTRY_NAMES.en[code] ?? code;
}

export function getCountryList(lang: string): { code: string; name: string; flag: string }[] {
  return COUNTRY_CODES.map((code) => ({ code, name: getCountryName(code, lang), flag: code.toLowerCase() })).sort(
    (a, b) => a.name.localeCompare(b.name, lang),
  );
}
