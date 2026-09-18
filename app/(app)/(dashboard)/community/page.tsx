"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import PageHeader from "../../../_components/PageHeader";
import Reveal from "../../../_components/Reveal";
import RegisterPromptModal from "../../../_components/RegisterPromptModal";
import { pressScale } from "../../../_lib/motion";
import { getFlagUrl } from "../../../_lib/flags";
import { useLanguage } from "../../../_components/LanguageProvider";
import { useAuth } from "../../../_components/AuthProvider";
import type { Dictionary } from "../../../_lib/i18n";

type Category = "all" | "housing" | "work" | "sport" | "family" | "general";

const TABS: Category[] = ["all", "housing", "work", "sport", "family", "general"];

type ChannelId = keyof Dictionary["community"]["channelDescriptions"];

const CHANNELS: {
  id: ChannelId;
  name: string;
  members: string;
  flag: string;
  category: Exclude<Category, "all">;
  // A couple of channels are flagged as recently added so the "new this
  // week" stat in the header strip is derived from real data instead of a
  // hardcoded number that would drift out of sync.
  addedRecently?: boolean;
}[] = [
  { id: "polesNewcomersWarsaw", name: "Poles & Newcomers Warsaw", members: "12.4K", flag: "🇵🇱", category: "general" },
  { id: "warsawFlatsRooms", name: "Warsaw Flats & Rooms", members: "8.2K", flag: "🇷🇺", category: "housing" },
  { id: "itJobsPoland", name: "IT Jobs Poland", members: "15.6K", flag: "🇬🇧", category: "work" },
  { id: "polskaDlaUkraincow", name: "Polska dla Ukraińców", members: "22.1K", flag: "🇺🇦", category: "general" },
  { id: "runningWarsaw", name: "Running Warsaw", members: "1.8K", flag: "🇵🇱", category: "sport" },
  { id: "expatFamiliesPoland", name: "Expat Families Poland", members: "3.4K", flag: "🇬🇧", category: "family" },
  { id: "krakowNewcomers", name: "Kraków Newcomers", members: "6.7K", flag: "🇵🇱", category: "general" },
  { id: "remoteWorkersPl", name: "Remote Workers PL", members: "9.1K", flag: "🇬🇧", category: "work", addedRecently: true },
  { id: "footballPickupWarsaw", name: "Football Pickup Warsaw", members: "950", flag: "🇵🇱", category: "sport", addedRecently: true },
  { id: "momsInWarsaw", name: "Moms in Warsaw", members: "2.6K", flag: "🇷🇺", category: "family", addedRecently: true },
];

// Turns "12.4K" / "950" style member counts into a plain number, so the
// stats strip and the "biggest community" spotlight are derived from the
// same list instead of a second, easily-stale hardcoded source of truth.
function parseMembers(members: string): number {
  const trimmed = members.trim();
  if (trimmed.toUpperCase().endsWith("K")) return Math.round(parseFloat(trimmed) * 1000);
  return parseInt(trimmed.replace(/[^\d]/g, ""), 10) || 0;
}

function formatCompactTotal(total: number): string {
  return total >= 1000 ? `${Math.round(total / 1000)}K+` : String(total);
}

const CATEGORY_ICONS: Record<Exclude<Category, "all">, ReactNode> = {
  housing: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 11l9-7 9 7M5 10v9a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1v-9" />
    </svg>
  ),
  work: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path strokeLinecap="round" d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
  ),
  sport: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
      <circle cx="13" cy="5" r="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 20l3-6 3 2 2-4 3 1M9 12l2-3 4 1 2-3" />
    </svg>
  ),
  family: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-4.5-9.5-9C.8 8.4 2.3 5 5.5 5c1.8 0 3.2 1 4.5 2.6C11.3 6 12.7 5 14.5 5 17.7 5 19.2 8.4 21.5 12c-2.5 4.5-9.5 9-9.5 9z" />
    </svg>
  ),
  general: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.4 8.4 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.4 8.4 0 01-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.4 8.4 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    </svg>
  ),
};

// Each category gets its own icon color instead of every card sharing the
// same accent-blue paper-plane icon — the main reason the old grid read as
// repetitive at a glance.
const CATEGORY_COLORS: Record<Exclude<Category, "all">, { bg: string; text: string }> = {
  housing: { bg: "bg-accent/15", text: "text-accent-bright" },
  work: { bg: "bg-amber-500/15", text: "text-amber-400" },
  sport: { bg: "bg-emerald-500/15", text: "text-emerald-400" },
  family: { bg: "bg-rose-500/15", text: "text-rose-400" },
  general: { bg: "bg-violet-500/15", text: "text-violet-400" },
};

function StatBox({ label, value, valueClassName }: { label: string; value: string; valueClassName?: string }) {
  return (
    <div className="rounded-xl bg-white/[0.03] p-3">
      <p className="text-[11px] text-text-muted">{label}</p>
      <p className={`mt-0.5 text-lg font-bold ${valueClassName ?? "text-text-primary"}`}>{value}</p>
    </div>
  );
}

