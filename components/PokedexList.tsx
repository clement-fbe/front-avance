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
    getGen4Pokemon().then((data: Pokemon[]) => {
      setPokemonList(data);
      onListLoaded(data);
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
