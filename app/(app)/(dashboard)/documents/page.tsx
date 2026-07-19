"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Reveal from "../../../_components/Reveal";
import RegisterPromptModal from "../../../_components/RegisterPromptModal";
import SectionCompleteModal from "../../../_components/SectionCompleteModal";
import DeleteConfirmModal from "../../../_components/DeleteConfirmModal";
import { pressScale } from "../../../_lib/motion";
import { useLanguage } from "../../../_components/LanguageProvider";
import { useAuth } from "../../../_components/AuthProvider";
import { supabase } from "../../../../lib/supabase";
import { DOCUMENT_CATALOG, STATUS_BADGE_CLASS, type DocumentItem, type DocStatus } from "../../../_lib/documents";

type Category = "all" | DocumentItem["category"];
type Status = DocStatus;

const TABS: Category[] = ["all", "passport", "pesel", "workPermit", "insurance", "bank"];

const INITIAL_DOCUMENTS: DocumentItem[] = DOCUMENT_CATALOG;

function isCategoryComplete(docs: DocumentItem[], category: DocumentItem["category"]): boolean {
  const inCategory = docs.filter((doc) => doc.category === category && doc.status !== "locked");
  return inCategory.length > 0 && inCategory.every((doc) => doc.status !== "missing");
}

function UploadZone({
  doc,
  name,
  uploadLabel,
  onUpload,
  demoMode,
  onDemoBlocked,
}: {
  doc: DocumentItem;
  name: string;
  uploadLabel: string;
  onUpload: (id: string, file: File) => void;
  demoMode: boolean;
  onDemoBlocked: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleActivate() {
    if (demoMode) {
      onDemoBlocked();
      return;
    }
    inputRef.current?.click();
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleActivate}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") handleActivate();
      }}
      className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.02] p-6 text-center transition-colors duration-150 hover:border-accent/40 hover:bg-accent/5 ${pressScale}`}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onUpload(doc.id, file);
        }}
      />
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-slate-400">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0L7 9m5-5l5 5M5 20h14" />
        </svg>
      </span>
      <p className="text-sm font-semibold text-white">{name}</p>
      <p className="text-xs text-slate-500">{uploadLabel}</p>
    </div>
  );
}

export default function DocumentsPage() {
  const { t } = useLanguage();
  const { user, profile } = useAuth();
  const demoMode = !user;
  const [activeTab, setActiveTab] = useState<Category>("all");
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [promptOpen, setPromptOpen] = useState(false);
  const [sectionCompleteOpen, setSectionCompleteOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!user) {
      setDocuments(INITIAL_DOCUMENTS);
      return;
    }
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
            return { ...doc, status: saved.status as Status, fileName: saved.file_name ?? undefined };
          }),
        );
      });

    return () => {
      active = false;
    };
  }, [user]);

  const STATUS_BADGE: Record<Status, { label: string; className: string }> = {
    verified: { label: t.documents.status.verified, className: STATUS_BADGE_CLASS.verified },
    pending: { label: t.documents.status.pending, className: STATUS_BADGE_CLASS.pending },
    missing: { label: t.documents.status.missing, className: STATUS_BADGE_CLASS.missing },
    locked: { label: t.documents.status.locked, className: STATUS_BADGE_CLASS.locked },
  };

  function showAutoCompleteToast() {
    setToastVisible(true);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToastVisible(false), 3000);
  }

  async function syncDocumentStatus(doc: DocumentItem) {
    if (!user) return;
    await supabase.from("documents").upsert(
      {
        user_id: user.id,
        doc_id: doc.id,
        status: doc.status,
        file_name: doc.fileName ?? null,
      },
      { onConflict: "user_id,doc_id" },
    );
  }

  async function syncProgress(docs: DocumentItem[]) {
    if (!user) return;
    const relevant = docs.filter((doc) => doc.status !== "locked");
    const completedCount = relevant.filter((doc) => doc.status !== "missing").length;
    await supabase.from("progress").upsert(
      {
        user_id: user.id,
        country: profile?.country ?? null,
        document_type: "documents",
        steps_completed: completedCount,
        total_steps: relevant.length,
      },
      { onConflict: "user_id,document_type" },
    );
  }

  function handleUpload(id: string, file: File) {
    const doc = documents.find((d) => d.id === id);
    if (!doc) return;

    const updated: DocumentItem = { ...doc, status: "verified", fileName: file.name };
    const next = documents.map((d) => (d.id === id ? updated : d));
    setDocuments(next);

    if (!isCategoryComplete(documents, doc.category) && isCategoryComplete(next, doc.category)) {
      setSectionCompleteOpen(true);
    }
    showAutoCompleteToast();
    syncDocumentStatus(updated);
    syncProgress(next);
  }

  function handleDelete(id: string) {
    const doc = documents.find((d) => d.id === id);
    if (!doc) return;

    const updated: DocumentItem = { ...doc, status: "missing", fileName: undefined };
    const next = documents.map((d) => (d.id === id ? updated : d));
    setDocuments(next);
    syncDocumentStatus(updated);
    syncProgress(next);
  }

  function confirmDelete() {
    if (deleteTargetId) handleDelete(deleteTargetId);
    setDeleteTargetId(null);
  }

  const filtered =
    activeTab === "all" ? documents : documents.filter((doc) => doc.category === activeTab);

  return (
    <div className="px-6 py-8 lg:px-10 lg:py-10">
      <Reveal>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t.documents.title}</h1>
        <p className="mt-2 text-slate-400">{t.documents.subtitle}</p>
      </Reveal>

      <Reveal delay={60}>
        <div className="mt-6 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                activeTab === tab
                  ? "border-accent/50 bg-accent/10 text-accent-bright"
                  : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {t.documents.tabs[tab]}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((doc, index) => {
          const name = t.documents.docNames[doc.nameKey];

          if (doc.status === "missing") {
            return (
              <Reveal key={doc.id} delay={index * 40}>
                <UploadZone
                  doc={doc}
                  name={name}
                  uploadLabel={t.documents.upload}
                  onUpload={handleUpload}
                  demoMode={demoMode}
                  onDemoBlocked={() => setPromptOpen(true)}
                />
              </Reveal>
            );
          }

          if (doc.status === "locked") {
            return (
              <Reveal key={doc.id} delay={index * 40}>
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="pointer-events-none select-none blur-sm">
                    <p className="text-sm font-semibold text-white">{name}</p>
                    <p className="mt-1 text-xs text-slate-500">{t.documents.tabs[doc.category]}</p>
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50 p-4 text-center backdrop-blur-sm">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-accent-bright">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 0h10.5a1.5 1.5 0 011.5 1.5v7.5a1.5 1.5 0 01-1.5 1.5h-10.5a1.5 1.5 0 01-1.5-1.5v-7.5a1.5 1.5 0 011.5-1.5z" />
                      </svg>
                    </span>
                    <p className="text-xs font-medium text-slate-300">{name}</p>
                    {demoMode ? (
                      <button
                        type="button"
                        onClick={() => setPromptOpen(true)}
                        className={`mt-1 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-white transition-colors duration-150 hover:bg-accent-bright ${pressScale}`}
                      >
                        {t.documents.unlockBtn}
                      </button>
                    ) : (
                      <Link
                        href="/pricing"
                        className={`mt-1 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-white transition-colors duration-150 hover:bg-accent-bright ${pressScale}`}
                      >
                        {t.documents.unlockBtn}
                      </Link>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          }

          const badge = STATUS_BADGE[doc.status];

          return (
            <Reveal key={doc.id} delay={index * 40}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-white">{name}</p>
                    <span
                      className={`flex-shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-medium ${badge.className}`}
                    >
                      {doc.status === "verified" && (
                        <svg className="mr-0.5 -mt-0.5 inline h-2.5 w-2.5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.6 3.6 6.7-6.7a1 1 0 011.4 0z" />
                        </svg>
                      )}
                      {badge.label}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {doc.fileName ?? t.documents.tabs[doc.category]}
                  </p>
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    className={`flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:border-accent/40 hover:text-accent-bright ${pressScale}`}
                  >
                    {t.documents.viewBtn}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTargetId(doc.id)}
                    className={`rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-400 transition-colors duration-150 hover:border-red-500/40 hover:text-red-400 ${pressScale}`}
                  >
                    {t.documents.deleteBtn}
                  </button>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {toastVisible && (
        <div className="animate-slide-up fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 shadow-xl shadow-black/40 backdrop-blur-xl">
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
            <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.6 3.6 6.7-6.7a1 1 0 011.4 0z" />
            </svg>
          </span>
          <p className="text-sm font-semibold text-emerald-300">{t.documents.autoCompleteToast}</p>
        </div>
      )}

      <RegisterPromptModal open={promptOpen} onClose={() => setPromptOpen(false)} />
      <SectionCompleteModal open={sectionCompleteOpen} onClose={() => setSectionCompleteOpen(false)} />
      <DeleteConfirmModal
        open={deleteTargetId !== null}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
