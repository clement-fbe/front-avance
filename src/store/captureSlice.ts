import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CaptureState {
  captured: Record<number, boolean>;
  userId: string | null;
}

const STORAGE_PREFIX = 'pokemon-capture-status';

// Charger depuis localStorage pour un user donné
function loadFromStorage(userId?: string | null): Record<number, boolean> {
  try {
    const key = userId ? `${STORAGE_PREFIX}-${userId}` : STORAGE_PREFIX;
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

// Sauvegarder dans localStorage
function saveToStorage(
  captured: Record<number, boolean>,
  userId?: string | null,
) {
  try {
    const key = userId ? `${STORAGE_PREFIX}-${userId}` : STORAGE_PREFIX;
    localStorage.setItem(key, JSON.stringify(captured));
  } catch (error) {
    console.error('Failed to save capture status:', error);
  }
}

const initialState: CaptureState = {
  captured: loadFromStorage(),
  userId: null,
};

const captureSlice = createSlice({
  name: 'capture',
  initialState,
  reducers: {
    // Charger les captures d'un utilisateur spécifique
    loadUserCaptures: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
      state.captured = loadFromStorage(action.payload);
    },

    // Réinitialiser au logout
    clearCaptures: (state) => {
      state.captured = {};
      state.userId = null;
    },

    setCaptured: (
      state,
      action: PayloadAction<{ id: number; captured: boolean }>,
    ) => {
      state.captured[action.payload.id] = action.payload.captured;
      saveToStorage(state.captured, state.userId);
    },
    toggleCaptured: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.captured[id] = !state.captured[id];
      saveToStorage(state.captured, state.userId);
    },
    resetAllCaptures: (state) => {
      state.captured = {};
      saveToStorage(state.captured, state.userId);
    },
  },
});

export const {
  setCaptured,
  toggleCaptured,
  resetAllCaptures,
  loadUserCaptures,
  clearCaptures,
} = captureSlice.actions;

export default captureSlice.reducer;
