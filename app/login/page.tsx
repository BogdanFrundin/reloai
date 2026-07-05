"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, type FormEvent } from "react";
import AuthShell from "../_components/AuthShell";
import PageTransition from "../_components/PageTransition";
import PasswordField from "../_components/PasswordField";
import MiniLangSwitcher from "../_components/MiniLangSwitcher";
import { useLanguage } from "../_components/LanguageProvider";
import { dictionaries, LANGUAGES, type Lang } from "../_lib/i18n";
import { pressScale } from "../_lib/motion";
import { supabase } from "../../lib/supabase";

const inputClasses =
  "mt-1.5 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 transition-[border-color,box-shadow,background-color] duration-150 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

export default function LoginPage() {
  const router = useRouter();
  const { lang, setLang } = useLanguage();

  // Read localStorage on mount and sync if it differs from what the provider has.
  // This ensures the page never shows English while Russian is stored.
  useEffect(() => {
    const stored = localStorage.getItem("reloai_language");
    const resolved = stored && LANGUAGES.some((l) => l.code === stored)
      ? (stored as Lang)
      : "ru";
    if (resolved !== lang) setLang(resolved);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const a = dictionaries[lang].auth.login;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  async function handleGoogleSignIn() {
    setError(null);
    setGoogleLoading(true);
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
    if (oauthError) {
      setError(oauthError.message);
      setGoogleLoading(false);
    }
  }

  return (
    <PageTransition>
      <div className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6">
        <MiniLangSwitcher />
      </div>

      <AuthShell>
        <h1 className="text-2xl font-bold tracking-tight text-white">{a.heading}</h1>
        <p className="mt-1.5 text-sm text-slate-400">{a.subtext}</p>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          className={`mt-6 flex w-full items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:border-white/30 hover:bg-white/10 disabled:opacity-60 ${pressScale}`}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h6.47a5.54 5.54 0 0 1-2.4 3.63v3.02h3.86c2.26-2.09 3.56-5.17 3.56-8.68z" />
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.07 7.93-2.91l-3.86-3.02c-1.07.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.12C3.24 21.3 7.27 24 12 24z" />
            <path fill="#FBBC05" d="M5.27 14.26A7.16 7.16 0 0 1 4.89 12c0-.78.14-1.55.38-2.26V6.62H1.27A11.97 11.97 0 0 0 0 12c0 1.93.46 3.76 1.27 5.38l4-3.12z" />
            <path fill="#EA4335" d="M12 4.78c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.27 0 3.24 2.7 1.27 6.62l4 3.12C6.22 6.9 8.87 4.78 12 4.78z" />
          </svg>
          {googleLoading ? "..." : a.googleSignIn}
        </button>

        <div className="my-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-white/10" />
          <span className="text-xs uppercase tracking-wider text-slate-500">{dictionaries[lang].auth.or}</span>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        {error && (
          <p className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-slate-300">
              {a.email}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={dictionaries[lang].contact.form.placeholderEmail}
              className={inputClasses}
            />
          </div>

          <PasswordField
            value={password}
            onChange={setPassword}
            label={a.passwordLabel}
            t={dictionaries[lang].password}
          />

          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-slate-400 transition-colors duration-150 hover:text-accent-bright"
            >
              {a.forgotPassword}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-8px_var(--accent)] transition-colors duration-150 hover:bg-accent-bright disabled:opacity-60 ${pressScale}`}
          >
            {loading ? "..." : a.submit}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          {a.noAccount}{" "}
          <Link href="/register" className="font-semibold text-accent-bright hover:text-white">
            {a.register}
          </Link>
        </p>
      </AuthShell>
    </PageTransition>
  );
}
