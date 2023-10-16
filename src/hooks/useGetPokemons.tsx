import { useCallback, useState } from "react";
import { getPokemonData } from "../services/getPokemons";
import { Pokemon } from "../customTypes";
import { randomizePokemons } from "../services/utils";

export function useGetPokemon() {
  const [pokemons, setPokemons] = useState<Pokemon[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemons = useCallback(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const data = await getPokemonData();
        const randomizedPokemons = randomizePokemons(data.results);
        setPokemons(randomizedPokemons);
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
