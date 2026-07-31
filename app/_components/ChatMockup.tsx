"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";

type MessageFrom = "ai" | "user";
type ConversationMessage = { from: MessageFrom; text: string };

const DOC_CARDS = [
  { title: "Скан паспорта", subtitle: "Нужен почти для всех шагов", status: "Готово", statusColor: "emerald" as const, kind: "passport" as const },
  { title: "Виза или ВНЖ", subtitle: "Основа для легализации", status: "На проверке", statusColor: "amber" as const, kind: "visa" as const },
];

const DOC_ICON_TILE_CLASS: Record<"passport" | "visa", string> = {
  passport: "bg-blue-500/15 text-blue-400",
  visa: "bg-amber-500/15 text-amber-400",
};

const PASSPORT_ICON = (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <rect x="4" y="3.5" width="16" height="17" rx="2" />
    <circle cx="9" cy="10" r="1.75" />
    <path strokeLinecap="round" d="M6.5 15.5h5M13.5 8h4M13.5 11h4" />
  </svg>
);

const VISA_ICON = (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 3.5H7.5a2 2 0 00-2 2v13a2 2 0 002 2h9a2 2 0 002-2V8l-4.5-4.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 3.5V8h4.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 13.5l2 2 4-4" />
  </svg>
);

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
              <div className="flex h-16 items-center justify-center bg-surface-1">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${DOC_ICON_TILE_CLASS[doc.kind]}`}>
                  {doc.kind === "passport" ? PASSPORT_ICON : VISA_ICON}
                </span>
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
