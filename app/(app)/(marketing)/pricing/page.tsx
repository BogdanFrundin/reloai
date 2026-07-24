"use client";

import PageHeader from "../../../_components/PageHeader";
import PricingPlansGrid from "../../../_components/PricingPlansGrid";
import { useLanguage } from "../../../_components/LanguageProvider";

export default function PricingPage() {
  const { t } = useLanguage();
  const ap = t.appPricing;

  return (
    <div className="px-6 py-8 lg:px-10 lg:py-10">
      <PageHeader title={ap.title} subtitle={ap.subtitle} />

      <div className="mt-10">
        <PricingPlansGrid />
      </div>
    </div>
  );
}
