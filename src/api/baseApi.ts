import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

// --------------- Configuration ---------------
// En dev, les requêtes passent par le proxy Vite (/api → http://localhost:3000)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

// Types for auth state (avoid circular import with authSlice)
interface AuthState {
  token: string | null;
}

interface StoreState {
  auth: AuthState;
}

// --------------- Base query avec Authorization header ---------------
const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as StoreState).auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// --------------- Base query avec logout auto sur 401/403 ---------------
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  // Si 401 ou 403 → token invalide/expiré → déconnexion
  // On exclut /login pour ne pas déclencher de logout sur un simple échec d'auth
  const url = typeof args === 'string' ? args : args.url;
  const isLoginRequest = url === '/login';

  if (
    result.error &&
    !isLoginRequest &&
    (result.error.status === 401 || result.error.status === 403)
  ) {
    api.dispatch({ type: 'auth/logout' });
  }

  return result;
};

// --------------- API de base partagée ---------------
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Auth', 'Captures'],
  endpoints: () => ({}),
});
