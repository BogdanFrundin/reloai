"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { useLanguage } from "./LanguageProvider";
import LogoutConfirmModal from "./LogoutConfirmModal";
import { PROFILE_ICON, SETTINGS_ICON, LOGOUT_ICON } from "./AccountIcons";

export default function ProfileAvatar() {
  const { user, profile, signOut } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  if (!user) return null;

  const name = profile?.name?.trim() || user.email?.trim() || "";
  const initial = name.charAt(0).toUpperCase() || "?";
  const avatarUrl = (user.user_metadata as { avatar_url?: string } | undefined)?.avatar_url;

  async function confirmLogOut() {
    setLogoutConfirmOpen(false);
    await signOut();
    router.push("/login");
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={t.topbar.avatarAria}
        aria-expanded={menuOpen}
        aria-haspopup="menu"
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-accent to-accent-bright text-sm font-bold text-white transition-[transform,box-shadow] duration-200 ease-[var(--ease-out-strong)] hover:scale-105 hover:shadow-[0_0_16px_-2px_var(--accent)]"
      >
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- external OAuth avatar, no static domain to configure next/image for
          <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          initial
        )}
      </button>

      {menuOpen && (
        <>
          <div aria-hidden onClick={() => setMenuOpen(false)} className="fixed inset-0 z-40" />
          <div
            role="menu"
            className="absolute right-0 top-full z-50 mt-2 w-48 rounded-2xl border border-white/10 bg-[#0d0d0f] p-1.5 shadow-2xl shadow-black/40 backdrop-blur-xl transition-[opacity,transform] duration-150 ease-[var(--ease-out-strong)] starting:opacity-0 starting:scale-95"
          >
            <Link
              href="/profile"
              role="menuitem"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-200 transition-colors duration-150 hover:bg-white/5 hover:text-white"
            >
              {PROFILE_ICON}
              <span>{t.topbar.profileMenuProfile}</span>
            </Link>
            <Link
              href="/settings"
              role="menuitem"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-200 transition-colors duration-150 hover:bg-white/5 hover:text-white"
            >
              {SETTINGS_ICON}
              <span>{t.topbar.profileMenuSettings}</span>
            </Link>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setMenuOpen(false);
                setLogoutConfirmOpen(true);
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-slate-200 transition-colors duration-150 hover:bg-white/5 hover:text-white"
            >
              {LOGOUT_ICON}
              <span>{t.topbar.profileMenuLogout}</span>
            </button>
          </div>
        </>
      )}

      <LogoutConfirmModal
        open={logoutConfirmOpen}
        onClose={() => setLogoutConfirmOpen(false)}
        onConfirm={confirmLogOut}
      />
    </div>
  );
}
