import { supabase } from "../../lib/supabase";
import type { Dictionary } from "./i18n";

export type NotificationType = "welcome" | "checklist" | "document" | "inactivity" | "registration";

export type NotificationRow = {
  id: string;
  user_id: string;
  // Legacy rows created before the type+params rework store real text here
  // directly (in whatever language was active when they were created).
  // Rows created since then leave these null and are rendered from
  // `params` + the current UI language via getNotificationText() instead.
  title: string | null;
  message: string | null;
  params: Record<string, unknown> | null;
  type: string;
  read: boolean;
  created_at: string;
};

// Renders a notification's title/message in the current UI language. Known
// types are always rendered live from the i18n dictionary (so switching
// languages updates old notifications too, same as the rest of the site);
// unrecognized types or rows without params fall back to whatever text was
// stored on the row at creation time.
export function getNotificationText(
  item: Pick<NotificationRow, "type" | "params" | "title" | "message">,
  t: Dictionary,
): { title: string; message: string } {
  const n = t.notifications;
  const route = typeof item.params?.route === "string" ? item.params.route : "";

  switch (item.type) {
    case "registration":
      return { title: n.registrationTitle, message: n.registrationMessage };
    case "welcome":
      return { title: n.welcomeTitle, message: n.welcomeMessage.replace("{route}", route) };
    case "checklist":
      return { title: n.checklistTitle, message: n.checklistMessage.replace("{route}", route) };
    case "inactivity":
      return { title: n.inactivityTitle, message: n.inactivityMessage };
    case "document":
      return { title: n.documentTitle, message: n.documentMessage };
    default:
      return { title: item.title ?? "", message: item.message ?? "" };
  }
}

// Where clicking a notification of this type should navigate to.
const NOTIFICATION_ROUTES: Record<NotificationType, string> = {
  welcome: "/profile",
  checklist: "/dashboard",
  document: "/documents",
  inactivity: "/dashboard",
  registration: "/dashboard",
};

export function routeForNotification(type: string): string {
  return NOTIFICATION_ROUTES[type as NotificationType] ?? "/dashboard";
}

type CreateNotificationInput = {
  type: NotificationType;
  // e.g. { route: route.name } for welcome/checklist — see getNotificationText().
  params?: Record<string, unknown>;
};

// Fire-and-forget: notifications are a side effect of the real action
// (finishing onboarding, checking off a step, uploading a document) and
// must never block or fail that action. Title/message are no longer sent
// from here — they're rendered client-side from `type` + `params` in the
// user's current language (see getNotificationText above), so a
// notification always displays in whatever language the user has selected
// right now, not the language that was active when it was created.
export async function createNotification({ type, params }: CreateNotificationInput): Promise<void> {
  try {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (!token) return;

    await fetch("/api/notifications/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ type, params: params ?? {} }),
    });
  } catch (err) {
    console.error("Failed to create notification:", err);
  }
}

const RELATIVE_DIVISIONS: { amount: number; unit: Intl.RelativeTimeFormatUnit }[] = [
  { amount: 60, unit: "seconds" },
  { amount: 60, unit: "minutes" },
  { amount: 24, unit: "hours" },
  { amount: 7, unit: "days" },
  { amount: 4.34524, unit: "weeks" },
  { amount: 12, unit: "months" },
  { amount: Number.POSITIVE_INFINITY, unit: "years" },
];

export function formatTimeAgo(dateIso: string, lang: string): string {
  let formatter: Intl.RelativeTimeFormat;
  try {
    formatter = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
  } catch {
    formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  }

  let duration = (new Date(dateIso).getTime() - Date.now()) / 1000;

  for (const division of RELATIVE_DIVISIONS) {
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.unit);
    }
    duration /= division.amount;
  }
  return formatter.format(Math.round(duration), "years");
}
