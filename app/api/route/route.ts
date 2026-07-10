import { NextResponse } from "next/server";
import { DEFAULT_LANG, LANGUAGES, type Lang } from "../../_lib/i18n";
import { getCountryName } from "../../_lib/countries";

export type Speed = "fast" | "medium" | "slow";
export type Difficulty = "easy" | "medium" | "hard";

export type Route = {
  name: string;
  description: string;
  speed: Speed;
  cost: string;
  difficulty: Difficulty;
  approval_rate: number;
  documents_needed: string[];
  timeline: string;
  recommended: boolean;
  reason: string;
};

export type RouteEngineResult = {
  routes: Route[];
};

type RouteRequestBody = {
  citizenship?: string;
  current_country?: string;
  country?: string;
  goal?: string;
  language?: string;
};

const SYSTEM_PROMPT =
  'You are a relocation expert. Based on the user profile provided, analyze their situation and return exactly 3 relocation routes. Respond ONLY with a JSON object, no markdown, no commentary, matching this TypeScript type: { "routes": { "name": string, "description": string, "speed": "fast" | "medium" | "slow", "cost": string, "difficulty": "easy" | "medium" | "hard", "approval_rate": number (0-100), "documents_needed": string[], "timeline": string, "recommended": boolean, "reason": string }[] }. Exactly one route must have "recommended": true — the single best option for this specific user — with "reason" explaining why. All text fields (name, description, documents_needed, timeline, reason) must be written in the user\'s selected language. Be specific to this user\'s situation, not generic.';

function resolveLang(raw: unknown): Lang {
  return typeof raw === "string" && LANGUAGES.some((l) => l.code === raw) ? (raw as Lang) : DEFAULT_LANG;
}

function buildUserPrompt(body: RouteRequestBody, lang: Lang): string {
  const citizenshipName = body.citizenship ? getCountryName(body.citizenship, "en") : "unspecified";
  const currentCountryName = body.current_country ? getCountryName(body.current_country, "en") : "unspecified";
  const destination = body.country ?? "unspecified";
  const goal = body.goal ?? "unspecified";
  const languageName = LANGUAGES.find((l) => l.code === lang)?.name ?? "English";

  return `User profile: citizenship=${citizenshipName}, currently in=${currentCountryName}, wants to move to=${destination}, goal=${goal}. Respond in this language: ${languageName}.`;
}

type FallbackRouteText = {
  name: string;
  description: string;
  cost: string;
  timeline: string;
  doc: string;
  reason: string;
};

