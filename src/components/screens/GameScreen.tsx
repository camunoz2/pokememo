import { useEffect } from 'react'
import { useGetPokemon } from '../../hooks/useGetPokemons'
import { Card } from '../Card'
import { TopBar } from '../TopBar'
import styles from './PlayersSelectionScreen.module.css'
import { Variants, motion } from 'framer-motion'
import { useGameContext } from '../../context'
import { ResetButton } from '../ResetButton'
import { PokemonExtractedData } from '../../customTypes'

export function GameScreen() {
  const { isLoading, pokemons, fetchPokemons } = useGetPokemon()
  const { gameOptions, cardChoices, allMatchedCards } = useGameContext()

  useEffect(() => {
    fetchPokemons(gameOptions.gameDifficulty.numberOfPairs)
  }, [])

  const variant: Variants = {
    hidden: {
      x: -20,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
    },
  }
  function isCardFlipped(pokemon: PokemonExtractedData): boolean {
    const isChoiceOne = cardChoices.choiceOne?.UUID === pokemon.UUID
    const isChoiceTwo = cardChoices.choiceTwo?.UUID === pokemon.UUID
    const isCardOnMatchesID = allMatchedCards.includes(pokemon.name)
    return isChoiceOne || isChoiceTwo || isCardOnMatchesID
  }

  return (
    <div className={styles.container}>
      <TopBar text="A jugar!" />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variant}
        transition={{
          staggerChildren: 0.1,
        }}
        className={styles['card-container-grid']}
      >
        {isLoading
          ? 'Loadding'
          : pokemons?.map((pokemon) => (
              <Card variant={variant} key={pokemon.UUID}>
                <img src={pokemon.sprite} alt="" className={styles['card-images']} />
              </Card>
            ))}
      </motion.div>
      <ResetButton text={'Salir'} />
    </div>
  )
}
