

"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { getUserData } from '@/lib/auth';

interface UserData {
  uid: string;
  email: string;
  display_name: string;
  photo_url?: string;
  provider?: string;
  created_at: string;
  updated_at: string;
  dob?: string;
  gender?: string;
  phone?: string;
  company?: string;
  job_title?: string;
  location?: string;
  active_plan?: string;
  plan_status?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  isAuthenticated: boolean;
  refreshUserData: () => Promise<UserData | null>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  isAuthenticated: false,
  refreshUserData: async () => null
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Cross-tab sync setup
    const authChannel = typeof window !== 'undefined' ? new BroadcastChannel('pixen_auth_sync') : null;
    if (authChannel) {
      authChannel.onmessage = (event) => {
        if (event.data === 'FORCE_LOGOUT' && mounted) {
          document.cookie = `pixen-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
          setSession(null);
          setUser(null);
          setUserData(null);
          window.location.href = '/login';
        }
      };
    }

    // Fallback storage event
    const handleStorage = (event: StorageEvent) => {
      if ((event.key === 'supabase.auth.token' || event.key === 'sb-auth-token') && (!event.newValue) && mounted) {
        if (authChannel) authChannel.postMessage('FORCE_LOGOUT');
        document.cookie = `pixen-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        setSession(null);
        setUser(null);
        setUserData(null);
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorage);
    }

    // Safety timeout: never stay stuck on loading for more than 5 seconds
    const timeout = setTimeout(() => {
      if (mounted) setLoading(false);
    }, 5000);

    const initSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session && mounted) {
          document.cookie = `pixen-auth-token=true; path=/; max-age=604800; SameSite=Lax`;
          setSession(data.session);
          setUser(data.session.user);
          const uData = await getUserData(data.session.user.id);
          if (mounted) setUserData(uData as any);
        }
      } catch (e) {
        console.error("Session initialize error", e);
      } finally {
        if (mounted) {
          setLoading(false);
          clearTimeout(timeout);
        }
      }
    };
    
    initSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event: any, session: Session | null) => {
      if (!mounted) return;
      
      setSession(session);
      setUser(session?.user ?? null);

      if (event === 'SIGNED_OUT') {
        document.cookie = `pixen-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        setUserData(null);
        setSession(null);
        setUser(null);
        if (authChannel) authChannel.postMessage('FORCE_LOGOUT');
        return;
      }

      if (session?.user) {
        document.cookie = `pixen-auth-token=true; path=/; max-age=604800; SameSite=Lax`;
        try {
          if (event === 'SIGNED_IN') await new Promise(r => setTimeout(r, 500));
          const data = await getUserData(session.user.id);
          if (mounted) setUserData(data as any);
        } catch (error) {
          console.error('Error fetching user data:', error);
          if (mounted) setUserData(null);
        }
      } else {
        if (mounted) setUserData(null); // Fallback
      }
    });

    // Background silent refresh to prevent stale sessions
    const refreshInterval = setInterval(async () => {
      if (mounted) {
        try {
          const { data, error } = await supabase.auth.getSession();
          if (error) console.error("Silent refresh error", error);
        } catch (e) {
          // ignore
        }
      }
    }, 5 * 60 * 1000); // 5 minutes

    // Refresh on focus (user comes back to tab)
    const handleFocus = async () => {
      if (mounted) {
        try {
          await supabase.auth.getSession();
        } catch (e) {
          // ignore
        }
      }
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('focus', handleFocus);
      window.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') handleFocus();
      });
    }

    return () => {
      mounted = false;
      subscription.unsubscribe();
      clearTimeout(timeout);
      clearInterval(refreshInterval);
      if (typeof window !== 'undefined') {
        window.removeEventListener('focus', handleFocus);
        window.removeEventListener('storage', handleStorage);
        if (authChannel) authChannel.close();
      }
    };
  }, []);

  const value = {
    user,
    userData,
    loading,
    isAuthenticated: !!user,
    refreshUserData: async () => {
      if (user) {
        const data = await getUserData(user.id);
        setUserData(data);
        return data;
      }
      return null;
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Add a function to refresh user data
export const refreshUserData = async (userId: string, setUserData: any) => {
  try {
    const data = await getUserData(userId);
    setUserData(data);
    return data;
  } catch (error) {
    console.error('Error refreshing user data:', error);
    return null;
  }
};
