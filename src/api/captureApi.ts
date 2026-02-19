import { baseApi } from './baseApi';

// --------------- Types ---------------
interface CaptureData {
  captured: Record<number, boolean>;
}

// --------------- API endpoints ---------------
export const captureApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Récupère les captures de l'utilisateur connecté
    getCaptures: builder.query<CaptureData, void>({
      query: () => '/captures',
      providesTags: ['Captures'],
    }),

    // Met à jour une capture
    updateCapture: builder.mutation<
      void,
      { pokemonId: number; captured: boolean }
    >({
      query: ({ pokemonId, captured }) => ({
        url: `/captures/${pokemonId}`,
        method: 'PUT',
        body: { captured },
      }),
      invalidatesTags: ['Captures'],
    }),

    // Sync complet des captures (envoi bulk)
    syncCaptures: builder.mutation<void, Record<number, boolean>>({
      query: (captured) => ({
        url: '/captures/sync',
        method: 'POST',
        body: { captured },
      }),
      invalidatesTags: ['Captures'],
    }),
  }),
});

export const {
  useGetCapturesQuery,
  useUpdateCaptureMutation,
  useSyncCapturesMutation,
} = captureApi;
