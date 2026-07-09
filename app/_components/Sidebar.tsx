"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { useLanguage } from "./LanguageProvider";
import { useAuth } from "./AuthProvider";

const ICON_PROPS = {
  className: "h-5 w-5",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: 1.75,
} as const;

type MainKey = "documents" | "housing" | "banks";
type OtherKey = "medicine" | "work" | "community" | "education";

const NAV_ICONS: Record<MainKey | OtherKey, ReactNode> = {
  documents: (
    <svg {...ICON_PROPS}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m-7 5h8a2 2 0 002-2V7a2 2 0 00-2-2H9.5L6 8.5V19a2 2 0 002 2z" />
    </svg>
  ),
  housing: (
    <svg {...ICON_PROPS}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75V20a1 1 0 01-1 1h-4a1 1 0 01-1-1v-5H9v5a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z" />
    </svg>
  ),
  banks: (
    <svg {...ICON_PROPS}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5L12 4l9 6.5M4.5 10.5V19a1 1 0 001 1h13a1 1 0 001-1v-8.5M9 20v-6h6v6" />
    </svg>
  ),
  medicine: (
    <svg {...ICON_PROPS}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-4.35-9.5-8.5C.5 8.5 2.5 5 6 5c2 0 3.5 1.5 4 2.5.5-1 2-2.5 4-2.5 3.5 0 5.5 3.5 3.5 7.5C19 16.65 12 21 12 21z" />
    </svg>
  ),
  work: (
    <svg {...ICON_PROPS}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5h18M3 7.5v10.5a1.5 1.5 0 001.5 1.5h15a1.5 1.5 0 001.5-1.5V7.5M8 7.5V5.25A1.5 1.5 0 019.5 3.75h5A1.5 1.5 0 0116 5.25V7.5" />
    </svg>
  ),
  education: (
    <svg {...ICON_PROPS}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
    </svg>
  ),
  community: (
    <svg {...ICON_PROPS}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-1a4 4 0 00-4-4h-1m-7 5H1v-1a4 4 0 014-4h1m6-4a3 3 0 10-3-3m9 3a3 3 0 10-3-3M9 12a3 3 0 100-6 3 3 0 000 6z" />
    </svg>
  ),
};

const OTHER_SERVICES_ICON = (
  <svg {...ICON_PROPS}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25M21 7.5v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
  </svg>
);
const CHEVRON_ICON = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);
const PROFILE_ICON = (
  <svg {...ICON_PROPS}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);
const SETTINGS_ICON = (
  <svg {...ICON_PROPS}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.558-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const LOGOUT_ICON = (
  <svg {...ICON_PROPS}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
  </svg>
);

const MAIN_ORDER: MainKey[] = ["documents", "housing", "banks"];
const OTHER_ORDER: OtherKey[] = ["medicine", "work", "community", "education"];
const HREFS: Record<MainKey | OtherKey, string> = {
  documents: "/documents",
  housing: "/housing",
  banks: "/banks",
  medicine: "/medicine",
  work: "/work",
  community: "/community",
  education: "/education",
};

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

  async function handleLogOut() {
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
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-shrink-0 flex-col border-r border-white/10 bg-[#0a0a0c] backdrop-blur-xl transition-transform duration-300 ease-[var(--ease-out-strong)] lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:translate-x-0 lg:self-start lg:bg-black/40 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link href="/dashboard" onClick={onClose} className="flex items-center gap-2 px-6 py-5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-bright text-sm font-bold text-white">
            R
          </span>
          <span className="text-sm font-semibold tracking-tight text-white">ReloAI</span>
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
                    ? "border-accent-bright bg-accent/20 text-white shadow-[inset_0_0_0_1px_rgba(91,141,239,0.25)]"
                    : "border-transparent text-slate-300 hover:bg-white/5 hover:text-white"
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
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              {OTHER_SERVICES_ICON}
              <span className="flex-1 text-left">{s.otherServices}</span>
              <span className={`transition-transform duration-150 ${otherOpen ? "rotate-180" : ""}`}>
                {CHEVRON_ICON}
              </span>
            </button>

            {otherOpen && (
              <div className="mt-1 space-y-1 border-l border-white/10 pl-4">
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
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
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
        <div className="space-y-1 border-t border-white/10 p-3">
          <Link
            href="/profile"
            onClick={onClose}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
              pathname === "/profile"
                ? "bg-accent/10 text-accent-bright"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            {PROFILE_ICON}
            <span>{s.profile}</span>
          </Link>
          <Link
            href="/profile"
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors duration-150 hover:bg-white/5 hover:text-white"
          >
            {SETTINGS_ICON}
            <span>{s.settings}</span>
          </Link>
          <button
            type="button"
            onClick={handleLogOut}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-300 transition-colors duration-150 hover:bg-white/5 hover:text-white"
          >
            {LOGOUT_ICON}
            <span>{s.logout}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
