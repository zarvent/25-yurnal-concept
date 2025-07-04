// src/store/journal-editor.store.ts
import { create } from 'zustand';

interface JournalEditorState {
  entry: string;
  isSaving: boolean;
  isSuccess: boolean;
  setEntry: (entry: string) => void;
  startSaving: () => void;
  finishSaving: (success: boolean) => void;
  resetState: () => void;
}

export const useJournalEditorStore = create<JournalEditorState>((set) => ({
  entry: '',
  isSaving: false,
  isSuccess: false,
  setEntry: (entry) => set({ entry }),
  startSaving: () => set({ isSaving: true, isSuccess: false }),
  finishSaving: (success) => set({ isSaving: false, isSuccess: success }),
  resetState: () => set({ entry: '', isSaving: false, isSuccess: false }),
}));
