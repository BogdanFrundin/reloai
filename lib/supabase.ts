import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://fumsrsguidoytjgvewkk.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_vhiLfwZUOEEdprJc9Al5wA_ujzqi5---9Q94ckMBmU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);