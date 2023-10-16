export interface Player {
  label: number;
  name: string;
  score: number;
}

export interface Card {
  name: string;
  image: string;
}

export interface Difficulty {
  value: number;
  label: string;
  icon: string;
}

export interface GameContextOptions {
  numberOfPlayers: number;
  gameDifficulty: Difficulty;
  numberOfTurns: number;
  isGameStarted: boolean;
  isGameEnded: boolean;
  foundPairs: Set<string>;
}
