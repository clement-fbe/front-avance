import type { RouteObject } from 'react-router-dom';
import RootLayout from './RootLayout';
import PokedexDetailsPage from '../../components/PokedexDetailsPage';
import PokedexBottom from '../../components/PokedexBottom';

export const routes: RouteObject[] = [
  {
    path: '/',
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
    ],
  },
];
