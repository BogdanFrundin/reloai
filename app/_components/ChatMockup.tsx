"use client";

import { useLanguage } from "./LanguageProvider";

type MessageFrom = "ai" | "user";

const DOC_CARDS = [
  { title: "Скан паспорта", subtitle: "Нужен почти для всех шагов", status: "Готово", statusColor: "emerald" as const, kind: "passport" as const },
  { title: "Виза или ВНЖ", subtitle: "Основа для легализации", status: "На проверке", statusColor: "amber" as const, kind: "visa" as const },
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
              <div className="relative flex h-20 items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a2b4a] to-[#0b1220]">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-40"
                  style={{ backgroundImage: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.15), transparent 60%)" }}
                />
                <div className="relative h-14 w-11 -rotate-3 rounded-md bg-gradient-to-br from-[#2c4270] to-[#18294a] shadow-lg ring-1 ring-white/15">
                  <div className="absolute inset-x-0 top-2 flex justify-center">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full border-[1.5px] border-amber-400/80">
                      <span className="h-1 w-1 rounded-full bg-amber-400/80" />
                    </span>
                  </div>
                  <div className="absolute inset-x-1.5 bottom-2 space-y-0.5">
                    <div className="h-0.5 rounded-full bg-white/25" />
                    <div className="h-0.5 w-3/4 rounded-full bg-white/25" />
                  </div>
                  {doc.kind === "visa" && (
                    <span className="absolute -right-2 -top-1 flex h-6 w-6 rotate-12 items-center justify-center rounded-full border-2 border-red-400/70 text-[7px] font-bold text-red-400/90">
                      OK
                    </span>
                  )}
                </div>
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
