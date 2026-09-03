"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { pressScale } from "../_lib/motion";
import { useAuth } from "./AuthProvider";
import { useLanguage } from "./LanguageProvider";
import UpgradeModal from "./UpgradeModal";
import { supabase } from "../../lib/supabase";

type MessageAction = { type: "section"; href: string } | { type: "premium" };
type Message = { from: "user" | "ai"; text: string; time: number | null; action?: MessageAction };

// Wrapped so the compiler's impure-call check doesn't flag genuine event-time timestamps.
function now(): number {
  return Date.now();
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Reveals `fullText` a few characters at a time into the last message of the
// array, so replies appear to be typed live instead of dumped in one frame.
async function revealReply(
  baseMessages: Message[],
  fullText: string,
  action: MessageAction | undefined,
  setMessages: (updater: (prev: Message[]) => Message[]) => void,
): Promise<void> {
  const step = fullText.length > 500 ? 7 : fullText.length > 200 ? 4 : fullText.length > 60 ? 2 : 1;
  let shown = 0;
  while (shown < fullText.length) {
    shown = Math.min(fullText.length, shown + step);
    const partial = fullText.slice(0, shown);
    setMessages((prev) => [...prev.slice(0, baseMessages.length), { from: "ai", text: partial, time: null }]);
    await sleep(14);
  }
  setMessages((prev) => [...prev.slice(0, baseMessages.length), { from: "ai", text: fullText, time: now(), action }]);
}

type SectionKey = "documents" | "housing" | "banks" | "medicine" | "work";

const SECTION_HREFS: Record<SectionKey, string> = {
  documents: "/documents",
  housing: "/housing",
  banks: "/banks",
  medicine: "/medicine",
  work: "/work",
};

const SECTION_KEYWORDS: { key: SectionKey; patterns: string[] }[] = [
  { key: "documents", patterns: ["pesel", "document", "докумен", "паспорт", "passport", "hujjat", "belge", "ҳуҷҷат", "виза", "visa", "viza", "раводид"] },
  { key: "housing", patterns: ["housing", "жиль", "жилье", "квартир", "apartment", "rent", "аренд", "uy-joy", "konut", "манзил"] },
  { key: "banks", patterns: ["bank", "банк", "bonk", "hisob", "счет"] },
  { key: "medicine", patterns: ["medic", "insurance", "медиц", "страхов", "tibbiy", "sağlık", "тибб", "nfz", "doctor", "врач"] },
  { key: "work", patterns: ["work", "job", "работ", "salary", "зарплат", "ish", "iş", "кор", "vacan"] },
];

const PREMIUM_COUNTRY_KEYWORDS = ["germany", "герман", "олмон", "almaniya", "almanya", "spain", "испан", "ispaniya", "испания"];

function detectSection(text: string): SectionKey | null {
  const msg = text.toLowerCase();
  return SECTION_KEYWORDS.find((s) => s.patterns.some((kw) => msg.includes(kw)))?.key ?? null;
}

function mentionsOtherCountry(text: string): boolean {
  const msg = text.toLowerCase();
  return PREMIUM_COUNTRY_KEYWORDS.some((kw) => msg.includes(kw));
}

function detectAction(userText: string, plan: string | null | undefined): MessageAction | undefined {
  const isFree = (plan ?? "free") === "free";
  if (isFree && mentionsOtherCountry(userText)) return { type: "premium" };
  const section = detectSection(userText);
  return section ? { type: "section", href: SECTION_HREFS[section] } : undefined;
}

// The model is told not to use Markdown, but LLMs occasionally slip anyway
// -- strip leftover syntax rather than showing raw '#'/'**' on screen, since
// this UI only renders '- ' bullets specially and treats everything else as
// plain text.
function stripMarkdownSyntax(line: string): string {
  return line
    .replace(/^#{1,6}\s+/, "") // leading heading markers ("### Title" -> "Title")
    .replace(/\*\*(.+?)\*\*/g, "$1") // **bold**
    .replace(/__(.+?)__/g, "$1") // __bold__
    .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "$1") // *italic*
    .replace(/`(.+?)`/g, "$1"); // `code`
}

function renderMessageBody(text: string): ReactNode {
  const lines = text
    .split("\n")
    .map((line) => stripMarkdownSyntax(line.trim()))
    .filter((line) => line.length > 0);
  const blocks: ReactNode[] = [];
  let bulletBuffer: string[] = [];

  function flushBullets() {
    if (bulletBuffer.length === 0) return;
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="list-disc space-y-1 pl-4">
        {bulletBuffer.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>,
    );
    bulletBuffer = [];
  }

  for (const line of lines) {
    const bulletMatch = line.match(/^[-•*]\s+(.*)/);
    if (bulletMatch) {
      bulletBuffer.push(bulletMatch[1]);
    } else {
      flushBullets();
      blocks.push(<p key={`p-${blocks.length}`}>{line}</p>);
    }
  }
  flushBullets();

  return <div className="space-y-1.5">{blocks}</div>;
}

function buildPersonalizedGreeting(
  t: ReturnType<typeof useLanguage>["t"],
  profile: ReturnType<typeof useAuth>["profile"],
): string {
  if (!profile?.goal || !profile?.country) return t.aiChat.welcome;

  const goalLabel = (t.onboarding.goalOptions as Record<string, string>)[profile.goal] ?? profile.goal;
  const selectedRouteName = profile.selected_route?.name;

  const summary = t.aiChat.personalizedGreeting.replace("{country}", profile.country).replace("{goal}", goalLabel);

  return selectedRouteName ? `${summary} ${t.aiChat.personalizedRecommendation.replace("{pathway}", selectedRouteName)}` : summary;
}

export default function AiChatPanel({ onClose }: { onClose?: () => void }) {
  const { user, profile } = useAuth();
  const { t, lang } = useLanguage();
  const [messages, setMessages] = useState<Message[]>(() => [
    { from: "ai", text: buildPersonalizedGreeting(t, profile), time: now() },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [greetingInputs, setGreetingInputs] = useState({ t, profile });
  const [upgradeOpen, setUpgradeOpen] = useState(false);

  // Recompute the still-untouched initial greeting when language/profile change,
  // following React's "adjust state during render" pattern instead of an effect.
  if ((greetingInputs.t !== t || greetingInputs.profile !== profile) && messages.length === 1 && messages[0].from === "ai") {
    setGreetingInputs({ t, profile });
    setMessages([{ from: "ai", text: buildPersonalizedGreeting(t, profile), time: messages[0].time }]);
  }

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
            time: row.created_at ? new Date(row.created_at as string).getTime() : now(),
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
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          { from: "ai", text: data.error ?? t.aiChat.connectionError, time: now() },
        ]);
        return;
      }

      const action = detectAction(text, profile?.plan);
      setIsTyping(false);
      setIsRevealing(true);
      await revealReply(nextMessages, data.reply, action, setMessages);
      setIsRevealing(false);
      saveMessage("assistant", data.reply);
    } catch {
      setIsTyping(false);
      setIsRevealing(false);
      setMessages((prev) => [...prev, { from: "ai", text: t.aiChat.connectionError, time: now() }]);
    } finally {
      setIsTyping(false);
      setIsRevealing(false);
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
    <div className="flex h-full flex-col rounded-2xl border border-border-subtle bg-surface-1 backdrop-blur-xl">
      <div className="flex items-center gap-3 border-b border-border-subtle px-5 py-4">
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-bright text-sm font-bold text-white shadow-[0_0_18px_-4px_rgba(91,141,239,0.7)]">
          AI
        </span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-text-primary">{t.chat.assistantName}</p>
          <p className="flex items-center gap-1.5 text-xs text-text-muted">
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
            className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-text-muted transition-colors duration-150 hover:bg-surface-hover hover:text-text-primary ${pressScale}`}
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
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                message.from === "user"
                  ? "rounded-br-md bg-gradient-to-br from-accent to-accent-bright text-white shadow-[0_6px_18px_-8px_rgba(91,141,239,0.6)]"
                  : "rounded-bl-md border border-border-subtle bg-surface-2/80 text-text-secondary shadow-sm backdrop-blur-sm"
              }`}
            >
              {message.from === "user" ? (
                message.text
              ) : (
                <>
                  {renderMessageBody(message.text)}
                  {isRevealing && index === messages.length - 1 && (
                    <span className="ml-0.5 inline-block h-4 w-[2px] -mb-0.5 animate-pulse bg-accent-bright align-middle" />
                  )}
                </>
              )}
            </div>
            {message.from === "ai" && message.action && (
              message.action.type === "premium" ? (
                <button
                  type="button"
                  onClick={() => setUpgradeOpen(true)}
                  className="mt-1.5 inline-flex w-fit items-center gap-1 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent-bright transition-colors duration-150 hover:border-accent/60 hover:bg-accent/15"
                >
                  {t.aiChat.premiumLabel}
                </button>
              ) : (
                <Link
                  href={message.action.href}
                  className="mt-1.5 inline-flex w-fit items-center gap-1 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent-bright transition-colors duration-150 hover:border-accent/60 hover:bg-accent/15"
                >
                  {t.aiChat.actionLabel}
                </Link>
              )
            )}
            {message.time !== null && (
              <span className="mt-1 px-1 text-[10px] text-text-muted">{formatTime(message.time)}</span>
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
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-border-subtle bg-surface-2 px-4 py-3">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500 [animation-delay:-0.2s] motion-reduce:animate-none" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500 [animation-delay:-0.1s] motion-reduce:animate-none" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500 motion-reduce:animate-none" />
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border-subtle p-3">
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={t.aiChat.placeholder}
          disabled={isTyping || isRevealing}
          className="flex-1 rounded-xl border border-border-subtle bg-surface-1 px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-[border-color,box-shadow] duration-150 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isTyping || isRevealing}
          aria-label={t.aiChat.sendAria}
          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-bright text-white shadow-[0_0_14px_-4px_rgba(91,141,239,0.7)] transition-colors duration-150 hover:brightness-110 disabled:opacity-60 disabled:shadow-none ${pressScale}`}
        >
          {isTyping || isRevealing ? (
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

      <UpgradeModal open={upgradeOpen} onClose={() => setUpgradeOpen(false)} />
    </div>
  );
}
