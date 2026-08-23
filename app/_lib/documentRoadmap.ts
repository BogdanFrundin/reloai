// Builds the personalized, numbered document timeline shown on both the
// dashboard roadmap (app/dashboard) and the documents page (/documents) from
// the document_guides matrix — the single source of truth for both pages, so
// they always agree on which documents apply, in what order, and when
// they're due. See app/_lib/documentTiming.ts for the date/section math.
import type { DocumentGuide, GuideFilterContext } from "../_components/DocumentGuideList";
import { guideAppliesTo } from "../_components/DocumentGuideList";
import { guidePassesRouteGate } from "./routeDocumentGate";
import {
  SECTION_ORDER,
  SECTION_TITLES,
  computeStartDate,
  formatDateRu,
  hasFutureMoveDate,
  parseTiming,
  type TimelineSection,
} from "./documentTiming";
import type { ChecklistStepDef, Phase } from "./checklist";

export type DocumentRoadmapEntry = {
  guide: DocumentGuide;
  stepNumber: number;
  section: TimelineSection;
  timingLabel: string;
  dateLabel?: string;
  offsetDays: number | null;
  urgency?: "urgent" | "upcoming" | "future";
  warning?: string;
};

export type DocumentRoadmapSection = {
  key: TimelineSection;
  title: string;
  entries: DocumentRoadmapEntry[];
};

function urgencyFor(date: Date | null): "urgent" | "upcoming" | "future" | undefined {
  if (!date) return undefined;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Math.round((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (days <= 3) return "urgent";
  if (days <= 30) return "upcoming";
  return "future";
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function compareEntries(a: { section: TimelineSection; offsetDays: number | null; guide: DocumentGuide }, b: typeof a): number {
  const sectionDiff = SECTION_ORDER.indexOf(a.section) - SECTION_ORDER.indexOf(b.section);
  if (sectionDiff !== 0) return sectionDiff;
  const aOffset = a.offsetDays ?? Infinity;
  const bOffset = b.offsetDays ?? Infinity;
  if (aOffset !== bOffset) return aOffset - bOffset;
  const aStep = a.guide.step_order ?? Infinity;
  const bStep = b.guide.step_order ?? Infinity;
  if (aStep !== bStep) return aStep - bStep;
  return a.guide.name.localeCompare(b.guide.name, "ru");
}

export function buildDocumentRoadmap(
  guides: DocumentGuide[],
  ctx: GuideFilterContext,
  routeSteps: string[] | null | undefined,
  timeline: string | null | undefined,
): DocumentRoadmapSection[] {
  const startDate = computeStartDate(timeline);
  const showBeforeDeparture = hasFutureMoveDate(timeline);

  const withTiming = guides
    .filter((g) => guideAppliesTo(g, ctx))
    .filter((g) => guidePassesRouteGate(g.name, routeSteps))
    .map((guide) => {
      const parsed = parseTiming(guide.timing);
      return { guide, ...parsed };
    })
    .filter((e) => e.section !== "before_departure" || showBeforeDeparture)
    .sort(compareEntries);

  const entries: DocumentRoadmapEntry[] = withTiming.map((e, index) => {
    const exactDate = !e.recurring && startDate && e.offsetDays !== null ? addDays(startDate, e.offsetDays) : null;
    return {
      guide: e.guide,
      stepNumber: index + 1,
      section: e.section,
      timingLabel: e.label || SECTION_TITLES[e.section],
      dateLabel: exactDate ? formatDateRu(exactDate) : undefined,
      offsetDays: e.offsetDays,
      urgency: urgencyFor(exactDate),
      warning: e.urgent ? e.guide.important_2026 ?? "Подавайте как можно скорее — сроки ожидания могут быть долгими." : undefined,
    };
  });

  return SECTION_ORDER.map((key) => ({
    key,
    title: SECTION_TITLES[key],
    entries: entries.filter((e) => e.section === key),
  })).filter((section) => section.entries.length > 0);
}

// Adapts the document roadmap into the same Phase[] shape PhaseCard /
// PhaseStepper already render for the AI plan and static checklist, so the
// dashboard roadmap page doesn't need a separate rendering path.
export function documentRoadmapToPhases(sections: DocumentRoadmapSection[]): Phase[] {
  return sections.map((section) => ({
    key: section.key,
    title: section.title,
    steps: section.entries.map(
      (entry): ChecklistStepDef => ({
        documentType: `guide-${entry.guide.id}`,
        title: entry.guide.name,
        description: entry.timingLabel,
        phase: section.key,
        stepNumber: entry.stepNumber,
        dateLabel: entry.dateLabel,
        warning: entry.warning,
        urgency: entry.urgency,
        linkToDocuments: true,
        linkAnchor: `guide-${entry.guide.id}`,
      }),
    ),
  }));
}
