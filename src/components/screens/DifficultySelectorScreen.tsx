import { Card } from '../Card'
import { TitleMenu } from '../TitleMenu'
import { TopBar } from '../TopBar'
import styles from './PlayersSelectionScreen.module.css'
import { Variants, motion } from 'framer-motion'
import { useGameContext } from '../../context'
import { Difficulty } from '../../customTypes'
import { difficultyOptions } from '../../defaultSettings'

export function DifficultySelectorScreen() {
  const { setGameOptions, gameOptions } = useGameContext()

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

  function setDifficulty(difficulty: Difficulty) {
    setGameOptions({
      ...gameOptions,
      gameState: 'IN_GAME',
      gameDifficulty: difficulty,
    })
  }

  return (
    <div className={styles.container}>
      <TopBar text="Dificultad" />
      <TitleMenu text="Elige una dificultad" />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variant}
        transition={{
          staggerChildren: 0.1,
        }}
        className={styles['card-container']}
      >
        {difficultyOptions.map((difficulty) => {
          return (
            <Card clickHandler={() => setDifficulty(difficulty)} variant={variant} key={difficulty.value}>
              <img src={difficulty.icon} alt="" className={styles['card-images']} />
            </Card>
          )
        })}
      </motion.div>
    </div>
  )
}
