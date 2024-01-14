import  styles from "/.App.module.css"
import { type PokemonExtractedData } from './customTypes'
import { GameBoard } from './components/GameBoard'
import { Options } from './components/Options'
import { useGameContext } from './context'
import { useGetPokemon } from './hooks/useGetPokemons'
import { LoadingSpinner } from './components/LoadingSpinner'
import { PokemonCard } from './components/PokemonCard'
import { useStateManager } from './hooks/useStateManager'
import { GameOver } from './components/GameOver'
import { ResetButton } from "./components/ResetButton"
import { PlayersScreen } from "./components/screens/PlayersScreen"
import { MainScreen } from "./components/screens/MainScreen"

function App(): JSX.Element {
  const { gameContext, cardChoices, allMatchedCards } = useGameContext()
  const { fetchPokemons, pokemons, isLoading } = useGetPokemon()
  useStateManager(cardChoices)

  function isCardFlipped(pokemon: PokemonExtractedData): boolean {
    const isChoiceOne = cardChoices.choiceOne?.UUID === pokemon.UUID
    const isChoiceTwo = cardChoices.choiceTwo?.UUID === pokemon.UUID
    const isCardOnMatchesID = allMatchedCards.includes(pokemon.name)
    return isChoiceOne || isChoiceTwo || isCardOnMatchesID
  }

  return (
    <div className="overflow-hidden w-full h-full">
          <div className={styles.background}>
      <div className={styles.container}>
        <MainScreen />
        {/* <PlayersScreen /> */}
      </div>
    </div>
      {gameContext.gameState === 'GAME_OVER' && <GameOver />}
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
          {!isLoading && <ResetButton text='Reiniciar' />}
        </div>
      )}
    </div>
  )
}

export default App
