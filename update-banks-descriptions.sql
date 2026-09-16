-- Shorten bank descriptions to ~2 sentences with the most useful facts
-- (founding, size/ranking, standout detail). Run in Supabase SQL Editor.

update public.document_guides set
  description = 'Крупный коммерческий банк, работает с 1989 года, входит в португальскую группу Millennium bcp. Один из ТОП-7 банков Польши — более 3,4 млн клиентов и около 450 отделений.'
where name = 'Bank Millennium' and category = 'финансы';

update public.document_guides set
  description = 'Один из старейших банков Польши (с 1929 года) и второй по величине активов после PKO Bank Polski. Обслуживает более 6,8 млн клиентов через сеть из около 500 отделений и 1 600 банкоматов.'
where name = 'Bank Pekao S.A.' and category = 'финансы';

update public.document_guides set
  description = 'Коммерческий банк с 1990 года, тесно связан с Poczta Polska — услуги доступны более чем в 4 700 почтовых отделениях. Акционеры — Poczta Polska и PKO Bank Polski.'
where name = 'Bank Pocztowy' and category = 'финансы';

update public.document_guides set
  description = 'Часть французской банковской группы BNP Paribas, работающей в более чем 60 странах; в Польше — с 1990 года. Входит в ТОП-7 банков по активам, обслуживает более 4 млн клиентов через около 430 отделений.'
where name = 'BNP Paribas Bank Polska' and category = 'финансы';

update public.document_guides set
  description = 'Bank Ochrony Środowiska — коммерческий банк с 1991 года, специализирующийся на финансировании экологических и энергоэффективных проектов. Наряду с этим предлагает полный спектр обычных банковских услуг.'
where name = 'BOŚ Bank' and category = 'финансы';

update public.document_guides set
  description = 'Часть французской группы Crédit Agricole, в Польше — с 2001 года (современное название — с 2011-го, после ребрендинга Lukas Bank). Обслуживает более 1,5 млн клиентов через около 300 отделений.'
where name = 'Credit Agricole Bank Polska' and category = 'финансы';

update public.document_guides set
  description = 'До апреля 2026 года работал как Santander Bank Polska, затем был куплен Erste Group и переименован. Продукты и условия обслуживания в целом сохранились после ребрендинга.'
where name = 'Erste Bank Polska' and category = 'финансы';

update public.document_guides set
  description = 'Один из крупнейших банков Польши (с 1988 года), с 2001 года — часть нидерландской группы ING Group. Более 4,8 млн клиентов, свыше 300 отделений, лидер мобильного и интернет-банкинга.'
where name = 'ING Bank Śląski' and category = 'финансы';

update public.document_guides set
  description = 'Один из самых технологичных банков Польши и пионер интернет-банкинга (бренд с 2000 года, ранее BRE Bank). Входит в ТОП-5 банков по активам — более 5,7 млн клиентов в Польше, Чехии и Словакии.'
where name = 'mBank' and category = 'финансы';

update public.document_guides set
  description = 'Польский коммерческий банк, начал работу в 1995 году как WestLB Bank Polska, с 2016 года — Nest Bank. Делает ставку на цифровые услуги и полностью бесплатное обслуживание счёта и карты.'
where name = 'Nest Bank' and category = 'финансы';

update public.document_guides set
  description = 'Крупнейший банк Польши, основан в 1919 году, обслуживает более 12 млн клиентов. Лидер по активам, числу клиентов и размеру сети отделений.'
where name = 'PKO Bank Polski' and category = 'финансы';

update public.document_guides set
  description = 'Коммерческий банк с 1991 года, один из первых частных банков Польши, связан с Polkomtel и Cyfrowy Polsat (группа Зигмунта Соложа). Небольшая сеть отделений — упор на дистанционное обслуживание через plusbank24.'
where name = 'Plus Bank' and category = 'финансы';

update public.document_guides set
  description = 'Специализированный банк с 2000 года, часть Toyota Financial Services; изначально создан для кредитования покупки Toyota и Lexus. Сегодня также предлагает счета, депозиты и кредиты, но без широкой сети отделений.'
where name = 'Toyota Bank Polska' and category = 'финансы';

update public.document_guides set
  description = 'Один из самых молодых банков Польши — начал работу в 2022 году после реструктуризации Getin Noble Bank при участии BFG. Более 3 млн клиентов, свыше 160 отделений и партнёрских точек, упор на дистанционное обслуживание.'
where name = 'VeloBank' and category = 'финансы';

update public.document_guides set
  description = 'Специализированный банк с 1998 года, часть Volkswagen Financial Services (финансирование VW, Audi, Škoda, SEAT, CUPRA). Наряду с автокредитованием предлагает счета, депозиты и карты, почти без сети отделений.'
where name = 'Volkswagen Bank Polska' and category = 'финансы';
