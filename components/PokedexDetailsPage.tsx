import { Box, Button, Stack, Typography } from '@mui/material';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import type { Pokemon } from '../types/pokemon.type';

interface OutletContextType {
  pokemonList: Pokemon[];
  selectedIndex: number | null;
}

export default function PokedexDetailsPage() {
  const { nationalId } = useParams();
  const navigate = useNavigate();
  const { pokemonList } = useOutletContext<OutletContextType>();

  const currentIndex = pokemonList.findIndex(
    (p) => p.nationalId === Number(nationalId)
  );

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

  // Si le Pokémon n'est pas trouvé
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
          Pokémon non trouvé
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
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#e8dcc0',
      }}
    >
      <Stack direction="row" spacing={3}>
        <Button
          variant="contained"
          onClick={handlePrev}
          disabled={currentIndex <= 0}
          sx={{
            bgcolor: '#616161',
            '&:hover': { bgcolor: '#757575' },
            '&:disabled': { bgcolor: '#bdbdbd' },
          }}
        >
          ◀ Précédent
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={handleBack}
          sx={{
            bgcolor: '#e53935',
            '&:hover': { bgcolor: '#f44336' },
          }}
        >
          Retour
        </Button>

        <Button
          variant="contained"
          onClick={handleNext}
          disabled={currentIndex >= pokemonList.length - 1}
          sx={{
            bgcolor: '#616161',
            '&:hover': { bgcolor: '#757575' },
            '&:disabled': { bgcolor: '#bdbdbd' },
          }}
        >
          Suivant ▶
        </Button>
      </Stack>
    </Box>
  );
}
