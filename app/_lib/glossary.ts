import type { Lang } from "./i18n";

// Site-wide glossary of Polish relocation jargon (PESEL, NIP, karta pobytu,
// etc.). Used by <TextWithGlossary> to auto-detect these terms wherever they
// appear in guide names/descriptions/badges (documents, banks, insurance)
// and attach a "?" hint with a plain-language explanation, so users don't
// have to already know what an acronym means to use the site.
//
// The underlying text these terms are matched against (document_guides rows,
// BankCardGrid badges) is hardcoded Russian regardless of the site's current
// language — it isn't run through the i18n dictionaries. So `pattern` only
// ever needs to match Russian source text, but the popup itself is shown in
// whatever language the user has the site set to, hence `text` being keyed
// per Lang below.
export type GlossaryText = { term: string; definition: string };

export type GlossaryEntry = {
  key: string;
  pattern: RegExp;
  text: Record<Lang, GlossaryText>;
};

export const GLOSSARY: GlossaryEntry[] = [
  {
    key: "pesel",
    pattern: /\bPESEL\b/i,
    text: {
      ru: {
        term: "PESEL",
        definition:
          "Единый номер учёта населения Польши — как ИНН/СНИЛС сразу. Нужен почти для всего: работы, банковского счёта, мед. страховки, многих документов.",
      },
      en: {
        term: "PESEL",
        definition:
          "A national ID number issued by Poland — like a tax ID and social security number combined. You'll need it for almost everything: work, opening a bank account, health insurance, and most official paperwork.",
      },
      uz: {
        term: "PESEL",
        definition:
          "Polshaning yagona aholi hisobga olish raqami — INN va SNILS birlashgani kabi. Deyarli hamma narsa uchun kerak: ish, bank hisobi, tibbiy sug'urta va ko'plab hujjatlar.",
      },
      tr: {
        term: "PESEL",
        definition:
          "Polonya'nın tekil nüfus kayıt numarası — vergi numarası ve sosyal güvenlik numarasının birleşimi gibi. Neredeyse her şey için gerekir: iş, banka hesabı, sağlık sigortası ve pek çok belge.",
      },
      tg: {
        term: "PESEL",
        definition:
          "Рақами ягонаи бақайдгирии аҳолии Лаҳистон — ба монанди рақами андоз ва суғуртаи иҷтимоӣ якҷоя. Барои қариб ҳама чиз лозим аст: кор, ҳисоби бонкӣ, суғуртаи тиббӣ ва бисёр ҳуҷҷатҳо.",
      },
      uk: {
        term: "PESEL",
        definition:
          "Єдиний номер обліку населення Польщі — як ІПН і СНІЛС одразу. Потрібен майже для всього: роботи, банківського рахунку, мед. страхування, багатьох документів.",
      },
    },
  },
  {
    key: "nip",
    pattern: /\bNIP\b/i,
    text: {
      ru: { term: "NIP", definition: "Индивидуальный налоговый номер в Польше. Нужен для работы как ИП, ведения бизнеса и уплаты налогов." },
      en: { term: "NIP", definition: "An individual tax identification number in Poland. Needed to register as self-employed, run a business, and pay taxes." },
      uz: { term: "NIP", definition: "Polshadagi individual soliq raqami. O'zini o'zi band qilgan (ИП) sifatida ishlash, biznes yuritish va soliq to'lash uchun kerak." },
      tr: { term: "NIP", definition: "Polonya'da bireysel vergi numarası. Kendi hesabına çalışmak, iş kurmak ve vergi ödemek için gereklidir." },
      tg: { term: "NIP", definition: "Рақами инфиродии андози Лаҳистон. Барои кор кардан ҳамчун соҳибкори инфиродӣ, пеш бурдани бизнес ва пардохти андоз лозим аст." },
      uk: { term: "NIP", definition: "Індивідуальний податковий номер у Польщі. Потрібен для роботи як ФОП, ведення бізнесу та сплати податків." },
    },
  },
  {
    key: "zus",
    pattern: /\bZUS\b/i,
    text: {
      ru: { term: "ZUS", definition: "Польский аналог соцстраха и пенсионного фонда. Сюда идут взносы с зарплаты — на пенсию, больничные и часть медстраховки." },
      en: { term: "ZUS", definition: "Poland's social insurance institution — like a combined pension fund and social security office. Contributions from your salary go here, covering pension, sick leave, and part of your health insurance." },
      uz: { term: "ZUS", definition: "Polshaning ijtimoiy sug'urta va pensiya jamg'armasi analogi. Ish haqidan ushlanmalar shu yerga boradi — pensiya, kasallik varaqasi va tibbiy sug'urtaning bir qismi uchun." },
      tr: { term: "ZUS", definition: "Polonya'nın sosyal sigorta ve emeklilik kurumu. Maaştan kesilen primler buraya gider — emeklilik, hastalık izni ve sağlık sigortasının bir kısmı için." },
      tg: { term: "ZUS", definition: "Аналоги фонди суғуртаи иҷтимоӣ ва нафақаи Лаҳистон. Тарҳҳо аз маош ба ин ҷо мераванд — барои нафақа, рухсатии беморӣ ва қисме аз суғуртаи тиббӣ." },
      uk: { term: "ZUS", definition: "Польський аналог соцстраху та пенсійного фонду. Сюди йдуть внески із зарплати — на пенсію, лікарняні та частину медстрахування." },
    },
  },
  {
    key: "nfz",
    pattern: /\bNFZ\b/i,
    text: {
      ru: { term: "NFZ", definition: "Национальный фонд здравоохранения — государственная медстраховка Польши. Даёт право на бесплатное (или льготное) лечение в гос. клиниках." },
      en: { term: "NFZ", definition: "Poland's National Health Fund — the state health insurance system. It gives you the right to free (or subsidized) treatment at public clinics." },
      uz: { term: "NFZ", definition: "Milliy sog'liqni saqlash jamg'armasi — Polshaning davlat tibbiy sug'urtasi. Davlat klinikalarida bepul (yoki imtiyozli) davolanish huquqini beradi." },
      tr: { term: "NFZ", definition: "Ulusal Sağlık Fonu — Polonya'nın devlet sağlık sigortası. Devlet kliniklerinde ücretsiz (veya indirimli) tedavi hakkı verir." },
      tg: { term: "NFZ", definition: "Фонди миллии тандурустӣ — суғуртаи тиббии давлатии Лаҳистон. Ҳуқуқи муолиҷаи ройгон (ё имтиёзнок) дар клиникаҳои давлатӣ медиҳад." },
      uk: { term: "NFZ", definition: "Національний фонд охорони здоров'я — державне медстрахування Польщі. Дає право на безкоштовне (або пільгове) лікування в держ. клініках." },
    },
  },
  {
    key: "karta_pobytu",
    pattern: /карт[а-яё]*\s+побыту/i,
    text: {
      ru: { term: "Карта побыту", definition: "Пластиковая карта вида на жительство в Польше — подтверждает право легально жить (и обычно работать) в стране. Бывает временная и постоянная (без ограничения по сроку)." },
      en: { term: "Karta pobytu (residence card)", definition: "Poland's residence permit card — proof of your legal right to live (and usually work) in the country. Comes in temporary and permanent (no expiry) versions." },
      uz: { term: "Karta pobytu (yashash kartasi)", definition: "Polshada yashash uchun ruxsat kartasi — mamlakatda qonuniy yashash (va odatda ishlash) huquqini tasdiqlaydi. Vaqtinchalik va doimiy (muddatsiz) turlari bor." },
      tr: { term: "Karta pobytu (oturma kartı)", definition: "Polonya'nın oturma izni kartı — ülkede yasal olarak yaşama (ve genellikle çalışma) hakkınızı kanıtlar. Geçici ve süresiz (kalıcı) türleri vardır." },
      tg: { term: "Карта побыту (кортаи иқомат)", definition: "Кортаи иҷозати иқомат дар Лаҳистон — ҳуқуқи қонунии зиндагӣ (ва одатан кор) карданро дар кишвар тасдиқ мекунад. Намудҳои муваққатӣ ва доимӣ (бе маҳдудияти мӯҳлат) дорад." },
      uk: { term: "Карта побиту", definition: "Пластикова карта посвідки на проживання в Польщі — підтверджує право легально жити (і зазвичай працювати) в країні. Буває тимчасова та постійна (без обмеження строку)." },
    },
  },
  {
    key: "meldunek",
    pattern: /мелдун[а-яё]*/i,
    text: {
      ru: { term: "Мелдунок", definition: "Официальная регистрация адреса проживания в Польше. Обязательна для получения PESEL и многих других документов." },
      en: { term: "Meldunek (address registration)", definition: "The official registration of your residential address in Poland. Required to get a PESEL number and many other documents." },
      uz: { term: "Meldunek (manzil ro'yxatdan o'tkazish)", definition: "Polshada yashash manzilini rasmiy ro'yxatdan o'tkazish. PESEL va boshqa ko'plab hujjatlarni olish uchun majburiy." },
      tr: { term: "Meldunek (adres kaydı)", definition: "Polonya'da ikamet adresinizin resmi kaydı. PESEL ve pek çok başka belge almak için zorunludur." },
      tg: { term: "Мелдунок (қайди суроға)", definition: "Бақайдгирии расмии суроғаи истиқомат дар Лаҳистон. Барои гирифтани PESEL ва бисёр ҳуҷҷатҳои дигар ҳатмист." },
      uk: { term: "Мелдунок", definition: "Офіційна реєстрація адреси проживання в Польщі. Обов'язкова для отримання PESEL та багатьох інших документів." },
    },
  },
  {
    key: "jdg",
    pattern: /\bJDG\b/i,
    text: {
      ru: { term: "JDG", definition: "Jednoosobowa Działalność Gospodarcza — индивидуальное предпринимательство в Польше, аналог российского/украинского ИП." },
      en: { term: "JDG", definition: "Jednoosobowa Działalność Gospodarcza — Poland's sole proprietorship form, the equivalent of individual entrepreneurship elsewhere." },
      uz: { term: "JDG", definition: "Jednoosobowa Działalność Gospodarcza — Polshadagi yakka tartibdagi tadbirkorlik shakli, ИП ning analogi." },
      tr: { term: "JDG", definition: "Jednoosobowa Działalność Gospodarcza — Polonya'nın şahıs şirketi (bireysel girişimcilik) türü." },
      tg: { term: "JDG", definition: "Jednoosobowa Działalność Gospodarcza — шакли соҳибкории инфиродӣ дар Лаҳистон, аналоги ИП." },
      uk: { term: "JDG", definition: "Jednoosobowa Działalność Gospodarcza — індивідуальне підприємництво в Польщі, аналог ФОП." },
    },
  },
  {
    key: "spzoo",
    pattern: /\bSp\.?\s*z\s*o\.?\s*o\.?\b|\bООО\b/i,
    text: {
      ru: { term: "Sp. z o.o. (ООО)", definition: "Spółka z ograniczoną odpowiedzialnością — общество с ограниченной ответственностью, польский аналог ООО. Подходит для бизнеса с партнёрами." },
      en: { term: "Sp. z o.o. (LLC)", definition: "Spółka z ograniczoną odpowiedzialnością — Poland's limited liability company. Suited to businesses with partners." },
      uz: { term: "Sp. z o.o. (MChJ)", definition: "Spółka z ograniczoną odpowiedzialnością — Polshaning mas'uliyati cheklangan jamiyati, MChJ analogi. Hamkorlar bilan biznes uchun mos." },
      tr: { term: "Sp. z o.o. (Limited Şirket)", definition: "Spółka z ograniczoną odpowiedzialnością — Polonya'nın limited şirket türü. Ortaklı işletmeler için uygundur." },
      tg: { term: "Sp. z o.o. (ҶМM)", definition: "Spółka z ograniczoną odpowiedzialnością — ҷамъияти масъулияти маҳдуди Лаҳистон, аналоги ҶМM. Барои бизнес бо шарикон мувофиқ аст." },
      uk: { term: "Sp. z o.o. (ТОВ)", definition: "Spółka z ograniczoną odpowiedzialnością — товариство з обмеженою відповідальністю, польський аналог ТОВ. Підходить для бізнесу з партнерами." },
    },
  },
  {
    key: "regon",
    pattern: /\bREGON\b/i,
    text: {
      ru: { term: "REGON", definition: "Статистический номер компании в Польше — присваивается автоматически при регистрации бизнеса." },
      en: { term: "REGON", definition: "A statistical business registration number in Poland — assigned automatically when you register a company." },
      uz: { term: "REGON", definition: "Polshadagi kompaniyaning statistik raqami — biznesni ro'yxatdan o'tkazishda avtomatik beriladi." },
      tr: { term: "REGON", definition: "Polonya'da şirketin istatistik numarası — işletme kaydı sırasında otomatik olarak verilir." },
      tg: { term: "REGON", definition: "Рақами омории ширкат дар Лаҳистон — ҳангоми бақайдгирии бизнес худкор дода мешавад." },
      uk: { term: "REGON", definition: "Статистичний номер компанії в Польщі — присвоюється автоматично під час реєстрації бізнесу." },
    },
  },
  {
    key: "vat",
    pattern: /\bVAT\b/i,
    text: {
      ru: { term: "VAT", definition: "Налог на добавленную стоимость. Регистрация обязательна компаниям с оборотом выше порога или определёнными видами деятельности." },
      en: { term: "VAT", definition: "Value-added tax. Registration is mandatory for companies above a revenue threshold or in certain business activities." },
      uz: { term: "VAT", definition: "Qo'shilgan qiymat solig'i. Aylanmasi chegaradan yuqori bo'lgan yoki muayyan faoliyat turidagi kompaniyalar uchun ro'yxatdan o'tish majburiy." },
      tr: { term: "VAT", definition: "Katma değer vergisi. Cirosu belirli bir eşiği aşan veya belirli faaliyet türlerindeki şirketler için kayıt zorunludur." },
      tg: { term: "VAT", definition: "Андоз аз арзиши иловашуда. Бақайдгирӣ барои ширкатҳое, ки гардиши онҳо аз ҳадди муайян зиёд аст ё намуди муайяни фаъолият доранд, ҳатмист." },
      uk: { term: "VAT", definition: "Податок на додану вартість. Реєстрація обов'язкова для компаній з оборотом вище порогу або певними видами діяльності." },
    },
  },
  {
    key: "pit",
    pattern: /\bPIT\b/i,
    text: {
      ru: { term: "PIT", definition: "Podatek dochodowy od osób fizycznych — годовая налоговая декларация о доходах физлица в Польше." },
      en: { term: "PIT", definition: "Podatek dochodowy od osób fizycznych — the annual personal income tax return in Poland." },
      uz: { term: "PIT", definition: "Podatek dochodowy od osób fizycznych — Polshadagi jismoniy shaxsning yillik daromad solig'i deklaratsiyasi." },
      tr: { term: "PIT", definition: "Podatek dochodowy od osób fizycznych — Polonya'da kişisel gelir vergisi yıllık beyannamesi." },
      tg: { term: "PIT", definition: "Podatek dochodowy od osób fizycznych — эъломияи солонаи андоз аз даромади шахсони воқеӣ дар Лаҳистон." },
      uk: { term: "PIT", definition: "Podatek dochodowy od osób fizycznych — річна податкова декларація про доходи фізособи в Польщі." },
    },
  },
  {
    key: "ekuz",
    pattern: /\bEKUZ\b/i,
    text: {
      ru: { term: "EKUZ", definition: "Европейская карта медицинского страхования (EHIC) — даёт право на срочную мед. помощь в странах ЕС во время временного пребывания." },
      en: { term: "EKUZ", definition: "The European Health Insurance Card (EHIC) — gives you the right to necessary medical care in EU countries during a temporary stay." },
      uz: { term: "EKUZ", definition: "Yevropa tibbiy sug'urta kartasi (EHIC) — EI mamlakatlarida vaqtinchalik bo'lish davomida shoshilinch tibbiy yordam olish huquqini beradi." },
      tr: { term: "EKUZ", definition: "Avrupa Sağlık Sigortası Kartı (EHIC) — AB ülkelerinde geçici bulunma süresince gerekli sağlık hizmeti alma hakkı verir." },
      tg: { term: "EKUZ", definition: "Кортаи суғуртаи тиббии аврупоӣ (EHIC) — ҳуқуқи гирифтани кӯмаки таъҷилии тиббӣ дар кишварҳои ИА ҳангоми будубоши муваққатӣ медиҳад." },
      uk: { term: "EKUZ", definition: "Європейська карта медичного страхування (EHIC) — дає право на невідкладну мед. допомогу в країнах ЄС під час тимчасового перебування." },
    },
  },
  {
    key: "poz",
    pattern: /\bPOZ\b/i,
    text: {
      ru: { term: "POZ", definition: "Podstawowa Opieka Zdrowotna — участковый семейный врач, к которому нужно прикрепиться, чтобы пользоваться NFZ-страховкой." },
      en: { term: "POZ", definition: "Podstawowa Opieka Zdrowotna — primary/family care doctor you need to register with to use your NFZ insurance." },
      uz: { term: "POZ", definition: "Podstawowa Opieka Zdrowotna — NFZ sug'urtasidan foydalanish uchun biriktirilishi kerak bo'lgan uy-joy shifokori." },
      tr: { term: "POZ", definition: "Podstawowa Opieka Zdrowotna — NFZ sigortasını kullanmak için kayıt olmanız gereken aile hekimi." },
      tg: { term: "POZ", definition: "Podstawowa Opieka Zdrowotna — духтури оилавии минтақавӣ, ки барои истифодаи суғуртаи NFZ бояд ба ӯ мулҳақ шавед." },
      uk: { term: "POZ", definition: "Podstawowa Opieka Zdrowotna — дільничний сімейний лікар, до якого потрібно прикріпитися, щоб користуватися NFZ-страхуванням." },
    },
  },
  {
    key: "oc",
    pattern: /\bOC\b/,
    text: {
      ru: { term: "OC", definition: "Обязательная автогражданская страховка (аналог ОСАГО). Без неё нельзя законно ездить на машине в Польше." },
      en: { term: "OC", definition: "Mandatory third-party car insurance. Without it, you can't legally drive a car in Poland." },
      uz: { term: "OC", definition: "Majburiy avtofuqarolik sug'urtasi (OSAGO analogi). Usiz Polshada mashinada qonuniy yurish mumkin emas." },
      tr: { term: "OC", definition: "Zorunlu trafik sigortası. Bu olmadan Polonya'da yasal olarak araba kullanamazsınız." },
      tg: { term: "OC", definition: "Суғуртаи ҳатмии шаҳрвандии мошин (аналоги ОСАГО). Бе он дар Лаҳистон бо мошин ронандагӣ кардан ғайриқонунист." },
      uk: { term: "OC", definition: "Обов'язкове автоцивільне страхування (аналог ОСЦПВ). Без нього не можна законно їздити на машині в Польщі." },
    },
  },
  {
    key: "ac",
    pattern: /\bAC\b/,
    text: {
      ru: { term: "AC", definition: "Автокаско — добровольное страхование машины от угона, ДТП и повреждений, в дополнение к обязательной OC." },
      en: { term: "AC", definition: "Comprehensive car insurance (AC) — optional coverage against theft, accidents, and damage, on top of the mandatory OC." },
      uz: { term: "AC", definition: "AC — mashinani o'g'irlik, avtohalokat va shikastlanishlardan ixtiyoriy sug'urtalash, majburiy OC ustiga qo'shimcha." },
      tr: { term: "AC", definition: "AC (kasko) — hırsızlık, kaza ve hasara karşı isteğe bağlı ek sigorta, zorunlu OC'nin yanı sıra." },
      tg: { term: "AC", definition: "AC (каско) — суғуртаи ихтиёрии мошин аз дуздӣ, садама ва зарар, ба ғайр аз OC-и ҳатмӣ." },
      uk: { term: "AC", definition: "Автокаско (AC) — добровільне страхування машини від викрадення, ДТП і пошкоджень, на додачу до обов'язкового OC." },
    },
  },
  {
    key: "wiza_d",
    pattern: /виза\s*D\b/i,
    text: {
      ru: { term: "Виза D", definition: "Национальная долгосрочная виза Польши. На её основании можно въехать в страну и затем оформить карту побыту." },
      en: { term: "Visa D", definition: "Poland's national long-term visa. It lets you enter the country and then apply for a residence card." },
      uz: { term: "D vizasi", definition: "Polshaning milliy uzoq muddatli vizasi. Shu asosda mamlakatga kirib, keyin yashash kartasiga ariza berish mumkin." },
      tr: { term: "D Vizesi", definition: "Polonya'nın ulusal uzun süreli vizesi. Bu vizeyle ülkeye girip ardından oturma kartına başvurabilirsiniz." },
      tg: { term: "Раводиди D", definition: "Раводиди дарозмуддати миллии Лаҳистон. Дар асоси он метавон ба кишвар ворид шуда, баъд ба кортаи иқомат муроҷиат кард." },
      uk: { term: "Віза D", definition: "Національна довгострокова віза Польщі. На її підставі можна в'їхати в країну і потім оформити карту побиту." },
    },
  },
  {
    key: "apostille",
    pattern: /апостил[а-яё]*/i,
    text: {
      ru: { term: "Апостиль", definition: "Специальный штамп, подтверждающий подлинность документа для использования за границей. Часто нужен для дипломов и свидетельств." },
      en: { term: "Apostille", definition: "A special stamp certifying a document's authenticity for use abroad. Often required for diplomas and certificates." },
      uz: { term: "Apostil", definition: "Hujjatning xorijda foydalanish uchun haqiqiyligini tasdiqlovchi maxsus muhr. Ko'pincha diplom va guvohnomalar uchun kerak bo'ladi." },
      tr: { term: "Apostil", definition: "Bir belgenin yurt dışında kullanım için gerçekliğini onaylayan özel bir mühür. Genellikle diploma ve sertifikalar için gerekir." },
      tg: { term: "Апостил", definition: "Мӯҳри махсусе, ки ҳақиқияти ҳуҷҷатро барои истифода дар хориҷа тасдиқ мекунад. Аксар вақт барои дипломҳо ва шаҳодатномаҳо лозим мешавад." },
      uk: { term: "Апостиль", definition: "Спеціальний штамп, що підтверджує справжність документа для використання за кордоном. Часто потрібен для дипломів і свідоцтв." },
    },
  },
  {
    key: "nostryfikacja",
    pattern: /нострифика[а-яё]*/i,
    text: {
      ru: { term: "Нострификация", definition: "Официальное признание иностранного диплома в Польше — приравнивает его к польскому образованию того же уровня." },
      en: { term: "Nostrification", definition: "Official recognition of a foreign diploma in Poland — makes it equivalent to a Polish qualification of the same level." },
      uz: { term: "Nostrifikatsiya", definition: "Xorijiy diplomni Polshada rasman tan olish — uni xuddi shu darajadagi Polsha ta'limiga tenglashtiradi." },
      tr: { term: "Denklik (nostrifikasyon)", definition: "Yabancı bir diplomanın Polonya'da resmi olarak tanınması — onu aynı seviyedeki bir Polonya diplomasına eşdeğer kılar." },
      tg: { term: "Ностритфикатсия", definition: "Эътирофи расмии дипломи хориҷӣ дар Лаҳистон — онро ба таҳсилоти лаҳистонии ҳамон дараҷа баробар мекунад." },
      uk: { term: "Нострифікація", definition: "Офіційне визнання іноземного диплома в Польщі — прирівнює його до польської освіти того самого рівня." },
    },
  },
  {
    key: "isic",
    pattern: /\bISIC\b/i,
    text: {
      ru: { term: "ISIC", definition: "Международная студенческая карта. Даёт скидки на транспорт, музеи и другие услуги по всему миру." },
      en: { term: "ISIC", definition: "The International Student Identity Card. Gives you discounts on transport, museums, and other services worldwide." },
      uz: { term: "ISIC", definition: "Xalqaro talaba kartasi. Dunyo bo'ylab transport, muzeylar va boshqa xizmatlarga chegirmalar beradi." },
      tr: { term: "ISIC", definition: "Uluslararası Öğrenci Kimlik Kartı. Dünya genelinde ulaşım, müze ve diğer hizmetlerde indirim sağlar." },
      tg: { term: "ISIC", definition: "Кортаи байналмилалии донишҷӯ. Тахфиф дар нақлиёт, осорхонаҳо ва дигар хидматҳо дар саросари ҷаҳон медиҳад." },
      uk: { term: "ISIC", definition: "Міжнародна студентська картка. Дає знижки на транспорт, музеї та інші послуги по всьому світу." },
    },
  },
];
