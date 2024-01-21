import styles from './App.module.css'
import { type PokemonExtractedData } from './customTypes'
import { useGameContext } from './context'
import { useGetPokemon } from './hooks/useGetPokemons'
import { useStateManager } from './hooks/useStateManager'
import { PlayersSelectionScreen } from './components/screens/PlayersSelectionScreen'
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
  const { gameOptions, cardChoices, allMatchedCards } = useGameContext()
  const { fetchPokemons, pokemons, isLoading } = useGetPokemon()
  useStateManager(cardChoices)

  function isCardFlipped(pokemon: PokemonExtractedData): boolean {
    const isChoiceOne = cardChoices.choiceOne?.UUID === pokemon.UUID
    const isChoiceTwo = cardChoices.choiceTwo?.UUID === pokemon.UUID
    const isCardOnMatchesID = allMatchedCards.includes(pokemon.name)
    return isChoiceOne || isChoiceTwo || isCardOnMatchesID
  }

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        {gameOptions.gameState === 'START_SCREEN' && <MainScreen />}
        {gameOptions.gameState === 'PLAYER_SELECTION' && <PlayersSelectionScreen />}
        {gameOptions.gameState === 'DIFFICULTY_SELECTION' && <DifficultySelectorScreen />}
        {gameOptions.gameState === 'IN_GAME' && <GameScreen />}
      </div>
      {/* {gameContext.gameState === 'GAME_OVER' && <GameOver />}
      {gameContext.gameState === 'SETUP' && (
        <Options
          fetchPokemons={() => {
            void fetchPokemons(gameContext.gameDifficulty.numberOfPairs)
          }}
        />
      )}
      {gameContext.gameState === 'IN_GAME' && (
        <div className="container mx-auto">
          <GameBoard>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              pokemons?.map((poke, index) => <PokemonCard key={index} pokemon={poke} isFlipped={isCardFlipped(poke)} />)
            )}
          </GameBoard>
          {!isLoading && <ResetButton text="Reiniciar" />}
        </div>
      )} */}
    </div>
  )
}

export default App
