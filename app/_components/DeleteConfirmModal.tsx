"use client";

import { useLanguage } from "./LanguageProvider";
import { pressScale } from "../_lib/motion";

export default function DeleteConfirmModal({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const { t } = useLanguage();

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-[opacity] duration-150 ease-[var(--ease-out-strong)] starting:opacity-0"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#0d0d0f] p-6 text-center shadow-2xl shadow-black/40 transition-[opacity,transform] duration-150 ease-[var(--ease-out-strong)] starting:opacity-0 starting:scale-95"
      >
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/15 text-red-400">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </span>
        <h2 className="mt-4 text-lg font-bold text-white">{t.documents.deleteConfirmTitle}</h2>
        <p className="mt-2 text-sm text-slate-400">{t.documents.deleteConfirmBody}</p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className={`flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-300 transition-colors duration-150 hover:border-white/30 hover:text-white ${pressScale}`}
          >
            {t.documents.cancelBtn}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`flex-1 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-red-500 ${pressScale}`}
          >
            {t.documents.deleteBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
