import { Typography, Stack, Button, Paper } from '@mui/material';
import type { Pokemon } from '../types/pokemon.type';

interface Props {
  pokemon: Pokemon;
  onBack: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function PokedexDetails({
  pokemon,
  onBack,
  onNext,
  onPrev,
}: Props) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        bgcolor: '#fafafa',
      }}
    >
      {/* Titre */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
        #{pokemon.sinnohId} {pokemon.name}
      </Typography>

      {/* Infos */}
      <Typography variant="subtitle1" color="text.secondary">
        N° National : {pokemon.nationalId}
      </Typography>

      <Typography sx={{ mt: 1 }}>
        <strong>Types :</strong> {pokemon.types.join(', ')}
      </Typography>

      <Typography>
        <strong>Taille :</strong> {pokemon.height}
      </Typography>

      <Typography>
        <strong>Poids :</strong> {pokemon.weight}
      </Typography>

      <Typography sx={{ mt: 2 }}>
        <strong>Description :</strong> description du pokémon
      </Typography>

      {/* Boutons */}
      <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" onClick={onBack}>
          Retour
        </Button>
        <Button variant="outlined" onClick={onPrev}>
          Précédent
        </Button>
        <Button variant="outlined" onClick={onNext}>
          Suivant
        </Button>
      </Stack>
    </Paper>
  );
}
