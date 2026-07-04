"use client";

import { useAuth } from "../_components/AuthProvider";

/**
 * Returns the right destination for every primary CTA button.
 * - Not logged in          → /register
 * - Logged in, no plan     → /pricing  (plan selection step)
 * - Logged in, plan set    → /dashboard
 */
export function useCtaHref(): string {
  const { user, profile, loading, profileLoading } = useAuth();
  if (loading || profileLoading) return "/register";
  if (!user) return "/register";
  if (!profile?.plan) return "/pricing";
  return "/dashboard";
}
