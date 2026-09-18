"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "../../../_components/PageHeader";
import Reveal from "../../../_components/Reveal";
import HelpButton from "../../../_components/HelpButton";
import { pressScale } from "../../../_lib/motion";
import { getFlagUrl } from "../../../_lib/flags";
import { useLanguage } from "../../../_components/LanguageProvider";

const SALARY_DATA: { name: string; keywords: string[]; pln: number; eur: number }[] = [
  { name: "Программист", keywords: ["программист", "разработчик", "кодер", "it-специалист", "software", "developer", "programmer", "dasturchi", "programcı", "барномасоз", "програміст"], pln: 11900, eur: 2740 },
  { name: ".NET разработчик", keywords: ["net разработчик", "dotnet", "net developer", ".net", ".net dasturchi", ".net geliştirici", "барномасози .net", ".net розробник"], pln: 12750, eur: 2930 },
  { name: "Java разработчик", keywords: ["java разработчик", "java developer", "джава", "java dasturchi", "java geliştirici", "барномасози java", "java розробник"], pln: 14270, eur: 3280 },
  { name: "Frontend-разработчик", keywords: ["frontend", "фронтенд", "front-end", "frontend dasturchi", "frontend geliştirici", "барномасози frontend", "frontend розробник"], pln: 12690, eur: 2920 },
  { name: "Backend-разработчик", keywords: ["backend", "бэкенд", "back-end", "backend dasturchi", "backend geliştirici", "барномасози backend", "backend розробник"], pln: 13000, eur: 2990 },
  { name: "Android-разработчик", keywords: ["android разработчик", "андроид", "android dasturchi", "android geliştirici", "барномасози android", "android розробник"], pln: 12520, eur: 2880 },
  { name: "iOS-разработчик", keywords: ["ios разработчик", "айос", "ios dasturchi", "ios geliştirici", "барномасози ios", "ios розробник"], pln: 12480, eur: 2870 },
  { name: "Мобильный разработчик", keywords: ["мобильный разработчик", "mobile developer", "mobil dasturchi", "mobil geliştirici", "барномасози мобилӣ", "мобільний розробник"], pln: 11500, eur: 2640 },
  { name: "UX/UI дизайнер", keywords: ["ux", "ui", "юэкс", "юай", "product designer", "dizayner", "tasarımcı", "тарроҳ", "дизайнер"], pln: 10710, eur: 2460 },
  { name: "DevOps-инженер", keywords: ["devops", "девопс", "devops muhandis", "devops mühendisi", "муҳандиси devops", "devops інженер"], pln: 16070, eur: 3690 },
  { name: "Тестировщик", keywords: ["qa", "qa-инженер", "тестировщик", "tester", "testing", "sinovchi", "test uzmanı", "озмоишгар", "тестувальник"], pln: 10110, eur: 2350 },
  { name: "QA Automation инженер", keywords: ["automation qa", "автотестировщик", "qa automation", "avtomatlashtirilgan sinov muhandisi", "otomasyon test mühendisi", "муҳандиси автоматикунонии санҷиш", "інженер автоматизації тестування"], pln: 12000, eur: 2760 },
  { name: "IT project manager", keywords: ["it project manager", "айти менеджер проекта", "it loyiha menejeri", "bt proje yöneticisi", "менеҷери лоиҳаи it", "it проєкт-менеджер"], pln: 15970, eur: 3670 },
  { name: "Product manager", keywords: ["product manager", "продакт менеджер", "mahsulot menejeri", "ürün yöneticisi", "менеҷери маҳсулот", "продакт-менеджер"], pln: 10520, eur: 2420 },
  { name: "Product owner", keywords: ["product owner", "продакт оунер", "mahsulot egasi", "ürün sahibi", "соҳиби маҳсулот", "продакт-оунер"], pln: 10500, eur: 2410 },
  { name: "Scrum master", keywords: ["scrum master", "скрам мастер", "skram master", "scrum master", "скрам-мастер", "скрам-майстер"], pln: 15440, eur: 3550 },
  { name: "Бизнес-аналитик (IT)", keywords: ["бизнес аналитик", "business analyst", "biznes tahlilchi", "iş analisti", "таҳлилгари бизнес", "бізнес-аналітик"], pln: 11540, eur: 2650 },
  { name: "Системный аналитик", keywords: ["системный аналитик", "systems analyst", "tizim tahlilchisi", "sistem analisti", "таҳлилгари система", "системний аналітик"], pln: 12130, eur: 2790 },
  { name: "Data analyst", keywords: ["data analyst", "аналитик данных", "ma'lumotlar tahlilchisi", "veri analisti", "таҳлилгари маълумот", "аналітик даних"], pln: 9750, eur: 2240 },
  { name: "Data scientist", keywords: ["data scientist", "дата сайентист", "data sayentist", "veri bilimci", "олими додаҳо", "дата-сайентист"], pln: 9650, eur: 2220 },
  { name: "Big Data аналитик", keywords: ["big data", "биг дата", "katta ma'lumotlar tahlilchisi", "büyük veri analisti", "таҳлилгари додаҳои калон", "аналітик великих даних"], pln: 11780, eur: 2710 },
  { name: "Сетевой администратор", keywords: ["сетевой администратор", "network admin", "tarmoq administratori", "ağ yöneticisi", "маъмури шабака", "мережевий адміністратор"], pln: 9990, eur: 2300 },
  { name: "Системный администратор", keywords: ["системный администратор", "sysadmin", "system administrator", "tizim administratori", "sistem yöneticisi", "маъмури система", "системний адміністратор"], pln: 9000, eur: 2070 },
  { name: "Администратор баз данных", keywords: ["администратор баз данных", "dba", "database administrator", "ma'lumotlar bazasi administratori", "veritabanı yöneticisi", "маъмури пойгоҳи додаҳо", "адміністратор баз даних"], pln: 9800, eur: 2250 },
  { name: "Специалист по кибербезопасности", keywords: ["кибербезопасность", "security engineer", "cybersecurity", "kiberxavfsizlik mutaxassisi", "siber güvenlik uzmanı", "мутахассиси амнияти сиберӣ", "фахівець з кібербезпеки"], pln: 12250, eur: 2820 },
  { name: "IT support / helpdesk", keywords: ["helpdesk", "техподдержка", "it support", "texnik yordam", "teknik destek", "кӯмаки техникӣ", "технічна підтримка"], pln: 6200, eur: 1430 },
  { name: "PLC программист", keywords: ["plc программист", "plc programmer", "plc dasturchi", "plc programcısı", "барномасози plc", "plc програміст"], pln: 10790, eur: 2480 },
  { name: "Врач общей практики", keywords: ["врач", "доктор", "терапевт", "general practitioner", "doctor", "shifokor", "doktor", "духтур", "лікар"], pln: 12000, eur: 2760 },
  { name: "Семейный врач", keywords: ["семейный врач", "family doctor", "oilaviy shifokor", "aile hekimi", "духтури оилавӣ", "сімейний лікар"], pln: 16060, eur: 3690 },
  { name: "Педиатр", keywords: ["педиатр", "pediatrician", "pediatr", "çocuk doktoru", "педиатр", "педіатр"], pln: 13930, eur: 3200 },
  { name: "Кардиолог", keywords: ["кардиолог", "cardiologist", "kardiolog", "kardiyolog", "кардиолог", "кардіолог"], pln: 16290, eur: 3740 },
  { name: "Хирург", keywords: ["хирург", "surgeon", "jarroh", "cerrah", "ҷарроҳ", "хірург"], pln: 13370, eur: 3070 },
  { name: "Анестезиолог", keywords: ["анестезиолог", "anesthesiologist", "anesteziolog", "anestezi uzmanı", "анестезиолог", "анестезіолог"], pln: 17700, eur: 4070 },
  { name: "Психиатр", keywords: ["психиатр", "psychiatrist", "psixiatr", "psikiyatrist", "психиатр", "психіатр"], pln: 17120, eur: 3940 },
  { name: "Врач-профпатолог", keywords: ["профпатолог", "occupational medicine", "kasb kasalliklari shifokori", "iş hekimi", "духтури касбӣ", "лікар-профпатолог"], pln: 9360, eur: 2150 },
  { name: "Врач-интерн / резидент", keywords: ["интерн", "резидент", "resident doctor", "intern shifokor", "asistan doktor", "духтури интерн", "лікар-інтерн"], pln: 9410, eur: 2160 },
  { name: "Стоматолог", keywords: ["стоматолог", "dentist", "зубной врач", "stomatolog", "diş hekimi", "дандонпизишк", "стоматолог"], pln: 9640, eur: 2220 },
  { name: "Зубной техник", keywords: ["зубной техник", "dental technician", "tish texnigi", "diş teknisyeni", "техники дандон", "зубний технік"], pln: 6860, eur: 1580 },
  { name: "Гигиенист стоматологический", keywords: ["гигиенист", "dental hygienist", "stomatologik gigienist", "diş hijyenisti", "гигиенисти дандонпизишкӣ", "стоматологічний гігієніст"], pln: 6590, eur: 1510 },
  { name: "Ассистент стоматолога", keywords: ["ассистент стоматолога", "dental assistant", "stomatolog yordamchisi", "diş hekimi asistanı", "ёрдамчии дандонпизишк", "асистент стоматолога"], pln: 6140, eur: 1410 },
  { name: "Медсестра", keywords: ["медсестра", "медбрат", "nurse", "hamshira", "hemşire", "ҳамшира", "медсестра"], pln: 8970, eur: 2060 },
  { name: "Старшая медсестра", keywords: ["старшая медсестра", "head nurse", "bosh hamshira", "başhemşire", "ҳамшираи калон", "старша медсестра"], pln: 9750, eur: 2240 },
  { name: "Операционная медсестра", keywords: ["операционная медсестра", "operating room nurse", "operatsion hamshira", "ameliyathane hemşiresi", "ҳамшираи ҷарроҳӣ", "операційна медсестра"], pln: 9020, eur: 2070 },
  { name: "Акушерка", keywords: ["акушерка", "midwife", "doya", "ebe", "момодоя", "акушерка"], pln: 8010, eur: 1840 },
  { name: "Фармацевт", keywords: ["фармацевт", "аптекарь", "pharmacist", "farmatsevt", "eczacı", "фармасевт", "фармацевт"], pln: 8800, eur: 2020 },
  { name: "Фармацевт-технолог", keywords: ["фармацевт технолог", "pharmacy technician", "farmatsevt texnolog", "eczane teknisyeni", "технологи фармасевтӣ", "фармацевт-технолог"], pln: 6000, eur: 1380 },
  { name: "Парамедик / фельдшер скорой помощи", keywords: ["парамедик", "фельдшер", "paramedic", "feldsher", "paramedik", "фелдшер", "парамедик"], pln: 9850, eur: 2260 },
  { name: "Физиотерапевт", keywords: ["физиотерапевт", "реабилитолог", "physiotherapist", "fizioterapevt", "fizyoterapist", "физиотерапевт", "фізіотерапевт"], pln: 7690, eur: 1770 },
  { name: "Ветеринар", keywords: ["ветеринар", "veterinarian", "veterinar", "veteriner", "духтури ҳайвонот", "ветеринар"], pln: 8320, eur: 1910 },
  { name: "Врач-лаборант / диагностика", keywords: ["лаборант диагностика", "laboratory diagnostician", "laborant shifokor", "laboratuvar doktoru", "духтур-лаборант", "лікар-лаборант"], pln: 7820, eur: 1800 },
  { name: "Лаборант", keywords: ["лаборант", "lab technician", "laborant", "laborant", "лаборант", "лаборант"], pln: 6000, eur: 1380 },
  { name: "Сиделка / патронажный работник", keywords: ["сиделка", "патронаж", "caregiver", "parvarishchi", "bakıcı", "нигоҳубингар", "доглядальниця"], pln: 6200, eur: 1430 },
  { name: "Психолог", keywords: ["психолог", "психотерапевт", "psychologist", "psixolog", "psikolog", "равоншинос", "психолог"], pln: 7700, eur: 1770 },
  { name: "Учитель математики", keywords: ["учитель математики", "math teacher", "matematika o'qituvchisi", "matematik öğretmeni", "муаллими математика", "вчитель математики"], pln: 6970, eur: 1600 },
  { name: "Учитель иностранного языка", keywords: ["учитель иностранного", "language teacher", "chet tili o'qituvchisi", "yabancı dil öğretmeni", "муаллими забони хориҷӣ", "вчитель іноземної мови"], pln: 6970, eur: 1600 },
  { name: "Учитель истории", keywords: ["учитель истории", "history teacher", "tarix o'qituvchisi", "tarih öğretmeni", "муаллими таърих", "вчитель історії"], pln: 6900, eur: 1590 },
  { name: "Учитель информатики", keywords: ["учитель информатики", "it teacher", "informatika o'qituvchisi", "bilgisayar öğretmeni", "муаллими информатика", "вчитель інформатики"], pln: 7200, eur: 1660 },
  { name: "Учитель физкультуры", keywords: ["учитель физкультуры", "pe teacher", "jismoniy tarbiya o'qituvchisi", "beden eğitimi öğretmeni", "муаллими тарбияи ҷисмонӣ", "вчитель фізкультури"], pln: 6500, eur: 1490 },
  { name: "Воспитатель детского сада", keywords: ["воспитатель", "preschool teacher", "tarbiyachi", "anaokulu öğretmeni", "мураббӣ", "вихователь"], pln: 5950, eur: 1370 },
  { name: "Заведующий детским садом", keywords: ["заведующий детским садом", "preschool director", "bog'cha mudiri", "anaokulu müdürü", "мудири боғчаи бачагона", "завідувач дитячого садка"], pln: 7500, eur: 1720 },
  { name: "Репетитор", keywords: ["репетитор", "tutor", "repetitor", "özel ders öğretmeni", "репетитор", "репетитор"], pln: 5500, eur: 1260 },
  { name: "Профессор университета", keywords: ["профессор", "university professor", "professor", "profesör", "профессор", "професор"], pln: 11550, eur: 2660 },
  { name: "Преподаватель вуза", keywords: ["преподаватель", "university lecturer", "universitet o'qituvchisi", "üniversite öğretim görevlisi", "муаллими донишгоҳ", "викладач вишу"], pln: 8850, eur: 2030 },
  { name: "Доцент", keywords: ["доцент", "assistant professor", "dotsent", "doçent", "дотсент", "доцент"], pln: 8670, eur: 1990 },
  { name: "Архитектор", keywords: ["архитектор", "architect", "arxitektor", "mimar", "меъмор", "архітектор"], pln: 8320, eur: 1910 },
  { name: "Дизайнер интерьера", keywords: ["дизайнер интерьера", "interior architect", "interyer dizayneri", "iç mimar", "тарроҳи дохилӣ", "дизайнер інтер'єру"], pln: 7380, eur: 1700 },
  { name: "Инженер-строитель", keywords: ["инженер строитель", "civil engineer", "qurilish muhandisi", "inşaat mühendisi", "муҳандиси сохтмон", "інженер-будівельник"], pln: 9120, eur: 2100 },
  { name: "Прораб / строительный инженер", keywords: ["прораб", "site engineer", "prorab", "şantiye şefi", "сарусто", "прораб"], pln: 8650, eur: 1990 },
  { name: "Инженер-конструктор", keywords: ["инженер конструктор", "design engineer", "konstruktor muhandis", "tasarım mühendisi", "муҳандиси конструктор", "інженер-конструктор"], pln: 9180, eur: 2110 },
  { name: "Инженер по качеству", keywords: ["инженер по качеству", "quality engineer", "sifat muhandisi", "kalite mühendisi", "муҳандиси сифат", "інженер з якості"], pln: 9320, eur: 2140 },
  { name: "Инженер-химик", keywords: ["инженер химик", "chemical engineer", "kimyo muhandisi", "kimya mühendisi", "муҳандиси химия", "інженер-хімік"], pln: 9500, eur: 2180 },
  { name: "Геодезист", keywords: ["геодезист", "surveyor", "geodezist", "harita mühendisi", "геодезист", "геодезист"], pln: 6760, eur: 1550 },
  { name: "Инженер-электронщик", keywords: ["инженер электронщик", "electronics engineer", "elektronika muhandisi", "elektronik mühendisi", "муҳандиси электроника", "інженер-електронник"], pln: 10710, eur: 2460 },
  { name: "Инженер-энергетик", keywords: ["инженер энергетик", "power engineer", "energetika muhandisi", "enerji mühendisi", "муҳандиси энергетика", "інженер-енергетик"], pln: 9700, eur: 2230 },
  { name: "Электротехник", keywords: ["электротехник", "electrical technician", "elektrotexnik", "elektrik teknisyeni", "электротехник", "електротехнік"], pln: 7450, eur: 1710 },
  { name: "Инженер-технолог", keywords: ["инженер технолог процессов", "process engineer", "texnolog muhandis", "proses mühendisi", "муҳандиси технолог", "інженер-технолог"], pln: 9000, eur: 2070 },
  { name: "Инженер-эколог", keywords: ["инженер эколог", "environmental engineer", "ekolog muhandis", "çevre mühendisi", "муҳандиси экология", "інженер-еколог"], pln: 8500, eur: 1950 },
  { name: "Инженер по продажам", keywords: ["инженер по продажам", "sales engineer", "savdo muhandisi", "satış mühendisi", "муҳандиси фурӯш", "інженер із продажів"], pln: 9500, eur: 2180 },
  { name: "Технолог производства", keywords: ["технолог производства", "production technologist", "ishlab chiqarish texnologi", "üretim teknoloğu", "технологи истеҳсолот", "технолог виробництва"], pln: 8090, eur: 1860 },
  { name: "Планировщик производства", keywords: ["планировщик производства", "production planner", "ishlab chiqarish rejalashtiruvchisi", "üretim planlamacısı", "банақшагири истеҳсолот", "планувальник виробництва"], pln: 8200, eur: 1890 },
  { name: "Бухгалтер", keywords: ["бухгалтер", "accountant", "buxgalter", "muhasebeci", "муҳосиб", "бухгалтер"], pln: 7660, eur: 1760 },
  { name: "Налоговый консультант", keywords: ["налоговый консультант", "tax advisor", "soliq maslahatchisi", "vergi danışmanı", "мушовири андоз", "податковий консультант"], pln: 9100, eur: 2090 },
  { name: "Юрист", keywords: ["юрист", "lawyer", "yurist", "avukat", "ҳуқуқшинос", "юрист"], pln: 9520, eur: 2190 },
  { name: "Юрисконсульт", keywords: ["юрисконсульт", "legal advisor", "yuriskonsult", "hukuk müşaviri", "мушовири ҳуқуқӣ", "юрисконсульт"], pln: 13540, eur: 3110 },
  { name: "Нотариус", keywords: ["нотариус", "notary", "notarius", "noter", "нотариус", "нотаріус"], pln: 10680, eur: 2460 },
  { name: "Финансовый аналитик", keywords: ["финансовый аналитик", "financial analyst", "moliyaviy tahlilchi", "finansal analist", "таҳлилгари молиявӣ", "фінансовий аналітик"], pln: 10180, eur: 2340 },
  { name: "Финансовый контролёр", keywords: ["финансовый контролер", "financial controller", "moliyaviy nazoratchi", "finansal kontrolör", "назоратчии молиявӣ", "фінансовий контролер"], pln: 11430, eur: 2630 },
  { name: "Кредитный аналитик", keywords: ["кредитный аналитик", "credit analyst", "kredit tahlilchisi", "kredi analisti", "таҳлилгари кредитӣ", "кредитний аналітик"], pln: 9180, eur: 2110 },
  { name: "Банковский аналитик", keywords: ["банковский аналитик", "bank analyst", "bank tahlilchisi", "banka analisti", "таҳлилгари бонкӣ", "банківський аналітик"], pln: 9320, eur: 2140 },
  { name: "Клиентский менеджер банка", keywords: ["клиентский менеджер банка", "bank advisor", "bank mijozlar menejeri", "banka müşteri temsilcisi", "менеҷери муштариёни бонк", "клієнтський менеджер банку"], pln: 6780, eur: 1560 },
  { name: "Инвестиционный консультант", keywords: ["инвестиционный консультант", "private banking", "investitsiya maslahatchisi", "yatırım danışmanı", "мушовири сармоягузорӣ", "інвестиційний консультант"], pln: 10010, eur: 2300 },
  { name: "Внутренний аудитор", keywords: ["внутренний аудитор", "internal auditor", "ichki auditor", "iç denetçi", "аудитори дохилӣ", "внутрішній аудитор"], pln: 9800, eur: 2250 },
  { name: "Актуарий", keywords: ["актуарий", "actuary", "aktuariy", "aktüer", "актуарӣ", "актуарій"], pln: 14000, eur: 3220 },
  { name: "Брокер", keywords: ["брокер", "broker", "broker", "broker", "брокер", "брокер"], pln: 10000, eur: 2300 },
  { name: "Специалист по контроллингу", keywords: ["контроллинг", "controlling specialist", "kontrolling mutaxassisi", "kontrolör uzmanı", "мутахассиси контроллинг", "фахівець з контролінгу"], pln: 9000, eur: 2070 },
  { name: "Электрик", keywords: ["электрик", "electrician", "elektrik", "elektrikçi", "барқчӣ", "електрик"], pln: 8130, eur: 1870 },
  { name: "Сантехник", keywords: ["сантехник", "plumber", "santexnik", "tesisatçı", "сантехник", "сантехнік"], pln: 7320, eur: 1680 },
  { name: "Сварщик", keywords: ["сварщик", "welder", "payvandchi", "kaynakçı", "пайвандгар", "зварник"], pln: 7290, eur: 1680 },
  { name: "Плотник", keywords: ["плотник", "carpenter", "duradgor", "marangoz", "наҷҷор", "тесляр"], pln: 7480, eur: 1720 },
  { name: "Столяр", keywords: ["столяр", "furniture carpenter", "stolyar", "doğramacı", "дуредгар", "столяр"], pln: 6430, eur: 1480 },
  { name: "Маляр", keywords: ["маляр", "painter", "bo'yoqchi", "boyacı", "рангубордор", "маляр"], pln: 6690, eur: 1540 },
  { name: "Каменщик", keywords: ["каменщик", "bricklayer", "mason", "g'isht teruvchi", "duvarcı", "бинокор", "муляр"], pln: 7500, eur: 1720 },
  { name: "Кровельщик", keywords: ["кровельщик", "roofer", "tomchi", "çatıcı", "томсоз", "покрівельник"], pln: 7300, eur: 1680 },
  { name: "Штукатур", keywords: ["штукатур", "plasterer", "suvoqchi", "sıvacı", "сувоқкор", "штукатур"], pln: 7820, eur: 1800 },
  { name: "Плиточник", keywords: ["плиточник", "tile layer", "kafelchi", "fayansçı", "кафелкор", "плиточник"], pln: 7280, eur: 1670 },
  { name: "Мостовщик / брусчатник", keywords: ["брусчатник", "paver", "bruschatka teruvchi", "parke taşı döşeyicisi", "сангфарошкунанда", "бруківник"], pln: 6670, eur: 1530 },
  { name: "Оператор погрузчика", keywords: ["оператор погрузчика", "forklift operator", "pogruzchik operatori", "forklift operatörü", "оператори борбардор", "оператор навантажувача"], pln: 6260, eur: 1440 },
  { name: "Крановщик", keywords: ["крановщик", "crane operator", "kranchi", "vinç operatörü", "кронбардор", "кранівник"], pln: 7610, eur: 1750 },
  { name: "Монтажник систем вентиляции", keywords: ["монтажник вентиляции", "hvac installer", "ventilyatsiya montajchisi", "havalandırma montajcısı", "насбкунандаи вентилятсия", "монтажник вентиляції"], pln: 7680, eur: 1770 },
  { name: "Проектировщик HVAC", keywords: ["проектировщик hvac", "hvac designer", "hvac loyihachisi", "hvac tasarımcısı", "тарроҳи hvac", "проєктувальник hvac"], pln: 9530, eur: 2190 },
  { name: "Бетонщик", keywords: ["бетонщик", "concrete worker", "betonchi", "betoncu", "бетонрез", "бетонник"], pln: 6500, eur: 1490 },
  { name: "Наладчик автоматики", keywords: ["наладчик автоматики", "automation technician", "avtomatika sozlovchisi", "otomasyon teknisyeni", "танзимгари автоматика", "налагоджувальник автоматики"], pln: 8500, eur: 1950 },
  { name: "Водитель грузовика (дальнобойщик)", keywords: ["дальнобойщик", "truck driver", "водитель грузовика", "yuk mashinasi haydovchisi", "tır şoförü", "ронандаи мошини боркаш", "водій вантажівки"], pln: 7750, eur: 1780 },
  { name: "Водитель фургона / доставка", keywords: ["водитель доставки", "delivery driver", "van driver", "yetkazib berish haydovchisi", "teslimat şoförü", "ронандаи расонидан", "водій доставки"], pln: 7750, eur: 1780 },
  { name: "Водитель автобуса", keywords: ["водитель автобуса", "bus driver", "avtobus haydovchisi", "otobüs şoförü", "ронандаи автобус", "водій автобуса"], pln: 7030, eur: 1620 },
  { name: "Водитель такси", keywords: ["водитель такси", "taxi driver", "taksi haydovchisi", "taksi şoförü", "ронандаи такси", "водій таксі"], pln: 6000, eur: 1380 },
  { name: "Курьер", keywords: ["курьер", "courier", "kuryer", "kurye", "курер", "кур'єр"], pln: 6490, eur: 1490 },
  { name: "Работник склада", keywords: ["работник склада", "складской работник", "warehouse worker", "ombor xodimi", "depo çalışanı", "коргари анбор", "працівник складу"], pln: 5800, eur: 1330 },
  { name: "Менеджер склада", keywords: ["менеджер склада", "warehouse manager", "ombor menejeri", "depo müdürü", "менеҷери анбор", "менеджер складу"], pln: 7500, eur: 1720 },
  { name: "Экспедитор", keywords: ["экспедитор", "freight forwarder", "ekspeditor", "nakliyeci", "экспедитор", "експедитор"], pln: 8150, eur: 1870 },
  { name: "Менеджер по логистике", keywords: ["менеджер по логистике", "logistics manager", "logistika menejeri", "lojistik müdürü", "менеҷери логистика", "менеджер з логістики"], pln: 11130, eur: 2560 },
  { name: "Машинист поезда", keywords: ["машинист поезда", "train driver", "poyezd mashinisti", "tren makinisti", "рондаи қатора", "машиніст поїзда"], pln: 8800, eur: 2020 },
  { name: "Повар", keywords: ["повар", "cook", "oshpaz", "aşçı", "ошпаз", "кухар"], pln: 6540, eur: 1500 },
  { name: "Шеф-повар", keywords: ["шеф повар", "head chef", "bosh oshpaz", "şef aşçı", "сарошпаз", "шеф-кухар"], pln: 8100, eur: 1860 },
  { name: "Су-шеф", keywords: ["су шеф", "sous chef", "su-shef", "sous şef", "су-шеф", "су-шеф"], pln: 7300, eur: 1680 },
  { name: "Помощник повара / кухонный работник", keywords: ["кухонный работник", "kitchen helper", "oshxona xodimi", "mutfak yardımcısı", "коргари ошхона", "працівник кухні"], pln: 6220, eur: 1430 },
  { name: "Помощник на кухне", keywords: ["помощник повара", "cook assistant", "oshpaz yordamchisi", "aşçı yardımcısı", "ёрдамчии ошпаз", "помічник кухаря"], pln: 6000, eur: 1380 },
  { name: "Официант / бариста", keywords: ["официант", "бариста", "waiter", "barista", "ofitsiant", "garson", "пешхидмат", "офіціант"], pln: 5890, eur: 1350 },
  { name: "Бариста (кофейня)", keywords: ["кофейнябариста", "coffee barista", "barista", "barista", "бариста", "бариста"], pln: 5300, eur: 1220 },
  { name: "Бармен", keywords: ["бармен", "bartender", "barmen", "barmen", "бармен", "бармен"], pln: 5900, eur: 1360 },
  { name: "Администратор отеля / ресепшн", keywords: ["администратор отеля", "ресепшн", "hotel receptionist", "mehmonxona administratori", "otel resepsiyonisti", "маъмури меҳмонхона", "адміністратор готелю"], pln: 5660, eur: 1300 },
  { name: "Уборщик / клинер", keywords: ["уборщик", "клинер", "cleaner", "farrosh", "temizlikçi", "тозакор", "прибиральник"], pln: 5640, eur: 1300 },
  { name: "Кассир", keywords: ["кассир", "cashier", "kassir", "kasiyer", "кассир", "касир"], pln: 5400, eur: 1240 },
  { name: "Продавец-консультант", keywords: ["продавец", "sales assistant", "sotuvchi-konsultant", "satış danışmanı", "фурӯшанда-мушовир", "продавець-консультант"], pln: 5400, eur: 1240 },
  { name: "Управляющий магазином", keywords: ["управляющий магазином", "store manager", "do'kon boshqaruvchisi", "mağaza müdürü", "мудири мағоза", "керуючий магазином"], pln: 6920, eur: 1590 },
  { name: "Заместитель управляющего магазином", keywords: ["заместитель управляющего", "deputy store manager", "do'kon boshqaruvchisi o'rinbosari", "mağaza müdür yardımcısı", "муовини мудири мағоза", "заступник керуючого магазином"], pln: 6300, eur: 1450 },
  { name: "Торговый представитель", keywords: ["торговый представитель", "sales representative", "savdo vakili", "satış temsilcisi", "намояндаи савдо", "торговий представник"], pln: 8310, eur: 1910 },
  { name: "Мерчендайзер", keywords: ["мерчендайзер", "merchandiser", "merchandayzer", "mağaza düzenleyicisi", "мерчандайзер", "мерчандайзер"], pln: 7990, eur: 1840 },
  { name: "Парикмахер", keywords: ["парикмахер", "hairdresser", "sartarosh", "kuaför", "сартарош", "перукар"], pln: 6430, eur: 1480 },
  { name: "Барбер", keywords: ["барбер", "barber", "barber", "berber", "барбер", "барбер"], pln: 6430, eur: 1480 },
  { name: "Косметолог", keywords: ["косметолог", "cosmetologist", "kosmetolog", "güzellik uzmanı", "косметолог", "косметолог"], pln: 6040, eur: 1390 },
  { name: "Косметолог-эстетист", keywords: ["эстетист", "beautician", "estetik kosmetolog", "estetisyen", "эстетолог", "естетист"], pln: 6500, eur: 1490 },
  { name: "Массажист", keywords: ["массажист", "massage therapist", "massajchi", "masör", "массажчӣ", "масажист"], pln: 6000, eur: 1380 },
  { name: "Мастер маникюра", keywords: ["маникюрщица", "manicurist", "мастер маникюра", "manikyurchi", "manikürcü", "маникюрчӣ", "майстер манікюру"], pln: 5280, eur: 1210 },
  { name: "Визажист", keywords: ["визажист", "makeup artist", "vizajist", "makyaj sanatçısı", "визажист", "візажист"], pln: 6050, eur: 1390 },
  { name: "Стилист", keywords: ["стилист", "hairstylist", "stilist", "stilist", "стилист", "стиліст"], pln: 6200, eur: 1430 },
  { name: "Рабочий на производстве", keywords: ["рабочий на производстве", "production worker", "ishlab chiqarish ishchisi", "üretim işçisi", "коргари истеҳсолот", "робітник виробництва"], pln: 6550, eur: 1510 },
  { name: "Оператор станка", keywords: ["оператор станка", "machine operator", "stanok operatori", "makine operatörü", "оператори мошин", "оператор верстата"], pln: 6780, eur: 1560 },
  { name: "Контролёр качества", keywords: ["контролер качества", "quality control inspector", "sifat nazoratchisi", "kalite kontrolörü", "назоратчии сифат", "контролер якості"], pln: 6800, eur: 1560 },
  { name: "Руководитель производства", keywords: ["руководитель производства", "production manager", "ishlab chiqarish rahbari", "üretim müdürü", "роҳбари истеҳсолот", "керівник виробництва"], pln: 9540, eur: 2190 },
  { name: "Механик промышленного оборудования", keywords: ["механик промышленного оборудования", "industrial mechanic", "sanoat uskunalari mexanigi", "endüstriyel makine mekaniği", "механики таҷҳизоти саноатӣ", "механік промислового обладнання"], pln: 7190, eur: 1650 },
  { name: "Слесарь-механик", keywords: ["слесарь механик", "industrial mechanic general", "chilangar-mexanik", "tesviyeci", "чилангар-механик", "слюсар-механік"], pln: 7500, eur: 1720 },
  { name: "Садовник", keywords: ["садовник", "gardener", "bog'bon", "bahçıvan", "боғбон", "садівник"], pln: 6200, eur: 1430 },
  { name: "Ландшафтный дизайнер / садовник", keywords: ["ландшафтный дизайнер", "landscape gardener", "landshaft dizayneri", "peyzaj mimarı", "тарроҳи ландшафт", "ландшафтний дизайнер"], pln: 6250, eur: 1440 },
  { name: "Фермер", keywords: ["фермер", "farmer", "fermer", "çiftçi", "деҳқон", "фермер"], pln: 5500, eur: 1260 },
  { name: "Агроном", keywords: ["агроном", "agronomist", "agronom", "ziraat mühendisi", "агроном", "агроном"], pln: 7000, eur: 1610 },
  { name: "Охранник", keywords: ["охранник", "security guard", "qorovul", "güvenlik görevlisi", "посбон", "охоронець"], pln: 6390, eur: 1470 },
  { name: "Сотрудник службы безопасности", keywords: ["сотрудник службы безопасности", "security officer", "xavfsizlik xodimi", "güvenlik personeli", "кормандаи амният", "працівник служби безпеки"], pln: 5730, eur: 1320 },
  { name: "Дворник / консьерж", keywords: ["дворник", "консьерж", "caretaker", "janitor", "farrosh-konsyerj", "kapıcı", "назораткунандаи бино", "двірник"], pln: 5680, eur: 1310 },
  { name: "Швейцар / портье", keywords: ["швейцар", "портье", "porter", "shveytsar", "kapı görevlisi", "дарбон", "швейцар"], pln: 5680, eur: 1310 },
  { name: "Графический дизайнер", keywords: ["графический дизайнер", "graphic designer", "grafik dizayner", "grafik tasarımcı", "тарроҳи графикӣ", "графічний дизайнер"], pln: 7180, eur: 1650 },
  { name: "Дизайнер мультимедиа", keywords: ["дизайнер мультимедиа", "multimedia designer", "multimedia dizayner", "multimedya tasarımcısı", "тарроҳи мультимедиа", "дизайнер мультимедіа"], pln: 6740, eur: 1550 },
  { name: "Фотограф", keywords: ["фотограф", "photographer", "fotograf", "fotoğrafçı", "аксбардор", "фотограф"], pln: 7020, eur: 1610 },
  { name: "Журналист", keywords: ["журналист", "journalist", "jurnalist", "gazeteci", "рӯзноманигор", "журналіст"], pln: 7190, eur: 1650 },
  { name: "Переводчик", keywords: ["переводчик", "translator", "tarjimon", "çevirmen", "тарҷумон", "перекладач"], pln: 8140, eur: 1870 },
  { name: "Копирайтер", keywords: ["копирайтер", "copywriter", "kopirayter", "metin yazarı", "копирайтер", "копірайтер"], pln: 7280, eur: 1670 },
  { name: "SMM-специалист", keywords: ["smm", "специалист по соцсетям", "social media specialist", "smm mutaxassisi", "sosyal medya uzmanı", "мутахассиси smm", "smm-фахівець"], pln: 5720, eur: 1310 },
  { name: "Специалист по рекламе", keywords: ["специалист по рекламе", "advertising specialist", "reklama mutaxassisi", "reklam uzmanı", "мутахассиси реклама", "фахівець з реклами"], pln: 7120, eur: 1640 },
  { name: "Медиаменеджер", keywords: ["медиаменеджер", "media manager", "media menejer", "medya yöneticisi", "медиаменеҷер", "медіаменеджер"], pln: 7570, eur: 1740 },
  { name: "Маркетолог", keywords: ["маркетолог", "маркетинг", "marketing", "marketolog", "pazarlamacı", "маркетолог", "маркетолог"], pln: 11250, eur: 2590 },
  { name: "Арт-директор", keywords: ["арт директор", "art director", "art-direktor", "sanat yönetmeni", "арт-директор", "арт-директор"], pln: 11000, eur: 2530 },
  { name: "HR-специалист", keywords: ["hr специалист", "специалист по кадрам", "hr specialist", "hr mutaxassisi", "ik uzmanı", "мутахассиси hr", "hr-фахівець"], pln: 8100, eur: 1860 },
  { name: "Рекрутер", keywords: ["рекрутер", "recruiter", "rekruter", "işe alım uzmanı", "рекрутер", "рекрутер"], pln: 8040, eur: 1850 },
  { name: "Специалист по кадрам и расчёту зарплаты", keywords: ["кадры и зарплата", "hr payroll", "kadrlar va ish haqi mutaxassisi", "bordro uzmanı", "мутахассиси кадрҳо ва музди меҳнат", "фахівець з кадрів та зарплати"], pln: 7500, eur: 1720 },
  { name: "Офис-менеджер", keywords: ["офис менеджер", "office manager", "ofis menejeri", "ofis yöneticisi", "менеҷери офис", "офіс-менеджер"], pln: 7590, eur: 1740 },
  { name: "Секретарь", keywords: ["секретарь", "secretary", "kotib", "sekreter", "котиб", "секретар"], pln: 6220, eur: 1430 },
  { name: "Личный ассистент руководителя", keywords: ["личный ассистент", "executive assistant", "shaxsiy yordamchi", "özel asistan", "ёрдамчии шахсии роҳбар", "особистий асистент керівника"], pln: 7320, eur: 1680 },
  { name: "Специалист по выставлению счетов", keywords: ["специалист по счетам", "invoicing clerk", "hisob-faktura mutaxassisi", "faturalama uzmanı", "мутахассиси ҳисобнома", "фахівець з виставлення рахунків"], pln: 6300, eur: 1450 },
  { name: "Государственный служащий", keywords: ["государственный служащий", "civil servant", "davlat xizmatchisi", "memur", "хизматчии давлатӣ", "державний службовець"], pln: 6500, eur: 1490 },
  { name: "Социальный работник", keywords: ["социальный работник", "social worker", "ijtimoiy xodim", "sosyal hizmet uzmanı", "корманди иҷтимоӣ", "соціальний працівник"], pln: 6310, eur: 1450 },
  { name: "Специалист по социальной работе", keywords: ["специалист по социальной работе", "social work specialist", "ijtimoiy ish mutaxassisi", "sosyal çalışma uzmanı", "мутахассиси кори иҷтимоӣ", "фахівець із соціальної роботи"], pln: 6710, eur: 1540 },
  { name: "Ассистент ветеринара", keywords: ["ассистент ветеринара", "veterinary assistant", "veterinar yordamchisi", "veteriner asistanı", "ёрдамчии ветеринар", "асистент ветеринара"], pln: 5500, eur: 1260 },
  { name: "Водитель", keywords: ["водитель", "driver", "haydovchi", "şoför", "ронанда", "водій"], pln: 5000, eur: 1150 },
  { name: "Строитель", keywords: ["строитель", "construction", "builder", "quruvchi", "inşaatçı", "бинокор", "будівельник"], pln: 5500, eur: 1260 },
  { name: "Автомеханик", keywords: ["автомеханик", "автослесарь", "car mechanic", "avtomexanik", "oto tamirci", "автомеханик", "автомеханік"], pln: 6800, eur: 1560 },
  { name: "Диспетчер", keywords: ["диспетчер", "dispatcher", "dispetcher", "sevkiyat memuru", "диспетчер", "диспетчер"], pln: 6300, eur: 1450 },
  { name: "Инкассатор", keywords: ["инкассатор", "cash collector", "inkassator", "para tahsildarı", "инкассатор", "інкасатор"], pln: 6500, eur: 1490 },
  { name: "Няня", keywords: ["няня", "babysitter", "nanny", "enaga", "bebek bakıcısı", "доя", "няня"], pln: 5200, eur: 1200 },
  { name: "Гувернантка", keywords: ["гувернантка", "governess", "murabbiya", "mürebbiye", "мураббия", "гувернантка"], pln: 5800, eur: 1330 },
  { name: "Спасатель", keywords: ["спасатель", "lifeguard", "qutqaruvchi", "cankurtaran", "наҷотдиҳанда", "рятувальник"], pln: 5900, eur: 1360 },
  { name: "Пожарный", keywords: ["пожарный", "firefighter", "o't o'chiruvchi", "itfaiyeci", "оташнишон", "пожежник"], pln: 6800, eur: 1560 },
  { name: "Полицейский", keywords: ["полицейский", "police officer", "politsiya xodimi", "polis memuru", "полис", "поліцейський"], pln: 6900, eur: 1590 },
  { name: "Тренер по фитнесу", keywords: ["тренер по фитнесу", "fitness trainer", "fitnes murabbiyi", "fitness eğitmeni", "мураббии фитнес", "фітнес-тренер"], pln: 6200, eur: 1430 },
  { name: "Инструктор по вождению", keywords: ["инструктор по вождению", "driving instructor", "haydovchilik instruktori", "sürücü eğitmeni", "инструктори рондан", "інструктор з водіння"], pln: 6400, eur: 1470 },
  { name: "Бортпроводник / стюардесса", keywords: ["бортпроводник", "стюардесса", "flight attendant", "bortpronitsa", "kabin memuru", "стюардесса", "бортпровідник"], pln: 7100, eur: 1630 },
  { name: "Пилот", keywords: ["пилот", "pilot", "uchuvchi", "pilot", "халабон", "пілот"], pln: 22000, eur: 5060 },
  { name: "Авиадиспетчер", keywords: ["авиадиспетчер", "air traffic controller", "aviadispetcher", "hava trafik kontrolörü", "авиадиспетчер", "авіадиспетчер"], pln: 18000, eur: 4140 },
  { name: "Специалист по закупкам", keywords: ["специалист по закупкам", "procurement specialist", "xaridlar mutaxassisi", "satın alma uzmanı", "мутахассиси харид", "фахівець із закупівель"], pln: 8200, eur: 1890 },
  { name: "Менеджер по закупкам", keywords: ["менеджер по закупкам", "purchasing manager", "xaridlar menejeri", "satın alma müdürü", "менеҷери харид", "менеджер із закупівель"], pln: 10500, eur: 2410 },
  { name: "Менеджер проекта", keywords: ["менеджер проекта", "project manager", "loyiha menejeri", "proje yöneticisi", "менеҷери лоиҳа", "менеджер проєкту"], pln: 10800, eur: 2480 },
  { name: "Бизнес-тренер", keywords: ["бизнес тренер", "business trainer", "biznes-trener", "iş koçu", "тренери бизнес", "бізнес-тренер"], pln: 8300, eur: 1910 },
  { name: "Ивент-менеджер", keywords: ["ивент менеджер", "event manager", "tadbir menejeri", "etkinlik yöneticisi", "менеҷери чорабинӣ", "івент-менеджер"], pln: 7400, eur: 1700 },
  { name: "Флорист", keywords: ["флорист", "florist", "florist", "çiçekçi", "гулфурӯш", "флорист"], pln: 5300, eur: 1220 },
  { name: "Пекарь", keywords: ["пекарь", "baker", "novvoy", "fırıncı", "наонпаз", "пекар"], pln: 5900, eur: 1360 },
  { name: "Кондитер", keywords: ["кондитер", "pastry chef", "qandolatchi", "pastacı", "қаннодӣ", "кондитер"], pln: 6100, eur: 1400 },
  { name: "Мясник", keywords: ["мясник", "butcher", "qassob", "kasap", "қассоб", "м'ясник"], pln: 6200, eur: 1430 },
  { name: "Швея", keywords: ["швея", "seamstress", "tikuvchi", "terzi", "дӯзанда", "швачка"], pln: 5100, eur: 1170 },
  { name: "Оператор call-центра", keywords: ["оператор call центра", "call center operator", "call-markaz operatori", "çağrı merkezi operatörü", "оператори маркази занг", "оператор кол-центру"], pln: 5700, eur: 1310 },
  { name: "Специалист поддержки клиентов", keywords: ["специалист поддержки клиентов", "customer support", "mijozlarni qo'llab-quvvatlash mutaxassisi", "müşteri destek uzmanı", "мутахассиси дастгирии муштариён", "фахівець підтримки клієнтів"], pln: 6300, eur: 1450 },
  { name: "Страховой агент", keywords: ["страховой агент", "insurance agent", "sug'urta agenti", "sigorta acentesi", "агенти суғурта", "страховий агент"], pln: 6900, eur: 1590 },
  { name: "Риэлтор", keywords: ["риэлтор", "real estate agent", "rielter", "emlakçı", "риэлтор", "ріелтор"], pln: 7800, eur: 1790 },
  { name: "Оценщик недвижимости", keywords: ["оценщик недвижимости", "real estate appraiser", "ko'chmas mulk baholovchisi", "gayrimenkul değerleme uzmanı", "баҳодиҳандаи амволи ғайриманқул", "оцінювач нерухомості"], pln: 8200, eur: 1890 },
  { name: "Управляющий недвижимостью", keywords: ["управляющий недвижимостью", "property manager", "ko'chmas mulk boshqaruvchisi", "emlak yöneticisi", "мудири амволи ғайриманқул", "керуючий нерухомістю"], pln: 8600, eur: 1980 },
  { name: "Няня для пожилых / сиделка на дому", keywords: ["сиделка на дому", "home caregiver", "keksalarga parvarishchi", "yaşlı bakıcısı", "нигоҳубингари пиронсолон", "доглядальниця вдома"], pln: 5900, eur: 1360 },
  { name: "Логопед", keywords: ["логопед", "speech therapist", "logoped", "konuşma terapisti", "логопед", "логопед"], pln: 6800, eur: 1580 },
  { name: "Диетолог", keywords: ["диетолог", "nutritionist", "dietolog", "beslenme uzmanı", "диетолог", "дієтолог"], pln: 7000, eur: 1630 },
  { name: "Оптометрист", keywords: ["оптометрист", "optometrist", "optometrist", "optometrist", "оптометрист", "оптометрист"], pln: 6500, eur: 1510 },
  { name: "Медицинский лаборант", keywords: ["медицинский лаборант", "medical lab technician", "tibbiy laborant", "tıbbi laboratuvar teknisyeni", "лабарантаи тиббӣ", "медичний лаборант"], pln: 6900, eur: 1600 },
  { name: "Сиделка", keywords: ["сиделка", "home care worker", "sidalka", "hasta bakıcısı", "сиделка", "сиделка"], pln: 5600, eur: 1300 },
  { name: "UX/UI-дизайнер (зарплата переверена)", keywords: ["ux ui", "ui ux", "user experience", "ux-dизайнер", "user interface", "ux ui tasarımcı", "ux ui дизайнер"], pln: 9500, eur: 2210 },
  { name: "IT Project Manager (зарплата переверена)", keywords: ["it проект менеджер", "it project", "project management", "proyekt menejeri", "project manager", "proyekt yöneticisi", "проєкт-менеджер"], pln: 10080, eur: 2340 },
  { name: "Продакт-менеджер (зарплата переверена)", keywords: ["продукт менеджер", "product", "pm", "mahsulot menejeri", "ürün yöneticisi", "продакт-менеджер"], pln: 13500, eur: 3140 },
  { name: "Инженер по кибербезопасности (зарплата переверена)", keywords: ["кибербезопасность", "security", "cybersecurity", "kiberxavfsizlik", "siber güvenlik", "кібербезпека"], pln: 13000, eur: 3020 },
  { name: "Сетевой инженер (зарплата переверена)", keywords: ["сетевой инженер", "network engineer", "tarmoq muhandis", "ağ mühendisi", "сетевой"], pln: 9500, eur: 2210 },
  { name: "IT-support", keywords: ["it support", "helpdesk", "техподдержка", "texnik yordam", "teknik destek", "технічна підтримка"], pln: 6500, eur: 1510 },
  { name: "Строитель (зарплата переверена)", keywords: ["строитель", "builder", "construction", "quruvchi", "inşaatçı", "будівельник"], pln: 6500, eur: 1510 },
  { name: "Муляр", keywords: ["муляр", "bricklayer", "mason", "g'isht", "tuğla", "мулляр"], pln: 6780, eur: 1580 },
  { name: "Столяр (зарплата переверена)", keywords: ["столяр", "carpenter", "furniture", "stolyar", "doğramacı", "столяр"], pln: 7000, eur: 1630 },
  { name: "Кровельщик (зарплата переверена)", keywords: ["кровельщик", "roofer", "roof", "tomchi", "çatıcı", "покрівельник"], pln: 7200, eur: 1670 },
  { name: "Маляр-штукатур", keywords: ["маляр штукатур", "painter plasterer", "bo'yoqchi-suvoqchi", "boyacı-sıvacı", "маляр-штукатур"], pln: 6300, eur: 1470 },
  { name: "Прораб", keywords: ["прораб", "site engineer", "prorab", "şantiye şefi", "сарусто"], pln: 11500, eur: 2670 },
  { name: "Инженер-строитель (зарплата переверена)", keywords: ["инженер строитель", "civil engineer", "qurilish muhandis", "inşaat mühendisi", "інженер-будівельник"], pln: 9500, eur: 2210 },
  { name: "Архитектор (зарплата переверена)", keywords: ["архитектор", "architect", "arxitektor", "mimar", "архітектор"], pln: 8320, eur: 1930 },
  { name: "Оператор спецтехники", keywords: ["оператор спецтехники", "heavy equipment operator", "texnika operatori", "ağır makine operatörü", "оператори техникаи махсус"], pln: 7800, eur: 1810 },
  { name: "Крановщик (зарплата переверена)", keywords: ["крановщик", "crane operator", "kranchi", "vinç operatörü", "кранівник"], pln: 8200, eur: 1910 },
  { name: "Инженер-электрик", keywords: ["инженер электрик", "electrical engineer", "elektrik muhandis", "elektrik mühendisi", "інженер-електрик"], pln: 10500, eur: 2440 },
  { name: "Инженер-механик", keywords: ["инженер механик", "mechanical engineer", "mexanika muhandis", "makine mühendisi", "інженер-механік"], pln: 9800, eur: 2280 },
  { name: "Сборщик мебели", keywords: ["сборщик мебели", "furniture assembler", "mebel yig'uvchi", "mobilya montajcısı", "сборщик меблі"], pln: 6000, eur: 1400 },
  { name: "Установщик окон и дверей", keywords: ["установщик окон", "window installer", "deraza o'rnatuvchi", "pencere kurulum", "установник вікон"], pln: 6800, eur: 1580 },
  { name: "Официант (зарплата переверена)", keywords: ["официант", "waiter", "ofitsiant", "garson", "офіціант"], pln: 5890, eur: 1370 },
  { name: "Бариста (зарплата переверена)", keywords: ["бариста", "barista", "barista", "barista", "бариста"], pln: 5500, eur: 1280 },
  { name: "Бармен (зарплата переверена)", keywords: ["бармен", "bartender", "barmen", "barmen", "бармен"], pln: 6000, eur: 1400 },
  { name: "Шеф-повар (зарплата переверена)", keywords: ["шеф повар", "head chef", "bosh oshpaz", "şef aşçı", "шеф-кухар"], pln: 9500, eur: 2210 },
  { name: "Пекарь (зарплата переверена)", keywords: ["пекарь", "baker", "novvoy", "fırıncı", "пекар"], pln: 6200, eur: 1440 },
  { name: "Кондитер (зарплата переверена)", keywords: ["кондитер", "pastry chef", "qandolatchi", "pastacı", "кондитер"], pln: 6500, eur: 1510 },
  { name: "Администратор ресторана", keywords: ["администратор ресторана", "restaurant manager", "restoran administratori", "restoran yöneticisi", "адміністратор ресторану"], pln: 7000, eur: 1630 },
  { name: "Горничная", keywords: ["горничная", "housemaid", "xizmatchi", "kameriye", "горничная"], pln: 5600, eur: 1300 },
  { name: "Хостес", keywords: ["хостес", "hostess", "xostess", "hostesi", "хостес"], pln: 5700, eur: 1330 },
  { name: "Гид", keywords: ["гид", "tour guide", "gid", "tur rehberi", "гід"], pln: 6500, eur: 1510 },
  { name: "Курьер (зарплата переверена)", keywords: ["курьер", "courier", "kuryer", "kurye", "кур'єр"], pln: 6490, eur: 1510 },
  { name: "Логист", keywords: ["логист", "logistics specialist", "logistika mutaxassisi", "lojistik uzmanı", "логіст"], pln: 8150, eur: 1900 },
  { name: "Диспетчер (зарплата переверена)", keywords: ["диспетчер", "dispatcher", "dispetcher", "sevkiyat memuru", "диспетчер"], pln: 6800, eur: 1580 },
  { name: "Таможенный брокер", keywords: ["таможенный брокер", "customs broker", "gumruk broker", "gümrük müşaviri", "брокери гумрукӣ"], pln: 8500, eur: 1980 },
  { name: "Юрист (зарплата переверена)", keywords: ["юрист", "lawyer", "yurist", "avukat", "юрист"], pln: 9520, eur: 2210 },
  { name: "Экономист", keywords: ["экономист", "economist", "iqtisodchi", "ekonomist", "економіст"], pln: 8000, eur: 1860 },
  { name: "Финансовый аналитик (зарплата переверена)", keywords: ["финансовый аналитик", "financial analyst", "moliyaviy tahlilchi", "finansal analist", "фінансовий аналітик"], pln: 9500, eur: 2210 },
  { name: "HR-менеджер", keywords: ["hr менеджер", "hr manager", "hr menejeri", "ik müdürü", "hr-менеджер"], pln: 8100, eur: 1880 },
  { name: "Рекрутер (зарплата переверена)", keywords: ["рекрутер", "recruiter", "rekruter", "işe alım uzmanı", "рекрутер"], pln: 7500, eur: 1740 },
  { name: "Маркетолог (зарплата переверена)", keywords: ["маркетолог", "marketer", "marketolog", "pazarlamacı", "маркетолог"], pln: 7560, eur: 1760 },
  { name: "SMM-менеджер", keywords: ["smm менеджер", "social media manager", "smm menejeri", "sosyal medya yöneticisi", "smm-менеджер"], pln: 6800, eur: 1580 },
  { name: "Менеджер по продажам", keywords: ["менеджер по продажам", "sales manager", "savdo menejeri", "satış müdürü", "менеджер із продажів"], pln: 8310, eur: 1930 },
  { name: "Секретарь (зарплата переверена)", keywords: ["секретарь", "secretary", "kotib", "sekreter", "секретар"], pln: 5660, eur: 1320 },
  { name: "Переводчик (зарплата переверена)", keywords: ["переводчик", "translator", "tarjimon", "çevirmen", "перекладач"], pln: 8140, eur: 1890 },
  { name: "Копирайтер (зарплата переверена)", keywords: ["копирайтер", "copywriter", "kopirayter", "metin yazarı", "копірайтер"], pln: 6500, eur: 1510 },
  { name: "Графический дизайнер (зарплата переверена)", keywords: ["графический дизайнер", "graphic designer", "grafik dizayner", "grafik tasarımcı", "графічний дизайнер"], pln: 7500, eur: 1740 },
  { name: "Фотограф (зарплата переверена)", keywords: ["фотограф", "photographer", "fotograf", "fotoğrafçı", "фотограф"], pln: 6500, eur: 1510 },
  { name: "Библиотекарь", keywords: ["библиотекарь", "librarian", "kutubxona", "kütüphaneci", "бібліотекар"], pln: 5800, eur: 1350 },
  { name: "Агент по недвижимости", keywords: ["агент по недвижимости", "real estate agent", "ko'chmas mulk agenti", "emlakçı", "агент нерухомості"], pln: 7500, eur: 1740 },
  { name: "Воспитатель детского сада", keywords: ["воспитатель", "preschool teacher", "bog'cha tarbiyachisi", "anaokulu öğretmeni", "вихователь"], pln: 6000, eur: 1400 },
  { name: "Репетитор (зарплата переверена)", keywords: ["репетитор", "tutor", "repetitor", "özel ders öğretmeni", "репетитор"], pln: 5500, eur: 1280 },
  { name: "Преподаватель вуза", keywords: ["преподаватель вуза", "university lecturer", "universitet o'qituvchisi", "üniversite öğretim görevlisi", "викладач вишу"], pln: 7500, eur: 1740 },
  { name: "Учитель иностранного языка (зарплата переверена)", keywords: ["учитель иностранного", "language teacher", "chet tili o'qituvchisi", "yabancı dil öğretmeni", "вчитель іноземної мови"], pln: 6970, eur: 1620 },
  { name: "Тренер", keywords: ["тренер", "trainer", "trener", "antrenör", "тренер"], pln: 5800, eur: 1350 },
  { name: "Кассир (зарплата переверена)", keywords: ["кассир", "cashier", "kassir", "kasiyer", "касир"], pln: 5400, eur: 1260 },
  { name: "Администратор магазина", keywords: ["администратор магазина", "store manager", "do'kon administratori", "mağaza müdürü", "адміністратор магазину"], pln: 7800, eur: 1810 },
  { name: "Мерчандайзер (зарплата переверена)", keywords: ["мерчендайзер", "merchandiser", "merchandayzer", "mağaza düzenleyicisi", "мерчандайзер"], pln: 5800, eur: 1350 },
  { name: "Оператор call-центра (зарплата переверена)", keywords: ["оператор call центра", "call center operator", "call-markaz operatori", "çağrı merkezi operatörü", "оператор кол-центру"], pln: 6000, eur: 1400 },
  { name: "Швея (зарплата переверена)", keywords: ["швея", "seamstress", "tikuvchi", "terzi", "швачка"], pln: 5800, eur: 1350 },
  { name: "Уборщик (зарплата переверена)", keywords: ["уборщик", "cleaner", "farrosh", "temizlikçi", "прибиральник"], pln: 5640, eur: 1310 },
  { name: "Охранник (зарплата переверена)", keywords: ["охранник", "security guard", "qorovul", "güvenlik görevlisi", "охоронець"], pln: 5700, eur: 1330 },
  { name: "Косметолог (зарплата переверена)", keywords: ["косметолог", "cosmetologist", "kosmetolog", "güzellik uzmanı", "косметолог"], pln: 6040, eur: 1400 },
  { name: "Массажист (зарплата переверена)", keywords: ["массажист", "massage therapist", "massajchi", "masör", "масажист"], pln: 6000, eur: 1400 },
  { name: "Мастер маникюра (зарплата переверена)", keywords: ["маникюрщица", "manicurist", "manikyurchi", "manikürcü", "майстер манікюру"], pln: 5600, eur: 1300 },
  { name: "Визажист (зарплата переверена)", keywords: ["визажист", "makeup artist", "vizajist", "makyaj sanatçısı", "візажист"], pln: 5800, eur: 1350 },
  { name: "Мастер по бровям и ресницам", keywords: ["мастер бровей", "eyebrow specialist", "qosh mutahassisi", "kaş tasarımcısı", "майстер брів"], pln: 5600, eur: 1300 },
  { name: "Тату-мастер", keywords: ["тату мастер", "tattoo artist", "tatuировщик", "dövmeci", "тату-майстер"], pln: 7000, eur: 1630 },
  { name: "Стоматолог (зарплата переверена)", keywords: ["стоматолог", "дантист", "dentist", "stomatolog", "diş hekimi", "стоматолог"], pln: 9640, eur: 2240 },
  { name: "Зубной техник (зарплата переверена)", keywords: ["зубной техник", "dental technician", "tish texnigi", "diş teknisyeni", "зубний технік"], pln: 6200, eur: 1440 },
];


