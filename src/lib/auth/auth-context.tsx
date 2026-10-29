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
    const initAuth = async () => {
      try {
        const supabase = createClient();
        if (supabase) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            const profiles = db.getProfiles();
            let matched = profiles.find((p) => p.id === session.user.id);
            if (!matched) {
              matched = {
                id: session.user.id,
                full_name: (session.user.user_metadata?.full_name as string) || session.user.email?.split('@')[0] || 'Pengguna',
                role: ((session.user.user_metadata?.role as UserRole) || 'admin'),
                status: 'active',
                email: session.user.email,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              };
            }

            if (matched.status === 'suspended') {
              await supabase.auth.signOut();
              db.setCurrentUser(null);
              setUser(null);
              setIsLoading(false);
              return;
            }

            db.setCurrentUser(matched.id);
            setUser(matched);
            setIsLoading(false);
            return;
          }
        }
      } catch {
        // ignore
      }

      // Standalone local store session
      const storedUser = db.getCurrentUser();
      if (storedUser) {
        if (storedUser.status === 'suspended') {
          db.setCurrentUser(null);
          setUser(null);
        } else {
          setUser(storedUser);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };

    initAuth();
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

    if (!email || !password) {
      setIsLoading(false);
      return false;
    }

    const cleanEmail = email.toLowerCase().trim();

    try {
      // 1. Try real Supabase Auth if client is configured
      const supabase = createClient();
      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

        if (!error && data?.user) {
          const profiles = db.getProfiles();
          let matched = profiles.find((p) => p.id === data.user.id);
          if (!matched) {
            matched = {
              id: data.user.id,
              full_name: (data.user.user_metadata?.full_name as string) || cleanEmail.split('@')[0],
              role: ((data.user.user_metadata?.role as UserRole) || 'admin'),
              status: 'active',
              email: cleanEmail,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            };
          }

          if (matched.status === 'suspended') {
            await supabase.auth.signOut();
            setIsLoading(false);
            throw new Error('Akun Anda sedang ditangguhkan (suspended). Hubungi Administrator sekolah.');
          }

          db.setCurrentUser(matched.id);
          setUser(matched);
          setIsLoading(false);
          redirectUser(matched.role);
          return true;
        }

        // If Supabase returned invalid login credentials, reject immediately
        if (error && error.message.toLowerCase().includes('invalid login credentials')) {
          setIsLoading(false);
          return false;
        }

        // Check strict local credentials registry if not in Supabase yet
        const localMatch = db.verifyCredentials(cleanEmail, password);
        if (!localMatch) {
          setIsLoading(false);
          return false;
        }

        if (localMatch.status === 'suspended') {
          setIsLoading(false);
          throw new Error('Akun Anda sedang ditangguhkan (suspended). Hubungi Administrator sekolah.');
        }

        db.setCurrentUser(localMatch.id);
        setUser(localMatch);
        setIsLoading(false);
        redirectUser(localMatch.role);
        return true;
      }

      // 2. Standalone / Local mode (Strict credential verification)
      const matched = db.verifyCredentials(cleanEmail, password);
      if (!matched) {
        setIsLoading(false);
        return false;
      }

      if (matched.status === 'suspended') {
        setIsLoading(false);
        throw new Error('Akun Anda sedang ditangguhkan (suspended). Hubungi Administrator sekolah.');
      }

      db.setCurrentUser(matched.id);
      setUser(matched);
      setIsLoading(false);
      redirectUser(matched.role);
      return true;
    } catch (err: any) {
      setIsLoading(false);
      throw err;
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
    db.setCurrentUser(null);
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
