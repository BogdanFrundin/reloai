"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { useLanguage } from "./LanguageProvider";
import { NAV_ICONS } from "./NavIcons";
import { routeForNotification, formatTimeAgo, type NotificationRow } from "../_lib/notifications";
import { supabase } from "../../lib/supabase";

const POLL_INTERVAL_MS = 60000;

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

const WELCOME_ICON = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a2.25 2.25 0 00-1.632-1.632L15 6.75l1.035-.259a2.25 2.25 0 001.632-1.632L18 3.75l.259 1.035a2.25 2.25 0 001.632 1.632L21 6.75l-1.035.259a2.25 2.25 0 00-1.632 1.632z" />
  </svg>
);

const INACTIVITY_ICON = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const NOTIFICATION_ICONS: Record<string, ReactNode> = {
  welcome: WELCOME_ICON,
  checklist: CHECKLIST_ICON,
  document: NAV_ICONS.documents,
  inactivity: INACTIVITY_ICON,
};

export default function NotificationBell() {
  const router = useRouter();
  const { user } = useAuth();
  const { t, lang } = useLanguage();
  const n = t.notifications;
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationRow[]>([]);

  const loadNotifications = useCallback(async () => {
    if (!user) {
      setNotifications([]);
      return;
    }
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(20);
    setNotifications(data ?? []);
  }, [user]);

  useEffect(() => {
    loadNotifications();
    if (!user) return;
    const interval = setInterval(loadNotifications, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [user, loadNotifications]);

  const unreadCount = notifications.filter((item) => !item.read).length;

  async function markAllRead() {
    const unreadIds = notifications.filter((item) => !item.read).map((item) => item.id);
    if (unreadIds.length === 0) return;

    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
    await supabase.from("notifications").update({ read: true }).in("id", unreadIds);
  }

  async function handleSelect(item: NotificationRow) {
    setMenuOpen(false);

    if (!item.read) {
      setNotifications((prev) => prev.map((row) => (row.id === item.id ? { ...row, read: true } : row)));
      await supabase.from("notifications").update({ read: true }).eq("id", item.id);
    }

    router.push(routeForNotification(item.type));
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

            {notifications.length === 0 ? (
              <p className="px-3 py-6 text-center text-sm text-slate-500">{n.empty}</p>
            ) : (
              <div className="max-h-96 space-y-1 overflow-y-auto">
                {notifications.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    role="menuitem"
                    onClick={() => handleSelect(item)}
                    className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-150 hover:bg-white/5 ${
                      item.read ? "opacity-60" : "bg-accent/[0.05]"
                    }`}
                  >
                    <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300">
                      {NOTIFICATION_ICONS[item.type] ?? BELL_ICON}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm leading-snug text-slate-200">{item.title}</p>
                      {item.message && <p className="mt-0.5 text-xs leading-snug text-slate-400">{item.message}</p>}
                      <p className="mt-1 text-xs text-slate-500">{formatTimeAgo(item.created_at, lang)}</p>
                    </div>
                    {!item.read && <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-accent-bright" />}
                  </button>
                ))}
              </div>
            )}

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
