export interface Player {
  label: number
  name: string
  score: number
  selectedCards: {
    choiceOne: PokemonExtractedData | null
    choiceTwo: PokemonExtractedData | null
  }
  matchedCards: PokemonExtractedData[]
}

export interface Pokemon {
  id: number
  name: string
  sprites: {
    front_default: string
  }
}

export interface PokemonExtractedData {
  UUID: number
  id: number
  name: string
  sprite: string
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
  isGameStarted: boolean
  players: Player[]
}

export interface GameState {
  turn: number
  currentPlayer: Player
  allMatchedCards: PokemonExtractedData[]
  isUIInteractable: boolean
}

export interface GameContextOptions {
  gameContext: GameOptions
  setGameContext: React.Dispatch<React.SetStateAction<GameOptions>>
  gameState: GameState
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
}
