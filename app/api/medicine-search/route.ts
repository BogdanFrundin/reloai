import { NextResponse } from "next/server";

type MedicineSearchBody = {
  query?: string;
  categories?: string[];
  language?: string;
};

type MedicineSearchResult = {
  category: string | null;
  keywords: string[];
  reply: string;
};

function isMedicineSearchResult(value: unknown): value is MedicineSearchResult {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    (v.category === null || typeof v.category === "string") &&
    Array.isArray(v.keywords) &&
    v.keywords.every((k) => typeof k === "string") &&
    typeof v.reply === "string"
  );
}

// The clinics database (name/category/description/specializations) is stored
// in Russian regardless of the site's UI language, so we always ask the model
// to infer Russian category/keywords, but reply in whatever language the user
// should see the confirmation message in.
const SYSTEM_PROMPT =
  'You help match a patient\'s free-text description of a health problem, or the kind of doctor/clinic they are looking for, to a fixed list of clinic categories in a Polish city. The category names are given in Russian, since that is how the underlying clinic database is stored. Respond ONLY with a JSON object, no markdown, no commentary, matching this TypeScript type: { "category": string | null, "keywords": string[], "reply": string }. "category" must be EXACTLY one of the provided category strings, copied verbatim, or null if no single category clearly fits the request (e.g. a vague, unrelated, or general question) — never invent a category that is not in the list. "keywords" is 1 to 5 short Russian words or phrases (medical terms, symptoms, specializations, e.g. "беременность", "перелом", "аллергия") useful for substring-matching against clinic names/descriptions/specializations in the database — infer these in Russian even if the user wrote in a different language. "reply" is one short, warm sentence (no more than ~20 words) explaining what was found or recommended, written in the requested reply language.';

function buildUserPrompt(query: string, categories: string[], replyLang: string): string {
  return `Patient's request: "${query}"\n\nAvailable categories (choose one verbatim, or null): ${JSON.stringify(categories)}\n\nReply language: ${replyLang}`;
}

const OPENAI_TIMEOUT_MS = 15000;

function naiveFallback(query: string): MedicineSearchResult {
  const trimmed = query.trim();
  const keywords = trimmed
    .toLowerCase()
    .split(/[\s,.;!?]+/)
    .filter((w) => w.length > 2)
    .slice(0, 5);

  return {
    category: null,
    keywords: keywords.length > 0 ? keywords : [trimmed].filter(Boolean),
    reply: `Показываем клиники, которые могут подойти по запросу «${trimmed}».`,
  };
}

export async function POST(request: Request) {
  const body = (await request.json()) as MedicineSearchBody;
  const query = (body.query ?? "").trim();
  const categories = Array.isArray(body.categories) ? body.categories.filter((c) => typeof c === "string") : [];
  const language = typeof body.language === "string" ? body.language : "ru";

  if (!query) {
    return NextResponse.json({ category: null, keywords: [], reply: "" } satisfies MedicineSearchResult);
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(naiveFallback(query));
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), OPENAI_TIMEOUT_MS);

    let response: Response;
    try {
      response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: buildUserPrompt(query, categories, language) },
          ],
          temperature: 0.3,
          response_format: { type: "json_object" },
        }),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OpenAI error (${response.status}): ${errorText}`);
      return NextResponse.json(naiveFallback(query));
    }

    const data = await response.json();
    const content: string | undefined = data.choices?.[0]?.message?.content;
    if (!content) {
      return NextResponse.json(naiveFallback(query));
    }

    const parsed = JSON.parse(content);
    if (!isMedicineSearchResult(parsed)) {
      return NextResponse.json(naiveFallback(query));
    }

    // Guard against the model inventing a category that wasn't in the list we gave it.
    if (parsed.category && !categories.includes(parsed.category)) {
      parsed.category = null;
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Medicine search engine failed, falling back to naive keyword search:", err);
    return NextResponse.json(naiveFallback(query));
  }
}
