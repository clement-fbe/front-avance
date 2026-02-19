import { Box, Button, Typography } from '@mui/material';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import type { Pokemon } from '../types/pokemon.type';
import { useCaptureStatus } from '../src/hook/useCaptureStatus';

interface OutletContextType {
  pokemonList: Pokemon[];
  selectedIndex: number | null;
}

export default function PokedexDetailsPage() {
  const { nationalId } = useParams();
  const navigate = useNavigate();
  const { pokemonList } = useOutletContext<OutletContextType>();
  const { isCaptured, toggleCaptured } = useCaptureStatus(); // <- Utiliser toggleCaptured

  const currentIndex = pokemonList.findIndex(
    (p) => p.nationalId === Number(nationalId),
  );

  const currentPokemon = pokemonList[currentIndex];
  const captured = currentPokemon
    ? isCaptured(currentPokemon.nationalId)
    : false;

  // Navigation
  const handleBack = () => navigate('/');

  const handleNext = () => {
    if (currentIndex < pokemonList.length - 1) {
      const nextPokemon = pokemonList[currentIndex + 1];
      navigate(`/pokemon/${nextPokemon.nationalId}`);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevPokemon = pokemonList[currentIndex - 1];
      navigate(`/pokemon/${prevPokemon.nationalId}`);
    }
  };

  // Toggle capture avec Redux
  const handleToggleCapture = () => {
    if (currentPokemon) {
      toggleCaptured(currentPokemon.nationalId);
    }
  };

  // Si le Pokemon n'est pas trouve
  if (currentIndex < 0) {
    return (
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#e8dcc0',
        }}
      >
        <Typography variant="h5" color="error" sx={{ mb: 2 }}>
          Pokemon non trouve
        </Typography>
        <Button variant="contained" color="error" onClick={handleBack}>
          Retour
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        bgcolor: '#b7c48f',
        pt: 1.5,
        gap: 2.5,
      }}
    >
      {/* Onglets */}
      <Box
        sx={{
          width: '100%',
          height: '20%',
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          bgcolor: '#c3a857',
          borderRadius: 0,
          pl: '10px',
          pr: 0,
          py: 0.9,
          boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.35)',
        }}
      >
        {['INFO', 'ZONE', 'CRI', 'TAILLE'].map((label, index) => (
          <Box
            key={label}
            sx={{
              px: 4,
              py: 2,
              minWidth: 72,
              minHeight: 44,
              borderRadius: '12px',
              bgcolor: '#9ab7e8',
              color: '#eef3ff',
              fontWeight: 'bold',
              border: '3px solid #6a86b6',
              boxShadow:
                'inset 0 0 0 2px #cbdaf3, 0 2px 0 rgba(0,0,0,0.15)',
              fontSize: 15,
              lineHeight: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            {label}
            {index === 0 && (
              <>
                <Box
                  sx={{
                    position: 'absolute',
                    top: -5,
                    left: -5,
                    width: 10,
                    height: 10,
                    borderTop: '3px solid #d92828',
                    borderLeft: '3px solid #d92828',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: -5,
                    right: -5,
                    width: 10,
                    height: 10,
                    borderTop: '3px solid #d92828',
                    borderRight: '3px solid #d92828',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -5,
                    left: -5,
                    width: 10,
                    height: 10,
                    borderBottom: '3px solid #d92828',
                    borderLeft: '3px solid #d92828',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -5,
                    right: -5,
                    width: 10,
                    height: 10,
                    borderBottom: '3px solid #d92828',
                    borderRight: '3px solid #d92828',
                  }}
                />
              </>
            )}
          </Box>
        ))}
        <Box sx={{ flex: 1 }} />
        <Box
          component="button"
          type="button"
          onClick={handleBack}
          sx={{
            width: 72,
            height: 44,
            borderRadius: '12px',
            bgcolor: '#c9a9ef',
            border: '2px solid #8f6bb6',
            boxShadow:
              'inset 0 0 0 2px #e6d0f7, 0 2px 0 rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            mr: '10px',
          }}
        >
          ⬆
        </Box>
      </Box>

      {/* Boutons principaux */}
      <Box
        sx={{
          width: '90%',
          display: 'flex',
          flexDirection: 'column',
          gap: 1.8,
          alignItems: 'center',
        }}
      >
        <Button
          variant="contained"
          onClick={handlePrev}
          disabled={currentIndex <= 0}
          sx={{
            width: '82%',
            bgcolor: '#2fd0e8',
            '&:hover': { bgcolor: '#27c3da' },
            '&:disabled': { bgcolor: '#9adbe6' },
            borderRadius: '12px',
            border: '2px solid #1f8b9c',
            boxShadow:
              'inset 0 0 0 2px rgba(255,255,255,0.5), 0 3px 0 rgba(0,0,0,0.2)',
            color: '#fff',
            fontWeight: 'bold',
            textTransform: 'none',
          }}
        >
          ⬆ PRECED.
        </Button>

        <Button
          variant="contained"
          onClick={handleNext}
          disabled={currentIndex >= pokemonList.length - 1}
          sx={{
            width: '82%',
            bgcolor: '#2fd0e8',
            '&:hover': { bgcolor: '#27c3da' },
            '&:disabled': { bgcolor: '#9adbe6' },
            borderRadius: '12px',
            border: '2px solid #1f8b9c',
            boxShadow:
              'inset 0 0 0 2px rgba(255,255,255,0.5), 0 3px 0 rgba(0,0,0,0.2)',
            color: '#fff',
            fontWeight: 'bold',
            textTransform: 'none',
          }}
        >
          SUIVANT ⬇
        </Button>
      </Box>

      {/* Actions secondaires */}
      <Box sx={{ display: 'flex', gap: 1.5 }}>
        <Button
          variant="contained"
          onClick={handleToggleCapture}
          sx={{
            bgcolor: captured ? '#4caf50' : '#ff9800',
            '&:hover': { bgcolor: captured ? '#45a049' : '#fb8c00' },
            borderRadius: '10px',
            border: '2px solid #a8792b',
            color: '#fff',
            fontWeight: 'bold',
            textTransform: 'none',
          }}
        >
          {captured ? 'Capture' : 'Libere'}
        </Button>
      </Box>
    </Box>
  );
}
