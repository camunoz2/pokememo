import { useEffect } from 'react'
import { AppTitle } from '../AppTitle'
import { HeroImage } from '../HeroImage'
import { SubTitle } from '../SubTitle'
import { useGameContext } from '../../context'

export function MainScreen() {
  const { setGameOptions, gameOptions } = useGameContext()

  useEffect(() => {
    window.addEventListener('keydown', startGame)
    return () => {
      window.removeEventListener('keydown', startGame)
    }
  }, [])

  function startGame(keyPressed: KeyboardEvent) {
    if (keyPressed.key === 'Enter') {
      setGameOptions({
        gameState: 'DIFFICULTY_SELECTION',
        gameDifficulty: gameOptions.gameDifficulty, // Default settings
        numberOfPlayers: gameOptions.numberOfPlayers,
      })
    }
  }
  return (
    <>
      <AppTitle />
      <SubTitle />
      <HeroImage />
    </>
  )
}
