import { useEffect } from 'react'
import { Card } from '../Card'
import { TitleMenu } from '../TitleMenu'
import { TopBar } from '../TopBar'
import styles from './PlayersScreen.module.css'
import { Variants, motion } from 'framer-motion'
import { useGameContext } from '../../context'

export function PlayersScreen() {
  const { setGameOptions, gameOptions } = useGameContext()

  function goBack(keyPressed: KeyboardEvent) {
    console.log(keyPressed)
    if (keyPressed.key == 'Escape') {
      console.log('escape')
    }
  }

  useEffect(() => {
    window.addEventListener('keypress', goBack)

    return () => {
      window.removeEventListener('keypress', goBack)
    }
  })

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

  function setPlayerNumber(nOfPlayers: number) {
    setGameOptions({
      ...gameOptions,
      gameState: 'DIFFICULTY_SELECTOR',
      numberOfPlayers: nOfPlayers,
    })
  }

  return (
    <div className={styles.container}>
      <TopBar />
      <TitleMenu text="Cuantos jugadores?" />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variant}
        transition={{
          staggerChildren: 0.1,
        }}
        className={styles['card-container']}
      >
        <Card clickHandler={() => setPlayerNumber(1)} variant={variant}>
          <img src="/pokeball.svg" alt="" className={styles['card-content']} />
        </Card>
        <Card clickHandler={() => setPlayerNumber(2)} variant={variant}>
          <img src="/pokeball.svg" alt="" className={styles['card-content']} />
          <img src="/pokeball.svg" alt="" className={styles['card-content']} />
        </Card>

        <Card clickHandler={() => setPlayerNumber(3)} variant={variant}>
          <img src="/pokeball.svg" alt="" className={styles['card-content']} />
          <img src="/pokeball.svg" alt="" className={styles['card-content']} />
          <img src="/pokeball.svg" alt="" className={styles['card-content']} />
        </Card>
      </motion.div>
    </div>
  )
}
