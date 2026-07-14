"use client";

import type { ReactNode } from "react";

export default function PageTransition({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`transition-[opacity,transform] duration-300 ease-[var(--ease-out-strong)] starting:opacity-0 starting:translate-y-2 motion-reduce:transition-none ${className}`}
    >
      {children}
    </div>
  );
}
