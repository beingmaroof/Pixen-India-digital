

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
    // Safety timeout: never stay stuck on loading for more than 5 seconds
    const timeout = setTimeout(() => setLoading(false), 5000);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event: any, session: Session | null) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        try {
          const data = await getUserData(session.user.id);
          setUserData(data as any);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }

      // Always clear loading once auth state is known
      setLoading(false);
      clearTimeout(timeout);
    });

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
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
