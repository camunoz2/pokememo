import { type GameOptions, type Difficulty, type Player, type GameState } from './customTypes'

export const MAX_POKEMON_ID = 1000

export const delay = 1000

export const difficultyOptions: Difficulty[] = [
  {
    label: 'Fácil',
    value: 0,
    icon: '/c1.png',
    numberOfPairs: 4,
  },
  {
    label: 'Normal',
    value: 1,
    icon: '/c2.png',
    numberOfPairs: 8,
  },
  {
    label: 'Difícil',
    value: 2,
    icon: '/c3.png',
    numberOfPairs: 12,
  },
]

export const defaultPlayersArray: Player[] = [
  {
    label: 1,
    score: 0,
    name: 'Jugador 1',
    matchedCards: [],
  },
  {
    label: 2,
    score: 0,
    name: 'Jugador 2',
    matchedCards: [],
  },
  {
    label: 3,
    score: 0,
    name: 'Jugador 3',
    matchedCards: [],
  },
  {
    label: 4,
    score: 0,
    name: 'Jugador 4',
    matchedCards: [],
  },
]

export const defaultGameOptions: GameOptions = {
  numberOfPlayers: 1,
  gameDifficulty: difficultyOptions[0],
  gameState: 'SETUP',
}

export const initialGameState: GameState = {
  isUIInteractable: true,
  playerTurn: 0,
}
