import { GameBoard } from "./components/GameBoard";
import { Background } from "./components/Background";
import { Header } from "./components/Header";
import { Options } from "./components/Options";
import { useGameContext } from "./context";
import { useGetPokemon } from "./hooks/useGetPokemons";

const App = () => {
  const { gameContext } = useGameContext();
  const { fetchPokemons, pokemons, isLoading } = useGetPokemon();

  return (
    <div className="overflow-hidden w-full h-full">
      <Header />
      <Background />
      {!gameContext.isGameStarted && <Options fetchPokemons={fetchPokemons} />}
      <div className="container mx-auto">
        <GameBoard>{gameContext.numberOfPlayers}</GameBoard>
      </div>
      <div>
        {isLoading
          ? "Cargando..."
          : pokemons?.map((poke) => <p key={poke.id}>{poke.name}</p>)}
      </div>
    </div>
  );
};

export default App;
