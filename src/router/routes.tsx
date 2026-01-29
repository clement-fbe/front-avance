import type { RouteObject } from 'react-router-dom';
import RootLayout from './RootLayout';
import PokedexDetailsPage from '../../components/PokedexDetailsPage';

// Page d'accueil (écran bas vide)
function HomePage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      Sélectionne un Pokémon dans la liste
    </div>
  );
}

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'pokemon/:nationalId',
        element: <PokedexDetailsPage />,
      },
    ],
  },
];
