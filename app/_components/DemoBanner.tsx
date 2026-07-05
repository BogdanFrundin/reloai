"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { pressScale } from "../_lib/motion";

export default function DemoBanner() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 border-b border-accent/25 bg-accent/10 px-4 py-2.5 text-center sm:px-6">
      <p className="text-sm text-accent-bright">{t.demo.bannerText}</p>
      <Link
        href="/register"
        className={`flex-shrink-0 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-white transition-colors duration-150 hover:bg-accent-bright ${pressScale}`}
      >
        {t.demo.registerNow}
      </Link>
    </div>
  );
}
