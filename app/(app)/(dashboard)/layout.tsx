import type { ReactNode } from "react";
import DashboardShell from "../../_components/DashboardShell";

export default function DashboardGroupLayout({ children }: { children: ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
