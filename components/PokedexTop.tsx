import { Box, Typography, List } from '@mui/material';
import { useEffect, useState, useRef, useCallback } from 'react';
import type { Pokemon } from '../types/pokemon.type';
import { getGen4Pokemon } from '../src/services/tyradex';
import pokeball from '../src/assets/pokeball.png';
import primerball from '../src/assets/primerball.png';

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
  // Index contrôlé par les flèches
  const [cursorIndex, setCursorIndex] = useState(0);

  // Synchroniser le curseur avec l'index sélectionné (URL)
  useEffect(() => {
    if (selectedIndex !== null && selectedIndex >= 0) {
      setCursorIndex(selectedIndex);
    }
  }, [selectedIndex]);

  // Références des items
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Ref callback propre
  const setItemRef = useCallback((index: number, el: HTMLDivElement | null) => {
    itemRefs.current[index] = el;
  }, []);

  // Scroll centré (au changement de curseur OU quand la liste est chargée)
  useEffect(() => {
    if (pokemonList.length === 0) return;

    const el = itemRefs.current[cursorIndex];
    if (el instanceof HTMLElement) {
      el.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, [cursorIndex, pokemonList.length]);

  // Navigation clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        setCursorIndex((prev) => Math.min(prev + 1, pokemonList.length - 1));
      } else if (e.key === 'ArrowUp') {
        setCursorIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && pokemonList[cursorIndex]) {
        onSelect(pokemonList[cursorIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pokemonList, cursorIndex, onSelect]);

  // Pokémon affiché = sélection clavier uniquement
  const selectedPokemon = pokemonList[cursorIndex] ?? null;

  // Chargement de la liste via le service (avec cache)
  useEffect(() => {
    getGen4Pokemon().then((converted) => {
      onListLoaded(converted);
    });
  }, [onListLoaded]);

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        mx: '-30px', // margin-left et margin-right: -30px
        background: `
      linear-gradient(
        to bottom,
        rgb(146 146 113) 0%,
        rgb(146 146 113) 10%,
        rgb(113 113 81) 50%,
        rgb(146 146 113) 90%,
        rgb(146 146 113) 100%
      )
    `,
      }}
    >
      {/* Section header en deux parties */}
      <Box
        sx={{
          height: '15%',
          display: 'flex',
          flexShrink: 0,
        }}
      >
        {/* Partie gauche (80%) */}
        <Box
          sx={{
            flex: '0 0 80%',
            bgcolor: '#d3ba61',
            display: 'flex',
            alignItems: 'center',
            pl: 3, // Plus de padding à gauche
            pr: 2,
          }}
        >
          <Box
            sx={{
              width: '40%',
              bgcolor: '#ff5757',
              color: 'white',
              fontWeight: 'bold',
              px: 2,
              py: 1,
              borderRadius: '35px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              border: '2px solid #616161',
              ml: '50px', // margin-left: 50px
            }}
          >
            <img src={primerball} alt="" style={{ width: 20, height: 20 }} />
            <span
              style={{
                textShadow: `
                  -1px -1px 0 #616161,
                   1px -1px 0 #616161,
                  -1px  1px 0 #616161,
                   1px  1px 0 #616161
                `,
              }}
            >
              <b>Pokédex de Sinnoh</b>
            </span>
            <img src={primerball} alt="" style={{ width: 20, height: 20 }} />
          </Box>
        </Box>

        {/* Partie droite (20%) */}
        <Box
          sx={{
            flex: '0 0 20%',
            bgcolor: '#b5b576',
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          minHeight: 0,
          gap: 1,
          borderTop: '5px solid rgb(113 113 81)',
          borderBottom: '5px solid rgb(113 113 81)',
          overflow: 'hidden',
        }}
      >
        {/* Image */}
        <Box
          sx={{
            flex: '0 0 45%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {/* Carré blanc */}
          <Box
            sx={{
              width: 'min(28vw, 28vh, 200px)', // ← carré responsive max 200px
              height: 'min(28vw, 28vh, 200px)',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              borderRadius: '8px',
              backgroundImage: `
                repeating-linear-gradient(
                to bottom,
              #ffffff 0px,
              #ffffff 5px,
                rgb(243 243 251) 5px,
                rgb(243 243 251) 10px
              )
              `,
              boxShadow: `
                0 0 0 3px rgb(138 162 211),
                0 0 0 6px rgb(254 245 130),
                0 0 0 8px rgb(71 88 130)
              `,
            }}
          />

          {/* Sprite */}
          {selectedPokemon ? (
            <img
              src={`https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${selectedPokemon.nationalId}/regular.png`}
              alt={selectedPokemon.name}
              style={{
                maxWidth: '70%',
                maxHeight: '70%',
                zIndex: 2,
              }}
            />
          ) : (
            <Typography color="text.secondary" sx={{ zIndex: 2 }}>
              Survole un Pokémon
            </Typography>
          )}
        </Box>

        {/* Liste */}
        <Box
          sx={{
            flex: '0 0 45%',
            minWidth: 0,
            overflowY: 'hidden',
            overflowX: 'hidden',
            minHeight: 0,
            px: 1,
            py: 2,
            pointerEvents: 'none', // Désactive toutes les interactions souris
          }}
        >
          <List
            dense
            sx={{
              pt: '50%',
              pb: '50%',
              overflowX: 'hidden',
              pl: 3,
            }}
          >
            {pokemonList.map((p, index) => {
              const distance = Math.abs(index - cursorIndex);
              const offset = Math.min(distance * 8, 32);

              const bgByDistance = [
                '#fbfbc3', // distance 0
                '#ebe3c3', // distance 1
                '#d3cbba', // distance 2
                '#bab2ba', // distance 3
                '#a19aa3', // distance 4+
              ];

              const backgroundColor =
                bgByDistance[distance] ?? bgByDistance[bgByDistance.length - 1];

              return (
                <Box
                  key={p.sinnohId}
                  ref={(el: HTMLDivElement | null) => setItemRef(index, el)}
                  sx={{
                    mb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    width: '80%',
                    bgcolor: backgroundColor,
                    borderRadius: '32px 8px 8px 32px',
                    boxShadow: 'inset 0 0 0 1px #ccc',
                    transform: `translateX(${offset}px)`,
                    transition:
                      'transform 0.2s ease-out, background-color 0.2s ease-out',
                    px: 2,
                    py: 1,
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
                  <Typography
                    sx={{
                      fontWeight: 'bold',
                      color: '#616161',
                    }}
                  >
                    {`#${p.sinnohId} ${p.name}`}
                  </Typography>
                </Box>
              );
            })}
          </List>
        </Box>

        {/* Barre de scroll personnalisée */}
        <Box
          sx={{
            flex: '0 0 10%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 2,
            ml: '-45px',
          }}
        >
          {/* Conteneur de la barre */}
          <Box
            sx={{
              position: 'relative',
              height: '50%',
              width: '40px',
            }}
          >
            {/* Barre en pointillés */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                width: '4px',
                backgroundImage: `repeating-linear-gradient(
                  to bottom,
                  #616161 0px,
                  #616161 4px,
                  transparent 4px,
                  transparent 8px
                )`,
              }}
            />
            {/* Flèche rouge (indicateur de position) */}
            <Box
              sx={{
                position: 'absolute',
                right: '10px',
                top: `${
                  pokemonList.length > 1
                    ? (cursorIndex / (pokemonList.length - 1)) * 100
                    : 0
                }%`,
                transform: 'translateY(-50%)',
                transition: 'top 0.2s ease-out',
                width: 0,
                height: 0,
                borderLeft: '14px solid #e53935',
                borderTop: '9px solid transparent',
                borderBottom: '9px solid transparent',
                filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.3))',
              }}
            />
          </Box>
        </Box>
      </Box>
      {/* Nouvelle barre en haut */}
      <Box
        sx={{
          height: '15%', // ← quelques pourcents de hauteur
          display: 'flex',
          flexShrink: 0,
        }}
      >
        {/* Partie gauche */}
        <Box
          sx={{
            flex: '0 0 80%',
            bgcolor: 'rgb(211, 186, 97)',
          }}
        />

        {/* Partie droite */}
        <Box
          sx={{
            flex: '0 0 20%',
            bgcolor: '#b5b576',
          }}
        />
      </Box>
    </Box>
  );
}
