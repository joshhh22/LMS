'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Profile, UserRole } from '@/types/database';
import { db } from '@/lib/store';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: Profile | null;
  role: UserRole | null;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  switchUser: (userId: string) => void;
  availableUsers: Profile[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Initialize current user from store
    const storedUser = db.getCurrentUser();
    setUser(storedUser);
    setIsLoading(false);
  }, []);

  const redirectUser = (role: UserRole) => {
    if (role === 'admin') {
      router.push('/app/admin/dashboard');
    } else if (role === 'teacher') {
      router.push('/app/teacher/dashboard');
    } else {
      router.push('/app/student/dashboard');
    }
  };

  const login = async (email: string, password?: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      // 1. Try real Supabase Auth if client is configured
      const supabase = createClient();
      if (supabase && password) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (!error && data?.user) {
          const profiles = db.getProfiles();
          let matched = profiles.find((p) => p.id === data.user.id);
          if (!matched) {
            matched = {
              id: data.user.id,
              full_name: (data.user.user_metadata?.full_name as string) || email.split('@')[0],
              role: ((data.user.user_metadata?.role as UserRole) || 'admin'),
              status: 'active',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            };
          }

          db.setCurrentUser(matched.id);
          setUser(matched);
          setIsLoading(false);
          redirectUser(matched.role);
          return true;
        }
      }

      // 2. Fallback / local store matching
      const profiles = db.getProfiles();
      const lowerEmail = email.toLowerCase().trim();

      let matched: Profile | undefined;

      if (lowerEmail.includes('admin')) {
        matched = profiles.find((p) => p.role === 'admin') || profiles[0];
      } else if (lowerEmail.includes('guru') || lowerEmail.includes('teacher')) {
        matched = profiles.find((p) => p.role === 'teacher') || profiles[0];
      } else if (lowerEmail.includes('siswa') || lowerEmail.includes('student')) {
        matched = profiles.find((p) => p.role === 'student') || profiles[0];
      } else {
        matched = profiles.find((p) => p.id === lowerEmail) || profiles[0];
      }

      if (matched) {
        db.setCurrentUser(matched.id);
        setUser(matched);
        setIsLoading(false);
        redirectUser(matched.role);
        return true;
      }

      setIsLoading(false);
      return false;
    } catch {
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    try {
      const supabase = createClient();
      if (supabase) {
        await supabase.auth.signOut();
      }
    } catch {
      // ignore
    }
    setUser(null);
    router.push('/login');
  };

  const switchUser = (userId: string) => {
    db.setCurrentUser(userId);
    const newProfile = db.getProfileById(userId);
    if (newProfile) {
      setUser(newProfile);
      redirectUser(newProfile.role);
    }
  };

  const availableUsers = db.getProfiles();

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : null,
        isLoading,
        login,
        logout,
        switchUser,
        availableUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
