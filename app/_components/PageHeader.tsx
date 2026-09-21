import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function PageHeader({
  title,
  subtitle,
  center = false,
}: {
  title: ReactNode;
  subtitle?: string;
  // Most pages keep this left-aligned; a couple (settings, profile) read
  // better centered on the page since they're narrow single-column forms
  // rather than wide dashboards/lists.
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "text-center" : undefined}>
      <h1 className="text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-text-muted">{subtitle}</p>}
    </Reveal>
  );
}
