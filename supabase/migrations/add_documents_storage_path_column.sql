-- Stores the Supabase Storage object path for each uploaded document, so the
-- "Просмотр" (view) button on /documents can fetch a signed URL and open the
-- actual file instead of doing nothing.
-- NOTE: migrations in this folder are not auto-applied — run this manually in
-- the Supabase SQL Editor.
alter table public.documents add column if not exists storage_path text;
