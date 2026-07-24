"use client";

import Link from "next/link";
import { useAuth } from "./AuthProvider";
import { useLanguage } from "./LanguageProvider";

export default function ProfileAvatar() {
  const { user, profile } = useAuth();
  const { t } = useLanguage();

  if (!user) return null;

  const name = profile?.name?.trim() || user.email?.trim() || "";
  const initial = name.charAt(0).toUpperCase() || "?";
  const avatarUrl = (user.user_metadata as { avatar_url?: string } | undefined)?.avatar_url;

  return (
    <Link
      href="/profile"
      aria-label={t.topbar.avatarAria}
      className="flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-accent to-accent-bright text-sm font-bold text-white transition-[transform,box-shadow] duration-200 ease-[var(--ease-out-strong)] hover:scale-105 hover:shadow-[0_0_16px_-2px_var(--accent)]"
    >
      {avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element -- external OAuth avatar, no static domain to configure next/image for
        <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
      ) : (
        initial
      )}
    </Link>
  );
}
