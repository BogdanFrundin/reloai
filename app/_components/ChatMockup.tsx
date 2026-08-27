"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";

type MessageFrom = "ai" | "user";
type ConversationMessage = { from: MessageFrom; text: string };

const DOC_CARDS = [
  { title: "Скан паспорта", subtitle: "Нужен почти для всех шагов", status: "Готово", statusColor: "emerald" as const, kind: "passport" as const },
  { title: "Мед. страховка", subtitle: "Обязательна для ВНЖ", status: "На проверке", statusColor: "amber" as const, kind: "insurance" as const },
];

// Pacing for the simulated live-conversation reveal — AI "replies" get a
// slightly longer pause (plus a typing indicator) than the visitor's turns.
const DELAY_BEFORE_USER_MS = 900;
const DELAY_BEFORE_AI_MS = 1300;
const TYPING_DURATION_MS = 750;
const DOCS_REVEAL_DELAY_MS = 900;

function TypingIndicator() {
  return (
    <div className="flex justify-start transition-[opacity,transform] duration-200 ease-[var(--ease-out-strong)] starting:opacity-0 starting:translate-y-2">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-border-subtle bg-surface-2 px-3.5 py-2.5">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500 [animation-delay:-0.2s] motion-reduce:animate-none" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500 [animation-delay:-0.1s] motion-reduce:animate-none" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500 motion-reduce:animate-none" />
      </div>
    </div>
  );
}

export default function ChatMockup() {
  const { t } = useLanguage();

  const conversation: ConversationMessage[] = [
    { from: "ai", text: t.heroDemo.question },
    { from: "user", text: t.heroDemo.userReply },
    { from: "ai", text: t.heroDemo.response },
    { from: "user", text: t.heroDemo.docQuestion },
    { from: "ai", text: t.heroDemo.docResponse },
  ];

  // Keep a live ref to the (re-created-every-render) conversation array so the
  // timer chain below can read fresh translated text without restarting the
  // whole reveal sequence whenever the language changes.
  const conversationRef = useRef(conversation);
  conversationRef.current = conversation;

  const [revealedCount, setRevealedCount] = useState(0);
  const [typingIndex, setTypingIndex] = useState<number | null>(null);
  const [docsVisible, setDocsVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setRevealedCount(conversationRef.current.length);
      setTypingIndex(null);
      setDocsVisible(true);
      return;
    }

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    function scheduleMessage(index: number) {
      const list = conversationRef.current;

      if (index >= list.length) {
        timeoutId = setTimeout(() => {
          if (cancelled) return;
          setDocsVisible(true);
        }, DOCS_REVEAL_DELAY_MS);
        return;
      }

      const message = list[index];

      timeoutId = setTimeout(
        () => {
          if (cancelled) return;

          if (message.from === "ai") {
            setTypingIndex(index);
            timeoutId = setTimeout(() => {
              if (cancelled) return;
              setTypingIndex(null);
              setRevealedCount(index + 1);
              scheduleMessage(index + 1);
            }, TYPING_DURATION_MS);
          } else {
            setRevealedCount(index + 1);
            scheduleMessage(index + 1);
          }
        },
        message.from === "ai" ? DELAY_BEFORE_AI_MS : DELAY_BEFORE_USER_MS,
      );
    }

    scheduleMessage(0);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);

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

      <div className="flex min-h-[440px] flex-col gap-2.5">
        {conversation.slice(0, revealedCount).map((message, index) => (
          <div
            key={index}
            className={`flex transition-[opacity,transform] duration-200 ease-[var(--ease-out-strong)] starting:opacity-0 starting:translate-y-2 motion-reduce:transition-none ${
              message.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
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

        {typingIndex !== null && <TypingIndicator />}

        <div
          className={`grid grid-cols-2 gap-3 pt-1 transition-[opacity,transform] duration-500 ease-[var(--ease-out-strong)] motion-reduce:transition-none ${
            docsVisible ? "opacity-100 translate-y-0" : "pointer-events-none translate-y-2 opacity-0"
          }`}
        >
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
                    className="relative h-12 w-9 rounded-[3px] bg-gradient-to-br from-[#1f3a5f] to-[#0d1c30] ring-1 ring-white/15"
                    style={{
                      boxShadow:
                        "0 6px 12px -4px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 1px rgba(255,255,255,0.12)",
                    }}
                  >
                    <div
                      aria-hidden
                      className="absolute right-0 top-0 h-3 w-3 bg-white/10"
                      style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
                    />
                    <div className="absolute inset-x-0 top-2.5 flex justify-center">
                      <svg className="h-4 w-4 text-emerald-400/90" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.5l6.5 2.6v5.4c0 4.6-2.8 8.1-6.5 9.5-3.7-1.4-6.5-4.9-6.5-9.5V5.1L12 2.5z" />
                        <path
                          d="M9.5 12.2l1.8 1.8 3.4-3.6"
                          fill="none"
                          stroke="#18294a"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity="0.75"
                        />
                      </svg>
                    </div>
                    <div className="absolute inset-x-1.5 bottom-1.5 space-y-[3px]">
                      <div className="h-[2.5px] w-full rounded-full bg-white/30" />
                      <div className="h-[2px] w-1/2 rounded-full bg-white/20" />
                    </div>
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
