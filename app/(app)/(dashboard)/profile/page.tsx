"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import PageHeader from "../../../_components/PageHeader";
import Reveal from "../../../_components/Reveal";
import LogoutConfirmModal from "../../../_components/LogoutConfirmModal";
import SearchableCountrySelect from "../../../_components/SearchableCountrySelect";
import { useLanguage } from "../../../_components/LanguageProvider";
import { useAuth } from "../../../_components/AuthProvider";
import { useDashboardProgress } from "../../../_components/DashboardProgressProvider";
import { getInitials } from "../../../_lib/initials";
import { pressScale } from "../../../_lib/motion";
import { getFlagUrl } from "../../../_lib/flags";
import { getCountryName } from "../../../_lib/countries";
import { DOCUMENT_CATALOG, STATUS_BADGE_CLASS, type DocumentItem, type DocStatus } from "../../../_lib/documents";
import { supabase } from "../../../../lib/supabase";

const COUNTRY_INDEX: Record<string, number> = { Poland: 0, Germany: 1, Spain: 2 };
const COUNTRY_FLAG_CODE: Record<string, string> = { Poland: "pl", Germany: "de", Spain: "es" };
const GOAL_KEYS = [
  "work",
  "study",
  "business",
  "passiveIncome",
  "digitalNomad",
  "familyReunification",
  "other",
] as const;
type GoalKey = (typeof GOAL_KEYS)[number];

function isGoalKey(value: string | null | undefined): value is GoalKey {
  return !!value && (GOAL_KEYS as readonly string[]).includes(value);
}

function SpeedBadge({ speed, label }: { speed: string; label: string }) {
  const colors =
    speed === "fast"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
      : speed === "medium"
        ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
        : "border-red-500/30 bg-red-500/10 text-red-400";
  return <span className={`inline-block rounded-full border px-2.5 py-1 text-xs font-semibold ${colors}`}>{label}</span>;
}

function DifficultyBadge({ difficulty, label }: { difficulty: string; label: string }) {
  const colors =
    difficulty === "easy"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
      : difficulty === "medium"
        ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
        : "border-red-500/30 bg-red-500/10 text-red-400";
  return <span className={`inline-block rounded-full border px-2.5 py-1 text-xs font-semibold ${colors}`}>{label}</span>;
}

function InfoRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="flex items-center gap-2 text-sm font-medium text-white">{children}</span>
    </div>
  );
}

