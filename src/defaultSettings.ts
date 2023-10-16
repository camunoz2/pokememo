import { Difficulty, Player } from "./customTypes";

export const difficultyOptions: Difficulty[] = [
  {
    label: "Fácil",
    value: 0,
    icon: "/c1.png",
  },
  {
    label: "Normal",
    value: 1,
    icon: "/c2.png",
  },
  {
    label: "Difícil",
    value: 2,
    icon: "/c3.png",
  },
];

export const players: Player[] = [
  {
    label: 1,
    score: 0,
    name: "Jugador 1",
  },
  {
    label: 2,
    score: 0,
    name: "Jugador 2",
  },
  {
    label: 3,
    score: 0,
    name: "Jugador 3",
  },
  {
    label: 4,
    score: 0,
    name: "Jugador 4",
  },
];
