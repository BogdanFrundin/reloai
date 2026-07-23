import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://fumsrsguidoytjgvewkk.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_vhiLfwZUOEEdprJc9Al5wA_ujzqi5---9Q94ckMBmU";

const ALLOWED_TYPES = ["welcome", "checklist", "document", "inactivity"] as const;

type CreateNotificationBody = {
  title?: string;
  message?: string;
  type?: string;
};

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace(/^Bearer\s+/i, "").trim();
  if (!token) {
    return NextResponse.json({ error: "Missing Authorization bearer token" }, { status: 401 });
  }

  const body = (await request.json()) as CreateNotificationBody;
  const { title, message, type } = body;

  if (!title || !type || !(ALLOWED_TYPES as readonly string[]).includes(type)) {
    return NextResponse.json({ error: "title and a valid type are required" }, { status: 400 });
  }

  // Scope this client to the caller's own session so RLS's
  // "auth.uid() = user_id" insert policy applies — no service role needed.
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  });

  const { data: userData, error: userError } = await supabase.auth.getUser(token);
  if (userError || !userData.user) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("notifications")
    .insert({
      user_id: userData.user.id,
      title,
      message: message ?? "",
      type,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ notification: data });
}
