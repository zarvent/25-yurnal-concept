'use client';

import { create } from 'zustand';

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  template: string;
}

const JOURNAL_KEY = 'yurnal-entries';

interface JournalState {
  entries: JournalEntry[];
  isLoaded: boolean;
  loadEntries: () => void;
  addEntry: (content: string, template: string) => void;
  getEntriesAsText: () => string;
}

export const useJournalStore = create<JournalState>((set, get) => ({
  entries: [],
  isLoaded: false,
  loadEntries: () => {
    try {
      const storedEntries = localStorage.getItem(JOURNAL_KEY);
      if (storedEntries) {
        set({ entries: JSON.parse(storedEntries) });
      }
    } catch (error) {
      console.error('Failed to load journal entries from localStorage', error);
    }
    set({ isLoaded: true });
  },
  addEntry: (content: string, template: string) => {
    try {
      const newEntry: JournalEntry = {
        id: new Date().toISOString(),
        date: new Date().toISOString(),
        content,
        template,
      };
      const updatedEntries = [newEntry, ...get().entries];
      set({ entries: updatedEntries });
      localStorage.setItem(JOURNAL_KEY, JSON.stringify(updatedEntries));
    } catch (error) {
      console.error('Failed to save journal entry to localStorage', error);
    }
  },
  getEntriesAsText: () => {
    const entries = get().entries;
    return entries.map(entry => `Fecha: ${new Date(entry.date).toLocaleDateString('es-ES')}\nPlantilla: ${entry.template}\nContenido: ${entry.content}`).join('\n\n---\n\n');
  },
}));
