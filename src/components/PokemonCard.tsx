import { type PokemonExtractedData, type Player } from '../customTypes'
import { PokemonCardBack } from './PokemonCardBack'
import { PokemonCardFront } from './PokemonCardFront'
import styles from '../assets/animations.module.css'
import { useGameContext } from '../context'
import { useEffect, useState } from 'react'

interface Props {
  pokemon: PokemonExtractedData
}

export default function PokemonCard({ pokemon }: Props): JSX.Element {
  const { gameState, setGameState } = useGameContext()
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    setIsFlipped(gameState.allMatchedCards.has(pokemon) || gameState.currentPlayer.selectedCards.includes(pokemon))
  }, [gameState.currentPlayer.selectedCards])

  function selectCard(): void {
    if (!gameState.isUIInteractable) return
    // prevent doing calculations if clicked on the same card
    const result = gameState.currentPlayer.selectedCards.find((card) => {
      return card.UUID === pokemon.UUID
    })
    if (result !== undefined) return

    // create a newPlayer state with the newcard added to selectedCards
    const newPlayerState: Player = {
      ...gameState.currentPlayer,
      selectedCards: [...gameState.currentPlayer.selectedCards, pokemon],
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
