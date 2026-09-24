// Real, publicly-sourced ranking of Polish banks used to order the /banks
// page and the "Рейтинг банков" drawer (BankCardGrid.tsx). Aggregated from
// three independent 2026 industry surveys instead of an invented score —
// each bank's position below reflects an actual, citable result:
//
// - Złoty Bankier 2026 (Bankier.pl + Puls Biznesu, largest banking-sector
//   study in Poland, published April 2026): Bank Millennium won "Złoty
//   Bank" for the 2nd year running and won the personal-accounts category;
//   Santander Bank Polska (rebranded Erste Bank Polska in 2026) placed 2nd
//   overall; PKO Bank Polski placed 3rd.
//   https://www.bankier.pl/wiadomosc/Zloty-Bankier-2026-Czas-na-nagrody-dla-najlepszych-bankow-9110543.html
// - Instytucja Roku 2026 (MojeBankowanie.pl, based on ~750 branch visits,
//   phone and digital-channel mystery shopping): Bank Pekao won "Najlepszy
//   Bank w Polsce" overall for the first time and had the most awarded
//   individual branches (35); VeloBank topped the mobile-app category
//   (85.2%), Bank Millennium 2nd (84.9%); Santander Bank Polska led
//   "Najlepszy Bank dla Firm" (90.9%); ING Bank Śląski was the recurring
//   leader in private banking.
//   https://mojebankowanie.pl/instytucja-roku
// - App-store ratings (checked Sept 2026): mBank — 4.6/5 on Google Play
//   (402k ratings), 4.8/5 on the App Store (329k ratings), among the
//   highest of any Polish bank's app.
//
// Revolut, Wise and N26 are foreign fintechs, not Polish-licensed retail
// banks, so they don't participate in Złoty Bankier / Instytucja Roku and
// have no result in those surveys. Placed as their own group right after
// the award-covered banks, ordered by their real global Trustpilot score
// (checked Sept 2026, each "Great"/"Excellent" on 40k-430k+ reviews):
// Revolut 4.7/5 (trustpilot.com/review/www.revolut.com), Wise 4.3/5
// (trustpilot.com/review/wise.com), N26 4.2/5 (trustpilot.com/review/n26.com).
//
// Smaller/niche banks not covered by these three surveys (BNP Paribas,
// Bank Pocztowy, Credit Agricole, BOŚ, Nest Bank, Toyota Bank, Volkswagen
// Bank, Plus Bank) are ordered after the award-winners by relative
// national footprint (branch network / client base) rather than a made-up
// score — deliberately not given a fake specific rank.
export const REAL_BANK_RANK: string[] = [
  "Bank Pekao S.A.",
  "Bank Millennium",
  "PKO Bank Polski",
  "Erste Bank Polska",
  "mBank",
  "ING Bank Śląski",
  "VeloBank",
  "Revolut",
  "Wise",
  "N26",
  "BNP Paribas Bank Polska",
  "Bank Pocztowy",
  "Credit Agricole Bank Polska",
  "BOŚ Bank",
  "Nest Bank",
  "Toyota Bank Polska",
  "Volkswagen Bank Polska",
  "Plus Bank",
];

export function realBankRank(name: string): number {
  const idx = REAL_BANK_RANK.indexOf(name);
  return idx === -1 ? REAL_BANK_RANK.length : idx;
}
