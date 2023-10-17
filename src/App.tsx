import { GameBoard } from "./components/GameBoard";
import { Background } from "./components/Background";
import { Header } from "./components/Header";
import { Options } from "./components/Options";
import { useGameContext } from "./context";
import { useGetPokemon } from "./hooks/useGetPokemons";
import { PokemonCardFront } from "./components/PokemonCardFront";
import { LoadingSpinner } from "./components/LoadingSpinner";

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
        <GameBoard>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            pokemons?.map((poke, index) => (
              <PokemonCardFront key={index} pokemon={poke} />
            ))
          )}
        </GameBoard>
      </div>
    </div>
  );
};

export default App;
