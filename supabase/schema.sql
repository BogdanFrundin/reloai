-- ReloAI Supabase schema
-- Run this in the Supabase SQL Editor (Project → SQL Editor → New query).

create extension if not exists pgcrypto;

-- profiles ------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text,
  country text,
  city text,
  citizenship text,
  citizenship_group text,
  ukraine_scenario text,
  belarus_scenario text,
  georgia_scenario text,
  moldova_scenario text,
  uzbekistan_scenario text,
  turkey_scenario text,
  kazakhstan_scenario text,
  tajikistan_scenario text,
  current_country text,
  goal text,
  goals text[],
  job_offer text,
  already_admitted text,
  study_level text,
  business_type text,
  family_member_type text,
  has_children text,
  has_foreign_employer text,
  will_register_ip text,
  timeline text,
  has_car text,
  onboarding_skipped boolean default false,
  skipped_steps text[] default '{}',
  last_active_at timestamptz default now(),
  route jsonb,
  selected_route jsonb,
  route_steps text[] default '{}',
  roadmap_plan jsonb,
  roadmap_completed_steps text[] default '{}',
  plan text default 'free',
  language text default 'ru',
  document_profile jsonb,
  created_at timestamptz default now()
);

-- Safe to re-run against a database created before these columns existed.
alter table public.profiles add column if not exists citizenship text;
alter table public.profiles add column if not exists citizenship_group text;
alter table public.profiles add column if not exists ukraine_scenario text;
alter table public.profiles add column if not exists belarus_scenario text;
alter table public.profiles add column if not exists georgia_scenario text;
alter table public.profiles add column if not exists moldova_scenario text;
alter table public.profiles add column if not exists uzbekistan_scenario text;
alter table public.profiles add column if not exists turkey_scenario text;
alter table public.profiles add column if not exists kazakhstan_scenario text;
alter table public.profiles add column if not exists tajikistan_scenario text;
alter table public.profiles add column if not exists current_country text;
alter table public.profiles add column if not exists city text;
alter table public.profiles add column if not exists goals text[];
alter table public.profiles add column if not exists job_offer text;
alter table public.profiles add column if not exists already_admitted text;
alter table public.profiles add column if not exists study_level text;
alter table public.profiles add column if not exists business_type text;
alter table public.profiles add column if not exists family_member_type text;
alter table public.profiles add column if not exists has_children text;
alter table public.profiles add column if not exists has_foreign_employer text;
alter table public.profiles add column if not exists will_register_ip text;
alter table public.profiles add column if not exists timeline text;
alter table public.profiles add column if not exists has_car text;
alter table public.profiles add column if not exists onboarding_skipped boolean default false;
alter table public.profiles add column if not exists skipped_steps text[] default '{}';
alter table public.profiles add column if not exists last_active_at timestamptz default now();
alter table public.profiles add column if not exists route jsonb;
alter table public.profiles add column if not exists selected_route jsonb;
alter table public.profiles add column if not exists route_steps text[] default '{}';
alter table public.profiles add column if not exists roadmap_plan jsonb;
alter table public.profiles add column if not exists roadmap_completed_steps text[] default '{}';
alter table public.profiles add column if not exists document_profile jsonb;

