// Registry of official Polish government PDF blanks that the AI form-fill
// feature (app/api/documents/fill/route.ts + DocumentFillModal) knows how to
// fill in automatically.
//
// Two engines are supported:
//  - "text"/"checkbox": the PDF has real fillable AcroForm fields (verified
//    programmatically) -- values are set by exact field name, which pdf-lib
//    positions precisely with no guessing involved. This is the reliable
//    path, used for PESEL and PESEL UKR.
//  - "overlay-text"/"overlay-check": the PDF is a flat scan with no
//    fillable fields -- text is drawn at fixed page coordinates measured by
//    rendering the page to an image and reading off pixel positions (see
//    scripts used while calibrating each template below). Coordinates are
//    in PDF points from the bottom-left corner of the page. Every overlay
//    template must be test-filled and visually re-checked against a
//    rendered image before being considered reliable -- a wrong coordinate
//    silently prints text in the wrong box instead of erroring.

import type { DocumentProfile } from "./documentProfile";
import { getCountryName } from "./countries";

export type FillContext = {
  profile: DocumentProfile;
  citizenship: string | null; // ISO alpha-2, from profiles.citizenship
};

type TextFieldMap = {
  kind: "text";
  pdfField: string;
  value: (ctx: FillContext) => string | undefined;
};

type CheckboxFieldMap = {
  kind: "checkbox";
  pdfField: string;
  checked: (ctx: FillContext) => boolean;
};

type OverlayTextMap = {
  kind: "overlay-text";
  page: number; // 0-indexed
  x: number; // pt from left edge
  y: number; // pt from bottom edge
  size?: number; // default 9
  maxWidth?: number; // shrinks font to fit if the value would overflow
  value: (ctx: FillContext) => string | undefined;
};

type OverlayCheckMap = {
  kind: "overlay-check";
  page: number;
  x: number;
  y: number;
  size?: number; // default 9
  checked: (ctx: FillContext) => boolean;
};

export type FieldMap = TextFieldMap | CheckboxFieldMap | OverlayTextMap | OverlayCheckMap;

export type FormTemplate = {
  key: string;
  // Matches document_guides.name -- the "Заполнить с ИИ" button shows up on
  // any guide card whose name appears here.
  guideNames: string[];
  label: string;
  pdfPath: string; // relative to /public
  fields: FieldMap[];
  // True once an overlay template has been rendered back to an image and
  // visually confirmed to land correctly. Shown as a caution note in the
  // fill modal while false so results still get a human check.
  verified?: boolean;
};

function splitDate(iso: string | undefined) {
  const m = iso ? /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso) : null;
  return { day: m?.[3] ?? "", month: m?.[2] ?? "", year: m?.[1] ?? "" };
}

function formatDateDMY(iso: string | undefined): string | undefined {
  const d = splitDate(iso);
  if (!d.day) return undefined;
  return `${d.day}-${d.month}-${d.year}`;
}

function today() {
  const now = new Date();
  return {
    day: String(now.getDate()).padStart(2, "0"),
    month: String(now.getMonth() + 1).padStart(2, "0"),
    year: String(now.getFullYear()),
  };
}

function countryName(code: string | undefined | null): string {
  if (!code) return "";
  return getCountryName(code, "ru");
}

