"use client";

import type { Session, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "../../lib/supabase";

export type Profile = {
  id: string;
  name: string | null;
  email: string | null;
  country: string | null;
  city: string | null;
  citizenship: string | null;
  current_country: string | null;
  goal: string | null;
  job_offer: string | null;
  already_admitted: string | null;
  onboarding_skipped: boolean | null;
  plan: string | null;
  language: string | null;
  created_at: string;
};

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  profileLoading: boolean;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function syncProfile(userId: string) {
      setProfileLoading(true);
      const { data } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
      if (!active) return;
      setProfile(data ?? null);
      setProfileLoading(false);
    }

    supabase.auth.getSession().then(async ({ data }) => {
      if (!active) return;
      setSession(data.session);
      if (data.session?.user) {
        await syncProfile(data.session.user.id);
      } else {
        setProfileLoading(false);
      }
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!active) return;
      setSession(newSession);
      if (newSession?.user) {
        syncProfile(newSession.user.id);
      } else {
        setProfile(null);
        setProfileLoading(false);
      }
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function refreshProfile() {
    const { data } = await supabase.auth.getUser();
    if (!data.user) return;
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .maybeSingle();
    setProfile(profileData ?? null);
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <AuthContext.Provider
      value={{
        user: session?.user ?? null,
        session,
        profile,
        loading,
        profileLoading,
        refreshProfile,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
