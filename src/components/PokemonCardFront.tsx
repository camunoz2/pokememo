import { type PokemonExtractedData } from '../customTypes'

interface Props {
  pokemon: PokemonExtractedData
}

export function PokemonCardFront({ pokemon }: Props): JSX.Element {
  return (
    <div className="bg-teal-400 flex flex-col items-center justify-center rounded border border-cyan-200 h-[170px]">
      <img src={pokemon.sprite} />
      <p>{pokemon.name}</p>
    </div>
  )
}
