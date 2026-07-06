"use client";

import { useLanguage } from "./LanguageProvider";

const MOCK_STEPS_DONE = [true, true, true, false, false];

export default function DashboardMockup() {
  const { t } = useLanguage();

  const stepTitles = [
    t.dashboard.steps.account.title,
    t.dashboard.steps.onboarding.title,
    t.dashboard.steps.documents.title,
    t.dashboard.steps.biometric.title,
    t.dashboard.steps.residence.title,
  ];

  const percent = Math.round(
    (MOCK_STEPS_DONE.filter(Boolean).length / MOCK_STEPS_DONE.length) * 100,
  );

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/40 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <p className="text-sm font-semibold text-white">
            🇵🇱 {t.dashboard.relocation.replace("{country}", "Poland")}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">{t.dashboard.subtitle}</p>
        </div>
        <span className="text-lg font-bold text-accent-bright">{percent}%</span>
      </div>

      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-bright"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="mt-5 space-y-2.5">
        {MOCK_STEPS_DONE.map((done, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 rounded-xl border p-3 transition-[opacity,transform] duration-300 ease-[var(--ease-out-strong)] starting:opacity-0 starting:translate-y-2 ${
              done ? "border-emerald-500/30 bg-emerald-500/[0.04]" : "border-white/10 bg-white/[0.03]"
            }`}
          >
            <span
              className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border ${
                done ? "border-accent bg-accent text-white" : "border-white/20 bg-white/5"
              }`}
            >
              {done && (
                <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.6 3.6 6.7-6.7a1 1 0 011.4 0z" />
                </svg>
              )}
            </span>
            <p className={`text-xs font-medium ${done ? "text-slate-300" : "text-white"}`}>{stepTitles[index]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
