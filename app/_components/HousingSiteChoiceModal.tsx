"use client";

import type { ReactElement } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "./LanguageProvider";
import { pressScale } from "../_lib/motion";
import { buildOlxUrl, buildOtodomUrl, buildGratkaUrl } from "../_lib/housingSearchLinks";

// Small brand-colored marks for each listing site. Not the sites' official
// logo files (we don't have a way to pull real brand assets in here) — each
// is a simple wordmark/icon badge in that brand's recognizable color, just
// enough to make the picker feel less like a plain text list.
function OlxMark() {
  return (
    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#002f34]">
      <span className="text-[11px] font-extrabold tracking-tight text-[#e8fd53]">OLX</span>
    </span>
  );
}

function OtodomMark() {
  return (
    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff7a3d] to-[#ff4d6d]">
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
        <path d="M12 3.2 2.5 10.8v9.6h6.2v-6.1h6.6v6.1h6.2v-9.6L12 3.2z" />
      </svg>
    </span>
  );
}

function GratkaMark() {
  return (
    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#0a5cd8]">
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
        <path d="M12 2 2 8.5V21h6v-6.5h8V21h6V8.5L12 2z" />
      </svg>
    </span>
  );
}

const SITE_MARK: Record<string, () => ReactElement> = {
  olx: OlxMark,
  otodom: OtodomMark,
  gratka: GratkaMark,
};

export default function HousingSiteChoiceModal({
  open,
  onClose,
  city,
  district,
  rooms,
}: {
  open: boolean;
  onClose: () => void;
  city: string;
  district: string;
  rooms: "any" | "studio" | "2room" | "3room";
}) {
  const { t } = useLanguage();

  // `open` only ever becomes true from a client-side click after hydration,
  // so document.body is always available here — no mount-detection needed.
  if (!open) return null;

  const sites = [
    {
      key: "olx",
      name: "OLX",
      description: "фильтр по городу, району и комнатам",
      href: buildOlxUrl(city, district, rooms === "any" ? undefined : rooms),
    },
    {
      key: "otodom",
      name: "Otodom",
      description: "фильтр по городу",
      href: buildOtodomUrl(city),
    },
    {
      key: "gratka",
      name: "Gratka",
      description: "общий список",
      href: buildGratkaUrl(),
    },
  ];

  function handlePick(href: string) {
    window.open(href, "_blank", "noopener,noreferrer");
    onClose();
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-[opacity] duration-150 ease-[var(--ease-out-strong)] starting:opacity-0"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-sm rounded-2xl border border-border-subtle bg-panel p-6 shadow-2xl shadow-black/40 transition-[opacity,transform] duration-150 ease-[var(--ease-out-strong)] starting:opacity-0 starting:scale-95"
      >
        <h2 className="text-lg font-bold text-text-primary">Где искать?</h2>
        <p className="mt-1 text-sm text-text-muted">
          Выберите сайт — откроется в новой вкладке с уже применёнными фильтрами.
        </p>

        <div className="mt-5 space-y-2">
          {sites.map((site) => {
            const Mark = SITE_MARK[site.key];
            return (
              <button
                key={site.key}
                type="button"
                onClick={() => handlePick(site.href)}
                className={`flex w-full items-center gap-3 rounded-xl border border-border-strong bg-surface-1 px-4 py-3 text-left transition-colors duration-150 hover:border-accent/40 hover:bg-surface-hover ${pressScale}`}
              >
                <Mark />
                <span className="min-w-0 flex-1 text-sm">
                  <span className="font-semibold text-text-primary">{site.name}</span>
                  <span className="text-text-muted"> — {site.description}</span>
                </span>
                <span aria-hidden className="flex-shrink-0 text-accent-bright">
                  →
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onClose}
          className={`mt-4 w-full rounded-full border border-border-strong bg-surface-1 px-5 py-2.5 text-sm font-semibold text-text-secondary transition-colors duration-150 hover:border-border-strong hover:text-text-primary ${pressScale}`}
        >
          {t.common.cancelBtn}
        </button>
      </div>
    </div>,
    document.body,
  );
}
