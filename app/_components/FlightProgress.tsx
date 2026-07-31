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

  const P0: [number, number] = [10, 72];
  const P1: [number, number] = [50, 8];
  const P2: [number, number] = [90, 28];

  // Where the flags sit on the visible globe surface — independent of the
  // path/plane curve above, which keeps its own P0/P1/P2 untouched.
  const FLAG_ORIGIN_POS: [number, number] = [15, 83];
  const FLAG_DEST_POS: [number, number] = [85, 83];

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

        <div className="relative mt-6 h-[180px] w-full overflow-hidden sm:h-[220px]">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[42%] h-[400px] w-[400px] -translate-x-1/2 overflow-hidden rounded-full sm:top-[48%] sm:h-[760px] sm:w-[760px]"
            style={{ boxShadow: "0 0 40px 14px rgba(96,165,250,0.4), 0 0 90px 30px rgba(59,130,246,0.2)" }}
          >
            <Image
              src="/images/earth.jpg"
              alt=""
              fill
              sizes="(max-width: 640px) 400px, 760px"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 12%, rgba(0,0,0,0.1), rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.8) 100%)",
              }}
            />
          </div>

          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 80" preserveAspectRatio="none">
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
              transform: "translate(-50%, -50%)",
            }}
          >
            <svg
              className="h-8 w-14 text-accent-bright drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]"
              fill="currentColor"
              viewBox="0 0 120 60"
            >
              <path d="M8 24C8 18 14 15 26 15L75 15C85 15 92 18 97 24C92 30 85 33 75 33L26 33C14 33 8 30 8 24Z" />
              <path d="M12 15L28 15L20 2Z" />
              <path d="M45 33L85 33L66 44Z" />
              <ellipse cx="60" cy="39" rx="5" ry="2.5" />
            </svg>
          </div>
        </div>

        <p className="mt-2 text-center text-sm font-semibold text-accent-bright">{progressPercent}%</p>
      </div>
    </div>
  );
}