// A short, representative subset shown as quick-pick chips in the
// "profession not found" state — showing all ~200+ entries there would be
// an unusable wall of buttons, so we curate the most commonly searched ones.
const POPULAR_PROFESSIONS = [
  "Программист",
  "Врач общей практики",
  "Медсестра",
  "Учитель математики",
  "Электрик",
  "Сантехник",
  "Повар",
  "Водитель грузовика (дальнобойщик)",
  "Продавец-консультант",
  "Бухгалтер",
  "Парикмахер",
  "Работник склада",
];

const JOB_SITES = [
  { key: "pracuj", name: "Pracuj.pl", href: "https://www.pracuj.pl/" },
  { key: "nofluff", name: "NoFluffJobs", href: "https://nofluffjobs.com/" },
  { key: "linkedin", name: "LinkedIn", href: "https://www.linkedin.com/jobs/" },
] as const;

const PROFESSION_JOB_SITES = [
  { key: "pracuj", name: "Pracuj.pl", buildHref: (q: string) => `https://www.pracuj.pl/praca/${encodeURIComponent(q)};kw` },
  { key: "nofluff", name: "NoFluffJobs", buildHref: (q: string) => `https://nofluffjobs.com/pl/jobs?search=${encodeURIComponent(q)}` },
  { key: "justjoin", name: "JustJoin.it", buildHref: (q: string) => `https://justjoin.it/?keyword=${encodeURIComponent(q)}` },
  { key: "olx", name: "OLX", buildHref: (q: string) => `https://www.olx.pl/praca/q-${encodeURIComponent(q)}/` },
] as const;

