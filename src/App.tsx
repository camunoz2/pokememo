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
  const { allMatchedCards, currentPlayer, isUIInteractable, turn } = gameState
  const { players } = gameContext

  function nextTurn(): void {
    // nextTurn oscillates between 0 and numbOfPlayers, by 1 step increment
    const nextTurn = (turn + 1) % players.length
    setGameState({ ...gameState, currentPlayer: players[nextTurn], turn: nextTurn })
  }

  function turnReset(): number {
    return setTimeout(() => {
      nextTurn()
      setGameState((prevState) => ({
        ...prevState,
        currentPlayer: { ...prevState.currentPlayer, selectedCards: [] },
        isUIInteractable: true, // after animation donde, can select new cards
      }))
    }, 2000)
  }

  useEffect(() => {
    // copy the set of matched cards for correct Updating of values

    const isSecondTurn = currentPlayer.selectedCards.length === 2
    if (isSecondTurn) {
      const isPairFound = currentPlayer.selectedCards[0].name === currentPlayer.selectedCards[1].name
      if (isPairFound) {
        // if there is a match, add to the playersMatches and the globalMatches for updating the card animation

        const playerMatches = new Set(currentPlayer.matchedCards)

        setGameState((prevState) => ({
          ...prevState,
          isUIInteractable: false, // cannot select any card
          allMatchedCards,
          currentPlayer: { ...prevState.currentPlayer, matchedCards: playerMatches },
        }))
        turnReset()
        // clear selectedCards after a delay
      } else {
        setGameState({ ...gameState, isUIInteractable: false })
        turnReset()
      }

      return () => {
        clearInterval(turnReset())
      }
    }
  }, [currentPlayer.selectedCards])

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
          <ul>currentPlayer.selectedCards: {JSON.stringify(currentPlayer.selectedCards)}</ul>
          <p>turn: {turn}</p>
          <p>currentPlayer: {currentPlayer.name}</p>
          <p>isUIInteractable: {isUIInteractable.toString()}</p>
          <h2>Matched cards!</h2>
          <ul>
            {Array.from(allMatchedCards).map((match, index) => (
              <li key={index}>Matched cards: {match.name}</li>
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
