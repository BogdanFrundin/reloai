// Real, sourced data about opening a personal account at each bank, used on
// the /banks page: the verified deep-link to the bank's own account-opening
// page/form (replacing the generic `guide.online_url` from Supabase, which
// isn't always the actual application page), whether a newly-arrived
// foreigner WITHOUT a PESEL / Polish ID / mObywatel can complete opening
// fully remotely, and any currently-active "refer a friend" bonus.
//
// Sourced from each bank's own official pages (FAQ, product page, terms) in
// September 2026 — see the "Строгая верификация" section of
// bank-account-opening-research.md (project docs) for the exact quotes and
// URLs behind every entry. `confidence: "indirect"` marks the handful of
// banks where no single explicit "foreigners need a branch" sentence was
// found on the bank's own site (BOŚ, Bank Pekao, Plus Bank) — the verdict is
// still real, just resting on document/channel requirements rather than a
// direct quote, so treat those three as "very likely correct, not 100%".

export type VisitStatus = "online" | "onlineIfId" | "branch" | "courier";

export interface BankAccountInfo {
  /** Verified real URL of the bank's own account-opening page/application. */
  onlineUrl: string;
  /** Can a foreigner with no PESEL/Polish ID/mObywatel finish remotely? */
  visitStatus: VisitStatus;
  /** How solid the visitStatus verdict is. */
  confidence: "explicit" | "indirect";
  /** Optional short clarifying note (Russian; shown as a tooltip/caption). */
  visitNote?: string;
  /** Currently-active "refer a friend" bonus, if any — real PLN amounts. */
  referral?: {
    /** Program's own name, e.g. "PolecamBank". */
    program: string;
    /** Short amount summary, e.g. "150–300 zł / 60 zł другу". */
    amount: string;
  };
}

