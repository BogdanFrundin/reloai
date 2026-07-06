import { NextResponse } from "next/server";
import { DEFAULT_LANG, LANGUAGES, dictionaries, type Lang } from "../../_lib/i18n";
import { getCountryName } from "../../_lib/countries";

const SYSTEM_PROMPT =
  "You are ReloAI assistant helping people relocate to Poland, Germany and Spain. Answer questions about documents, housing, banks, medicine, work. Be concise, helpful and friendly. Always respond in the same language the user writes in. For Poland focus on: PESEL, Karta Pobytu, ZUS, NFZ, mBank, PKO BP. For Germany: Anmeldung, Aufenthaltstitel, TK insurance. For Spain: NIE, empadronamiento, Seguridad Social. Format answers as a short intro sentence followed by bullet points, one per line, each starting with '- '. Keep each bullet short and actionable.";

type IncomingMessage = { from: "user" | "ai"; text: string };

type ProfileContext = {
  country?: string | null;
  city?: string | null;
  citizenship?: string | null;
  currentLocation?: string | null;
  goal?: string | null;
  jobOffer?: string | null;
  alreadyAdmitted?: string | null;
  recommendedPathway?: string | null;
} | null;

function buildProfileContext(profile: ProfileContext): string {
  if (!profile) return "";
  const parts: string[] = [];

  if (profile.country) {
    parts.push(`is relocating to ${profile.country}${profile.city ? ` (city: ${profile.city})` : ""}`);
  }
  if (profile.citizenship) parts.push(`holds ${getCountryName(profile.citizenship, "en")} citizenship`);
  if (profile.currentLocation) parts.push(`currently resides in ${getCountryName(profile.currentLocation, "en")}`);
  if (profile.goal) {
    let goalText = `main goal is ${profile.goal}`;
    if (profile.goal === "work" && profile.jobOffer) goalText += ` (has a job offer: ${profile.jobOffer})`;
    if (profile.goal === "study" && profile.alreadyAdmitted) goalText += ` (already admitted: ${profile.alreadyAdmitted})`;
    parts.push(goalText);
  }
  if (profile.recommendedPathway) {
    parts.push(`their recommended relocation pathway is "${profile.recommendedPathway}"`);
  }

  if (parts.length === 0) return "";
  return ` The current user's profile: ${parts.join("; ")}. Tailor your advice to this specific situation instead of giving generic answers.`;
}

const KEYWORDS: Record<"pesel" | "bank" | "housing" | "documents" | "visa", string[]> = {
  pesel: ["pesel"],
  bank: ["bank", "банк", "bonk"],
  housing: ["housing", "жиль", "жилье", "uy-joy", "uyjoy", "konut", "манзил"],
  documents: ["document", "докумен", "hujjat", "belge", "ҳуҷҷат"],
  visa: ["visa", "виза", "viza", "vize", "раводид"],
};

function resolveLang(raw: unknown): Lang {
  return typeof raw === "string" && LANGUAGES.some((l) => l.code === raw) ? (raw as Lang) : DEFAULT_LANG;
}

function getMockReply(userMessage: string, lang: Lang): string {
  const msg = userMessage.toLowerCase();
  const fallback = dictionaries[lang].aiChat.fallback;

  for (const key of Object.keys(KEYWORDS) as (keyof typeof KEYWORDS)[]) {
    if (KEYWORDS[key].some((kw) => msg.includes(kw))) {
      return fallback[key];
    }
  }

  return fallback.default;
}

export async function POST(request: Request) {
  const { messages, lang: rawLang, profile } = (await request.json()) as {
    messages: IncomingMessage[];
    lang?: string;
    profile?: ProfileContext;
  };
  const lang = resolveLang(rawLang);
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    const lastUserMessage = [...messages].reverse().find((message) => message.from === "user");
    return NextResponse.json({ reply: getMockReply(lastUserMessage?.text ?? "", lang) });
  }

  const openaiMessages = [
    { role: "system", content: SYSTEM_PROMPT + buildProfileContext(profile ?? null) },
    ...messages.map((message) => ({
      role: message.from === "user" ? "user" : "assistant",
      content: message.text,
    })),
  ];

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: openaiMessages,
      temperature: 0.6,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json({ error: `OpenAI error: ${errorText}` }, { status: 502 });
  }

  const data = await response.json();
  const reply: string = data.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";

  return NextResponse.json({ reply });
}
