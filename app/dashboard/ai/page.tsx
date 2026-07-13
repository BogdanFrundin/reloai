"use client";

import PageHeader from "../../_components/PageHeader";
import Reveal from "../../_components/Reveal";

const EXAMPLE_QUESTIONS = [
  "Как получить PESEL?",
  "Какой банк открыть в Польше?",
  "Как найти жильё в Варшаве?",
  "Какие документы нужны для переезда?",
  "Сколько стоит виза на работу?",
  "Как оформить медицинскую страховку?",
];

export default function DashboardAiPage() {
  return (
    <div className="px-2 py-2">
      <PageHeader
        title="AI Ассистент"
        subtitle="Ваш персональный помощник по переезду. Задайте вопрос в чате справа."
      />

      <Reveal delay={60} className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Примеры вопросов</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {EXAMPLE_QUESTIONS.map((question) => (
            <div
              key={question}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300 backdrop-blur-sm"
            >
              {question}
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
