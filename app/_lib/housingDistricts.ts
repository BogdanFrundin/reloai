export type WarsawDistrict = {
  id: string;
  name: string;
  priceMin: number;
  priceMax: number;
  distanceKm: number;
  metro: boolean;
  description?: string;
  recommended?: boolean;
};

// Average monthly rent (PLN) for a 1-bedroom apartment, 2025 market data.
// First 4 are featured (shown by default), rest are available via "Show all" button.
export const WARSAW_DISTRICTS: WarsawDistrict[] = [
  { id: "mokotow", name: "Mokotów", priceMin: 3500, priceMax: 4500, distanceKm: 5, metro: true, description: "Лучший баланс цены и качества. Тихий, зелёный, хорошая инфраструктура, метро.", recommended: true },
  { id: "ursynow", name: "Ursynów", priceMin: 3000, priceMax: 3800, distanceKm: 10, metro: true, description: "Самый доступный комфортный район. Метро, парки, семейная атмосфера." },
  { id: "wola", name: "Wola", priceMin: 3000, priceMax: 4000, distanceKm: 4, metro: true, description: "Современный район, много новостроек, быстро развивается, близко к центру." },
  { id: "zoliborz", name: "Żoliborz", priceMin: 3500, priceMax: 4500, distanceKm: 5, metro: true, description: "Уютный, безопасный, любимый среди экспатов. Отличная атмосфера." },

  { id: "srodmiescie", name: "Śródmieście", priceMin: 4500, priceMax: 6000, distanceKm: 0, metro: true },
  { id: "praga-poludnie", name: "Praga-Południe", priceMin: 2800, priceMax: 3500, distanceKm: 5, metro: false },
  { id: "praga-polnoc", name: "Praga-Północ", priceMin: 2500, priceMax: 3200, distanceKm: 3, metro: true },
  { id: "bemowo", name: "Bemowo", priceMin: 2800, priceMax: 3500, distanceKm: 9, metro: true },
  { id: "bielany", name: "Bielany", priceMin: 2800, priceMax: 3500, distanceKm: 8, metro: true },
  { id: "targowek", name: "Targówek", priceMin: 2500, priceMax: 3000, distanceKm: 8, metro: true },
  { id: "bialoleka", name: "Białołęka", priceMin: 2500, priceMax: 3200, distanceKm: 14, metro: false },
  { id: "wilanow", name: "Wilanów", priceMin: 4000, priceMax: 5500, distanceKm: 12, metro: false },
  { id: "ochota", name: "Ochota", priceMin: 3200, priceMax: 4000, distanceKm: 4, metro: true },
  { id: "wlochy", name: "Włochy", priceMin: 2800, priceMax: 3500, distanceKm: 10, metro: false },
  { id: "rembertow", name: "Rembertów", priceMin: 2300, priceMax: 2800, distanceKm: 16, metro: false },
  { id: "wawer", name: "Wawer", priceMin: 2500, priceMax: 3000, distanceKm: 15, metro: false },
  { id: "wesola", name: "Wesoła", priceMin: 2200, priceMax: 2800, distanceKm: 20, metro: false },
  { id: "ursus", name: "Ursus", priceMin: 2600, priceMax: 3200, distanceKm: 14, metro: false },
];
