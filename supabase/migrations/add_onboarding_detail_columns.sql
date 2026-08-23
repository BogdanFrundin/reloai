-- Onboarding asks these questions (see app/onboarding/page.tsx) and the app
-- already reads/writes them on the profiles row (see the Profile type in
-- app/_components/AuthProvider.tsx), but the columns were never added to
-- schema.sql/a migration — so on a fresh database these updates fail. In
-- particular, "timeline" (the "when do you plan to move?" answer) is what
-- the dashboard roadmap page's document timeline (app/_lib/routeTimeline.ts)
-- anchors its dates on.
-- NOTE: migrations in this folder are not auto-applied — run this manually in
-- the Supabase SQL Editor.
alter table public.profiles add column if not exists study_level text;
alter table public.profiles add column if not exists business_type text;
alter table public.profiles add column if not exists family_member_type text;
alter table public.profiles add column if not exists has_children text;
alter table public.profiles add column if not exists has_foreign_employer text;
alter table public.profiles add column if not exists will_register_ip text;
alter table public.profiles add column if not exists timeline text;
alter table public.profiles add column if not exists has_car text;
