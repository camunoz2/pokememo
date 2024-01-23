import { useEffect } from 'react'
import { useGetPokemon } from '../../hooks/useGetPokemons'
import { Card } from '../Card'
import { TopBar } from '../TopBar'
import styles from './PlayersSelectionScreen.module.css'
import { Variants, motion } from 'framer-motion'
import { useGameContext } from '../../context'
import { ResetButton } from '../ResetButton'
import { PokemonExtractedData } from '../../customTypes'
import { Loading } from '../Loading'

export function GameScreen() {
  const { isLoading, pokemons, fetchPokemons, isFinished } = useGetPokemon()
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
      transition: {
        staggerChildren: 0.07,
      },
    },
  }

  return (
    <div className={styles.container}>
      <TopBar text="A jugar!" />
      <motion.div initial="hidden" animate="visible" variants={variant} className={styles['card-container-grid']}>
        {isLoading ? (
          <Loading />
        ) : (
          pokemons?.map((pokemon) => (
            <Card key={pokemon.UUID}>
              <img src={pokemon.sprite} alt="" className={styles['card-images']} />
            </Card>
          ))
        )}
      </motion.div>
      {isFinished && <ResetButton text="Salir" />}
    </div>
  )
}
