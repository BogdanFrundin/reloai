-- Bank data cleanup + tags/filters + chosen-bank tracking
-- Generated automatically. Run in Supabase SQL Editor.

-- 1. Remove banks that no longer accept new retail customers or never offered accounts
delete from public.document_guides where name = 'Citi Handlowy' and category = 'финансы';
delete from public.document_guides where name = 'Inbank' and category = 'финансы';

-- 2. Dedupe accidental duplicate rows (keep the earliest row per name)
delete from public.document_guides a
using public.document_guides b
where a.category = 'финансы'
  and b.category = 'финансы'
  and a.name = b.name
  and a.name in ('PKO Bank Polski', 'mBank')
  and a.ctid > b.ctid;

-- 3. Santander Bank Polska was acquired by Erste Group and rebranded
--    Erste Bank Polska on 24 April 2026 -- rename + update description
update public.document_guides set
  name = 'Erste Bank Polska',
  description = 'Крупный универсальный банк с широкой сетью отделений — до апреля 2026 года работал под брендом Santander Bank Polska, затем банк был приобретён Erste Group и переименован в Erste Bank Polska. Продукты и условия обслуживания в целом сохранились после ребрендинга.'
where name = 'Santander Bank Polska' and category = 'финансы';

-- 4. Add tags (jsonb array) to document_guides for filter chips
alter table public.document_guides add column if not exists tags jsonb;

-- 5. Add a column to profiles to remember which bank the user picked
alter table public.profiles add column if not exists chosen_bank text;

-- 6. Populate tags per bank
update public.document_guides set tags = '["no_pesel", "multicurrency"]'::jsonb where name = 'PKO Bank Polski' and category = 'финансы';
update public.document_guides set tags = '["no_pesel", "multicurrency"]'::jsonb where name = 'Erste Bank Polska' and category = 'финансы';
update public.document_guides set tags = '["fully_online", "free"]'::jsonb where name = 'Toyota Bank Polska' and category = 'финансы';
update public.document_guides set tags = '["no_pesel", "free"]'::jsonb where name = 'VeloBank' and category = 'финансы';
update public.document_guides set tags = '["multicurrency"]'::jsonb where name = 'Credit Agricole Bank Polska' and category = 'финансы';
update public.document_guides set tags = '["multicurrency"]'::jsonb where name = 'ING Bank Śląski' and category = 'финансы';
update public.document_guides set tags = '["multicurrency"]'::jsonb where name = 'mBank' and category = 'финансы';
update public.document_guides set tags = '["free", "multicurrency"]'::jsonb where name = 'Nest Bank' and category = 'финансы';
update public.document_guides set tags = '["no_pesel", "free", "multicurrency", "fully_online"]'::jsonb where name = 'Bank Millennium' and category = 'финансы';
update public.document_guides set tags = '["multicurrency"]'::jsonb where name = 'Bank Pekao S.A.' and category = 'финансы';
update public.document_guides set tags = '["no_pesel"]'::jsonb where name = 'Bank Pocztowy' and category = 'финансы';
update public.document_guides set tags = '["no_pesel", "free", "multicurrency"]'::jsonb where name = 'BNP Paribas Bank Polska' and category = 'финансы';
update public.document_guides set tags = '["no_pesel", "free"]'::jsonb where name = 'BOŚ Bank' and category = 'финансы';
update public.document_guides set tags = '["fully_online", "free"]'::jsonb where name = 'Volkswagen Bank Polska' and category = 'финансы';
update public.document_guides set tags = '[]'::jsonb where name = 'Plus Bank' and category = 'финансы';