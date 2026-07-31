"use client";

import { useAuth } from "../_components/AuthProvider";

/**
 * Returns the right destination for every primary CTA button.
 * - Not logged in          → /home (demo/preview mode — no account required)
 * - Logged in, no plan     → /pricing  (plan selection step)
 * - Logged in, plan set    → /home
 */
export function useCtaHref(): string {
  const { user, profile, loading, profileLoading } = useAuth();
  if (loading || profileLoading) return "/home";
  if (!user) return "/home";
  if (!profile?.plan) return "/pricing";
  return "/home";
}
