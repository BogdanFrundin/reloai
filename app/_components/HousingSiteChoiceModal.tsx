"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useLanguage } from "./LanguageProvider";
import { pressScale } from "../_lib/motion";
import { buildOlxUrl, buildOtodomUrl, buildGratkaUrl } from "../_lib/housingSearchLinks";

// Real brand logos, cropped from files the user provided, saved under
// public/images/housing-sites/. Otodom's is its square icon mark (not the
// full wordmark) since the wordmark itself is too wide to read at this size.
const SITE_LOGO: Record<string, string> = {
  olx: "/images/housing-sites/olx.png",
  otodom: "/images/housing-sites/otodom.png",
  gratka: "/images/housing-sites/gratka.png",
};

function SiteLogo({ site, name }: { site: string; name: string }) {
  return (
    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl">
      <Image src={SITE_LOGO[site]} alt={name} width={44} height={44} className="h-full w-full object-cover" />
    </span>
  );
}

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
          {sites.map((site) => (
            <button
              key={site.key}
              type="button"
              onClick={() => handlePick(site.href)}
              className={`flex w-full items-center gap-3 rounded-xl border border-border-strong bg-surface-1 px-4 py-3 text-left transition-colors duration-150 hover:border-accent/40 hover:bg-surface-hover ${pressScale}`}
            >
              <SiteLogo site={site.key} name={site.name} />
              <span className="min-w-0 flex-1 text-sm">
                <span className="font-semibold text-text-primary">{site.name}</span>
                <span className="text-text-muted"> — {site.description}</span>
              </span>
              <span aria-hidden className="flex-shrink-0 text-accent-bright">
                →
              </span>
            </button>
          ))}
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
