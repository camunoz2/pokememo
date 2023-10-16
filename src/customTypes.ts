export interface Player {
  label: number;
  name: string;
  score: number;
}

export interface Difficulty {
  value: number;
  label: string;
  icon: string;
}

export interface GameContextOptions {
  gameDifficulty: Difficulty;
  numberOfPlayers: number;
}
