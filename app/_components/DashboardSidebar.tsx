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

const ICON_PROPS = {
  className: "h-5 w-5",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: 1.75,
} as const;

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

const SERVICES_ORDER: (MainKey | OtherKey)[] = ["banks", "medicine", "insurance", "housing", "work", "education"];

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
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-shrink-0 flex-col border-r border-white/10 bg-[#0a0a0c] backdrop-blur-xl transition-transform duration-300 ease-[var(--ease-out-strong)] lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:w-[220px] lg:translate-x-0 lg:self-start lg:bg-black/40 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-5 py-4">
          <Link href="/dashboard" onClick={onClose} className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-bright text-sm font-bold text-white">
              R
            </span>
            <span className="text-sm font-semibold tracking-tight text-white">ReloAI</span>
          </Link>
          <p className="mt-1.5 text-xs text-slate-500">{d.tagline}</p>

          {countryEntry && (
            <div className="mt-2.5 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5">
              <Image
                src={getFlagUrl(COUNTRY_FLAG_CODE[country] ?? "pl", "sm")}
                alt={countryEntry.name}
                width={24}
                height={18}
                className="rounded-sm"
                unoptimized
              />
              <span className="text-sm font-medium text-white">{countryEntry.name}</span>
            </div>
          )}
        </div>

        <nav className="scrollbar-hide flex-1 space-y-3 overflow-y-auto px-3 py-1.5">
          <div>
            <p className="px-3 text-[11px] font-semibold tracking-wider text-slate-500">{d.myPlanSection}</p>
            <div className="mt-1 space-y-1">
              <Link
                href="/dashboard"
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl border-l-2 px-3 py-2 text-[13px] font-medium transition-colors duration-150 ${
                  pathname === "/dashboard"
                    ? "border-accent-bright bg-accent/20 text-white shadow-[inset_0_0_0_1px_rgba(91,141,239,0.25)]"
                    : "border-transparent text-slate-300 hover:bg-white/5 hover:text-white"
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
                    ? "border-accent-bright bg-accent/20 text-white shadow-[inset_0_0_0_1px_rgba(91,141,239,0.25)]"
                    : "border-transparent text-slate-300 hover:bg-white/5 hover:text-white"
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
                    ? "border-accent-bright bg-accent/20 text-white shadow-[inset_0_0_0_1px_rgba(91,141,239,0.25)]"
                    : "border-transparent text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {NAV_ICONS.documents}
                <span>{s.documents}</span>
              </Link>
            </div>
          </div>

          <div>
            <p className="px-3 text-[11px] font-semibold tracking-wider text-slate-500">{d.servicesSection}</p>
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
                      isActive ? "bg-accent/10 text-accent-bright" : "text-slate-400 hover:bg-white/5 hover:text-white"
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

        <div className="space-y-0.5 border-t border-white/10 p-2">
          <Link
            href="/profile"
            onClick={onClose}
            className={`flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium transition-colors duration-150 ${
              pathname === "/profile"
                ? "bg-accent/20 text-white shadow-[inset_0_0_0_1px_rgba(91,141,239,0.25)]"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
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
                ? "bg-accent/20 text-white shadow-[inset_0_0_0_1px_rgba(91,141,239,0.25)]"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            {SETTINGS_ICON}
            <span>{s.settings}</span>
          </Link>
          <button
            type="button"
            onClick={() => setLogoutConfirmOpen(true)}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-[13px] font-medium text-slate-300 transition-colors duration-150 hover:bg-white/5 hover:text-white"
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
