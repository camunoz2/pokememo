import { GameBoard } from './components/GameBoard'
import { Background } from './components/Background'
import { Header } from './components/Header'
import { Options } from './components/Options'
import { useGameContext } from './context'
import { useGetPokemon } from './hooks/useGetPokemons'
import { LoadingSpinner } from './components/LoadingSpinner'
import PokemonCard from './components/PokemonCard'
import { useEffect } from 'react'

function App(): JSX.Element {
  const { gameContext, gameState, setGameState } = useGameContext()
  const { fetchPokemons, pokemons, isLoading } = useGetPokemon()

  function nextTurn(): void {
    // nextTurn oscillates between 0 and numbOfPlayers, by 1 step increment
    const nextTurn = (gameState.turn + 1) % gameContext.players.length
    setGameState({ ...gameState, currentPlayer: gameContext.players[nextTurn], turn: nextTurn })
  }

  function delay(ms: number): number {
    return setTimeout(() => {}, ms)
  }

  function addCardToPlayerMatches(cardName: string): void {
    //
  }

  function addCardToGlobalMatches(cardName: string): void {}
  function emptyPlayerCurrentSelectedCards(): void {}

  useEffect(() => {
    // copy the set of matched cards for correct Updating of values

    const isSecondTurn = gameState.currentPlayer.selectedCards.length === 2
    if (isSecondTurn) {
      const isPairFound = gameState.currentPlayer.selectedCards[0] === gameState.currentPlayer.selectedCards[1]
      if (isPairFound) {
        addCardToPlayerMatches(gameState.currentPlayer.selectedCards[0])
        addCardToGlobalMatches(gameState.currentPlayer.selectedCards[0])
        delay(2000)
        emptyPlayerCurrentSelectedCards()
        nextTurn()
      }
      if (!isPairFound) {
        emptyPlayerCurrentSelectedCards()
        delay(2000)
        nextTurn()
      }

      return () => {
        clearInterval(delay(0))
      }
    }
  }, [gameState.currentPlayer.selectedCards])

  return (
    <div className="overflow-hidden w-full h-full">
      <Header />
      <div className="grid grid-cols-2 border border-red-100">
        <div>
          <h1 className="underline text-lg font-bold">Game Context</h1>
          <p>Game difficulty: {gameContext.gameDifficulty.label}</p>
          <p>Game started?: {gameContext.isGameStarted.toString()}</p>
          <p>PlayersNumber?: {gameContext.numberOfPlayers}</p>
          <ul className="flex gap-2">
            Players?:{' '}
            {gameContext.players.map((p, index) => (
              <li key={index}>{p.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h1 className="underline text-lg font-bold">Game State</h1>
          <ul>gameState.currentPlayer.selectedCards: {JSON.stringify(gameState.currentPlayer.selectedCards)}</ul>
          <p>turn: {gameState.turn}</p>
          <p>gameState.currentPlayer: {gameState.currentPlayer.name}</p>
          <p>isUIInteractable: {gameState.isUIInteractable.toString()}</p>
          <h2>Matched cards!</h2>
          <ul>
            {Array.from(gameState.allMatchedCards).map((match, index) => (
              <li key={index}>Matched cards: {match}</li>
            ))}
          </ul>
        </div>
      </div>
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
