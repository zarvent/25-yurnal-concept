'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { JournalEntry } from '@/types/index';

// Define a comprehensive interface for the store's state and actions
interface JournalStore {
  entries: JournalEntry[];
  isLoaded: boolean;
  addEntry: (entry: JournalEntry) => void;
  loadEntries: () => void; // This action will be responsible for loading
  getEntriesAsText: () => string;
}

export const useJournalStore = create<JournalStore>()(
  persist(
    (set, get) => ({
      entries: [],
      isLoaded: false, // Initialize as false

      loadEntries: () => {
        // This function body is where you would fetch from a real async source.
        // For now, we rely on the `persist` middleware to rehydrate the state.
        // We just need to set `isLoaded` to true.
        set({ isLoaded: true });
      },

      addEntry: (entry) =>
        set((state) => ({
          entries: [...state.entries, entry],
        })),
      
      getEntriesAsText: () => {
        const { entries } = get();
        return entries.map(e => `Date: ${e.createdAt.toISOString()}
Content: ${e.content}`).join('\n\n');
      }
    }),
    {
      name: 'journal-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      // onRehydrateStorage returns a function that can be used as a listener
      onRehydrateStorage: () => {
        return (state) => {
          if (state) {
            state.isLoaded = true;
          }
        }
      }
    }
  )
);

// Export the JournalEntry type for external usage
export type { JournalEntry };
