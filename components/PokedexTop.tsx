import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useEffect, useState, useRef, useCallback } from 'react';
import type { Pokemon, TyradexPokemon } from '../types/pokemon.type';
import pokeball from '../src/assets/pokeball.png';

interface Props {
  pokemonList: Pokemon[];
  selectedIndex: number | null;
  onSelect: (pokemon: Pokemon) => void;
  onListLoaded: (list: Pokemon[]) => void;
}

export default function PokedexTop({
  pokemonList,
  selectedIndex,
  onSelect,
  onListLoaded,
}: Props) {
  const [hoveredPokemon, setHoveredPokemon] = useState<Pokemon | null>(null);

  // Index contrôlé par les flèches
  const [cursorIndex, setCursorIndex] = useState(0);

  // Références des items
  const itemRefs = useRef<(Element | null)[]>([]);

  // Ref callback propre
  const setItemRef = useCallback((index: number, el: Element | null) => {
    itemRefs.current[index] = el;
  }, []);

  // Scroll centré
  useEffect(() => {
    const el = itemRefs.current[cursorIndex];
    if (el instanceof HTMLElement) {
      el.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, [cursorIndex]);

  // Navigation clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        setCursorIndex((prev) => Math.min(prev + 1, pokemonList.length - 1));
      } else if (e.key === 'ArrowUp') {
        setCursorIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pokemonList.length]);

  // Pokémon affiché = hover > sélection clavier
  const selectedPokemon = hoveredPokemon ?? pokemonList[cursorIndex] ?? null;

  // Chargement de la liste
  useEffect(() => {
    fetch('https://tyradex.vercel.app/api/v1/gen/4')
      .then((res) => res.json())
      .then((data: Record<string, TyradexPokemon>) => {
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

        onListLoaded(converted);
      });
  }, []);

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#d0cfcf',
      }}
    >
      <Box
        sx={{
          bgcolor: '#b71c1c',
          color: 'white',
          textAlign: 'center',
          py: 1,
          fontWeight: 'bold',
          borderRadius: '4px',
          mb: 1,
          flexShrink: 0,
        }}
      >
        Pokédex de Sinnoh
      </Box>

      <Box
        sx={{
          display: 'flex',
          flex: 1,
          minHeight: 0,
          gap: 2,
        }}
      >
        {/* Image */}
        <Box
          sx={{
            flex: 1,
            borderRadius: '4px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          {selectedPokemon ? (
            <img
              src={`https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${selectedPokemon.nationalId}/regular.png`}
              alt={selectedPokemon.name}
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          ) : (
            <Typography color="text.secondary">Survole un Pokémon</Typography>
          )}
        </Box>

        {/* Liste */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            minHeight: 0,
            px: 1,
            py: 2,
          }}
        >
          <List dense sx={{ pt: '50%', pb: '50%' }}>
            {pokemonList.map((p, index) => {
              const distance = Math.abs(index - cursorIndex);
              const offset = Math.min(distance * 8, 32); // max 32px

              return (
                <ListItemButton
                  key={p.sinnohId}
                  component="div"
                  ref={(el) => setItemRef(index, el)}
                  selected={index === cursorIndex}
                  onClick={() => onSelect(p)}
                  onMouseEnter={() => setHoveredPokemon(p)}
                  onMouseLeave={() => setHoveredPokemon(null)}
                  sx={{
                    mb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    bgcolor: '#fefefe',
                    borderRadius: '32px 8px 8px 32px',
                    boxShadow: 'inset 0 0 0 1px #ccc',
                    transform: `translateX(${offset}px)`,
                    transition: 'transform 0.2s ease-out',
                    '&:hover': { bgcolor: '#f5f5f5' },
                  }}
                >
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      position: 'relative',
                      flexShrink: 0,
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        backgroundColor: p.caught ? '#4caf50' : '#d0d0d0',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                      }}
                    />

                    <img
                      src={pokeball}
                      alt=""
                      style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        zIndex: 2,
                      }}
                    />
                  </Box>

                  <ListItemText primary={`#${p.sinnohId} ${p.name}`} />
                </ListItemButton>
              );
            })}
          </List>
        </Box>
      </Box>
    </Box>
  );
}
