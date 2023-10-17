import { useCallback, useState } from "react";
import { getRandomPokemons } from "../services/getPokemons";
import { Pokemon } from "../customTypes";

export function useGetPokemon() {
  const [pokemons, setPokemons] = useState<Pokemon[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemons = useCallback((pokemonLimit: number) => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const data = await getRandomPokemons(pokemonLimit);
        setPokemons(data);
        setError(null);
      } catch (error) {
        setError("Could not fetch data");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  return { isLoading, error, pokemons, fetchPokemons };
}
