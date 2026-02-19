import { Box, Typography } from '@mui/material';

export type SearchCategory = 'ORDRE' | 'NOM' | 'TYPE';

export interface SearchFilters {
  ordre: string;
  nom: string;
  type1: string;
  type2: string;
}

interface Props {
  activeCategory: SearchCategory;
  filters: SearchFilters;
}

const CATEGORY_HEADERS: Record<SearchCategory, string> = {
  ORDRE: 'Choisissez un mode de classement.',
  NOM: 'Recherche par la première lettre du nom.',
  TYPE: 'Recherche par le type.',
};

export default function PokedexSearchTop({ activeCategory, filters }: Props) {
  // Slots to display
  const slots: {
    label: string;
    value: string;
    active: boolean;
    double?: boolean;
  }[] = [
    {
      label: 'ordre',
      value: filters.ordre || '- - - - -',
      active: activeCategory === 'ORDRE',
    },
    {
      label: 'nom',
      value: filters.nom || '- - - - -',
      active: activeCategory === 'NOM',
    },
    {
      label: 'type',
      value:
        filters.type1 || filters.type2
          ? `${filters.type1 || '- - - -'}\n${filters.type2 || '- - - -'}`
          : '- - - -\n- - - -',
      active: activeCategory === 'TYPE',
      double: true,
    },
  ];

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: `
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 4px,
            rgba(255,200,200,0.3) 4px,
            rgba(255,200,200,0.3) 5px
          )
        `,
        bgcolor: '#d4899a',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          flex: '0 0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 1.5,
          px: 2,
        }}
      >
        <Box
          sx={{
            bgcolor: '#f5f0e0',
            borderRadius: '24px',
            px: 3,
            py: 1,
            border: '2px solid #b8a87a',
            width: '90%',
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{
              fontWeight: 'bold',
              color: '#3a3a3a',
              fontSize: 14,
              fontFamily: '"Press Start 2P", monospace, sans-serif',
            }}
          >
            {CATEGORY_HEADERS[activeCategory]}
          </Typography>
        </Box>
      </Box>

      {/* Filter slots */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          px: 2,
          pb: 1,
          overflow: 'hidden',
        }}
      >
        {slots.map((slot) => (
          <Box
            key={slot.label}
            sx={{
              flex: slot.double ? '0 0 28%' : '0 0 20%',
              mx: 1,
              bgcolor: slot.active ? '#f5a623' : '#f0d86e',
              border: slot.active ? '3px solid #e53935' : '3px solid #c9a93e',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 0.5,
              boxShadow: slot.active ? '0 0 0 2px rgba(229,57,53,0.3)' : 'none',
            }}
          >
            <Typography
              sx={{
                fontWeight: 'bold',
                color: '#3a3a3a',
                fontSize: 14,
                textAlign: 'center',
                whiteSpace: 'pre-line',
                letterSpacing: slot.value.includes('-') ? 2 : 0,
              }}
            >
              {slot.value}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
