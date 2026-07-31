"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useAuth } from "./AuthProvider";
import { useDashboardProgress } from "./DashboardProgressProvider";
import { useLanguage } from "./LanguageProvider";
import { getFlagUrl } from "../_lib/flags";
import { getCountryName } from "../_lib/countries";

const COUNTRY_FLAG_CODE: Record<string, string> = { Poland: "pl", Germany: "de", Spain: "es" };
const COUNTRY_ORDER = ["Poland", "Germany", "Spain"];

// Fixed (not random) so the sky doesn't reshuffle on every render or mismatch
// between server and client hydration.
const STARFIELD = [
  { x: 6, y: 8, size: 2, opacity: 0.8 },
  { x: 20, y: 4, size: 1.5, opacity: 0.55 },
  { x: 33, y: 16, size: 2, opacity: 0.45 },
  { x: 46, y: 6, size: 1.5, opacity: 0.65 },
  { x: 58, y: 14, size: 2, opacity: 0.4 },
  { x: 70, y: 5, size: 1.5, opacity: 0.6 },
  { x: 86, y: 18, size: 2, opacity: 0.5 },
  { x: 13, y: 27, size: 1.5, opacity: 0.4 },
  { x: 53, y: 25, size: 1, opacity: 0.5 },
  { x: 92, y: 8, size: 1.5, opacity: 0.6 },
  { x: 3, y: 20, size: 1, opacity: 0.45 },
  { x: 79, y: 30, size: 1, opacity: 0.35 },
];

// Quadratic Bezier point + tangent angle, in percentage coordinates (0-100).
function pointOnCurve(t: number, p0: [number, number], p1: [number, number], p2: [number, number]) {
  const x = (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t ** 2 * p2[0];
  const y = (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t ** 2 * p2[1];
  const dx = 2 * (1 - t) * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0]);
  const dy = 2 * (1 - t) * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1]);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  return { x, y, angle };
}

export default function FlightProgress() {
  const { t, lang } = useLanguage();
  const { profile } = useAuth();
  const { progressPercent, country } = useDashboardProgress();

  const originCode = profile?.citizenship ?? null;
  const destCode = COUNTRY_FLAG_CODE[country] ?? "pl";
  const destIndex = COUNTRY_ORDER.indexOf(country);
  const destName = t.countries.list[destIndex === -1 ? 0 : destIndex]?.name ?? country;
  const originName = originCode ? getCountryName(originCode, lang) : null;

  const FLAG_ORIGIN_POS: [number, number] = [15, 83];
  const FLAG_DEST_POS: [number, number] = [85, 83];

  // P0/P2 are the flag positions themselves so the path always starts and
  // ends exactly at each flag marker — both use the same 0-100 percentage
  // coordinate space as the SVG's viewBox, so they can never drift apart.
  const P0: [number, number] = FLAG_ORIGIN_POS;
  const P1: [number, number] = [50, 12];
  const P2: [number, number] = FLAG_DEST_POS;

  const t01 = Math.min(Math.max(progressPercent / 100, 0.04), 0.96);
  const plane = useMemo(() => pointOnCurve(t01, P0, P1, P2), [t01]);

  const pathD = `M ${P0[0]} ${P0[1]} Q ${P1[0]} ${P1[1]} ${P2[0]} ${P2[1]}`;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border-subtle bg-gradient-to-b from-accent/10 via-surface-1 to-surface-1 p-6 sm:p-8">
      <div
        aria-hidden
        className="animate-blob-drift absolute -top-24 left-1/2 -z-0 h-[320px] w-[520px] -translate-x-1/2 rounded-full bg-accent/20 opacity-60 blur-[100px] motion-reduce:animate-none"
      />
      <div className="relative">
        <p className="text-sm font-semibold text-text-primary">{t.dashboard.home.flightHeading}</p>
        <p className="mt-1 text-xs text-text-muted">{t.dashboard.home.flightSub}</p>

        <div className="relative mt-6 h-[200px] w-full overflow-hidden sm:h-[260px]">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {STARFIELD.map((star, index) => (
              <span
                key={index}
                className="absolute rounded-full bg-white"
                style={{ left: `${star.x}%`, top: `${star.y}%`, width: `${star.size}px`, height: `${star.size}px`, opacity: star.opacity }}
              />
            ))}
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[58%] h-[340px] w-[340px] -translate-x-1/2 overflow-hidden rounded-full sm:top-[62%] sm:h-[620px] sm:w-[620px]"
            style={{ boxShadow: "0 0 40px 14px rgba(96,165,250,0.28), 0 0 90px 30px rgba(59,130,246,0.14)" }}
          >
            <Image
              src="/images/earth.jpg"
              alt=""
              fill
              sizes="(max-width: 640px) 340px, 620px"
              className="object-cover"
              style={{ objectPosition: "center 35%" }}
            />
            <div aria-hidden className="absolute inset-0" style={{ background: "var(--accent)", mixBlendMode: "color", opacity: 0.35 }} />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 20%, rgba(10,20,40,0.15), rgba(4,8,20,0.55) 55%, rgba(2,4,12,0.85) 100%)",
              }}
            />
          </div>

          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d={pathD} fill="none" stroke="var(--border-strong)" strokeWidth="0.6" strokeDasharray="2 2" />
            <path
              d={pathD}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="0.8"
              strokeDasharray={`${t01 * 130} 200`}
              strokeLinecap="round"
              style={{ transition: "stroke-dasharray 2000ms var(--ease-out-strong)" }}
            />
          </svg>

          <div
            className="absolute flex flex-col items-center gap-1"
            style={{ left: `${FLAG_ORIGIN_POS[0]}%`, top: `${FLAG_ORIGIN_POS[1]}%`, transform: "translate(-50%, -50%)" }}
          >
            {originCode && (
              <Image src={getFlagUrl(originCode, "md")} alt={originName ?? ""} width={36} height={27} className="rounded-md shadow-lg" unoptimized />
            )}
            <span className="whitespace-nowrap rounded-full bg-panel/90 px-2 py-0.5 text-[10px] font-medium text-text-muted">{originName}</span>
          </div>

          <div
            className="absolute flex flex-col items-center gap-1"
            style={{ left: `${FLAG_DEST_POS[0]}%`, top: `${FLAG_DEST_POS[1]}%`, transform: "translate(-50%, -50%)" }}
          >
            <Image src={getFlagUrl(destCode, "md")} alt={destName} width={36} height={27} className="rounded-md shadow-lg" unoptimized />
            <span className="whitespace-nowrap rounded-full bg-panel/90 px-2 py-0.5 text-[10px] font-medium text-text-muted">{destName}</span>
          </div>

          <div
            className="absolute transition-[left,top] duration-[2000ms] ease-[var(--ease-out-strong)]"
            style={{
              left: `${plane.x}%`,
              top: `${plane.y}%`,
              transform: `translate(-50%, -50%) rotate(${plane.angle + 90}deg)`,
            }}
          >
            <svg
              className="h-9 w-9 text-accent-bright drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2.5 1.5V22l4-1 4 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
          </div>
        </div>

        <p className="mt-2 text-center text-sm font-semibold text-accent-bright">{progressPercent}%</p>
      </div>
    </div>
  );
}
