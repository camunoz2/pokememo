import { type Pokemon } from "../customTypes";
import { getRandomIds } from "./utils";

export async function getRandomPokemons(arrLength: number): Promise<Pokemon[]> {
  const API_URL = "https://pokeapi.co/api/v2";

  // get a pokemon by its id
  async function getPokemon(pokemonId: number): Promise<Pokemon> {
    const response = await fetch(`${API_URL}/pokemon/${pokemonId}`);
    if (!response.ok) {
      throw new Error("Could not fetch the data");
    }
    const data: Pokemon = await response.json();
    return data;
  }

  // generate multiple promises
  const ids = [...getRandomIds(120, 720, arrLength)];
  const pokemonPromises = [];
  for (const pokemonId of ids) {
    pokemonPromises.push(getPokemon(pokemonId));
  }
  const pokemons = await Promise.all([...pokemonPromises]);

  // duplicate and randomize data
  const duplicatedPokemons = [...pokemons, ...pokemons];
  const randomizedPokemons = duplicatedPokemons.sort(() => Math.random() - 0.5);
  return randomizedPokemons;
}
