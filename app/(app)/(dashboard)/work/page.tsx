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
  { name: "Программист", keywords: ["программист", "разработчик", "software", "developer", "programmer"], pln: 11900, eur: 2740 },
  { name: ".NET разработчик", keywords: ["net разработчик", "dotnet", "net developer", ".net"], pln: 12750, eur: 2930 },
  { name: "Java разработчик", keywords: ["java разработчик", "java developer", "джава"], pln: 14270, eur: 3280 },
  { name: "Frontend-разработчик", keywords: ["frontend", "фронтенд", "front-end"], pln: 12690, eur: 2920 },
  { name: "Backend-разработчик", keywords: ["backend", "бэкенд", "back-end"], pln: 13000, eur: 2990 },
  { name: "Android-разработчик", keywords: ["android разработчик", "андроид"], pln: 12520, eur: 2880 },
  { name: "iOS-разработчик", keywords: ["ios разработчик", "айос"], pln: 12480, eur: 2870 },
  { name: "Мобильный разработчик", keywords: ["мобильный разработчик", "mobile developer"], pln: 11500, eur: 2640 },
  { name: "UX/UI дизайнер", keywords: ["ux", "ui", "юэкс", "юай", "product designer"], pln: 10710, eur: 2460 },
  { name: "DevOps-инженер", keywords: ["devops", "девопс"], pln: 16070, eur: 3690 },
  { name: "QA-инженер / тестировщик", keywords: ["qa", "тестировщик", "tester", "testing"], pln: 10110, eur: 2320 },
  { name: "QA Automation инженер", keywords: ["automation qa", "автотестировщик", "qa automation"], pln: 12000, eur: 2760 },
  { name: "IT project manager", keywords: ["it project manager", "айти менеджер проекта"], pln: 15970, eur: 3670 },
  { name: "Product manager", keywords: ["product manager", "продакт менеджер"], pln: 10520, eur: 2420 },
  { name: "Product owner", keywords: ["product owner", "продакт оунер"], pln: 10500, eur: 2410 },
  { name: "Scrum master", keywords: ["scrum master", "скрам мастер"], pln: 15440, eur: 3550 },
  { name: "Бизнес-аналитик (IT)", keywords: ["бизнес аналитик", "business analyst"], pln: 11540, eur: 2650 },
  { name: "Системный аналитик", keywords: ["системный аналитик", "systems analyst"], pln: 12130, eur: 2790 },
  { name: "Data analyst", keywords: ["data analyst", "аналитик данных"], pln: 9750, eur: 2240 },
  { name: "Data scientist", keywords: ["data scientist", "дата сайентист"], pln: 9650, eur: 2220 },
  { name: "Big Data аналитик", keywords: ["big data", "биг дата"], pln: 11780, eur: 2710 },
  { name: "Сетевой администратор", keywords: ["сетевой администратор", "network admin"], pln: 9990, eur: 2300 },
  { name: "Системный администратор", keywords: ["системный администратор", "sysadmin", "system administrator"], pln: 9000, eur: 2070 },
  { name: "Администратор баз данных", keywords: ["администратор баз данных", "dba", "database administrator"], pln: 9800, eur: 2250 },
  { name: "Специалист по кибербезопасности", keywords: ["кибербезопасность", "security engineer", "cybersecurity"], pln: 12250, eur: 2820 },
  { name: "IT support / helpdesk", keywords: ["helpdesk", "техподдержка", "it support"], pln: 6200, eur: 1430 },
  { name: "PLC программист", keywords: ["plc программист", "plc programmer"], pln: 10790, eur: 2480 },
  { name: "Врач общей практики", keywords: ["врач", "терапевт", "general practitioner", "doctor"], pln: 12000, eur: 2760 },
  { name: "Семейный врач", keywords: ["семейный врач", "family doctor"], pln: 16060, eur: 3690 },
  { name: "Педиатр", keywords: ["педиатр", "pediatrician"], pln: 13930, eur: 3200 },
  { name: "Кардиолог", keywords: ["кардиолог", "cardiologist"], pln: 16290, eur: 3740 },
  { name: "Хирург", keywords: ["хирург", "surgeon"], pln: 13370, eur: 3070 },
  { name: "Анестезиолог", keywords: ["анестезиолог", "anesthesiologist"], pln: 17700, eur: 4070 },
  { name: "Психиатр", keywords: ["психиатр", "psychiatrist"], pln: 17120, eur: 3940 },
  { name: "Врач-профпатолог", keywords: ["профпатолог", "occupational medicine"], pln: 9360, eur: 2150 },
  { name: "Врач-интерн / резидент", keywords: ["интерн", "резидент", "resident doctor"], pln: 9410, eur: 2160 },
  { name: "Стоматолог", keywords: ["стоматолог", "dentist", "зубной врач"], pln: 9640, eur: 2220 },
  { name: "Зубной техник", keywords: ["зубной техник", "dental technician"], pln: 6860, eur: 1580 },
  { name: "Гигиенист стоматологический", keywords: ["гигиенист", "dental hygienist"], pln: 6590, eur: 1510 },
  { name: "Ассистент стоматолога", keywords: ["ассистент стоматолога", "dental assistant"], pln: 6140, eur: 1410 },
  { name: "Медсестра", keywords: ["медсестра", "медбрат", "nurse"], pln: 8970, eur: 2060 },
  { name: "Старшая медсестра", keywords: ["старшая медсестра", "head nurse"], pln: 9750, eur: 2240 },
  { name: "Операционная медсестра", keywords: ["операционная медсестра", "operating room nurse"], pln: 9020, eur: 2070 },
  { name: "Акушерка", keywords: ["акушерка", "midwife"], pln: 8010, eur: 1840 },
  { name: "Фармацевт", keywords: ["фармацевт", "pharmacist"], pln: 8800, eur: 2020 },
  { name: "Фармацевт-технолог", keywords: ["фармацевт технолог", "pharmacy technician"], pln: 6000, eur: 1380 },
  { name: "Парамедик / фельдшер скорой помощи", keywords: ["парамедик", "фельдшер", "paramedic"], pln: 9850, eur: 2260 },
  { name: "Физиотерапевт", keywords: ["физиотерапевт", "physiotherapist"], pln: 7690, eur: 1770 },
  { name: "Ветеринар", keywords: ["ветеринар", "veterinarian"], pln: 8320, eur: 1910 },
  { name: "Врач-лаборант / диагностика", keywords: ["лаборант диагностика", "laboratory diagnostician"], pln: 7820, eur: 1800 },
  { name: "Лаборант", keywords: ["лаборант", "lab technician"], pln: 6000, eur: 1380 },
  { name: "Сиделка / патронажный работник", keywords: ["сиделка", "патронаж", "caregiver"], pln: 6200, eur: 1430 },
  { name: "Психолог", keywords: ["психолог", "psychologist"], pln: 7700, eur: 1770 },
  { name: "Учитель математики", keywords: ["учитель математики", "math teacher"], pln: 6970, eur: 1600 },
  { name: "Учитель иностранного языка", keywords: ["учитель иностранного", "language teacher"], pln: 6970, eur: 1600 },
  { name: "Учитель истории", keywords: ["учитель истории", "history teacher"], pln: 6900, eur: 1590 },
  { name: "Учитель информатики", keywords: ["учитель информатики", "it teacher"], pln: 7200, eur: 1660 },
  { name: "Учитель физкультуры", keywords: ["учитель физкультуры", "pe teacher"], pln: 6500, eur: 1490 },
  { name: "Воспитатель детского сада", keywords: ["воспитатель", "preschool teacher"], pln: 5950, eur: 1370 },
  { name: "Заведующий детским садом", keywords: ["заведующий детским садом", "preschool director"], pln: 7500, eur: 1720 },
  { name: "Репетитор", keywords: ["репетитор", "tutor"], pln: 5500, eur: 1260 },
  { name: "Профессор университета", keywords: ["профессор", "university professor"], pln: 11550, eur: 2660 },
  { name: "Преподаватель вуза", keywords: ["преподаватель", "university lecturer"], pln: 8850, eur: 2030 },
  { name: "Доцент", keywords: ["доцент", "assistant professor"], pln: 8670, eur: 1990 },
  { name: "Архитектор", keywords: ["архитектор", "architect"], pln: 8320, eur: 1910 },
  { name: "Дизайнер интерьера", keywords: ["дизайнер интерьера", "interior architect"], pln: 7380, eur: 1700 },
  { name: "Инженер-строитель", keywords: ["инженер строитель", "civil engineer"], pln: 9120, eur: 2100 },
  { name: "Прораб / строительный инженер", keywords: ["прораб", "site engineer"], pln: 8650, eur: 1990 },
  { name: "Инженер-конструктор", keywords: ["инженер конструктор", "design engineer"], pln: 9180, eur: 2110 },
  { name: "Инженер по качеству", keywords: ["инженер по качеству", "quality engineer"], pln: 9320, eur: 2140 },
  { name: "Инженер-химик", keywords: ["инженер химик", "chemical engineer"], pln: 9500, eur: 2180 },
  { name: "Геодезист", keywords: ["геодезист", "surveyor"], pln: 6760, eur: 1550 },
  { name: "Инженер-электронщик", keywords: ["инженер электронщик", "electronics engineer"], pln: 10710, eur: 2460 },
  { name: "Инженер-энергетик", keywords: ["инженер энергетик", "power engineer"], pln: 9700, eur: 2230 },
  { name: "Электротехник", keywords: ["электротехник", "electrical technician"], pln: 7450, eur: 1710 },
  { name: "Инженер-технолог", keywords: ["инженер технолог процессов", "process engineer"], pln: 9000, eur: 2070 },
  { name: "Инженер-эколог", keywords: ["инженер эколог", "environmental engineer"], pln: 8500, eur: 1950 },
  { name: "Инженер по продажам", keywords: ["инженер по продажам", "sales engineer"], pln: 9500, eur: 2180 },
  { name: "Технолог производства", keywords: ["технолог производства", "production technologist"], pln: 8090, eur: 1860 },
  { name: "Планировщик производства", keywords: ["планировщик производства", "production planner"], pln: 8200, eur: 1890 },
  { name: "Бухгалтер", keywords: ["бухгалтер", "accountant"], pln: 7660, eur: 1760 },
  { name: "Налоговый консультант", keywords: ["налоговый консультант", "tax advisor"], pln: 9100, eur: 2090 },
  { name: "Юрист", keywords: ["юрист", "lawyer"], pln: 9520, eur: 2190 },
  { name: "Юрисконсульт", keywords: ["юрисконсульт", "legal advisor"], pln: 13540, eur: 3110 },
  { name: "Нотариус", keywords: ["нотариус", "notary"], pln: 10680, eur: 2460 },
  { name: "Финансовый аналитик", keywords: ["финансовый аналитик", "financial analyst"], pln: 10180, eur: 2340 },
  { name: "Финансовый контролёр", keywords: ["финансовый контролер", "financial controller"], pln: 11430, eur: 2630 },
  { name: "Кредитный аналитик", keywords: ["кредитный аналитик", "credit analyst"], pln: 9180, eur: 2110 },
  { name: "Банковский аналитик", keywords: ["банковский аналитик", "bank analyst"], pln: 9320, eur: 2140 },
  { name: "Клиентский менеджер банка", keywords: ["клиентский менеджер банка", "bank advisor"], pln: 6780, eur: 1560 },
  { name: "Инвестиционный консультант", keywords: ["инвестиционный консультант", "private banking"], pln: 10010, eur: 2300 },
  { name: "Внутренний аудитор", keywords: ["внутренний аудитор", "internal auditor"], pln: 9800, eur: 2250 },
  { name: "Актуарий", keywords: ["актуарий", "actuary"], pln: 14000, eur: 3220 },
  { name: "Брокер", keywords: ["брокер", "broker"], pln: 10000, eur: 2300 },
  { name: "Специалист по контроллингу", keywords: ["контроллинг", "controlling specialist"], pln: 9000, eur: 2070 },
  { name: "Электрик", keywords: ["электрик", "electrician"], pln: 8130, eur: 1870 },
  { name: "Сантехник", keywords: ["сантехник", "plumber"], pln: 7320, eur: 1680 },
  { name: "Сварщик", keywords: ["сварщик", "welder"], pln: 7290, eur: 1680 },
  { name: "Плотник", keywords: ["плотник", "carpenter"], pln: 7480, eur: 1720 },
  { name: "Столяр", keywords: ["столяр", "furniture carpenter"], pln: 6430, eur: 1480 },
  { name: "Маляр", keywords: ["маляр", "painter"], pln: 6690, eur: 1540 },
  { name: "Каменщик", keywords: ["каменщик", "bricklayer", "mason"], pln: 7500, eur: 1720 },
  { name: "Кровельщик", keywords: ["кровельщик", "roofer"], pln: 7300, eur: 1680 },
  { name: "Штукатур", keywords: ["штукатур", "plasterer"], pln: 7820, eur: 1800 },
  { name: "Плиточник", keywords: ["плиточник", "tile layer"], pln: 7280, eur: 1670 },
  { name: "Мостовщик / брусчатник", keywords: ["брусчатник", "paver"], pln: 6670, eur: 1530 },
  { name: "Оператор погрузчика", keywords: ["оператор погрузчика", "forklift operator"], pln: 6260, eur: 1440 },
  { name: "Крановщик", keywords: ["крановщик", "crane operator"], pln: 7610, eur: 1750 },
  { name: "Монтажник систем вентиляции", keywords: ["монтажник вентиляции", "hvac installer"], pln: 7680, eur: 1770 },
  { name: "Проектировщик HVAC", keywords: ["проектировщик hvac", "hvac designer"], pln: 9530, eur: 2190 },
  { name: "Бетонщик", keywords: ["бетонщик", "concrete worker"], pln: 6500, eur: 1490 },
  { name: "Наладчик автоматики", keywords: ["наладчик автоматики", "automation technician"], pln: 8500, eur: 1950 },
  { name: "Водитель грузовика (дальнобойщик)", keywords: ["дальнобойщик", "truck driver", "водитель грузовика"], pln: 7750, eur: 1780 },
  { name: "Водитель фургона / доставка", keywords: ["водитель доставки", "delivery driver", "van driver"], pln: 7750, eur: 1780 },
  { name: "Водитель автобуса", keywords: ["водитель автобуса", "bus driver"], pln: 7030, eur: 1620 },
  { name: "Водитель такси", keywords: ["водитель такси", "taxi driver"], pln: 6000, eur: 1380 },
  { name: "Курьер", keywords: ["курьер", "courier"], pln: 6490, eur: 1490 },
  { name: "Работник склада", keywords: ["работник склада", "складской работник", "warehouse worker"], pln: 5800, eur: 1330 },
  { name: "Менеджер склада", keywords: ["менеджер склада", "warehouse manager"], pln: 7500, eur: 1720 },
  { name: "Экспедитор", keywords: ["экспедитор", "freight forwarder"], pln: 8150, eur: 1870 },
  { name: "Менеджер по логистике", keywords: ["менеджер по логистике", "logistics manager"], pln: 11130, eur: 2560 },
  { name: "Машинист поезда", keywords: ["машинист поезда", "train driver"], pln: 8800, eur: 2020 },
  { name: "Повар", keywords: ["повар", "cook"], pln: 6540, eur: 1500 },
  { name: "Шеф-повар", keywords: ["шеф повар", "head chef"], pln: 8100, eur: 1860 },
  { name: "Су-шеф", keywords: ["су шеф", "sous chef"], pln: 7300, eur: 1680 },
  { name: "Помощник повара / кухонный работник", keywords: ["кухонный работник", "kitchen helper"], pln: 6220, eur: 1430 },
  { name: "Помощник на кухне", keywords: ["помощник повара", "cook assistant"], pln: 6000, eur: 1380 },
  { name: "Официант / бариста", keywords: ["официант", "бариста", "waiter", "barista"], pln: 5890, eur: 1350 },
  { name: "Бариста (кофейня)", keywords: ["кофейнябариста", "coffee barista"], pln: 5300, eur: 1220 },
  { name: "Бармен", keywords: ["бармен", "bartender"], pln: 5900, eur: 1360 },
  { name: "Администратор отеля / ресепшн", keywords: ["администратор отеля", "ресепшн", "hotel receptionist"], pln: 5660, eur: 1300 },
  { name: "Уборщик / клинер", keywords: ["уборщик", "клинер", "cleaner"], pln: 5640, eur: 1300 },
  { name: "Кассир", keywords: ["кассир", "cashier"], pln: 5400, eur: 1240 },
  { name: "Продавец-консультант", keywords: ["продавец", "sales assistant"], pln: 5400, eur: 1240 },
  { name: "Управляющий магазином", keywords: ["управляющий магазином", "store manager"], pln: 6920, eur: 1590 },
  { name: "Заместитель управляющего магазином", keywords: ["заместитель управляющего", "deputy store manager"], pln: 6300, eur: 1450 },
  { name: "Торговый представитель", keywords: ["торговый представитель", "sales representative"], pln: 8310, eur: 1910 },
  { name: "Мерчендайзер", keywords: ["мерчендайзер", "merchandiser"], pln: 7990, eur: 1840 },
  { name: "Парикмахер", keywords: ["парикмахер", "hairdresser"], pln: 6430, eur: 1480 },
  { name: "Барбер", keywords: ["барбер", "barber"], pln: 6430, eur: 1480 },
  { name: "Косметолог", keywords: ["косметолог", "cosmetologist"], pln: 6040, eur: 1390 },
  { name: "Косметолог-эстетист", keywords: ["эстетист", "beautician"], pln: 6500, eur: 1490 },
  { name: "Массажист", keywords: ["массажист", "massage therapist"], pln: 6000, eur: 1380 },
  { name: "Мастер маникюра", keywords: ["маникюрщица", "manicurist", "мастер маникюра"], pln: 5280, eur: 1210 },
  { name: "Визажист", keywords: ["визажист", "makeup artist"], pln: 6050, eur: 1390 },
  { name: "Стилист", keywords: ["стилист", "hairstylist"], pln: 6200, eur: 1430 },
  { name: "Рабочий на производстве", keywords: ["рабочий на производстве", "production worker"], pln: 6550, eur: 1510 },
  { name: "Оператор станка", keywords: ["оператор станка", "machine operator"], pln: 6780, eur: 1560 },
  { name: "Контролёр качества", keywords: ["контролер качества", "quality control inspector"], pln: 6800, eur: 1560 },
  { name: "Руководитель производства", keywords: ["руководитель производства", "production manager"], pln: 9540, eur: 2190 },
  { name: "Механик промышленного оборудования", keywords: ["механик промышленного оборудования", "industrial mechanic"], pln: 7190, eur: 1650 },
  { name: "Слесарь-механик", keywords: ["слесарь механик", "industrial mechanic general"], pln: 7500, eur: 1720 },
  { name: "Садовник", keywords: ["садовник", "gardener"], pln: 6200, eur: 1430 },
  { name: "Ландшафтный дизайнер / садовник", keywords: ["ландшафтный дизайнер", "landscape gardener"], pln: 6250, eur: 1440 },
  { name: "Фермер", keywords: ["фермер", "farmer"], pln: 5500, eur: 1260 },
  { name: "Агроном", keywords: ["агроном", "agronomist"], pln: 7000, eur: 1610 },
  { name: "Охранник", keywords: ["охранник", "security guard"], pln: 6390, eur: 1470 },
  { name: "Сотрудник службы безопасности", keywords: ["сотрудник службы безопасности", "security officer"], pln: 5730, eur: 1320 },
  { name: "Дворник / консьерж", keywords: ["дворник", "консьерж", "caretaker", "janitor"], pln: 5680, eur: 1310 },
  { name: "Швейцар / портье", keywords: ["швейцар", "портье", "porter"], pln: 5680, eur: 1310 },
  { name: "Графический дизайнер", keywords: ["графический дизайнер", "graphic designer"], pln: 7180, eur: 1650 },
  { name: "Дизайнер мультимедиа", keywords: ["дизайнер мультимедиа", "multimedia designer"], pln: 6740, eur: 1550 },
  { name: "Фотограф", keywords: ["фотограф", "photographer"], pln: 7020, eur: 1610 },
  { name: "Журналист", keywords: ["журналист", "journalist"], pln: 7190, eur: 1650 },
  { name: "Переводчик", keywords: ["переводчик", "translator"], pln: 8140, eur: 1870 },
  { name: "Копирайтер", keywords: ["копирайтер", "copywriter"], pln: 7280, eur: 1670 },
  { name: "SMM-специалист", keywords: ["smm", "специалист по соцсетям", "social media specialist"], pln: 5720, eur: 1310 },
  { name: "Специалист по рекламе", keywords: ["специалист по рекламе", "advertising specialist"], pln: 7120, eur: 1640 },
  { name: "Медиаменеджер", keywords: ["медиаменеджер", "media manager"], pln: 7570, eur: 1740 },
  { name: "Маркетолог", keywords: ["маркетолог", "маркетинг", "marketing"], pln: 11250, eur: 2590 },
  { name: "Арт-директор", keywords: ["арт директор", "art director"], pln: 11000, eur: 2530 },
  { name: "HR-специалист", keywords: ["hr специалист", "специалист по кадрам", "hr specialist"], pln: 8100, eur: 1860 },
  { name: "Рекрутер", keywords: ["рекрутер", "recruiter"], pln: 8040, eur: 1850 },
  { name: "Специалист по кадрам и расчёту зарплаты", keywords: ["кадры и зарплата", "hr payroll"], pln: 7500, eur: 1720 },
  { name: "Офис-менеджер", keywords: ["офис менеджер", "office manager"], pln: 7590, eur: 1740 },
  { name: "Секретарь", keywords: ["секретарь", "secretary"], pln: 6220, eur: 1430 },
  { name: "Личный ассистент руководителя", keywords: ["личный ассистент", "executive assistant"], pln: 7320, eur: 1680 },
  { name: "Специалист по выставлению счетов", keywords: ["специалист по счетам", "invoicing clerk"], pln: 6300, eur: 1450 },
  { name: "Государственный служащий", keywords: ["государственный служащий", "civil servant"], pln: 6500, eur: 1490 },
  { name: "Социальный работник", keywords: ["социальный работник", "social worker"], pln: 6310, eur: 1450 },
  { name: "Специалист по социальной работе", keywords: ["специалист по социальной работе", "social work specialist"], pln: 6710, eur: 1540 },
  { name: "Ассистент ветеринара", keywords: ["ассистент ветеринара", "veterinary assistant"], pln: 5500, eur: 1260 },
  { name: "Водитель", keywords: ["водитель", "driver"], pln: 5000, eur: 1150 },
  { name: "Строитель", keywords: ["строитель", "construction", "builder"], pln: 5500, eur: 1260 },
  { name: "Автомеханик", keywords: ["автомеханик", "автослесарь", "car mechanic"], pln: 6800, eur: 1560 },
  { name: "Диспетчер", keywords: ["диспетчер", "dispatcher"], pln: 6300, eur: 1450 },
  { name: "Инкассатор", keywords: ["инкассатор", "cash collector"], pln: 6500, eur: 1490 },
  { name: "Няня", keywords: ["няня", "babysitter", "nanny"], pln: 5200, eur: 1200 },
  { name: "Гувернантка", keywords: ["гувернантка", "governess"], pln: 5800, eur: 1330 },
  { name: "Спасатель", keywords: ["спасатель", "lifeguard"], pln: 5900, eur: 1360 },
  { name: "Пожарный", keywords: ["пожарный", "firefighter"], pln: 6800, eur: 1560 },
  { name: "Полицейский", keywords: ["полицейский", "police officer"], pln: 6900, eur: 1590 },
  { name: "Тренер по фитнесу", keywords: ["тренер по фитнесу", "fitness trainer"], pln: 6200, eur: 1430 },
  { name: "Инструктор по вождению", keywords: ["инструктор по вождению", "driving instructor"], pln: 6400, eur: 1470 },
  { name: "Бортпроводник / стюардесса", keywords: ["бортпроводник", "стюардесса", "flight attendant"], pln: 7100, eur: 1630 },
  { name: "Пилот", keywords: ["пилот", "pilot"], pln: 22000, eur: 5060 },
  { name: "Авиадиспетчер", keywords: ["авиадиспетчер", "air traffic controller"], pln: 18000, eur: 4140 },
  { name: "Специалист по закупкам", keywords: ["специалист по закупкам", "procurement specialist"], pln: 8200, eur: 1890 },
  { name: "Менеджер по закупкам", keywords: ["менеджер по закупкам", "purchasing manager"], pln: 10500, eur: 2410 },
  { name: "Менеджер проекта", keywords: ["менеджер проекта", "project manager"], pln: 10800, eur: 2480 },
  { name: "Бизнес-тренер", keywords: ["бизнес тренер", "business trainer"], pln: 8300, eur: 1910 },
  { name: "Ивент-менеджер", keywords: ["ивент менеджер", "event manager"], pln: 7400, eur: 1700 },
  { name: "Флорист", keywords: ["флорист", "florist"], pln: 5300, eur: 1220 },
  { name: "Пекарь", keywords: ["пекарь", "baker"], pln: 5900, eur: 1360 },
  { name: "Кондитер", keywords: ["кондитер", "pastry chef"], pln: 6100, eur: 1400 },
  { name: "Мясник", keywords: ["мясник", "butcher"], pln: 6200, eur: 1430 },
  { name: "Швея", keywords: ["швея", "seamstress"], pln: 5100, eur: 1170 },
  { name: "Оператор call-центра", keywords: ["оператор call центра", "call center operator"], pln: 5700, eur: 1310 },
  { name: "Специалист поддержки клиентов", keywords: ["специалист поддержки клиентов", "customer support"], pln: 6300, eur: 1450 },
  { name: "Страховой агент", keywords: ["страховой агент", "insurance agent"], pln: 6900, eur: 1590 },
  { name: "Риэлтор", keywords: ["риэлтор", "real estate agent"], pln: 7800, eur: 1790 },
  { name: "Оценщик недвижимости", keywords: ["оценщик недвижимости", "real estate appraiser"], pln: 8200, eur: 1890 },
  { name: "Управляющий недвижимостью", keywords: ["управляющий недвижимостью", "property manager"], pln: 8600, eur: 1980 },
  { name: "Няня для пожилых / сиделка на дому", keywords: ["сиделка на дому", "home caregiver"], pln: 5900, eur: 1360 },
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
    { key: "employment" as const, name: t.work.employmentSubtitle, subtitle: t.work.employmentFullSubtitle, features: t.work.employmentFeatures },
    { key: "b2b" as const, name: t.work.b2bContractName, subtitle: t.work.b2bSubtitle, features: t.work.b2bFeatures },
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

      <Reveal delay={40} className="mt-10">
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

      <Reveal delay={120} className="mt-12">
        <h2 className="text-xl font-bold tracking-tight text-text-primary">{t.work.jobSites}</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
        </div>
      </Reveal>

      <Reveal delay={160} className="mt-12">
        <h2 className="text-xl font-bold tracking-tight text-text-primary">{t.work.contractVsB2B}</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          {CONTRACT_TYPES.map((type, index) => (
            <Reveal key={type.name} delay={index * 40}>
              <div className="h-full rounded-2xl border border-border-subtle bg-surface-1 p-5 backdrop-blur-sm">
                <p className="text-sm font-semibold text-text-primary">{type.name}</p>
                <p className="text-xs text-text-muted">{type.subtitle}</p>
                <ul className="mt-4 space-y-2.5">
                  {type.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-text-muted">
                      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-bright" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.6 3.6 6.7-6.7a1 1 0 011.4 0z" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                {t.work.guides[type.key] && (
                  <div className="mt-4">
                    <HelpButton
                      guideHeading={t.work.guides[type.key].heading}
                      guideSteps={t.work.guides[type.key].steps}
                      aiQuestion={t.work.guides[type.key].aiQuestion}
                      label={t.helpButton.label}
                    />
                  </div>
                )}
              </div>
            </Reveal>
          ))}
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
    </div>
  );
}
