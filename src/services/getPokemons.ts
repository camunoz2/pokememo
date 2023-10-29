import { type PokemonExtractedData, type Pokemon } from '../customTypes'
import { getRandomIds } from './utils'

export async function getRandomPokemons(arrLength: number): Promise<PokemonExtractedData[]> {
  const API_URL = 'https://pokeapi.co/api/v2'

  // get a pokemon by its id
  async function getPokemon(pokemonId: number): Promise<Pokemon> {
    const response = await fetch(`${API_URL}/pokemon/${pokemonId}`)
    if (!response.ok) {
      throw new Error('Could not fetch the data')
    }
    const data: Pokemon = await response.json()
    return data
  }

  // generate multiple promises
  const ids = [...getRandomIds(120, 720, arrLength)]

  const pokemonPromises = ids.map(async (pokId) => await getPokemon(pokId))
  const pokemons = await Promise.all([...pokemonPromises])

  // duplicate, randomize data and generate UUID
  const extractPokemonData = pokemons.map((pokemon) => {
    const { id, name, sprites } = pokemon
    return { name, id, sprite: sprites.front_default }
  })
  const duplicatedPokemons = [...extractPokemonData, ...extractPokemonData]
  const randomizedPokemons = duplicatedPokemons
    .sort(() => Math.random() - 0.5)
    .map((pokemon, index) => ({
      ...pokemon,
      UUID: index,
    }))

  return randomizedPokemons
}
