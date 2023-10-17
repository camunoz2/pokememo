import { Pokemon } from "../customTypes";

interface Props {
  pokemon: Pokemon;
}

export function PokemonCardFront({ pokemon }: Props) {
  return (
    <div className="bg-teal-400 flex flex-col items-center justify-center rounded border border-cyan-200 h-[170px]">
      <img src={pokemon.sprites.front_default} />
      <p>{pokemon.name}</p>
    </div>
  );
}
