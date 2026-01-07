import { useEffect, useState } from 'react';
import { getGen4Pokemon } from '../src/services/tyradex';
import type { Pokemon } from '../types/pokemon.type';
import type { RawPokemon } from '../types/pokemon.type';
import { List, ListItemButton, ListItemText } from '@mui/material';

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
          sinnohId: index + 1,
          name: p.name.fr,
          types: p.types.map((t) => t.name),
          height: p.height,
          weight: p.weight,
          caught: false,
        }));

      setPokemonList(converted);
      onListLoaded(converted);
    });
  }, []);

  return (
    <List sx={{ maxHeight: '100%', overflowY: 'auto' }}>
      {' '}
      {pokemonList.map((p) => (
        <ListItemButton key={p.sinnohId} onClick={() => onSelect(p)}>
          {' '}
          <ListItemText primary={`#${p.sinnohId} ${p.name}`} />{' '}
        </ListItemButton>
      ))}{' '}
    </List>
  );
}
