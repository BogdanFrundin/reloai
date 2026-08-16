"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { useLanguage } from "./LanguageProvider";
import MiniLangSwitcher from "./MiniLangSwitcher";
import NotificationBell from "./NotificationBell";
import ProfileAvatar from "./ProfileAvatar";
import UpgradeModal from "./UpgradeModal";
import { pressScale } from "../_lib/motion";
import { supabase } from "../../lib/supabase";

const GUIDE_CATEGORY_HREF: Record<string, string> = {
  "финансы": "/banks",
  "медицина": "/insurance",
};

type SearchHit = { id: string; name: string; tag: string; href: string };

function TopbarSearch() {
  const { t } = useLanguage();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [dataHits, setDataHits] = useState<SearchHit[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const navItems = useMemo(() => {
    const d = t.dashboard.sidebar;
    const s = t.sidebar;
    return [
      { label: d.home, href: "/home" },
      { label: d.roadmap, href: "/dashboard" },
      { label: d.aiAssistant, href: "/dashboard/ai" },
      { label: s.documents, href: "/documents" },
      { label: s.banks, href: "/banks" },
      { label: s.medicine, href: "/medicine" },
      { label: s.insurance, href: "/insurance" },
      { label: s.housing, href: "/housing" },
      { label: s.work, href: "/work" },
      { label: s.education, href: "/education" },
      { label: s.settings, href: "/settings" },
    ];
  }, [t]);

  const term = query.trim().toLowerCase();
  const navHits = term.length > 0 ? navItems.filter((item) => item.label.toLowerCase().includes(term)) : [];

  useEffect(() => {
    if (term.length < 2) {
      setDataHits([]);
      return;
    }
    let active = true;
    const timer = setTimeout(() => {
      Promise.all([
        supabase.from("document_guides").select("id, name, category").ilike("name", `%${term}%`).limit(5),
        supabase.from("clinics").select("id, name, category").ilike("name", `%${term}%`).limit(5),
        supabase.from("education").select("id, name, type").ilike("name", `%${term}%`).limit(5),
      ]).then(([guides, clinics, education]) => {
        if (!active) return;
        const guideHits: SearchHit[] = (guides.data ?? []).map((g: { id: string; name: string; category: string }) => ({
          id: `guide-${g.id}`,
          name: g.name,
          tag: g.category,
          href: GUIDE_CATEGORY_HREF[g.category] ?? "/documents",
        }));
        const clinicHits: SearchHit[] = (clinics.data ?? []).map((c: { id: string; name: string; category: string }) => ({
          id: `clinic-${c.id}`,
          name: c.name,
          tag: c.category,
          href: "/medicine",
        }));
        const educationHits: SearchHit[] = (education.data ?? []).map((e: { id: string; name: string; type: string }) => ({
          id: `education-${e.id}`,
          name: e.name,
          tag: e.type,
          href: "/education",
        }));
        setDataHits([...guideHits, ...clinicHits, ...educationHits]);
      });
    }, 250);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [term]);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function go(href: string) {
    setOpen(false);
    setQuery("");
    router.push(href);
  }

  const hasResults = navHits.length > 0 || dataHits.length > 0;

  return (
    <div ref={containerRef} className="relative w-full max-w-sm">
      <svg
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
        placeholder={t.topbar.searchPlaceholder}
        className="w-full rounded-xl border border-border-subtle bg-surface-1 py-2 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted transition-[border-color,box-shadow] duration-150 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
      />

      {open && term.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-xl border border-border-subtle bg-panel p-1.5 shadow-xl">
          {!hasResults ? (
            <p className="px-3 py-2 text-xs text-text-muted">Ничего не найдено</p>
          ) : (
            <>
              {navHits.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => go(item.href)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-text-primary transition-colors duration-100 hover:bg-surface-hover"
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">Раздел</span>
                </button>
              ))}
              {dataHits.map((hit) => (
                <button
                  key={hit.id}
                  type="button"
                  onClick={() => go(hit.href)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-text-primary transition-colors duration-100 hover:bg-surface-hover"
                >
                  <span className="truncate">{hit.name}</span>
                  <span className="ml-2 flex-shrink-0 text-[10px] font-semibold uppercase tracking-wide text-text-muted">
                    {hit.tag}
                  </span>
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const { user, profile } = useAuth();
  const { t } = useLanguage();
  const [upgradeOpen, setUpgradeOpen] = useState(false);

  const planValue = profile?.plan ?? "free";
  const isFree = planValue === "free";
  const planLabel = isFree ? t.appPricing.freeName : planValue.charAt(0).toUpperCase() + planValue.slice(1);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-4 border-b border-border-subtle bg-background px-4 py-4 backdrop-blur-xl sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label={t.topbar.openMenuAria}
        className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-surface-1 text-text-primary lg:hidden ${pressScale}`}
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <TopbarSearch />

      <div className="flex items-center gap-3">
        <MiniLangSwitcher />

        {user ? (
          <>
            <button
              type="button"
              onClick={() => setUpgradeOpen(true)}
              className="hidden items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent-bright transition-colors duration-150 hover:border-accent/60 sm:flex"
            >
              {planLabel}
              {isFree && <span className="text-text-muted">· {t.topbar.upgrade}</span>}
            </button>

            <NotificationBell />

            <ProfileAvatar />
          </>
        ) : (
          <>
            <Link
              href="/login"
              className={`flex-shrink-0 rounded-full border border-border-strong bg-surface-1 px-3 py-1.5 text-xs font-semibold text-text-primary transition-colors duration-150 hover:border-border-strong hover:bg-surface-hover ${pressScale}`}
            >
              {t.nav.login}
            </Link>
            <Link
              href="/register"
              className={`flex-shrink-0 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-white transition-colors duration-150 hover:bg-accent-bright ${pressScale}`}
            >
              {t.auth.login.register}
            </Link>
          </>
        )}
      </div>

      <UpgradeModal open={upgradeOpen} onClose={() => setUpgradeOpen(false)} />
    </header>
  );
}
