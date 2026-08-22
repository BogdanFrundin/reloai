"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "./AuthProvider";
import { DOCUMENT_PROFILE_GROUPS, type DocumentProfile } from "../_lib/documentProfile";
import type { FormTemplate } from "../_lib/formTemplates";
import { pressScale } from "../_lib/motion";

export default function DocumentFillModal({
  open,
  onClose,
  template,
}: {
  open: boolean;
  onClose: () => void;
  template: FormTemplate | null;
}) {
  const { user, profile, refreshProfile } = useAuth();
  const [values, setValues] = useState<DocumentProfile>(() => profile?.document_profile ?? {});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open || !template) return null;

  function update<K extends keyof DocumentProfile>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value || undefined }));
  }

  async function handleSubmit() {
    if (!template) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/documents/fill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateKey: template.key,
          profile: values,
          citizenship: profile?.citizenship ?? null,
        }),
      });
      if (!res.ok) throw new Error("fill failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${template.key}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      // Persist the entered data so the next document reuses it without
      // asking again.
      if (user) {
        const merged = { ...(profile?.document_profile ?? {}), ...values };
        await supabase.from("profiles").update({ document_profile: merged }).eq("id", user.id);
        await refreshProfile();
      }
      onClose();
    } catch (err) {
      console.error(err);
      setError("Не получилось сгенерировать файл. Попробуйте ещё раз.");
    } finally {
      setSubmitting(false);
    }
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-[opacity] duration-150 ease-[var(--ease-out-strong)] starting:opacity-0"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border-subtle bg-panel p-6 shadow-2xl shadow-black/40 transition-[opacity,transform] duration-150 ease-[var(--ease-out-strong)] starting:opacity-0 starting:scale-95"
      >
        <h2 className="text-lg font-bold text-text-primary">Заполнить с ИИ</h2>
        <p className="mt-1 text-sm text-text-muted">
          {template.label}. Проверьте данные — ИИ подставит их в официальный бланк и сформирует готовый PDF.
          Сохранённое здесь используется и для других документов.
        </p>

        <div className="mt-5 space-y-5">
          {DOCUMENT_PROFILE_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">{group.title}</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {group.fields.map((field) => (
                  <label key={field.key} className="text-xs text-text-secondary">
                    {field.label}
                    {field.type === "select" ? (
                      <select
                        value={(values[field.key] as string) ?? ""}
                        onChange={(e) => update(field.key, e.target.value)}
                        className="mt-1 w-full rounded-lg border border-border-strong bg-surface-1 px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none"
                      >
                        <option value="">—</option>
                        {field.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type === "date" ? "date" : "text"}
                        value={(values[field.key] as string) ?? ""}
                        onChange={(e) => update(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        className="mt-1 w-full rounded-lg border border-border-strong bg-surface-1 px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
                      />
                    )}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {error && <p className="mt-4 text-xs text-red-300">{error}</p>}

        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className={`flex-1 rounded-full border border-border-strong bg-surface-1 px-5 py-2.5 text-sm font-semibold text-text-secondary transition-colors duration-150 hover:border-border-strong hover:text-text-primary ${pressScale}`}
          >
            Отмена
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className={`flex-1 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-white transition-colors duration-150 hover:bg-accent-bright disabled:opacity-50 ${pressScale}`}
          >
            {submitting ? "Генерируем…" : "Заполнить и скачать"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
