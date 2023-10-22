import type React from 'react'
import { createContext, useContext, useState } from 'react'
import { defaultGameOptions, initialGameState } from '../defaultSettings'
import { type GameContextOptions } from '../customTypes'

const GameContext = createContext<GameContextOptions | null>(null)

function GameContextProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [gameContext, setGameContext] = useState(defaultGameOptions)
  const [gameState, setGameState] = useState(initialGameState)

  return (
    <GameContext.Provider
      value={{
        gameContext,
        setGameContext,
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
