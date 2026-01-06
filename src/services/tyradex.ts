// src/services/tyradex.ts
import type { RawPokemon } from '../../types/pokemon.type';

export const getGen4Pokemon = async () => {
  const res = await fetch('https://tyradex.app/api/v1/gen/4');
  const data = await res.json();
  return data as Record<string, RawPokemon>;
};
