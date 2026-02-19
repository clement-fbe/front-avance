import { Box, Typography } from '@mui/material';

export default function PokedexBottom() {
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
        <Typography sx={{ fontWeight: 'bold', color: '#6b5b2f' }}>
          B QUITTER
        </Typography>
      </Box>

      {/* Main area */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'stretch',
          gap: 2,
          px: 2,
          pb: 2,
          bgcolor: '#c7b27a',
        }}
      >
        {/* Left buttons */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'space-between',
            py: 2,
            width: 180,
          }}
        >
          <Box
            sx={{
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
            }}
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

          <Box
            sx={{
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
        </Box>

        {/* Middle arrows */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 60,
          }}
        >
        <Box
          sx={{
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
              fontWeight: 'bold',
            }}
          >
            ^
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
              fontWeight: 'bold',
            }}
          >
            v
          </Box>
        </Box>
        </Box>

        {/* Right Pokeball */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            overflow: 'visible',
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              width: 360,
              height: 360,
              borderRadius: '50%',
              bgcolor: '#ffffff',
              border: '6px solid #b98f8f',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 2px 0 rgba(0,0,0,0.2)',
              transform: 'translate(110px, -35px)',
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
    </Box>
  );
}
