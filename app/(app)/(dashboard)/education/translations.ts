import type { Lang } from "../../../_lib/i18n";

// Exact-match phrase translations for the free-form English content embedded in
// the courses/schools/kindergartens/universities datasets (format, price, level,
// language, instruction, tuition, deadline, waiting list, notes, program names).
// Only Russian is covered — other languages fall back to the original English,
// matching this data's pre-existing behavior for non-Russian locales.
const RU_PHRASES: Record<string, string> = {
  // Course format
  "In-person, group": "Очно, в группе",
  "In-person": "Очно",
  "In-person & online": "Очно / Онлайн",
  "Online & in-person": "Онлайн и очно",
  "In-person, small groups": "Очно, маленькие группы",
  "In-person, intensive": "Очно, интенсив",
  "In-person, 700 hrs": "Очно, 700 часов",
  "In-person, community": "Очно, при местной общине",

  // Levels
  "All levels": "Все уровни",

  // Languages / instruction
  Polish: "Польский",
  "Polish for foreigners": "Польский для иностранцев",
  "Polish & Russian": "Польский и русский",
  English: "Английский",
  German: "Немецкий",
  "German & English": "Немецкий и английский",
  "English & German": "Английский и немецкий",
  "Spanish, English, French": "Испанский, английский, французский",
  Spanish: "Испанский",
  "Catalan, Spanish, English": "Каталанский, испанский, английский",
  "Polish (preparatory class)": "Польский (подготовительный класс)",
  "English (IB curriculum)": "Английский (программа IB)",
  "English (British curriculum)": "Английский (британская программа)",
  "English / Polish": "Английский / польский",
  "French / Polish": "Французский / польский",
  "German (Willkommensklasse)": "Немецкий (приветственный класс)",
  "French / German": "Французский / немецкий",
  "English / German (IB)": "Английский / немецкий (IB)",
  "German / English bilingual": "Немецко-английский билингвальный",
  "Catalan / Spanish": "Каталанский / испанский",
  "Catalan / Spanish / English": "Каталанский / испанский / английский",
  "English / Spanish (IB)": "Английский / испанский (IB)",
  "English / Spanish / Catalan": "Английский / испанский / каталанский",
  "Polish & English (select programs)": "Польский и английский (на некоторых программах)",
  "Polish & English": "Польский и английский",
  "Polish (some English programs)": "Польский (есть программы на английском)",
  "German (English Master's available)": "Немецкий (магистратура доступна на английском)",
  "German (some English programs)": "Немецкий (есть программы на английском)",
  "Catalan / Spanish (some English)": "Каталанский / испанский (частично на английском)",
  "English & Spanish": "Английский и испанский",
  "Spanish / Catalan": "Испанский / каталанский",
  "Polish (some English)": "Польский (частично на английском)",
  "English & Polish": "Английский и польский",
  "Spanish / Catalan / English": "Испанский / каталанский / английский",

  // Course prices
  "Free for refugees / TPH": "Бесплатно для беженцев / держателей временной защиты",
  "Free (registered unemployed)": "Бесплатно (для зарегистрированных безработных)",
  "PLN 180–280 / month": "180–280 злотых / месяц",
  "PLN 150–230 / month": "150–230 злотых / месяц",
  "PLN 280–420 / month": "280–420 злотых / месяц",
  "PLN 300–500 / month": "300–500 злотых / месяц",
  "Free or €1.95 / hr": "Бесплатно или €1,95 / час",
  "€3–6 / lesson": "€3–6 / занятие",
  "€800–1,400 / course": "€800–1 400 / курс",
  "€600–950 / course": "€600–950 / курс",
  "€1,000–2,500 / course": "€1 000–2 500 / курс",
  "€800–1,500 / course": "€800–1 500 / курс",
  "€70–90 / year": "€70–90 / год",
  "€0–30 / month": "€0–30 / месяц",
  "€450–750 / course": "€450–750 / курс",
  "€550–900 / quarter": "€550–900 / квартал",
  "€300–600 / course": "€300–600 / курс",
  "€200–450 / course": "€200–450 / курс",

  // School prices
  Free: "Бесплатно",
  "Free + small contribution": "Бесплатно + небольшой взнос",
  "€19,000–25,000 / year": "€19 000–25 000 / год",
  "€14,000–21,000 / year": "€14 000–21 000 / год",
  "PLN 2,500–4,500 / month": "2 500–4 500 злотых / месяц",
  "PLN 1,800–3,200 / month": "1 800–3 200 злотых / месяц",
  "€10,500–17,500 / year": "€10 500–17 500 / год",
  "€200–400 / month": "€200–400 / месяц",
  "€9,800–13,200 / year": "€9 800–13 200 / год",
  "€700–1,200 / month": "€700–1 200 / месяц",
  "€9,500–16,000 / year": "€9 500–16 000 / год",
  "€8,000–15,500 / year": "€8 000–15 500 / год",
  "€7,500–14,000 / year": "€7 500–14 000 / год",
  "€4,000–7,000 / year": "€4 000–7 000 / год",

  // Kindergarten prices
  "PLN 0–240 / month": "0–240 злотых / месяц",
  "PLN 400–600 / month": "400–600 злотых / месяц",
  "PLN 350–550 / month": "350–550 злотых / месяц",
  "PLN 2,200–3,500 / month": "2 200–3 500 злотых / месяц",
  "PLN 2,500–3,800 / month": "2 500–3 800 злотых / месяц",
  "PLN 1,800–2,800 / month": "1 800–2 800 злотых / месяц",
  "PLN 1,400–2,200 / month": "1 400–2 200 злотых / месяц",
  "€0–300 / month (income-based)": "€0–300 / месяц (по доходу)",
  "€0–300 / month": "€0–300 / месяц",
  "€1,200–1,800 / month": "€1 200–1 800 / месяц",
  "€1,000–1,500 / month": "€1 000–1 500 / месяц",
  "€900–1,400 / month": "€900–1 400 / месяц",
  "€800–1,200 / month": "€800–1 200 / месяц",
  "€120–350 / month (income-based)": "€120–350 / месяц (по доходу)",
  "€120–350 / month": "€120–350 / месяц",
  "€100–300 / month": "€100–300 / месяц",
  "€800–1,300 / month": "€800–1 300 / месяц",
  "€500–900 / month": "€500–900 / месяц",
  "€400–700 / month": "€400–700 / месяц",

  // University tuition
  "Free (EU) / PLN 3,000–8,000 / year": "Бесплатно (ЕС) / 3 000–8 000 злотых / год",
  "Free (EU) / PLN 5,000–12,000 / year": "Бесплатно (ЕС) / 5 000–12 000 злотых / год",
  "Free (EU) / PLN 6,000–10,000 / year": "Бесплатно (ЕС) / 6 000–10 000 злотых / год",
  "Free (EU) / PLN 3,000–10,000 / year": "Бесплатно (ЕС) / 3 000–10 000 злотых / год",
  "PLN 15,000–32,000 / year": "15 000–32 000 злотых / год",
  "PLN 10,000–22,000 / year": "10 000–22 000 злотых / год",
  "PLN 10,000–18,000 / year": "10 000–18 000 злотых / год",
  "PLN 8,000–15,000 / year": "8 000–15 000 злотых / год",
  "~€350 / semester (semester fee)": "~€350 / семестр (семестровый взнос)",
  "~€350 / semester": "~€350 / семестр",
  "~€150 / semester": "~€150 / семестр",
  "€12,000–20,000 / year": "€12 000–20 000 / год",
  "€16,000–20,000 / year": "€16 000–20 000 / год",
  "€6,000–12,000 / year": "€6 000–12 000 / год",
  "€15,000–22,000 / year": "€15 000–22 000 / год",
  "€1,000–2,000 / year (EU) · €3,000–6,000 (non-EU)": "€1 000–2 000 / год (ЕС) · €3 000–6 000 (не ЕС)",
  "€1,000–2,500 / year (EU) · €3,000–6,500 (non-EU)": "€1 000–2 500 / год (ЕС) · €3 000–6 500 (не ЕС)",
  "€1,200–2,500 / year (EU) · €4,000–7,000 (non-EU)": "€1 200–2 500 / год (ЕС) · €4 000–7 000 (не ЕС)",
  "€800–1,800 / year (EU) · €4,000–8,000 (non-EU)": "€800–1 800 / год (ЕС) · €4 000–8 000 (не ЕС)",
  "€20,000–40,000 / year": "€20 000–40 000 / год",
  "€30,000–70,000 / year (MBA)": "€30 000–70 000 / год (MBA)",
  "€8,000–18,000 / year": "€8 000–18 000 / год",
  "€9,000–15,000 / year": "€9 000–15 000 / год",

  // Deadlines
  "Apply: May–July": "Приём: май–июль",
  "Apply: June–July": "Приём: июнь–июль",
  "Apply: May–June": "Приём: май–июнь",
  "Rolling admissions": "Приём круглый год",
  "Apply by July 15 / Jan 15": "Подача до 15 июля / 15 января",
  "Apply by May 31 / Nov 30": "Подача до 31 мая / 30 ноября",
  "Rolling (multiple intakes)": "Приём круглый год (несколько потоков)",
  "Apply by January 15": "Подача до 15 января",
  "Apply by January / March": "Подача в январе / марте",
  "Apply: May–June (PAU)": "Приём: май–июнь (PAU)",
  "Rolling (3 intakes)": "Приём круглый год (3 потока)",
  "Apply: March–June": "Приём: март–июнь",

  // Waiting lists
  "Register in February for September": "Запись в феврале на сентябрь",
  "Usually 6–12 month wait": "Обычно ожидание 6–12 месяцев",
  "Register by March each year": "Запись ежегодно до марта",
  "3–6 month wait": "Ожидание 3–6 месяцев",
  "6–12 month wait — apply early": "Ожидание 6–12 месяцев — подавайте заранее",
  "6–18 month wait typical": "Обычно ожидание 6–18 месяцев",
  "3–9 month wait": "Ожидание 3–9 месяцев",
  "Up to 18 months in this popular area": "До 18 месяцев в этом популярном районе",
  "Apply March–April for September": "Подача март–апрель на сентябрь",
  "Apply each spring": "Подача каждую весну",
  "2–6 month wait": "Ожидание 2–6 месяцев",

  // Notes
  "Offered by Warsaw city for temporary protection holders (ochrona czasowa)":
    "Предлагается городом Варшава для держателей временной защиты (ochrona czasowa)",
  "Register at your local Powiatowy Urząd Pracy": "Регистрация в вашем местном Powiatowy Urząd Pracy",
  "Mandatory for some visa types, available to others on request":
    "Обязателен для некоторых типов виз, для остальных — по запросу",
  "Available across all major German cities, highly subsidized":
    "Доступен во всех крупных городах Германии, сильно субсидируется",
  "State language schools — enrol each September": "Государственные языковые школы — запись каждый сентябрь",
  "Offered by Barcelona city districts for newcomers": "Предлагается районами Барселоны для новоприбывших",
  "Has Oddział Przygotowawczy for non-Polish speakers": "Есть Oddział Przygotowawczy для не говорящих по-польски",
  "Top-ranked secondary school in Warsaw": "Одна из лучших средних школ Варшавы",
  "Welcome classes with intensive German support for newly arrived children":
    "Приветственные классы с интенсивной поддержкой немецкого для новоприбывших детей",
  "Language reception class for newly arrived students": "Класс языковой адаптации для новоприбывших учеников",
  "Municipal nursery (żłobek), state subsidized": "Муниципальные ясли (żłobek), субсидируются государством",
  "Has Ukrainian-speaking assistants": "Есть украиноговорящие ассистенты",
  "Bilingual Polish-English environment": "Двуязычная польско-английская среда",
  "Full English immersion, no waiting list": "Полное погружение в английский, без очереди",
  "Often free for low incomes via Kita-Gutschein": "Часто бесплатно для низких доходов через Kita-Gutschein",
  "German-English bilingual": "Немецко-английский билингвальный",
  "City-run nursery, heavily subsidized": "Муниципальные ясли, сильно субсидируются",
  "Ages 3–6 are part of free compulsory schooling in Spain":
    "Возраст 3–6 лет входит в бесплатное обязательное образование в Испании",
  "Full English immersion": "Полное погружение в английский",
  "Trilingual Catalan-Spanish-English": "Трёхъязычная среда: каталанский-испанский-английский",
  "Ukrainian citizens with ochrona czasowa may study free under the same conditions as Polish citizens":
    "Граждане Украины со статусом ochrona czasowa могут учиться бесплатно на тех же условиях, что и граждане Польши",
  "Semester fee includes a BVG public transport pass across Berlin":
    "Семестровый взнос включает проездной BVG на транспорт по Берлину",
  "EU citizens and Spanish residents pay heavily subsidized rates":
    "Граждане ЕС и резиденты Испании платят по сильно субсидированным ставкам",

  // Area / location helpers
  "All districts": "Все районы",
  "Various districts": "Разные районы",

  // University program names
  Law: "Право",
  Economics: "Экономика",
  Humanities: "Гуманитарные науки",
  Medicine: "Медицина",
  Engineering: "Инженерия",
  "Computer Science": "Информатика",
  Architecture: "Архитектура",
  Business: "Бизнес",
  Finance: "Финансы",
  Management: "Менеджмент",
  Sciences: "Естественные науки",
  MBA: "MBA",
  Psychology: "Психология",
  Design: "Дизайн",
  Communication: "Коммуникации",
  "International Business": "Международный бизнес",
  Tourism: "Туризм",
  "Security Studies": "Исследования безопасности",
  "International Relations": "Международные отношения",
  Sociology: "Социология",
  Journalism: "Журналистика",
  "Social Sciences": "Социальные науки",
  "Natural Sciences": "Естественные науки",
  Mathematics: "Математика",
  "Liberal Arts": "Гуманитарные и общественные науки",
  Media: "Медиа",
  "Health Sciences": "Медицинские науки",
  "Public Policy": "Государственная политика",
  Governance: "Государственное управление",
  "International Affairs": "Международные отношения",
  Pharmacy: "Фармацевтика",
  "Business Administration": "Управление бизнесом",
  "Executive Programs": "Программы для руководителей",
  Dentistry: "Стоматология",
  "Digital Arts": "Цифровое искусство",
  Technology: "Технологии",
};

const RU_CITY_NAMES: Record<string, string> = {
  Warsaw: "Варшава",
  Berlin: "Берлин",
  Munich: "Мюнхен",
  Barcelona: "Барселона",
  Krakow: "Краков",
  Madrid: "Мадрид",
  Bellaterra: "Бельятерра",
};

const CITY_TOKEN_RE = new RegExp(`\\b(${Object.keys(RU_CITY_NAMES).join("|")})\\b`, "g");

/** Translates a single field value (format/price/level/language/instruction/tuition/deadline/note/program). */
export function trField(text: string, lang: Lang): string {
  if (lang !== "ru") return text;
  return RU_PHRASES[text] ?? text;
}

/** Translates an "area"/"location" string, swapping known English city names for their Russian form. */
export function trPlace(text: string, lang: Lang): string {
  if (lang !== "ru") return text;
  if (RU_PHRASES[text]) return RU_PHRASES[text];
  return text.replace(CITY_TOKEN_RE, (m) => RU_CITY_NAMES[m] ?? m);
}
