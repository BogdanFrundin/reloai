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
  "mt-1.5 w-full rounded-xl border border-border-strong bg-surface-1 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-[border-color,box-shadow,background-color] duration-150 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

export default function RegisterPage() {
  const router = useRouter();
  const { lang, setLang } = useLanguage();

  useEffect(() => {
    const stored = localStorage.getItem("reloai_language");
    const resolved = stored && LANGUAGES.some((l) => l.code === stored)
      ? (stored as Lang)
      : "ru";
    if (resolved !== lang) setLang(resolved);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const a = dictionaries[lang].auth.register;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [confirmEmailSent, setConfirmEmailSent] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError(a.passwordMismatch);
      return;
    }

    setError(null);
    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (!data.session) {
      setConfirmEmailSent(true);
      setLoading(false);
      return;
    }

    router.push("/onboarding");
  }

  async function handleGoogleSignUp() {
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

  if (confirmEmailSent) {
    const [beforeEmail, afterEmail] = a.confirmEmail.body.split("{email}");
    return (
      <PageTransition>
        <div className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6">
          <MiniLangSwitcher />
        </div>
        <AuthShell>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">{a.confirmEmail.heading}</h1>
          <p className="mt-3 text-sm text-text-muted">
            {beforeEmail}
            <span className="text-text-primary">{email}</span>
            {afterEmail}
          </p>
          <Link
            href="/login"
            className={`mt-6 flex w-full items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-8px_var(--accent)] transition-colors duration-150 hover:bg-accent-bright ${pressScale}`}
          >
            {a.confirmEmail.goToLogin}
          </Link>
        </AuthShell>
      </PageTransition>
    );
  }

  const passwordsMatch = confirmPassword.length === 0 || confirmPassword === password;
  const submitDisabled = loading || !passwordValid || confirmPassword !== password;

  return (
    <PageTransition>
      <div className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6">
        <MiniLangSwitcher />
      </div>

      <AuthShell>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">{a.heading}</h1>
        <p className="mt-1.5 text-sm text-text-muted">{a.subtitle}</p>

        <button
          type="button"
          onClick={handleGoogleSignUp}
          disabled={googleLoading}
          className={`mt-6 flex w-full items-center justify-center gap-3 rounded-xl border border-border-strong bg-surface-1 px-4 py-2.5 text-sm font-semibold text-text-primary transition-colors duration-150 hover:border-border-strong hover:bg-surface-hover disabled:opacity-60 ${pressScale}`}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h6.47a5.54 5.54 0 0 1-2.4 3.63v3.02h3.86c2.26-2.09 3.56-5.17 3.56-8.68z" />
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.07 7.93-2.91l-3.86-3.02c-1.07.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.12C3.24 21.3 7.27 24 12 24z" />
            <path fill="#FBBC05" d="M5.27 14.26A7.16 7.16 0 0 1 4.89 12c0-.78.14-1.55.38-2.26V6.62H1.27A11.97 11.97 0 0 0 0 12c0 1.93.46 3.76 1.27 5.38l4-3.12z" />
            <path fill="#EA4335" d="M12 4.78c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.27 0 3.24 2.7 1.27 6.62l4 3.12C6.22 6.9 8.87 4.78 12 4.78z" />
          </svg>
          {googleLoading ? a.redirecting : a.googleSignUp}
        </button>

        <div className="my-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-border-subtle" />
          <span className="text-xs uppercase tracking-wider text-text-muted">{dictionaries[lang].auth.or}</span>
          <span className="h-px flex-1 bg-border-subtle" />
        </div>

        {error && (
          <p className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-text-secondary">
              {a.fullName}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={dictionaries[lang].contact.form.placeholderName}
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium text-text-secondary">
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
            onValidChange={setPasswordValid}
            label={a.passwordLabel}
            t={dictionaries[lang].password}
          />

          <div>
            <label htmlFor="confirmPassword" className="text-sm font-medium text-text-secondary">
              {a.confirmPasswordLabel}
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="••••••••"
              className={inputClasses}
            />
            {!passwordsMatch && (
              <p className="mt-1.5 text-xs text-red-400">{a.passwordMismatch}</p>
            )}
          </div>

          {/* Tooltip wrapper — disabled buttons don't fire mouse events, so hover lives on the div */}
          <div className="group/submit relative">
            <button
              type="submit"
              disabled={submitDisabled}
              className={`w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-8px_var(--accent)] transition-colors duration-150 hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-50 ${pressScale}`}
            >
              {loading ? "..." : a.submit}
            </button>
            {!passwordValid && !loading && (
              <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-800 px-3 py-1.5 text-xs text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover/submit:opacity-100">
                {a.passwordTooltip}
                <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
              </div>
            )}
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-text-muted">
          {a.hasAccount}{" "}
          <Link href="/login" className="font-semibold text-accent-bright hover:text-text-primary">
            {a.login}
          </Link>
        </p>
      </AuthShell>
    </PageTransition>
  );
}
