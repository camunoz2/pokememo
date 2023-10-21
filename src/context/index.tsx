import type React from 'react'
import { createContext, useContext, useState } from 'react'
import { difficultyOptions } from '../defaultSettings'
import { type GameOptions, type GameContextOptions } from '../customTypes'

const defaultGameOptions: GameOptions = {
  numberOfPlayers: 1,
  gameDifficulty: difficultyOptions[0],
  numberOfTurns: 0,
  foundPairs: new Set(),
  isGameEnded: false,
  isGameStarted: false,
}

const GameContext = createContext<GameContextOptions | null>(null)

function GameContextProvider({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  const [gameContext, setGameContext] = useState(defaultGameOptions)

  return (
    <GameContext.Provider value={{ gameContext, setGameContext }}>
      {children}
    </GameContext.Provider>
  )
}

function useGameContext(): GameContextOptions {
  const context = useContext(GameContext)
  if (context === null) {
    throw new Error('The context is not defined')
  }
  return context
}

export { GameContextProvider, useGameContext }
