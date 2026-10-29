'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Profile, UserRole } from '@/types/database';
import { db } from '@/lib/store';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: Profile | null;
  role: UserRole | null;
  isLoading: boolean;
  login: (email: string, role?: UserRole) => Promise<boolean>;
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

  const login = async (email: string, targetRole?: UserRole): Promise<boolean> => {
    setIsLoading(true);
    // Find matching profile by role or default to first of that role
    const profiles = db.getProfiles();
    let matched = profiles.find((p) => p.role === targetRole);
    if (!matched) {
      matched = profiles[0];
    }

    db.setCurrentUser(matched.id);
    setUser(matched);
    setIsLoading(false);

    // Redirect to role dashboard
    if (matched.role === 'admin') {
      router.push('/app/admin/dashboard');
    } else if (matched.role === 'teacher') {
      router.push('/app/teacher/dashboard');
    } else {
      router.push('/app/student/dashboard');
    }

    return true;
  };

  const logout = async () => {
    setUser(null);
    router.push('/login');
  };

  const switchUser = (userId: string) => {
    db.setCurrentUser(userId);
    const newProfile = db.getProfileById(userId);
    if (newProfile) {
      setUser(newProfile);
      // Route user to their corresponding role dashboard
      if (newProfile.role === 'admin') {
        router.push('/app/admin/dashboard');
      } else if (newProfile.role === 'teacher') {
        router.push('/app/teacher/dashboard');
      } else {
        router.push('/app/student/dashboard');
      }
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