export const BANK_ACCOUNT_INFO: Record<string, BankAccountInfo> = {
  mBank: {
    onlineUrl: "https://www.mbank.pl/indywidualny/konta/konta-osobiste/ekonto-do-uslug/",
    visitStatus: "branch",
    confidence: "indirect",
    visitNote: "Онлайн-заявка требует PESEL и польский eDowód/паспорт — без них нужен визит в отделение.",
    referral: { program: "PolecamBank", amount: "150–300 zł приведшему, 60 zł другу" },
  },
  "ING Bank Śląski": {
    onlineUrl: "https://www.ing.pl/indywidualni/konta-osobiste/konto-na-selfie",
    visitStatus: "branch",
    confidence: "explicit",
    visitNote: "Банк прямо пишет: онлайн принимается только польский dowód osobisty, другие документы — нет.",
    referral: { program: "Poleć ING", amount: "150 zł за реферала (до 10 раз), 100 zł другу" },
  },
  "PKO Bank Polski": {
    onlineUrl: "https://www.pkobp.pl/klient-indywidualny/konta/konto-za-zero",
    visitStatus: "branch",
    confidence: "explicit",
    visitNote: "Удалённое открытие через mObywatel доступно только с польским ID; форма требует PESEL.",
    referral: { program: "PKO Polecam", amount: "50–225 zł за реферала, лимит 4500 zł/год" },
  },
  "Bank Millennium": {
    onlineUrl: "https://www.bankmillennium.pl/wniosek-o-konto-osobiste?portalId=1812",
    visitStatus: "branch",
    confidence: "explicit",
    visitNote: "Заявку можно начать онлайн, но подписать договор — только в отделении по выбору.",
  },
  "BOŚ Bank": {
    onlineUrl: "https://www.bosbank.pl/klient-indywidualny/konta/Konto-bez-Kosztow",
    visitStatus: "branch",
    confidence: "indirect",
    visitNote: "Видео-верификация требует польский e-dowód/незаблокированный PESEL — без них только отделение.",
  },
  "Bank Pocztowy": {
    onlineUrl: "https://www.pocztowy.pl/indywidualni/konta-osobiste/otwarcie-konta-online",
    visitStatus: "branch",
    confidence: "explicit",
    visitNote: "Без karty pobytu банк вообще просит паспорт + карту — оба онлайн-способа рассчитаны на уже оформленный польский ID.",
    referral: { program: "Polecenie ma znaczenie", amount: "100 zł за реферала, до 1000 zł всего" },
  },
  "Bank Pekao S.A.": {
    onlineUrl: "https://www.pekao.com.pl/konto-online.html",
    visitStatus: "branch",
    confidence: "indirect",
    visitNote: "Онлайн-верификация (PeoPay) принимает только польский dowód/mObywatel/eDowód.",
  },
  "BNP Paribas Bank Polska": {
    onlineUrl: "https://www.bnpparibas.pl/klienci-indywidualni/konta/konto-osobiste",
    visitStatus: "branch",
    confidence: "explicit",
    visitNote: "Банк прямо пишет: дистанционно счёт может открыть только резидент с польским dowód osobisty.",
  },
  "Credit Agricole Bank Polska": {
    onlineUrl: "https://www.credit-agricole.pl/wniosek/konta/otworz-konto-nav",
    visitStatus: "branch",
    confidence: "explicit",
    visitNote: "У банка есть отдельная страница именно для иностранцев: открытие только в отделении.",
    referral: { program: "Bonus za Twoje polecenie", amount: "100 zł за реферала, лимит 1000 zł/год" },
  },
  "Nest Bank": {
    onlineUrl: "https://nestbank.pl/nest-konto/",
    visitStatus: "branch",
    confidence: "explicit",
    visitNote: "Видеозвонок и приложение принимают только польский dowód osobisty — паспорт годится лишь в отделении.",
    referral: { program: "Nest Profit", amount: "100 zł приведшему, 100 zł другу" },
  },
  VeloBank: {
    onlineUrl: "https://www.velobank.pl/otworz-konto",
    visitStatus: "branch",
    confidence: "explicit",
    visitNote: "Банк прямо пишет: для иностранцев это доступно исключительно в отделении.",
    referral: { program: "Polecam Velo", amount: "100 zł приведшему, 50 zł другу" },
  },
  "Plus Bank": {
    onlineUrl: "https://plusbank.pl/oferta-dla-ciebie/konto-osobiste/konto-lider",
    visitStatus: "branch",
    confidence: "indirect",
    visitNote: "У банка вообще нет онлайн-заявки — только обратный звонок и визит в партнёрское отделение.",
  },
  "Erste Bank Polska": {
    onlineUrl: "https://www.erste.pl/klient-indywidualny/konta/konto-smart",
    visitStatus: "branch",
    confidence: "explicit",
    visitNote: "Банк прямо пишет: счёт можно открыть только в стационарном отделении, через интернет — нельзя.",
    referral: { program: "Polecam mój bank", amount: "100 zł приведшему, 100 zł другу" },
  },
  "Toyota Bank Polska": {
    onlineUrl: "https://wnioski.toyotabank.pl/Account",
    visitStatus: "courier",
    confidence: "explicit",
    visitNote: "У банка нет отделений вообще — заявка онлайн, а личность проверяет курьер при подписании договора.",
  },
  "Volkswagen Bank Polska": {
    onlineUrl: "https://vwbank.vwfs.pl/konto_osobiste_edirect.html",
    visitStatus: "onlineIfId",
    confidence: "explicit",
    visitNote: "Полностью онлайн — только если уже есть польский dowód osobisty. Без него: бумажная заявка + визит курьера (~10 рабочих дней), отделений почти нет.",
  },

  // Online-only European fintechs (not traditional Polish banks) — added
  // September 2026. Unlike every bank above, all three genuinely open a
  // full remote account for a foreigner with no PESEL/Polish ID at all, via
  // passport/EEA ID + video/selfie verification. See "Revolut / Wise / N26"
  // in bank-account-opening-research.md for the sourced details and caveats
  // (Lithuanian IBAN for Revolut, no PLN local account details for Wise,
  // euro-only German-IBAN account for N26). Referral bonuses are
  // deliberately omitted here: Revolut's is a variable, per-invite amount
  // (not a fixed public figure) and no fixed PLN referral figure for
  // Wise/N26 was verified — see the no-fabrication rule in that doc.
  Revolut: {
    onlineUrl: "https://www.revolut.com/en-PL/",
    visitStatus: "online",
    confidence: "explicit",
    visitNote: "Полностью дистанционное открытие счёта через приложение — PESEL не нужен, достаточно загранпаспорта. Удобный онлайн-банк с мультивалютной картой.",
  },
  Wise: {
    onlineUrl: "https://wise.com/",
    visitStatus: "online",
    confidence: "explicit",
    visitNote: "Полностью дистанционно — паспорт и подтверждение адреса, PESEL не нужен. Удобный сервис для мультивалютных переводов и хранения денег в разных валютах.",
  },
  N26: {
    onlineUrl: "https://n26.com/en-eu",
    visitStatus: "online",
    confidence: "explicit",
    visitNote: "Полностью дистанционное открытие через приложение с видеоидентификацией — PESEL не нужен, только загранпаспорт. Быстрый и удобный онлайн-банк.",
  },
};

export function getBankAccountInfo(name: string): BankAccountInfo | null {
  return BANK_ACCOUNT_INFO[name] || null;
}
