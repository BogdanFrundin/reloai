"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { pressScale } from "../_lib/motion";
import { useAuth } from "./AuthProvider";
import { useLanguage } from "./LanguageProvider";
import { supabase } from "../../lib/supabase";

type Message = { from: "user" | "ai"; text: string; time: number | null };

export default function AiChatPanel({ onClose }: { onClose?: () => void }) {
  const { user } = useAuth();
  const { t, lang } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([{ from: "ai", text: t.aiChat.welcome, time: null }]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages((prev) =>
      prev[0]?.time === null ? [{ ...prev[0], time: Date.now() }, ...prev.slice(1)] : prev,
    );
  }, []);

  useEffect(() => {
    if (!user) return;
    let active = true;

    supabase
      .from("chat_history")
      .select("role, message, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (!active || !data || data.length === 0) return;
        setMessages(
          data.map((row) => ({
            from: row.role === "user" ? "user" : "ai",
            text: row.message as string,
            time: row.created_at ? new Date(row.created_at as string).getTime() : Date.now(),
          })),
        );
      });

    return () => {
      active = false;
    };
  }, [user]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  function saveMessage(role: "user" | "assistant", text: string) {
    if (!user) return;
    supabase.from("chat_history").insert({ user_id: user.id, role, message: text });
  }

  async function sendMessage(text: string) {
    if (!text || isTyping) return;

    const nextMessages: Message[] = [...messages, { from: "user", text, time: Date.now() }];
    setMessages(nextMessages);
    setInput("");
    setIsTyping(true);
    saveMessage("user", text);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ from, text }) => ({ from, text })),
          lang,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        setMessages((prev) => [
          ...prev,
          { from: "ai", text: data.error ?? t.aiChat.connectionError, time: Date.now() },
        ]);
        return;
      }

      setMessages((prev) => [...prev, { from: "ai", text: data.reply, time: Date.now() }]);
      saveMessage("assistant", data.reply);
    } catch {
      setMessages((prev) => [...prev, { from: "ai", text: t.aiChat.connectionError, time: Date.now() }]);
    } finally {
      setIsTyping(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(input.trim());
  }

  function formatTime(time: number | null) {
    if (time === null) return "";
    return new Date(time).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  }

  const showQuickReplies = messages.length === 1;

  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-bright text-sm font-bold text-white">
          AI
        </span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">{t.chat.assistantName}</p>
          <p className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 motion-reduce:animate-none" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            {t.chat.online}
          </p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label={t.aiChat.closeAria}
            className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors duration-150 hover:bg-white/5 hover:text-white ${pressScale}`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex flex-col transition-[opacity,transform] duration-300 ease-[var(--ease-out-strong)] starting:opacity-0 starting:translate-y-2 ${
              message.from === "user" ? "items-end" : "items-start"
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
            {message.time !== null && (
              <span className="mt-1 px-1 text-[10px] text-slate-500">{formatTime(message.time)}</span>
            )}
          </div>
        ))}

        {showQuickReplies && !isTyping && (
          <div className="flex flex-wrap gap-2 pt-1 transition-[opacity,transform] duration-300 ease-[var(--ease-out-strong)] starting:opacity-0 starting:translate-y-2">
            {t.aiChat.quickReplies.map((reply) => (
              <button
                key={reply}
                type="button"
                onClick={() => sendMessage(reply)}
                className={`rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent-bright transition-colors duration-150 hover:border-accent/60 hover:bg-accent/15 ${pressScale}`}
              >
                {reply}
              </button>
            ))}
          </div>
        )}

        {isTyping && (
          <div className="flex justify-start transition-[opacity,transform] duration-200 ease-[var(--ease-out-strong)] starting:opacity-0 starting:translate-y-2">
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.06] px-4 py-3">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500 [animation-delay:-0.2s] motion-reduce:animate-none" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500 [animation-delay:-0.1s] motion-reduce:animate-none" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500 motion-reduce:animate-none" />
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-white/10 p-3">
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={t.aiChat.placeholder}
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 transition-[border-color,box-shadow] duration-150 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
        />
        <button
          type="submit"
          disabled={isTyping}
          aria-label={t.aiChat.sendAria}
          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-accent text-white transition-colors duration-150 hover:bg-accent-bright disabled:opacity-60 ${pressScale}`}
        >
          {isTyping ? (
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-6 6m6-6l6 6" />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
}
