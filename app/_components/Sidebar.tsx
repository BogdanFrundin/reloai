"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { useAuth } from "./AuthProvider";
import LogoutConfirmModal from "./LogoutConfirmModal";
import { PROFILE_ICON, SETTINGS_ICON, LOGOUT_ICON } from "./AccountIcons";
import { NAV_ICONS, OTHER_SERVICES_ICON, CHEVRON_ICON, MAIN_ORDER, OTHER_ORDER, NAV_HREFS as HREFS } from "./NavIcons";

export default function Sidebar({
  open = false,
  onClose,
}: {
  open?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();
  const { signOut } = useAuth();
  const s = t.sidebar;

  const isOtherActive = OTHER_ORDER.some((key) => pathname === HREFS[key]);
  const [otherOpen, setOtherOpen] = useState(isOtherActive);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

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
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-shrink-0 flex-col border-r border-border-subtle bg-panel backdrop-blur-xl transition-transform duration-300 ease-[var(--ease-out-strong)] lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:translate-x-0 lg:self-start lg:bg-panel/40 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link href="/dashboard" onClick={onClose} className="flex items-center gap-2 px-6 py-5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-bright text-sm font-bold text-white">
            R
          </span>
          <span className="text-sm font-semibold tracking-tight text-text-primary">ReloAI</span>
        </Link>

        {/* Main navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
          {MAIN_ORDER.map((key) => {
            const href = HREFS[key];
            const isActive = pathname === href;

            return (
              <Link
                key={key}
                href={href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl border-l-2 px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? "border-accent-bright bg-accent/20 text-accent-bright shadow-[inset_0_0_0_1px_rgba(91,141,239,0.25)]"
                    : "border-transparent text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                }`}
              >
                {NAV_ICONS[key]}
                <span>{s[key]}</span>
              </Link>
            );
          })}

          <div>
            <button
              type="button"
              onClick={() => setOtherOpen((prev) => !prev)}
              aria-expanded={otherOpen}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                isOtherActive
                  ? "bg-accent/10 text-accent-bright"
                  : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
              }`}
            >
              {OTHER_SERVICES_ICON}
              <span className="flex-1 text-left">{s.otherServices}</span>
              <span className={`transition-transform duration-150 ${otherOpen ? "rotate-180" : ""}`}>
                {CHEVRON_ICON}
              </span>
            </button>

            {otherOpen && (
              <div className="mt-1 space-y-1 border-l border-border-subtle pl-4">
                {OTHER_ORDER.map((key) => {
                  const href = HREFS[key];
                  const isActive = pathname === href;

                  return (
                    <Link
                      key={key}
                      href={href}
                      onClick={onClose}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-150 ${
                        isActive
                          ? "bg-accent/10 text-accent-bright"
                          : "text-text-muted hover:bg-surface-hover hover:text-text-primary"
                      }`}
                    >
                      {NAV_ICONS[key]}
                      <span>{s[key]}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* User actions */}
        <div className="space-y-1 border-t border-border-subtle p-3">
          <Link
            href="/profile"
            onClick={onClose}
            className={`flex items-center justify-center gap-3 rounded-xl border-l-2 px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
              pathname === "/profile"
                ? "border-accent-bright bg-accent/20 text-accent-bright shadow-[inset_0_0_0_1px_rgba(91,141,239,0.25)]"
                : "border-transparent text-text-secondary hover:bg-surface-hover hover:text-text-primary"
            }`}
          >
            {PROFILE_ICON}
            <span>{s.profile}</span>
          </Link>
          <Link
            href="/profile"
            onClick={onClose}
            className="flex items-center justify-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors duration-150 hover:bg-surface-hover hover:text-text-primary"
          >
            {SETTINGS_ICON}
            <span>{s.settings}</span>
          </Link>
          <button
            type="button"
            onClick={() => setLogoutConfirmOpen(true)}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-text-secondary transition-colors duration-150 hover:bg-surface-hover hover:text-text-primary"
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
