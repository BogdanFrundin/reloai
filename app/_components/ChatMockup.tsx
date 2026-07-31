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
    <div className="w-full max-w-sm rounded-3xl border border-border-subtle bg-surface-1 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-5">
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

      <div className="flex min-h-[260px] flex-col gap-2.5">
        {conversation.map((message, index) => (
          <div key={index} className={`flex ${message.from === "user" ? "justify-end" : "justify-start"}`}>
            <p
              className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed ${
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
              <div className="relative flex h-16 items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a2b4a] to-[#0b1220]">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-40"
                  style={{ backgroundImage: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.15), transparent 60%)" }}
                />
                {doc.kind === "passport" ? (
                  <div
                    className="relative h-12 w-9 -rotate-3 rounded-[3px] bg-gradient-to-br from-[#2c4270] to-[#18294a] ring-1 ring-white/15"
                    style={{
                      boxShadow:
                        "0 6px 12px -4px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 1px rgba(255,255,255,0.12)",
                      backgroundImage:
                        "repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 3px)",
                    }}
                  >
                    <div className="absolute inset-[2.5px] rounded-[2px] border border-white/10" />
                    <div className="absolute inset-x-0 top-2 flex justify-center">
                      <svg className="h-3.5 w-3.5 text-amber-400/90" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.5l6.5 2.6v5.4c0 4.6-2.8 8.1-6.5 9.5-3.7-1.4-6.5-4.9-6.5-9.5V5.1L12 2.5z" />
                        <path
                          d="M12 6.6l1.5 3 3.3.4-2.4 2.3.6 3.3-2.9-1.6-2.9 1.6.6-3.3-2.4-2.3 3.3-.4 1.5-3z"
                          fill="#18294a"
                          opacity="0.6"
                        />
                      </svg>
                    </div>
                    <div className="absolute inset-x-1.5 bottom-1.5 space-y-[3px]">
                      <div className="h-[2.5px] w-full rounded-full bg-white/30" />
                      <div className="h-[2px] w-1/2 rounded-full bg-white/20" />
                    </div>
                  </div>
                ) : (
                  <div
                    className="relative h-9 w-14 rounded-md bg-gradient-to-br from-[#1f3a5f] to-[#0d1c30] ring-1 ring-white/15"
                    style={{
                      boxShadow:
                        "0 6px 12px -4px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 1px rgba(255,255,255,0.12)",
                    }}
                  >
                    <div className="absolute left-1.5 top-1.5 h-2 w-2.5 rounded-[1.5px] bg-gradient-to-br from-amber-200 to-amber-500/90 ring-[0.5px] ring-black/20" />
                    <div className="absolute bottom-1.5 left-1.5 h-3.5 w-2.5 rounded-[1px] bg-white/15 ring-1 ring-white/20" />
                    <div className="absolute bottom-1.5 right-1.5 left-[26px] space-y-[2.5px]">
                      <div className="h-[2px] w-full rounded-full bg-white/30" />
                      <div className="h-[2px] w-2/3 rounded-full bg-white/20" />
                      <div className="h-[2px] w-1/3 rounded-full bg-white/15" />
                    </div>
                    <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 rotate-6 items-center justify-center rounded-full border-2 border-red-400/80 bg-[#0d1c30] text-[6px] font-bold text-red-400/90 shadow-sm">
                      OK
                    </span>
                  </div>
                )}
              </div>
              <div className="p-2.5">
                <p className="truncate text-[13px] font-semibold text-text-primary">{doc.title}</p>
                <p className="mt-0.5 truncate text-[11px] text-text-muted">{doc.subtitle}</p>
                <span
                  className={`mt-1.5 inline-block rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${
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