-- citizenship and current_country store ISO 3166-1 alpha-2 country codes (e.g. "UA", "PL")
-- selected from the searchable country dropdown — see app/onboarding/page.tsx.
-- citizenship_group is the derived "A"/"B"/"C"/"D" bucket for that citizenship code (see
-- app/_lib/citizenshipGroups.ts), saved alongside citizenship so route generation and the
-- document filtering matrix don't need to recompute it on every read.
-- ukraine_scenario is only meaningful when citizenship = "UA": "protection" (temporary
-- protection / UKR status), "self" (relocating independently, not a refugee), or "already"
-- (already in Poland, renewing/sorting out documents). Asked as its own onboarding step
-- right after citizenship — see app/onboarding/page.tsx and app/_lib/routeEngine.ts, which
-- generates a completely different route set per scenario.
-- belarus_scenario is only meaningful when citizenship = "BY": "self" (relocating
-- independently — visa D required for every goal, there's no visa-free entry at all for
-- Belarus), "already_status" (already in Poland, holds a karta pobytu or valid visa D —
-- goes through the normal renewal routes), or "already_no_status" (already in Poland on a
-- short-stay visa C with no residence status yet — skips goal selection entirely and gets
-- the Путь 1 / Путь 2 legalization-without-leaving routes instead). Asked as its own
-- onboarding step right after citizenship — see app/onboarding/page.tsx and
-- app/_lib/routeEngine.ts.
-- georgia_scenario is only meaningful when citizenship = "GE": "self" (relocating
-- independently — since 15.08.2026 the WORK goal specifically requires visa D + a full
-- zezwolenie na pracę, because oświadczenie stopped covering Georgia on 1.12.2025; every
-- other goal stays visa-free for 90 days), "already_status" (already in Poland, holds a
-- karta pobytu or valid visa D — ordinary renewal), or "already_no_status" (already in
-- Poland on the visa-free 90-day entry with no residence status yet — skips goal selection
-- entirely and gets the Путь 1 / Путь 2 legalization-without-leaving routes, where Georgia's
-- Путь 2 is notably slower than other Group B countries' because it needs the full
-- zezwolenie na pracę rather than oświadczenie). Note Georgia is citizenship_group D, not B
-- — see app/_lib/citizenshipGroups.ts and app/_lib/routeEngine.ts's specsForGroupCD().
-- Asked as its own onboarding step right after citizenship — see app/onboarding/page.tsx.
-- moldova_scenario is only meaningful when citizenship = "MD": "self" (relocating
-- independently — WORK still needs visa D via oświadczenie, same fast track as Belarus,
-- because Moldova is one of the 4 countries oświadczenie still covers, unlike Georgia which
-- lost eligibility on 1.12.2025; every other goal stays visa-free for 90 days), "already_status"
-- (already in Poland, holds a karta pobytu or valid visa D — ordinary renewal), or
-- "already_no_status" (already in Poland on the visa-free 90-day entry with no residence
-- status yet — skips goal selection entirely and gets the Путь 1 / Путь 2
-- legalization-without-leaving routes, where Moldova's Путь 2 is fast like Belarus's since it
-- also uses oświadczenie rather than a full zezwolenie na pracę). Note Moldova is
-- citizenship_group D, not B — see app/_lib/citizenshipGroups.ts and
-- app/_lib/routeEngine.ts's specsForGroupCD(). Asked as its own onboarding step right after
-- citizenship — see app/onboarding/page.tsx.
-- uzbekistan_scenario is only meaningful when citizenship = "UZ": "self" (relocating
-- independently — visa D required for every goal, same as Belarus, there's no visa-free
-- entry at all; the WORK goal specifically needs a full zezwolenie na pracę rather than
-- oświadczenie, since Uzbekistan never had oświadczenie access, plus visa appointment
-- bookings in Tashkent can queue 6-7+ months on top of processing time), "already_status"
-- (already in Poland, holds a karta pobytu or valid visa D — ordinary renewal), or
-- "already_no_status" (already in Poland on a short-stay visa C with no residence status
-- yet — skips goal selection entirely and gets the Путь 1 / Путь 2
-- legalization-without-leaving routes, where Путь 2 is the slowest of any Group B country
-- covered so far because it stacks the zezwolenie na pracę wait with the Tashkent
-- appointment queue). Asked as its own onboarding step right after citizenship — see
-- app/onboarding/page.tsx and app/_lib/routeEngine.ts.
-- turkey_scenario is only meaningful when citizenship = "TR": "self" (relocating
-- independently — visa D required for every goal, there's no visa-free entry at all;
-- the WORK goal needs a full zezwolenie na pracę since Turkey never had oświadczenie
-- access, and every visa application must go through VFS Global in the applicant's
-- consular district — Ankara or Istanbul — direct embassy/consulate submission isn't
-- allowed), "already_status" (already in Poland, holds a karta pobytu or valid visa D —
-- ordinary renewal), or "already_no_status" (already in Poland on a short-stay visa C
-- with no residence status yet — skips goal selection entirely and gets the Путь 1 /
-- Путь 2 legalization-without-leaving routes; this branch is expected to be hit more
-- often for Turkey than for Moldova/Georgia since Turkey has no visa-free entry at all,
-- so travelers arrive on short-stay visa C far more routinely). Asked as its own
-- onboarding step right after citizenship — see app/onboarding/page.tsx and
-- app/_lib/routeEngine.ts.
-- kazakhstan_scenario is only meaningful when citizenship = "KZ": "self" (relocating
-- independently — visa D required for every goal, there's no visa-free entry at all;
-- the WORK goal needs a full zezwolenie na pracę since Kazakhstan never had oświadczenie
-- access. Unlike Turkey, applications go directly to the Astana embassy or Almaty
-- consulate general by region — no VFS Global — but a high-demand lottery
-- (жеребьёвка) can gate the appointment slot, and visa D processing itself runs a
-- minimum 30 working days, longer than most other countries covered), "already_status"
-- (already in Poland, holds a karta pobytu or valid visa D — ordinary renewal), or
-- "already_no_status" (already in Poland on a short-stay visa C with no residence
-- status yet — skips goal selection entirely and gets the Путь 1 / Путь 2
-- legalization-without-leaving routes; Путь 2 is slower here than Turkey's equivalent
-- because of that 30+ working day visa processing floor). Asked as its own onboarding
-- step right after citizenship — see app/onboarding/page.tsx and app/_lib/routeEngine.ts.
-- tajikistan_scenario is only meaningful when citizenship = "TJ": "self" (relocating
-- independently — visa D required for every goal, there's no visa-free entry at all;
-- the WORK goal needs a full zezwolenie na pracę since Tajikistan never had oświadczenie
-- access. The defining wrinkle here, unique among all Group B countries covered:
-- Poland has NO diplomatic mission in Tajikistan at all — the Polish ambassador in
-- Tashkent, Uzbekistan is also accredited to Tajikistan, so EVERY visa (C or D) has to
-- be filed in person in Tashkent, meaning a separate international trip just to reach
-- the application stage, on top of Uzbekistan's own entry-rule check for Tajik
-- citizens), "already_status" (already in Poland, holds a karta pobytu or valid visa D
-- — ordinary renewal), or "already_no_status" (already in Poland on a short-stay visa C
-- with no residence status yet — skips goal selection entirely and gets the Путь 1 /
-- Путь 2 legalization-without-leaving routes; Путь 2 requires flying to Tashkent for
-- the visa D, same as Сценарий 1's self track). Asked as its own onboarding step right
-- after citizenship — see app/onboarding/page.tsx and app/_lib/routeEngine.ts.
-- skipped_steps stores the keys of onboarding steps the user skipped (see STEP_ORDER in
-- app/onboarding/page.tsx), so the questionnaire can be resumed and completed later.
-- route stores the RouteEngineResult from AI analysis: { routes: Route[], ... } — see app/api/route/route.ts.
-- selected_route stores the user's chosen Route from the results screen: { name, description, speed, cost, difficulty, ... },
-- generated deterministically from citizenship_group/goal/job_offer by app/_lib/routeEngine.ts.
-- route_steps stores just the step names from that route (Route.steps) as its own array,
-- so they can be queried without unpacking the selected_route jsonb.
-- timeline is the onboarding "when do you plan to move?" answer (already/month1/months3/
-- months6/year1/exploring — see the "timeline" step in app/onboarding/page.tsx). Together with
-- route_steps it anchors the dated document timeline on the dashboard roadmap page — see
-- app/_lib/routeTimeline.ts.
-- roadmap_plan stores the AI-generated personalized relocation plan (GeneratedRoadmapPlan —
-- { phases: { key, title, steps: { id, title, description }[] }[] }), generated right after
-- onboarding and regenerable later — see app/api/roadmap/route.ts and
-- app/_components/DashboardProgressProvider.tsx. It's used on the dashboard roadmap whenever
-- there's no route_steps-based timeline to show instead.
-- roadmap_completed_steps stores the ids of roadmap_plan/route timeline steps the user has
-- manually checked off (neither is tied to any other in-app action, so completion is self-reported).
-- document_profile stores reusable personal data the AI form-fill feature needs
-- (full name, date/place of birth, passport, address, etc.) — see
-- app/_lib/documentProfile.ts for the shape and app/api/documents/fill/route.ts
-- for how it's used to fill official PDF blanks (PESEL, PESEL UKR, ...).
-- Filled once in the fill modal, then reused across every supported document.
-- last_active_at is touched by AuthProvider on every session load and is what
-- the /api/notifications/check-inactive cron job compares against to send
-- "haven't logged in for 7 days" reminders — see app/_components/AuthProvider.tsx.

alter table public.profiles enable row level security;

create policy "profiles select own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles insert own" on public.profiles
  for insert with check (auth.uid() = id);

create policy "profiles update own" on public.profiles
  for update using (auth.uid() = id);

-- progress ------------------------------------------------------------

create table public.progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  country text,
  document_type text,
  steps_completed int default 0,
  total_steps int default 7,
  updated_at timestamptz default now(),
  unique (user_id, document_type)
);

