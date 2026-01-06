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

// Structure propre utilisée dans ton application
export interface Pokemon {
  nationalId: number;
  sinnohId: number;
  name: string;
  types: string[];
  height: number;
  weight: number;
}
