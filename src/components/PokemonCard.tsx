import { type Pokemon } from '../customTypes'
import { PokemonCardBack } from './PokemonCardBack'
import { PokemonCardFront } from './PokemonCardFront'
import { useGameContext } from '../context'
import { useState } from 'react'
import styles from '../assets/animations.module.css'

interface Props {
  pokemon: Pokemon
}

export default function PokemonCard({ pokemon }: Props): JSX.Element {
  const { setGameState, gameState, gameContext } = useGameContext()
  const [isAnimationStarting, setIsAnimationStarting] = useState(false)
  const [isAnimationEnd, setIsAnimationEnd] = useState(false)

  function selectCard(): void {
    setIsAnimationStarting(true)
  }

  return (
    <div className="relative">
      <div
        onAnimationEnd={() => {
          console.log('Ending anim')
        }}
        className={`${isAnimationStarting && styles.flipHorizontalFwd} ${
          isAnimationEnd && 'hidden'
        } absolute top-0 left-0 w-full z-10 transition-all duration-300`}
      >
        <PokemonCardBack selectCard={selectCard} />
      </div>
      <div className={`${isAnimationStarting && styles.flipHorizontalBwd}`}>
        <PokemonCardFront pokemon={pokemon} />
      </div>
    </div>
  )
}
