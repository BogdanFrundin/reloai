"use client";

import { useState } from "react";
import PageHeader from "../../_components/PageHeader";
import Reveal from "../../_components/Reveal";
import { pressScale } from "../../_lib/motion";
import { useLanguage } from "../../_components/LanguageProvider";

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
  const [activeTab, setActiveTab] = useState<Category>("all");

  const filtered =
    activeTab === "all" ? CHANNELS : CHANNELS.filter((channel) => channel.category === activeTab);

  return (
    <div className="px-6 py-8 lg:px-10 lg:py-10">
      <PageHeader title={t.community.title} subtitle={t.community.subtitle} />

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
                  : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {t.community.cats[tab]}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((channel, index) => (
          <Reveal key={channel.name} delay={index * 40}>
            <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
              <div className="flex items-start justify-between gap-2">
                <span className="text-2xl">{channel.flag}</span>
                <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent-bright">
                  {t.community.cats[channel.category]}
                </span>
              </div>
              <p className="mt-3 text-sm font-semibold text-white">{channel.name}</p>
              <p className="mt-1 text-xs text-slate-500">
                {channel.members} {t.community.members}
              </p>
              <button
                type="button"
                className={`mt-4 self-start rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-accent-bright ${pressScale}`}
              >
                {t.community.join}
              </button>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
