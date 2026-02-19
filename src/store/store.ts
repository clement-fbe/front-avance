import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import captureReducer from './captureSlice';
import { pokemonApi } from '../api/pokemonApi';

export const store = configureStore({
  reducer: {
    capture: captureReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer, // ← Ajouter l'API
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware), // ← Middleware RTK Query
});

// Active le refetch automatique lors du focus/reconnect
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
