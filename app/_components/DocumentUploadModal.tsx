"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "./LanguageProvider";
import { pressScale } from "../_lib/motion";

const UPLOAD_ICON = (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 16.5V9.75m0 0l-3 3m3-3l3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
    />
  </svg>
);

export default function DocumentUploadModal({
  open,
  docName,
  guideText,
  onClose,
  onConfirm,
}: {
  open: boolean;
  docName: string;
  guideText: string;
  onClose: () => void;
  onConfirm: (file: File) => void;
}) {
  const { t } = useLanguage();
  const d = t.documents.uploadModal;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // `open` only ever becomes true from a client-side click after hydration,
  // so document.body is always available here — no mount-detection needed.
  if (!open) return null;

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) setSelectedFile(file);
  }

  function handleClose() {
    setSelectedFile(null);
    onClose();
  }

  function handleConfirm() {
    if (!selectedFile) return;
    onConfirm(selectedFile);
    setSelectedFile(null);
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={handleClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-[opacity] duration-150 ease-[var(--ease-out-strong)] starting:opacity-0"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-md rounded-2xl border border-border-subtle bg-panel p-6 shadow-2xl shadow-black/40 transition-[opacity,transform] duration-150 ease-[var(--ease-out-strong)] starting:opacity-0 starting:scale-95"
      >
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-bold text-text-primary">{docName}</h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label={t.aiChat.closeAria}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-border-subtle bg-surface-1 text-text-muted transition-colors duration-150 hover:border-border-strong hover:text-text-primary"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-4 rounded-xl border border-accent/20 bg-accent/[0.05] p-4">
          <p className="text-sm leading-relaxed text-text-secondary">{guideText}</p>
        </div>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-4 flex w-full flex-col items-center gap-2 rounded-xl border-2 border-dashed border-border-strong bg-surface-1 px-4 py-6 text-center transition-colors duration-150 hover:border-accent/40"
        >
          <span className="text-text-muted">{UPLOAD_ICON}</span>
          <span className="truncate text-sm font-medium text-text-primary">
            {selectedFile ? selectedFile.name : d.dropzoneLabel}
          </span>
          {!selectedFile && <span className="text-xs text-text-muted">{d.dropzoneHint}</span>}
        </button>

        <input ref={inputRef} type="file" className="hidden" onChange={handleFileChange} />

        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={handleClose}
            className={`flex-1 rounded-full border border-border-strong bg-surface-1 px-5 py-2.5 text-sm font-semibold text-text-secondary transition-colors duration-150 hover:border-border-strong hover:text-text-primary ${pressScale}`}
          >
            {t.documents.cancelBtn}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!selectedFile}
            className={`flex-1 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-40 ${pressScale}`}
          >
            {d.confirmBtn}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
