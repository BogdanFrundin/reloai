"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import { getFlagUrl } from "../_lib/flags";

type MessageFrom = "ai" | "user";

export default function ChatMockup() {
  const { t } = useLanguage();

  const conversation: { from: MessageFrom; text: string }[] = [
    { from: "ai", text: t.heroDemo.question },
    { from: "user", text: t.heroDemo.userReply },
    { from: "ai", text: t.heroDemo.response },
  ];

  const countries = [
    { code: "pl", name: t.countries.list[0].name },
    { code: "de", name: t.countries.list[1].name },
    { code: "es", name: t.countries.list[2].name },
  ];

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

      <div className="flex min-h-[240px] flex-col gap-3">
        {conversation.map((message, index) => (
          <div key={index} className={`flex ${message.from === "user" ? "justify-end" : "justify-start"}`}>
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

        <div className="flex flex-wrap gap-2 pt-1">
          {countries.map((country) => (
            <span
              key={country.name}
              className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent-bright"
            >
              <Image
                src={getFlagUrl(country.code, "sm")}
                alt={country.name}
                width={24}
                height={18}
                className="rounded-sm"
                unoptimized
              />
              {country.name}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4">
        <div className="flex-1 truncate rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-slate-500">
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
