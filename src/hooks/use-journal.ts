'use client';

import { useEffect } from 'react';
import { useJournalStore, type JournalEntry } from '@/store/journal-store';

// Re-export the type for convenience
export type { JournalEntry };

export function useJournal() {
  const { entries, isLoaded, loadEntries, addEntry, getEntriesAsText } = useJournalStore();

  useEffect(() => {
    // Load entries from storage once on mount
    if (!isLoaded) {
      loadEntries();
    }
  }, [isLoaded, loadEntries]);

  return { entries, isLoaded, addEntry, getEntriesAsText };
}
