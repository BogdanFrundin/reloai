"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Reveal from "../../../_components/Reveal";
import RegisterPromptModal from "../../../_components/RegisterPromptModal";
import SectionCompleteModal from "../../../_components/SectionCompleteModal";
import DeleteConfirmModal from "../../../_components/DeleteConfirmModal";
import UpgradeModal from "../../../_components/UpgradeModal";
import DocumentUploadModal from "../../../_components/DocumentUploadModal";
import { pressScale } from "../../../_lib/motion";
import { useLanguage } from "../../../_components/LanguageProvider";
import { useAuth } from "../../../_components/AuthProvider";
import { createNotification } from "../../../_lib/notifications";
import { supabase } from "../../../../lib/supabase";
import { DOCUMENT_CATALOG, STATUS_BADGE_CLASS, type DocumentItem, type DocStatus } from "../../../_lib/documents";
import DocumentGuideList, { guideAppliesTo, type DocumentGuide } from "../../../_components/DocumentGuideList";

type Category = "all" | DocumentItem["category"];
type Status = DocStatus;

const TABS: Category[] = [
  "all",
  "passport",
  "pesel",
  "workPermit",
  "insurance",
  "bank",
  "biometric",
  "address",
  "residencePermit",
  "taxId",
  "employment",
  "business",
];
const CATEGORIES: DocumentItem["category"][] = [
  "passport",
  "pesel",
  "workPermit",
  "insurance",
  "bank",
  "biometric",
  "address",
  "residencePermit",
  "taxId",
  "employment",
  "business",
];

const CATEGORY_EMOJI: Record<DocumentItem["category"], string> = {
  passport: "🪪",
  pesel: "📋",
  workPermit: "💼",
  insurance: "🛡️",
  bank: "🏦",
  biometric: "🧬",
  address: "🏠",
  residencePermit: "🪪",
  taxId: "🧾",
  employment: "📝",
  business: "🏢",
};

const STATUS_BORDER_CLASS: Record<Status, string> = {
  verified: "border-l-emerald-500",
  pending: "border-l-amber-500",
  missing: "border-l-border-strong",
  locked: "border-l-accent/40",
};

const INITIAL_DOCUMENTS: DocumentItem[] = DOCUMENT_CATALOG;

const LOCK_ICON = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 0h10.5a1.5 1.5 0 011.5 1.5v7.5a1.5 1.5 0 01-1.5 1.5h-10.5a1.5 1.5 0 01-1.5-1.5v-7.5a1.5 1.5 0 011.5-1.5z"
    />
  </svg>
);

const CHECK_ICON = (
  <svg className="mr-0.5 -mt-0.5 inline h-2.5 w-2.5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.6 3.6 6.7-6.7a1 1 0 011.4 0z" />
  </svg>
);

const TRASH_ICON = (
  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m2 0v13a2 2 0 01-2 2H8a2 2 0 01-2-2V7h12z" />
  </svg>
);

