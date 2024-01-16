export interface Player {
  label: number
  name: string
  score: number
  matchedCards: PokemonExtractedData[]
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
  gameState: 'START_SCREEN' | 'PLAYER_SELECTION' | 'DIFFICULTY_SELECTION' | 'IN_GAME' | 'GAME_OVER' | 'LOADING'
}

export interface GameState {
  playerTurn: number
  isUIInteractable: boolean
}
