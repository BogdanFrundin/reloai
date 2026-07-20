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
import { LANGUAGES, type Lang } from "../../../_lib/i18n";
import { pressScale } from "../../../_lib/motion";
import { getFlagUrl } from "../../../_lib/flags";
import { supabase } from "../../../../lib/supabase";

export default function SettingsPage() {
  const { lang, setLang, t } = useLanguage();
  const { theme, setTheme } = useTheme();
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
    <div className="px-6 py-8 lg:px-10 lg:py-10">
      <PageHeader title={s.title} subtitle={s.subtitle} />

      <div className="mt-10 max-w-2xl space-y-6">
        {/* Account */}
        <Reveal>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <p className="text-sm font-semibold text-white">
              {s.accountSection}{" "}
              {accountSaved && <span className="text-xs font-normal text-accent-bright">{s.saved}</span>}
            </p>
            <div className="mt-4 space-y-3">
              <label className="block">
                <span className="text-xs text-slate-500">{s.nameLabel}</span>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setAccountSaved(false);
                  }}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5 text-sm text-white outline-none transition-colors duration-150 focus:border-accent/50"
                />
              </label>
              <label className="block">
                <span className="text-xs text-slate-500">{s.emailLabel}</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setAccountSaved(false);
                  }}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5 text-sm text-white outline-none transition-colors duration-150 focus:border-accent/50"
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
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <p className="text-sm font-semibold text-white">
              {s.languageSection}{" "}
              {savingLang && <span className="text-xs font-normal text-slate-500">{s.saving}</span>}
            </p>
            <p className="mt-1 text-xs text-slate-500">{s.languageDesc}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => handleLangChange(l.code)}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition-colors duration-150 ${
                    lang === l.code
                      ? "border-accent/50 bg-accent/10 text-accent-bright"
                      : "border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/20 hover:text-white"
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

        {/* Notifications */}
        <Reveal delay={100}>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <p className="text-sm font-semibold text-white">{s.notifications}</p>
            <div className="mt-4 space-y-4">
              {NOTIFICATION_SETTINGS.map((setting) => (
                <div key={setting.key} className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-white">{setting.label}</p>
                    <p className="text-xs text-slate-500">{setting.description}</p>
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
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <p className="text-sm font-semibold text-white">{s.themeSection}</p>
            <p className="mt-1 text-xs text-slate-500">{s.themeDesc}</p>
            <div className="mt-4 flex items-center justify-between gap-4">
              <span className="text-sm text-slate-300">{theme === "dark" ? s.themeDark : s.themeLight}</span>
              <ToggleSwitch
                checked={theme === "dark"}
                onChange={(checked) => setTheme(checked ? "dark" : "light")}
                label={s.themeSection}
              />
            </div>
          </div>
        </Reveal>

        {/* Danger zone */}
        <Reveal delay={175}>
          <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.03] p-6 backdrop-blur-sm">
            <p className="text-sm font-semibold text-white">{s.dangerSection}</p>
            <p className="mt-1 text-xs text-slate-500">{s.dangerDesc}</p>
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
            className={`flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400 ${pressScale}`}
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
            className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#0d0d0f] p-6 text-center shadow-2xl shadow-black/40"
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
            <h2 className="mt-4 text-lg font-bold text-white">{s.deleteConfirmTitle}</h2>
            <p className="mt-2 text-sm text-slate-400">{s.deleteConfirmBody}</p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmOpen(false)}
                disabled={deleting}
                className={`flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-300 transition-colors duration-150 hover:border-white/30 hover:text-white disabled:opacity-60 ${pressScale}`}
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
