"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PageHeader from "../../../_components/PageHeader";
import Reveal from "../../../_components/Reveal";
import ToggleSwitch from "../../../_components/ToggleSwitch";
import LogoutConfirmModal from "../../../_components/LogoutConfirmModal";
import { useLanguage } from "../../../_components/LanguageProvider";
import { useAuth } from "../../../_components/AuthProvider";
import { useTheme } from "../../../_components/ThemeProvider";
import { useCurrency } from "../../../_components/CurrencyProvider";
import { LANGUAGES, type Lang } from "../../../_lib/i18n";
import { CURRENCIES } from "../../../_lib/currency";
import { pressScale } from "../../../_lib/motion";
import { getFlagUrl } from "../../../_lib/flags";
import { supabase } from "../../../../lib/supabase";

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

  return (
    <div className="px-6 pb-8 lg:px-10 lg:pb-10">
      <PageHeader title={s.title} subtitle={s.subtitle} />

      <div className="mt-10 max-w-4xl space-y-6 mx-auto">
        {/* Account */}
        <Reveal>
          <div className="rounded-2xl border border-border-subtle bg-surface-1 p-6 backdrop-blur-sm">
            <p className="text-sm font-semibold text-text-primary">
              {s.accountSection}{" "}
              {accountSaved && <span className="text-xs font-normal text-accent-bright">{s.saved}</span>}
            </p>
            <div className="mt-4 space-y-3">
              <label className="block">
                <span className="text-xs text-text-muted">{s.nameLabel}</span>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setAccountSaved(false);
                  }}
                  className="mt-1 w-full rounded-xl border border-border-subtle bg-surface-1 px-3 py-2.5 text-sm text-text-primary outline-none transition-colors duration-150 focus:border-accent/50"
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
                  className="mt-1 w-full rounded-xl border border-border-subtle bg-surface-1 px-3 py-2.5 text-sm text-text-primary outline-none transition-colors duration-150 focus:border-accent/50"
                />
              </label>
              <button
                type="button"
                onClick={handleSaveAccount}
                disabled={savingAccount}
                className={`rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-accent-bright disabled:opacity-60 ${pressScale}`}
              >
                {s.saveBtn}
              </button>
            </div>
          </div>
        </Reveal>

        {/* Language */}
        <Reveal delay={50}>
          <div className="rounded-2xl border border-border-subtle bg-surface-1 p-6 backdrop-blur-sm">
            <p className="text-sm font-semibold text-text-primary">
              {s.languageSection}{" "}
              {savingLang && <span className="text-xs font-normal text-text-muted">{s.saving}</span>}
            </p>
            <p className="mt-1 text-xs text-text-muted">{s.languageDesc}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => handleLangChange(l.code)}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition-colors duration-150 ${
                    lang === l.code
                      ? "border-accent/50 bg-accent/10 text-accent-bright"
                      : "border-border-subtle bg-surface-1 text-text-secondary hover:border-border-strong hover:text-text-primary"
                  }`}
                >
                  <Image
                    src={getFlagUrl(l.flag, "sm")}
                    alt={l.name}
                    width={24}
                    height={18}
                    className="rounded-sm"
                    unoptimized
                  />
                  {l.name}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Currency */}
        <Reveal delay={75}>
          <div id="currency-section" className="scroll-mt-24 rounded-2xl border border-border-subtle bg-surface-1 p-6 backdrop-blur-sm">
            <p className="text-sm font-semibold text-text-primary">Валюта</p>
            <p className="mt-1 text-xs text-text-muted">
              В какой валюте показывать цены на сайте (курс к злотому обновляется автоматически).
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {CURRENCIES.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => setCurrency(c.code)}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition-colors duration-150 ${
                    currency === c.code
                      ? "border-accent/50 bg-accent/10 text-accent-bright"
                      : "border-border-subtle bg-surface-1 text-text-secondary hover:border-border-strong hover:text-text-primary"
                  }`}
                >
                  <Image
                    src={getFlagUrl(c.flag, "sm")}
                    alt={c.name}
                    width={24}
                    height={18}
                    className="rounded-sm"
                    unoptimized
                  />
                  <span className="flex flex-col items-start leading-tight">
                    <span>{c.name}</span>
                    <span className="text-xs text-text-muted">{c.symbol}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Notifications */}
        <Reveal delay={100}>
          <div className="rounded-2xl border border-border-subtle bg-surface-1 p-6 backdrop-blur-sm">
            <p className="text-sm font-semibold text-text-primary">{s.notifications}</p>
            <div className="mt-4 space-y-4">
              {NOTIFICATION_SETTINGS.map((setting) => (
                <div key={setting.key} className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-text-primary">{setting.label}</p>
                    <p className="text-xs text-text-muted">{setting.description}</p>
                  </div>
                  <ToggleSwitch
                    checked={notifications[setting.key]}
                    onChange={(checked) => handleNotificationChange(setting.key, checked)}
                    label={setting.label}
                  />
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Theme */}
        <Reveal delay={150}>
          <div className="rounded-2xl border border-border-subtle bg-surface-1 p-6 backdrop-blur-sm">
            <p className="text-sm font-semibold text-text-primary">{s.themeSection}</p>
            <p className="mt-1 text-xs text-text-muted">{s.themeDesc}</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setTheme("light")}
                aria-pressed={theme === "light"}
                className={`flex flex-col items-center gap-3 rounded-2xl border p-4 transition-[border-color,box-shadow,background-color] duration-200 ease-[var(--ease-out-strong)] ${
                  theme === "light"
                    ? "border-accent bg-accent/[0.06] shadow-[0_0_30px_-12px_var(--accent)]"
                    : "border-border-subtle bg-surface-1 hover:border-border-strong"
                }`}
              >
                {/* Fixed preview mockup: always shows what light theme looks like, regardless of the live theme */}
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
                <span
                  className={`text-sm font-medium ${theme === "light" ? "text-text-primary" : "text-text-secondary"}`}
                >
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
                    : "border-border-subtle bg-surface-1 hover:border-border-strong"
                }`}
              >
                {/* Fixed preview mockup: always shows what dark theme looks like, regardless of the live theme */}
                <div className="flex h-[72px] w-full flex-col gap-1.5 rounded-lg border border-white/10 bg-[#0d0d0f] p-2.5">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400/70" />
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400/70" />
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
                  </div>
                  <div className="h-1.5 w-3/4 rounded-full bg-white/25" />
                  <div className="h-1.5 w-1/2 rounded-full bg-white/15" />
                  <div className="h-1.5 w-2/3 rounded-full bg-white/15" />
                </div>
                <span
                  className={`text-sm font-medium ${theme === "dark" ? "text-text-primary" : "text-text-secondary"}`}
                >
                  {s.themeDark}
                </span>
              </button>
            </div>
          </div>
        </Reveal>

        {/* Danger zone */}
        <Reveal delay={175}>
          <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.03] p-6 backdrop-blur-sm">
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
        <Reveal delay={200}>
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
