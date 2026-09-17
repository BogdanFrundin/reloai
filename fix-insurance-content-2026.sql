-- Fact-check fixes for /insurance guide cards (Sept 2026 verification pass)
-- Run in Supabase SQL Editor. Only touches the Russian base "description" column;
-- other language columns (description_en/_uz/_tr/_tg/_uk) are left as-is and should
-- be re-translated afterwards if you want them to match.

-- 1. "Регистрация в NFZ": the second paragraph oversimplified the March 5, 2026
--    rule change. Per the official NFZ notice (nfz.gov.pl, "Pacjent z Ukrainy.
--    Co się zmieniło od 5 marca 2026 r."), free care for UKR-status Ukrainians
--    without an insurance title is NOT just "children/pregnant/postpartum" —
--    it's 4 categories (torture/rape victims, minors, pregnant/postpartum women,
--    residents of collective accommodation centers), and even those 4 groups
--    don't get *everything* free (spa treatment, infertility treatment,
--    endoprosthetics, cataract surgery and some screening programs are excluded).
update public.document_guides
set description = 'Narodowy Fundusz Zdrowia — система обязательного медстрахования Польши. Регистрация не оформляется отдельным документом — статус формируется автоматически на основании трудоустройства/самозанятости/добровольного договора и проверяется через PESEL в eWUŚ.' || chr(10) || chr(10) ||
  'С 5 марта 2026 отменён спецзакон о безусловном бесплатном NFZ для украинцев со статусом UKR. Без страхового титула (работа, самозанятость, статус безработного, добровольное страхование) бесплатная помощь сохраняется только для 4 категорий: жертвы пыток/изнасилования, дети до 18 лет, беременные и роженицы, а также проживающие в пунктах временного размещения — и даже им не покрываются санаторное лечение, лечение бесплодия, эндопротезирование, удаление катаракты и часть скрининговых программ.'
where name = 'Регистрация в NFZ' and category = 'медицина';

-- 2. "Выбор семейного врача POZ": clarify that the 3rd+ change in a calendar year
--    (the paid 80 zł one) must be filed in person — an IKP e-declaration for it
--    gets auto-rejected as exceeding the free e-declaration limit (source:
--    gazetaprawna.pl / interia.pl reporting on the NFZ rules, still in force 2026).
update public.document_guides
set description = 'Podstawowa Opieka Zdrowotna — уровень первичной помощи: семейный врач, медсестра, акушерка, к которым приписываются по декларации выбора. Это точка входа в систему NFZ.' || chr(10) || chr(10) ||
  'Первые две смены за календарный год можно оформить лично или через IKP. Начиная с третьей смены действует плата 80 злотых, и такую декларацию нужно подавать лично в поликлинике — электронная заявка через IKP на неё автоматически отклоняется как превышающая лимит бесплатных смен.'
where name = 'Выбор семейного врача POZ' and category = 'медицина';
