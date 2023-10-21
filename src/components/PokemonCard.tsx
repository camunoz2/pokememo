import { type Pokemon } from '../customTypes'
import { PokemonCardBack } from './PokemonCardBack'
import { PokemonCardFront } from './PokemonCardFront'

interface Props {
  pokemon: Pokemon
}

export default function PokemonCard({ pokemon }: Props): JSX.Element {
  function selectCard(): void {
    console.log(pokemon)
  }

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-full z-10">
        <PokemonCardBack selectCard={selectCard} />
      </div>
      <PokemonCardFront pokemon={pokemon} />
    </div>
  )
}
