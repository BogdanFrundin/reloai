import { supabase } from "../../lib/supabase";

export type NotificationType = "welcome" | "checklist" | "document" | "inactivity";

export type NotificationRow = {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
};

// Where clicking a notification of this type should navigate to.
const NOTIFICATION_ROUTES: Record<NotificationType, string> = {
  welcome: "/dashboard",
  checklist: "/dashboard",
  document: "/documents",
  inactivity: "/dashboard",
};

export function routeForNotification(type: string): string {
  return NOTIFICATION_ROUTES[type as NotificationType] ?? "/dashboard";
}

type CreateNotificationInput = {
  title: string;
  message: string;
  type: NotificationType;
};

// Fire-and-forget: notifications are a side effect of the real action
// (finishing onboarding, checking off a step, uploading a document) and
// must never block or fail that action.
export async function createNotification({ title, message, type }: CreateNotificationInput): Promise<void> {
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
      body: JSON.stringify({ title, message, type }),
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
