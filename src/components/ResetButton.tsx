import styles from './ResetButton.module.css'
import { useGameContext } from '../context'

interface Props {
  text: string
}

export const ResetButton = ({ text }: Props) => {
  const { setGameOptions, gameOptions } = useGameContext()

  return (
    <button
      className={styles.container}
      onClick={() => {
        setGameOptions({ ...gameOptions, gameState: 'START_SCREEN' })
      }}
    >
      {text}
    </button>
  )
}
