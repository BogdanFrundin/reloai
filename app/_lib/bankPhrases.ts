// A small phrasebook of the Polish sentences most likely to be needed
// in person at a bank branch — read aloud via the browser's built-in
// SpeechSynthesis API (lang="pl-PL"), not pre-rendered audio files, so
// there's nothing to host/generate and it works for every phrase/voice the
// device already has. Shown in the bank details modal ("usefulPhrasesLabel"
// section) with a translated caption in the visitor's own UI language.
//
// Wording note: Polish distinguishes speaker gender for some first-person
// past/conditional verb forms (chciałbym = "I'd like" said by a man,
// chciałabym = said by a woman) — both forms are given so the phrase works
// either way; say whichever matches you.

export type PhraseLang = "en" | "ru" | "uz" | "tr" | "tg" | "uk";

export interface BankPhrase {
  id: string;
  /** Polish text, spoken via SpeechSynthesis with lang="pl-PL". */
  pl: string;
  /** Short translation/meaning shown under the Polish text. */
  translations: Record<PhraseLang, string>;
}

export const BANK_PHRASES: BankPhrase[] = [
  {
    id: "greeting-open-account",
    pl: "Dzień dobry, chciałbym / chciałabym otworzyć konto bankowe.",
    translations: {
      en: "Hello, I would like to open a bank account.",
      ru: "Здравствуйте, я хотел(а) бы открыть банковский счёт.",
      uz: "Assalomu alaykum, men bank hisobini ochmoqchiman.",
      tr: "Merhaba, bir banka hesabı açmak istiyorum.",
      tg: "Салом, ман мехоҳам ҳисоби бонкӣ кушоям.",
      uk: "Доброго дня, я хотів(ла) би відкрити банківський рахунок.",
    },
  },
  {
    id: "speak-english",
    pl: "Czy mówi Pan / Pani po angielsku?",
    translations: {
      en: "Do you speak English?",
      ru: "Вы говорите по-английски?",
      uz: "Siz inglizcha gaplashasizmi?",
      tr: "İngilizce konuşuyor musunuz?",
      tg: "Шумо бо забони англисӣ гап мезанед?",
      uk: "Ви розмовляєте англійською?",
    },
  },
  {
    id: "no-polish",
    pl: "Niestety nie mówię po polsku.",
    translations: {
      en: "Unfortunately, I don't speak Polish.",
      ru: "К сожалению, я не говорю по-польски.",
      uz: "Afsuski, men polyak tilida gapirmayman.",
      tr: "Maalesef Lehçe konuşamıyorum.",
      tg: "Мутаассифона, ман бо забони полякӣ гап намезанам.",
      uk: "На жаль, я не розмовляю польською.",
    },
  },
  {
    id: "no-pesel",
    pl: "Nie mam jeszcze numeru PESEL.",
    translations: {
      en: "I don't have a PESEL number yet.",
      ru: "У меня пока нет номера PESEL.",
      uz: "Menda hali PESEL raqami yo'q.",
      tr: "Henüz PESEL numaram yok.",
      tg: "Ман ҳанӯз рақами PESEL надорам.",
      uk: "У мене поки немає номера PESEL.",
    },
  },
  {
    id: "which-documents",
    pl: "Jakie dokumenty są potrzebne, żeby otworzyć konto?",
    translations: {
      en: "What documents do I need to open an account?",
      ru: "Какие документы нужны, чтобы открыть счёт?",
      uz: "Hisob ochish uchun qanday hujjatlar kerak?",
      tr: "Hesap açmak için hangi belgeler gerekli?",
      tg: "Барои кушодани ҳисоб кадом ҳуҷҷатҳо лозиманд?",
      uk: "Які документи потрібні, щоб відкрити рахунок?",
    },
  },
  {
    id: "without-pesel-possible",
    pl: "Czy mogę otworzyć konto bez numeru PESEL?",
    translations: {
      en: "Can I open an account without a PESEL number?",
      ru: "Могу ли я открыть счёт без номера PESEL?",
      uz: "PESEL raqamisiz hisob ocha olamanmi?",
      tr: "PESEL numarası olmadan hesap açabilir miyim?",
      tg: "Оё ман метавонам бе рақами PESEL ҳисоб кушоям?",
      uk: "Чи можу я відкрити рахунок без номера PESEL?",
    },
  },
  {
    id: "talk-to-consultant",
    pl: "Chciałbym / Chciałabym porozmawiać z konsultantem.",
    translations: {
      en: "I would like to speak with a consultant.",
      ru: "Я хотел(а) бы поговорить с консультантом.",
      uz: "Men konsultant bilan gaplashmoqchiman.",
      tr: "Bir danışmanla konuşmak istiyorum.",
      tg: "Ман мехоҳам бо мушовир сӯҳбат кунам.",
      uk: "Я хотів(ла) би поговорити з консультантом.",
    },
  },
  {
    id: "queue-ticket",
    pl: "Przepraszam, gdzie mogę pobrać numerek?",
    translations: {
      en: "Excuse me, where can I get a queue ticket?",
      ru: "Извините, где взять талон в очередь?",
      uz: "Kechirasiz, navbat taloni qayerdan olsam bo'ladi?",
      tr: "Affedersiniz, sıra numarası nereden alabilirim?",
      tg: "Мебахшед, аз куҷо талони навбат гирам?",
      uk: "Перепрошую, де можна взяти талон на чергу?",
    },
  },
  {
    id: "account-cost",
    pl: "Ile kosztuje prowadzenie konta?",
    translations: {
      en: "How much does it cost to maintain the account?",
      ru: "Сколько стоит обслуживание счёта?",
      uz: "Hisobni yuritish qancha turadi?",
      tr: "Hesabın işletme ücreti ne kadar?",
      tg: "Нигоҳдории ҳисоб чанд пул меарзад?",
      uk: "Скільки коштує обслуговування рахунку?",
    },
  },
  {
    id: "thanks-goodbye",
    pl: "Dziękuję bardzo, do widzenia.",
    translations: {
      en: "Thank you very much, goodbye.",
      ru: "Большое спасибо, до свидания.",
      uz: "Katta rahmat, xayr.",
      tr: "Çok teşekkür ederim, hoşça kalın.",
      tg: "Ташаккури зиёд, хайр.",
      uk: "Дуже дякую, до побачення.",
    },
  },
];
