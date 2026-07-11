"use client";

import { useLanguage } from "./LanguageProvider";

function daysSince(dateString: string): number {
  const created = new Date(dateString).getTime();
  const elapsedMs = Date.now() - created;
  return Math.floor(elapsedMs / (1000 * 60 * 60 * 24));
}

export default function VisaCountdownBanner({ createdAt }: { createdAt: string }) {
  const { t } = useLanguage();
  const c = t.dashboard.countdown;
  const daysRemaining = Math.max(0, 30 - daysSince(createdAt));
  const expired = daysRemaining === 0;

  return (
    <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/15 p-4">
      <svg
        className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.75}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m0 3.75h.008v.008H12v-.008zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div>
        <p className="text-sm font-semibold text-amber-400">{c.heading}</p>
        <p className="mt-1 text-xs text-amber-200/80">
          {expired ? c.expired : c.remaining.replace("{days}", String(daysRemaining))}
        </p>
      </div>
    </div>
  );
}