const PESEL_STANDARD: FormTemplate = {
  key: "pesel-standard",
  guideNames: ["PESEL обычный"],
  label: "PESEL — заявление о присвоении номера",
  pdfPath: "/forms/pesel-standard.pdf",
  fields: [
    { kind: "text", pdfField: "wnioskodawca imię", value: (c) => c.profile.firstName },
    { kind: "text", pdfField: "wnioskodawca nazwisko", value: (c) => c.profile.lastName },
    { kind: "text", pdfField: "adres do korespondencji osoby, która składa wniosek ulica", value: (c) => c.profile.addressStreet },
    { kind: "text", pdfField: "adres do korespondencji osoby, która składa wniosek numer domu", value: (c) => c.profile.addressHouseNo },
    { kind: "text", pdfField: "adres do korespondencji osoby, która składa wniosek numer lokalu", value: (c) => c.profile.addressApartmentNo },
    { kind: "text", pdfField: "adres do korespondencji osoby, która składa wniosek kod pocztowy dwie cyfry", value: (c) => c.profile.addressPostCode?.replace("-", "").slice(0, 2) },
    { kind: "text", pdfField: "adres do korespondencji osoby, która składa wniosek kod pocztowy trzy cyfry", value: (c) => c.profile.addressPostCode?.replace("-", "").slice(2, 5) },
    { kind: "text", pdfField: "adres do korespondencji osoby, która składa wniosek miejscowość", value: (c) => c.profile.addressCity },

    { kind: "text", pdfField: "dane osoby, której dotyczy wniosek  imię pierwsze", value: (c) => c.profile.firstName },
    { kind: "text", pdfField: "dane osoby, której dotyczy wniosek  imię drugie", value: (c) => c.profile.secondName },
    { kind: "text", pdfField: "dane osoby, której dotyczy wniosek  nazwisko", value: (c) => c.profile.lastName },
    { kind: "checkbox", pdfField: "dane osoby, której dotyczy wniosek płeć kobieta", checked: (c) => c.profile.sex === "F" },
    { kind: "checkbox", pdfField: "dane osoby, której dotyczy wniosek płeć mężczyzna", checked: (c) => c.profile.sex === "M" },
    { kind: "text", pdfField: "dane osoby, której dotyczy wniosek data urodzenia dzień", value: (c) => splitDate(c.profile.birthDate).day },
    { kind: "text", pdfField: "dane osoby, której dotyczy wniosek data urodzenia miesiąc", value: (c) => splitDate(c.profile.birthDate).month },
    { kind: "text", pdfField: "dane osoby, której dotyczy wniosek data urodzenia rok", value: (c) => splitDate(c.profile.birthDate).year },
    { kind: "text", pdfField: "dane osoby, której dotyczy wniosek data urodzenia kraj urodzenia", value: (c) => c.profile.birthCountry || countryName(c.citizenship) },
    {
      kind: "checkbox",
      pdfField: "dane osoby, której dotyczy wniosek data urodzenia obywatelstwo lub status inne",
      checked: (c) => Boolean(c.citizenship) && c.citizenship !== "PL",
    },
    {
      kind: "text",
      pdfField: "dane osoby, której dotyczy wniosek data urodzenia obywatelstwo lub status podaj inne",
      value: (c) => countryName(c.citizenship),
    },

    { kind: "text", pdfField: "dokument podróży cudzoziemca lub inny dokument potwierdzający tożsamość i obywatelstwo seria i numer", value: (c) => c.profile.passportNumber },
    { kind: "text", pdfField: "dokument podróży cudzoziemca lub inny dokument potwierdzający tożsamość i obywatelstwo data ważności dzień", value: (c) => splitDate(c.profile.passportExpiry).day },
    { kind: "text", pdfField: "dokument podróży cudzoziemca lub inny dokument potwierdzający tożsamość i obywatelstwo data ważności miesiąc", value: (c) => splitDate(c.profile.passportExpiry).month },
    { kind: "text", pdfField: "dokument podróży cudzoziemca lub inny dokument potwierdzający tożsamość i obywatelstwo data ważności rok", value: (c) => splitDate(c.profile.passportExpiry).year },

    { kind: "text", pdfField: "dodatkowe dane osoby, której wniosek dotyczy miejsce urodzenia", value: (c) => c.profile.birthPlace },
    { kind: "text", pdfField: "dodatkowe dane osoby, której wniosek dotyczy imię ojca pierwsze", value: (c) => c.profile.fatherFirstName },
    { kind: "text", pdfField: "dodatkowe dane osoby, której wniosek dotyczy nazwisko rodowe ojca", value: (c) => c.profile.fatherLastName },
    { kind: "text", pdfField: "dodatkowe dane osoby, której wniosek dotyczy imię matki pierwsze", value: (c) => c.profile.motherFirstName },
    { kind: "text", pdfField: "dodatkowe dane osoby, której wniosek dotyczy nazwisko rodowe matki", value: (c) => c.profile.motherLastName },

    { kind: "checkbox", pdfField: "dane o stanie cywilnym osoby, której wniosek dotyczy kawaler panna", checked: (c) => c.profile.maritalStatus === "single" },
    { kind: "checkbox", pdfField: "dane o stanie cywilnym osoby, której wniosek dotyczy żonaty zamężna", checked: (c) => c.profile.maritalStatus === "married" },
    { kind: "checkbox", pdfField: "dane o stanie cywilnym osoby, której wniosek dotyczy rozwiedziony", checked: (c) => c.profile.maritalStatus === "divorced" },
    { kind: "checkbox", pdfField: "dane o stanie cywilnym osoby, której wniosek dotyczy wdowiec", checked: (c) => c.profile.maritalStatus === "widowed" },
    { kind: "text", pdfField: "dane o stanie cywilnym osoby, której wniosek dotyczy imię małżonka", value: (c) => c.profile.spouseFirstName },
    { kind: "text", pdfField: "dane o stanie cywilnym osoby, której wniosek dotyczy nazwisko rodowe małżonka", value: (c) => c.profile.spouseLastName },
    { kind: "text", pdfField: "dane o stanie cywilnym osoby, której wniosek dotyczy numer pesel małżonka", value: (c) => c.profile.spousePesel },

    { kind: "checkbox", pdfField: "przekazanie wnioskodawcy powiadomienia o nadaniu numeru PESEL elektroniczna", checked: (c) => Boolean(c.profile.email) },
    { kind: "checkbox", pdfField: "przekazanie wnioskodawcy powiadomienia o nadaniu numeru PESEL papierowa", checked: (c) => !c.profile.email },
    { kind: "text", pdfField: "przekazanie wnioskodawcy powiadomienia o nadaniu numeru PESEL adres elektroniczny", value: (c) => c.profile.email },

    { kind: "text", pdfField: "podpisy miejscowość", value: (c) => c.profile.addressCity },
    { kind: "text", pdfField: "podpisy data dzień", value: () => today().day },
    { kind: "text", pdfField: "podpisy data miesiąc", value: () => today().month },
    { kind: "text", pdfField: "podpisy data rok", value: () => today().year },
  ],
};

