'use client';

import { useState, useEffect, useCallback } from 'react';

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  template: string;
}

const JOURNAL_KEY = 'yurnal-entries';

export function useJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedEntries = localStorage.getItem(JOURNAL_KEY);
      if (storedEntries) {
        setEntries(JSON.parse(storedEntries));
      }
    } catch (error) {
      console.error('Failed to load journal entries from localStorage', error);
    }
    setIsLoaded(true);
  }, []);

  const addEntry = useCallback((content: string, template: string) => {
    try {
      const newEntry: JournalEntry = {
        id: new Date().toISOString(),
        date: new Date().toISOString(),
        content,
        template,
      };
      const updatedEntries = [newEntry, ...entries];
      setEntries(updatedEntries);
      localStorage.setItem(JOURNAL_KEY, JSON.stringify(updatedEntries));
    } catch (error) {
      console.error('Failed to save journal entry to localStorage', error);
    }
  }, [entries]);

  const getEntriesAsText = useCallback(() => {
    return entries.map(entry => `Fecha: ${new Date(entry.date).toLocaleDateString('es-ES')}\nPlantilla: ${entry.template}\nContenido: ${entry.content}`).join('\n\n---\n\n');
  }, [entries]);

  return { entries, addEntry, getEntriesAsText, isLoaded };
}