alter table public.progress enable row level security;

create policy "progress select own" on public.progress
  for select using (auth.uid() = user_id);

create policy "progress insert own" on public.progress
  for insert with check (auth.uid() = user_id);

create policy "progress update own" on public.progress
  for update using (auth.uid() = user_id);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger progress_set_updated_at
before update on public.progress
for each row execute function public.set_updated_at();

-- documents -------------------------------------------------------------
-- Per-document upload status shown on the /documents page. Keyed by the
-- stable doc_id used in app/(app)/(dashboard)/documents/page.tsx
-- (e.g. "passport-scan", "pesel-form").

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  doc_id text not null,
  status text not null,
  file_name text,
  storage_path text,
  updated_at timestamptz default now(),
  unique (user_id, doc_id)
);

alter table public.documents add column if not exists storage_path text;

-- storage_path is the Supabase Storage object path (in the "documents" bucket)
-- for the uploaded file, e.g. "<user_id>/<doc_id>-<file_name>" — see
-- app/(app)/(dashboard)/documents/page.tsx.

alter table public.documents enable row level security;

create policy "documents select own" on public.documents
  for select using (auth.uid() = user_id);

create policy "documents insert own" on public.documents
  for insert with check (auth.uid() = user_id);

create policy "documents update own" on public.documents
  for update using (auth.uid() = user_id);

