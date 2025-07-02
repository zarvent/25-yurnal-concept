'use client';

import { create } from 'zustand';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'patient' | 'therapist' | 'student';
}

interface SessionState {
  user: UserProfile | null;
  credits: number;
  isLoading: boolean;
  login: (profile: UserProfile) => void;
  logout: () => void;
  setCredits: (amount: number) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  user: null,
  credits: 0,
  isLoading: true,
  login: (profile) => set({ user: profile, isLoading: false }),
  logout: () => set({ user: null, isLoading: false }),
  setCredits: (amount) => set({ credits: amount }),
}));
