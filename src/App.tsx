import { GameBoard } from "./components/GameBoard";
import { Background } from "./components/Background";
import { Header } from "./components/Header";
import { Options } from "./components/Options";
import { useGameContext } from "./context";
import { useGetPokemon } from "./hooks/useGetPokemons";
import { PokemonCard } from "./components/PokemonCard";

const App = () => {
  const { gameContext } = useGameContext();
  const { fetchPokemons, pokemons, isLoading } = useGetPokemon();

  console.log(pokemons);

  return (
    <div className="overflow-hidden w-full h-full">
      <Header />
      <Background />
      {!gameContext.isGameStarted && (
        <Options
          fetchPokemons={() =>
            fetchPokemons(gameContext.gameDifficulty.numberOfPairs)
          }
        />
      )}
      <div className="container mx-auto">
        <GameBoard>{gameContext.numberOfPlayers}</GameBoard>
      </div>
      <div className="flex flex-wrap">
        {isLoading
          ? "Cargando..."
          : pokemons?.map((poke, index) => (
              <PokemonCard key={index} pokemon={poke} />
            ))}
      </div>
    </div>
  );
};

export default App;
