import { Box, Typography } from '@mui/material';
import type { Pokemon } from '../types/pokemon.type';

interface Props {
  pokemon: Pokemon;
}

export default function PokedexDetailsOverlay({ pokemon }: Props) {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header - 10% */}
      <Box
        className="details-header"
        sx={{
          flex: '0 0 10%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '3px solid #616161',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: '#fff',
            textShadow: `
              -1px -1px 0 #616161,
               1px -1px 0 #616161,
              -1px  1px 0 #616161,
               1px  1px 0 #616161
            `,
          }}
        >
          #{pokemon.sinnohId} {pokemon.name}
        </Typography>
      </Box>

      {/* Contenu - 55% */}
      <Box
        className="details-contenu"
        sx={{
          flex: '0 0 55%',
          display: 'flex',
          flexDirection: 'row',
          minHeight: 0,
          backgroundImage: `
            linear-gradient(45deg, rgb(186 235 178) 25%, transparent 25%),
            linear-gradient(-45deg, rgb(186 235 178) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgb(186 235 178) 75%),
            linear-gradient(-45deg, transparent 75%, rgb(186 235 178) 75%)
          `,
          backgroundSize: '6px 6px',
          backgroundPosition: '0 0, 0 3px, 3px -3px, -3px 0px',
          bgcolor: 'rgb(195 251 186)',
        }}
      >
        {/* Image - 45% */}
        <Box
          className="details-image"
          sx={{
            flex: '0 0 45%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {/* Fond avec bordures 3 layers */}
          <Box
            sx={{
              position: 'absolute',
              height: '85%',
              aspectRatio: '1 / 1',
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
                0 0 0 3px rgb(169 203 153),
                0 0 0 6px rgb(251 251 212),
                0 0 0 9px rgb(195 178 97)
              `,
            }}
          />
          <img
            src={`https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${pokemon.nationalId}/regular.png`}
            alt={pokemon.name}
            style={{
              maxWidth: '70%',
              maxHeight: '70%',
              zIndex: 2,
            }}
          />
        </Box>

        {/* Info sup - 55% */}
        <Box
          className="details-info-sup"
          sx={{
            flex: '0 0 55%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Nom et infos - 45% */}
          <Box
            className="details-nom-infos"
            sx={{
              flex: '0 0 45%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              px: 2,
            }}
          >
            <Box
              className="details-nom-infos"
              sx={{
                padding: 1,
                bgcolor: 'rgb(247 247 192)',
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 'bold', color: '#616161' }}
              >
                {pokemon.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                N° National : {pokemon.nationalId}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                N° Sinnoh : {pokemon.sinnohId}
              </Typography>
            </Box>
          </Box>

          {/* Info empreintes, tailles, poids, types - 55% */}
          <Box
            className="details-info-empreintes"
            sx={{
              flex: '0 0 55%',
              display: 'flex',
              flexDirection: 'row',
              minWidth: 0,
            }}
          >
            {/* Empreintes - 35% */}
            <Box
              sx={{
                flex: '0 0 35%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="body2" color="text.secondary">
                🐾
              </Typography>
            </Box>

            {/* Types, tailles, poids - 65% */}
            <Box
              sx={{
                flex: '0 0 65%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Types - 33% */}
              <Box
                sx={{
                  flex: '0 0 33%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  px: 1,
                }}
              >
                {pokemon.types.map((type) => (
                  <Box
                    key={type}
                    component="img"
                    src={`/src/assets/Miniature_Type_${type}_Pokédex_DP.png`}
                    alt={type}
                    sx={{ height: 20 }}
                  />
                ))}
              </Box>

              {/* Poids et taille - 67% */}
              <Box
                sx={{
                  flex: '0 0 67%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  px: 1,
                }}
              >
                <Typography variant="body2" sx={{ color: '#616161' }}>
                  Taille : {pokemon.height} m
                </Typography>
                <Typography variant="body2" sx={{ color: '#616161' }}>
                  Poids : {pokemon.weight} kg
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Description - 35% */}
      <Box
        className="details-description"
        sx={{
          flex: '0 0 35%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 3,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: '#616161',
            textAlign: 'center',
            fontStyle: 'italic',
          }}
        >
          Description du Pokémon à venir...
        </Typography>
      </Box>
    </Box>
  );
}