const ARROW_ICON = (
  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const CATEGORY_TO_STEP: Record<string, string> = {
  biometric: "biometric",
  address: "address_registration",
  residencePermit: "residence_permit",
  taxId: "tax_id",
  employment: "employment_registration",
  business: "business_registration",
};

function isCategoryComplete(docs: DocumentItem[], category: DocumentItem["category"]): boolean {
  const inCategory = docs.filter((doc) => doc.category === category && doc.status !== "locked");
  return inCategory.length > 0 && inCategory.every((doc) => doc.status !== "missing");
}

function DocumentRow({
  doc,
  name,
  hint,
  guideText,
  badge,
  viewLabel,
  uploadLabel,
  deleteLabel,
  onUpload,
  onView,
  onDelete,
  demoMode,
  onDemoBlocked,
}: {
  doc: DocumentItem;
  name: string;
  hint: string;
  guideText: string;
  badge: { label: string; className: string };
  viewLabel: string;
  uploadLabel: string;
  deleteLabel: string;
  onUpload: (id: string, file: File) => void;
  onView: (doc: DocumentItem) => void;
  onDelete: (id: string) => void;
  demoMode: boolean;
  onDemoBlocked: () => void;
}) {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  function handleUploadClick() {
    if (demoMode) {
      onDemoBlocked();
      return;
    }
    setUploadModalOpen(true);
  }

  return (
    <div
      className={`group flex items-center gap-4 border-b border-l-4 border-border-subtle py-4 pl-4 transition-colors duration-150 last:border-b-0 hover:bg-surface-hover ${STATUS_BORDER_CLASS[doc.status]}`}
    >
      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-surface-1 text-base">
        {CATEGORY_EMOJI[doc.category]}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-text-primary transition-colors duration-150 group-hover:text-accent-bright">{name}</p>
        <p className="mt-0.5 truncate text-xs text-text-muted">{doc.fileName ?? hint}</p>
      </div>
      <span className={`flex-shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-medium ${badge.className}`}>
        {doc.status === "verified" && CHECK_ICON}
        {badge.label}
      </span>
      <div className="flex flex-shrink-0 items-center gap-2">
        {doc.status === "missing" ? (
          <button
            type="button"
            onClick={handleUploadClick}
            className={`flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-white transition-colors duration-150 hover:bg-accent-bright ${pressScale}`}
          >
            {uploadLabel}
            {ARROW_ICON}
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={() => onView(doc)}
              disabled={!doc.storagePath}
              className={`rounded-full border border-border-strong bg-surface-1 px-4 py-1.5 text-xs font-semibold text-text-primary transition-colors duration-150 hover:border-accent/40 hover:text-accent-bright disabled:cursor-not-allowed disabled:opacity-40 ${pressScale}`}
            >
              {viewLabel}
            </button>
            <button
              type="button"
              aria-label={deleteLabel}
              onClick={() => onDelete(doc.id)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-600 transition-colors duration-150 hover:text-red-400"
            >
              {TRASH_ICON}
            </button>
          </>
        )}
      </div>
      <DocumentUploadModal
        open={uploadModalOpen}
        docName={name}
        guideText={guideText}
        onClose={() => setUploadModalOpen(false)}
        onConfirm={(file) => {
          onUpload(doc.id, file);
          setUploadModalOpen(false);
        }}
      />
    </div>
  );
}

function LockedRow({
  name,
  hint,
  lockedLabel,
  demoMode,
  onDemoBlocked,
  onUpgradeClick,
}: {
  name: string;
  hint: string;
  lockedLabel: string;
  demoMode: boolean;
  onDemoBlocked: () => void;
  onUpgradeClick: () => void;
}) {
  const content = (
    <>
      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-surface-1 text-text-muted">
        {LOCK_ICON}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-text-muted">{name}</p>
        <p className="mt-0.5 truncate text-xs text-slate-600">{hint}</p>
      </div>
      <span className="flex-shrink-0 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent-bright">
        {lockedLabel}
      </span>
    </>
  );

  const className = `flex w-full items-center gap-4 border-b border-l-4 border-border-subtle py-4 pl-4 text-left opacity-60 transition-opacity duration-150 last:border-b-0 hover:opacity-90 ${STATUS_BORDER_CLASS.locked}`;

  if (demoMode) {
    return (
      <button type="button" onClick={onDemoBlocked} className={className}>
        {content}
      </button>
    );
  }

  return (
    <button type="button" onClick={onUpgradeClick} className={className}>
      {content}
    </button>
  );
}

export default function DocumentsPage() {
  const { t } = useLanguage();
  const { user, profile } = useAuth();
  const demoMode = !user;
  const [activeTab, setActiveTab] = useState<Category>("all");
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [promptOpen, setPromptOpen] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [sectionCompleteOpen, setSectionCompleteOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [guides, setGuides] = useState<DocumentGuide[]>([]);
  const [guidesLoading, setGuidesLoading] = useState(true);
  const [guideCategory, setGuideCategory] = useState<string>("all");

  useEffect(() => {
    let active = true;
    // Legalization/visa/business/etc. guides live in document_guides under
    // every category except "финансы" (banks) and "медицина" (insurance) —
    // those have their own dedicated pages. See banks/page.tsx and insurance/page.tsx.
    supabase
      .from("document_guides")
      .select("*")
      .not("category", "in", "(финансы,медицина)")
      .order("category")
      .order("name")
      .then(({ data }) => {
        if (!active) return;
        setGuides((data as DocumentGuide[]) ?? []);
        setGuidesLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const visibleGuides = useMemo(
    () => guides.filter((g) => guideAppliesTo(g, profile?.citizenship)),
    [guides, profile?.citizenship],
  );

  const guideCategories = useMemo(() => {
    const seen = new Set<string>();
    const list: string[] = [];
    for (const g of visibleGuides) {
      if (!seen.has(g.category)) {
        seen.add(g.category);
        list.push(g.category);
      }
    }
    return list;
  }, [visibleGuides]);

  const filteredGuides =
    guideCategory === "all" ? visibleGuides : visibleGuides.filter((g) => g.category === guideCategory);

  useEffect(() => {
    if (!user) {
      setDocuments(INITIAL_DOCUMENTS);
      return;
    }
    let active = true;

    supabase
      .from("documents")
      .select("doc_id, status, file_name, storage_path")
      .eq("user_id", user.id)
      .then(({ data }) => {
        if (!active || !data || data.length === 0) return;
        const savedById = new Map(data.map((row) => [row.doc_id, row]));
        setDocuments((prev) =>
          prev.map((doc) => {
            const saved = savedById.get(doc.id);
            if (!saved) return doc;
            return {
              ...doc,
              status: saved.status as Status,
              fileName: saved.file_name ?? undefined,
              storagePath: saved.storage_path ?? undefined,
            };
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
    const { error } = await supabase.from("documents").upsert(
      {
        user_id: user.id,
        doc_id: doc.id,
        status: doc.status,
        file_name: doc.fileName ?? null,
        storage_path: doc.storagePath ?? null,
      },
      { onConflict: "user_id,doc_id" },
    );
    if (error) {
      console.error("Failed to sync document status:", error);
    }
  }

  async function syncProgress(docs: DocumentItem[]) {
    if (!user) return;
    const relevant = docs.filter((doc) => doc.status !== "locked");
    const completedCount = relevant.filter((doc) => doc.status !== "missing").length;
    const { error } = await supabase.from("progress").upsert(
      {
        user_id: user.id,
        country: profile?.country ?? null,
        document_type: "documents",
        steps_completed: completedCount,
        total_steps: relevant.length,
      },
      { onConflict: "user_id,document_type" },
    );
    if (error) {
      console.error("Failed to sync progress:", error);
    }

    for (const [category, stepKey] of Object.entries(CATEGORY_TO_STEP)) {
      const docsInCategory = docs.filter((doc) => doc.category === category && doc.status !== "locked");
      if (docsInCategory.length === 0) continue;
      const categoryCompletedCount = docsInCategory.filter((doc) => doc.status !== "missing").length;
      const { error: categoryError } = await supabase.from("progress").upsert(
        {
          user_id: user.id,
          country: profile?.country ?? null,
          document_type: stepKey,
          steps_completed: categoryCompletedCount,
          total_steps: docsInCategory.length,
        },
        { onConflict: "user_id,document_type" },
      );
      if (categoryError) {
        console.error("Failed to sync progress:", categoryError);
      }
    }
  }

  async function handleUpload(id: string, file: File) {
    const doc = documents.find((d) => d.id === id);
    if (!doc || !user) return;

    const updated: DocumentItem = { ...doc, status: "verified", fileName: file.name };

    const storagePath = `${user.id}/${doc.id}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("documents")
      .upload(storagePath, file, { upsert: true });

    if (uploadError) {
      console.error("Failed to upload document file:", uploadError);
    } else {
      updated.storagePath = storagePath;
    }

    const next = documents.map((d) => (d.id === id ? updated : d));
    setDocuments(next);

    if (!isCategoryComplete(documents, doc.category) && isCategoryComplete(next, doc.category)) {
      setSectionCompleteOpen(true);
    }
    showAutoCompleteToast();
    syncDocumentStatus(updated);
    syncProgress(next);
    createNotification({
      title: "Документ загружен и отправлен на проверку",
      message: "Мы уведомим вас, как только он будет проверен.",
      type: "document",
    });
  }

  async function handleView(doc: DocumentItem) {
    if (!doc.storagePath) return;
    const { data, error } = await supabase.storage.from("documents").createSignedUrl(doc.storagePath, 60);
    if (error || !data) {
      console.error("Failed to create signed URL for document view:", error);
      return;
    }
    window.open(data.signedUrl, "_blank");
  }

  function handleDelete(id: string) {
    const doc = documents.find((d) => d.id === id);
    if (!doc) return;

    const updated: DocumentItem = { ...doc, status: "missing", fileName: undefined, storagePath: undefined };
    const next = documents.map((d) => (d.id === id ? updated : d));
    setDocuments(next);
    syncDocumentStatus(updated);
    syncProgress(next);
  }

  function confirmDelete() {
    if (deleteTargetId) handleDelete(deleteTargetId);
    setDeleteTargetId(null);
  }

  const relevantDocs = documents.filter((doc) => doc.status !== "locked");
  const totalCount = relevantDocs.length;
  const verifiedCount = relevantDocs.filter((doc) => doc.status === "verified").length;
  const pendingCount = relevantDocs.filter((doc) => doc.status === "pending").length;
  const missingCount = relevantDocs.filter((doc) => doc.status === "missing").length;
  const progressPercent = totalCount === 0 ? 0 : Math.round((verifiedCount / totalCount) * 100);

  const categoriesToRender = activeTab === "all" ? CATEGORIES : [activeTab as DocumentItem["category"]];

  return (
    <div className="px-6 py-8 lg:px-10 lg:py-10">
      <Reveal>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">{t.documents.title}</h1>
            <p className="mt-2 text-text-muted">{t.documents.subtitle}</p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={40}>
        <div className="mt-6 rounded-2xl border border-border-subtle bg-surface-1 p-6 backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold text-text-primary">
              {t.documents.progressSummary
                .replace("{completed}", String(verifiedCount))
                .replace("{total}", String(totalCount))}
            </p>
            <span className="text-sm font-semibold text-accent-bright">{progressPercent}%</span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-border-subtle">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent to-accent-bright transition-[width] duration-700 ease-[var(--ease-out-strong)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
              ✅ {verifiedCount} {t.documents.status.verified}
            </span>
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-400">
              🔄 {pendingCount} {t.documents.status.pending}
            </span>
            <span className="rounded-full border border-border-strong bg-surface-1 px-3 py-1.5 text-xs font-medium text-text-muted">
              ❌ {missingCount} {t.documents.status.missing}
            </span>
          </div>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-6 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                activeTab === tab
                  ? "border-accent/50 bg-accent/10 text-accent-bright"
                  : "border-border-subtle bg-surface-1 text-text-muted hover:border-border-strong hover:text-text-primary"
              }`}
            >
              {t.documents.tabs[tab]}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-8 space-y-8">
        {categoriesToRender.map((category, index) => {
          const docsInCategory = documents.filter((doc) => doc.category === category);
          if (docsInCategory.length === 0) return null;

          return (
            <Reveal key={category} delay={120 + index * 40}>
              <section>
                {activeTab === "all" && (
                  <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-text-secondary">
                    <span>{CATEGORY_EMOJI[category]}</span>
                    <span>{t.documents.tabs[category]}</span>
                  </h2>
                )}
                <div>
                  {docsInCategory.map((doc) => {
                    const name = t.documents.docNames[doc.nameKey];
                    const hint = t.documents.docHints[doc.nameKey];
                    const guideText = t.documents.uploadGuides[doc.nameKey];

                    if (doc.status === "locked") {
                      return (
                        <LockedRow
                          key={doc.id}
                          name={name}
                          hint={hint}
                          lockedLabel={STATUS_BADGE.locked.label}
                          demoMode={demoMode}
                          onDemoBlocked={() => setPromptOpen(true)}
                          onUpgradeClick={() => setUpgradeOpen(true)}
                        />
                      );
                    }

                    return (
                      <DocumentRow
                        key={doc.id}
                        doc={doc}
                        name={name}
                        hint={hint}
                        guideText={guideText}
                        badge={STATUS_BADGE[doc.status]}
                        viewLabel={t.documents.viewBtn}
                        uploadLabel={t.documents.uploadBtn}
                        deleteLabel={t.documents.deleteBtn}
                        onUpload={handleUpload}
                        onView={handleView}
                        onDelete={(id) => setDeleteTargetId(id)}
                        demoMode={demoMode}
                        onDemoBlocked={() => setPromptOpen(true)}
                      />
                    );
                  })}
                </div>
              </section>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={160}>
        <div className="mt-12">
          <h2 className="text-xl font-bold tracking-tight text-text-primary">Гайды по легализации</h2>
          <p className="mt-1 text-sm text-text-muted">
            Визы, ПЕСЕЛЬ, карта побыту, работа, бизнес, образование, авто, жильё, переводы и другие документы —
            пошаговые инструкции.
          </p>
          {profile?.citizenship && (
            <p className="mt-2 text-xs text-text-muted">Показаны гайды, актуальные для вашего гражданства.</p>
          )}

          {guideCategories.length > 1 && (
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setGuideCategory("all")}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold capitalize transition-colors duration-150 ${
                  guideCategory === "all"
                    ? "border-accent bg-accent/15 text-accent-bright"
                    : "border-border-strong bg-surface-1 text-text-muted hover:text-text-primary"
                }`}
              >
                Все
              </button>
              {guideCategories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setGuideCategory(c)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-semibold capitalize transition-colors duration-150 ${
                    guideCategory === c
                      ? "border-accent bg-accent/15 text-accent-bright"
                      : "border-border-strong bg-surface-1 text-text-muted hover:text-text-primary"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          <div className="mt-4">
            <DocumentGuideList
              guides={filteredGuides}
              loading={guidesLoading}
              emptyText="Пока нет гайдов в этой категории."
              searchPlaceholder="Поиск гайда"
            />
          </div>
        </div>
      </Reveal>

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
      <UpgradeModal open={upgradeOpen} onClose={() => setUpgradeOpen(false)} />
      <SectionCompleteModal open={sectionCompleteOpen} onClose={() => setSectionCompleteOpen(false)} />
      <DeleteConfirmModal
        open={deleteTargetId !== null}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
