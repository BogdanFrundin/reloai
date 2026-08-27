// Ties the /documents guide list to whichever specific route variant the
// user picked at /onboarding/results (see app/_lib/routeEngine.ts).
//
// Within the same citizenship group + goal, generateRoutes() can offer 1-3
// alternative legal paths (e.g. "ИП (JDG)" vs "ООО", "с оффером" vs "без
// оффера", "Быстрый" vs "Стандартный"). Those alternatives differ mainly in
// a handful of documents/steps that only belong to ONE branch (you either
// register a JDG or a Sp. z o.o., never both). Most documents in the guide
// list (passport translation, apostille, SIM card, rental paperwork, EKUZ,
// driver's license exchange, etc.) aren't tied to a specific route branch at
// all and should stay visible regardless of which route was chosen.
//
// This function is intentionally conservative: a document is only ever
// hidden if its name clearly matches one branch of a known alternative AND
// the user's selected route's `steps` don't mention that branch. Everything
// else (including guides that don't match any rule) stays visible, same as
// before this feature existed. If the user hasn't picked a route yet
// (`routeSteps` empty/undefined), nothing is gated.
const CONDITIONAL_DOC_RULES: { docMarker: string; requireStepMarker: string }[] = [
  // Business form: self-employment (JDG/ИП) vs company (Sp. z o.o./ООО).
  { docMarker: "регистрация ип", requireStepMarker: "регистрация ип" },
  { docMarker: "регистрация ооо", requireStepMarker: "регистрация ооо" },
  { docMarker: "regon", requireStepMarker: "regon" },
  { docMarker: "vat регистрация", requireStepMarker: "vat" },
  { docMarker: "печать компании", requireStepMarker: "регистрация ооо" },
  // NOTE: there used to be a rule here gating "Разрешение на работу тип A"
  // on a "тип a" step marker. The current routeEngine.ts specs (offer vs
  // no-offer branches for group B + goal=work) never emit that marker text
  // in any route's steps, so the rule always evaluated to "hide" and
  // permanently removed that document for every user. Removed rather than
  // re-targeted: there's no reliable step-level signal left to distinguish
  // the two work-permit branches, so this doc now falls back to the default
  // (always visible), same as most other guides.
  { docMarker: "заявление о намерении доверить работу", requireStepMarker: "разрешение на работу" },
  // Ukraine temporary-protection fast track vs the full karta pobytu track.
  { docMarker: "временная защита", requireStepMarker: "временная защита" },
  // NFZ public insurance only appears as an explicit step on the "full
  // legalization" branches, not the fast tracks.
  { docMarker: "регистрация в nfz", requireStepMarker: "nfz" },
];

function stepsInclude(steps: string[] | null | undefined, marker: string): boolean {
  if (!steps) return false;
  const m = marker.toLowerCase();
  return steps.some((s) => s.toLowerCase().includes(m));
}

export function guidePassesRouteGate(docName: string, routeSteps: string[] | null | undefined): boolean {
  // No route chosen yet (or nothing to gate against) — don't hide anything.
  if (!routeSteps || routeSteps.length === 0) return true;

  const name = docName.toLowerCase();
  for (const rule of CONDITIONAL_DOC_RULES) {
    if (name.includes(rule.docMarker) && !stepsInclude(routeSteps, rule.requireStepMarker)) {
      return false;
    }
  }
  return true;
}
