// Registry of official Polish government PDF blanks that the AI form-fill
// feature (app/api/documents/fill/route.ts + DocumentFillModal) knows how to
// fill in automatically. Each entry maps the *exact* AcroForm field names
// inside the source PDF (extracted from the government form, preserved
// verbatim in Polish) to values derived from the user's DocumentProfile.
//
// Only forms whose blank actually contains real fillable AcroForm fields are
// listed here -- most of the other document_guides blanks the user sends are
// flat/scanned PDFs with no fillable fields, so they can't be safely
// autofilled without visually re-verifying coordinates per form. Extending
// this list to more documents just means adding another entry once a
// fillable source PDF for that document is available (see
// app/api/documents/fill/route.ts's field-by-field try/catch, which already
// skips gracefully if a name is missing so partial matches never crash).

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

export type FieldMap = TextFieldMap | CheckboxFieldMap;

export type FormTemplate = {
  key: string;
  // Matches document_guides.name -- the "Заполнить с ИИ" button shows up on
  // any guide card whose name appears here.
  guideNames: string[];
  label: string;
  pdfPath: string; // relative to /public
  fields: FieldMap[];
};

function splitDate(iso: string | undefined) {
  const m = iso ? /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso) : null;
  return { day: m?.[3] ?? "", month: m?.[2] ?? "", year: m?.[1] ?? "" };
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

export const FORM_TEMPLATES: FormTemplate[] = [PESEL_STANDARD, PESEL_UKR];

export function getTemplateForGuide(guideName: string): FormTemplate | null {
  return FORM_TEMPLATES.find((t) => t.guideNames.includes(guideName)) ?? null;
}

export function getTemplateByKey(key: string): FormTemplate | null {
  return FORM_TEMPLATES.find((t) => t.key === key) ?? null;
}
