"use client";

import type { ReactNode } from "react";
import { GLOSSARY } from "../_lib/glossary";
import TermHint from "./TermHint";
import { useLanguage } from "./LanguageProvider";

// Scans `text` for known jargon (PESEL, NIP, karta pobytu, meldunek, etc. —
// see app/_lib/glossary.ts) and appends a "?" hint right after the first
// occurrence of each distinct term it finds, so a guide/bank card's name or
// description doesn't need to be rewritten by hand everywhere it's rendered.
// Only the first match per term is annotated (not every repeat) to avoid
// cluttering long descriptions with the same hint over and over.
//
// `pattern` matching always runs against the raw (Russian) source text —
// see the comment in glossary.ts — but the hint itself is shown in the
// user's current site language via useLanguage().
export default function TextWithGlossary({ text }: { text: string | null | undefined }) {
  const { lang } = useLanguage();
  if (!text) return null;

  type Match = { start: number; end: number; key: string };
  const matches: Match[] = [];

  for (const entry of GLOSSARY) {
    const found = text.match(entry.pattern);
    if (found && found.index !== undefined) {
      matches.push({ start: found.index, end: found.index + found[0].length, key: entry.key });
    }
  }

  if (matches.length === 0) return <>{text}</>;

  // Sort by position, then drop any match that overlaps one already kept.
  matches.sort((a, b) => a.start - b.start);
  const kept: Match[] = [];
  for (const m of matches) {
    const prev = kept[kept.length - 1];
    if (prev && m.start < prev.end) continue;
    kept.push(m);
  }

  const nodes: ReactNode[] = [];
  let cursor = 0;
  kept.forEach((m, i) => {
    const entry = GLOSSARY.find((g) => g.key === m.key);
    const glossaryText = entry?.text[lang] ?? entry?.text.ru;
    if (m.start > cursor) nodes.push(text.slice(cursor, m.start));
    nodes.push(text.slice(m.start, m.end));
    if (glossaryText) {
      nodes.push(<TermHint key={`${m.key}-${i}`} term={glossaryText.term} definition={glossaryText.definition} />);
    }
    cursor = m.end;
  });
  if (cursor < text.length) nodes.push(text.slice(cursor));

  return <>{nodes}</>;
}
