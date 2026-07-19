"use client";

import { useRouter, usePathname } from "next/navigation";
import { Suspense, useEffect, useState, type ReactNode } from "react";
import DashboardSidebar from "./DashboardSidebar";
import Topbar from "./Topbar";
import PageTransition from "./PageTransition";
import DemoBanner from "./DemoBanner";
import DemoFloatingCard from "./DemoFloatingCard";
import { useAuth } from "./AuthProvider";
import { DashboardProgressProvider } from "./DashboardProgressProvider";

// Routes that show real personal data and make no sense in demo/preview mode.
const AUTH_REQUIRED_PATHS = ["/profile", "/settings"];

function DashboardShellInner({ children }: { children: ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { user, profile, loading, profileLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const requiresAuth = AUTH_REQUIRED_PATHS.includes(pathname);
  const isDemoMode = !loading && !user && !requiresAuth;

  useEffect(() => {
    if (loading) return;

    if (!user && requiresAuth) {
      router.replace("/login");
      return;
    }

    if (user && !profileLoading) {
      if (!profile) {
        router.replace("/onboarding");
      } else if (!profile.plan) {
        router.replace("/pricing");
      }
    }
  }, [loading, user, profile, profileLoading, requiresAuth, router]);

  const showSpinner =
    loading ||
    (!user && requiresAuth) ||
    (!!user && profileLoading) ||
    (!!user && !profileLoading && (!profile || !profile.plan));

  if (showSpinner) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <svg className="h-6 w-6 animate-spin text-accent-bright" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      </div>
    );
  }

  return (
    <DashboardProgressProvider>
      <div className="flex min-h-screen">
        <DashboardSidebar open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar onMenuClick={() => setMobileNavOpen(true)} />
          {isDemoMode && <DemoBanner />}
          <main
            className={`flex flex-1 flex-col p-4 lg:p-6 ${
              pathname === "/dashboard/ai" ? "overflow-hidden" : "overflow-y-auto"
            }`}
          >
            <PageTransition className={pathname === "/dashboard/ai" ? "flex min-h-0 flex-1 flex-col" : undefined}>
              {children}
            </PageTransition>
          </main>
        </div>
        {isDemoMode && <DemoFloatingCard />}
      </div>
    </DashboardProgressProvider>
  );
}

export default function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <DashboardShellInner>{children}</DashboardShellInner>
    </Suspense>
  );
}
