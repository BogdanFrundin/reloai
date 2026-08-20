import { NextResponse } from "next/server";

type EducationTab = "courses" | "schools" | "kindergartens" | "universities";
type Ownership = "государственный" | "частный";

type EducationSearchBody = {
  query?: string;
  language?: string;
};

type EducationSearchResult = {
  tab: EducationTab | null;
  ownership: Ownership | null;
  keywords: string[];
  reply: string;
};

const TABS: EducationTab[] = ["courses", "schools", "kindergartens", "universities"];
const OWNERSHIPS: Ownership[] = ["государственный", "частный"];

function isEducationSearchResult(value: unknown): value is EducationSearchResult {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    (v.tab === null || (typeof v.tab === "string" && TABS.includes(v.tab as EducationTab))) &&
    (v.ownership === null || (typeof v.ownership === "string" && OWNERSHIPS.includes(v.ownership as Ownership))) &&
    Array.isArray(v.keywords) &&
    v.keywords.every((k) => typeof k === "string") &&
    typeof v.reply === "string"
  );
}

// The education database (audience/languages/programs/highlights/features) is
// stored in Russian regardless of the site's UI language, so we always ask
// the model to infer Russian keywords, but reply in whatever language the
// user should see the confirmation message in.
const SYSTEM_PROMPT =
  'You help match a person\'s free-text description of the kind of educational institution they are looking for in Poland (language courses, school, kindergarten, or university) to fields in a database. Respond ONLY with a JSON object, no markdown, no commentary, matching this TypeScript type: { "tab": "courses" | "schools" | "kindergartens" | "universities" | null, "ownership": "государственный" | "частный" | null, "keywords": string[], "reply": string }. "tab" meanings: "courses" = языковые курсы (language courses), "schools" = школа, "kindergartens" = детский сад, "universities" = университет. Pick the ONE tab that best matches the request, or null if the request is unclear or spans multiple types. "ownership": "государственный" if the person wants a free/state-funded option, "частный" if they explicitly want a private/paid option, or null if unspecified. "keywords" is 1 to 5 short Russian words or phrases (subjects, languages, program names, target audience, e.g. "английский язык", "IT", "инженерия", "для взрослых", "музыка") useful for substring-matching against program/audience/language/highlight fields in the database — infer these in Russian even if the user wrote in a different language. "reply" is one short, warm sentence (no more than ~20 words) explaining what was found or recommended, written in the requested reply language.';

function buildUserPrompt(query: string, replyLang: string): string {
  return `Person's request: "${query}"\n\nReply language: ${replyLang}`;
}

const OPENAI_TIMEOUT_MS = 15000;

function naiveFallback(query: string): EducationSearchResult {
  const trimmed = query.trim();
  const keywords = trimmed
    .toLowerCase()
    .split(/[\s,.;!?]+/)
    .filter((w) => w.length > 2)
    .slice(0, 5);

  return {
    tab: null,
    ownership: null,
    keywords: keywords.length > 0 ? keywords : [trimmed].filter(Boolean),
    reply: `Показываем варианты, которые могут подойти по запросу «${trimmed}».`,
  };
}

export async function POST(request: Request) {
  const body = (await request.json()) as EducationSearchBody;
  const query = (body.query ?? "").trim();
  const language = typeof body.language === "string" ? body.language : "ru";

  if (!query) {
    return NextResponse.json({ tab: null, ownership: null, keywords: [], reply: "" } satisfies EducationSearchResult);
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
            { role: "user", content: buildUserPrompt(query, language) },
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
    if (!isEducationSearchResult(parsed)) {
      return NextResponse.json(naiveFallback(query));
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Education search engine failed, falling back to naive keyword search:", err);
    return NextResponse.json(naiveFallback(query));
  }
}
