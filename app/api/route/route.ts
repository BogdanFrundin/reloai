import { NextResponse } from "next/server";
import { citizenshipGroup, type CitizenshipGroup } from "../../_lib/citizenshipGroups";
import { generateRoutes } from "../../_lib/routeEngine";

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
  steps?: string[];
  bestFor?: string;
  badge?: string;
};

export type RouteEngineResult = {
  routes: Route[];
};

type RouteRequestBody = {
  citizenship?: string;
  citizenship_group?: CitizenshipGroup;
  goal?: string;
  goals?: string[];
  job_offer?: string;
  has_job_offer?: boolean;
  ukraine_scenario?: string;
  belarus_scenario?: string;
  georgia_scenario?: string;
  moldova_scenario?: string;
  uzbekistan_scenario?: string;
  turkey_scenario?: string;
};

// Deterministic, rule-based route generation — see app/_lib/routeEngine.ts.
// citizenship_group is preferred when given directly (matches what's stored
// on profiles); citizenship is accepted as a fallback so older callers that
// only know the raw country code still get a sensible result.
export async function POST(request: Request) {
  const body = (await request.json()) as RouteRequestBody;

  const group = body.citizenship_group ?? citizenshipGroup(body.citizenship);
  const hasJobOffer = body.has_job_offer ?? body.job_offer === "yes";

  const goals = body.goals?.length ? body.goals : body.goal ? [body.goal] : [];
  const routes = generateRoutes({
    citizenshipGroup: group,
    goals,
    hasJobOffer,
    ukraineScenario: body.ukraine_scenario,
    citizenship: body.citizenship,
    belarusScenario: body.belarus_scenario,
    georgiaScenario: body.georgia_scenario,
    moldovaScenario: body.moldova_scenario,
    uzbekistanScenario: body.uzbekistan_scenario,
    turkeyScenario: body.turkey_scenario,
  });
  return NextResponse.json({ routes } satisfies RouteEngineResult);
}
