import { GameBoard } from "./components/GameBoard";
import { Background } from "./components/Background";
import { Header } from "./components/Header";
import { Options } from "./components/Options";
import { useGameContext } from "./context/gameContex";

const App = () => {
  const { gameContext } = useGameContext();
  return (
    <div className="overflow-hidden w-full h-full">
      <Header />
      <Background />
      {!gameContext.isGameStarted && <Options />}
      <div className="container mx-auto">
        <GameBoard>{gameContext.gameDifficulty.label}</GameBoard>
      </div>
    </div>
  );
};

export default App;
