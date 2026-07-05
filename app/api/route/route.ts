import { NextResponse } from "next/server";
import { DEFAULT_LANG, LANGUAGES, type Lang } from "../../_lib/i18n";
import { getCountryName } from "../../_lib/countries";

const SYSTEM_PROMPT =
  "You are an expert immigration consultant. Based on the user profile, analyze ALL available legal relocation pathways. For each pathway provide: name, eligibility, estimated timeline, estimated cost, success probability, required documents list, pros and cons. Then recommend the TOP pathway for this specific user with clear reasoning. Always respond in the user's selected language. Be specific, not generic. Respond ONLY with a JSON object matching this TypeScript type, no markdown, no commentary: { \"pathways\": { \"name\": string, \"eligibility\": string, \"timeline\": string, \"cost\": string, \"successProbability\": number (0-100), \"requiredDocuments\": string[], \"pros\": string[], \"cons\": string[] }[], \"recommended\": string (must exactly match one pathway's \"name\"), \"reasoning\": string }";

type RouteRequestBody = {
  citizenship?: string;
  current_country?: string;
  country?: string;
  goal?: string;
  language?: string;
};

export type Pathway = {
  name: string;
  eligibility: string;
  timeline: string;
  cost: string;
  successProbability: number;
  requiredDocuments: string[];
  pros: string[];
  cons: string[];
};

export type RouteResult = {
  pathways: Pathway[];
  recommended: string;
  reasoning: string;
};

function resolveLang(raw: unknown): Lang {
  return typeof raw === "string" && LANGUAGES.some((l) => l.code === raw) ? (raw as Lang) : DEFAULT_LANG;
}

const FALLBACK_TEXT: Record<Lang, { pathwayName: string; eligibility: string; timeline: string; cost: string; doc: string; pro: string; con: string; reasoning: string }> = {
  en: {
    pathwayName: "General relocation pathway",
    eligibility: "Likely eligible based on your stated goal and citizenship — set OPENAI_API_KEY for a personalized analysis.",
    timeline: "3–9 months",
    cost: "Varies by country",
    doc: "Passport, proof of address, proof of funds",
    pro: "Well-documented process",
    con: "Processing times vary",
    reasoning: "This is a demo pathway. Configure OPENAI_API_KEY to get a personalized AI-generated analysis.",
  },
  ru: {
    pathwayName: "Общий путь переезда",
    eligibility: "Вероятно подходит, исходя из вашей цели и гражданства — задайте OPENAI_API_KEY для персонального анализа.",
    timeline: "3–9 месяцев",
    cost: "Зависит от страны",
    doc: "Паспорт, подтверждение адреса, подтверждение средств",
    pro: "Хорошо документированный процесс",
    con: "Сроки обработки варьируются",
    reasoning: "Это демонстрационный путь. Настройте OPENAI_API_KEY, чтобы получить персональный AI-анализ.",
  },
  uz: {
    pathwayName: "Umumiy ko'chish yo'li",
    eligibility: "Maqsad va fuqaroligingizga asoslanib mos kelishi mumkin — shaxsiy tahlil uchun OPENAI_API_KEY sozlang.",
    timeline: "3–9 oy",
    cost: "Davlatga qarab farq qiladi",
    doc: "Pasport, manzil tasdiqnomasi, mablag' tasdiqnomasi",
    pro: "Yaxshi hujjatlashtirilgan jarayon",
    con: "Ko'rib chiqish muddati har xil",
    reasoning: "Bu namunaviy yo'l. Shaxsiy AI tahlili uchun OPENAI_API_KEY sozlang.",
  },
  tr: {
    pathwayName: "Genel taşınma yolu",
    eligibility: "Hedefiniz ve vatandaşlığınıza göre uygun olabilir — kişisel analiz için OPENAI_API_KEY ayarlayın.",
    timeline: "3–9 ay",
    cost: "Ülkeye göre değişir",
    doc: "Pasaport, adres kanıtı, maddi durum kanıtı",
    pro: "İyi belgelenmiş süreç",
    con: "İşlem süreleri değişkendir",
    reasoning: "Bu bir demo yoldur. Kişisel AI analizi için OPENAI_API_KEY ayarlayın.",
  },
  tg: {
    pathwayName: "Роҳи умумии кӯчидан",
    eligibility: "Эҳтимол мувофиқи ҳадаф ва шаҳрвандии шумо — барои таҳлили шахсӣ OPENAI_API_KEY-ро танзим кунед.",
    timeline: "3–9 моҳ",
    cost: "Вобаста ба кишвар фарқ мекунад",
    doc: "Шиноснома, тасдиқи суроға, тасдиқи маблағ",
    pro: "Раванди хуб ҳуҷҷатгузоришуда",
    con: "Мӯҳлати коркард гуногун аст",
    reasoning: "Ин роҳи намунавист. Барои таҳлили шахсии AI OPENAI_API_KEY-ро танзим кунед.",
  },
};

function buildFallback(lang: Lang): RouteResult {
  const f = FALLBACK_TEXT[lang];
  const pathway: Pathway = {
    name: f.pathwayName,
    eligibility: f.eligibility,
    timeline: f.timeline,
    cost: f.cost,
    successProbability: 60,
    requiredDocuments: [f.doc],
    pros: [f.pro],
    cons: [f.con],
  };
  return { pathways: [pathway], recommended: pathway.name, reasoning: f.reasoning };
}

function buildUserPrompt(body: RouteRequestBody, lang: Lang): string {
  const citizenshipName = body.citizenship ? getCountryName(body.citizenship, "en") : "unspecified";
  const currentCountryName = body.current_country ? getCountryName(body.current_country, "en") : "unspecified";
  const destination = body.country ?? "unspecified";
  const goal = body.goal ?? "unspecified";
  const languageName = LANGUAGES.find((l) => l.code === lang)?.name ?? "English";

  return `User profile:\n- Citizenship: ${citizenshipName}\n- Current country of residence: ${currentCountryName}\n- Destination country: ${destination}\n- Goal in destination country: ${goal}\n- Respond in this language: ${languageName}\n\nAnalyze all available legal relocation pathways for this user and respond with the JSON object described in the system prompt.`;
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
    const parsed = JSON.parse(content) as RouteResult;
    if (!Array.isArray(parsed.pathways) || parsed.pathways.length === 0) {
      return NextResponse.json(buildFallback(lang));
    }
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json(buildFallback(lang));
  }
}
