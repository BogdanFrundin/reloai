"use client";

import { Suspense, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { pressScale } from "../../_lib/motion";
import { useAuth } from "../../_components/AuthProvider";
import { useLanguage } from "../../_components/LanguageProvider";
import { supabase } from "../../../lib/supabase";

type Message = { from: "user" | "ai"; text: string; time: number | null };
type ChatSession = { id: string; title: string; messages: Message[]; created_at: string };

const TITLE_MAX_LENGTH = 50;

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

function truncateTitle(text: string): string {
  const trimmed = text.trim();
  return trimmed.length > TITLE_MAX_LENGTH ? `${trimmed.slice(0, TITLE_MAX_LENGTH).trimEnd()}…` : trimmed;
}

function formatSessionDate(iso: string): string {
  return new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "short" });
}

function groupSessionsByDate(sessions: ChatSession[]): { label: string; sessions: ChatSession[] }[] {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const weekAgo = startOfToday - 6 * 24 * 60 * 60 * 1000;
  const today: ChatSession[] = [];
  const thisWeek: ChatSession[] = [];
  const older: ChatSession[] = [];
  for (const s of sessions) {
    const t = new Date(s.created_at).getTime();
    if (t >= startOfToday) today.push(s);
    else if (t >= weekAgo) thisWeek.push(s);
    else older.push(s);
  }
  return [
    { label: "Сегодня", sessions: today },
    { label: "На этой неделе", sessions: thisWeek },
    { label: "Ранее", sessions: older },
  ].filter((g) => g.sessions.length > 0);
}

const QUICK_REPLY_ICONS: { match: RegExp; icon: ReactNode }[] = [
  {
    match: /докум|паспорт|pesel/i,
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m-7 5h8a2 2 0 002-2V7a2 2 0 00-2-2H9.5L6 8.5V19a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    match: /жиль|аренд|квартир/i,
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12l8.954-8.955a1.5 1.5 0 012.122 0L21.75 12M4.5 9.75V21a.75.75 0 00.75.75H9.75v-6a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v6h4.5a.75.75 0 00.75-.75V9.75"
        />
      </svg>
    ),
  },
  {
    match: /банк|счет|счёт/i,
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5M2.25 9l9.75-6 9.75 6M4.5 9v12M19.5 9v12M9 9v12m6-12v12" />
      </svg>
    ),
  },
  {
    match: /медиц|врач|страхов|nfz/i,
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m9 0a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    match: /работ|job|зарплат/i,
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.653v-3.24m-16.5 4.893a2.18 2.18 0 01-.75-1.653v-3.24m0 0a2.18 2.18 0 01.75-1.653l1.6-1.386a2.25 2.25 0 011.474-.545h9.352a2.25 2.25 0 011.474.545l1.6 1.386a2.18 2.18 0 01.75 1.653m-16.5 0h16.5"
        />
      </svg>
    ),
  },
];

function quickReplyIcon(text: string): ReactNode {
  return (
    QUICK_REPLY_ICONS.find((q) => q.match.test(text))?.icon ?? (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
        />
      </svg>
    )
  );
}

const SPARKLE_ICON = (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3m9-9h-3M6 12H3m14.5-6.5l-2 2m-9 9l-2 2m13-2l-2-2m-9-9l-2-2" />
  </svg>
);

const SPARKLE_ICON_SM = (
  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3m9-9h-3M6 12H3m14.5-6.5l-2 2m-9 9l-2 2m13-2l-2-2m-9-9l-2-2" />
  </svg>
);