const PESEL_UKR: FormTemplate = {
  key: "pesel-ukr",
  guideNames: ["PESEL со статусом UKR"],
  label: "PESEL UKR — заявление (временная защита)",
  pdfPath: "/forms/pesel-ukr.pdf",
  fields: [
    { kind: "text", pdfField: "imię (imiona)", value: (c) => [c.profile.firstName, c.profile.secondName].filter(Boolean).join(" ") },
    { kind: "text", pdfField: "nazwisko", value: (c) => c.profile.lastName },
    { kind: "text", pdfField: "data urodzenia dzień", value: (c) => splitDate(c.profile.birthDate).day },
    { kind: "text", pdfField: "data urodzenia miesiąc", value: (c) => splitDate(c.profile.birthDate).month },
    { kind: "text", pdfField: "data urodzenia rok", value: (c) => splitDate(c.profile.birthDate).year },
    { kind: "checkbox", pdfField: "płeć kobieta", checked: (c) => c.profile.sex === "F" },
    { kind: "checkbox", pdfField: "płeć mężczyzna", checked: (c) => c.profile.sex === "M" },
    { kind: "text", pdfField: "kraj urodzenia", value: (c) => c.profile.birthCountry || countryName(c.citizenship) },
    { kind: "checkbox", pdfField: "obywatelstwo ukraińskie", checked: (c) => c.citizenship === "UA" },
    { kind: "text", pdfField: "inne obywatelstwo", value: (c) => (c.citizenship && c.citizenship !== "UA" ? countryName(c.citizenship) : undefined) },
    { kind: "text", pdfField: "dane osoby oznaczenie dokumentu, na podstawie którego ustalono tożsamość", value: (c) => c.profile.passportNumber },

    { kind: "text", pdfField: "imię ojca (pierwsze)", value: (c) => c.profile.fatherFirstName },
    { kind: "text", pdfField: "nazwisko ojca", value: (c) => c.profile.fatherLastName },
    { kind: "text", pdfField: "imię matki (pierwsze)", value: (c) => c.profile.motherFirstName },
    { kind: "text", pdfField: "nazwisko matki", value: (c) => c.profile.motherLastName },

    { kind: "text", pdfField: "data wjazdu na terytorium Polski dzień", value: (c) => splitDate(c.profile.entryDatePL).day },
    { kind: "text", pdfField: "data wjazdu na terytorium Polski miesiąc", value: (c) => splitDate(c.profile.entryDatePL).month },
    { kind: "text", pdfField: "data wjazdu na terytorium Polski rok", value: (c) => splitDate(c.profile.entryDatePL).year },
    { kind: "text", pdfField: "data wjazdu do kraju strefy Schengen dzień", value: (c) => splitDate(c.profile.entrySchengenDate).day },
    { kind: "text", pdfField: "data wjazdu do kraju strefy Schengen miesiąc", value: (c) => splitDate(c.profile.entrySchengenDate).month },
    { kind: "text", pdfField: "data wjazdu do kraju strefy Schengen rok", value: (c) => splitDate(c.profile.entrySchengenDate).year },
    { kind: "text", pdfField: "kraj wjazdu do strefy Schengen", value: (c) => c.profile.entrySchengenCountry },

    { kind: "checkbox", pdfField: "wyrażam zgodę na przekazanie do rejestru danych kontaktowych", checked: (c) => Boolean(c.profile.phone || c.profile.email) },
    { kind: "text", pdfField: "numer telefonu kontaktowego", value: (c) => c.profile.phone },
    { kind: "text", pdfField: "adres poczty elektronicznej", value: (c) => c.profile.email },
    { kind: "checkbox", pdfField: "na terytorium Polski wjechałem bezpośrednio z terytorium Ukrainy", checked: (c) => c.citizenship === "UA" },

    { kind: "text", pdfField: "oświadczenie - wpisz miejscowość", value: (c) => c.profile.addressCity },
    { kind: "text", pdfField: "oświadczenie data - wpisz dzień", value: () => today().day },
    { kind: "text", pdfField: "oświadczenie data - wpisz miesiąc", value: () => today().month },
    { kind: "text", pdfField: "oświadczenie data - wpisz rok", value: () => today().year },
  ],
};

