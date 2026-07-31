"use client";

import { usePathname } from "next/navigation";
import FloatingChatButton from "./FloatingChatButton";

export default function FloatingChatButtonGate() {
  const pathname = usePathname();
  if (pathname !== "/") return null;
  return <FloatingChatButton />;
}
