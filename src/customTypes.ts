export interface Player {
  label: number
  name: string
  score: number
  matchedCardsID: number[]
}

export interface CardChoice {
  choiceOne: PokemonExtractedData | null
  choiceTwo: PokemonExtractedData | null
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
}

export interface GameState {
  playerTurn: number
  isUIInteractable: boolean
}