// Coordinates measured from the actual source PDF via `pdftotext -bbox`
// (label bounding boxes, converted from top-left to pdf-lib's bottom-left
// origin) and confirmed by rendering a filled test copy back to an image.
const APOSTILLE_NAWA: FormTemplate = {
  key: "apostille-nawa",
  guideNames: ["Апостиль на документы"],
  label: "Апостиль на документы (NAWA)",
  pdfPath: "/forms/apostille-nawa.pdf",
  verified: true,
  fields: [
    { kind: "overlay-text", page: 1, x: 115, y: 656, value: (c) => c.profile.firstName },
    { kind: "overlay-text", page: 1, x: 128, y: 636, value: (c) => c.profile.lastName },
    { kind: "overlay-text", page: 1, x: 115, y: 616, value: (c) => c.profile.addressStreet },
    { kind: "overlay-text", page: 1, x: 192, y: 596, value: (c) => c.profile.addressHouseNo },
    { kind: "overlay-text", page: 1, x: 203, y: 576, value: (c) => c.profile.addressApartmentNo },
    { kind: "overlay-text", page: 1, x: 131, y: 556, value: (c) => c.profile.addressPostCode },
    { kind: "overlay-text", page: 1, x: 105, y: 536, value: (c) => c.profile.addressCity },
    { kind: "overlay-text", page: 1, x: 123, y: 515, value: (c) => countryName(c.citizenship) },
    { kind: "overlay-text", page: 1, x: 115, y: 495, value: (c) => c.profile.email },
    { kind: "overlay-text", page: 1, x: 116, y: 475, value: (c) => c.profile.phone },
  ],
};

// Application for National Visa (EU-harmonized visa form) -- same base form
// used for visa D (work/study/business/family) and the Schengen visa.
// Page 1 covers identity/passport/address; pages 2-6 cover trip-specific
// details (purpose, dates of travel, inviting party) that aren't part of
// DocumentProfile and are left blank for the applicant to fill by hand.
const VISA_D: FormTemplate = {
  key: "visa-d",
  guideNames: [
    "Виза D (рабочая)",
    "Виза D (студенческая)",
    "Виза D (бизнес)",
    "Виза D (воссоединение семьи)",
    "Виза D (гуманитарная, D21)",
  ],
  label: "Application for National Visa (виза D)",
  pdfPath: "/forms/visa-d.pdf",
  verified: true,
  fields: [
    { kind: "overlay-text", page: 0, x: 65, y: 648, value: (c) => c.profile.lastName },
    { kind: "overlay-text", page: 0, x: 65, y: 590, value: (c) => [c.profile.firstName, c.profile.secondName].filter(Boolean).join(" ") },
    { kind: "overlay-text", page: 0, x: 65, y: 560, value: (c) => formatDateDMY(c.profile.birthDate) },
    { kind: "overlay-text", page: 0, x: 210, y: 560, value: (c) => c.profile.birthPlace },
    { kind: "overlay-text", page: 0, x: 210, y: 535, value: (c) => c.profile.birthCountry || countryName(c.citizenship) },
    { kind: "overlay-text", page: 0, x: 380, y: 569, size: 7, maxWidth: 42, value: (c) => countryName(c.citizenship) },
    { kind: "overlay-check", page: 0, x: 55, y: 504, checked: (c) => c.profile.sex === "M" },
    { kind: "overlay-check", page: 0, x: 87, y: 504, checked: (c) => c.profile.sex === "F" },
    { kind: "overlay-check", page: 0, x: 245, y: 497, checked: (c) => c.profile.maritalStatus === "single" },
    { kind: "overlay-check", page: 0, x: 283, y: 497, checked: (c) => c.profile.maritalStatus === "married" },
    { kind: "overlay-check", page: 0, x: 376, y: 497, checked: (c) => c.profile.maritalStatus === "divorced" },
    { kind: "overlay-check", page: 0, x: 61, y: 361, checked: () => true }, // "Ordinary passport"
    { kind: "overlay-text", page: 0, x: 65, y: 303, value: (c) => c.profile.passportNumber },
    { kind: "overlay-text", page: 0, x: 285, y: 303, value: (c) => formatDateDMY(c.profile.passportExpiry) },
    { kind: "overlay-text", page: 0, x: 345, y: 303, value: (c) => countryName(c.citizenship) },
    {
      kind: "overlay-text",
      page: 0,
      x: 65,
      y: 273,
      value: (c) =>
        [c.profile.addressStreet, c.profile.addressHouseNo, c.profile.addressApartmentNo, c.profile.addressPostCode, c.profile.addressCity]
          .filter(Boolean)
          .join(" "),
    },
    { kind: "overlay-text", page: 0, x: 65, y: 261, value: (c) => c.profile.email },
    { kind: "overlay-text", page: 0, x: 295, y: 273, value: (c) => c.profile.phone },
  ],
};

