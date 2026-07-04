"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Reveal from "../../_components/Reveal";
import { pressScale } from "../../_lib/motion";
import { useLanguage } from "../../_components/LanguageProvider";
import type { Dictionary } from "../../_lib/i18n";

type Category = "all" | "passport" | "pesel" | "workPermit" | "insurance" | "bank";
type Status = "verified" | "pending" | "missing" | "locked";
type DocNameKey = keyof Dictionary["documents"]["docNames"];

type DocumentItem = {
  id: string;
  nameKey: DocNameKey;
  category: Exclude<Category, "all">;
  status: Status;
  fileName?: string;
};

const TABS: Category[] = ["all", "passport", "pesel", "workPermit", "insurance", "bank"];

const INITIAL_DOCUMENTS: DocumentItem[] = [
  { id: "passport-scan", nameKey: "passportScan", category: "passport", status: "verified" },
  { id: "passport-photo", nameKey: "passportPhoto", category: "passport", status: "verified" },
  { id: "pesel-form", nameKey: "peselForm", category: "pesel", status: "pending" },
  { id: "pesel-letter", nameKey: "peselLetter", category: "pesel", status: "missing" },
  { id: "work-permit-app", nameKey: "workPermitApp", category: "workPermit", status: "pending" },
  { id: "sponsorship-letter", nameKey: "sponsorshipLetter", category: "workPermit", status: "missing" },
  { id: "health-insurance", nameKey: "healthInsurance", category: "insurance", status: "verified" },
  { id: "travel-insurance", nameKey: "travelInsurance", category: "insurance", status: "missing" },
  { id: "bank-confirmation", nameKey: "bankConfirmation", category: "bank", status: "pending" },
  { id: "proof-of-funds", nameKey: "proofOfFunds", category: "bank", status: "missing" },
  { id: "relocation-letter", nameKey: "relocationLetter", category: "workPermit", status: "locked" },
  { id: "tax-residency", nameKey: "taxResidency", category: "bank", status: "locked" },
];

function UploadZone({
  doc,
  name,
  uploadLabel,
  onUpload,
}: {
  doc: DocumentItem;
  name: string;
  uploadLabel: string;
  onUpload: (id: string, file: File) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") inputRef.current?.click();
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
  const [activeTab, setActiveTab] = useState<Category>("all");
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);

  const STATUS_BADGE: Record<Status, { label: string; className: string }> = {
    verified: { label: t.documents.status.verified, className: "border-emerald-500/30 bg-emerald-500/15 text-emerald-400" },
    pending: { label: t.documents.status.pending, className: "border-amber-500/30 bg-amber-500/15 text-amber-400" },
    missing: { label: t.documents.status.missing, className: "border-white/15 bg-white/5 text-slate-400" },
    locked: { label: t.documents.status.locked, className: "border-accent/30 bg-accent/10 text-accent-bright" },
  };

  function handleUpload(id: string, file: File) {
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, status: "pending", fileName: file.name } : doc)),
    );
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
        <div className="mt-6 flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150 ${
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

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((doc, index) => {
          const name = t.documents.docNames[doc.nameKey];

          if (doc.status === "missing") {
            return (
              <Reveal key={doc.id} delay={index * 40}>
                <UploadZone doc={doc} name={name} uploadLabel={t.documents.upload} onUpload={handleUpload} />
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
                    <Link
                      href="/pricing"
                      className={`mt-1 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-white transition-colors duration-150 hover:bg-accent-bright ${pressScale}`}
                    >
                      {t.documents.unlockBtn}
                    </Link>
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
                      {badge.label}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {doc.fileName ?? t.documents.tabs[doc.category]}
                  </p>
                </div>
                <button
                  type="button"
                  className={`mt-4 self-start rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:border-accent/40 hover:text-accent-bright ${pressScale}`}
                >
                  {t.documents.viewBtn}
                </button>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