// Job sites are Polish, so search terms need to be in Polish to return results.
const PROFESSION_PL_TRANSLATIONS: Record<string, string> = {
  программист: "programista",
  преподаватель: "nauczyciel",
  водитель: "kierowca",
  строитель: "budowlaniec",
  повар: "kucharz",
  врач: "lekarz",
  медсестра: "pielęgniarka",
  бухгалтер: "księgowy",
  менеджер: "menedżer",
  продавец: "sprzedawca",
  юрист: "prawnik",
  инженер: "inżynier",
  дизайнер: "designer",
  маркетолог: "marketingowiec",
  переводчик: "tłumacz",
  охранник: "ochroniarz",
  уборщик: "sprzątacz",
  электрик: "elektryk",
  сантехник: "hydraulik",
  механик: "mechanik",
};

function translateProfessionToPolish(profession: string): string {
  return PROFESSION_PL_TRANSLATIONS[profession.trim().toLowerCase()] ?? profession;
}

const SPARKLE_ICON = (
  <svg className="h-[17px] w-[17px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
    />
  </svg>
);

// One icon + one uniform bullet symbol per contract type, so every point in
// a card reads as "safe" or "risky" at a glance instead of every card using
// the same green checkmark regardless of whether the point is a benefit.
const CONTRACT_STYLE = {
  employment: {
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      </svg>
    ),
    symbol: "✓",
    border: "border-emerald-500/30",
    iconBg: "bg-emerald-500/15",
    text: "text-emerald-400",
  },
  b2b: {
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path strokeLinecap="round" d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
      </svg>
    ),
    symbol: "◆",
    border: "border-accent/30",
    iconBg: "bg-accent/15",
    text: "text-accent-bright",
  },
  zlecenie: {
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8M8 16h5M7 3h10a1 1 0 011 1v16l-3-2-3 2-3-2-3 2V4a1 1 0 011-1z" />
      </svg>
    ),
    symbol: "●",
    border: "border-amber-500/30",
    iconBg: "bg-amber-500/15",
    text: "text-amber-400",
  },
  dzialo: {
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.7 6.3a1 1 0 010 1.4l-1 1 1.6 1.6-4.2 4.2-1.6-1.6-1 1a1 1 0 01-1.4 0L4.3 11a1 1 0 010-1.4l1-1L3.7 7 5 5.7l1.6 1.6 1-1a1 1 0 011.4 0L11 8.3l3-3-1-1L14.7 3l3 3z"
        />
      </svg>
    ),
    symbol: "−",
    border: "border-rose-500/30",
    iconBg: "bg-rose-500/15",
    text: "text-rose-400",
  },
} as const;

