"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { pressScale } from "../_lib/motion";
import { getInitials } from "../_lib/initials";
import { useAuth } from "./AuthProvider";

export default function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { user, profile, signOut } = useAuth();
  const router = useRouter();

  const initials = getInitials(profile?.name, user?.email);
  const planLabel = profile?.plan ? profile.plan.charAt(0).toUpperCase() + profile.plan.slice(1) : "Free";

  async function handleLogOut() {
    setOpen(false);
    await signOut();
    router.push("/login");
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="relative z-50 flex items-center justify-between gap-4 border-b border-white/10 bg-black/40 px-4 py-4 backdrop-blur-xl sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
        className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white lg:hidden ${pressScale}`}
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="relative w-full max-w-sm">
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="search"
          placeholder="Search documents, tasks..."
          className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 transition-[border-color,box-shadow] duration-150 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
        />
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/pricing"
          className="hidden items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent-bright transition-colors duration-150 hover:border-accent/60 sm:flex"
        >
          {planLabel} Plan
          <span className="text-slate-400">· Upgrade</span>
        </Link>

        <div className="relative" ref={containerRef}>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-haspopup="menu"
            aria-expanded={open}
            className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-bright text-sm font-semibold text-white ${pressScale}`}
          >
            {initials}
          </button>

          {open && (
            <ul
              role="menu"
              style={{ transformOrigin: "top right" }}
              className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0f]/95 py-1 shadow-xl shadow-black/40 backdrop-blur-xl transition-[opacity,transform] duration-150 ease-[var(--ease-out-strong)] starting:opacity-0 starting:scale-95"
            >
              <li>
                <Link
                  href="/profile"
                  className="block px-3 py-2 text-sm text-slate-200 transition-colors duration-150 hover:bg-accent/10 hover:text-accent-bright"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="block px-3 py-2 text-sm text-slate-200 transition-colors duration-150 hover:bg-accent/10 hover:text-accent-bright"
                >
                  Back to website
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleLogOut}
                  className="block w-full px-3 py-2 text-left text-sm text-slate-200 transition-colors duration-150 hover:bg-accent/10 hover:text-accent-bright"
                >
                  Log out
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
