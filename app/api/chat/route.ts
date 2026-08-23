import { NextResponse } from "next/server";
import { DEFAULT_LANG, LANGUAGES, dictionaries, type Lang } from "../../_lib/i18n";
import { getCountryName } from "../../_lib/countries";

const SYSTEM_PROMPT =
  "You are ReloAI assistant helping people relocate to Poland, Germany and Spain. Answer questions about documents, housing, banks, medicine, work. Be concise, helpful and friendly. Always respond in the same language the user writes in. For Poland focus on: PESEL, Karta Pobytu, ZUS, NFZ, mBank, PKO BP. For Germany: Anmeldung, Aufenthaltstitel, TK insurance. For Spain: NIE, empadronamiento, Seguridad Social. Format answers as a short intro sentence followed by bullet points, one per line, each starting with '- '. Keep each bullet short and actionable.";

// Facts about the ReloAI site itself (pages, flows, pricing) so the
// assistant can answer questions like "how do I register on this site" or
// "where do I find X" accurately instead of guessing/hallucinating generic
// instructions for some unrelated "official migrant website".
const SITE_KNOWLEDGE = `
You are embedded directly inside the ReloAI website itself — when a user asks how to do something "on this site" or "here", answer using the exact facts below, not generic guesses about official government sites or other services.

REGISTRATION & LOGIN ON THIS SITE:
- New users sign up at /register with name, email and password, or with one click via Google sign-up.
- After signing up they are sent to /onboarding: a short questionnaire (citizenship, destination country/city, purpose of the move, job offer status, timeline).
- Onboarding ends on /onboarding/results, where the user picks one of several AI-generated relocation routes tailored to their answers. Picking a route creates their personalized roadmap/checklist.
- Returning users log in at /login. A user can redo onboarding later to regenerate their roadmap.

DASHBOARD PAGES (after login):
- /home — main dashboard: personalized step-by-step roadmap/checklist with progress tracking.
- /documents — library of official government document guides (visas, PESEL, karta pobytu, NIP, PIT tax forms, meldunek, etc.). Many have a downloadable blank PDF; some have a "Заполнить с ИИ" (AI-fill) button that auto-fills the blank PDF using the user's saved profile data (name, PESEL, address, etc. — edited once, reused everywhere).
- /housing — rental districts and housing guidance by city.
- /banks — bank comparison and recommendations, with filters.
- /insurance — insurance guides (health, car, home, travel).
- /medicine — clinics directory and healthcare guidance, with an AI search box.
- /education — schools/university guidance, with an AI search assistant.
- /work — salary database (~200 professions) and job-market info.
- /profile — the user's personal data, citizenship, selected relocation route, subscription plan, and the document auto-fill profile (PESEL, passport, address, etc.).
- /settings — account settings, interface language, and currency display (PLN/EUR/USD).
- /dashboard/ai — this same AI assistant as a full-screen chat page.

PUBLIC/MARKETING PAGES: / (landing page), /pricing, /community.

PRICING PLANS (shown on /pricing, managed from /profile):
- Free — €0 forever: visa eligibility check, basic document checklist, limited AI chat (10 messages/month), country overview guides.
- Premium — €29/month: everything in Free, plus unlimited AI chat, personalized roadmap & deadlines, housing & banking assistant, email support.
- Pro — €49/month: everything in Premium, plus multi-person profiles, human expert document review, priority support, employer relocation letters.
Subscriptions can be cancelled anytime from /profile with no penalty; access continues until the end of the paid period, then the account reverts to Free. All saved data and documents are kept.

SUPPORTED DESTINATION COUNTRIES: Poland, Germany, Spain (Poland currently has the deepest content: documents, housing, banks, taxes).

If you don't know a specific detail about the site (e.g. an exact button label), say so plainly instead of inventing steps — do not describe generic "official government portal" registration flows when asked about registering or using ReloAI itself.
`;

type IncomingMessage = { from: "user" | "ai"; text: string };

type ProfileContext = {
  country?: string | null;
  city?: string | null;
  citizenship?: string | null;
  currentLocation?: string | null;
  goal?: string | null;
  jobOffer?: string | null;
  alreadyAdmitted?: string | null;
  selectedRoute?: string | null;
  checklistStep?: string | null;
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
  if (profile.selectedRoute) {
    parts.push(`chose the "${profile.selectedRoute}" relocation route`);
  }
  if (profile.checklistStep) {
    parts.push(`is currently on checklist step: ${profile.checklistStep}`);
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
    { role: "system", content: SYSTEM_PROMPT + SITE_KNOWLEDGE + buildProfileContext(profile ?? null) },
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
