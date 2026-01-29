import { Box } from '@mui/material';
import type { ReactNode } from 'react';

interface PokedexLayoutProps {
  top: ReactNode;
  bottom: ReactNode;
}

export default function PokedexLayout({ top, bottom }: PokedexLayoutProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#d8c7a1', // beige global
      }}
    >
      {/* Conteneur central 650px */}
      <Box
        sx={{
          width: '650px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 0 10px rgba(0,0,0,0.3)',
          borderRadius: '8px',
        }}
      >
        {/* Écran du haut */}
        <Box
          sx={{
            flex: '1 1 50%',
            height: '50%',
            minHeight: 0,
            overflow: 'hidden',
            borderBottom: '3px solid black',
            bgcolor: '#f3e9d2', // beige clair
          }}
        >
          {top}
        </Box>

        {/* Écran du bas */}
        <Box
          sx={{
            flex: '1 1 50%',
            height: '50%',
            minHeight: 0,
            overflow: 'hidden',
            p: 2,
            bgcolor: '#e8dcc0', // beige un peu plus foncé
          }}
        >
          {bottom}
        </Box>
      </Box>
    </Box>
  );
}
