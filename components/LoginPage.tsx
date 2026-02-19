import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../src/api/authApi';
import { setCredentials } from '../src/store/authSlice';
import { useAppDispatch } from '../src/store/hooks';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const result = await login({ username, password }).unwrap();

      // Décoder le payload du JWT pour extraire les infos user
      const payload = JSON.parse(atob(result.token.split('.')[1]));

      dispatch(
        setCredentials({
          user: {
            id: payload.sub,
            username: payload.username,
            role: payload.role,
          },
          token: result.token,
        }),
      );

      navigate('/');
    } catch (err: unknown) {
      console.error('Login error:', err);
      const apiError = err as { data?: { message?: string }; status?: number };
      setError(
        apiError.data?.message ??
          'Une erreur est survenue. Vérifiez vos identifiants.',
      );
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `
          linear-gradient(
            135deg,
            #1a1a2e 0%,
            #16213e 50%,
            #0f3460 100%
          )
        `,
      }}
    >
      <Box
        sx={{
          width: 400,
          bgcolor: '#f5f0e1',
          borderRadius: '16px',
          border: '4px solid #c4a662',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            bgcolor: '#e05656',
            py: 2,
            px: 3,
            borderBottom: '3px solid #b03030',
          }}
        >
          <Typography
            sx={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 20,
              textAlign: 'center',
              textShadow: '1px 1px 0 rgba(0,0,0,0.3)',
            }}
          >
            Connexion Dresseur
          </Typography>
        </Box>

        {/* Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: 'bold',
                color: '#3a3a3a',
                mb: 0.5,
                fontSize: 14,
              }}
            >
              Nom de dresseur
            </Typography>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Sacha"
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '2px solid #c4a662',
                fontSize: 14,
                backgroundColor: '#fff',
                boxSizing: 'border-box',
                color: '#333',
              }}
            />
          </Box>

          <Box>
            <Typography
              sx={{
                fontWeight: 'bold',
                color: '#3a3a3a',
                mb: 0.5,
                fontSize: 14,
              }}
            >
              Mot de passe
            </Typography>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '2px solid #c4a662',
                fontSize: 14,
                backgroundColor: '#fff',
                boxSizing: 'border-box',
                color: '#333',
              }}
            />
          </Box>

          {error && (
            <Typography
              sx={{
                color: '#e05656',
                fontSize: 13,
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              {error}
            </Typography>
          )}

          <Box
            component="button"
            type="submit"
            disabled={isLoading}
            sx={{
              mt: 1,
              py: 1.5,
              bgcolor: isLoading ? '#a0a0a0' : '#7ed36a',
              border: '3px solid #3d8f3a',
              borderRadius: '12px',
              color: '#1d5c1d',
              fontWeight: 'bold',
              fontSize: 16,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              boxShadow:
                'inset 0 -3px 0 #3d8f3a, inset 0 2px 0 rgba(255,255,255,0.35)',
              '&:hover': {
                filter: isLoading ? 'none' : 'brightness(1.1)',
              },
            }}
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
