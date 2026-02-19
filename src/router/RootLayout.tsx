import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import type { Pokemon } from '../../types/pokemon.type';
import PokedexLayout from '../../components/PokedexLayout';
import PokedexTop from '../../components/PokedexTop';
import PokedexDetailsOverlay from '../../components/PokedexDetailsOverlay';
import { useCaptureStatus } from '../hook/useCaptureStatus';
import { useGetGenQuery } from '../api/pokemonApi'; // ← RTK Query hook

export default function RootLayout() {
  const navigate = useNavigate();
  const { nationalId } = useParams();

  // ✅ RTK Query remplace useState + useEffect + fetch
  const {
    data: pokemonList = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetGenQuery(4);

  const { isCaptured } = useCaptureStatus();
  const [lastSelectedIndex, setLastSelectedIndex] = useState<number>(0);

  // Trouver l'index du Pokémon sélectionné basé sur l'URL
  const selectedIndex = nationalId
    ? pokemonList.findIndex((p) => p.nationalId === Number(nationalId))
    : null;

  useEffect(() => {
    if (selectedIndex !== null && selectedIndex >= 0) {
      setLastSelectedIndex(selectedIndex);
    }
  }, [selectedIndex]);

  // Pokémon sélectionné
  const selectedPokemon =
    selectedIndex !== null && selectedIndex >= 0
      ? pokemonList[selectedIndex]
      : null;

  // Navigation vers un Pokémon
  const handleSelect = useCallback(
    (pokemon: Pokemon) => {
      const index = pokemonList.findIndex(
        (p) => p.nationalId === pokemon.nationalId,
      );
      if (index >= 0) {
        setLastSelectedIndex(index);
      }
      navigate(`/pokemon/${pokemon.nationalId}`);
    },
    [navigate, pokemonList],
  );

  // Callback pour PokedexTop
  const handleListLoaded = useCallback((_list: Pokemon[]) => {
    // Plus nécessaire avec RTK Query
  }, []);

  // États de chargement et d'erreur
  if (isLoading) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
        }}
      >
        <div>Chargement du Pokédex...</div>
        <div style={{ fontSize: '12px', opacity: 0.7 }}>
          Si cela prend trop de temps, l'API peut être indisponible.
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          color: 'red',
        }}
      >
        <div>Erreur lors du chargement des Pokémon</div>
        <div style={{ color: '#666', fontSize: '12px' }}>
          {typeof error === 'object' && error !== null
            ? JSON.stringify(error)
            : 'Impossible de contacter l’API.'}
        </div>
        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          style={{
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            background: isFetching ? '#f3f3f3' : '#fff',
            color: '#222',
            cursor: isFetching ? 'not-allowed' : 'pointer',
          }}
        >
          {isFetching ? 'Nouvelle tentative…' : 'Réessayer'}
        </button>
      </div>
    );
  }

  return (
    <PokedexLayout
      top={
        selectedPokemon ? (
          <PokedexDetailsOverlay
            pokemon={selectedPokemon}
            isCaptured={isCaptured(selectedPokemon.nationalId)}
          />
        ) : (
          <PokedexTop
            pokemonList={pokemonList}
            selectedIndex={selectedIndex !== -1 ? selectedIndex : null}
            initialIndex={lastSelectedIndex}
            onSelect={handleSelect}
            onListLoaded={handleListLoaded}
          />
        )
      }
      bottom={<Outlet context={{ pokemonList, selectedIndex }} />}
    />
  );
}
