import { useCallback, useEffect } from 'react'
import { useGetPokemon } from '../../hooks/useGetPokemons'
import { Card } from '../Card'
import { TopBar } from '../TopBar'
import styles from './PlayersSelectionScreen.module.css'
import { Variants, motion } from 'framer-motion'
import { useGameContext } from '../../context'
import { ResetButton } from '../ResetButton'

export function GameScreen() {
  const { isLoading, pokemons, fetchPokemons } = useGetPokemon()
  const { gameOptions } = useGameContext()

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

  return (
    <div className={styles.container}>
      <TopBar />
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
