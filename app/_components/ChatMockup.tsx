"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

type MessageFrom = "user" | "ai";

const FROM_ORDER: MessageFrom[] = ["user", "ai", "user", "ai"];

export default function ChatMockup() {
  const { t } = useLanguage();
  const [visibleCount, setVisibleCount] = useState(1);
  const [isTyping, setIsTyping] = useState(false);

  const conversation = t.chat.messages.map((text, index) => ({
    from: FROM_ORDER[index],
    text,
  }));

  useEffect(() => {
    if (visibleCount >= conversation.length) return;

    const nextMessage = conversation[visibleCount];
    const typingDelay = nextMessage.from === "ai" ? 900 : 400;

    const typingTimer = setTimeout(() => {
      setIsTyping(true);
    }, typingDelay);

    const revealTimer = setTimeout(() => {
      setIsTyping(false);
      setVisibleCount((count) => count + 1);
    }, typingDelay + 1100);

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(revealTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleCount]);

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-6">
      <div className="mb-4 flex items-center gap-3 border-b border-white/10 pb-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-bright text-sm font-bold text-white">
          AI
        </span>
        <div>
          <p className="text-sm font-semibold text-white">{t.chat.assistantName}</p>
          <p className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 motion-reduce:animate-none" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            {t.chat.online}
          </p>
        </div>
      </div>

      <div className="flex min-h-[280px] flex-col gap-3">
        {conversation.slice(0, visibleCount).map((message, index) => (
          <div
            key={index}
            className={`flex transition-[opacity,transform] duration-300 ease-[var(--ease-out-strong)] starting:opacity-0 starting:translate-y-2 motion-reduce:transition-none ${
              message.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <p
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                message.from === "user"
                  ? "rounded-br-md bg-accent text-white"
                  : "rounded-bl-md border border-white/10 bg-white/[0.06] text-slate-200"
              }`}
            >
              {message.text}
            </p>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start transition-[opacity,transform] duration-200 ease-[var(--ease-out-strong)] starting:opacity-0 starting:translate-y-2 motion-reduce:transition-none">
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.06] px-4 py-3">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500 [animation-delay:-0.2s] motion-reduce:animate-none" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500 [animation-delay:-0.1s] motion-reduce:animate-none" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500 motion-reduce:animate-none" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
