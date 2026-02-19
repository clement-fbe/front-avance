import { Box, Typography } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import type { Pokemon } from '../types/pokemon.type';

export default function PokedexSearched() {
  const { cursorIndex, onMoveUp, onMoveDown, onConfirm } = useOutletContext<{
    pokemonList: Pokemon[];
    selectedIndex: number | null;
    cursorIndex: number;
    onMoveUp: () => void;
    onMoveDown: () => void;
    onConfirm: () => void;
  }>();

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#8a9a6a',
        borderRadius: '6px',
        overflow: 'hidden',
      }}
    >
      {/* Top bar */}
      <Box
        sx={{
          height: '14%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#9aaa7a',
          borderBottom: '2px solid #6a7a4a',
          fontWeight: 'bold',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Typography sx={{ fontWeight: 'bold', color: '#3a4a2a' }}>
          'ESC' RETOUR
        </Typography>
      </Box>

      {/* Main area */}
      <Box
        sx={{
          flex: 1,
          position: 'relative',
          bgcolor: '#8a9a6a',
          overflow: 'hidden',
        }}
      >
        {/* Button CONSULTER POKEDEX */}
        <Box
          onClick={onConfirm}
          sx={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            width: 150,
            height: 64,
            bgcolor: '#7ed36a',
            borderRadius: '8px',
            border: '3px solid #3d8f3a',
            boxShadow: 'inset 0 0 0 2px #b5f2a6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            cursor: 'pointer',
            '&:hover': { filter: 'brightness(1.1)' },
          }}
        >
          <Typography
            sx={{ color: '#1d5c1d', fontWeight: 'bold', fontSize: 12 }}
          >
            CONSULTER
            <br />
            POKéDEX
          </Typography>
          <Box
            sx={{
              width: 28,
              height: 22,
              borderRadius: '4px',
              border: '3px solid #3d8f3a',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: 3,
                bgcolor: '#3d8f3a',
                top: 6,
                left: 0,
              }}
            />
          </Box>
        </Box>

        {/* Middle arrows */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 40,
            height: 120,
            borderRadius: '20px',
            bgcolor: '#7a8a5a',
            border: '2px solid #6a7a4a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 1,
          }}
        >
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              bgcolor: '#9ab7e8',
              border: '2px solid #6a86b6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer',
              '&:hover': { filter: 'brightness(1.15)' },
              userSelect: 'none',
            }}
            onClick={onMoveUp}
          >
            ▲
          </Box>
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              bgcolor: '#9ab7e8',
              border: '2px solid #6a86b6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer',
              '&:hover': { filter: 'brightness(1.15)' },
              userSelect: 'none',
            }}
            onClick={onMoveDown}
          >
            ▼
          </Box>
        </Box>

        {/* Right Pokeball */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            right: -110,
            transform: `translateY(-50%) rotate(${cursorIndex * -2}deg)`,
            transition: 'transform 0.3s ease-out',
            width: 360,
            height: 360,
            borderRadius: '50%',
            bgcolor: '#ffffff',
            border: '6px solid #8a7a6a',
            overflow: 'hidden',
            boxShadow: '0 2px 0 rgba(0,0,0,0.2)',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '50%',
              bgcolor: '#e05656',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: 6,
              bgcolor: '#4a5a3a',
              transform: 'translateY(-50%)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 28,
              height: 28,
              borderRadius: '50%',
              bgcolor: '#f5f5f5',
              border: '4px solid #4a5a3a',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
