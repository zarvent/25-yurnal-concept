'use client';

import type { JournalEntry } from '@/types/index';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// Define a comprehensive interface for the store's state and actions
interface JournalStore {
  entries: JournalEntry[];
  isLoaded: boolean;
  selectedEntries: string[]; // Cambiado a array de strings
  addEntry: (entry: JournalEntry) => void;
  loadEntries: () => void; // This action will be responsible for loading
  getEntriesAsText: () => string;
  toggleEntrySelection: (id: string) => void;
  getSelectedEntriesContent: () => string;
  setEntries: (entries: JournalEntry[]) => void;
}

export const useJournalStore = create<JournalStore>()(
  persist(
    (set, get) => ({
      entries: [],
      isLoaded: false, // Initialize as false
      selectedEntries: [], // Iniciar como un array vacío

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
      },

      toggleEntrySelection: (id) =>
        set((state) => {
          const isSelected = state.selectedEntries.includes(id);
          const newSelectedEntries = isSelected
            ? state.selectedEntries.filter((entryId) => entryId !== id)
            : [...state.selectedEntries, id];
          return { selectedEntries: newSelectedEntries };
        }),

      getSelectedEntriesContent: () => {
        const { entries, selectedEntries } = get();
        return entries
          .filter((entry) => selectedEntries.includes(entry.id))
          .map((entry) => `Date: ${entry.createdAt.toISOString()}\nContent: ${entry.content}`)
          .join('\n\n');
      },

      setEntries: (entries) => set({ entries }),
    }),
    {
      name: 'journal-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      version: 1,
      migrate: (persistedState, version) => {
        if (version < 1) {
          (persistedState as any).selectedEntries = [];
        }
        return persistedState;
      },
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

