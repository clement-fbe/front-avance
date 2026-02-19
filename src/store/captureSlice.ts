import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CaptureState {
  captured: Record<number, boolean>;
}

const STORAGE_KEY = 'pokemon-capture-status';

// Charger depuis localStorage au démarrage
function loadFromStorage(): Record<number, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

// Sauvegarder dans localStorage
function saveToStorage(captured: Record<number, boolean>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(captured));
  } catch (error) {
    console.error('Failed to save capture status:', error);
  }
}

const initialState: CaptureState = {
  captured: loadFromStorage(),
};

const captureSlice = createSlice({
  name: 'capture',
  initialState,
  reducers: {
    setCaptured: (
      state,
      action: PayloadAction<{ id: number; captured: boolean }>,
    ) => {
      state.captured[action.payload.id] = action.payload.captured;
      saveToStorage(state.captured);
    },
    toggleCaptured: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.captured[id] = !state.captured[id];
      saveToStorage(state.captured);
    },
    resetAllCaptures: (state) => {
      state.captured = {};
      saveToStorage(state.captured);
    },
  },
});

export const { setCaptured, toggleCaptured, resetAllCaptures } =
  captureSlice.actions;

export default captureSlice.reducer;
