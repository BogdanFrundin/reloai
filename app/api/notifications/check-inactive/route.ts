import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://fumsrsguidoytjgvewkk.supabase.co";

const INACTIVITY_DAYS = 7;

// Runs daily via the Vercel Cron entry in vercel.json. Vercel automatically
// sends "Authorization: Bearer $CRON_SECRET" on cron-triggered requests when
// CRON_SECRET is set, so this rejects anyone else who hits the route.
export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    return NextResponse.json({ error: "SUPABASE_SERVICE_ROLE_KEY is not configured" }, { status: 500 });
  }

  // Service role bypasses RLS — required here since this runs on a schedule,
  // not as any particular user's session.
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const cutoff = new Date(Date.now() - INACTIVITY_DAYS * 24 * 60 * 60 * 1000).toISOString();

  const { data: staleProfiles, error: profilesError } = await supabase
    .from("profiles")
    .select("id, last_active_at")
    .lt("last_active_at", cutoff);

  if (profilesError) {
    return NextResponse.json({ error: profilesError.message }, { status: 500 });
  }

  if (!staleProfiles || staleProfiles.length === 0) {
    return NextResponse.json({ notified: 0 });
  }

  // Don't re-notify someone who already got an inactivity nudge in the last
  // 7 days — otherwise a user who never comes back gets one every single day.
  const { data: recentReminders, error: remindersError } = await supabase
    .from("notifications")
    .select("user_id")
    .eq("type", "inactivity")
    .gt("created_at", cutoff);

  if (remindersError) {
    return NextResponse.json({ error: remindersError.message }, { status: 500 });
  }

  const alreadyNotified = new Set((recentReminders ?? []).map((row) => row.user_id));
  const toNotify = staleProfiles.filter((profile) => !alreadyNotified.has(profile.id));

  if (toNotify.length === 0) {
    return NextResponse.json({ notified: 0 });
  }

  const { error: insertError } = await supabase.from("notifications").insert(
    toNotify.map((profile) => ({
      user_id: profile.id,
      title: "Не забывайте о вашем плане переезда",
      message: "Вернитесь, чтобы продолжить с того места, где остановились.",
      type: "inactivity",
    })),
  );

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ notified: toNotify.length });
}
