"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import Sidebar from "../_components/Sidebar";
import Topbar from "../_components/Topbar";
import PageTransition from "../_components/PageTransition";
import DemoBanner from "../_components/DemoBanner";
import DemoFloatingCard from "../_components/DemoFloatingCard";
import { useAuth } from "../_components/AuthProvider";

const PUBLIC_PATHS = ["/pricing"];
// Routes that show real personal data and make no sense in demo/preview mode.
const AUTH_REQUIRED_PATHS = ["/profile"];

export default function AppLayout({ children }: { children: ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { user, profile, loading, profileLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isPublicPath = PUBLIC_PATHS.includes(pathname);
  const requiresAuth = AUTH_REQUIRED_PATHS.includes(pathname);
  const isDemoMode = !loading && !user && !requiresAuth && !isPublicPath;

  useEffect(() => {
    if (loading) return;

    if (!user && requiresAuth) {
      router.replace("/login");
      return;
    }

    if (user && !profileLoading && !isPublicPath) {
      if (!profile) {
        router.replace("/onboarding");
      } else if (!profile.plan) {
        router.replace("/pricing");
      }
    }
  }, [loading, user, profile, profileLoading, isPublicPath, requiresAuth, pathname, router]);

  const showSpinner =
    loading ||
    (!user && requiresAuth) ||
    (!!user && !isPublicPath && profileLoading) ||
    (!!user && !isPublicPath && !profileLoading && (!profile || !profile.plan));

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
    <div className="flex min-h-screen">
      <Sidebar open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenuClick={() => setMobileNavOpen(true)} />
        {isDemoMode && <DemoBanner />}
        <main className="flex-1 overflow-y-auto">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
      {isDemoMode && <DemoFloatingCard />}
    </div>
  );
}
