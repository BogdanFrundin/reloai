"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";
import HelpButton from "./HelpButton";
import type { Phase, PhaseStatus } from "../_lib/checklist";

const STEP_GUIDES: Record<string, { heading: string; steps: string[] }> = {
  visa_eligibility: {
    heading: "Как оформить визу или основание на въезд",
    steps: [
      "Определите тип визы или основания для въезда в зависимости от вашей цели (работа, учёба, бизнес, воссоединение семьи).",
      "Соберите базовый пакет документов: загранпаспорт, приглашение или подтверждение цели поездки, страховку, финансовые гарантии.",
      "Подайте заявление в консульство или визовый центр страны переезда.",
      "Дождитесь решения и, при необходимости, пройдите собеседование.",
      "После получения визы уточните сроки въезда и что делать по прибытии.",
    ],
  },
  business_registration: {
    heading: "Как зарегистрировать бизнес",
    steps: [
      "Выберите организационно-правовую форму (ИП, ООО и аналоги) в зависимости от страны.",
      "Подготовьте учредительные документы и подтверждение юридического адреса.",
      "Подайте заявление на регистрацию в соответствующий государственный реестр.",
      "Получите налоговый и статистический номера компании.",
      "Откройте расчётный счёт на имя бизнеса.",
    ],
  },
  documents: {
    heading: "Какие документы нужно подготовить",
    steps: [
      "Соберите оригиналы и копии основных документов: паспорт, свидетельства, дипломы (при необходимости — с апостилем).",
      "Сделайте нотариально заверенные переводы документов на язык страны переезда, если это требуется.",
      "Загрузите сканы документов в раздел «Документы» в ReloAI, чтобы отслеживать их статус.",
      "Проверяйте статус каждого документа: Готово, На проверке или Отсутствует.",
      "Держите оригиналы под рукой — они могут понадобиться при личной подаче в госорганы.",
    ],
  },
  biometric: {
    heading: "Как пройти биометрию",
    steps: [
      "Запишитесь на подачу биометрических данных в миграционную службу или консульство — часто это можно сделать онлайн.",
      "Возьмите с собой паспорт, приглашение на приём и подтверждающие документы.",
      "На приёме у вас снимут отпечатки пальцев и сделают фото.",
      "Сохраните расписку или номер заявки — по нему можно отслеживать готовность документа.",
      "Дождитесь уведомления о готовности карты или разрешения.",
    ],
  },
  address_registration: {
    heading: "Как зарегистрировать адрес проживания",
    steps: [
      "Найдите постоянное или временное жильё и получите от владельца согласие на регистрацию (договор аренды или согласие собственника).",
      "Подготовьте паспорт и документ, подтверждающий право пользования жильём.",
      "Обратитесь в местную администрацию лично или через портал госуслуг.",
      "Заполните заявление о регистрации по месту жительства.",
      "Получите подтверждение регистрации — оно понадобится для дальнейших процедур (ВНЖ, налоговый номер и т.д.).",
    ],
  },
  residence_permit: {
    heading: "Как получить вид на жительство",
    steps: [
      "Убедитесь, что у вас есть основание для подачи: работа, учёба, бизнес или воссоединение семьи.",
      "Соберите пакет документов: паспорт, фото, подтверждение цели пребывания, страховку, подтверждение дохода и адреса.",
      "Подайте заявление в местное миграционное управление — лично или онлайн.",
      "Пройдите биометрию, если это не было сделано раньше.",
      "Дождитесь решения — это может занять от нескольких недель до нескольких месяцев, отслеживайте статус заявления.",
    ],
  },
  tax_id: {
    heading: "Как получить налоговый идентификационный номер",
    steps: [
      "Определите, какой номер вам нужен: общий идентификационный или налоговый номер для бизнеса.",
      "Соберите паспорт и, при наличии, подтверждение адреса регистрации.",
      "Подайте заявление в местную администрацию или налоговую службу.",
      "Дождитесь присвоения номера — часто это можно сделать в день обращения.",
      "Сохраните подтверждающий документ — номер понадобится для трудоустройства, банка и медицинской страховки.",
    ],
  },
  employment_registration: {
    heading: "Как оформить трудоустройство",
    steps: [
      "Уточните у работодателя, какой тип разрешения на работу или трудового договора вам нужен.",
      "Подготовьте документы: паспорт, вид на жительство или рабочую визу, диплом при необходимости.",
      "Подпишите трудовой договор и убедитесь, что работодатель подал уведомление в соответствующие органы (если требуется).",
      "Получите номер социального страхования, если он ещё не оформлен.",
      "Проверьте, что все взносы и налоги отчисляются корректно с первой зарплаты.",
    ],
  },
};

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <span
      className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg border transition-colors duration-150 ${
        checked ? "border-accent bg-accent text-white" : "border-border-strong bg-surface-1"
      }`}
    >
      {checked && (
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.6 3.6 6.7-6.7a1 1 0 011.4 0z" />
        </svg>
      )}
    </span>
  );
}

function StatusIcon({ status }: { status: PhaseStatus }) {
  if (status === "done") {
    return (
      <svg className="h-5 w-5 flex-shrink-0 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.6 3.6 6.7-6.7a1 1 0 011.4 0z" />
      </svg>
    );
  }

  if (status === "in_progress") {
    return (
      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center">
        <span className="h-2.5 w-2.5 rounded-full bg-accent-bright animate-glow-pulse motion-reduce:animate-none" />
      </span>
    );
  }

  return (
    <svg className="h-5 w-5 flex-shrink-0 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
  );
}

function StatusBadge({ status, label }: { status: PhaseStatus; label: string }) {
  const colors =
    status === "done"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
      : status === "in_progress"
        ? "border-accent/40 bg-accent/10 text-accent-bright"
        : "border-border-strong bg-surface-1 text-text-muted";

  return (
    <span className={`inline-block flex-shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${colors}`}>
      {label}
    </span>
  );
}

const CHEVRON_ICON = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export default function PhaseCard({
  phase,
  status,
  index,
  completed,
}: {
  phase: Phase;
  status: PhaseStatus;
  index: number;
  completed: Set<string>;
}) {
  const { t } = useLanguage();
  const d = t.dashboard;
  const [expanded, setExpanded] = useState(false);
  const isDone = status === "done";
  const isActive = status === "in_progress";
  const isWaiting = status === "waiting";

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && phase.steps.some((step) => step.documentType === hash)) {
      setExpanded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount only, to react to the URL the page was loaded with
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    // The step only exists in the DOM once expanded — the browser's automatic
    // hash-scroll already ran (and missed) during navigation, so scroll manually.
    document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [expanded]);

  const statusLabel = isDone ? d.phaseStatus.done : isActive ? d.phaseStatus.inProgress : d.phaseStatus.waiting;

  return (
    <Reveal delay={index * 60}>
      <div
        className={`rounded-2xl p-5 transition-[border-color,opacity] duration-200 ease-[var(--ease-out-strong)] ${
          isActive
            ? "border border-accent/40 bg-accent/[0.04]"
            : isWaiting
              ? "border border-border-subtle bg-surface-1 opacity-60"
              : "border border-border-subtle bg-surface-1"
        }`}
      >
        <button
          type="button"
          onClick={() => !isWaiting && setExpanded((prev) => !prev)}
          disabled={isWaiting}
          aria-expanded={expanded}
          aria-label={expanded ? d.collapseBtn : d.expandBtn}
          className="flex w-full flex-col items-start gap-3 text-left disabled:cursor-not-allowed"
        >
          <div className="flex w-full items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-text-muted">0{index + 1}</span>
            <div className="flex items-center gap-2">
              <StatusIcon status={status} />
              {!isWaiting && (
                <span className={`text-text-muted transition-transform duration-150 ${expanded ? "rotate-180" : ""}`}>
                  {CHEVRON_ICON}
                </span>
              )}
            </div>
          </div>

          <div>
            <p className="text-base font-semibold text-text-primary">{d.phases[phase.key]}</p>
            <p className="mt-1 text-sm text-text-muted">{d.phaseDescriptions[phase.key]}</p>
          </div>

          <StatusBadge status={status} label={statusLabel} />
        </button>

        {expanded && !isWaiting && (
          <div className="mt-4 space-y-2 border-t border-border-subtle pt-4">
            {phase.steps.map((step) => {
              const checked = completed.has(step.documentType);
              const guide = STEP_GUIDES[step.documentType];
              return (
                <div
                  key={step.documentType}
                  id={step.documentType}
                  className="flex scroll-mt-24 items-center gap-3 rounded-xl p-2.5 transition-colors duration-150"
                >
                  <span className="flex-shrink-0" aria-hidden="true">
                    <Checkbox checked={checked} />
                  </span>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${checked ? "text-text-muted" : "text-text-primary"}`}>{step.title}</p>
                    <p className="mt-0.5 text-xs text-text-muted">{step.description}</p>
                  </div>
                  <div className="flex flex-shrink-0 items-center gap-2" onClick={(event) => event.stopPropagation()}>
                    {guide && (
                      <HelpButton
                        guideHeading={guide.heading}
                        guideSteps={guide.steps}
                        aiQuestion={`Как получить: ${step.title}?`}
                        label="Как это получить?"
                      />
                    )}
                    {step.documentType === "documents" && (
                      <Link
                        href="/documents"
                        onClick={(event) => event.stopPropagation()}
                        className="flex-shrink-0 rounded-full border border-border-strong bg-surface-1 px-3 py-1.5 text-xs font-semibold text-text-primary transition-colors duration-150 hover:border-accent/40 hover:text-accent-bright"
                      >
                        {d.openBtn}
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Reveal>
  );
}