function lookupSalary(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return null;
  return SALARY_DATA.find((entry) => entry.keywords.some((k) => q.includes(k))) ?? null;
}

function getSuggestions(query: string): string[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const suggestions = new Set<string>();
  SALARY_DATA.forEach((entry) => {
    const matches = entry.keywords.some((keyword) => keyword.toLowerCase().startsWith(q));
    if (matches) suggestions.add(entry.name);
  });

  return Array.from(suggestions).sort();
}

function SalaryCalculator() {
  const { t } = useLanguage();
  const [bruttoInput, setBruttoInput] = useState("");
  const [contractType, setContractType] = useState<"employment" | "b2b">("employment");
  const [b2bTaxType, setB2bTaxType] = useState<"12" | "19">("12");
  const [under26, setUnder26] = useState(false);
  const [b2bPeriod, setB2bPeriod] = useState<"0-6" | "6-30" | "30+">("30+");

  const brutto = parseFloat(bruttoInput) || 0;
  const monthlyBrutto = brutto;

  let netto = 0;
  let zus = 0;
  let healthInsurance = 0;
  let tax = 0;
  let breakdown: { label: string; value: number }[] = [];

  if (contractType === "employment" && brutto > 0) {
    zus = brutto * 0.1371;
    const healthBase = brutto - zus;
    healthInsurance = healthBase * 0.09;

    const annualBrutto = monthlyBrutto * 12;
    const annualTaxableBase = Math.max(0, annualBrutto - zus * 12 - 250 * 12);
    let annualTax = 0;

    if (under26) {
      annualTax = Math.max(0, (annualTaxableBase - 85528) * 0.32);
    } else if (annualTaxableBase <= 120000) {
      annualTax = Math.max(0, annualTaxableBase * 0.12 - 3600);
    } else {
      annualTax = 120000 * 0.12 - 3600 + (annualTaxableBase - 120000) * 0.32;
    }

    tax = Math.round((annualTax / 12) * 100) / 100;
    netto = Math.round((brutto - zus - healthInsurance - tax) * 100) / 100;

    breakdown = [
      { label: t.work.salaryCalculator.brutto, value: brutto },
      { label: `${t.work.salaryCalculator.zus} (${t.work.salaryCalculator.zusTooltip.split(" (")[1]}`, value: Math.round(zus * 100) / 100 },
      { label: t.work.salaryCalculator.healthInsurance, value: Math.round(healthInsurance * 100) / 100 },
      { label: t.work.salaryCalculator.incomeTax, value: Math.round(tax * 100) / 100 },
      { label: t.work.salaryCalculator.netto, value: netto },
    ];
  } else if (contractType === "b2b" && brutto > 0) {
    let zusSpoleczne = 0;
    if (b2bPeriod === "0-6") {
      zusSpoleczne = 0;
    } else if (b2bPeriod === "6-30") {
      zusSpoleczne = 960;
    } else {
      zusSpoleczne = 1788.29;
    }

    let healthInsuranceB2b = 0;
    const annualIncome = monthlyBrutto * 12;

    if (b2bTaxType === "12") {
      if (annualIncome <= 60000) healthInsuranceB2b = 498.35;
      else if (annualIncome <= 300000) healthInsuranceB2b = 830.58;
      else healthInsuranceB2b = 1495.04;
    } else {
      healthInsuranceB2b = Math.max(432.54, annualIncome * 0.049 / 12);
    }

    const taxableBase = Math.max(0, brutto - zusSpoleczne);
    const taxRate = b2bTaxType === "12" ? 0.12 : 0.19;
    const taxAmount = Math.round(taxableBase * taxRate * 100) / 100;
    netto = Math.round((brutto - zusSpoleczne - healthInsuranceB2b - taxAmount) * 100) / 100;

    breakdown = [
      { label: t.work.salaryCalculator.income, value: brutto },
      { label: t.work.salaryCalculator.zusTooltip, value: Math.round(zusSpoleczne * 100) / 100 },
      { label: t.work.salaryCalculator.healthInsurance, value: Math.round(healthInsuranceB2b * 100) / 100 },
      { label: b2bTaxType === "12" ? t.work.salaryCalculator.taxRate12 : t.work.salaryCalculator.taxRate19, value: taxAmount },
      { label: t.work.salaryCalculator.nettoEstimate, value: netto },
    ];
  }

  return (
    <Reveal delay={280} className="mt-12">
      <h2 className="text-xl font-bold tracking-tight text-text-primary">{t.work.salaryCalculator.title}</h2>
      <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-text-muted">{t.work.salaryCalculator.grossSalaryLabel}</label>
            <input
              type="number"
              value={bruttoInput}
              onChange={(e) => setBruttoInput(e.target.value)}
              placeholder={t.work.salaryCalculator.grossSalaryPlaceholder}
              className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-text-primary outline-none transition-colors focus:border-accent/50 focus:bg-white/[0.08]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-text-muted">{t.work.salaryCalculator.contractTypeLabel}</label>
            <div className="mt-2 flex gap-3">
              <button
                onClick={() => setContractType("employment")}
                className={`flex-1 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
                  contractType === "employment"
                    ? "border-accent/50 bg-accent/10 text-accent-bright"
                    : "border-white/10 bg-white/[0.05] text-text-muted hover:border-accent/30"
                }`}
              >
                {t.work.salaryCalculator.contractTypeEmployment}
              </button>
              <button
                onClick={() => setContractType("b2b")}
                className={`flex-1 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
                  contractType === "b2b"
                    ? "border-accent/50 bg-accent/10 text-accent-bright"
                    : "border-white/10 bg-white/[0.05] text-text-muted hover:border-accent/30"
                }`}
              >
                {t.work.salaryCalculator.contractTypeB2b}
              </button>
            </div>
          </div>

          {contractType === "employment" && (
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={under26}
                onChange={(e) => setUnder26(e.target.checked)}
                className="h-4 w-4 rounded border-border-strong"
              />
              <span className="text-xs font-semibold text-text-muted">{t.work.salaryCalculator.under26Label}</span>
            </label>
          )}

          {contractType === "b2b" && (
            <>
              <div>
                <label className="text-xs font-semibold text-text-muted">{t.work.salaryCalculator.taxFormLabel}</label>
                <div className="mt-2 flex gap-3">
                  <button
                    onClick={() => setB2bTaxType("12")}
                    className={`flex-1 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
                      b2bTaxType === "12"
                        ? "border-accent/50 bg-accent/10 text-accent-bright"
                        : "border-white/10 bg-white/[0.05] text-text-muted hover:border-accent/30"
                    }`}
                  >
                    Ryczałt 12%
                  </button>
                  <button
                    onClick={() => setB2bTaxType("19")}
                    className={`flex-1 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
                      b2bTaxType === "19"
                        ? "border-accent/50 bg-accent/10 text-accent-bright"
                        : "border-white/10 bg-white/[0.05] text-text-muted hover:border-accent/30"
                    }`}
                  >
                    Liniowy 19%
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-text-muted">{t.work.salaryCalculator.b2bPeriodLabel}</label>
                <div className="mt-2 flex gap-2 flex-col">
                  <button
                    onClick={() => setB2bPeriod("0-6")}
                    className={`rounded-lg border px-3 py-2 text-xs font-semibold text-left transition-colors ${
                      b2bPeriod === "0-6"
                        ? "border-accent/50 bg-accent/10 text-accent-bright"
                        : "border-white/10 bg-white/[0.05] text-text-muted hover:border-accent/30"
                    }`}
                  >
                    {t.work.salaryCalculator.b2bPeriod0_6}
                  </button>
                  <button
                    onClick={() => setB2bPeriod("6-30")}
                    className={`rounded-lg border px-3 py-2 text-xs font-semibold text-left transition-colors ${
                      b2bPeriod === "6-30"
                        ? "border-accent/50 bg-accent/10 text-accent-bright"
                        : "border-white/10 bg-white/[0.05] text-text-muted hover:border-accent/30"
                    }`}
                  >
                    {t.work.salaryCalculator.b2bPeriod6_30}
                  </button>
                  <button
                    onClick={() => setB2bPeriod("30+")}
                    className={`rounded-lg border px-3 py-2 text-xs font-semibold text-left transition-colors ${
                      b2bPeriod === "30+"
                        ? "border-accent/50 bg-accent/10 text-accent-bright"
                        : "border-white/10 bg-white/[0.05] text-text-muted hover:border-accent/30"
                    }`}
                  >
                    {t.work.salaryCalculator.b2bPeriod30Plus}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {brutto > 0 && (
          <div className="mt-6 space-y-4">
            <div>
              <p className="text-xs text-text-muted">{t.work.salaryCalculator.netto}</p>
              <p className="mt-1 bg-gradient-to-br from-white to-slate-400 bg-clip-text text-xl font-bold text-transparent">
                {netto.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} PLN
              </p>
            </div>

            <div className="space-y-2">
              {breakdown.map((item) => (
                <div key={item.label} className="flex justify-between text-xs">
                  <span className="text-text-muted">{item.label}</span>
                  <span className="font-semibold text-text-primary">
                    {item.value.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} PLN
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="mt-6 text-xs text-text-muted">
          Расчёт приблизительный, не заменяет консультацию бухгалтера. Не учитывает региональные различия и индивидуальные вычеты. Для Mały ZUS Plus сумма указана ориентировочно.
        </p>
      </div>
    </Reveal>
  );
}

export default function WorkPage() {
  const router = useRouter();
  const { t, lang } = useLanguage();
  // No persistence on purpose — the profession search always starts blank
  // on every page load/refresh, per explicit request (previously it was
  // remembered across visits via localStorage, which read as a bug).
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const result = useMemo(() => lookupSalary(query), [query]);
  const suggestions = useMemo(() => getSuggestions(query), [query]);
  const profession = query.trim();
  const professionPl = useMemo(() => (profession ? translateProfessionToPolish(profession) : ""), [profession]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const CONTRACT_TYPES = [
    {
      key: "employment" as const,
      name: t.work.employmentSubtitle,
      subtitle: t.work.employmentFullSubtitle,
      features: t.work.employmentFeatures,
      badge: t.work.contractBadges.employment,
      guideHeading: t.work.guides.employment?.heading,
      guideSteps: t.work.guides.employment?.steps || [],
      aiQuestion: t.work.guides.employment?.aiQuestion,
    },
    {
      key: "b2b" as const,
      name: t.work.b2bContractName,
      subtitle: t.work.b2bSubtitle,
      features: t.work.b2bFeatures,
      badge: t.work.contractBadges.b2b,
      guideHeading: t.work.guides.b2b?.heading,
      guideSteps: t.work.guides.b2b?.steps || [],
      aiQuestion: t.work.guides.b2b?.aiQuestion,
    },
    {
      key: "zlecenie" as const,
      name: t.work.zlecenieName,
      subtitle: t.work.zleceniaSubtitle,
      features: t.work.zleceniaFeatures,
      badge: t.work.contractBadges.zlecenie,
      guideHeading: t.work.guides.employment?.heading || "Как оформить договор поручения",
      guideSteps: t.work.guides.employment?.steps || [],
      aiQuestion: "Что такое договор поручения (Umowa zlecenie) и как его получить?",
    },
    {
      key: "dzialo" as const,
      name: t.work.dzialoName,
      subtitle: t.work.dzialoSubtitle,
      features: t.work.dzialoFeatures,
      badge: t.work.contractBadges.dzialo,
      guideHeading: t.work.guides.employment?.heading || "Как оформить договор подряда",
      guideSteps: t.work.guides.employment?.steps || [],
      aiQuestion: "Что такое договор подряда (Umowa o dzieło) и как его получить?",
    },
  ];

  return (
    <div className="px-6 py-8 lg:px-10 lg:py-10">
      <PageHeader
        title={
          <span className="inline-flex items-center gap-3">
            {t.work.title}
            <Image src={getFlagUrl("pl", "md")} alt="Poland" width={32} height={24} className="rounded-sm" unoptimized />
          </span>
        }
        subtitle={t.work.subtitle}
      />

      <Reveal delay={160} className="mt-12">
        <h2 className="text-xl font-bold tracking-tight text-text-primary">{t.work.contractVsB2B}</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {CONTRACT_TYPES.map((type, index) => {
            const style = CONTRACT_STYLE[type.key];
            return (
              <Reveal key={type.key} delay={index * 40}>
                <div className={`flex h-full flex-col rounded-2xl border ${style.border} bg-surface-1 p-5 backdrop-blur-sm`}>
                  <div className="flex items-center gap-2">
                    <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${style.iconBg} ${style.text}`}>
                      {style.icon}
                    </span>
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${style.iconBg} ${style.text}`}>
                      {type.badge}
                    </span>
                  </div>
                  <div className="mt-2.5 min-h-[44px]">
                    <p className="text-sm font-semibold text-text-primary">{type.name}</p>
                    <p className="text-xs text-text-muted">{type.subtitle}</p>
                  </div>
                  <ul className="mt-2.5 space-y-2.5">
                    {type.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-text-muted">
                        <span className={`mt-0.5 flex-shrink-0 text-sm font-bold ${style.text}`}>{style.symbol}</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {type.guideHeading && (
                    <div className="mt-auto pt-4">
                      <HelpButton
                        guideHeading={type.guideHeading}
                        guideSteps={type.guideSteps}
                        aiQuestion={type.aiQuestion}
                        label={t.helpButton.label}
                      />
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-5 rounded-[28px] bg-[#1c1f26] p-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-bright">
              {SPARKLE_ICON}
            </span>
            <p className="text-[15px] font-bold text-white">{t.work.faqHeading}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {t.work.faqQuestions.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => router.push(`/dashboard/ai?q=${encodeURIComponent(q)}`)}
                className="rounded-full bg-white/[0.06] px-3.5 py-2.5 text-[13px] text-white/70 transition-colors duration-150 hover:bg-accent hover:text-white"
              >
                {q} →
              </button>
            ))}
          </div>
          <p className="mt-3.5 text-xs text-white/40">{t.work.faqCaption}</p>
        </div>
      </Reveal>

      <Reveal delay={40} className="mt-12">
        <h2 className="text-xl font-bold tracking-tight text-text-primary">{t.work.salarySearch}</h2>
        <p className="mt-1 text-sm text-text-muted">{t.work.salarySearchSub}</p>
        <div className="mt-4 rounded-2xl border border-border-subtle bg-surface-1 p-5 backdrop-blur-sm">
          <div ref={searchContainerRef} className="relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => setShowSuggestions(true)}
              placeholder={t.work.placeholder}
              className="w-full rounded-xl border border-border-subtle bg-surface-1 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-[border-color,box-shadow] duration-150 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-border-subtle bg-slate-950 backdrop-blur-sm shadow-lg z-10">
                <ul className="max-h-48 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <li key={`${suggestion}-${index}`}>
                      <button
                        type="button"
                        onMouseDown={(event) => {
                          event.preventDefault();
                          handleSuggestionClick(suggestion);
                        }}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full px-4 py-2.5 text-left text-sm text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {suggestion}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {profession && !result && (
            <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 transition-[opacity,transform] duration-300 ease-[var(--ease-out-strong)] starting:opacity-0 starting:translate-y-2">
              <p className="text-sm font-semibold text-red-300">{t.work.notFoundHeading}</p>
              <p className="mt-1 text-xs text-red-300/70">{t.work.notFoundTryThese}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {POPULAR_PROFESSIONS.map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setQuery(name)}
                    className="rounded-full border border-border-strong bg-surface-1 px-3.5 py-1.5 text-xs font-semibold text-text-secondary transition-colors duration-150 hover:border-accent/40 hover:text-accent-bright"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {result && (
            <div className="mt-4 transition-[opacity,transform] duration-300 ease-[var(--ease-out-strong)] starting:opacity-0 starting:translate-y-2">
              <p className="text-sm font-medium text-text-secondary">{t.work.averageSalary}</p>
              <p className="mt-2 bg-gradient-to-br from-text-primary to-text-muted bg-clip-text text-3xl font-bold text-transparent">
                {result.pln.toLocaleString(lang)} PLN / {t.work.perMonth}
              </p>
              <p className="mt-1 text-lg font-semibold text-accent-bright">
                ≈ €{result.eur.toLocaleString(lang)} / {t.work.perMonth}
              </p>
              <p className="mt-3 text-xs text-text-muted">{t.work.salaryNote}</p>

              <div className="mt-5 border-t border-border-subtle pt-4">
                <p className="text-sm font-semibold text-text-primary">{t.work.searchByProfession}</p>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {PROFESSION_JOB_SITES.map((site) => (
                    <a
                      key={site.key}
                      href={site.buildHref(professionPl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-between gap-3 rounded-xl border border-border-subtle bg-surface-1 px-4 py-2.5 text-sm transition-colors duration-150 hover:border-accent/40 hover:bg-accent/5 ${pressScale}`}
                    >
                      <span className="font-semibold text-text-primary">{site.name}</span>
                      <span className="flex flex-shrink-0 items-center gap-1.5 text-xs font-medium text-accent-bright">
                        {t.work.viewVacanciesBtn}
                        <span aria-hidden>→</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Reveal>


      <SalaryCalculator />

      <Reveal delay={120} className="mt-12">
        <h2 className="text-xl font-bold tracking-tight text-text-primary">{t.work.jobSites}</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {JOB_SITES.map((site, index) => (
            <Reveal key={site.key} delay={index * 40}>
              <div className="group flex h-full flex-col rounded-2xl border border-border-subtle bg-surface-1 p-5 backdrop-blur-sm transition-[transform,box-shadow,border-color,background-color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:border-accent/50 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-surface-hover [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_12px_32px_-12px_rgba(33,85,212,0.45)] motion-reduce:transition-none">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-sm font-bold text-accent-bright transition-transform duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105 motion-reduce:transition-none">
                  {site.name.slice(0, 2).toUpperCase()}
                </span>
                <p className="mt-3 text-sm font-semibold text-text-primary">{site.name}</p>
                <p className="mt-1 flex-1 text-xs text-text-muted">{t.work.jobSiteDescs[site.key]}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Link
                    href={site.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/50 px-4 py-2 text-xs font-semibold text-accent-bright transition-[background-color,border-color,color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:border-accent [@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent [@media(hover:hover)_and_(pointer:fine)]:hover:text-white motion-reduce:transition-none ${pressScale}`}
                  >
                    {t.work.visitSite}
                    <span aria-hidden>→</span>
                  </Link>
                  {t.work.guides[site.key] && (
                    <HelpButton
                      guideHeading={t.work.guides[site.key].heading}
                      guideSteps={t.work.guides[site.key].steps}
                      aiQuestion={t.work.guides[site.key].aiQuestion}
                      label={t.helpButton.label}
                    />
                  )}
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={160}>
            <div className="group flex h-full flex-col rounded-2xl border border-border-subtle bg-surface-1 p-5 backdrop-blur-sm transition-[transform,box-shadow,border-color,background-color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:border-accent/50 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-surface-hover [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_12px_32px_-12px_rgba(33,85,212,0.45)] motion-reduce:transition-none">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-sm font-bold text-accent-bright">PU</span>
              <p className="mt-3 text-sm font-semibold text-text-primary">PUP</p>
              <p className="mt-1 flex-1 text-xs text-text-muted">Государственная биржа труда — бесплатная регистрация, поиск вакансий, пособие по безработице</p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Link
                  href="https://praca.gov.pl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/50 px-4 py-2 text-xs font-semibold text-accent-bright transition-[background-color,border-color,color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:border-accent [@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent [@media(hover:hover)_and_(pointer:fine)]:hover:text-white motion-reduce:transition-none ${pressScale}`}
                >
                  Найти PUP
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </Reveal>

      <Reveal delay={190} className="mt-12">
        <h2 className="text-xl font-bold tracking-tight text-text-primary">Признание диплома (нострификация)</h2>
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
          <p className="text-sm text-text-secondary">
            Для регулируемых профессий (врач, юрист, инженер-строитель, архитектор, фармацевт, ветеринар и др.) диплом нужно официально признать в Польше, прежде чем работать по специальности. Обращайтесь в профильную палату (например, Naczelna Izba Lekarska для врачей) или в Министерство науки и высшего образования.
          </p>
          <Link
            href="https://www.gov.pl/web/nauka/nostryfikacja-dyplomow"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-accent/50 px-4 py-2 text-xs font-semibold text-accent-bright transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-white"
          >
            Узнать подробнее
            <span aria-hidden>→</span>
          </Link>
        </div>
      </Reveal>

      <Reveal delay={220} className="mt-12">
        <h2 className="text-xl font-bold tracking-tight text-text-primary">На что обратить внимание при трудоустройстве</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-3">
          <Reveal delay={0}>
            <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-5 backdrop-blur-sm">
              <p className="text-sm font-semibold text-red-400">Работа без договора</p>
              <p className="mt-2 text-xs text-text-secondary">Устная договорённость не даёт прав на отпуск, больничный, легализацию пребывания. Требуйте договор в письменном виде до выхода на работу.</p>
            </div>
          </Reveal>
          <Reveal delay={40}>
            <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-5 backdrop-blur-sm">
              <p className="text-sm font-semibold text-red-400">Неоплачиваемый испытательный срок</p>
              <p className="mt-2 text-xs text-text-secondary">Испытательный срок должен быть частью оплачиваемого договора. Если просят поработать бесплатно 'на пробу' — это незаконно.</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-5 backdrop-blur-sm">
              <p className="text-sm font-semibold text-red-400">Обещание оформить документы 'потом'</p>
              <p className="mt-2 text-xs text-text-secondary">Легализация должна начинаться сразу при устройстве. Отсрочки часто означают, что работодатель не планирует оформлять вас официально.</p>
            </div>
          </Reveal>
        </div>
      </Reveal>
    </div>
  );
}
