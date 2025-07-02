'use client';

import { detectCrisisKeywords } from '@/types';
import { create } from 'zustand';

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  template: string;
  mediaAttachments?: {
    name: string;
    type: string;
  }[];
  crisisDetected?: boolean;
}

const JOURNAL_KEY = 'yurnal-entries';

interface JournalState {
  entries: JournalEntry[];
  isLoaded: boolean;
  crisisDetected: boolean;
  loadEntries: () => void;
  addEntry: (content: string, template: string, mediaAttachments?: JournalEntry['mediaAttachments']) => void;
  getEntriesAsText: () => string;
  clearCrisisAlert: () => void;
}

export const useJournalStore = create<JournalState>((set, get) => ({
  entries: [],
  isLoaded: false,
  crisisDetected: false,
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
  addEntry: (content: string, template: string, mediaAttachments?: JournalEntry['mediaAttachments']) => {
    try {
      // Detectar crisis en el contenido
      const crisisDetected = detectCrisisKeywords(content);

      const newEntry: JournalEntry = {
        id: new Date().toISOString(),
        date: new Date().toISOString(),
        content,
        template,
        crisisDetected,
      };

      if (mediaAttachments && mediaAttachments.length > 0) {
        newEntry.mediaAttachments = mediaAttachments;
      }

      const updatedEntries = [newEntry, ...get().entries];
      set({
        entries: updatedEntries,
        crisisDetected: crisisDetected || get().crisisDetected
      });
      localStorage.setItem(JOURNAL_KEY, JSON.stringify(updatedEntries));

      // Log seguro para auditoría (sin exponer contenido)
      if (crisisDetected) {
        console.warn('[CRISIS DETECTION] Crisis keywords detected in journal entry');
      }
    } catch (error) {
      console.error('Failed to save journal entry to localStorage', error);
    }
  },
  getEntriesAsText: () => {
    const entries = get().entries;
    return entries.map(entry => `Fecha: ${new Date(entry.date).toLocaleDateString('es-ES')}\nPlantilla: ${entry.template}\nContenido: ${entry.content}`).join('\n\n---\n\n');
  },
  clearCrisisAlert: () => {
    set({ crisisDetected: false });
  },
}));
