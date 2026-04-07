import { createStore } from 'solid-js/store';
import { createEffect } from 'solid-js';

const STORAGE_KEY = 'notatnik-notes';

export const useNotesStore = () => {
  const loadFromStorage = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Error loading notes from storage:', e);
      return [];
    }
  };

  const [notes, setNotes] = createStore(loadFromStorage());

  // Auto-sync to localStorage on every change
  createEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (e) {
      console.error('Error saving notes to storage:', e);
    }
  });

  const addNote = (note) => {
    setNotes((prev) => [...prev, { ...note, id: Date.now().toString() }]);
  };

  const updateNote = (id, updates) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, ...updates } : note))
    );
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const togglePin = (id) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      )
    );
  };

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
    togglePin,
  };
};
