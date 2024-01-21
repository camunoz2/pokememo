import styles from './App.module.css'
import { useGameContext } from './context'
import { useStateManager } from './hooks/useStateManager'
import { MainScreen } from './components/screens/MainScreen'
import { DifficultySelectorScreen } from './components/screens/DifficultySelectorScreen'
import { GameScreen } from './components/screens/GameScreen'

export interface CustomChar {
  zIndex: number
  xPos: number
  yPos: number
  char: string
}

function App(): JSX.Element {
  const { gameOptions, cardChoices } = useGameContext()
  useStateManager(cardChoices)

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        {gameOptions.gameState === 'START_SCREEN' && <MainScreen />}
        {gameOptions.gameState === 'DIFFICULTY_SELECTION' && <DifficultySelectorScreen />}
        {gameOptions.gameState === 'IN_GAME' && <GameScreen />}
      </div>
    </div>
  )
}

export default App
