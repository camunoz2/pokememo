import { GameBoard } from "./components/GameBoard";
import { Background } from "./components/Background";
import { Header } from "./components/Header";
import { Options } from "./components/Options";
import { useState } from "react";

const App = () => {
  const [isGameOptionsVisible, setIsGameOptionsVisible] = useState(true);

  return (
    <div className="overflow-hidden w-full h-full">
      <Background />
      <Header />
      {isGameOptionsVisible && <Options />}
      <div className="container mx-auto">
        <GameBoard>Test</GameBoard>
      </div>
    </div>
  );
};

export default App;
