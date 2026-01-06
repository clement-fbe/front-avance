import { useEffect, useState } from 'react';
import { getGen4Pokemon } from '../src/services/tyradex';
import type { Pokemon } from '../types/pokemon.type';
import type { RawPokemon } from '../types/pokemon.type';

interface Props {
  onSelect: (pokemon: Pokemon) => void;
  onListLoaded: (list: Pokemon[]) => void;
}

export default function PokedexList({ onSelect, onListLoaded }: Props) {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    getGen4Pokemon().then((data: Record<string, RawPokemon>) => {
      const converted: Pokemon[] = Object.values(data)
        .sort((a, b) => a.pokedex_id - b.pokedex_id) // tri national
        .map((p, index) => ({
          nationalId: p.pokedex_id,
          sinnohId: index + 1, // 1 → n
          name: p.name.fr,
          types: p.types.map((t) => t.name),
          height: p.height,
          weight: p.weight,
        }));

      setPokemonList(converted);
      onListLoaded(converted);
    });
  }, []);

  return (
    <ul>
      {pokemonList.map((p) => (
        <li key={p.sinnohId} onClick={() => onSelect(p)}>
          #{p.sinnohId} {p.name}
        </li>
      ))}
    </ul>
  );
}
