import { type GameOptions, type Difficulty, type Player, type GameState } from './customTypes'

export const MAX_POKEMON_ID = 1000

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

export const players: Player[] = [
  {
    label: 1,
    score: 0,
    name: 'Jugador 1',
    pairs: [],
  },
  {
    label: 2,
    score: 0,
    name: 'Jugador 2',
    pairs: [],
  },
  {
    label: 3,
    score: 0,
    name: 'Jugador 3',
    pairs: [],
  },
  {
    label: 4,
    score: 0,
    name: 'Jugador 4',
    pairs: [],
  },
]

export const defaultGameOptions: GameOptions = {
  numberOfPlayers: 1,
  gameDifficulty: difficultyOptions[0],
  numberOfTurns: 0,
  isGameEnded: false,
  isGameStarted: false,
  currentPlayerTurn: players[0],
}

export const initialGameState: GameState = {
  currentTurn: players[0],
  isFirstCardFinishedAnimation: false,
  isFirstCardSelected: false,
  isPairFound: false,
  isSecondCardFinishedAnimation: false,
  isSecondCardSelected: false,
}
