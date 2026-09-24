// Client-side helpers for the "nearest branch" feature in
// BankCardModal.tsx's "Куда подавать" tab: loading the Maps JavaScript API
// once (singleton loader, since the script tag can only be injected once
// per page) and calling Places API (New) Text Search — with
// rankPreference: "DISTANCE" — to find the closest real branch of a given
// bank to the user's own geolocation.
//
// The API key is a browser key (NEXT_PUBLIC_*, restricted by HTTP referrer
// in the Google Cloud Console, not by keeping it server-only) — this is the
// standard/expected setup for Maps JavaScript API and for Places API (New)
// calls made directly from the browser.

declare global {
  interface Window {
    // No @types/google.maps dependency in this project — we only ever touch
    // `window.google.maps` as an opaque "is it loaded yet" marker, never its
    // typed API surface, so `any` here is deliberate rather than a shortcut.
    google?: { maps?: unknown };
    __googleMapsLoaderPromise?: Promise<void>;
  }
}

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export function hasGoogleMapsKey(): boolean {
  return !!API_KEY;
}

/** Loads the Maps JavaScript API script exactly once, however many
 * components ask for it concurrently. */
export function loadGoogleMaps(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject(new Error("no window"));
  if (!API_KEY) return Promise.reject(new Error("missing API key"));
  if (window.google?.maps) return Promise.resolve();
  if (window.__googleMapsLoaderPromise) return window.__googleMapsLoaderPromise;

  window.__googleMapsLoaderPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&loading=async`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("failed to load Google Maps"));
    document.head.appendChild(script);
  });
  return window.__googleMapsLoaderPromise;
}

export interface GeoPoint {
  lat: number;
  lng: number;
}

/** Wraps navigator.geolocation in a promise with a sane timeout. */
export function getUserLocation(): Promise<GeoPoint> {
  return new Promise((resolve, reject) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      reject(new Error("geolocation unsupported"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => reject(err),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 },
    );
  });
}

export interface NearestBranch {
  name: string;
  address: string;
  location: GeoPoint;
  placeId: string;
  distanceMeters: number;
}

// Haversine — distance between two lat/lng points in meters.
function distanceMeters(a: GeoPoint, b: GeoPoint): number {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const sinLat = Math.sin(dLat / 2);
  const sinLng = Math.sin(dLng / 2);
  const h = sinLat * sinLat + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * sinLng * sinLng;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Places API (New) Text Search, ranked by distance from the user's
 * location, restricted to Poland. Returns the single closest branch. */
export async function findNearestBranch(bankName: string, origin: GeoPoint): Promise<NearestBranch | null> {
  if (!API_KEY) throw new Error("missing API key");

  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": API_KEY,
      "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.location,places.id",
    },
    body: JSON.stringify({
      textQuery: `${bankName} bank`,
      languageCode: "ru",
      regionCode: "PL",
      rankPreference: "DISTANCE",
      locationBias: {
        circle: {
          center: { latitude: origin.lat, longitude: origin.lng },
          radius: 30000,
        },
      },
    }),
  });

  if (!res.ok) {
    throw new Error(`Places API error: ${res.status}`);
  }

  const data = await res.json();
  const places: Array<{
    displayName?: { text?: string };
    formattedAddress?: string;
    location?: { latitude: number; longitude: number };
    id: string;
  }> = data.places ?? [];

  if (places.length === 0) return null;

  const first = places[0];
  const location: GeoPoint = {
    lat: first.location?.latitude ?? origin.lat,
    lng: first.location?.longitude ?? origin.lng,
  };

  return {
    name: first.displayName?.text ?? bankName,
    address: first.formattedAddress ?? "",
    location,
    placeId: first.id,
    distanceMeters: distanceMeters(origin, location),
  };
}

/** Human-readable distance, e.g. "850 м" or "3.4 км". */
export function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters / 10) * 10} м`;
  return `${(meters / 1000).toFixed(1)} км`;
}