function DashboardAiContent() {
  const { user, profile } = useAuth();
  const { t, lang } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const autoSentRef = useRef(false);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [sessionsLoaded, setSessionsLoaded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) {
      setSessionsLoaded(true);
      return;
    }
    let active = true;

    supabase
      .from("chat_sessions")
      .select("id, title, messages, created_at")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false })
      .then(({ data, error }) => {
        if (!active) return;
        if (error) {
          console.error("chat_sessions: failed to load sessions", error);
        }
        if (data) {
          setSessions(
            data.map((row) => ({
              id: row.id as string,
              title: row.title as string,
              messages: (row.messages as Message[] | null) ?? [],
              created_at: row.created_at as string,
            })),
          );
        }
        setSessionsLoaded(true);
      });

    return () => {
      active = false;
    };
  }, [user]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (autoSentRef.current || !sessionsLoaded) return;
    const q = searchParams.get("q");
    if (q && messages.length === 0) {
      autoSentRef.current = true;
      sendMessage(q);
      router.replace("/dashboard/ai");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once, guarded by autoSentRef, once sessions have loaded
  }, [sessionsLoaded, searchParams]);

  async function persistSession(allMessages: Message[], sessionId: string | null): Promise<string | null> {
    if (!user) return null;

    if (sessionId) {
      const { error } = await supabase
        .from("chat_sessions")
        .update({ messages: allMessages, updated_at: new Date().toISOString() })
        .eq("id", sessionId);
      if (error) {
        console.error("chat_sessions: failed to update session", sessionId, error);
        return sessionId;
      }
      setSessions((prev) => prev.map((s) => (s.id === sessionId ? { ...s, messages: allMessages } : s)));
      return sessionId;
    }

    const firstUserMessage = allMessages.find((m) => m.from === "user");
    const title = firstUserMessage ? truncateTitle(firstUserMessage.text) : "Новый чат";

    const { data, error } = await supabase
      .from("chat_sessions")
      .insert({ user_id: user.id, title, messages: allMessages })
      .select("id, created_at")
      .single();

    if (error) {
      console.error("chat_sessions: failed to create session", error);
    }

    if (data) {
      setActiveSessionId(data.id as string);
      setSessions((prev) => [
        { id: data.id as string, title, messages: allMessages, created_at: data.created_at as string },
        ...prev,
      ]);
      return data.id as string;
    }
    return null;
  }

  function startNewChat() {
    setActiveSessionId(null);
    setMessages([]);
    setInput("");
  }

  function openSession(session: ChatSession) {
    setActiveSessionId(session.id);
    setMessages(session.messages);
    setInput("");
  }

  async function sendMessage(text: string) {
    if (!text || isTyping) return;

    const nextMessages: Message[] = [...messages, { from: "user", text, time: now() }];
    setMessages(nextMessages);
    setInput("");
    setIsTyping(true);
    const sessionId = await persistSession(nextMessages, activeSessionId);

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
        const withError: Message[] = [...nextMessages, { from: "ai", text: data.error ?? t.aiChat.connectionError, time: now() }];
        setMessages(withError);
        await persistSession(withError, sessionId);
        return;
      }

      const withReply: Message[] = [...nextMessages, { from: "ai", text: data.reply, time: now() }];
      setMessages(withReply);
      await persistSession(withReply, sessionId);
    } catch {
      const withError: Message[] = [...nextMessages, { from: "ai", text: t.aiChat.connectionError, time: now() }];
      setMessages(withError);
      await persistSession(withError, sessionId);
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

  const isEmpty = sessionsLoaded && messages.length === 0;

  return (
    <div className="flex h-full flex-col">
      <div className="pb-4">
        <h1 className="text-xl font-bold tracking-tight text-text-primary">AI Ассистент</h1>
        <p className="text-sm text-text-muted">Ваш персональный помощник по переезду</p>
      </div>

      <div className="flex min-h-0 flex-1 gap-4">
        <aside className="flex w-[250px] flex-shrink-0 flex-col rounded-2xl border border-border-subtle bg-surface-1">
          <div className="border-b border-border-subtle p-3">
            <button
              type="button"
              onClick={startNewChat}
              className={`flex w-full items-center justify-center gap-2 rounded-full border border-border-strong bg-surface-1 px-4 py-2.5 text-sm font-medium text-text-primary transition-colors duration-150 hover:border-accent/40 hover:text-accent-bright ${pressScale}`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Новый чат
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {sessions.length === 0 ? (
              <p className="px-2 py-3 text-xs text-text-muted">История пуста</p>
            ) : (
              groupSessionsByDate(sessions).map((group, groupIndex) => (
                <div key={group.label}>
                  <p
                    className={`px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-text-muted ${
                      groupIndex === 0 ? "" : "pt-3"
                    }`}
                  >
                    {group.label}
                  </p>
                  <div className="space-y-1">
                    {group.sessions.map((session) => (
                      <button
                        key={session.id}
                        type="button"
                        onClick={() => openSession(session)}
                        className={`block w-full rounded-xl px-3 py-2.5 text-left transition-colors duration-150 ${
                          session.id === activeSessionId
                            ? "bg-accent/15 text-accent-bright"
                            : "text-text-muted hover:bg-surface-hover hover:text-text-primary"
                        }`}
                      >
                        <p className="truncate text-sm font-medium">{session.title}</p>
                        <p className="mt-0.5 text-xs text-text-muted">{formatSessionDate(session.created_at)}</p>
                      </button>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </aside>

        <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface-1">
          <div className="flex items-center gap-3 border-b border-border-subtle px-5 py-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-accent-bright">
              {SPARKLE_ICON}
            </span>
            <div>
              <p className="text-sm font-semibold text-text-primary">ReloAI ассистент</p>
              <p className="flex items-center gap-1.5 text-xs text-text-muted">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 motion-reduce:animate-none" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                Онлайн
              </p>
            </div>
          </div>

          {isEmpty ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
              <div>
                <h2 className="text-2xl font-bold text-text-primary">Чем могу помочь?</h2>
                <p className="mt-2 text-sm text-text-muted">Задайте вопрос о переезде — или выберите один из примеров ниже.</p>
              </div>
              <div className="grid w-full max-w-xl gap-2.5 sm:grid-cols-2">
                {t.aiChat.quickReplies.map((reply) => (
                  <button
                    key={reply}
                    type="button"
                    onClick={() => sendMessage(reply)}
                    className={`flex items-center gap-2.5 rounded-2xl border border-border-subtle bg-surface-1 px-4 py-3 text-left text-sm text-text-secondary transition-colors duration-150 hover:border-accent/40 hover:bg-accent/5 hover:text-text-primary ${pressScale}`}
                  >
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent-bright">
                      {quickReplyIcon(reply)}
                    </span>
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
                {messages.map((message, index) =>
                  message.from === "user" ? (
                    <div
                      key={index}
                      className="flex flex-col items-end transition-[opacity,transform] duration-300 ease-[var(--ease-out-strong)] starting:opacity-0 starting:translate-y-2"
                    >
                      <div className="max-w-[85%] rounded-2xl rounded-br-md bg-accent px-4 py-3 text-sm leading-relaxed text-white sm:max-w-[75%]">
                        {message.text}
                      </div>
                      {message.time !== null && (
                        <span className="mt-1 px-1 text-[10px] text-text-muted">{formatTime(message.time)}</span>
                      )}
                    </div>
                  ) : (
                    <div
                      key={index}
                      className="flex flex-col items-start transition-[opacity,transform] duration-300 ease-[var(--ease-out-strong)] starting:opacity-0 starting:translate-y-2"
                    >
                      <div className="flex max-w-[85%] items-start gap-2.5 sm:max-w-[75%]">
                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-bright">
                          {SPARKLE_ICON_SM}
                        </span>
                        <div className="text-sm leading-relaxed text-text-secondary">
                          {renderMessageBody(message.text)}
                        </div>
                      </div>
                      {message.time !== null && (
                        <span className="mt-1 px-1 text-[10px] text-text-muted">{formatTime(message.time)}</span>
                      )}
                    </div>
                  ),
                )}

                {isTyping && (
                  <div className="flex justify-start transition-[opacity,transform] duration-200 ease-[var(--ease-out-strong)] starting:opacity-0 starting:translate-y-2">
                    <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-border-subtle bg-surface-2 px-4 py-3">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500 [animation-delay:-0.2s] motion-reduce:animate-none" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500 [animation-delay:-0.1s] motion-reduce:animate-none" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500 motion-reduce:animate-none" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="border-t border-border-subtle p-3 sm:p-4">
            <div className="mx-auto flex w-full max-w-5xl items-center gap-2 rounded-full border border-border-subtle bg-surface-1 py-1.5 pl-5 pr-1.5 transition-[border-color,box-shadow] duration-150 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/30">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={t.aiChat.placeholder}
                className="flex-1 bg-transparent py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
              />
              <button
                type="submit"
                disabled={isTyping || !input.trim()}
                aria-label={t.aiChat.sendAria}
                className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-accent text-white transition-colors duration-150 hover:bg-accent-bright disabled:opacity-40 ${pressScale}`}
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
    </div>
  );
}

export default function DashboardAiPage() {
  return (
    <Suspense fallback={null}>
      <DashboardAiContent />
    </Suspense>
  );
}
