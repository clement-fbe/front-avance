import type { RouteObject } from 'react-router-dom';
import RootLayout from './RootLayout';
import PokedexDetailsPage from '../../components/PokedexDetailsPage';
import PokedexBottom from '../../components/PokedexBottom';
import PokedexSearchBottom from '../../components/PokedexSearchBottom';
import PokedexSearched from '../../components/PokedexSearched';
import LoginPage from '../../components/LoginPage';
import RequireAuth from '../../components/RequireAuth';

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <RequireAuth />,
    children: [
      {
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: <PokedexBottom />,
          },
          {
            path: 'pokemon/:nationalId',
            element: <PokedexDetailsPage />,
          },
          {
            path: 'search',
            element: <PokedexSearchBottom />,
          },
          {
            path: 'searched',
            element: <PokedexSearched />,
          },
        ],
      },
    ],
  },
];
