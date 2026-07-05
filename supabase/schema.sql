-- ReloAI Supabase schema
-- Run this in the Supabase SQL Editor (Project → SQL Editor → New query).

create extension if not exists pgcrypto;

-- profiles ------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text,
  country text,
  citizenship text,
  current_country text,
  goal text,
  plan text default 'free',
  language text default 'ru',
  created_at timestamptz default now()
);

-- Safe to re-run against a database created before these columns existed.
alter table public.profiles add column if not exists citizenship text;
alter table public.profiles add column if not exists current_country text;

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
