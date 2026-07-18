"use client";

import { useState, type ReactNode } from "react";
import { useLanguage } from "./LanguageProvider";
import { NAV_ICONS } from "./NavIcons";

const BELL_ICON = (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
    />
  </svg>
);

const CHECKLIST_ICON = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

type NotificationId = "visaReminder" | "newBanks" | "checklistUpdated";

const NOTIFICATION_ORDER: NotificationId[] = ["visaReminder", "newBanks", "checklistUpdated"];

const NOTIFICATION_ICONS: Record<NotificationId, ReactNode> = {
  visaReminder: NAV_ICONS.documents,
  newBanks: NAV_ICONS.banks,
  checklistUpdated: CHECKLIST_ICON,
};

export default function NotificationBell() {
  const { t } = useLanguage();
  const n = t.notifications;
  const [menuOpen, setMenuOpen] = useState(false);
  const [readIds, setReadIds] = useState<Set<NotificationId>>(new Set());

  const unreadCount = NOTIFICATION_ORDER.length - readIds.size;

  function markAllRead() {
    setReadIds(new Set(NOTIFICATION_ORDER));
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={n.bellAria}
        aria-expanded={menuOpen}
        aria-haspopup="menu"
        className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-colors duration-150 hover:border-white/20 hover:text-white"
      >
        {BELL_ICON}
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-none text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {menuOpen && (
        <>
          <div aria-hidden onClick={() => setMenuOpen(false)} className="fixed inset-0 z-40" />
          <div
            role="menu"
            className="absolute right-0 top-full z-50 mt-2 w-80 rounded-2xl border border-white/10 bg-[#0d0d0f] p-1.5 shadow-2xl shadow-black/40 backdrop-blur-xl transition-[opacity,transform] duration-150 ease-[var(--ease-out-strong)] starting:opacity-0 starting:scale-95"
          >
            <p className="px-3 py-2 text-sm font-semibold text-white">{n.title}</p>

            <div className="space-y-1">
              {NOTIFICATION_ORDER.map((id) => {
                const item = n.items[id];
                const isRead = readIds.has(id);
                return (
                  <div
                    key={id}
                    className={`flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 ${
                      isRead ? "opacity-60" : "bg-accent/[0.05]"
                    }`}
                  >
                    <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300">
                      {NOTIFICATION_ICONS[id]}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm leading-snug text-slate-200">{item.text}</p>
                      <p className="mt-1 text-xs text-slate-500">{item.timeAgo}</p>
                    </div>
                    {!isRead && <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-accent-bright" />}
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={markAllRead}
              disabled={unreadCount === 0}
              className="mt-1 flex w-full items-center justify-center rounded-xl px-3 py-2 text-sm font-medium text-accent-bright transition-colors duration-150 hover:bg-white/5 disabled:cursor-not-allowed disabled:text-slate-600 disabled:hover:bg-transparent"
            >
              {n.markAllRead}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