create trigger documents_set_updated_at
before update on public.documents
for each row execute function public.set_updated_at();

-- chat_history ----------------------------------------------------------

create table public.chat_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  message text,
  role text,
  created_at timestamptz default now()
);

alter table public.chat_history enable row level security;

create policy "chat_history select own" on public.chat_history
  for select using (auth.uid() = user_id);

create policy "chat_history insert own" on public.chat_history
  for insert with check (auth.uid() = user_id);

-- chat_sessions -----------------------------------------------------------
-- Threaded conversations for the /dashboard/ai page's history sidebar.
-- Each row is one conversation; messages holds the full { from, text, time }[]
-- array as JSON so it can be loaded/overwritten in one round trip.

create table if not exists public.chat_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  title text not null,
  messages jsonb not null default '[]'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.chat_sessions enable row level security;

create policy "chat_sessions select own" on public.chat_sessions
  for select using (auth.uid() = user_id);

create policy "chat_sessions insert own" on public.chat_sessions
  for insert with check (auth.uid() = user_id);

create policy "chat_sessions update own" on public.chat_sessions
  for update using (auth.uid() = user_id);

create policy "chat_sessions delete own" on public.chat_sessions
  for delete using (auth.uid() = user_id);

create trigger chat_sessions_set_updated_at
before update on public.chat_sessions
for each row execute function public.set_updated_at();

-- notifications -----------------------------------------------------------
-- Bell dropdown items. Created by app/api/notifications/create (welcome,
-- checklist, document triggers) and by the app/api/notifications/check-inactive
-- cron job (inactivity trigger, using the service role key since it runs
-- outside any single user's session). "type" drives both the icon and the
-- click-to-navigate destination in app/_components/NotificationBell.tsx.

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  message text not null default '',
  type text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.notifications enable row level security;

create policy "notifications select own" on public.notifications
  for select using (auth.uid() = user_id);

create policy "notifications insert own" on public.notifications
  for insert with check (auth.uid() = user_id);

create policy "notifications update own" on public.notifications
  for update using (auth.uid() = user_id);

create index if not exists notifications_user_id_created_at_idx
  on public.notifications (user_id, created_at desc);