// NIP-7 -- personal tax ID registration. Page 0 of the extracted blank is a
// section-divider title page (no form content), the real form starts at
// page 1. Only identity fields (part B.1) are filled -- address/contact
// (B.3/B.4) and the business-only part C are left for the applicant.
const NIP7: FormTemplate = {
  key: "nip7",
  guideNames: ["NIP (налоговый номер, физлицо)"],
  label: "NIP-7 — заявление о присвоении NIP",
  pdfPath: "/forms/nip7.pdf",
  verified: true,
  fields: [
    { kind: "overlay-check", page: 1, x: 188, y: 448, checked: () => true }, // "5. zgłoszenie identyfikacyjne"
    { kind: "overlay-text", page: 1, x: 265, y: 347, value: (c) => c.profile.lastName },
    { kind: "overlay-text", page: 1, x: 40, y: 323, value: (c) => c.profile.firstName },
    { kind: "overlay-text", page: 1, x: 340, y: 323, value: (c) => c.profile.secondName },
    { kind: "overlay-text", page: 1, x: 40, y: 299, value: (c) => c.profile.fatherFirstName },
    { kind: "overlay-text", page: 1, x: 340, y: 299, value: (c) => c.profile.motherFirstName },
    { kind: "overlay-text", page: 1, x: 40, y: 280, value: (c) => formatDateDMY(c.profile.birthDate) },
    { kind: "overlay-text", page: 1, x: 407, y: 275, value: (c) => c.profile.birthPlace },
    { kind: "overlay-check", page: 1, x: 88, y: 252, checked: (c) => c.profile.sex === "F" },
    { kind: "overlay-check", page: 1, x: 144, y: 252, checked: (c) => c.profile.sex === "M" },
    { kind: "overlay-text", page: 1, x: 40, y: 227, value: () => "Paszport" },
    { kind: "overlay-text", page: 1, x: 40, y: 203, value: (c) => c.profile.passportNumber },
    { kind: "overlay-text", page: 1, x: 40, y: 181, value: (c) => countryName(c.citizenship) },
  ],
};

// CEIDG-1 -- sole-trader business registration. Page 0 of the extracted
// blank is a section-divider title page, the real form starts at page 1.
const CEIDG1: FormTemplate = {
  key: "ceidg1",
  guideNames: ["Регистрация ИП (JDG)"],
  label: "CEIDG-1 — регистрация ИП",
  pdfPath: "/forms/ceidg1.pdf",
  verified: true,
  fields: [
    { kind: "overlay-check", page: 1, x: 32, y: 606, checked: () => true }, // "Wniosek o wpis do CEIDG"
    { kind: "overlay-check", page: 1, x: 60, y: 512, checked: (c) => c.profile.sex === "F" }, // Kobieta
    { kind: "overlay-check", page: 1, x: 114, y: 512, checked: (c) => c.profile.sex === "M" }, // Mężczyzna
    { kind: "overlay-text", page: 1, x: 32, y: 485, size: 7, value: (c) => c.profile.lastName },
    { kind: "overlay-text", page: 1, x: 32, y: 466, size: 7, value: (c) => c.profile.firstName },
    { kind: "overlay-text", page: 1, x: 32, y: 428, size: 7, value: (c) => c.profile.secondName },
    { kind: "overlay-text", page: 1, x: 32, y: 410, size: 7, value: (c) => c.profile.fatherFirstName },
    { kind: "overlay-text", page: 1, x: 32, y: 391, size: 7, value: (c) => c.profile.motherFirstName },
    { kind: "overlay-text", page: 1, x: 32, y: 372, size: 7, value: (c) => c.profile.birthPlace },
    { kind: "overlay-text", page: 1, x: 210, y: 337, value: (c) => formatDateDMY(c.profile.birthDate) },
    { kind: "overlay-check", page: 1, x: 112, y: 297, checked: () => true }, // "Paszport"
    { kind: "overlay-text", page: 1, x: 32, y: 269, size: 7, value: () => "Paszport" },
    { kind: "overlay-text", page: 1, x: 32, y: 251, size: 7, value: (c) => c.profile.passportNumber },
    { kind: "overlay-check", page: 1, x: 349, y: 456, checked: (c) => Boolean(c.citizenship) && c.citizenship !== "PL" }, // "Inne" obywatelstwo
    { kind: "overlay-text", page: 1, x: 395, y: 456, size: 8, value: (c) => countryName(c.citizenship) },
    { kind: "overlay-check", page: 1, x: 312, y: 400, checked: () => true }, // "Jestem cudzoziemcem..."
    { kind: "overlay-text", page: 1, x: 32, y: 195, size: 7, value: () => "Polska" },
    { kind: "overlay-text", page: 1, x: 32, y: 176, size: 7, value: (c) => c.profile.addressPostCode },
    { kind: "overlay-text", page: 1, x: 32, y: 157, size: 7, value: (c) => c.profile.addressCity },
    { kind: "overlay-text", page: 1, x: 32, y: 139, size: 7, value: (c) => c.profile.addressStreet },
    { kind: "overlay-text", page: 1, x: 32, y: 120, size: 7, value: (c) => c.profile.addressHouseNo },
    { kind: "overlay-text", page: 1, x: 175, y: 120, size: 7, value: (c) => c.profile.addressApartmentNo },
    { kind: "overlay-text", page: 1, x: 32, y: 64, size: 7, value: (c) => c.profile.phone },
    { kind: "overlay-text", page: 1, x: 32, y: 45, size: 7, value: (c) => c.profile.email },
  ],
};

