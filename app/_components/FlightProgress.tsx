"use client";

import Image from "next/image";
import { useId, useMemo } from "react";
import { useAuth } from "./AuthProvider";
import { useDashboardProgress } from "./DashboardProgressProvider";
import { useLanguage } from "./LanguageProvider";
import { getFlagUrl } from "../_lib/flags";
import { getCountryName } from "../_lib/countries";

const COUNTRY_FLAG_CODE: Record<string, string> = { Poland: "pl", Germany: "de", Spain: "es" };
const COUNTRY_ORDER = ["Poland", "Germany", "Spain"];

// Fixed (not random) so the sky doesn't reshuffle on every render or mismatch
// between server and client hydration. Three size/opacity tiers plus a
// handful of "bright" stars that get a subtle twinkle animation.
const STARFIELD = [
  { x: 6, y: 8, size: 1.5, opacity: 0.55 },
  { x: 20, y: 4, size: 1, opacity: 0.4 },
  { x: 27, y: 21, size: 2.5, opacity: 0.9, bright: true },
  { x: 33, y: 16, size: 1, opacity: 0.35 },
  { x: 40, y: 9, size: 1.5, opacity: 0.5 },
  { x: 46, y: 6, size: 1, opacity: 0.45 },
  { x: 52, y: 20, size: 1.5, opacity: 0.4 },
  { x: 58, y: 14, size: 1, opacity: 0.3 },
  { x: 63, y: 26, size: 2.5, opacity: 0.85, bright: true },
  { x: 70, y: 5, size: 1.5, opacity: 0.5 },
  { x: 76, y: 17, size: 1, opacity: 0.35 },
  { x: 86, y: 18, size: 2, opacity: 0.6 },
  { x: 90, y: 9, size: 1, opacity: 0.4 },
  { x: 13, y: 27, size: 1.5, opacity: 0.35 },
  { x: 4, y: 15, size: 2.5, opacity: 0.9, bright: true },
  { x: 53, y: 25, size: 1, opacity: 0.4 },
  { x: 92, y: 24, size: 1.5, opacity: 0.45 },
  { x: 3, y: 20, size: 1, opacity: 0.35 },
  { x: 79, y: 30, size: 1, opacity: 0.3 },
  { x: 24, y: 29, size: 1, opacity: 0.3 },
  { x: 96, y: 4, size: 2.5, opacity: 0.85, bright: true },
];

// Small line-connected clusters, in the same 0-100 percentage space as the
// starfield, giving the sky a couple of intentional focal points instead of
// undifferentiated dust.
const CONSTELLATIONS: Array<{ points: [number, number][] }> = [
  {
    points: [
      [8, 5],
      [13, 2.5],
      [18, 6],
      [15.5, 11],
    ],
  },
  {
    points: [
      [66, 4],
      [72, 8],
      [79, 3.5],
    ],
  },
];

