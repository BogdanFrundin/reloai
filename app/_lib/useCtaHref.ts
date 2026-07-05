"use client";

import { useAuth } from "../_components/AuthProvider";

/**
 * Returns the right destination for every primary CTA button.
 * - Not logged in          → /dashboard (demo/preview mode — no account required)
 * - Logged in, no plan     → /pricing  (plan selection step)
 * - Logged in, plan set    → /dashboard
 */
export function useCtaHref(): string {
  const { user, profile, loading, profileLoading } = useAuth();
  if (loading || profileLoading) return "/dashboard";
  if (!user) return "/dashboard";
  if (!profile?.plan) return "/pricing";
  return "/dashboard";
}