// Work permit application (zezwolenie na pracę, types A-E share one blank).
// Sections 1 and 3 are about the employer/job and aren't derived from
// DocumentProfile -- only section "2. INFORMACJE DOTYCZĄCE CUDZOZIEMCA"
// (about the foreign worker, i.e. the user) is filled, on page 3 (0-indexed)
// of the extracted blank.
const WORK_PERMIT: FormTemplate = {
  key: "work-permit",
  guideNames: [
    "Разрешение на работу тип A",
    "Разрешение на работу тип B",
    "Разрешение на работу тип C",
    "Разрешение на работу тип D",
  ],
  label: "Wniosek o wydanie zezwolenia na pracę",
  pdfPath: "/forms/work-permit.pdf",
  verified: true,
  fields: [
    { kind: "overlay-text", page: 3, x: 122, y: 543, value: (c) => [c.profile.firstName, c.profile.secondName].filter(Boolean).join(" ") },
    { kind: "overlay-text", page: 3, x: 112, y: 520, value: (c) => c.profile.lastName },
    { kind: "overlay-check", page: 3, x: 202, y: 501, checked: (c) => c.profile.sex === "F" },
    { kind: "overlay-check", page: 3, x: 270, y: 501, checked: (c) => c.profile.sex === "M" },
    { kind: "overlay-text", page: 3, x: 183, y: 480, value: (c) => formatDateDMY(c.profile.birthDate) },
    { kind: "overlay-text", page: 3, x: 130, y: 457, value: (c) => countryName(c.citizenship) },
    { kind: "overlay-text", page: 3, x: 88, y: 417, value: () => "Paszport" },
    { kind: "overlay-text", page: 3, x: 358, y: 417, value: (c) => c.profile.passportNumber },
    { kind: "overlay-text", page: 3, x: 400, y: 394, value: (c) => formatDateDMY(c.profile.passportExpiry) },
  ],
};

// Application for Schengen Visa -- same family as VISA_D but NOT pixel
// identical (row heights differ slightly), so it gets its own measured
// coordinates rather than reusing VISA_D's.
const SCHENGEN_VISA: FormTemplate = {
  key: "schengen-visa",
  guideNames: ["Шенгенская виза", "Транзитная виза (Виза типа A)"],
  label: "Application for Schengen Visa",
  pdfPath: "/forms/schengen-visa.pdf",
  verified: true,
  fields: [
    { kind: "overlay-text", page: 1, x: 65, y: 650, value: (c) => c.profile.lastName },
    { kind: "overlay-text", page: 1, x: 65, y: 586, value: (c) => [c.profile.firstName, c.profile.secondName].filter(Boolean).join(" ") },
    { kind: "overlay-text", page: 1, x: 65, y: 543, value: (c) => formatDateDMY(c.profile.birthDate) },
    { kind: "overlay-text", page: 1, x: 210, y: 543, value: (c) => c.profile.birthPlace },
    { kind: "overlay-text", page: 1, x: 210, y: 523, value: (c) => c.profile.birthCountry || countryName(c.citizenship) },
    { kind: "overlay-text", page: 1, x: 380, y: 559, size: 7, maxWidth: 42, value: (c) => countryName(c.citizenship) },
    { kind: "overlay-check", page: 1, x: 60, y: 489, checked: (c) => c.profile.sex === "M" },
    { kind: "overlay-check", page: 1, x: 94, y: 489, checked: (c) => c.profile.sex === "F" },
    { kind: "overlay-check", page: 1, x: 247, y: 489, checked: (c) => c.profile.maritalStatus === "single" },
    { kind: "overlay-check", page: 1, x: 283, y: 489, checked: (c) => c.profile.maritalStatus === "married" },
    { kind: "overlay-check", page: 1, x: 371, y: 489, checked: (c) => c.profile.maritalStatus === "divorced" },
    { kind: "overlay-check", page: 1, x: 63, y: 344, checked: () => true }, // "Ordinary passport"
    { kind: "overlay-text", page: 1, x: 65, y: 295, value: (c) => c.profile.passportNumber },
    { kind: "overlay-text", page: 1, x: 285, y: 295, value: (c) => formatDateDMY(c.profile.passportExpiry) },
    { kind: "overlay-text", page: 1, x: 345, y: 295, value: (c) => countryName(c.citizenship) },
    {
      kind: "overlay-text",
      page: 1,
      x: 65,
      y: 265,
      value: (c) =>
        [c.profile.addressStreet, c.profile.addressHouseNo, c.profile.addressApartmentNo, c.profile.addressPostCode, c.profile.addressCity]
          .filter(Boolean)
          .join(" "),
    },
    { kind: "overlay-text", page: 1, x: 65, y: 253, value: (c) => c.profile.email },
    { kind: "overlay-text", page: 1, x: 295, y: 265, value: (c) => c.profile.phone },
  ],
};

