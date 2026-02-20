import { Box, Typography } from '@mui/material';
import { useOutletContext, useNavigate } from 'react-router-dom';
import type { Pokemon } from '../types/pokemon.type';
import { useAppDispatch } from '../src/store/hooks';
import { logout } from '../src/store/authSlice';

export default function PokedexBottom() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
        bgcolor: '#c7b27a',
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
          bgcolor: '#d7c37f',
          borderBottom: '2px solid #9b8a55',
          fontWeight: 'bold',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Typography
          onClick={() => {
            dispatch(logout());
            navigate('/login');
          }}
          sx={{
            fontWeight: 'bold',
            color: '#6b5b2f',
            cursor: 'pointer',
            '&:hover': { color: '#e05656' },
          }}
        >
          DÉCONNEXION
        </Typography>
      </Box>

      {/* Main area */}
      <Box
        sx={{
          flex: 1,
          position: 'relative',
          bgcolor: '#c7b27a',
          overflow: 'hidden',
        }}
      >
        {/* Button CHERCHER POKEMON */}
        <Box
          sx={{
            position: 'absolute',
            top: 16,
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
          onClick={() => navigate('/search')}
        >
          <Typography
            sx={{ color: '#1d5c1d', fontWeight: 'bold', fontSize: 12 }}
          >
            CHERCHER
            <br />
            POKEMON
          </Typography>
          <Box
            sx={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              border: '3px solid #3d8f3a',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                width: 12,
                height: 12,
                borderRadius: '50%',
                border: '3px solid #3d8f3a',
                top: 4,
                left: 4,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                width: 10,
                height: 3,
                bgcolor: '#3d8f3a',
                transform: 'rotate(45deg)',
                right: -2,
                bottom: -2,
              }}
            />
          </Box>
        </Box>

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
            POKEDEX
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
            bgcolor: '#c6b07a',
            border: '2px solid #9b8a55',
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
            transform: `translateY(-50%) rotate(${cursorIndex * -20}deg)`,
            transition: 'transform 0.3s ease-out',
            width: 360,
            height: 360,
            borderRadius: '50%',
            bgcolor: '#ffffff',
            border: '6px solid #b98f8f',
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
              bgcolor: '#6b5b2f',
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
              border: '4px solid #6b5b2f',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
