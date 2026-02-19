import { baseApi } from './baseApi';

// --------------- Types ---------------
interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

interface ProfileResponse {
  message: string;
  user: {
    sub: number;
    username: string;
    role: string;
    iat: number;
    exp: number;
  };
}

// --------------- API endpoints ---------------
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    // Vérifie le token et récupère le profil
    getProfile: builder.query<ProfileResponse, void>({
      query: () => '/profile',
      providesTags: ['Auth'],
    }),
  }),
});

export const { useLoginMutation, useGetProfileQuery } = authApi;
