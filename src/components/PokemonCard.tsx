import { Pokemon } from "../customTypes";

interface Props {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: Props) {
  return (
    <div className="bg-teal-400 items-center justify-center rounded border border-cyan-200 w-[150px] h-[350px]">
      <img src={pokemon.sprites.front_default} />
      <p>{pokemon.name}</p>
    </div>
  );
}
