"use client";

import { useLanguage } from "./LanguageProvider";

type MessageFrom = "ai" | "user";

const DOC_CARDS = [
  { title: "Скан паспорта", subtitle: "Нужен почти для всех шагов", status: "Готово", statusColor: "emerald" as const },
  { title: "Заявление на PESEL", subtitle: "Первый шаг легализации", status: "На проверке", statusColor: "amber" as const },
];

export default function ChatMockup() {
  const { t } = useLanguage();

  const conversation: { from: MessageFrom; text: string }[] = [
    { from: "ai", text: t.heroDemo.question },
    { from: "user", text: t.heroDemo.userReply },
    { from: "ai", text: t.heroDemo.response },
    { from: "user", text: t.heroDemo.docQuestion },
    { from: "ai", text: t.heroDemo.docResponse },
  ];

  return (
    <div className="w-full max-w-md rounded-3xl border border-border-subtle bg-surface-1 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-6">
      <div className="mb-4 flex items-center gap-3 border-b border-border-subtle pb-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-bright text-sm font-bold text-white">
          AI
        </span>
        <div>
          <p className="text-sm font-semibold text-text-primary">{t.chat.assistantName}</p>
          <p className="flex items-center gap-1.5 text-xs text-text-muted">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 motion-reduce:animate-none" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            {t.chat.online}
          </p>
        </div>
      </div>

      <div className="flex min-h-[320px] flex-col gap-3">
        {conversation.map((message, index) => (
          <div key={index} className={`flex ${message.from === "user" ? "justify-end" : "justify-start"}`}>
            <p
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                message.from === "user"
                  ? "rounded-br-md bg-accent text-white"
                  : "rounded-bl-md border border-border-subtle bg-surface-2 text-text-secondary"
              }`}
            >
              {message.text}
            </p>
          </div>
        ))}

        <div className="grid grid-cols-2 gap-3 pt-1">
          {DOC_CARDS.map((doc) => (
            <div key={doc.title} className="overflow-hidden rounded-2xl border border-border-subtle bg-surface-2">
              <div
                className={`flex h-16 items-center justify-center ${
                  doc.statusColor === "emerald" ? "bg-gradient-to-br from-emerald-500/20 to-emerald-500/5" : "bg-gradient-to-br from-amber-500/20 to-amber-500/5"
                }`}
              >
                <svg
                  className={`h-7 w-7 ${doc.statusColor === "emerald" ? "text-emerald-400" : "text-amber-400"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m-7 5h8a2 2 0 002-2V7a2 2 0 00-2-2H9.5L6 8.5V19a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-semibold text-text-primary">{doc.title}</p>
                <p className="mt-0.5 truncate text-xs text-text-muted">{doc.subtitle}</p>
                <span
                  className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    doc.statusColor === "emerald" ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-400"
                  }`}
                >
                  {doc.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-border-subtle pt-4">
        <div className="flex-1 truncate rounded-xl border border-border-subtle bg-surface-1 px-3.5 py-2.5 text-sm text-text-muted">
          {t.heroDemo.inputPlaceholder}
        </div>
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-accent text-white">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-6 6m6-6l6 6" />
          </svg>
        </span>
      </div>
    </div>
  );
}
