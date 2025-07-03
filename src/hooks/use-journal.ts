'use client';

import { useJournalDataStore } from '@/store/journal-data.store';

export type { JournalEntry } from '@/types';

export function useJournal() {
  const entries = useJournalDataStore(state => state.entries);
  return { entries };
}
