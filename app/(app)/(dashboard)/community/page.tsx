"use client";

import Image from "next/image";
import { useState } from "react";
import PageHeader from "../../../_components/PageHeader";
import Reveal from "../../../_components/Reveal";
import RegisterPromptModal from "../../../_components/RegisterPromptModal";
import { pressScale } from "../../../_lib/motion";
import { getFlagUrl } from "../../../_lib/flags";
import { useLanguage } from "../../../_components/LanguageProvider";
import { useAuth } from "../../../_components/AuthProvider";

type Category = "all" | "housing" | "work" | "sport" | "family" | "general";

const TABS: Category[] = ["all", "housing", "work", "sport", "family", "general"];

const CHANNELS: { name: string; members: string; flag: string; category: Exclude<Category, "all"> }[] = [
  { name: "Poles & Newcomers Warsaw", members: "12.4K", flag: "🇵🇱", category: "general" },
  { name: "Warsaw Flats & Rooms", members: "8.2K", flag: "🇷🇺", category: "housing" },
  { name: "IT Jobs Poland", members: "15.6K", flag: "🇬🇧", category: "work" },
  { name: "Polska dla Ukraińców", members: "22.1K", flag: "🇺🇦", category: "general" },
  { name: "Running Warsaw", members: "1.8K", flag: "🇵🇱", category: "sport" },
  { name: "Expat Families Poland", members: "3.4K", flag: "🇬🇧", category: "family" },
  { name: "Kraków Newcomers", members: "6.7K", flag: "🇵🇱", category: "general" },
  { name: "Remote Workers PL", members: "9.1K", flag: "🇬🇧", category: "work" },
  { name: "Football Pickup Warsaw", members: "950", flag: "🇵🇱", category: "sport" },
  { name: "Moms in Warsaw", members: "2.6K", flag: "🇷🇺", category: "family" },
];

export default function CommunityPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Category>("all");
  const [promptOpen, setPromptOpen] = useState(false);

  const filtered =
    activeTab === "all" ? CHANNELS : CHANNELS.filter((channel) => channel.category === activeTab);

  return (
    <div className="px-6 py-8 lg:px-10 lg:py-10">
      <PageHeader
        title={
          <span className="inline-flex items-center gap-3">
            {t.community.title}
            <Image src={getFlagUrl("pl", "md")} alt="Poland" width={32} height={24} className="rounded-sm" unoptimized />
          </span>
        }
        subtitle={t.community.subtitle}
      />

      <Reveal delay={40}>
        <div className="mt-6 flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                activeTab === tab
                  ? "border-accent/50 bg-accent/10 text-accent-bright"
                  : "border-border-subtle bg-surface-1 text-text-muted hover:border-border-strong hover:text-text-primary"
              }`}
            >
              {t.community.cats[tab]}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((channel, index) => (
          <Reveal key={channel.name} delay={index * 40}>
            <div className="group flex h-full flex-col rounded-2xl border border-border-subtle bg-surface-1 p-5 backdrop-blur-sm transition-[transform,box-shadow,border-color,background-color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:border-accent/50 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-surface-hover [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_12px_32px_-12px_rgba(33,85,212,0.45)] motion-reduce:transition-none">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-bright transition-transform duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105 motion-reduce:transition-none">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l18-8-8 18-2-8-8-2z" />
                    </svg>
                  </span>
                  <span className="text-2xl">{channel.flag}</span>
                </div>
                <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent-bright">
                  {t.community.cats[channel.category]}
                </span>
              </div>
              <p className="mt-3 text-sm font-semibold text-text-primary">{channel.name}</p>
              <p className="mt-1 text-xs text-text-muted transition-colors duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-accent-bright motion-reduce:transition-none">
                {channel.members} {t.community.members}
              </p>
              <button
                type="button"
                onClick={() => !user && setPromptOpen(true)}
                className={`mt-4 self-start rounded-full border border-border-strong bg-surface-1 px-4 py-2 text-xs font-semibold text-text-secondary transition-[background-color,border-color,color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:border-accent [@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent [@media(hover:hover)_and_(pointer:fine)]:hover:text-white motion-reduce:transition-none ${pressScale}`}
              >
                {t.community.join}
              </button>
            </div>
          </Reveal>
        ))}
      </div>

      <RegisterPromptModal open={promptOpen} onClose={() => setPromptOpen(false)} />
    </div>
  );
}
