import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Pokemon, TyradexPokemon } from '../../types/pokemon.type';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://tyradex.app/api/v1/' }),
  tagTypes: ['PokemonGen', 'Pokemon'],
  endpoints: (builder) => ({
    // Récupère tous les Pokémon d'une génération
    getGen: builder.query<Pokemon[], number>({
      query: (gen = 4) => `gen/${gen}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ nationalId }) => ({
                type: 'Pokemon' as const,
                id: nationalId,
              })),
              { type: 'PokemonGen', id: 'LIST' },
            ]
          : [{ type: 'PokemonGen', id: 'LIST' }],
      // Transformation des données de l'API vers votre format Pokemon
      transformResponse: (
        response:
          | { pokemon: TyradexPokemon[] }
          | TyradexPokemon[]
          | Record<string, TyradexPokemon>,
        _meta,
        gen,
      ) => {
        const list: TyradexPokemon[] = Array.isArray(response)
          ? response
          : Array.isArray(response.pokemon)
            ? response.pokemon
            : Object.values(response);

        const converted: Pokemon[] = list
          .sort((a, b) => a.pokedex_id - b.pokedex_id)
          .map((p, index) => ({
            nationalId: p.pokedex_id,
            sinnohId: gen === 4 ? index + 1 : p.pokedex_id, // Sinnoh ID seulement pour Gen 4
            name: p.name.fr,
            types: p.types.map((t: TyradexPokemon['types'][number]) => t.name),
            height: p.height,
            weight: p.weight,
            caught: false,
          }));
        return converted;
      },
    }),

    // Récupère un Pokémon spécifique par ID
    getPokemon: builder.query<TyradexPokemon, number>({
      query: (id) => `pokemon/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Pokemon', id }],
    }),
  }),
});

export const { useGetGenQuery, useGetPokemonQuery } = pokemonApi;
