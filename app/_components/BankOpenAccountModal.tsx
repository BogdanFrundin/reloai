"use client";

import { createPortal } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { DocumentGuide } from "./DocumentGuideList";
import { useLanguage } from "./LanguageProvider";
import { getBankAccountInfo } from "../_lib/bankAccountInfo";
import StarRating from "./StarRating";
import { pressScale } from "../_lib/motion";

// Reuse the same avatar logic as BankCardGrid/BankCardModal.
const BANK_DOMAINS: Record<string, string> = {
  "aion bank": "aionbank.pl",
  "alior bank": "aliorbank.pl",
  "bank millennium": "bankmillennium.pl",
  "bank pekao": "pekao.com.pl",
  "pko bank polski": "pkobp.pl",
  "pko bp": "pkobp.pl",
  "mbank": "mbank.pl",
  "ing bank śląski": "ing.pl",
  "ing bank slaski": "ing.pl",
  "santander": "santander.pl",
  "bnp paribas": "bnpparibas.pl",
  "citi handlowy": "citibank.pl",
  "credit agricole": "credit-agricole.pl",
  "bank ochrony środowiska": "bosbank.pl",
  "boś bank": "bosbank.pl",
  "nest bank": "nestbank.pl",
  "velobank": "velobank.pl",
  "revolut": "revolut.com",
  "n26": "n26.com",
  "erste": "erstebank.com",
  "plus bank": "plusbank.pl",
  "toyota bank": "toyotabank.pl",
  "volkswagen bank": "vwbank.pl",
  "bank pocztowy": "pocztowy.pl",
};

const LOCAL_LOGO_SLUGS = new Set([
  "aionbank",
  "bnpparibas",
  "creditagricole",
  "erstebank",
  "plusbank",
  "pocztowy",
  "toyotabank",
  "vwbank",
]);

function findLogoDomain(name: string): string | null {
  const lower = name.toLowerCase();
  for (const [key, domain] of Object.entries(BANK_DOMAINS)) {
    if (lower.includes(key)) return domain;
  }
  return null;
}

function bankLogoSlug(domain: string): string {
  return domain.split(".")[0].replace(/[^a-z0-9]/gi, "").toLowerCase();
}

