import { supabase } from "../../lib/supabase";
import { createNotification } from "./notifications";
import type { Route } from "../api/route/route";
import type { Profile } from "../_components/AuthProvider";

// Everything that has to happen when a user (re)picks a route — on
// /onboarding/results right after the questionnaire, or later from the
// RouteSelectModal opened off /profile. Pulled into one place so both
// callers save the route, regenerate the personalized roadmap, and fire the
// right notification identically instead of maintaining two copies that can
// drift apart.
export async function applySelectedRoute({
  userId,
  profile,
  route,
  lang,
}: {
  userId: string;
  profile: Pick<
    Profile,
    "citizenship" | "current_country" | "country" | "city" | "goal" | "selected_route"
  > | null;
  route: Route;
  lang: string;
}): Promise<void> {
  // A user who already has a selected_route has been through onboarding
  // before -- they're redoing/recreating their roadmap, not registering
  // for the first time. Capture this before we overwrite selected_route
  // below, so the notification wording matches what actually happened.
  const isFirstOnboarding = !profile?.selected_route;

  const { error: saveError } = await supabase
    .from("profiles")
    .update({ selected_route: route, route_steps: route.steps ?? [] })
    .eq("id", userId);
  if (saveError) {
    // This used to be fire-and-forget -- a failed write (bad RLS policy,
    // schema drift, etc.) would silently leave selected_route unset while
    // the rest of this function carried on as if it had saved, which is
    // exactly the "I picked a route but /profile still says none chosen"
    // bug this is fixing. Surface it so the caller's catch block shows the
    // real error instead of pretending the save worked.
    console.error("Failed to save selected_route:", saveError);
    throw saveError;
  }

  // Generate the user's real, personalized step-by-step plan right now (not
  // just the 3-option route summary) so it's already sitting on their
  // profile and driving the dashboard roadmap the moment they land on
  // /home — see app/api/roadmap and DashboardProgressProvider.
  try {
    const roadmapResponse = await fetch("/api/roadmap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        citizenship: profile?.citizenship,
        current_country: profile?.current_country,
        country: profile?.country,
        city: profile?.city,
        goal: profile?.goal,
        selected_route: route,
        language: lang,
      }),
    });
    if (roadmapResponse.ok) {
      const plan = await roadmapResponse.json();
      // Clear roadmap_completed_steps along with the new plan — those IDs
      // are generated fresh by the AI each time and won't match the old
      // plan's step IDs, so leaving stale ones behind just orphans them and
      // makes progress silently look reset without explanation.
      await supabase.from("profiles").update({ roadmap_plan: plan, roadmap_completed_steps: [] }).eq("id", userId);
    }
  } catch (roadmapErr) {
    // Non-fatal — the dashboard falls back to the static checklist if
    // roadmap_plan never gets set, so don't block the selection on this.
    console.error("Failed to generate personalized roadmap:", roadmapErr);
  }

  if (isFirstOnboarding) {
    // The "welcome / thanks for registering" notification already fired
    // once at account creation (see app/register/page.tsx) -- this one is
    // about finishing the onboarding questionnaire, not registering.
    createNotification({ type: "welcome", params: { route: route.name } });
  } else {
    createNotification({ type: "checklist", params: { route: route.name } });
  }
}