const FALLBACK_TEXT: Record<Lang, FallbackRouteText[]> = {
  en: [
    {
      name: "Fast-track route",
      description: "The quickest legal path available for your profile, with a streamlined application process.",
      cost: "€500–1500",
      timeline: "1–3 months",
      doc: "Passport, proof of funds, application form",
      reason: "This is a demo route — configure OPENAI_API_KEY for a personalized AI analysis.",
    },
    {
      name: "Standard route",
      description: "The most common and well-documented pathway, balancing speed and approval likelihood.",
      cost: "€1000–3000",
      timeline: "3–9 months",
      doc: "Passport, proof of address, proof of funds, employment or study documents",
      reason: "This is a demo route — configure OPENAI_API_KEY for a personalized AI analysis.",
    },
    {
      name: "Thorough route",
      description: "A slower but highly reliable path with the highest approval rate for complex cases.",
      cost: "€2000–5000",
      timeline: "9–18 months",
      doc: "Full document package including legal translations and notarizations",
      reason: "This is a demo route — configure OPENAI_API_KEY for a personalized AI analysis.",
    },
  ],
  ru: [
    {
      name: "Быстрый маршрут",
      description: "Самый быстрый легальный путь для вашего профиля с упрощённой процедурой подачи документов.",
      cost: "€500–1500",
      timeline: "1–3 месяца",
      doc: "Паспорт, подтверждение средств, заявление",
      reason: "Это демонстрационный маршрут — настройте OPENAI_API_KEY для персонального AI-анализа.",
    },
    {
      name: "Стандартный маршрут",
      description: "Самый распространённый и хорошо документированный путь с балансом скорости и вероятности одобрения.",
      cost: "€1000–3000",
      timeline: "3–9 месяцев",
      doc: "Паспорт, подтверждение адреса, подтверждение средств, документы о работе или учёбе",
      reason: "Это демонстрационный маршрут — настройте OPENAI_API_KEY для персонального AI-анализа.",
    },
    {
      name: "Основательный маршрут",
      description: "Более медленный, но максимально надёжный путь с самой высокой вероятностью одобрения для сложных случаев.",
      cost: "€2000–5000",
      timeline: "9–18 месяцев",
      doc: "Полный пакет документов, включая юридические переводы и нотариальные заверения",
      reason: "Это демонстрационный маршрут — настройте OPENAI_API_KEY для персонального AI-анализа.",
    },
  ],
  uz: [
    {
      name: "Tezkor yo'l",
      description: "Profilingiz uchun eng tezkor qonuniy yo'l, soddalashtirilgan ariza jarayoni bilan.",
      cost: "€500–1500",
      timeline: "1–3 oy",
      doc: "Pasport, mablag' tasdiqnomasi, ariza shakli",
      reason: "Bu namunaviy yo'l — shaxsiy AI tahlili uchun OPENAI_API_KEY sozlang.",
    },
    {
      name: "Standart yo'l",
      description: "Tezlik va tasdiqlanish ehtimolini muvozanatlaydigan eng keng tarqalgan va yaxshi hujjatlashtirilgan yo'l.",
      cost: "€1000–3000",
      timeline: "3–9 oy",
      doc: "Pasport, manzil tasdiqnomasi, mablag' tasdiqnomasi, ish yoki o'qish hujjatlari",
      reason: "Bu namunaviy yo'l — shaxsiy AI tahlili uchun OPENAI_API_KEY sozlang.",
    },
    {
      name: "Puxta yo'l",
      description: "Murakkab holatlar uchun eng yuqori tasdiqlanish ehtimoliga ega, sekinroq, ammo ishonchli yo'l.",
      cost: "€2000–5000",
      timeline: "9–18 oy",
      doc: "Yuridik tarjimalar va notarial tasdiqlarni o'z ichiga olgan to'liq hujjatlar to'plami",
      reason: "Bu namunaviy yo'l — shaxsiy AI tahlili uchun OPENAI_API_KEY sozlang.",
    },
  ],
  tr: [
    {
      name: "Hızlı yol",
      description: "Profiliniz için mevcut en hızlı yasal yol, sadeleştirilmiş başvuru süreciyle.",
      cost: "€500–1500",
      timeline: "1–3 ay",
      doc: "Pasaport, maddi durum kanıtı, başvuru formu",
      reason: "Bu bir demo yoldur — kişisel AI analizi için OPENAI_API_KEY ayarlayın.",
    },
    {
      name: "Standart yol",
      description: "Hız ve onay olasılığını dengeleyen en yaygın ve iyi belgelenmiş yol.",
      cost: "€1000–3000",
      timeline: "3–9 ay",
      doc: "Pasaport, adres kanıtı, maddi durum kanıtı, iş veya eğitim belgeleri",
      reason: "Bu bir demo yoldur — kişisel AI analizi için OPENAI_API_KEY ayarlayın.",
    },
    {
      name: "Kapsamlı yol",
      description: "Karmaşık durumlar için en yüksek onay oranına sahip, daha yavaş ama son derece güvenilir bir yol.",
      cost: "€2000–5000",
      timeline: "9–18 ay",
      doc: "Yasal çeviriler ve noter tasdikleri dahil tam belge paketi",
      reason: "Bu bir demo yoldur — kişisel AI analizi için OPENAI_API_KEY ayarlayın.",
    },
  ],
  tg: [
    {
      name: "Роҳи тезкор",
      description: "Роҳи тезтарини қонунӣ барои профили шумо бо равандии соддашудаи аризадиҳӣ.",
      cost: "€500–1500",
      timeline: "1–3 моҳ",
      doc: "Шиноснома, тасдиқи маблағ, шакли ариза",
      reason: "Ин роҳи намунавист — барои таҳлили шахсии AI OPENAI_API_KEY-ро танзим кунед.",
    },
    {
      name: "Роҳи стандартӣ",
      description: "Роҳи маъмултарин ва хуб ҳуҷҷатгузоришуда, ки суръат ва эҳтимоли тасдиқро мутавозин мекунад.",
      cost: "€1000–3000",
      timeline: "3–9 моҳ",
      doc: "Шиноснома, тасдиқи суроға, тасдиқи маблағ, ҳуҷҷатҳои кор ё таҳсил",
      reason: "Ин роҳи намунавист — барои таҳлили шахсии AI OPENAI_API_KEY-ро танзим кунед.",
    },
    {
      name: "Роҳи ҳаматарафа",
      description: "Роҳи суст, аммо бо эҳтимоли баландтарини тасдиқ барои ҳолатҳои мураккаб.",
      cost: "€2000–5000",
      timeline: "9–18 моҳ",
      doc: "Бастаи пурраи ҳуҷҷатҳо бо тарҷумаҳои ҳуқуқӣ ва тасдиқи нотариалӣ",
      reason: "Ин роҳи намунавист — барои таҳлили шахсии AI OPENAI_API_KEY-ро танзим кунед.",
    },
  ],
  uk: [
    {
      name: "Швидкий маршрут",
      description: "Найшвидший законний шлях для вашого профілю зі спрощеною процедурою подання документів.",
      cost: "€500–1500",
      timeline: "1–3 місяці",
      doc: "Паспорт, підтвердження коштів, заява",
      reason: "Це демонстраційний маршрут — налаштуйте OPENAI_API_KEY для персонального AI-аналізу.",
    },
    {
      name: "Стандартний маршрут",
      description: "Найпоширеніший і добре задокументований шлях із балансом швидкості та ймовірності схвалення.",
      cost: "€1000–3000",
      timeline: "3–9 місяців",
      doc: "Паспорт, підтвердження адреси, підтвердження коштів, документи про роботу чи навчання",
      reason: "Це демонстраційний маршрут — налаштуйте OPENAI_API_KEY для персонального AI-аналізу.",
    },
    {
      name: "Ґрунтовний маршрут",
      description: "Повільніший, але максимально надійний шлях із найвищою ймовірністю схвалення для складних випадків.",
      cost: "€2000–5000",
      timeline: "9–18 місяців",
      doc: "Повний пакет документів, включно з юридичними перекладами та нотаріальними засвідченнями",
      reason: "Це демонстраційний маршрут — налаштуйте OPENAI_API_KEY для персонального AI-аналізу.",
    },
  ],
};

