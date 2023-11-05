import type React from 'react'
import { createContext, useContext, useState } from 'react'
import { defaultGameOptions, defaultPlayersArray, initialGameState } from '../defaultSettings'
import { type GameOptions, type CardChoice, type GameState, type Player } from '../customTypes'

export interface GameContextOptions {
  gameContext: GameOptions
  setGameContext: React.Dispatch<React.SetStateAction<GameOptions>>
  gameState: GameState
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
  cardChoices: CardChoice
  setCardChoices: React.Dispatch<React.SetStateAction<CardChoice>>
  playersState: Player[]
  setPlayersState: React.Dispatch<React.SetStateAction<Player[]>>
  allMatchedCards: string[]
  setAllMatchedCards: React.Dispatch<React.SetStateAction<string[]>>
}

const GameContext = createContext<GameContextOptions | null>(null)

function GameContextProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [gameContext, setGameContext] = useState(defaultGameOptions)

  const [cardChoices, setCardChoices] = useState<CardChoice>({
    choiceOne: null,
    choiceTwo: null,
  })
  const [gameState, setGameState] = useState(initialGameState)
  const [playerState, setPlayerState] = useState<Player[]>(defaultPlayersArray)
  const [allMatchedCards, setAllMatchedCards] = useState<string[]>([])

  return (
    <GameContext.Provider
      value={{
        gameContext,
        setGameContext,
        gameState,
        setGameState,
        cardChoices,
        setCardChoices,
        playersState: playerState,
        setPlayersState: setPlayerState,
        allMatchedCards,
        setAllMatchedCards,
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
