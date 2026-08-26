"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { DocumentGuide } from "./DocumentGuideList";
import { useCurrency } from "./CurrencyProvider";
import { convertPlnText } from "../_lib/currency";
import CurrencyHint from "./CurrencyHint";
import TextWithGlossary from "./TextWithGlossary";

const SCALE_ICON = (
  <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v18M4 7h16M4 7l-2 5a3 3 0 006 0l-2-5m14 0l-2 5a3 3 0 006 0l-2-5M8 21h8"
    />
  </svg>
);

const STETHOSCOPE_ICON = (
  <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v5a4 4 0 008 0V3M9 12v2a5 5 0 0010 0v-2" />
    <circle cx="19" cy="16" r="2" />
  </svg>
);

const ID_CARD_ICON = (
  <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <circle cx="8.5" cy="12" r="2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 16.5c0-1.4 1.2-2.5 2.5-2.5S11 15.1 11 16.5M14 10h4M14 13.5h4" />
  </svg>
);

const FILE_TEXT_ICON = (
  <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 3v5h5M9 13h6M9 17h6M9 9h2" />
  </svg>
);

const CAR_ICON = (
  <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 11l1.5-4.5A2 2 0 018.4 5h7.2a2 2 0 011.9 1.5L19 11m-14 0h14m-14 0a2 2 0 00-2 2v3a1 1 0 001 1h1m14-6a2 2 0 012 2v3a1 1 0 01-1 1h-1m-14 0v1a1 1 0 001 1h1a1 1 0 001-1v-1m10 0v1a1 1 0 001 1h1a1 1 0 001-1v-1"
    />
  </svg>
);

const PLANE_ICON = (
  <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 3L3 10.5l7 2.5m11-10l-7 18-2.5-7.5m9.5-10.5L10.5 13" />
  </svg>
);

const HEART_ICON = (
  <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 20.5s-7.5-4.6-9.5-9.1C1.2 8.1 3 5 6.2 5c1.9 0 3.3 1 4.3 2.4C11.5 6 12.9 5 14.8 5 18 5 19.8 8.1 18.5 11.4 16.5 15.9 12 20.5 12 20.5z"
    />
  </svg>
);

const SHIELD_ICON = (
  <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
  </svg>
);

const SPARKLE_ICON = (
  <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a2.25 2.25 0 00-1.632-1.632L15 6.75l1.035-.259a2.25 2.25 0 001.632-1.632L18 3.75l.259 1.035a2.25 2.25 0 001.632 1.632L21 6.75l-1.035.259a2.25 2.25 0 00-1.632 1.632z"
    />
  </svg>
);

const TOPIC_ICONS: { match: RegExp; icon: ReactNode; ramp: string }[] = [
  { match: /nfz|частн/i, icon: SCALE_ICON, ramp: "blue" },
  { match: /врач|poz|приём/i, icon: STETHOSCOPE_ICON, ramp: "green" },
  { match: /ekuz|карт/i, icon: ID_CARD_ICON, ramp: "teal" },
  { match: /справк/i, icon: FILE_TEXT_ICON, ramp: "coral" },
  { match: /автомобил|ac\b|oc\b|транспорт/i, icon: CAR_ICON, ramp: "amber" },
  { match: /путешеств|travel|поездк/i, icon: PLANE_ICON, ramp: "purple" },
  { match: /жизн/i, icon: HEART_ICON, ramp: "pink" },
];

const RAMP_STYLES: Record<string, { bg: string; text: string }> = {
  blue: { bg: "rgba(91,141,239,0.15)", text: "#8fb4f4" },
  green: { bg: "rgba(126,203,163,0.15)", text: "#7ecba3" },
  teal: { bg: "rgba(143,212,224,0.15)", text: "#8fd4e0" },
  coral: { bg: "rgba(231,155,126,0.15)", text: "#e79b7e" },
  amber: { bg: "rgba(240,192,96,0.15)", text: "#f0c060" },
  purple: { bg: "rgba(175,169,236,0.15)", text: "#afa9ec" },
  pink: { bg: "rgba(237,147,177,0.15)", text: "#ed93b1" },
};

function topicVisual(name: string): { icon: ReactNode; bg: string; text: string } {
  const found = TOPIC_ICONS.find((t) => t.match.test(name));
  const ramp = found?.ramp ?? "blue";
  const style = RAMP_STYLES[ramp];
  return { icon: found?.icon ?? SHIELD_ICON, bg: style.bg, text: style.text };
}

function InfoRow({ label, value, showCurrencyHint }: { label: string; value: string; showCurrencyHint?: boolean }) {
  return (
    <div className="text-xs">
      <p className="flex items-center gap-1 text-white/40">
        {label}
        {showCurrencyHint && <CurrencyHint />}
      </p>
      <p className="mt-0.5 text-white/70">{value}</p>
    </div>
  );
}

function Bullets({ items, tone }: { items: string[]; tone?: "warn" | "accent" }) {
  const textClass = tone === "warn" ? "text-red-300" : "text-white/70";
  const dotClass = tone === "warn" ? "bg-red-400" : tone === "accent" ? "bg-accent-bright" : "bg-white/30";
  return (
    <ul className="space-y-1.5">
      {items.map((it) => (
        <li key={it} className={`flex items-start gap-2 text-xs ${textClass}`}>
          <span className={`mt-1.5 h-1 w-1 flex-shrink-0 rounded-full ${dotClass}`} />
          {it}
        </li>
      ))}
    </ul>
  );
}

