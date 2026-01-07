import './App.css';
// import { useState } from 'react';
// import type { ITrainer } from '../types/trainer.type';
// import TrainerForm from '../components/TrainerForm';
// import TrainerSelector from '../components/TrainerSelector';
// import TrainerProfile from '../components/TrainerProfile';

// function App() {
//   const [trainers, setTrainers] = useState<ITrainer[]>([]);
//   const [selectedTrainer, setSelectedTrainer] = useState<ITrainer | null>(null);

//   const addTrainer = (name: string, email: string) => {
//     const newTrainer: ITrainer = {
//       id: Date.now(),
//       name,
//       email,
//       isActive: true,
//     };

//     setTrainers((prev) => [...prev, newTrainer]);
//   };

//   const handleLogout = () => {
//     setSelectedTrainer(null);
//   };

//   return (
//     <div>
//       {selectedTrainer ? (
//         <TrainerProfile trainer={selectedTrainer} onLogout={handleLogout} />
//       ) : (
//         <>
//           <h2>Trainer List</h2>

//           <TrainerForm onAddTrainer={addTrainer} />

//           <TrainerSelector
//             trainers={trainers}
//             onSelectTrainer={setSelectedTrainer}
//           />
//         </>
//       )}
//     </div>
//   );
// }

// export default App;
import { useState } from 'react';
import PokedexDetails from '../components/PokedexDetails';
import type { Pokemon } from '../types/pokemon.type';
import PokedexLayout from '../components/PokedexLayout';
import PokedexTop from '../components/PokedexTop';

function App() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (pokemon: Pokemon) => {
    const index = pokemonList.findIndex((p) => p.sinnohId === pokemon.sinnohId);
    setSelectedIndex(index);
  };

  const handleBack = () => setSelectedIndex(null);

  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < pokemonList.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  return (
    <PokedexLayout
      top={
        <PokedexTop
          pokemonList={pokemonList}
          selectedIndex={selectedIndex}
          onSelect={handleSelect}
          onListLoaded={setPokemonList} // ← important pour charger la liste
        />
      }
      bottom={
        selectedIndex === null ? (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            Sélectionne un Pokémon dans la liste
          </div>
        ) : (
          <PokedexDetails
            pokemon={pokemonList[selectedIndex]}
            onBack={handleBack}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )
      }
    />
  );
}

export default App;
