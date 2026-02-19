import { Outlet, useNavigate, useParams, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Pokemon } from '../../types/pokemon.type';
import PokedexLayout from '../../components/PokedexLayout';
import PokedexTop from '../../components/PokedexTop';
import PokedexDetailsOverlay from '../../components/PokedexDetailsOverlay';
import PokedexSearchTop from '../../components/PokedexSearchTop';
import type {
  SearchCategory,
  SearchFilters,
} from '../../components/PokedexSearchTop';
import { useCaptureStatus } from '../hook/useCaptureStatus';
import { useGetGenQuery } from '../api/pokemonApi';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectCurrentUser } from '../store/authSlice';
import { loadUserCaptures } from '../store/captureSlice';

export default function RootLayout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { nationalId } = useParams();
  const location = useLocation();
  const isSearchPage = location.pathname === '/search';
  const isSearchedPage = location.pathname === '/searched';

  // Charger les captures de l'utilisateur connecté
  const user = useAppSelector(selectCurrentUser);
  useEffect(() => {
    if (user?.id) {
      dispatch(loadUserCaptures(String(user.id)));
    }
  }, [user?.id, dispatch]);

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

  // Trouver l'index du Pokémon sélectionné basé sur l'URL
  const selectedIndex = nationalId
    ? pokemonList.findIndex((p) => p.nationalId === Number(nationalId))
    : null;

  // Search state
  const [searchCategory, setSearchCategory] = useState<SearchCategory>('ORDRE');
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    ordre: 'Numérique',
    nom: '',
    type1: '',
    type2: '',
  });

  // ---------- Filtered & sorted pokemon list ----------
  const filteredList = useMemo(() => {
    let list = [...pokemonList];

    // Filter by NOM (first letter group)
    if (searchFilters.nom) {
      const letters = searchFilters.nom
        .replace(/\s/g, '')
        .toLowerCase()
        .split('');
      list = list.filter((p) =>
        letters.includes(p.name.charAt(0).toLowerCase()),
      );
    }

    // Filter by TYPE(s)
    if (searchFilters.type1) {
      list = list.filter((p) =>
        p.types.some(
          (t) => t.toLowerCase() === searchFilters.type1.toLowerCase(),
        ),
      );
    }
    if (searchFilters.type2) {
      list = list.filter((p) =>
        p.types.some(
          (t) => t.toLowerCase() === searchFilters.type2.toLowerCase(),
        ),
      );
    }

    // Sort by ORDRE
    switch (searchFilters.ordre) {
      case 'A à Z':
        list.sort((a, b) => a.name.localeCompare(b.name, 'fr'));
        break;
      case '+ - lourd':
        list.sort((a, b) => b.weight - a.weight);
        break;
      case '+ - léger':
        list.sort((a, b) => a.weight - b.weight);
        break;
      case '+ - grand':
        list.sort((a, b) => b.height - a.height);
        break;
      case '+ - petit':
        list.sort((a, b) => a.height - b.height);
        break;
      case 'Numérique':
      default:
        break;
    }

    return list;
  }, [pokemonList, searchFilters]);

  // The list to display: filtered on /searched, full otherwise
  const displayList = isSearchedPage ? filteredList : pokemonList;

  // Cursor index lifted from PokedexTop
  const [cursorIndex, setCursorIndex] = useState(0);

  // Sync cursor with URL-based selectedIndex
  useEffect(() => {
    if (selectedIndex !== null && selectedIndex >= 0) {
      setCursorIndex(selectedIndex);
    } else if (pokemonList.length > 0) {
      setCursorIndex((prev) =>
        Math.min(Math.max(prev, 0), pokemonList.length - 1),
      );
    }
  }, [selectedIndex, pokemonList.length]);

  const handleMoveUp = useCallback(() => {
    setCursorIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleMoveDown = useCallback(() => {
    setCursorIndex((prev) => Math.min(prev + 1, displayList.length - 1));
  }, [displayList.length]);

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
    [navigate],
  );

  const handleConfirm = useCallback(() => {
    const pokemon = displayList[cursorIndex];
    if (pokemon) {
      handleSelect(pokemon);
    }
  }, [displayList, cursorIndex, handleSelect]);

  // Search state already declared above

  const handleSearchCategoryChange = useCallback((cat: SearchCategory) => {
    setSearchCategory(cat);
  }, []);

  const handleSearchOptionSelect = useCallback(
    (value: string) => {
      setSearchFilters((prev) => {
        switch (searchCategory) {
          case 'ORDRE':
            return { ...prev, ordre: value };
          case 'NOM':
            return { ...prev, nom: value === '- - - - -' ? '' : value };
          case 'TYPE': {
            const cleanValue = value === '- - - -' ? '' : value;
            // If clicking the same as type1, clear it
            if (prev.type1 === cleanValue) {
              return { ...prev, type1: prev.type2, type2: '' };
            }
            // If clicking the same as type2, clear it
            if (prev.type2 === cleanValue) {
              return { ...prev, type2: '' };
            }
            // If type1 is empty, fill type1
            if (!prev.type1) {
              return { ...prev, type1: cleanValue };
            }
            // If type2 is empty, fill type2
            if (!prev.type2) {
              return { ...prev, type2: cleanValue };
            }
            // Both slots full: shift type2 → type1, new → type2
            return { ...prev, type1: prev.type2, type2: cleanValue };
          }
          default:
            return prev;
        }
      });
    },
    [searchCategory],
  );

  const handleSearchBack = useCallback(() => {
    setSearchCategory('ORDRE');
    setSearchFilters({
      ordre: 'Numérique',
      nom: '',
      type1: '',
      type2: '',
    });
    navigate('/');
  }, [navigate]);

  const handleSearchOk = useCallback(() => {
    setCursorIndex(0);
    navigate('/searched');
  }, [navigate]);

  // Escape key to quit search/searched pages
  useEffect(() => {
    if (!isSearchPage && !isSearchedPage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isSearchPage) {
          handleSearchBack();
        } else {
          // Reset filters when leaving /searched
          setSearchCategory('ORDRE');
          setSearchFilters({
            ordre: 'Numérique',
            nom: '',
            type1: '',
            type2: '',
          });
          navigate('/');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchPage, isSearchedPage, handleSearchBack, navigate]);

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
        isSearchPage ? (
          <PokedexSearchTop
            activeCategory={searchCategory}
            filters={searchFilters}
          />
        ) : selectedPokemon ? (
          <PokedexDetailsOverlay
            pokemon={selectedPokemon}
            isCaptured={isCaptured(selectedPokemon.nationalId)}
          />
        ) : (
          <PokedexTop
            pokemonList={displayList}
            selectedIndex={selectedIndex !== -1 ? selectedIndex : null}
            cursorIndex={cursorIndex}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            onSelect={handleSelect}
            onListLoaded={handleListLoaded}
            variant={isSearchedPage ? 'searched' : 'default'}
            resultCount={isSearchedPage ? filteredList.length : undefined}
          />
        )
      }
      bottom={
        <Outlet
          context={{
            pokemonList: displayList,
            selectedIndex,
            cursorIndex,
            onMoveUp: handleMoveUp,
            onMoveDown: handleMoveDown,
            onConfirm: handleConfirm,
            // Search context
            activeCategory: searchCategory,
            filters: searchFilters,
            onCategoryChange: handleSearchCategoryChange,
            onOptionSelect: handleSearchOptionSelect,
            onBack: handleSearchBack,
            onOk: handleSearchOk,
          }}
        />
      }
    />
  );
}
