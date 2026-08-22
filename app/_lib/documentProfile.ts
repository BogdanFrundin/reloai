// Reusable personal-data profile for the AI form-fill feature (see
// app/api/documents/fill/route.ts and app/_components/DocumentFillModal.tsx).
// Filled once by the user, persisted to profiles.document_profile, and reused
// to fill in every supported official PDF blank without re-typing anything.
// Every field is optional -- the fill modal highlights whatever a given
// template still needs.

export type DocumentProfile = {
  firstName?: string;
  secondName?: string;
  lastName?: string;
  sex?: "M" | "F";
  birthDate?: string; // ISO yyyy-mm-dd
  birthPlace?: string;
  birthCountry?: string;
  citizenship?: string; // ISO alpha-2, defaults from profile.citizenship
  maritalStatus?: "single" | "married" | "divorced" | "widowed";
  spouseFirstName?: string;
  spouseLastName?: string;
  spousePesel?: string;
  fatherFirstName?: string;
  fatherLastName?: string;
  motherFirstName?: string;
  motherLastName?: string;
  passportNumber?: string;
  passportExpiry?: string; // ISO yyyy-mm-dd
  phone?: string;
  email?: string;
  addressStreet?: string;
  addressHouseNo?: string;
  addressApartmentNo?: string;
  addressPostCode?: string; // "00-000"
  addressCity?: string;
  entryDatePL?: string; // ISO yyyy-mm-dd -- date of entry to Poland (PESEL UKR)
  entrySchengenDate?: string; // ISO yyyy-mm-dd
  entrySchengenCountry?: string;
};

export type DocumentProfileFieldGroup = {
  title: string;
  fields: {
    key: keyof DocumentProfile;
    label: string;
    type: "text" | "date" | "select";
    options?: { value: string; label: string }[];
    placeholder?: string;
  }[];
};

export const DOCUMENT_PROFILE_GROUPS: DocumentProfileFieldGroup[] = [
  {
    title: "Личные данные",
    fields: [
      { key: "firstName", label: "Имя (латиницей, как в загранпаспорте)", type: "text", placeholder: "IVAN" },
      { key: "secondName", label: "Второе имя (если есть)", type: "text" },
      { key: "lastName", label: "Фамилия (латиницей)", type: "text", placeholder: "PETRENKO" },
      {
        key: "sex",
        label: "Пол",
        type: "select",
        options: [
          { value: "M", label: "Мужской" },
          { value: "F", label: "Женский" },
        ],
      },
      { key: "birthDate", label: "Дата рождения", type: "date" },
      { key: "birthPlace", label: "Место рождения (город)", type: "text" },
      { key: "birthCountry", label: "Страна рождения", type: "text" },
    ],
  },
  {
    title: "Семья",
    fields: [
      {
        key: "maritalStatus",
        label: "Семейное положение",
        type: "select",
        options: [
          { value: "single", label: "Не в браке" },
          { value: "married", label: "В браке" },
          { value: "divorced", label: "Разведён(а)" },
          { value: "widowed", label: "Вдова/вдовец" },
        ],
      },
      { key: "spouseFirstName", label: "Имя супруга(и)", type: "text" },
      { key: "spouseLastName", label: "Фамилия супруга(и)", type: "text" },
      { key: "spousePesel", label: "PESEL супруга(и) (если есть)", type: "text" },
      { key: "fatherFirstName", label: "Имя отца", type: "text" },
      { key: "fatherLastName", label: "Фамилия отца", type: "text" },
      { key: "motherFirstName", label: "Имя матери", type: "text" },
      { key: "motherLastName", label: "Фамилия матери", type: "text" },
    ],
  },
  {
    title: "Документы и контакты",
    fields: [
      { key: "passportNumber", label: "Серия и номер загранпаспорта", type: "text" },
      { key: "passportExpiry", label: "Срок действия паспорта", type: "date" },
      { key: "phone", label: "Телефон", type: "text", placeholder: "+48 ..." },
      { key: "email", label: "E-mail", type: "text" },
    ],
  },
  {
    title: "Адрес в Польше",
    fields: [
      { key: "addressStreet", label: "Улица", type: "text" },
      { key: "addressHouseNo", label: "Дом", type: "text" },
      { key: "addressApartmentNo", label: "Квартира", type: "text" },
      { key: "addressPostCode", label: "Индекс", type: "text", placeholder: "00-000" },
      { key: "addressCity", label: "Город", type: "text" },
    ],
  },
  {
    title: "Въезд в Польшу (для PESEL UKR)",
    fields: [
      { key: "entryDatePL", label: "Дата въезда в Польшу", type: "date" },
      { key: "entrySchengenDate", label: "Дата въезда в Шенген", type: "date" },
      { key: "entrySchengenCountry", label: "Страна въезда в Шенген", type: "text" },
    ],
  },
];

export function splitIsoDate(iso: string | undefined | null): { day: string; month: string; year: string } {
  if (!iso) return { day: "", month: "", year: "" };
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return { day: "", month: "", year: "" };
  return { year: m[1], month: m[2], day: m[3] };
}
