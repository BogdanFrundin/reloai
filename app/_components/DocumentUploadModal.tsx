"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "./LanguageProvider";
import { pressScale } from "../_lib/motion";

const CAMERA_ICON = (
  <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.174C3.005 7.58 2.25 8.507 2.25 9.574v9.176c0 1.24 1.01 2.25 2.25 2.25h15c1.24 0 2.25-1.01 2.25-2.25V9.574c0-1.067-.755-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.174 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Show an actual thumbnail of what the person is about to upload instead
  // of just the bare filename — image object URLs only, PDFs and other
  // scans still fall back to the filename + camera icon. Revoked on every
  // change/unmount so swapping files (or closing the modal) doesn't leak
  // blob URLs.
  useEffect(() => {
    if (!selectedFile || !selectedFile.type.startsWith("image/")) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

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
        className="relative flex w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-border-subtle bg-panel shadow-2xl shadow-black/40 transition-[opacity,transform] duration-150 ease-[var(--ease-out-strong)] starting:opacity-0 starting:scale-95 md:flex-row"
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label={t.aiChat.closeAria}
          className="absolute right-6 top-6 z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-border-subtle bg-surface-1 text-text-muted transition-colors duration-150 hover:border-border-strong hover:text-text-primary"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex-1 p-9 sm:p-12">
          <h2 className="pr-14 text-4xl font-bold text-text-primary">{docName}</h2>
          <p className="mt-3 text-base leading-relaxed text-text-secondary">{guideText}</p>

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className={`mt-9 flex w-full flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-border-strong bg-surface-1 text-center transition-colors duration-150 hover:border-accent/40 ${
              previewUrl ? "p-4" : "px-6 py-16"
            }`}
          >
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- object URL, not a static/remote asset next/image can optimize
              <img
                src={previewUrl}
                alt={selectedFile?.name ?? ""}
                className="max-h-64 w-full rounded-2xl border border-border-subtle object-contain"
              />
            ) : (
              <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-accent/15 text-accent-bright">
                {CAMERA_ICON}
              </span>
            )}
            <span className="truncate text-base font-semibold text-text-primary">
              {selectedFile ? selectedFile.name : d.dropzoneLabel}
            </span>
            {!selectedFile && <span className="text-sm text-text-muted">{d.dropzoneHint}</span>}
          </button>

          <input ref={inputRef} type="file" className="hidden" onChange={handleFileChange} />

          <div className="mt-7 flex gap-4">
            <button
              type="button"
              onClick={handleClose}
              className={`flex-1 rounded-full border border-border-strong bg-surface-1 px-7 py-4 text-base font-semibold text-text-secondary transition-colors duration-150 hover:border-border-strong hover:text-text-primary ${pressScale}`}
            >
              {t.documents.cancelBtn}
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!selectedFile}
              className={`flex-1 rounded-full bg-accent px-7 py-4 text-base font-semibold text-white transition-colors duration-150 hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-40 ${pressScale}`}
            >
              {d.confirmBtn}
            </button>
          </div>
        </div>

        <div className="hidden w-[27rem] flex-shrink-0 border-l border-border-subtle bg-surface-1 p-9 md:block">
          <p className="text-sm font-semibold text-text-muted">Пример скана</p>
          <div className="relative mt-4 overflow-hidden rounded-2xl border border-border-subtle bg-surface-2 p-6">
            <div className="flex items-center gap-4">
              <div className="h-20 w-16 flex-shrink-0 rounded-lg bg-surface-hover" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-3/4 rounded-full bg-surface-hover" />
                <div className="h-3 w-1/2 rounded-full bg-surface-hover" />
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <div className="h-3 w-full rounded-full bg-surface-hover" />
              <div className="h-3 w-5/6 rounded-full bg-surface-hover" />
              <div className="h-3 w-2/3 rounded-full bg-surface-hover" />
              <div className="h-3 w-4/5 rounded-full bg-surface-hover" />
            </div>
            <span className="pointer-events-none absolute -right-10 top-7 rotate-45 bg-accent/20 px-14 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-bright">
              Образец
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-text-muted">
            Сфотографируйте документ целиком, без бликов, все поля должны быть чётко видны.
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