// PIT tax forms: only the identification fields (name, DOB, address) are
// filled from the profile -- income/deduction figures are financial data
// that live nowhere in DocumentProfile, so those sections are deliberately
// left blank for the user to fill in themselves from their PIT-11.

const PIT36: FormTemplate = {
  key: "pit-36",
  guideNames: ["PIT-36 — декларация (ИП / доход из-за рубежа)"],
  label: "PIT-36 — годовая декларация о доходах",
  pdfPath: "/forms/pit-36.pdf",
  verified: true,
  fields: [
    { kind: "overlay-text", page: 0, x: 36, y: 348, size: 7, value: (c) => c.profile.lastName },
    { kind: "overlay-text", page: 0, x: 289, y: 348, size: 7, value: (c) => c.profile.firstName },
    { kind: "overlay-text", page: 0, x: 426, y: 348, size: 7, value: (c) => formatDateDMY(c.profile.birthDate) },
    { kind: "overlay-text", page: 0, x: 36, y: 323, size: 7, value: () => "Polska" },
    { kind: "overlay-text", page: 0, x: 190, y: 297, size: 7, value: (c) => c.profile.addressStreet },
    { kind: "overlay-text", page: 0, x: 448, y: 297, size: 7, value: (c) => c.profile.addressHouseNo },
    { kind: "overlay-text", page: 0, x: 523, y: 297, size: 7, value: (c) => c.profile.addressApartmentNo },
    { kind: "overlay-text", page: 0, x: 36, y: 272, size: 7, value: (c) => c.profile.addressCity },
    { kind: "overlay-text", page: 0, x: 453, y: 272, size: 7, value: (c) => c.profile.addressPostCode },
  ],
};

const PIT37: FormTemplate = {
  key: "pit-37",
  guideNames: ["PIT — налоговая декларация"],
  label: "PIT-37 — годовая декларация (наёмный труд)",
  pdfPath: "/forms/pit-37.pdf",
  verified: true,
  fields: [
    { kind: "overlay-text", page: 0, x: 36, y: 308, size: 7, value: (c) => c.profile.lastName },
    { kind: "overlay-text", page: 0, x: 330, y: 308, size: 7, value: (c) => c.profile.firstName },
    { kind: "overlay-text", page: 0, x: 447, y: 308, size: 7, value: (c) => formatDateDMY(c.profile.birthDate) },
    { kind: "overlay-text", page: 0, x: 36, y: 282, size: 7, value: () => "Polska" },
    { kind: "overlay-text", page: 0, x: 232, y: 257, size: 7, value: (c) => c.profile.addressStreet },
    { kind: "overlay-text", page: 0, x: 483, y: 257, size: 7, value: (c) => c.profile.addressHouseNo },
    { kind: "overlay-text", page: 0, x: 547, y: 257, size: 7, value: (c) => c.profile.addressApartmentNo },
    { kind: "overlay-text", page: 0, x: 36, y: 231, size: 7, value: (c) => c.profile.addressCity },
    { kind: "overlay-text", page: 0, x: 475, y: 231, size: 7, value: (c) => c.profile.addressPostCode },
  ],
};

