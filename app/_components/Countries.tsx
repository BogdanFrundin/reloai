"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type MouseEvent } from "react";
import Reveal from "./Reveal";
import { useCtaHref } from "../_lib/useCtaHref";
import { getFlagUrl } from "../_lib/flags";

interface CardDef {
  flagCode: string;
  name: string;
  subtitle: string;
  accent: [number, number, number];
  bg: string;
  floatDelay: string;
  floatDuration: string;
  comingSoon?: boolean;
}

const CARDS: CardDef[] = [
  {
    flagCode: "pl",
    name: "Польша",
    subtitle: "Стабильная Европа для старта",
    accent: [200, 140, 50],
    bg: [
      "radial-gradient(ellipse at 38% 12%, rgba(200,140,50,0.24) 0%, transparent 58%)",
      "radial-gradient(ellipse at 78% 78%, rgba(120,70,18,0.3) 0%, transparent 52%)",
      "radial-gradient(ellipse at 10% 90%, rgba(80,40,8,0.2) 0%, transparent 45%)",
      "linear-gradient(155deg, #1d1306 0%, #0f0d07 42%, #09090f 100%)",
    ].join(", "),
    floatDelay: "0s",
    floatDuration: "6s",
  },
  {
    flagCode: "de",
    name: "Германия",
    subtitle: "Blue Card и карьера в IT",
    accent: [33, 85, 212],
    bg: [
      "radial-gradient(ellipse at 50% 18%, rgba(30,80,200,0.3) 0%, transparent 55%)",
      "radial-gradient(ellipse at 15% 75%, rgba(10,30,100,0.22) 0%, transparent 48%)",
      "radial-gradient(ellipse at 85% 85%, rgba(20,50,140,0.18) 0%, transparent 45%)",
      "linear-gradient(155deg, #0b0f1e 0%, #07091500 40%, #05050c 100%)",
    ].join(", "),
    floatDelay: "2s",
    floatDuration: "7.5s",
    comingSoon: true,
  },
  {
    flagCode: "es",
    name: "Испания",
    subtitle: "Море, солнце и Digital Nomad",
    accent: [220, 88, 28],
    bg: [
      "radial-gradient(ellipse at 62% 8%, rgba(220,80,28,0.3) 0%, transparent 55%)",
      "radial-gradient(ellipse at 28% 78%, rgba(150,45,10,0.24) 0%, transparent 50%)",
      "radial-gradient(ellipse at 88% 40%, rgba(180,60,18,0.16) 0%, transparent 42%)",
      "linear-gradient(155deg, #1a0a07 0%, #110806 42%, #09090f 100%)",
    ].join(", "),
    floatDelay: "4s",
    floatDuration: "9s",
    comingSoon: true,
  },
];

