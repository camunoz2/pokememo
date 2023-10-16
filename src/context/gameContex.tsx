import { createContext, useContext, useState } from "react";
import type { GameContextOptions } from "../customTypes";
import { difficultyOptions } from "../defaultSettings";

const defaultOptions: GameContextOptions = {
  numberOfPlayers: 1,
  gameDifficulty: difficultyOptions[0],
  numberOfTurns: 0,
  foundPairs: new Set(),
  isGameEnded: false,
  isGameStarted: false,
};

const GameContext = createContext<GameContextOptions | undefined>(undefined);

function GameContextProvider({ children }: { children: React.ReactNode }) {
  const [gameContext, setGameContext] =
    useState<GameContextOptions>(defaultOptions);

  const updateGameContext = (newContext: GameContextOptions) => {
    setGameContext({ ...gameContext, ...newContext });
  };

  const contextValue = { ...gameContext, updateGameContext };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
}

function useGameContext() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("The context is not defined");
  }
  return context;
}

export { GameContextProvider, useGameContext };
