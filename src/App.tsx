import { GameBoard } from './components/GameBoard'
import { Background } from './components/Background'
import { Header } from './components/Header'
import { Options } from './components/Options'
import { useGameContext } from './context'
import { useGetPokemon } from './hooks/useGetPokemons'
import { LoadingSpinner } from './components/LoadingSpinner'
import PokemonCard from './components/PokemonCard'

function App(): JSX.Element {
  const { gameContext } = useGameContext()
  const { fetchPokemons, pokemons, isLoading } = useGetPokemon()

  return (
    <div className="overflow-hidden w-full h-full">
      <Header />
      <Background />
      {!gameContext.isGameStarted && (
        <Options
          fetchPokemons={() => {
            void fetchPokemons(gameContext.gameDifficulty.numberOfPairs)
          }}
        />
      )}
      <div className="container mx-auto">
        <GameBoard>
          {isLoading ? <LoadingSpinner /> : pokemons?.map((poke, index) => <PokemonCard key={index} pokemon={poke} />)}
        </GameBoard>
      </div>
    </div>
  )
}

export default App
