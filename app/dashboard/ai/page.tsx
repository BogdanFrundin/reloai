"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { pressScale } from "../../_lib/motion";
import { useAuth } from "../../_components/AuthProvider";
import { useLanguage } from "../../_components/LanguageProvider";
import { supabase } from "../../../lib/supabase";

type Message = { from: "user" | "ai"; text: string; time: number | null };

function now(): number {
  return Date.now();
}

function renderMessageBody(text: string) {
  const lines = text.split("\n").map((line) => line.trim()).filter((line) => line.length > 0);
  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  );
}

export default function DashboardAiPage() {
  const { user, profile } = useAuth();
  const { t, lang } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) {
      setHistoryLoaded(true);
      return;
    }
    let active = true;

    supabase
      .from("chat_history")
      .select("role, message, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (!active) return;
        if (data && data.length > 0) {
          setMessages(
            data.map((row) => ({
              from: row.role === "user" ? "user" : "ai",
              text: row.message as string,
              time: row.created_at ? new Date(row.created_at as string).getTime() : now(),
            })),
          );
        }
        setHistoryLoaded(true);
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

    const nextMessages: Message[] = [...messages, { from: "user", text, time: now() }];
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
          profile: profile
            ? {
                country: profile.country,
                city: profile.city,
                citizenship: profile.citizenship,
                currentLocation: profile.current_country,
                goal: profile.goal,
                jobOffer: profile.job_offer,
                alreadyAdmitted: profile.already_admitted,
                selectedRoute: profile.selected_route?.name ?? null,
              }
            : null,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        setMessages((prev) => [...prev, { from: "ai", text: data.error ?? t.aiChat.connectionError, time: now() }]);
        return;
      }

      setMessages((prev) => [...prev, { from: "ai", text: data.reply, time: now() }]);
      saveMessage("assistant", data.reply);
    } catch {
      setMessages((prev) => [...prev, { from: "ai", text: t.aiChat.connectionError, time: now() }]);
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

  const isEmpty = historyLoaded && messages.length === 0;

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">AI Ассистент</h1>
          <p className="text-sm text-slate-400">Ваш персональный помощник по переезду</p>
        </div>
        <button
          type="button"
          onClick={() => setMessages([])}
          className={`flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:border-accent/40 hover:text-accent-bright ${pressScale}`}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Новый чат
        </button>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
        {isEmpty ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-bright text-lg font-bold text-white">
              AI
            </span>
            <div>
              <h2 className="text-2xl font-bold text-white">Чем могу помочь?</h2>
              <p className="mt-2 text-sm text-slate-400">Задайте вопрос о переезде — или выберите один из примеров ниже.</p>
            </div>
            <div className="grid w-full max-w-xl gap-2.5 sm:grid-cols-2">
              {t.aiChat.quickReplies.map((reply) => (
                <button
                  key={reply}
                  type="button"
                  onClick={() => sendMessage(reply)}
                  className={`rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left text-sm text-slate-300 transition-colors duration-150 hover:border-accent/40 hover:bg-accent/5 hover:text-white ${pressScale}`}
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <div className="mx-auto flex max-w-3xl flex-col gap-5">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex flex-col transition-[opacity,transform] duration-300 ease-[var(--ease-out-strong)] starting:opacity-0 starting:translate-y-2 ${
                    message.from === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[75%] ${
                      message.from === "user"
                        ? "rounded-br-md bg-accent text-white"
                        : "rounded-bl-md border border-white/10 bg-white/[0.06] text-slate-200"
                    }`}
                  >
                    {message.from === "user" ? message.text : renderMessageBody(message.text)}
                  </div>
                  {message.time !== null && (
                    <span className="mt-1 px-1 text-[10px] text-slate-500">{formatTime(message.time)}</span>
                  )}
                </div>
              ))}

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
          </div>
        )}

        <form onSubmit={handleSubmit} className="border-t border-white/10 p-3 sm:p-4">
          <div className="mx-auto flex max-w-3xl items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={t.aiChat.placeholder}
              className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white placeholder:text-slate-500 transition-[border-color,box-shadow] duration-150 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
            <button
              type="submit"
              disabled={isTyping || !input.trim()}
              aria-label={t.aiChat.sendAria}
              className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-accent text-white transition-colors duration-150 hover:bg-accent-bright disabled:opacity-40 ${pressScale}`}
            >
              {isTyping ? (
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-6 6m6-6l6 6" />
                </svg>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
