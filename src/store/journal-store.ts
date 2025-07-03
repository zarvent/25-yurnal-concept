'use client';

import { create } from 'zustand';

// Este store ahora solo se encarga del estado de la UI relacionado con la selección de entradas.
// La gestión de los datos de las entradas (entries) ha sido movida a `journal-data.store.ts`
// y la lógica de negocio a `journal.service.ts`.

interface JournalSelectionState {
  selectedEntries: string[]; // IDs de las entradas seleccionadas
  toggleEntrySelection: (id: string) => void;
  clearSelection: () => void;
}

export const useJournalSelectionStore = create<JournalSelectionState>()((set) => ({
  selectedEntries: [],

  toggleEntrySelection: (id) =>
    set((state) => {
      const isSelected = state.selectedEntries.includes(id);
      const newSelectedEntries = isSelected
        ? state.selectedEntries.filter((entryId) => entryId !== id)
        : [...state.selectedEntries, id];
      return { selectedEntries: newSelectedEntries };
    }),

  clearSelection: () => set({ selectedEntries: [] }),
}));

