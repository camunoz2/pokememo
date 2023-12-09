import { type PokemonExtractedData, type CardChoice } from '../customTypes'
import { PokemonCardBack } from './PokemonCardBack'
import { PokemonCardFront } from './PokemonCardFront'
import styles from '../assets/animations.module.css'
import { useGameContext } from '../context'

interface Props {
  pokemon: PokemonExtractedData
  isFlipped: boolean
}

export function PokemonCard({ pokemon, isFlipped }: Props): JSX.Element {
  const { cardChoices, setCardChoices, gameState } = useGameContext()

  function selectCard(): void {
    if (!gameState.isUIInteractable) return
    if (pokemon.UUID === cardChoices.choiceOne?.UUID || pokemon.UUID === cardChoices.choiceTwo?.UUID) return // cant select the same card
    const cards: CardChoice = {
      choiceOne: cardChoices.choiceOne ?? pokemon,
      choiceTwo: cardChoices.choiceOne !== null ? pokemon : null,
    }
    setCardChoices(cards)
  }

  return (
    <div className="relative">
      <div
        className={`${
          isFlipped ? styles.flipHorizontalFwd : styles.flipHorizontalBwd
        } absolute top-0 left-0 w-full z-10 transition-all duration-300`}
      >
        <PokemonCardBack selectCard={selectCard} />
      </div>
      <div className={`${isFlipped ? styles.flipHorizontalBwd : styles.flipHorizontalFwd}`}>
        <PokemonCardFront pokemon={pokemon} />
      </div>
    </div>
  )
}
