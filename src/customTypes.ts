interface Pair {
  firstCard: Pokemon
  secondCard: Pokemon
}

export interface Player {
  label: number
  name: string
  score: number
  pairs: Pair[]
}

export interface Pokemon {
  id: number
  name: string
  sprites: {
    front_default: string
  }
}

export interface Card {
  name: string
  image: string
}

export interface Difficulty {
  value: number
  label: string
  icon: string
  numberOfPairs: number
}

export interface GameOptions {
  numberOfPlayers: number
  gameDifficulty: Difficulty
  numberOfTurns: number
  isGameStarted: boolean
  isGameEnded: boolean
  currentPlayerTurn: Player
}

export interface GameState {
  currentTurn: Player
  isFirstCardFinishedAnimation: boolean
  isSecondCardFinishedAnimation: boolean
  isPairFound: boolean
  isFirstCardSelected: boolean
  isSecondCardSelected: boolean
}

export interface GameContextOptions {
  gameContext: GameOptions
  setGameContext: React.Dispatch<React.SetStateAction<GameOptions>>
  gameState: GameState
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
}