const PIT28: FormTemplate = {
  key: "pit-28",
  guideNames: ["PIT-28 — декларация (ryczałt)"],
  label: "PIT-28 — годовая декларация (ryczałt)",
  pdfPath: "/forms/pit-28.pdf",
  verified: true,
  fields: [
    { kind: "overlay-text", page: 0, x: 38, y: 463, size: 7, value: (c) => c.profile.lastName },
    { kind: "overlay-text", page: 0, x: 254, y: 463, size: 7, value: (c) => c.profile.firstName },
    { kind: "overlay-text", page: 0, x: 434, y: 463, size: 7, value: (c) => formatDateDMY(c.profile.birthDate) },
    { kind: "overlay-text", page: 0, x: 41, y: 438, size: 7, value: () => "Polska" },
    { kind: "overlay-text", page: 0, x: 230, y: 414, size: 7, value: (c) => c.profile.addressStreet },
    { kind: "overlay-text", page: 0, x: 428, y: 414, size: 7, value: (c) => c.profile.addressHouseNo },
    { kind: "overlay-text", page: 0, x: 509, y: 414, size: 7, value: (c) => c.profile.addressApartmentNo },
    { kind: "overlay-text", page: 0, x: 41, y: 390, size: 7, value: (c) => c.profile.addressCity },
    { kind: "overlay-text", page: 0, x: 432, y: 390, size: 7, value: (c) => c.profile.addressPostCode },
  ],
};

const ZAP3: FormTemplate = {
  key: "zap-3",
  guideNames: ["ZAP-3 — обновление адреса и контактов"],
  label: "ZAP-3 — обновление адреса и контактов",
  pdfPath: "/forms/zap-3.pdf",
  verified: true,
  fields: [
    { kind: "overlay-text", page: 0, x: 33, y: 520, size: 7, value: (c) => c.profile.lastName },
    { kind: "overlay-text", page: 0, x: 360, y: 520, size: 7, value: (c) => c.profile.firstName },
    { kind: "overlay-text", page: 0, x: 36, y: 448, size: 7, value: () => "Polska" },
    { kind: "overlay-text", page: 0, x: 208, y: 424, size: 7, value: (c) => c.profile.addressStreet },
    { kind: "overlay-text", page: 0, x: 486, y: 424, size: 7, value: (c) => c.profile.addressHouseNo },
    { kind: "overlay-text", page: 0, x: 543, y: 424, size: 7, value: (c) => c.profile.addressApartmentNo },
    { kind: "overlay-text", page: 0, x: 48, y: 400, size: 7, value: (c) => c.profile.addressPostCode },
    { kind: "overlay-text", page: 0, x: 207, y: 400, size: 7, value: (c) => c.profile.addressCity },
    { kind: "overlay-text", page: 0, x: 37, y: 352, size: 7, value: (c) => c.profile.phone },
    { kind: "overlay-text", page: 0, x: 294, y: 328, size: 7, value: (c) => c.profile.email },
  ],
};

const DSF1: FormTemplate = {
  key: "dsf-1",
  guideNames: ["DSF-1 — декларация о солидарностном налоге"],
  label: "DSF-1 — декларация о солидарностном налоге",
  pdfPath: "/forms/dsf-1.pdf",
  verified: true,
  fields: [
    { kind: "overlay-text", page: 0, x: 60, y: 530, size: 7, value: (c) => c.profile.lastName },
    { kind: "overlay-text", page: 0, x: 300, y: 530, size: 7, value: (c) => c.profile.firstName },
    { kind: "overlay-text", page: 0, x: 419, y: 530, size: 7, value: (c) => formatDateDMY(c.profile.birthDate) },
    { kind: "overlay-text", page: 0, x: 63, y: 505, size: 7, value: () => "Polska" },
    { kind: "overlay-text", page: 0, x: 199, y: 480, size: 7, value: (c) => c.profile.addressStreet },
    { kind: "overlay-text", page: 0, x: 478, y: 480, size: 7, value: (c) => c.profile.addressHouseNo },
    { kind: "overlay-text", page: 0, x: 535, y: 480, size: 7, value: (c) => c.profile.addressApartmentNo },
    { kind: "overlay-text", page: 0, x: 63, y: 455, size: 7, value: (c) => c.profile.addressCity },
    { kind: "overlay-text", page: 0, x: 484, y: 455, size: 7, value: (c) => c.profile.addressPostCode },
  ],
};

export const FORM_TEMPLATES: FormTemplate[] = [
  PESEL_STANDARD,
  PESEL_UKR,
  APOSTILLE_NAWA,
  VISA_D,
  NIP7,
  CEIDG1,
  WORK_PERMIT,
  PIT36,
  PIT37,
  PIT28,
  ZAP3,
  DSF1,
  SCHENGEN_VISA,
];

export function getTemplateForGuide(guideName: string): FormTemplate | null {
  return FORM_TEMPLATES.find((t) => t.guideNames.includes(guideName)) ?? null;
}

export function getTemplateByKey(key: string): FormTemplate | null {
  return FORM_TEMPLATES.find((t) => t.key === key) ?? null;
}
