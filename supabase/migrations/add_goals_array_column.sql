-- Onboarding now supports selecting more than one goal (see the "goal" step
-- in app/onboarding/page.tsx and Profile.goals in app/_components/AuthProvider.tsx).
-- The app already writes `goals` on every profiles upsert from that step
-- onward; without this column that upsert fails outright (PostgREST rejects
-- unknown columns), silently breaking onboarding persistence for every user
-- past the goal step, not just the multi-select feature itself.
-- NOTE: migrations in this folder are not auto-applied — run this manually in
-- the Supabase SQL Editor.
alter table public.profiles add column if not exists goals text[];
