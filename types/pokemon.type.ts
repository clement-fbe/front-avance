// Structure brute renvoyée par l'API Tyradex
export interface RawPokemon {
  pokedex_id: number;
  name: {
    fr: string;
    en: string;
    jp: string;
  };
  types: {
    name: string;
    image: string;
  }[];
  height: number;
  weight: number;
}

export interface TyradexPokemon {
  pokedex_id: number;
  name: { fr: string };
  types: { name: string }[];
  height: string | number;
  weight: string | number;
}

// Structure propre utilisée dans ton application
export interface Pokemon {
  nationalId: number;
  sinnohId: number;
  name: string;
  types: string[];
  height: number;
  weight: number;
  caught: boolean;
}
