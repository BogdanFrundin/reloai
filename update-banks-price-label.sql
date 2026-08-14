-- Short headline price label for the cost-focused bank card redesign
-- Generated automatically. Run in Supabase SQL Editor.

alter table public.document_guides add column if not exists price_label text;

update public.document_guides set price_label = '0 zł при условии' where name = 'PKO Bank Polski' and category = 'финансы';
update public.document_guides set price_label = 'Уточняйте на сайте' where name = 'Plus Bank' and category = 'финансы';
update public.document_guides set price_label = '0 zł при условии' where name = 'Erste Bank Polska' and category = 'финансы';
update public.document_guides set price_label = '0 zł' where name = 'Toyota Bank Polska' and category = 'финансы';
update public.document_guides set price_label = '0 zł' where name = 'VeloBank' and category = 'финансы';
update public.document_guides set price_label = 'Уточняйте на сайте' where name = 'Credit Agricole Bank Polska' and category = 'финансы';
update public.document_guides set price_label = '0 zł при условии' where name = 'ING Bank Śląski' and category = 'финансы';
update public.document_guides set price_label = '0 zł при условии' where name = 'mBank' and category = 'финансы';
update public.document_guides set price_label = '0 zł' where name = 'Nest Bank' and category = 'финансы';
update public.document_guides set price_label = '0 zł' where name = 'Bank Millennium' and category = 'финансы';
update public.document_guides set price_label = '0 zł при условии' where name = 'Bank Pekao S.A.' and category = 'финансы';
update public.document_guides set price_label = 'Уточняйте на сайте' where name = 'Bank Pocztowy' and category = 'финансы';
update public.document_guides set price_label = '0 zł' where name = 'BNP Paribas Bank Polska' and category = 'финансы';
update public.document_guides set price_label = '0 zł' where name = 'BOŚ Bank' and category = 'финансы';
update public.document_guides set price_label = '0 zł' where name = 'Volkswagen Bank Polska' and category = 'финансы';