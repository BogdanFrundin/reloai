import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function PageHeader({
  title,
  subtitle,
}: {
  title: ReactNode;
  subtitle?: string;
}) {
  return (
    <Reveal>
      <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-text-muted">{subtitle}</p>}
    </Reveal>
  );
}
