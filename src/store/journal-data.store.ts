// src/store/journal-data.store.ts
import { Insight, JournalEntry } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface JournalDataState {
  entries: JournalEntry[];
  insights: Insight[];
  isLoaded: boolean;
  addEntry: (entry: JournalEntry) => void;
  updateEntry: (updatedEntry: JournalEntry) => void;
  deleteEntry: (entryId: string) => void;
  addInsight: (insight: Insight) => void;
  setLoaded: (isLoaded: boolean) => void;
  getEntriesAsText: () => string;
}

export const useJournalDataStore = create<JournalDataState>()(
  persist(
    (set, get) => ({
      entries: [],
      insights: [],
      isLoaded: false,

      addEntry: (entry) => set((state) => ({ entries: [...state.entries, entry] })),
      updateEntry: (updatedEntry) =>
        set((state) => ({
          entries: state.entries.map((entry) => (entry.id === updatedEntry.id ? updatedEntry : entry)),
        })),
      deleteEntry: (entryId) => set((state) => ({ entries: state.entries.filter((entry) => entry.id !== entryId) })),

      addInsight: (insight) => set((state) => ({ insights: [...state.insights, insight] })),

      setLoaded: (isLoaded) => set({ isLoaded }),

      getEntriesAsText: () => {
        return get()
          .entries.map((entry) => entry.content)
          .join('\n\n---\n\n');
      },
    }),
    {
      name: 'yurnal-journal-data', // Nombre para persistencia en localStorage
    }
  )
);
