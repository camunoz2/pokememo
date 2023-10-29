import { useCallback, useState } from 'react'
import { type PokemonExtractedData } from '../customTypes'
import { getRandomPokemons } from '../services/getPokemons'

export function useGetPokemon(): {
  isLoading: boolean
  error: string | null
  pokemons: PokemonExtractedData[] | null
  fetchPokemons: (pokemonLimit: number) => Promise<void>
} {
  const [pokemons, setPokemons] = useState<PokemonExtractedData[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPokemons = useCallback(async (pokemonLimit: number): Promise<void> => {
    try {
      setIsLoading(true)
      const data = await getRandomPokemons(pokemonLimit)
      setPokemons(data)
      setError(null)
    } catch (error) {
      setError('Could not fetch data')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { isLoading, error, pokemons, fetchPokemons }
}
