"use client";

import { useState, useSyncExternalStore } from "react";
import AiChatPanel from "./AiChatPanel";
import { pressScale } from "../_lib/motion";

const SEEN_KEY = "reloai_chat_seen";

function subscribe() {
  return () => {};
}

function getSeenSnapshot() {
  return window.localStorage.getItem(SEEN_KEY) === "1";
}

function getSeenServerSnapshot() {
  return true;
}

export default function FloatingChatButton() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const seen = useSyncExternalStore(subscribe, getSeenSnapshot, getSeenServerSnapshot);
  const showBadge = !seen && !dismissed;

  function handleToggle() {
    setOpen((prev) => !prev);
    if (showBadge) {
      window.localStorage.setItem(SEEN_KEY, "1");
      setDismissed(true);
    }
  }

  return (
    <>
      {open && (
        <div
          style={{ transformOrigin: "bottom right" }}
          className="fixed bottom-24 right-6 z-50 h-[600px] w-[400px] max-w-[calc(100vw-3rem)] transition-[opacity,transform] duration-200 ease-[var(--ease-out-strong)] starting:opacity-0 starting:scale-95"
        >
          <AiChatPanel onClose={() => setOpen(false)} />
        </div>
      )}

      <button
        type="button"
        onClick={handleToggle}
        aria-label={open ? "Close AI chat" : "Open AI chat"}
        aria-expanded={open}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_8px_30px_-6px_var(--accent)] transition-colors duration-150 hover:bg-accent-bright ${pressScale}`}
      >
        {open ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm3.75 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm3.75 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
            />
          </svg>
        )}

        {showBadge && !open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background bg-red-500 text-[10px] font-bold text-white">
            1
          </span>
        )}
      </button>
    </>
  );
}
