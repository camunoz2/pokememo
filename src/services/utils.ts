import { Pokemon } from "../customTypes";

export function randomizePokemons(pokemons: Pokemon[]) {
  return pokemons.sort(() => Math.random() - 0.5);
}
