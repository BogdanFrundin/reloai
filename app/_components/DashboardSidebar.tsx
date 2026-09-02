"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { useAuth } from "./AuthProvider";
import { useDashboardProgress } from "./DashboardProgressProvider";
import LogoutConfirmModal from "./LogoutConfirmModal";
import { PROFILE_ICON, SETTINGS_ICON, LOGOUT_ICON } from "./AccountIcons";
import { NAV_ICONS, type MainKey, type OtherKey } from "./NavIcons";
import { getFlagUrl } from "../_lib/flags";
import { pressScale } from "../_lib/motion";

const ICON_PROPS = {
  className: "h-5 w-5",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: 1.75,
} as const;

const HOME_ICON = (
  <svg {...ICON_PROPS}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.5 1.5 0 012.122 0L22.28 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
);

const BACK_ARROW_ICON = (
  <svg {...ICON_PROPS}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

const ROADMAP_ICON = (
  <svg {...ICON_PROPS}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
);

const AI_ASSISTANT_ICON = (
  <svg {...ICON_PROPS}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.5V4m6 2.5V4M6 9.5h12a1.5 1.5 0 011.5 1.5v7a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18v-7A1.5 1.5 0 016 9.5zM9 14v.01M15 14v.01M9.5 17.5h5" />
    <circle cx="12" cy="4" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const SERVICES_ORDER: (MainKey | OtherKey)[] = ["banks", "medicine", "insurance", "housing", "work", "community", "education"];

const SERVICE_HREFS: Record<MainKey | OtherKey, string> = {
  documents: "/documents",
  housing: "/housing",
  banks: "/banks",
  medicine: "/medicine",
  insurance: "/insurance",
  work: "/work",
  community: "/community",
  education: "/education",
};

const COUNTRY_INDEX: Record<string, number> = { Poland: 0, Germany: 1, Spain: 2 };
const COUNTRY_FLAG_CODE: Record<string, string> = { Poland: "pl", Germany: "de", Spain: "es" };

export default function DashboardSidebar({
  open = false,
  onClose,
}: {
  open?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();
  const { user, profile, signOut } = useAuth();
  const { country } = useDashboardProgress();
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  const d = t.dashboard.sidebar;
  const s = t.sidebar;
  const countryEntry = t.countries.list[COUNTRY_INDEX[country] ?? 0];
  const profileName = profile?.name?.trim() || user?.email?.trim() || s.profile;

  async function confirmLogOut() {
    setLogoutConfirmOpen(false);
    onClose?.();
    await signOut();
    router.push("/login");
  }

  return (
    <>
      {open && (
        <div
          aria-hidden
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ease-[var(--ease-out-strong)] starting:opacity-0 lg:hidden"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-shrink-0 flex-col border-r border-border-subtle bg-panel backdrop-blur-xl transition-transform duration-300 ease-[var(--ease-out-strong)] lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:w-[220px] lg:translate-x-0 lg:self-start lg:bg-panel/40 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-5 py-4">
          <div className="flex items-center justify-between gap-2">
            <Link href="/home" onClick={onClose} className="flex min-w-0 items-center gap-2">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-bright text-sm font-bold text-white">
                R
              </span>
              <span className="truncate text-sm font-semibold tracking-tight text-text-primary">ReloAI</span>
            </Link>
            <Link
              href="/"
              onClick={onClose}
              aria-label={d.landingLinkAria}
              className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-surface-1 text-text-secondary transition-colors duration-150 hover:border-border-strong hover:bg-surface-hover hover:text-text-primary ${pressScale}`}
            >
              {BACK_ARROW_ICON}
            </Link>
          </div>
          <p className="mt-1.5 text-xs text-text-muted">{d.tagline}</p>

          {countryEntry && (
            <div className="mt-2.5 flex items-center gap-2 rounded-xl border border-border-subtle bg-surface-1 px-3 py-1.5">
              <Image
                src={getFlagUrl(COUNTRY_FLAG_CODE[country] ?? "pl", "sm")}
                alt={countryEntry.name}
                width={24}
                height={18}
                className="rounded-sm"
                unoptimized
              />
              <span className="text-sm font-medium text-text-primary">{countryEntry.name}</span>
            </div>
          )}
        </div>

        <nav className="scrollbar-hide flex-1 space-y-3 overflow-y-auto px-3 py-1.5">
          <div className="border-b border-border-subtle pb-1.5">
            <Link
              href="/home"
              onClick={onClose}
              className={`flex items-center gap-3 rounded-xl border-l-2 px-3 py-2 text-[13px] font-medium transition-colors duration-150 ${
                pathname === "/home"
                  ? "border-accent-bright bg-accent/20 text-accent-bright shadow-[inset_0_0_0_1px_rgba(91,141,239,0.25)]"
                  : "border-transparent text-text-secondary hover:bg-surface-hover hover:text-text-primary"
              }`}
            >
              {HOME_ICON}
              <span>{d.home}</span>
            </Link>
          </div>

          <div>
            <p className="px-3 text-[11px] font-semibold tracking-wider text-text-muted">{d.myPlanSection}</p>
            <div className="mt-1 space-y-1">
              <Link
                href="/dashboard"
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl border-l-2 px-3 py-2 text-[13px] font-medium transition-colors duration-150 ${
                  pathname === "/dashboard"
                    ? "border-accent-bright bg-accent/20 text-accent-bright shadow-[inset_0_0_0_1px_rgba(91,141,239,0.25)]"
                    : "border-transparent text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                }`}
              >
                {ROADMAP_ICON}
                <span>{d.roadmap}</span>
              </Link>
              <Link
                href="/dashboard/ai"
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl border-l-2 px-3 py-2 text-[13px] font-medium transition-colors duration-150 ${
                  pathname === "/dashboard/ai"
                    ? "border-accent-bright bg-accent/20 text-accent-bright shadow-[inset_0_0_0_1px_rgba(91,141,239,0.25)]"
                    : "border-transparent text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                }`}
              >
                {AI_ASSISTANT_ICON}
                <span>{d.aiAssistant}</span>
              </Link>
              <Link
                href="/documents"
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl border-l-2 px-3 py-2 text-[13px] font-medium transition-colors duration-150 ${
                  pathname === "/documents"
                    ? "border-accent-bright bg-accent/20 text-accent-bright shadow-[inset_0_0_0_1px_rgba(91,141,239,0.25)]"
                    : "border-transparent text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                }`}
              >
                {NAV_ICONS.documents}
                <span>{s.documents}</span>
              </Link>
            </div>
          </div>

          <div>
            <p className="px-3 text-[11px] font-semibold tracking-wider text-text-muted">{d.servicesSection}</p>
            <div className="mt-1 space-y-1">
              {SERVICES_ORDER.map((key) => {
                const href = SERVICE_HREFS[key];
                const isActive = pathname === href;

                return (
                  <Link
                    key={key}
                    href={href}
                    onClick={onClose}
                    className={`flex items-center gap-3 rounded-xl px-3 py-1.5 text-[13px] font-medium transition-colors duration-150 ${
                      isActive ? "bg-accent/10 text-accent-bright" : "text-text-muted hover:bg-surface-hover hover:text-text-primary"
                    }`}
                  >
                    {NAV_ICONS[key]}
                    <span>{s[key]}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        <div className="space-y-0.5 border-t border-border-subtle p-2">
          <Link
            href="/profile"
            onClick={onClose}
            className={`flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium transition-colors duration-150 ${
              pathname === "/profile"
                ? "bg-accent/20 text-accent-bright shadow-[inset_0_0_0_1px_rgba(91,141,239,0.25)]"
                : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
            }`}
          >
            {PROFILE_ICON}
            <span className="truncate">{profileName}</span>
          </Link>
          <Link
            href="/settings"
            onClick={onClose}
            className={`flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium transition-colors duration-150 ${
              pathname === "/settings"
                ? "bg-accent/20 text-accent-bright shadow-[inset_0_0_0_1px_rgba(91,141,239,0.25)]"
                : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
            }`}
          >
            {SETTINGS_ICON}
            <span>{s.settings}</span>
          </Link>
          <button
            type="button"
            onClick={() => setLogoutConfirmOpen(true)}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-[13px] font-medium text-text-secondary transition-colors duration-150 hover:bg-surface-hover hover:text-text-primary"
          >
            {LOGOUT_ICON}
            <span>{s.logout}</span>
          </button>
        </div>
      </aside>

      <LogoutConfirmModal
        open={logoutConfirmOpen}
        onClose={() => setLogoutConfirmOpen(false)}
        onConfirm={confirmLogOut}
      />
    </>
  );
}