// Rare, staggered shooting stars. Different delay/duration per instance so
// they never feel synchronized; each is mostly invisible and only streaks
// for a beat once per loop.
const SHOOTING_STARS = [
  { x: 10, y: 9, angle: -28, delay: 0, duration: 7.5 },
  { x: 58, y: 4, angle: -32, delay: 3.6, duration: 9 },
  { x: 34, y: 17, angle: -22, delay: 6.4, duration: 8.2 },
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
  const planeGradientId = useId();

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
  const P1: [number, number] = [50, 15];
  const P2: [number, number] = FLAG_DEST_POS;

  // Clamped away from the very ends: 0.08 keeps the plane clear of the
  // origin flag marker at 0% progress (the most common state), 0.96 keeps
  // it clear of the destination marker at 100%.
  const t01 = Math.min(Math.max(progressPercent / 100, 0.08), 0.96);
  const plane = useMemo(() => pointOnCurve(t01, P0, P1, P2), [t01]);

  const pathD = `M ${P0[0]} ${P0[1]} Q ${P1[0]} ${P1[1]} ${P2[0]} ${P2[1]}`;
  // Floor keeps the traveled segment visibly distinct from the dashed
  // remaining segment even right after departure, instead of a near-zero sliver.
  const solidLength = Math.max(t01 * 130, 14);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border-subtle bg-gradient-to-b from-accent/10 via-surface-1 to-surface-1 p-6 sm:p-8">
      <div
        aria-hidden
        className="animate-blob-drift absolute -top-24 left-1/2 -z-0 h-[320px] w-[520px] -translate-x-1/2 rounded-full bg-accent/20 opacity-60 blur-[100px] motion-reduce:animate-none"
      />
      <div className="relative">
        <p className="text-sm font-semibold text-text-primary">{t.dashboard.home.flightHeading}</p>
        <p className="mt-1 text-xs text-text-muted">{t.dashboard.home.flightSub}</p>

        <div
          className="relative mt-6 h-[220px] w-full overflow-hidden sm:h-[260px]"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={t.dashboard.home.flightHeading}
        >
          {/* Sky: scattered stars, a couple of constellations, and rare shooting stars. */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {STARFIELD.map((star, index) => (
              <span
                key={index}
                className={`absolute rounded-full bg-white ${star.bright ? "animate-star-twinkle motion-reduce:animate-none" : ""}`}
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  opacity: star.opacity,
                  animationDelay: star.bright ? `${(star.x % 5) * 0.6}s` : undefined,
                  boxShadow: star.bright ? "0 0 6px 1px rgba(255,255,255,0.55)" : undefined,
                }}
              />
            ))}

            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {CONSTELLATIONS.map((constellation, ci) => (
                <g key={ci}>
                  <polyline
                    points={constellation.points.map(([x, y]) => `${x},${y}`).join(" ")}
                    fill="none"
                    stroke="white"
                    strokeWidth="0.15"
                    strokeOpacity="0.28"
                    vectorEffect="non-scaling-stroke"
                  />
                  {constellation.points.map(([x, y], pi) => (
                    <circle key={pi} cx={x} cy={y} r="0.55" fill="white" opacity="0.75" />
                  ))}
                </g>
              ))}
            </svg>

            {SHOOTING_STARS.map((star, index) => (
              <div
                key={index}
                className="absolute motion-reduce:hidden"
                style={{ left: `${star.x}%`, top: `${star.y}%`, transform: `rotate(${star.angle}deg)` }}
              >
                <span
                  className="animate-shooting-star block h-px w-16 rounded-full bg-gradient-to-r from-transparent via-white/70 to-white"
                  style={{
                    animationDelay: `${star.delay}s`,
                    animationDuration: `${star.duration}s`,
                    boxShadow: "0 0 6px 1px rgba(255,255,255,0.7)",
                  }}
                />
              </div>
            ))}
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[56%] h-[360px] w-[360px] -translate-x-1/2 overflow-hidden rounded-full sm:top-[62%] sm:h-[620px] sm:w-[620px]"
            style={{
              boxShadow:
                "0 24px 60px -20px rgba(2,6,20,0.65), 0 0 60px -8px rgba(120,170,255,0.5), inset 0 0 20px 2px rgba(180,210,255,0.35), inset 0 0 24px rgba(147,197,253,0.12)",
            }}
          >
            <Image
              src="/images/earth-globe.jpg"
              alt=""
              fill
              sizes="(max-width: 640px) 360px, 620px"
              className="object-cover"
              style={{ objectPosition: "48% 40%" }}
            />
            {/* Brand tint — keeps the photo in the product's accent hue rather than raw satellite colors. */}
            <div aria-hidden className="absolute inset-0" style={{ background: "var(--accent)", mixBlendMode: "color", opacity: 0.28 }} />
            {/* Key light, upper-left, echoing the origin side of the composition. */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "radial-gradient(circle at 30% 22%, rgba(255,255,255,0.4), transparent 42%)", mixBlendMode: "screen" }}
            />
            {/* Terminator: a curved day/night falloff radiating from the lit corner, reading as a real sphere rather than a flat diagonal wash. */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: "radial-gradient(circle at 26% 18%, transparent 38%, rgba(3,6,16,0.42) 62%, rgba(2,4,12,0.86) 88%)",
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
              strokeDasharray={`${solidLength} 200`}
              strokeLinecap="round"
              style={{ transition: "stroke-dasharray 2000ms var(--ease-out-strong)" }}
            />
          </svg>

          <div
            className="absolute flex flex-col items-center gap-1"
            style={{ left: `${FLAG_ORIGIN_POS[0]}%`, top: `${FLAG_ORIGIN_POS[1]}%`, transform: "translate(-50%, -50%)" }}
          >
            {originCode ? (
              <Image src={getFlagUrl(originCode, "md")} alt={originName ?? ""} width={36} height={27} className="rounded-md shadow-lg" unoptimized />
            ) : (
              <span
                role="img"
                aria-label={t.dashboard.home.flightOriginPlaceholder}
                className="flex h-[27px] w-9 items-center justify-center rounded-md border border-dashed border-border-strong bg-surface-1/80 shadow-lg"
              >
                <svg className="h-3.5 w-3.5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              </span>
            )}
            <span className="whitespace-nowrap rounded-full bg-panel/90 px-2.5 py-0.5 text-[11px] font-medium text-text-muted">
              {originName ?? t.dashboard.home.flightOriginPlaceholder}
            </span>
          </div>

          <div
            className="absolute flex flex-col items-center gap-1"
            style={{ left: `${FLAG_DEST_POS[0]}%`, top: `${FLAG_DEST_POS[1]}%`, transform: "translate(-50%, -50%)" }}
          >
            <Image src={getFlagUrl(destCode, "md")} alt={destName} width={36} height={27} className="rounded-md shadow-lg" unoptimized />
            <span className="whitespace-nowrap rounded-full bg-panel/90 px-2.5 py-0.5 text-[11px] font-medium text-text-muted">{destName}</span>
          </div>

          <div
            className="absolute transition-[left,top] duration-[2000ms] ease-[var(--ease-out-strong)]"
            style={{
              left: `${plane.x}%`,
              top: `${plane.y}%`,
              transform: `translate(-50%, -50%) rotate(${plane.angle + 90}deg)`,
              filter: "drop-shadow(0 3px 6px rgba(2,6,20,0.5)) drop-shadow(0 0 10px rgba(91,141,239,0.55))",
            }}
          >
            <svg className="h-10 w-10 sm:h-11 sm:w-11" viewBox="0 0 24 24">
              <defs>
                <linearGradient id={planeGradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f2f7ff" />
                  <stop offset="55%" stopColor="var(--accent-bright)" />
                  <stop offset="100%" stopColor="#2f56c4" />
                </linearGradient>
              </defs>
              <path
                fill={`url(#${planeGradientId})`}
                d="M12,1.2 13.15,5.3 13.15,10.3 22.5,15.7 22.5,17.7 13.35,14.6 13.35,19.6 16.5,21.85 16.5,23 12,21.9 7.5,23 7.5,21.85 10.65,19.6 10.65,14.6 1.5,17.7 1.5,15.7 10.85,10.3 10.85,5.3 Z"
              />
            </svg>
          </div>
        </div>

        <p className="mt-2 text-center text-sm font-semibold text-accent-bright">{progressPercent}%</p>
      </div>
    </div>
  );
}
