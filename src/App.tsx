import { GameBoard } from "./components/GameBoard";
import { Background } from "./components/Background";
import { Header } from "./components/Header";
import { Options } from "./components/Options";
import { useGameContext } from "./context/gameContex";

const App = () => {
  const { isGameStarted } = useGameContext();
  return (
    <div className="overflow-hidden w-full h-full">
      <Header />
      <Background />
      {!isGameStarted && <Options />}
      <div className="container mx-auto">
        <GameBoard>Test</GameBoard>
      </div>
    </div>
  );
};

export default App;
