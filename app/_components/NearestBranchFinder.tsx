"use client";

import { useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import {
  findNearestBranch,
  formatDistance,
  getUserLocation,
  hasGoogleMapsKey,
  loadGoogleMaps,
  type NearestBranch,
} from "../_lib/googleMaps";

type Status = "idle" | "locating" | "searching" | "found" | "error" | "not_found";

/** "Найти отделение рядом со мной" — geolocates the user, asks Places API
 * (New) for the closest real branch of this bank, then renders it on an
 * embedded Google Map with a "Маршрут" (directions) button. Renders nothing
 * if no API key is configured, so the rest of the "Куда подавать" tab (the
 * per-city map links) still works without it. */
export default function NearestBranchFinder({ bankName }: { bankName: string }) {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");
  const [branch, setBranch] = useState<NearestBranch | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);

  if (!hasGoogleMapsKey()) return null;

  async function handleClick() {
    setStatus("locating");
    setBranch(null);
    try {
      const origin = await getUserLocation();
      setStatus("searching");
      const [result] = await Promise.all([findNearestBranch(bankName, origin), loadGoogleMaps().catch(() => {})]);
      if (!result) {
        setStatus("not_found");
        return;
      }
      setBranch(result);
      setStatus("found");

      // Render the map on the next tick, once the container div exists.
      window.setTimeout(() => {
        const g = (window as unknown as { google?: any }).google;
        if (!g?.maps || !mapRef.current) return;
        const map = new g.maps.Map(mapRef.current, {
          center: result.location,
          zoom: 15,
          disableDefaultUI: true,
          zoomControl: true,
        });
        new g.maps.Marker({ position: origin, map, label: "•" });
        new g.maps.Marker({ position: result.location, map, title: result.name });
      }, 0);
    } catch (err) {
      // Logged (not swallowed) so a real device/browser issue — permission
      // denied, no GPS/Wi-Fi positioning available, Places API error, missing
      // referrer allowlist entry — is diagnosable from devtools instead of
      // just showing the generic banner text.
      console.error("NearestBranchFinder:", err);
      setStatus("error");
    }
  }

  const directionsUrl = branch
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(branch.address || branch.name)}&destination_place_id=${branch.placeId}`
    : null;

  return (
    <div className="mb-4">
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); handleClick(); }}
        disabled={status === "locating" || status === "searching"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-bright disabled:opacity-70"
      >
        <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {status === "locating" || status === "searching" ? t.banks.nearBranchLocating : t.banks.nearBranchButton}
      </button>

      {status === "error" && (
        <p className="mt-2 text-xs text-red-400">{t.banks.nearBranchError}</p>
      )}
      {status === "not_found" && (
        <p className="mt-2 text-xs text-text-muted">{t.banks.nearBranchNotFound}</p>
      )}

      {status === "found" && branch && (
        <div className="mt-3 overflow-hidden rounded-xl border border-border-subtle">
          <div ref={mapRef} className="h-40 w-full bg-surface-hover" />
          <div className="flex items-center gap-3 bg-surface-hover/40 p-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-text-primary">{branch.address || branch.name}</p>
              <p className="mt-0.5 text-xs text-text-secondary">
                {t.banks.nearBranchDistanceTemplate.replace("{n}", formatDistance(branch.distanceMeters))}
              </p>
            </div>
            {directionsUrl && (
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-shrink-0 rounded-lg border border-border-subtle px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-accent/50 hover:text-accent-bright"
              >
                {t.banks.nearBranchDirections}
              </a>
            )}
          </div>
          <p className="border-t border-border-subtle px-3 py-2 text-[11px] leading-relaxed text-text-muted">
            {t.banks.nearBranchDisclaimer}
          </p>
        </div>
      )}
    </div>
  );
}
