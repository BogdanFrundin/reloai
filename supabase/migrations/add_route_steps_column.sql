-- Stores the step names of the user's selected relocation route as its own
-- array column (alongside the full route object in selected_route), so the
-- steps can be queried/filtered without unpacking JSON. Set by
-- app/onboarding/results/page.tsx when the user picks a route from
-- app/_lib/routeEngine.ts.
-- NOTE: migrations in this folder are not auto-applied — run this manually in
-- the Supabase SQL Editor.
alter table public.profiles add column if not exists route_steps text[] default '{}';
