"use client";

import { useEffect, useRef, useState } from "react";
import { DEFAULT_CITY, isCityName, type CityName } from "./cities";

// Shared across the medicine, education and housing pages so picking a city
// on one of them "sticks" when the user navigates away and back (each page
// used to reset to DEFAULT_CITY/profile.city on remount, which read as a bug
// — "I picked Warsaw, left, came back, it's Kraków again").
const STORAGE_KEY = "reloai_city";

export function useSelectedCity(profileCity: string | null | undefined): [CityName, (city: CityName) => void] {
  const [city, setCityState] = useState<CityName>(DEFAULT_CITY);
  const appliedStorage = useRef(false);
  const appliedProfile = useRef(false);

  // Restore the last city the user picked, once, on mount.
  useEffect(() => {
    if (appliedStorage.current) return;
    appliedStorage.current = true;
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (isCityName(stored)) {
      setCityState(stored);
      appliedProfile.current = true; // a saved choice wins over the profile default
    }
  }, []);

  // Fall back to the profile's city (once, whenever it loads) only if the
  // user has never explicitly picked one.
  useEffect(() => {
    if (appliedProfile.current) return;
    if (isCityName(profileCity)) {
      setCityState(profileCity);
      appliedProfile.current = true;
    }
  }, [profileCity]);

  function setCity(next: CityName) {
    setCityState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  }

  return [city, setCity];
}
