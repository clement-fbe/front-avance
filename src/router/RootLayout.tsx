import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import type { Pokemon } from '../../types/pokemon.type';
import { getGen4Pokemon } from '../services/tyradex';
import PokedexLayout from '../../components/PokedexLayout';
import PokedexTop from '../../components/PokedexTop';
import PokedexDetailsOverlay from '../../components/PokedexDetailsOverlay';

export default function RootLayout() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const navigate = useNavigate();
  const { nationalId } = useParams();

  // Charger la liste au montage
  useEffect(() => {
    getGen4Pokemon().then(setPokemonList);
  }, []);

  // Trouver l'index du Pokémon sélectionné basé sur l'URL
  const selectedIndex = nationalId
    ? pokemonList.findIndex((p) => p.nationalId === Number(nationalId))
    : null;

  // Pokémon sélectionné
  const selectedPokemon =
    selectedIndex !== null && selectedIndex >= 0
      ? pokemonList[selectedIndex]
      : null;

  // Navigation vers un Pokémon
  const handleSelect = useCallback(
    (pokemon: Pokemon) => {
      navigate(`/pokemon/${pokemon.nationalId}`);
    },
    [navigate]
  );

  // Callback pour PokedexTop (ne plus charger la liste depuis PokedexTop)
  const handleListLoaded = useCallback((_list: Pokemon[]) => {
    // La liste est déjà chargée ici, on ignore
  }, []);

  return (
    <PokedexLayout
      top={
        selectedPokemon ? (
          <PokedexDetailsOverlay pokemon={selectedPokemon} />
        ) : (
          <PokedexTop
            pokemonList={pokemonList}
            selectedIndex={selectedIndex !== -1 ? selectedIndex : null}
            onSelect={handleSelect}
            onListLoaded={handleListLoaded}
          />
        )
      }
      bottom={<Outlet context={{ pokemonList, selectedIndex }} />}
    />
  );
}