function TopicCard({ guide }: { guide: DocumentGuide }) {
  const router = useRouter();
  const { currency, rates } = useCurrency();
  const [open, setOpen] = useState(false);
  const rawLink = guide.online_url || guide.links?.[0];
  const link = rawLink ? (rawLink.startsWith("http") ? rawLink : `https://${rawLink}`) : null;
  const visual = topicVisual(guide.name);
  const cost = convertPlnText(guide.cost, currency, rates);

  function askAi() {
    const question = `Расскажи подробнее про "${guide.name}": как оформить, какие документы нужны и на что обратить внимание?`;
    router.push(`/dashboard/ai?q=${encodeURIComponent(question)}`);
  }

  return (
    <div className="group relative flex h-full flex-col rounded-[28px] bg-[#1c1f26] p-6 transition-[transform,box-shadow,background-color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#20242d] [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_16px_36px_-14px_rgba(33,85,212,0.4)] motion-reduce:transition-none">
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          askAi();
        }}
        aria-label={`Спросить ИИ про ${guide.name}`}
        className="absolute right-5 top-5 z-10 flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white/80 transition-colors duration-150 hover:bg-accent hover:text-white"
      >
        {SPARKLE_ICON}
        Спросить ИИ
      </button>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full flex-1 flex-col items-start gap-4 pr-28 text-left"
      >
        <span
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: visual.bg, color: visual.text }}
        >
          {visual.icon}
        </span>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[19px] font-bold leading-tight text-white">
              <TextWithGlossary text={guide.name} />
            </p>
            {guide.important_2026 && (
              <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                Важно 2026
              </span>
            )}
          </div>
          {guide.description && (
            <p className={`mt-2 text-xs leading-relaxed text-white/50 ${open ? "" : "line-clamp-2"}`}>
              {guide.description}
            </p>
          )}
        </div>
      </button>

      <div className="mt-4" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="w-full rounded-2xl bg-white/10 py-3 text-[13px] font-bold text-white transition-colors duration-150 hover:bg-accent"
        >
          {open ? "Свернуть" : "Подробнее"}
        </button>
      </div>

      {open && (
        <div className="mt-4 space-y-4 border-t border-white/10 pt-4">
          {guide.important_2026 && (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs leading-relaxed text-amber-200">
              {guide.important_2026}
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            {guide.when_to_get && <InfoRow label="Когда оформлять" value={guide.when_to_get} />}
            {guide.where_to_submit && <InfoRow label="Куда подавать" value={guide.where_to_submit} />}
            {guide.working_hours && <InfoRow label="Часы работы" value={guide.working_hours} />}
            {guide.online_booking && <InfoRow label="Запись онлайн" value={guide.online_booking} />}
            {cost && <InfoRow label="Стоимость" value={cost} showCurrencyHint />}
            {guide.waiting_time && <InfoRow label="Срок ожидания" value={guide.waiting_time} />}
          </div>

          {guide.required_docs && guide.required_docs.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-white/70">Документы</p>
              <div className="mt-1.5">
                <Bullets items={guide.required_docs} />
              </div>
            </div>
          )}

          {guide.instructions && guide.instructions.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-white/70">Как оформить</p>
              <ol className="mt-1.5 space-y-1.5">
                {guide.instructions.map((step, i) => (
                  <li key={step} className="flex items-start gap-2 text-xs text-white/70">
                    <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-[10px] font-bold text-accent-bright">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {guide.tips && guide.tips.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-white/70">Советы</p>
              <div className="mt-1.5">
                <Bullets items={guide.tips} tone="accent" />
              </div>
            </div>
          )}

          {guide.common_mistakes && guide.common_mistakes.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-white/70">Частые ошибки</p>
              <div className="mt-1.5">
                <Bullets items={guide.common_mistakes} tone="warn" />
              </div>
            </div>
          )}

          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-accent"
            >
              Официальный сайт
              <span aria-hidden>→</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default function GuideTopicGrid({
  guides,
  loading,
  emptyText,
  searchPlaceholder = "Поиск",
}: {
  guides: DocumentGuide[];
  loading: boolean;
  emptyText: string;
  searchPlaceholder?: string;
}) {
  const [search, setSearch] = useState("");
  const term = search.trim().toLowerCase();
  const filtered = term
    ? guides.filter(
        (g) => g.name.toLowerCase().includes(term) || (g.description ?? "").toLowerCase().includes(term)
      )
    : guides;

  return (
    <div>
      <div className="mb-4 max-w-sm">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full rounded-full border border-border-strong bg-surface-1 px-4 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
        />
      </div>
      {loading ? (
        <p className="text-sm text-text-muted">Загрузка…</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-text-muted">{emptyText}</p>
      ) : (
        <div className="grid items-stretch gap-4 sm:grid-cols-2">
          {filtered.map((g) => (
            <TopicCard key={g.id} guide={g} />
          ))}
        </div>
      )}
    </div>
  );
}
