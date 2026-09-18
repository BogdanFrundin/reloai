"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import PageHeader from "../../../_components/PageHeader";
import Reveal from "../../../_components/Reveal";
import ToggleSwitch from "../../../_components/ToggleSwitch";
import LogoutConfirmModal from "../../../_components/LogoutConfirmModal";
import { useLanguage } from "../../../_components/LanguageProvider";
import { useAuth } from "../../../_components/AuthProvider";
import { useTheme } from "../../../_components/ThemeProvider";
import { useCurrency } from "../../../_components/CurrencyProvider";
import { getInitials } from "../../../_lib/initials";
import { LANGUAGES, type Lang } from "../../../_lib/i18n";
import { CURRENCIES, getCurrencyName } from "../../../_lib/currency";
import { pressScale } from "../../../_lib/motion";
import { getFlagUrl } from "../../../_lib/flags";
import { supabase } from "../../../../lib/supabase";

const CHEVRON_DOWN = (
  <svg className="h-3.5 w-3.5 flex-shrink-0 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

// Row-style dropdown trigger for the Language & currency card — visually a
// plain InfoRow value (flag + text + chevron, no box) rather than a button,
// so it sits flush with the rest of profile-style info rows. Same
// open/close-on-outside-click pattern as MiniLangSwitcher.
function LanguageSelect({ lang, onChange }: { lang: Lang; onChange: (code: Lang) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative flex-shrink-0" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 text-sm font-medium text-text-primary transition-colors duration-150 hover:text-accent-bright"
      >
        <Image src={getFlagUrl(current.flag, "sm")} alt="" width={20} height={15} className="rounded-sm" unoptimized />
        {current.name}
        {CHEVRON_DOWN}
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-20 mt-1.5 w-48 overflow-hidden rounded-xl border border-border-subtle bg-panel py-1 shadow-xl shadow-black/40"
        >
          {LANGUAGES.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                role="option"
                aria-selected={l.code === lang}
                onClick={() => {
                  onChange(l.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors duration-150 hover:bg-accent/10 hover:text-accent-bright ${
                  l.code === lang ? "font-semibold text-accent-bright" : "text-text-secondary"
                }`}
              >
                <Image src={getFlagUrl(l.flag, "sm")} alt="" width={20} height={15} className="rounded-sm" unoptimized />
                {l.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CurrencySelect({
  currency,
  lang,
  onChange,
}: {
  currency: string;
  lang: Lang;
  onChange: (code: (typeof CURRENCIES)[number]["code"]) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = CURRENCIES.find((c) => c.code === currency) ?? CURRENCIES[0];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative flex-shrink-0" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 text-sm font-medium text-text-primary transition-colors duration-150 hover:text-accent-bright"
      >
        <Image src={getFlagUrl(current.flag, "sm")} alt="" width={20} height={15} className="rounded-sm" unoptimized />
        {getCurrencyName(current.code, lang)}
        <span className="text-text-muted">{current.symbol}</span>
        {CHEVRON_DOWN}
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-20 mt-1.5 w-56 overflow-hidden rounded-xl border border-border-subtle bg-panel py-1 shadow-xl shadow-black/40"
        >
          {CURRENCIES.map((c) => (
            <li key={c.code}>
              <button
                type="button"
                role="option"
                aria-selected={c.code === currency}
                onClick={() => {
                  onChange(c.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors duration-150 hover:bg-accent/10 hover:text-accent-bright ${
                  c.code === currency ? "font-semibold text-accent-bright" : "text-text-secondary"
                }`}
              >
                <Image src={getFlagUrl(c.flag, "sm")} alt="" width={20} height={15} className="rounded-sm" unoptimized />
                <span className="min-w-0 flex-1 truncate">{getCurrencyName(c.code, lang)}</span>
                <span className="flex-shrink-0 text-text-muted">{c.symbol}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function SettingsPage() {
  const { lang, setLang, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { currency, setCurrency } = useCurrency();
  const { user, profile, signOut, refreshProfile } = useAuth();
  const router = useRouter();
  const s = t.settings;

  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    email: profile?.email_newsletter ?? true,
    documents: profile?.email_reminders ?? true,
    product: profile?.email_updates ?? false,
  });
  const [savingNotifications, setSavingNotifications] = useState<Record<string, boolean>>({});
  const [savingLang, setSavingLang] = useState(false);

  const [name, setName] = useState(profile?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [savingAccount, setSavingAccount] = useState(false);
  const [accountSaved, setAccountSaved] = useState(false);

  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const NOTIFICATION_SETTINGS = [
    { key: "email", label: s.notifEmail, description: s.notifEmailDesc },
    { key: "documents", label: s.notifDocuments, description: s.notifDocumentsDesc },
    { key: "product", label: s.notifProduct, description: s.notifProductDesc },
  ] as const;

  async function handleLangChange(code: Lang) {
    setLang(code);
    if (!user) return;
    setSavingLang(true);
    await supabase.from("profiles").update({ language: code }).eq("id", user.id);
    await refreshProfile();
    setSavingLang(false);
  }

  async function handleSaveAccount() {
    if (!user) return;
    setSavingAccount(true);
    setAccountSaved(false);
    await supabase.from("profiles").update({ name }).eq("id", user.id);
    if (email !== user.email) {
      await supabase.auth.updateUser({ email });
    }
    await refreshProfile();
    setSavingAccount(false);
    setAccountSaved(true);
  }

  async function handleNotificationChange(key: string, checked: boolean) {
    setNotifications((prev) => ({ ...prev, [key]: checked }));
    if (!user) return;
    setSavingNotifications((prev) => ({ ...prev, [key]: true }));

    const updateData: Record<string, boolean> = {};
    if (key === "email") updateData.email_newsletter = checked;
    if (key === "documents") updateData.email_reminders = checked;
    if (key === "product") updateData.email_updates = checked;

    await supabase.from("profiles").update(updateData).eq("id", user.id);
    await refreshProfile();
    setSavingNotifications((prev) => ({ ...prev, [key]: false }));
  }

  async function confirmLogOut() {
    setLogoutConfirmOpen(false);
    await signOut();
    router.push("/login");
  }

  async function confirmDeleteAccount() {
    if (!user) return;
    setDeleting(true);
    await supabase.from("profiles").delete().eq("id", user.id);
    await signOut();
    router.push("/");
  }

  const initials = getInitials(profile?.name, user?.email);
  const avatarUrl = (user?.user_metadata as { avatar_url?: string; picture?: string } | undefined)?.avatar_url
    ?? (user?.user_metadata as { avatar_url?: string; picture?: string } | undefined)?.picture;

  return (
    <div className="px-6 pb-8 lg:px-10 lg:pb-10">
      <PageHeader title={s.title} subtitle={s.subtitle} center />

      <div className="mt-4 max-w-5xl space-y-6 mx-auto">
        {/* Account — identity + editable name/email, mirrors profile's hero card */}
        <Reveal>
          <div className="rounded-2xl border border-border-subtle bg-surface-1 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <span className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-accent to-accent-bright text-xl font-semibold text-white">
                {avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element -- external OAuth avatar, no static domain to configure next/image for
                  <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  initials
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-lg font-semibold text-text-primary">{profile?.name || t.profile.unnamed}</p>
                <p className="truncate text-sm text-text-muted">{user?.email}</p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 border-t border-border-subtle pt-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs text-text-muted">{s.nameLabel}</span>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setAccountSaved(false);
                  }}
                  className="mt-1.5 w-full rounded-xl border border-border-subtle bg-panel px-3 py-2.5 text-sm text-text-primary outline-none transition-colors duration-150 focus:border-accent/50"
                />
              </label>
              <label className="block">
                <span className="text-xs text-text-muted">{s.emailLabel}</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setAccountSaved(false);
                  }}
                  className="mt-1.5 w-full rounded-xl border border-border-subtle bg-panel px-3 py-2.5 text-sm text-text-primary outline-none transition-colors duration-150 focus:border-accent/50"
                />
              </label>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={handleSaveAccount}
                disabled={savingAccount}
                className={`rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-accent-bright disabled:opacity-60 ${pressScale}`}
              >
                {s.saveBtn}
              </button>
              {accountSaved && <span className="text-xs font-medium text-accent-bright">{s.saved}</span>}
            </div>
          </div>
        </Reveal>

        {/* Language & currency + notifications, side by side */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal delay={50}>
            <div id="currency-section" className="h-full scroll-mt-24 rounded-2xl border border-border-subtle bg-surface-1 p-6 backdrop-blur-sm">
              <p className="text-sm font-semibold text-text-primary">
                {s.languageSection} · {s.currencySection}
              </p>
              <div className="mt-2 divide-y divide-border-subtle">
                <div className="flex items-center justify-between gap-4 py-2.5">
                  <span className="text-sm text-text-muted">
                    {s.languageSection}
                    {savingLang && <span className="ml-1.5 text-xs text-text-muted">({s.saving})</span>}
                  </span>
                  <LanguageSelect lang={lang} onChange={handleLangChange} />
                </div>
                <div className="flex items-center justify-between gap-4 py-2.5">
                  <span className="text-sm text-text-muted">{s.currencySection}</span>
                  <CurrencySelect currency={currency} lang={lang} onChange={setCurrency} />
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-white/[0.03] p-4">
                <p className="text-xs text-text-muted">{s.languageSection}</p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => handleLangChange(l.code)}
                      className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors duration-150 ${
                        lang === l.code
                          ? "border-accent/50 bg-accent/10 text-accent-bright"
                          : "border-border-subtle text-text-secondary hover:border-border-strong hover:text-text-primary"
                      }`}
                    >
                      <Image src={getFlagUrl(l.flag, "sm")} alt="" width={18} height={13} className="rounded-sm" unoptimized />
                      {l.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={75}>
            <div className="h-full rounded-2xl border border-border-subtle bg-surface-1 p-6 backdrop-blur-sm">
              <p className="text-sm font-semibold text-text-primary">{s.notifications}</p>
              <div className="mt-2 divide-y divide-border-subtle">
                {NOTIFICATION_SETTINGS.map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between gap-4 py-2.5">
                    <div className="min-w-0">
                      <p className="text-sm text-text-secondary">{setting.label}</p>
                      <p className="mt-0.5 truncate text-xs text-text-muted">{setting.description}</p>
                    </div>
                    <div
                      className={
                        savingNotifications[setting.key] ? "pointer-events-none flex-shrink-0 opacity-50 transition-opacity" : "flex-shrink-0 transition-opacity"
                      }
                    >
                      <ToggleSwitch
                        checked={notifications[setting.key]}
                        onChange={(checked) => handleNotificationChange(setting.key, checked)}
                        label={setting.label}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Appearance — full width, like the Route section on profile */}
        <Reveal delay={100}>
          <div>
            <p className="mb-3 text-sm font-semibold text-text-primary">{s.themeSection}</p>
            <div className="rounded-2xl border border-border-subtle bg-surface-1 p-6 backdrop-blur-sm">
              <p className="text-xs text-text-muted">{s.themeDesc}</p>
              <div className="mt-4 grid max-w-sm grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setTheme("light")}
                  aria-pressed={theme === "light"}
                  className={`flex flex-col items-center gap-3 rounded-2xl border p-4 transition-[border-color,box-shadow,background-color] duration-200 ease-[var(--ease-out-strong)] ${
                    theme === "light"
                      ? "border-accent bg-accent/[0.06] shadow-[0_0_30px_-12px_var(--accent)]"
                      : "border-border-subtle bg-panel hover:border-border-strong"
                  }`}
                >
                  <div className="flex h-[72px] w-full flex-col gap-1.5 rounded-lg bg-white p-2.5">
                    <div className="flex gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </div>
                    <div className="h-1.5 w-3/4 rounded-full bg-slate-300" />
                    <div className="h-1.5 w-1/2 rounded-full bg-slate-200" />
                    <div className="h-1.5 w-2/3 rounded-full bg-slate-200" />
                  </div>
                  <span className={`text-sm font-medium ${theme === "light" ? "text-text-primary" : "text-text-secondary"}`}>
                    {s.themeLight}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setTheme("dark")}
                  aria-pressed={theme === "dark"}
                  className={`flex flex-col items-center gap-3 rounded-2xl border p-4 transition-[border-color,box-shadow,background-color] duration-200 ease-[var(--ease-out-strong)] ${
                    theme === "dark"
                      ? "border-accent bg-accent/[0.06] shadow-[0_0_30px_-12px_var(--accent)]"
                      : "border-border-subtle bg-panel hover:border-border-strong"
                  }`}
                >
                  <div className="flex h-[72px] w-full flex-col gap-1.5 rounded-lg border border-white/10 bg-[#131316] p-2.5">
                    <div className="flex gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-400/70" />
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400/70" />
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
                    </div>
                    <div className="h-1.5 w-3/4 rounded-full bg-white/25" />
                    <div className="h-1.5 w-1/2 rounded-full bg-white/15" />
                    <div className="h-1.5 w-2/3 rounded-full bg-white/15" />
                  </div>
                  <span className={`text-sm font-medium ${theme === "dark" ? "text-text-primary" : "text-text-secondary"}`}>
                    {s.themeDark}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Danger zone */}
        <Reveal delay={125}>
          <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.03] p-6">
            <p className="text-sm font-semibold text-text-primary">{s.dangerSection}</p>
            <p className="mt-1 text-xs text-text-muted">{s.dangerDesc}</p>
            <button
              type="button"
              onClick={() => setDeleteConfirmOpen(true)}
              className={`mt-4 rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2.5 text-sm font-semibold text-red-400 transition-colors duration-150 hover:border-red-500/50 hover:bg-red-500/20 ${pressScale}`}
            >
              {s.deleteAccountBtn}
            </button>
          </div>
        </Reveal>

        {/* Log out */}
        <Reveal delay={150}>
          <button
            type="button"
            onClick={() => setLogoutConfirmOpen(true)}
            className={`flex w-full items-center justify-center rounded-full border border-border-strong bg-surface-1 px-5 py-3 text-sm font-semibold text-text-primary transition-colors duration-150 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400 ${pressScale}`}
          >
            {t.profile.logOut}
          </button>
        </Reveal>
      </div>

      <LogoutConfirmModal
        open={logoutConfirmOpen}
        onClose={() => setLogoutConfirmOpen(false)}
        onConfirm={confirmLogOut}
      />

      {deleteConfirmOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => !deleting && setDeleteConfirmOpen(false)}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-sm rounded-2xl border border-border-subtle bg-panel p-6 text-center shadow-2xl shadow-black/40"
          >
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/15 text-red-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            <h2 className="mt-4 text-lg font-bold text-text-primary">{s.deleteConfirmTitle}</h2>
            <p className="mt-2 text-sm text-text-muted">{s.deleteConfirmBody}</p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmOpen(false)}
                disabled={deleting}
                className={`flex-1 rounded-full border border-border-strong bg-surface-1 px-5 py-2.5 text-sm font-semibold text-text-secondary transition-colors duration-150 hover:border-border-strong hover:text-text-primary disabled:opacity-60 ${pressScale}`}
              >
                {t.common.cancelBtn}
              </button>
              <button
                type="button"
                onClick={confirmDeleteAccount}
                disabled={deleting}
                className={`flex-1 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-red-500 disabled:opacity-60 ${pressScale}`}
              >
                {s.deleteConfirmBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
