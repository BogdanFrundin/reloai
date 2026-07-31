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
            style={{
              boxShadow: "0 0 40px 14px rgba(96,165,250,0.4), 0 0 90px 30px rgba(59,130,246,0.2)",
              background:
                "radial-gradient(circle at 26% 4%, rgba(255,255,255,0.65), transparent 16%), " +
                "radial-gradient(circle at 85% 96%, rgba(0,0,0,0.5), transparent 40%), " +
                "radial-gradient(circle at 30% 6%, #3d5c3a 0%, transparent 7%), " +
                "radial-gradient(circle at 56% 9%, #6b5b3e 0%, transparent 6%), " +
                "radial-gradient(circle at 44% 12%, #3d5c3a 0%, transparent 6%), " +
                "radial-gradient(circle at 18% 10%, #6b5b3e 0%, transparent 5%), " +
                "radial-gradient(circle at 70% 5%, #3d5c3a 0%, transparent 6%), " +
                "radial-gradient(circle at 50% 10%, #2f6ba3 0%, #0a3d62 40%)",
            }}
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(circle at 28% 4%, rgba(255,255,255,0.4), transparent 14%), " +
                  "radial-gradient(circle at 60% 8%, rgba(255,255,255,0.25), transparent 15%), " +
                  "radial-gradient(circle at 42% 12%, rgba(220,235,255,0.3), transparent 12%)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E\")",
                backgroundSize: "300px 300px",
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
            className="absolute flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_0_24px_-4px_var(--accent)] transition-[left,top] duration-[2000ms] ease-[var(--ease-out-strong)]"
            style={{
              left: `${plane.x}%`,
              top: `${plane.y}%`,
              transform: `translate(-50%, -50%) rotate(${plane.angle}deg)`,
              perspective: "800px",
            }}
          >
            <div className="animate-plane-barrel-roll motion-reduce:animate-none" style={{ transformStyle: "preserve-3d" }}>
              <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
              </svg>
            </div>
          </div>
        </div>

        <p className="mt-2 text-center text-sm font-semibold text-accent-bright">{progressPercent}%</p>
      </div>
    </div>
  );
}
