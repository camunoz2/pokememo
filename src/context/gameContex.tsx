import { createContext, useState } from "react";
import type { GameContextOptions } from "../customTypes";
import { difficultyOptions } from "../defaultSettings";

const defaultOptions: GameContextOptions = {
  numberOfPlayers: 1,
  gameDifficulty: difficultyOptions[0],
  players: [{ name: "", score: 0 }],
};

const GameContext = createContext<GameContextOptions>(defaultOptions);

function GameContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <GameContext.Provider value={defaultOptions}>
      {children}
    </GameContext.Provider>
  );
}

export { GameContext, GameContextProvider };
