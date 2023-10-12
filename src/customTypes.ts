export interface PokemonCard {
  name: string;
  image: string;
  isMatched: boolean;
  id: number;
}

export interface Player {
  id: number;
  currentTurn: number;
  isActive: boolean;
  name: string;
  score: number;
}
