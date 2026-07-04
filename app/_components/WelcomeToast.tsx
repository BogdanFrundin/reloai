"use client";

import { useEffect, useState } from "react";

export default function WelcomeToast() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const msg = sessionStorage.getItem("reloai_welcome");
    if (msg) {
      setMessage(msg);
      sessionStorage.removeItem("reloai_welcome");
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!message) return null;

  return (
    <div className="animate-slide-up fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 shadow-xl shadow-black/40 backdrop-blur-xl">
      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
        <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.6 3.6 6.7-6.7a1 1 0 011.4 0z" />
        </svg>
      </span>
      <p className="text-sm font-semibold text-emerald-300">{message}</p>
      <button
        type="button"
        onClick={() => setMessage(null)}
        className="ml-1 flex-shrink-0 text-emerald-600 transition-colors duration-150 hover:text-emerald-300"
        aria-label="Dismiss"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
