import { NextResponse } from "next/server";
import { DEFAULT_LANG, LANGUAGES, dictionaries, type Lang } from "../../_lib/i18n";
import { getCountryName } from "../../_lib/countries";
import { buildChecklistSteps, buildPhases, type PhaseKey } from "../../_lib/checklist";
import { isGeneratedRoadmapPlan, type GeneratedRoadmapPlan } from "../../_lib/generatedRoadmap";
import type { Route } from "../route/route";

type RoadmapRequestBody = {
  citizenship?: string;
  current_country?: string;
  country?: string;
  city?: string;
  goal?: string;
  selected_route?: Route | null;
  language?: string;
};

const SYSTEM_PROMPT =
  'You are a relocation expert. Based on the user profile provided, generate a complete, realistic, personalized step-by-step relocation roadmap for this exact person — organized into phases you choose based on their situation (e.g. before departure, legal entry, residence registration, work/tax setup, housing, etc. — not a fixed template, pick what actually applies). Respond ONLY with a JSON object, no markdown, no commentary, matching this TypeScript type: { "phases": { "key": string (short lowercase slug, e.g. "before_departure"), "title": string, "steps": { "id": string (short lowercase slug, unique across the whole plan), "title": string, "description": string (1-2 sentences, specific and actionable, not generic) }[] }[] }. Produce 3 to 6 phases in chronological order, each with 2 to 6 steps. Reference real, concrete procedures for the destination country (visa/residence permit type, national ID/tax number, bank account opening, address registration, work authorization, etc. as applicable) tailored to this person\'s citizenship and goal — do not write generic filler. All text (title, description) must be written in the user\'s selected language.';

function resolveLang(raw: unknown): Lang {
  return typeof raw === "string" && LANGUAGES.some((l) => l.code === raw) ? (raw as Lang) : DEFAULT_LANG;
}

function buildUserPrompt(body: RoadmapRequestBody, lang: Lang): string {
  const citizenshipName = body.citizenship ? getCountryName(body.citizenship, "en") : "unspecified";
  const currentCountryName = body.current_country ? getCountryName(body.current_country, "en") : "unspecified";
  const destination = body.country ?? "unspecified";
  const city = body.city ?? "unspecified";
  const goal = body.goal ?? "unspecified";
  const languageName = LANGUAGES.find((l) => l.code === lang)?.name ?? "English";
  const routeContext = body.selected_route
    ? ` The user already chose this relocation route: "${body.selected_route.name}" — ${body.selected_route.description}. Build the roadmap consistent with this route.`
    : "";

  return `User profile: citizenship=${citizenshipName}, currently in=${currentCountryName}, wants to move to=${destination} (city: ${city}), goal=${goal}.${routeContext} Respond in this language: ${languageName}.`;
}

// Reuses the same hand-written, fully-translated static checklist (see
// app/_lib/checklist.ts) as the fallback when there's no OPENAI_API_KEY or
// the AI call fails — degrades to the old generic template instead of
// leaving the user with nothing.
function buildFallback(body: RoadmapRequestBody, lang: Lang): GeneratedRoadmapPlan {
  const dict = dictionaries[lang];
  const steps = buildChecklistSteps(dict, body.country, body.goal, body.citizenship);
  const titles: Record<PhaseKey, string> = {
    beforeDeparture: dict.dashboard.phases.beforeDeparture,
    legalization: dict.dashboard.phases.legalization,
    residenceCard: dict.dashboard.phases.residenceCard,
    workTaxes: dict.dashboard.phases.workTaxes,
  };
  const phases = buildPhases(steps, titles);

  return {
    phases: phases.map((phase) => ({
      key: phase.key,
      title: phase.title,
      steps: phase.steps.map((step) => ({
        id: step.documentType,
        title: step.title,
        description: step.description,
      })),
    })),
  };
}

const OPENAI_TIMEOUT_MS = 20000;

export async function POST(request: Request) {
  const body = (await request.json()) as RoadmapRequestBody;
  const lang = resolveLang(body.language);
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(buildFallback(body, lang));
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
            { role: "user", content: buildUserPrompt(body, lang) },
          ],
          temperature: 0.4,
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
      return NextResponse.json(buildFallback(body, lang));
    }

    const data = await response.json();
    const content: string | undefined = data.choices?.[0]?.message?.content;
    if (!content) {
      return NextResponse.json(buildFallback(body, lang));
    }

    const parsed = JSON.parse(content);
    if (!isGeneratedRoadmapPlan(parsed)) {
      return NextResponse.json(buildFallback(body, lang));
    }
    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Roadmap engine failed, falling back to static checklist:", err);
    return NextResponse.json(buildFallback(body, lang));
  }
}
