// src/store/journal-ui.store.ts
import { create } from 'zustand';

interface JournalUIState {
  isEditorFocused: boolean;
  activeTool: string | null;
  crisisDetected: boolean;
  setFocus: (isFocused: boolean) => void;
  setActiveTool: (tool: string | null) => void;
  setCrisisDetected: (detected: boolean) => void;
  clearCrisisAlert: () => void;
}

export const useJournalUIStore = create<JournalUIState>((set) => ({
  isEditorFocused: false,
  activeTool: null,
  crisisDetected: false,
  setFocus: (isFocused) => set({ isEditorFocused: isFocused }),
  setActiveTool: (tool) => set({ activeTool: tool }),
  setCrisisDetected: (detected) => set({ crisisDetected: detected }),
  clearCrisisAlert: () => set({ crisisDetected: false }),
}));
