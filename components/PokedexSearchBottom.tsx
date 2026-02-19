import { Box, Typography } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import type { SearchCategory, SearchFilters } from './PokedexSearchTop';

interface OutletContextType {
  activeCategory: SearchCategory;
  filters: SearchFilters;
  onCategoryChange: (cat: SearchCategory) => void;
  onOptionSelect: (value: string) => void;
  onBack: () => void;
  onOk: () => void;
}

const CATEGORY_OPTIONS: Record<SearchCategory, string[]> = {
  ORDRE: [
    'Numérique',
    'A à Z',
    '+ - lourd',
    '+ - léger',
    '+ - grand',
    '+ - petit',
  ],
  NOM: [
    'ABC',
    'DEF',
    'GHI',
    'JKL',
    'MNO',
    'PQR',
    'STU',
    'VWX',
    'YZ',
    '- - - - -',
  ],
  TYPE: [
    'Normal',
    'Combat',
    'Vol',
    'Poison',
    'Sol',
    'Roche',
    'Insecte',
    'Spectre',
    'Acier',
    '- - - -',
  ],
};

const CATEGORIES: SearchCategory[] = ['ORDRE', 'NOM', 'TYPE'];

const CATEGORY_STYLE: Record<
  SearchCategory,
  { bg: string; border: string; shadow: string }
> = {
  ORDRE: {
    bg: '#f5a623',
    border: '#c47f0a',
    shadow: 'inset 0 -3px 0 #c47f0a, inset 0 2px 0 rgba(255,255,255,0.35)',
  },
  NOM: {
    bg: '#e8943a',
    border: '#b86e18',
    shadow: 'inset 0 -3px 0 #b86e18, inset 0 2px 0 rgba(255,255,255,0.35)',
  },
  TYPE: {
    bg: '#5cc85c',
    border: '#3a9a3a',
    shadow: 'inset 0 -3px 0 #3a9a3a, inset 0 2px 0 rgba(255,255,255,0.35)',
  },
};

function getSelectedValue(cat: SearchCategory, filters: SearchFilters): string {
  switch (cat) {
    case 'ORDRE':
      return filters.ordre;
    case 'NOM':
      return filters.nom;
    case 'TYPE':
      return filters.type1; // primary type selection
  }
}

export default function PokedexSearchBottom() {
  const {
    activeCategory,
    filters,
    onCategoryChange,
    onOptionSelect,
    onBack,
    onOk,
  } = useOutletContext<OutletContextType>();
  const options = CATEGORY_OPTIONS[activeCategory];
  const selectedValue = getSelectedValue(activeCategory, filters);

  const isOptionSelected = (opt: string): boolean => {
    if (activeCategory === 'TYPE') {
      return opt === filters.type1 || opt === filters.type2;
    }
    return opt === selectedValue;
  };

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#c46a7a',
        borderRadius: '6px',
        overflow: 'hidden',
      }}
    >
      {/* Main content area */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          gap: 1,
          p: 1.5,
          pb: 0.5,
          overflow: 'hidden',
        }}
      >
        {/* Left: Options grid */}
        <Box
          sx={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 1,
            alignContent: 'center',
            overflow: 'auto',
            py: 1,
            px: 0.5,
          }}
        >
          {options.map((opt) => {
            const isSelected = isOptionSelected(opt);
            return (
              <Box
                key={opt}
                onClick={() => onOptionSelect(opt)}
                sx={{
                  bgcolor: isSelected ? '#f5a623' : '#e8e4d8',
                  border: isSelected
                    ? '3px solid #c47f0a'
                    : '3px solid #b5b0a0',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '6px 10px !important',
                  minHeight: '32px',
                  cursor: 'pointer',
                  '&:hover': { filter: 'brightness(1.05)' },
                  '&:active': { transform: 'translateY(1px)' },
                  boxShadow: isSelected
                    ? 'inset 0 -3px 0 #c47f0a, inset 0 2px 0 rgba(255,255,255,0.4)'
                    : 'inset 0 -3px 0 #a09880, inset 0 2px 0 rgba(255,255,255,0.7)',
                  transition: 'all 0.15s ease',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    color: '#3a3a3a',
                    fontSize: 14,
                    textAlign: 'center',
                    letterSpacing: opt.includes('-') ? 1.5 : 0,
                  }}
                >
                  {opt}
                </Typography>
              </Box>
            );
          })}
        </Box>

        {/* Right: Category buttons + OK */}
        <Box
          sx={{
            width: 100,
            display: 'flex',
            flexDirection: 'column',
            gap: 0.8,
            py: 0.5,
          }}
        >
          {/* Back arrow button */}
          <Box
            onClick={onBack}
            sx={{
              bgcolor: '#7aaae8',
              border: '3px solid #4a78b8',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              py: 1,
              cursor: 'pointer',
              '&:hover': { filter: 'brightness(1.1)' },
              '&:active': { transform: 'translateY(1px)' },
              boxShadow:
                'inset 0 -3px 0 #4a78b8, inset 0 2px 0 rgba(255,255,255,0.35)',
            }}
          >
            <Typography
              sx={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}
            >
              {'↩'}
            </Typography>
          </Box>

          {/* Category buttons */}
          {CATEGORIES.map((cat) => {
            const isActive = cat === activeCategory;
            const style = CATEGORY_STYLE[cat];
            return (
              <Box
                key={cat}
                onClick={() => onCategoryChange(cat)}
                sx={{
                  bgcolor: style.bg,
                  border: `3px solid ${style.border}`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px 10px !important',
                  cursor: 'pointer',
                  '&:hover': { filter: 'brightness(1.1)' },
                  '&:active': { transform: 'translateY(1px)' },
                  boxShadow: isActive
                    ? `inset 0 -3px 0 ${style.border}, inset 0 2px 0 rgba(255,255,255,0.4), 0 0 0 2px rgba(255,255,255,0.5)`
                    : style.shadow,
                  transition: 'all 0.15s ease',
                  opacity: isActive ? 1 : 0.85,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    color: '#fff',
                    fontSize: 14,
                    textShadow: '1px 1px 0 rgba(0,0,0,0.3)',
                  }}
                >
                  {cat}
                </Typography>
              </Box>
            );
          })}

          {/* OK button inside right column */}
          <Box sx={{ flex: 1 }} />
          <Box
            onClick={onOk}
            sx={{
              bgcolor: '#e8e4d8',
              border: '3px solid #b5b0a0',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px 10px !important',
              cursor: 'pointer',
              '&:hover': { filter: 'brightness(1.05)' },
              '&:active': { transform: 'translateY(1px)' },
              boxShadow:
                'inset 0 -3px 0 #a09880, inset 0 2px 0 rgba(255,255,255,0.7)',
            }}
          >
            <Typography
              sx={{ fontWeight: 'bold', color: '#3a3a3a', fontSize: 14 }}
            >
              OK
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
