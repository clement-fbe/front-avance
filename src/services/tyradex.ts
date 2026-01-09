// src/services/tyradex.ts
import type { Pokemon, TyradexPokemon } from '../../types/pokemon.type';

// Cache en mémoire
let cachedPokemonList: Pokemon[] | null = null;

/**
 * Récupère les Pokémon de la gen 4 depuis l'API Tyradex
 * avec mise en cache pour éviter les appels répétés
 */
export const getGen4Pokemon = async (): Promise<Pokemon[]> => {
  // Retourne le cache s'il existe
  if (cachedPokemonList) {
    return cachedPokemonList;
  }

  const res = await fetch('https://tyradex.vercel.app/api/v1/gen/4');
  const data: Record<string, TyradexPokemon> = await res.json();

  // Transforme les données brutes en format Pokemon
  const converted: Pokemon[] = Object.values(data)
    .sort((a, b) => a.pokedex_id - b.pokedex_id)
    .map((p, index) => ({
      nationalId: p.pokedex_id,
      sinnohId: index + 1,
      name: p.name.fr,
      types: p.types.map((t) => t.name),
      height: p.height,
      weight: p.weight,
      caught: false,
    }));

  // Stocke en cache
  cachedPokemonList = converted;

  return converted;
};

/**
 * Invalide le cache (utile si on veut forcer un refresh)
 */
export const invalidateCache = (): void => {
  cachedPokemonList = null;
};
