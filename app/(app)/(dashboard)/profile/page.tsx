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
import { LANGUAGES, type Lang } from "../../../_lib/i18n";
import { getInitials } from "../../../_lib/initials";
import { pressScale } from "../../../_lib/motion";
import { getFlagUrl } from "../../../_lib/flags";
import { supabase } from "../../../../lib/supabase";

export default function ProfilePage() {
  const { lang, setLang, t } = useLanguage();
  const { user, profile, signOut, refreshProfile } = useAuth();
  const router = useRouter();
  const p = t.profile;

  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    email: true,
    documents: true,
    product: false,
  });
  const [savingLang, setSavingLang] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  const initials = getInitials(profile?.name, user?.email);
  const planLabel = profile?.plan
    ? profile.plan.charAt(0).toUpperCase() + profile.plan.slice(1)
    : "Free";

  const NOTIFICATION_SETTINGS = [
    { key: "email", label: p.notifEmail, description: p.notifEmailDesc },
    { key: "documents", label: p.notifDocuments, description: p.notifDocumentsDesc },
    { key: "product", label: p.notifProduct, description: p.notifProductDesc },
  ] as const;

  async function handleLangChange(code: Lang) {
    setLang(code);
    if (!user) return;
    setSavingLang(true);
    await supabase.from("profiles").update({ language: code }).eq("id", user.id);
    await refreshProfile();
    setSavingLang(false);
  }

  async function confirmLogOut() {
    setLogoutConfirmOpen(false);
    await signOut();
    router.push("/login");
  }

  return (
    <div className="px-6 py-8 lg:px-10 lg:py-10">
      <PageHeader title={p.title} subtitle={p.subtitle} />

      <div className="mt-10 max-w-2xl space-y-6">
        {/* Avatar + info card */}
        <Reveal>
          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <span className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-bright text-xl font-semibold text-white">
              {initials}
            </span>
            <div className="flex-1">
              <p className="text-lg font-semibold text-white">{profile?.name || p.unnamed}</p>
              <p className="text-sm text-slate-400">{user?.email}</p>
            </div>
            <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent-bright">
              {planLabel} {p.planSuffix}
            </span>
          </div>
        </Reveal>

        {/* Language picker */}
        <Reveal delay={50}>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <p className="text-sm font-semibold text-white">
              {p.languageSection}{" "}
              {savingLang && <span className="text-xs font-normal text-slate-500">{p.saving}</span>}
            </p>
            <p className="mt-1 text-xs text-slate-500">{p.languageDesc}</p>
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
            <p className="text-sm font-semibold text-white">{p.notifications}</p>
            <div className="mt-4 space-y-4">
              {NOTIFICATION_SETTINGS.map((setting) => (
                <div key={setting.key} className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-white">{setting.label}</p>
                    <p className="text-xs text-slate-500">{setting.description}</p>
                  </div>
                  <ToggleSwitch
                    checked={notifications[setting.key]}
                    onChange={(checked) =>
                      setNotifications((prev) => ({ ...prev, [setting.key]: checked }))
                    }
                    label={setting.label}
                  />
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Log out */}
        <Reveal delay={150}>
          <button
            type="button"
            onClick={() => setLogoutConfirmOpen(true)}
            className={`flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400 ${pressScale}`}
          >
            {p.logOut}
          </button>
        </Reveal>
      </div>

      <LogoutConfirmModal
        open={logoutConfirmOpen}
        onClose={() => setLogoutConfirmOpen(false)}
        onConfirm={confirmLogOut}
      />
    </div>
  );
}