function BankAvatar({ name }: { name: string }) {
  const domain = findLogoDomain(name);
  const hasLocal = domain ? LOCAL_LOGO_SLUGS.has(bankLogoSlug(domain)) : false;
  const src = domain
    ? hasLocal
      ? `/images/logos/banks/${bankLogoSlug(domain)}.png`
      : `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
    : null;
  const initials = name
    .replace(/^Bank\s+/i, "")
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (src) {
    return (
      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white/95 p-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={name} className="h-full w-full object-contain" />
      </div>
    );
  }
  return (
    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-base font-semibold text-accent-bright">
      {initials}
    </div>
  );
}

export default function BankOpenAccountModal({
  guide,
  open,
  onClose,
}: {
  guide: DocumentGuide | null;
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const { t } = useLanguage();
  const gc = t.guideCard;
  const bk = t.banks;

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open || !guide) return null;

  // The verified, sourced deep-link (app/_lib/bankAccountInfo.ts) takes
  // priority over the generic Supabase `online_url`, which isn't always the
  // actual application page — see that file's header comment.
  const accountInfo = getBankAccountInfo(guide.name);
  const rawLink = accountInfo?.onlineUrl || guide.online_url || guide.links?.[0];
  const link = rawLink ? (rawLink.startsWith("http") ? rawLink : `https://${rawLink}`) : null;

  function askAi() {
    if (!guide) return;
    const question = gc.askAiBankQuestionTemplate.replace("{name}", guide.name);
    router.push(`/dashboard/ai?q=${encodeURIComponent(question)}`);
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      style={{ animation: "fadeInOpenAcc 150ms ease-out" }}
    >
      <style>{`
        @keyframes fadeInOpenAcc { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleInOpenAcc { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      `}</style>
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex w-full max-w-xl flex-col max-h-[90vh] overflow-hidden rounded-2xl border border-border-subtle bg-panel shadow-2xl shadow-black/40"
        style={{ animation: "scaleInOpenAcc 200ms ease-out" }}
      >
        {/* Header */}
        <div className="border-b border-border-subtle bg-panel px-5 py-5 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <BankAvatar name={guide.name} />
            <div className="min-w-0 flex-1">
              <p className="text-lg sm:text-xl font-bold text-text-primary truncate">{guide.name}</p>
              {guide.rating != null && (
                <div className="mt-1 flex items-center gap-1">
                  <StarRating rating={guide.rating} />
                </div>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex-shrink-0 rounded-lg border border-transparent p-1.5 text-text-muted transition-colors hover:text-text-primary"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {/* Top CTA */}
          {link ? (
            <div className="rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/15 via-accent/5 to-transparent p-4 sm:p-5">
              <p className="text-sm leading-relaxed text-text-secondary">{bk.openAccountIntro}</p>
              {accountInfo?.visitNote && (
                <p className="mt-2 text-xs leading-relaxed text-amber-300/90">{accountInfo.visitNote}</p>
              )}
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}
                className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent/30 transition-colors duration-150 hover:bg-accent-bright ${pressScale}`}
              >
                {bk.proceedToRegistration}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          ) : (
            <div className="rounded-2xl border border-border-subtle bg-surface-hover p-4 sm:p-5">
              <p className="text-sm leading-relaxed text-text-secondary">{bk.openAccountIntro}</p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  askAi();
                }}
                className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-700 px-5 py-3.5 text-sm font-bold text-white transition-colors duration-150 hover:bg-slate-600 ${pressScale}`}
              >
                {gc.askAi} ✦
              </button>
            </div>
          )}

          {/* Steps */}
          {guide.instructions && guide.instructions.length > 0 && (
            <div className="mt-5">
              <p className="font-semibold text-sm sm:text-base text-text-primary">{gc.howToApply}</p>
              <ol className="mt-3 space-y-2.5">
                {guide.instructions.map((step, i) => (
                  <li key={step} className="flex items-start gap-3 rounded-xl border border-border-subtle bg-surface-hover p-3 text-sm text-text-secondary">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent-bright">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Required docs */}
          {guide.required_docs && guide.required_docs.length > 0 && (
            <div className="mt-5 border-t border-white/10 pt-5">
              <p className="font-semibold text-sm sm:text-base text-text-primary">{gc.requiredDocs}</p>
              <ul className="mt-2.5 space-y-1.5">
                {guide.required_docs.map((doc) => (
                  <li key={doc} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent-bright" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tips */}
          {guide.tips && guide.tips.length > 0 && (
            <div className="mt-5 border-t border-white/10 pt-5">
              <p className="font-semibold text-sm sm:text-base text-text-primary">{gc.tips}</p>
              <ul className="mt-2.5 space-y-1.5">
                {guide.tips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent-bright" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Common mistakes */}
          {guide.common_mistakes && guide.common_mistakes.length > 0 && (
            <div className="mt-5 border-t border-white/10 pt-5 pb-1">
              <p className="font-semibold text-sm sm:text-base text-red-300/90">{gc.commonMistakes}</p>
              <ul className="mt-2.5 space-y-1.5">
                {guide.common_mistakes.map((mistake) => (
                  <li key={mistake} className="flex items-start gap-2 text-sm text-red-300">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-red-400" />
                    {mistake}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border-subtle px-5 py-4 flex gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              askAi();
            }}
            className={`flex-1 rounded-full bg-slate-700 px-5 py-2.5 text-xs font-semibold text-white transition-colors duration-150 hover:bg-slate-600 ${pressScale}`}
          >
            {gc.askAi} ✦
          </button>
          <button
            type="button"
            onClick={onClose}
            className={`flex-1 rounded-full border border-border-strong bg-surface-1 px-5 py-2.5 text-xs font-semibold text-text-secondary transition-colors duration-150 hover:border-border-strong hover:text-text-primary ${pressScale}`}
          >
            {t.dashboard.collapseBtn} ^
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
