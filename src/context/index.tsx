import type React from 'react'
import { createContext, useContext, useState } from 'react'
import { defaultGameOptions, initialGameState } from '../defaultSettings'
import { type GameState, type GameContextOptions } from '../customTypes'

const GameContext = createContext<GameContextOptions | null>(null)

function GameContextProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [gameOptionsContext, setGameOptionsContext] = useState(defaultGameOptions)
  const [gameState, setGameState] = useState<GameState>(initialGameState)

  return (
    <GameContext.Provider
      value={{
        gameContext: gameOptionsContext,
        setGameContext: setGameOptionsContext,
        gameState,
        setGameState,
      }}
    >
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
