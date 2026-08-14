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
  current_country text,
  goal text,
  job_offer text,
  already_admitted text,
  onboarding_skipped boolean default false,
  skipped_steps text[] default '{}',
  last_active_at timestamptz default now(),
  route jsonb,
  selected_route jsonb,
  plan text default 'free',
  language text default 'ru',
  created_at timestamptz default now()
);

-- Safe to re-run against a database created before these columns existed.
alter table public.profiles add column if not exists citizenship text;
alter table public.profiles add column if not exists current_country text;
alter table public.profiles add column if not exists city text;
alter table public.profiles add column if not exists job_offer text;
alter table public.profiles add column if not exists already_admitted text;
alter table public.profiles add column if not exists onboarding_skipped boolean default false;
alter table public.profiles add column if not exists skipped_steps text[] default '{}';
alter table public.profiles add column if not exists last_active_at timestamptz default now();
alter table public.profiles add column if not exists route jsonb;
alter table public.profiles add column if not exists selected_route jsonb;

-- citizenship and current_country store ISO 3166-1 alpha-2 country codes (e.g. "UA", "PL")
-- selected from the searchable country dropdown — see app/onboarding/page.tsx.
-- skipped_steps stores the keys of onboarding steps the user skipped (see STEP_ORDER in
-- app/onboarding/page.tsx), so the questionnaire can be resumed and completed later.
-- route stores the RouteEngineResult from AI analysis: { routes: Route[], ... } — see app/api/route/route.ts.
-- selected_route stores the user's chosen Route from the results screen: { name, description, speed, cost, difficulty, ... }
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
