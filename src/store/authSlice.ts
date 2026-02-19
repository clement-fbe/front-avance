import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// --------------- Types ---------------
export interface AuthUser {
  id: number;
  username: string;
  role: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
}

// --------------- Persistence helpers ---------------
const STORAGE_KEY = 'auth';

function loadFromStorage(): Partial<AuthState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveToStorage(state: AuthState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save auth state:', error);
  }
}

// --------------- Initial state ---------------
const stored = loadFromStorage();

const initialState: AuthState = {
  user: stored.user ?? null,
  token: stored.token ?? null,
};

// --------------- Slice ---------------
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: AuthUser;
        token: string;
      }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      saveToStorage(state);
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem(STORAGE_KEY);
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

// --------------- Selectors ---------------
export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  !!state.auth.token;

export default authSlice.reducer;
