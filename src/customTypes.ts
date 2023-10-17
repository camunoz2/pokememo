export interface Player {
  label: number;
  name: string;
  score: number;
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

export interface Card {
  name: string;
  image: string;
}

export interface Difficulty {
  value: number;
  label: string;
  icon: string;
  numberOfPairs: number;
}

export interface GameOptions {
  numberOfPlayers: number;
  gameDifficulty: Difficulty;
  numberOfTurns: number;
  isGameStarted: boolean;
  isGameEnded: boolean;
  foundPairs: Set<string>;
}

export interface GameContextOptions {
  gameContext: GameOptions;
  setGameContext: React.Dispatch<React.SetStateAction<GameOptions>>;
}
