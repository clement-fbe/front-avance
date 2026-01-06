import type { Pokemon } from '../types/pokemon.type';

interface Props {
  pokemon: Pokemon;
  onBack: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function PokedexDetails({
  pokemon,
  onBack,
  onNext,
  onPrev,
}: Props) {
  return (
    <div>
      <h2>
        #{pokemon.sinnohId} {pokemon.name}
      </h2>

      <p>N° National : {pokemon.nationalId}</p>
      <p>Types : {pokemon.types.join(', ')}</p>
      <p>Taille : {pokemon.height}</p>
      <p>Poids : {pokemon.weight}</p>
      <p>Description : "description du pokémon"</p>

      <div style={{ marginTop: '20px' }}>
        <button onClick={onBack}>Retour</button>
        <button onClick={onPrev}>Précédent</button>
        <button onClick={onNext}>Suivant</button>
      </div>
    </div>
  );
}