export default function ProfilePage() {
  const { lang, t } = useLanguage();
  const { user, profile, signOut, refreshProfile } = useAuth();
  const { checklistSteps, completed, progressPercent, loading: progressLoading } = useDashboardProgress();
  const p = t.profile;

  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [savingEdit, setSavingEdit] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [documents, setDocuments] = useState<DocumentItem[]>(DOCUMENT_CATALOG);

  const [formCitizenship, setFormCitizenship] = useState<string | undefined>(profile?.citizenship ?? undefined);
  const [formCurrentCountry, setFormCurrentCountry] = useState<string | undefined>(profile?.current_country ?? undefined);
  const [formCity, setFormCity] = useState(profile?.city ?? "");
  const [formGoal, setFormGoal] = useState<GoalKey | null>(isGoalKey(profile?.goal) ? profile.goal : null);
  const [formJobOffer, setFormJobOffer] = useState<string | null>(profile?.job_offer ?? null);
  const [formAlreadyAdmitted, setFormAlreadyAdmitted] = useState<string | null>(profile?.already_admitted ?? null);

  useEffect(() => {
    if (!user) return;
    let active = true;
    supabase
      .from("documents")
      .select("doc_id, status, file_name")
      .eq("user_id", user.id)
      .then(({ data }) => {
        if (!active || !data || data.length === 0) return;
        const savedById = new Map(data.map((row) => [row.doc_id, row]));
        setDocuments((prev) =>
          prev.map((doc) => {
            const saved = savedById.get(doc.id);
            if (!saved) return doc;
            return { ...doc, status: saved.status as DocStatus, fileName: saved.file_name ?? undefined };
          }),
        );
      });
    return () => {
      active = false;
    };
  }, [user]);

  function openEdit() {
    setFormCitizenship(profile?.citizenship ?? undefined);
    setFormCurrentCountry(profile?.current_country ?? undefined);
    setFormCity(profile?.city ?? "");
    setFormGoal(isGoalKey(profile?.goal) ? profile.goal : null);
    setFormJobOffer(profile?.job_offer ?? null);
    setFormAlreadyAdmitted(profile?.already_admitted ?? null);
    setEditOpen(true);
  }

  async function handleSaveEdit() {
    if (!user) return;
    setSavingEdit(true);
    await supabase
      .from("profiles")
      .update({
        citizenship: formCitizenship ?? null,
        current_country: formCurrentCountry ?? null,
        city: formCity.trim() || null,
        goal: formGoal,
        job_offer: formGoal === "work" ? formJobOffer : (profile?.job_offer ?? null),
        already_admitted: formGoal === "study" ? formAlreadyAdmitted : (profile?.already_admitted ?? null),
      })
      .eq("id", user.id);
    await refreshProfile();
    setSavingEdit(false);
    setEditOpen(false);
    setToastVisible(true);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToastVisible(false), 3000);
  }

  async function confirmLogOut() {
    setLogoutConfirmOpen(false);
    await signOut();
  }

  const initials = getInitials(profile?.name, user?.email);
  const avatarUrl = (user?.user_metadata as { avatar_url?: string; picture?: string } | undefined)?.avatar_url
    ?? (user?.user_metadata as { avatar_url?: string; picture?: string } | undefined)?.picture;
  const planValue = profile?.plan ?? "free";
  const isFree = planValue === "free";
  const isPro = planValue === "pro";
  const PLAN_BADGE: Record<string, { label: string; className: string }> = {
    free: { label: t.appPricing.freeName, className: "border-white/15 bg-white/5 text-slate-300" },
    premium: { label: t.appPricing.premiumName, className: "border-accent/30 bg-accent/10 text-accent-bright" },
    pro: { label: t.appPricing.proName, className: "border-purple-400/30 bg-purple-500/10 text-purple-300" },
  };
  const planBadge = PLAN_BADGE[planValue] ?? PLAN_BADGE.free;
  const memberSince = profile?.created_at
    ? new Intl.DateTimeFormat(lang, { year: "numeric", month: "long", day: "numeric" }).format(
        new Date(profile.created_at),
      )
    : null;

  const goal = isGoalKey(profile?.goal) ? profile.goal : null;
  const goalDisplay = goal ? t.onboarding.goalOptions[goal] : null;
  const route = profile?.selected_route ?? null;
  const speedLabel = (speed: string) =>
    speed === "fast" ? t.onboarding.results.speedFast : speed === "medium" ? t.onboarding.results.speedMedium : t.onboarding.results.speedSlow;
  const difficultyLabel = (difficulty: string) =>
    difficulty === "easy"
      ? t.onboarding.results.difficultyEasy
      : difficulty === "medium"
        ? t.onboarding.results.difficultyMedium
        : t.onboarding.results.difficultyHard;

  const destinationCountryName = profile?.country
    ? (t.countries.list[COUNTRY_INDEX[profile.country]]?.name ?? profile.country)
    : null;
  const destinationFlagCode = profile?.country ? (COUNTRY_FLAG_CODE[profile.country] ?? null) : null;

  const currentStep = useMemo(
    () => checklistSteps.find((step) => !completed.has(step.documentType)) ?? null,
    [checklistSteps, completed],
  );

  return (
    <div className="px-6 py-8 lg:px-10 lg:py-10">
      <PageHeader title={p.title} subtitle={p.subtitle} />

      <div className="mt-10 max-w-2xl space-y-6">
        {/* Section 1 — Personal Info */}
        <Reveal>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <p className="text-sm font-semibold text-white">{p.personalSection}</p>
            <div className="mt-4 flex items-center gap-4">
              <span className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-accent to-accent-bright text-xl font-semibold text-white">
                {avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element -- external OAuth avatar, no static domain to configure next/image for
                  <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  initials
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-lg font-semibold text-white">{profile?.name || p.unnamed}</p>
                <p className="truncate text-sm text-slate-400">{user?.email}</p>
              </div>
              <span className={`flex-shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold ${planBadge.className}`}>
                {planBadge.label}
              </span>
            </div>
            <div className="mt-4 space-y-1 border-t border-white/10 pt-3">
              {memberSince && <InfoRow label={p.memberSinceLabel}>{memberSince}</InfoRow>}
              <div className="flex items-center justify-between gap-4 py-2.5">
                <span className="text-sm text-slate-400">{p.planLabel}</span>
                {isPro ? (
                  <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-400">
                    {p.maxPlanBadge}
                  </span>
                ) : (
                  <Link
                    href="/pricing"
                    title={p.upgradeTooltip}
                    className={`flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-white transition-colors duration-150 ${pressScale} ${
                      isFree
                        ? "bg-accent shadow-[0_0_20px_-6px_var(--accent)] hover:bg-accent-bright"
                        : "bg-purple-600 shadow-[0_0_20px_-6px_rgba(168,85,247,0.7)] hover:bg-purple-500"
                    }`}
                  >
                    {isFree ? p.upgradeBadge : p.upgradeToProBadge}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Section 2 — Relocation Profile */}
        <Reveal delay={50}>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <p className="text-sm font-semibold text-white">{p.relocationSection}</p>
            <div className="mt-2 divide-y divide-white/5">
              <InfoRow label={t.onboarding.citizenshipLabel}>
                {profile?.citizenship ? (
                  <>
                    <Image
                      src={getFlagUrl(profile.citizenship, "sm")}
                      alt=""
                      width={20}
                      height={15}
                      className="rounded-sm"
                      unoptimized
                    />
                    {getCountryName(profile.citizenship, lang)}
                  </>
                ) : (
                  <span className="text-slate-500">{p.notSet}</span>
                )}
              </InfoRow>

              <InfoRow label={t.onboarding.currentCountryLabel}>
                {profile?.current_country ? (
                  <>
                    <Image
                      src={getFlagUrl(profile.current_country, "sm")}
                      alt=""
                      width={20}
                      height={15}
                      className="rounded-sm"
                      unoptimized
                    />
                    {getCountryName(profile.current_country, lang)}
                  </>
                ) : (
                  <span className="text-slate-500">{p.notSet}</span>
                )}
              </InfoRow>

              <InfoRow label={p.destinationLabel}>
                {destinationCountryName ? (
                  <>
                    {destinationFlagCode && (
                      <Image
                        src={getFlagUrl(destinationFlagCode, "sm")}
                        alt=""
                        width={20}
                        height={15}
                        className="rounded-sm"
                        unoptimized
                      />
                    )}
                    {destinationCountryName}
                    {profile?.city ? `, ${profile.city}` : ""}
                  </>
                ) : (
                  <span className="text-slate-500">{p.notSet}</span>
                )}
              </InfoRow>

              <InfoRow label={t.onboarding.steps.goal.question}>
                {goalDisplay ?? <span className="text-slate-500">{p.notSet}</span>}
              </InfoRow>

              {goal === "work" && (
                <InfoRow label={p.jobOfferLabel}>
                  {profile?.job_offer === "yes" ? p.yes : profile?.job_offer === "no" ? p.no : (
                    <span className="text-slate-500">{p.notSet}</span>
                  )}
                </InfoRow>
              )}

              {goal === "study" && (
                <InfoRow label={p.alreadyAdmittedLabel}>
                  {profile?.already_admitted === "yes" ? p.yes : profile?.already_admitted === "no" ? p.no : (
                    <span className="text-slate-500">{p.notSet}</span>
                  )}
                </InfoRow>
              )}
            </div>

            <div className="mt-3 border-t border-white/10 pt-4">
              <p className="text-xs font-medium text-slate-500">{p.routeLabel}</p>
              {route ? (
                <div className="mt-2 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <p className="text-sm font-semibold text-white">{route.name}</p>
                  <p className="mt-1 text-xs text-slate-400">{route.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <SpeedBadge speed={route.speed} label={speedLabel(route.speed)} />
                    <DifficultyBadge difficulty={route.difficulty} label={difficultyLabel(route.difficulty)} />
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
                    <div>
                      <p className="text-slate-500">{t.onboarding.results.approvalRate}</p>
                      <p className="mt-0.5 font-semibold text-slate-200">{route.approval_rate}%</p>
                    </div>
                    <div>
                      <p className="text-slate-500">{t.onboarding.results.timeline}</p>
                      <p className="mt-0.5 font-semibold text-slate-200">{route.timeline}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">{t.onboarding.results.cost}</p>
                      <p className="mt-0.5 font-semibold text-slate-200">{route.cost}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-2 flex items-center justify-between gap-3 rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-4">
                  <span className="text-sm text-slate-500">{p.noRouteSelected}</span>
                  <Link
                    href="/onboarding/results"
                    className={`flex-shrink-0 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-white transition-colors duration-150 hover:bg-accent-bright ${pressScale}`}
                  >
                    {p.chooseRoute}
                  </Link>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={openEdit}
              className={`mt-4 w-full rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-accent-bright ${pressScale}`}
            >
              {p.editBtn}
            </button>
          </div>
        </Reveal>

        {/* Section 3 — Progress Overview */}
        <Reveal delay={100}>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white">{p.progressSection}</p>
              <span className="text-sm font-semibold text-accent-bright">
                {progressLoading ? "…" : `${progressPercent}%`}
              </span>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent to-accent-bright transition-[width] duration-700 ease-[var(--ease-out-strong)]"
                style={{ width: `${progressLoading ? 0 : progressPercent}%` }}
              />
            </div>
            <div className="mt-4 space-y-1">
              <p className="text-xs text-slate-500">
                {p.stepsCompletedLabel.replace("{completed}", String(completed.size)).replace("{total}", String(checklistSteps.length))}
              </p>
              <p className="text-sm text-slate-300">
                <span className="text-slate-500">{p.currentStepLabel}: </span>
                {currentStep ? (
                  <Link
                    href={`/dashboard#${currentStep.documentType}`}
                    className="font-medium text-white underline decoration-white/30 underline-offset-2 transition-colors duration-150 hover:text-accent-bright hover:decoration-accent-bright"
                  >
                    {currentStep.title}
                  </Link>
                ) : (
                  <span className="font-medium text-white">{p.allStepsDone}</span>
                )}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Section 4 — Documents Status */}
        <Reveal delay={150}>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white">{p.documentsSection}</p>
              <Link href="/documents" className="text-xs font-medium text-accent-bright hover:underline">
                {p.viewAllDocuments}
              </Link>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5"
                >
                  <span className="truncate text-xs font-medium text-slate-300">
                    {t.documents.docNames[doc.nameKey]}
                  </span>
                  <span
                    className={`flex-shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium ${STATUS_BADGE_CLASS[doc.status]}`}
                  >
                    {t.documents.status[doc.status]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Section 5 — Log out */}
        <Reveal delay={200}>
          <button
            type="button"
            onClick={() => setLogoutConfirmOpen(true)}
            className={`flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400 ${pressScale}`}
          >
            {p.logOut}
          </button>
        </Reveal>
      </div>

      {editOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => !savingEdit && setEditOpen(false)}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-2xl border border-white/10 bg-[#0d0d0f] p-6 shadow-2xl shadow-black/40"
          >
            <h2 className="text-lg font-bold text-white">{p.editModalTitle}</h2>

            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="text-xs text-slate-500">{t.onboarding.citizenshipLabel}</span>
                <div className="mt-1.5">
                  <SearchableCountrySelect
                    lang={lang}
                    value={formCitizenship}
                    onSelect={setFormCitizenship}
                    placeholder={t.onboarding.citizenshipPlaceholder}
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-xs text-slate-500">{t.onboarding.currentCountryLabel}</span>
                <div className="mt-1.5">
                  <SearchableCountrySelect
                    lang={lang}
                    value={formCurrentCountry}
                    onSelect={setFormCurrentCountry}
                    placeholder={t.onboarding.currentCountryPlaceholder}
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-xs text-slate-500">{p.cityLabel}</span>
                <input
                  type="text"
                  value={formCity}
                  onChange={(event) => setFormCity(event.target.value)}
                  placeholder={p.cityPlaceholder}
                  className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none transition-colors duration-150 focus:border-accent"
                />
              </label>

              <div>
                <span className="text-xs text-slate-500">{t.onboarding.steps.goal.question}</span>
                <div className="mt-1.5 grid grid-cols-2 gap-2">
                  {GOAL_KEYS.map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setFormGoal(key)}
                      className={`rounded-xl border px-3 py-2 text-left text-xs font-medium transition-colors duration-150 ${
                        formGoal === key
                          ? "border-accent/50 bg-accent/10 text-accent-bright"
                          : "border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {t.onboarding.goalOptions[key]}
                    </button>
                  ))}
                </div>
              </div>

              {formGoal === "work" && (
                <div>
                  <span className="text-xs text-slate-500">{p.jobOfferLabel}</span>
                  <div className="mt-1.5 flex gap-2">
                    {(["yes", "no"] as const).map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setFormJobOffer(value)}
                        className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition-colors duration-150 ${
                          formJobOffer === value
                            ? "border-accent/50 bg-accent/10 text-accent-bright"
                            : "border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {value === "yes" ? p.yes : p.no}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {formGoal === "study" && (
                <div>
                  <span className="text-xs text-slate-500">{p.alreadyAdmittedLabel}</span>
                  <div className="mt-1.5 flex gap-2">
                    {(["yes", "no"] as const).map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setFormAlreadyAdmitted(value)}
                        className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition-colors duration-150 ${
                          formAlreadyAdmitted === value
                            ? "border-accent/50 bg-accent/10 text-accent-bright"
                            : "border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {value === "yes" ? p.yes : p.no}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setEditOpen(false)}
                disabled={savingEdit}
                className={`flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-300 transition-colors duration-150 hover:border-white/30 hover:text-white disabled:opacity-60 ${pressScale}`}
              >
                {t.common.cancelBtn}
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                disabled={savingEdit}
                className={`flex-1 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-accent-bright disabled:opacity-60 ${pressScale}`}
              >
                {p.saveBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {toastVisible && (
        <div className="animate-slide-up fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 shadow-xl shadow-black/40 backdrop-blur-xl">
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
            <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.6 3.6 6.7-6.7a1 1 0 011.4 0z" />
            </svg>
          </span>
          <p className="text-sm font-semibold text-emerald-300">{p.saved}</p>
        </div>
      )}

      <LogoutConfirmModal
        open={logoutConfirmOpen}
        onClose={() => setLogoutConfirmOpen(false)}
        onConfirm={confirmLogOut}
      />
    </div>
  );
}