export default function Countries() {
  const [tilts, setTilts] = useState(() => CARDS.map(() => ({ x: 0, y: 0 })));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPointerFine, setIsPointerFine] = useState(false);
  const ctaHref = useCtaHref();

  useEffect(() => {
    setIsPointerFine(window.matchMedia("(pointer: fine)").matches);
  }, []);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>, index: number) {
    if (!isPointerFine) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    setTilts((prev) => {
      const next = [...prev];
      next[index] = { x: cy * -15, y: cx * 15 };
      return next;
    });
  }

  function handleMouseEnter(index: number) {
    if (!isPointerFine) return;
    setHoveredIndex(index);
  }

  function handleMouseLeave(index: number) {
    if (!isPointerFine) return;
    setTilts((prev) => {
      const next = [...prev];
      next[index] = { x: 0, y: 0 };
      return next;
    });
    setHoveredIndex(null);
  }

  return (
    <section
      id="countries"
      className="relative overflow-hidden py-24 lg:py-32"
      style={{
        background:
          "linear-gradient(to bottom, #07080f 0%, #050608 15%, #050608 85%, #07080f 100%)",
      }}
    >
      {/* Ambient background glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -left-32 top-1/4 h-[560px] w-[560px] rounded-full blur-[130px]"
          style={{ background: "radial-gradient(circle, rgba(33,85,212,0.18) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -right-32 bottom-1/3 h-[420px] w-[420px] rounded-full blur-[110px]"
          style={{ background: "radial-gradient(circle, rgba(91,141,239,0.14) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent-bright/60">
            Направления
          </p>
          <h2
            className="mt-5 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
            style={{ textShadow: "0 0 55px rgba(33,85,212,0.65), 0 0 110px rgba(33,85,212,0.28)" }}
          >
            Куда вы переезжаете?
          </h2>
          <p className="mt-5 text-base text-slate-500">
            Персональный план для вашей страны — за секунды.
          </p>
        </Reveal>

        {/* Cards */}
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {CARDS.map((card, index) => {
            const [r, g, b] = card.accent;
            const tilt = tilts[index];
            const isHovered = hoveredIndex === index;

            return (
              <Reveal key={card.name} delay={index * 130}>
                {/* Float wrapper — disabled on coarse-pointer via CSS */}
                <div
                  className="animate-card-float"
                  style={{ animationDelay: card.floatDelay, animationDuration: card.floatDuration }}
                >
                  {/* Card */}
                  <div
                    onMouseMove={(e) => handleMouseMove(e, index)}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                    className={`relative isolate h-[460px] cursor-pointer overflow-hidden rounded-2xl${isPointerFine ? " will-change-transform" : ""}`}
                    style={{
                      background: card.bg,
                      // Tilt transform: desktop (pointer: fine) only
                      ...(isPointerFine
                        ? {
                            transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                            transition: isHovered
                              ? "transform 0.08s ease-out, box-shadow 0.35s ease-out"
                              : "transform 0.65s var(--ease-out-strong), box-shadow 0.45s ease-out",
                          }
                        : {}),
                      boxShadow: isHovered
                        ? `0 0 0 1.5px rgba(${r},${g},${b},0.75), 0 0 50px rgba(${r},${g},${b},0.35), 0 0 100px rgba(${r},${g},${b},0.14), 0 32px 64px rgba(0,0,0,0.72)`
                        : "0 0 0 1px rgba(255,255,255,0.07), 0 20px 50px rgba(0,0,0,0.52)",
                    }}
                  >
                    {/* Film-grain noise texture */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-[0.04]"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E\")",
                        backgroundSize: "300px 300px",
                      }}
                    />

                    {/* Top gradient — darkens behind flag + text */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 h-3/5"
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.38) 55%, transparent 100%)",
                      }}
                    />

                    {/* Bottom gradient — darkens behind button */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5"
                      style={{
                        background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, transparent 100%)",
                      }}
                    />

                    {/* Hover radial inner glow — desktop only */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        opacity: isHovered ? 1 : 0,
                        transition: "opacity 0.4s ease-out",
                        background: `radial-gradient(ellipse at 50% 20%, rgba(${r},${g},${b},0.16) 0%, transparent 65%)`,
                      }}
                    />

                    {/* Coming soon — grey overlay tint on the background art */}
                    {card.comingSoon && (
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0"
                        style={{ background: "rgba(10,10,14,0.4)", backdropFilter: "grayscale(0.6)" }}
                      />
                    )}

                    {/* Coming soon — badge */}
                    {card.comingSoon && (
                      <span className="absolute right-5 top-5 z-10 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-[11px] font-semibold text-slate-300 backdrop-blur-md">
                        Скоро будет доступно
                      </span>
                    )}

                    {/* Card content */}
                    <div className="absolute inset-0 flex flex-col p-7 sm:p-8">
                      {/* Flag — large, static */}
                      <div
                        style={{
                          display: "inline-block",
                          filter: `drop-shadow(0 6px 28px rgba(${r},${g},${b},0.7))`,
                          width: "fit-content",
                        }}
                      >
                        <Image
                          src={getFlagUrl(card.flagCode, "lg")}
                          alt={card.name}
                          width={64}
                          height={48}
                          className="rounded-lg"
                          unoptimized
                        />
                      </div>

                      {/* Country name */}
                      <h3
                        className="mt-5 text-3xl font-bold tracking-tight text-white"
                        style={{
                          textShadow: isHovered ? `0 0 28px rgba(${r},${g},${b},0.5)` : "none",
                          transition: "text-shadow 0.4s ease-out",
                        }}
                      >
                        {card.name}
                      </h3>

                      {/* One-line description */}
                      <p className="mt-2 text-sm font-medium leading-relaxed text-slate-400">
                        {card.subtitle}
                      </p>

                      {/* Spacer */}
                      <div className="flex-1" />

                      {/* CTA — always visible */}
                      <Link
                        href={ctaHref}
                        className="inline-flex w-fit items-center gap-2.5 rounded-full text-sm font-semibold text-white"
                        style={{
                          padding: "10px 22px",
                          background: `rgba(${r},${g},${b},0.2)`,
                          border: `1px solid rgba(${r},${g},${b},0.45)`,
                          backdropFilter: "blur(12px)",
                          boxShadow: `0 0 24px rgba(${r},${g},${b},0.22)`,
                        }}
                      >
                        Начать
                        <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