export default function CommunityPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Category>("all");
  const [promptOpen, setPromptOpen] = useState(false);
  const c = t.community;

  const filtered = activeTab === "all" ? CHANNELS : CHANNELS.filter((channel) => channel.category === activeTab);
  const sortedByMembers = [...filtered].sort((a, b) => parseMembers(b.members) - parseMembers(a.members));
  const featured = sortedByMembers[0] ?? null;
  const rest = sortedByMembers.slice(1);

  const totalCommunities = CHANNELS.length;
  const totalMembers = CHANNELS.reduce((sum, channel) => sum + parseMembers(channel.members), 0);
  const newThisWeek = CHANNELS.filter((channel) => channel.addedRecently).length;

  function handleJoinClick() {
    if (!user) setPromptOpen(true);
  }

  return (
    <div className="px-6 py-8 lg:px-10 lg:py-10">
      <PageHeader
        title={
          <span className="inline-flex items-center gap-3">
            {c.title}
            <Image src={getFlagUrl("pl", "md")} alt="Poland" width={32} height={24} className="rounded-sm" unoptimized />
          </span>
        }
        subtitle={c.subtitle}
      />

      <Reveal delay={20}>
        <div className="mt-6 grid grid-cols-3 gap-3 sm:max-w-md">
          <StatBox label={c.statsCommunities} value={String(totalCommunities)} />
          <StatBox label={c.statsMembers} value={formatCompactTotal(totalMembers)} />
          <StatBox label={c.statsNewWeek} value={`+${newThisWeek}`} valueClassName="text-accent-bright" />
        </div>
      </Reveal>

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
              {c.cats[tab]}
            </button>
          ))}
        </div>
      </Reveal>

      {featured && (
        <Reveal delay={60}>
          <div className="mt-6 rounded-2xl border border-accent/30 bg-accent/[0.06] p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <span
                  className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${CATEGORY_COLORS[featured.category].bg} ${CATEGORY_COLORS[featured.category].text}`}
                >
                  {CATEGORY_ICONS[featured.category]}
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-base font-semibold text-text-primary">{featured.name}</p>
                    <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-amber-400">
                      {c.featuredBadge}
                    </span>
                  </div>
                  <p className="mt-1 max-w-md text-xs text-text-secondary">{c.channelDescriptions[featured.id]}</p>
                </div>
              </div>
              <div className="flex flex-shrink-0 gap-2">
                <button
                  type="button"
                  onClick={handleJoinClick}
                  className={`rounded-full border border-border-strong px-4 py-2 text-xs font-semibold text-text-secondary transition-colors duration-150 hover:border-accent/40 hover:text-text-primary ${pressScale}`}
                >
                  {c.openBtn}
                </button>
                <button
                  type="button"
                  onClick={handleJoinClick}
                  className={`rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-accent-bright ${pressScale}`}
                >
                  {c.join}
                </button>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-3">
              <div className="flex">
                <span className="h-[22px] w-[22px] rounded-full border-2 border-[var(--panel)] bg-white/20" style={{ marginRight: -8 }} />
                <span className="h-[22px] w-[22px] rounded-full border-2 border-[var(--panel)] bg-white/25" style={{ marginRight: -8 }} />
                <span className="h-[22px] w-[22px] rounded-full border-2 border-[var(--panel)] bg-white/30" />
              </div>
              <span className="text-xs text-text-muted">
                {featured.members} {c.members}
              </span>
            </div>
          </div>
        </Reveal>
      )}

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((channel, index) => (
          <Reveal key={channel.id} delay={index * 40}>
            <div className="group flex h-full flex-col rounded-2xl border border-border-subtle bg-surface-1 p-5 backdrop-blur-sm transition-[transform,box-shadow,border-color,background-color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:border-accent/50 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-surface-hover [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_12px_32px_-12px_rgba(33,85,212,0.45)] motion-reduce:transition-none">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-300 ease-[var(--ease-out-strong)] group-hover:scale-105 motion-reduce:transition-none ${CATEGORY_COLORS[channel.category].bg} ${CATEGORY_COLORS[channel.category].text}`}
                  >
                    {CATEGORY_ICONS[channel.category]}
                  </span>
                  <span className="text-2xl">{channel.flag}</span>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${CATEGORY_COLORS[channel.category].bg} ${CATEGORY_COLORS[channel.category].text}`}
                >
                  {c.cats[channel.category]}
                </span>
              </div>
              <p className="mt-3 text-sm font-semibold text-text-primary">{channel.name}</p>
              <p className="mt-1 line-clamp-2 flex-1 text-xs text-text-secondary">{c.channelDescriptions[channel.id]}</p>
              <p className="mt-2 text-xs text-text-muted transition-colors duration-300 ease-[var(--ease-out-strong)] group-hover:text-accent-bright motion-reduce:transition-none">
                {channel.members} {c.members}
              </p>
              <button
                type="button"
                onClick={handleJoinClick}
                className={`mt-4 self-start rounded-full border border-border-strong bg-surface-1 px-4 py-2 text-xs font-semibold text-text-secondary transition-[background-color,border-color,color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:border-accent [@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent [@media(hover:hover)_and_(pointer:fine)]:hover:text-white motion-reduce:transition-none ${pressScale}`}
              >
                {c.join}
              </button>
            </div>
          </Reveal>
        ))}

        <Reveal delay={rest.length * 40}>
          <div className="flex h-full flex-col items-center justify-center gap-1.5 rounded-2xl border border-dashed border-border-strong p-5 text-center">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.05] text-text-muted">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
              </svg>
            </span>
            <p className="text-sm font-semibold text-text-primary">{c.emptyTitle}</p>
            <p className="text-xs text-text-muted">{c.emptyBody}</p>
          </div>
        </Reveal>
      </div>

      <RegisterPromptModal open={promptOpen} onClose={() => setPromptOpen(false)} />
    </div>
  );
}
