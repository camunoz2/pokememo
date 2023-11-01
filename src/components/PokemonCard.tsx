import { type PokemonExtractedData, type Player } from '../customTypes'
import { PokemonCardBack } from './PokemonCardBack'
import { PokemonCardFront } from './PokemonCardFront'
import styles from '../assets/animations.module.css'
import { useGameContext } from '../context'

interface Props {
  pokemon: PokemonExtractedData
  isFlipped: boolean
}

export default function PokemonCard({ pokemon, isFlipped }: Props): JSX.Element {
  const { gameState, setGameState } = useGameContext()

  function selectCard(): void {
    if (!gameState.isUIInteractable) return

    let newPlayerState: Player

    // create a newPlayer state with the newcard added to selectedCards
    if (gameState.currentPlayer.selectedCards.choiceOne === null) {
      newPlayerState = {
        ...gameState.currentPlayer,
        selectedCards: {
          choiceOne: pokemon,
          choiceTwo: null,
        },
      }
    } else {
      newPlayerState = {
        ...gameState.currentPlayer,
        selectedCards: {
          ...gameState.currentPlayer.selectedCards,
          choiceTwo: pokemon,
        },
      }
    }

    setGameState({ ...gameState, currentPlayer: newPlayerState })
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