function buildFallback(lang: Lang): RouteEngineResult {
  const texts = FALLBACK_TEXT[lang];
  const speeds: Speed[] = ["fast", "medium", "slow"];
  const difficulties: Difficulty[] = ["easy", "medium", "hard"];
  const approvalRates = [75, 55, 35];

  const routes: Route[] = texts.map((text, index) => ({
    name: text.name,
    description: text.description,
    speed: speeds[index],
    cost: text.cost,
    difficulty: difficulties[index],
    approval_rate: approvalRates[index],
    documents_needed: [text.doc],
    timeline: text.timeline,
    recommended: index === 1,
    reason: text.reason,
  }));

  return { routes };
}

function isValidResult(value: unknown): value is RouteEngineResult {
  if (!value || typeof value !== "object") return false;
  const routes = (value as { routes?: unknown }).routes;
  return Array.isArray(routes) && routes.length > 0;
}

export async function POST(request: Request) {
  const body = (await request.json()) as RouteRequestBody;
  const lang = resolveLang(body.language);
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(buildFallback(lang));
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(body, lang) },
      ],
      temperature: 0.4,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json({ error: `OpenAI error: ${errorText}` }, { status: 502 });
  }

  const data = await response.json();
  const content: string | undefined = data.choices?.[0]?.message?.content;

  if (!content) {
    return NextResponse.json(buildFallback(lang));
  }

  try {
    const parsed = JSON.parse(content) as RouteEngineResult;
    if (!isValidResult(parsed)) {
      return NextResponse.json(buildFallback(lang));
    }
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json(buildFallback(lang));
  }
}
