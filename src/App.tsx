import { GameBoard } from './components/GameBoard'
import { Background } from './components/Background'
import { Header } from './components/Header'
import { Options } from './components/Options'
import { useGameContext } from './context'
import { useGetPokemon } from './hooks/useGetPokemons'
import { LoadingSpinner } from './components/LoadingSpinner'
import PokemonCard from './components/PokemonCard'
import { useEffect } from 'react'
import { type PokemonExtractedData } from './customTypes'

function App(): JSX.Element {
  const { gameContext, gameState, setGameState } = useGameContext()
  const { fetchPokemons, pokemons, isLoading } = useGetPokemon()

  function nextTurn(): void {
    const currentTurn = gameState.turn
    const numbOfPlayers = gameContext.players.length

    // nextTurn oscillates between 0 and numbOfPlayers, by 1 step increment
    const nextTurn = (currentTurn + 1) % numbOfPlayers
    setGameState({ ...gameState, currentPlayer: gameContext.players[nextTurn], turn: nextTurn })
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
    const newMatchedCard = new Set<PokemonExtractedData>(gameState.allMatchedCards)
    const playerMatches = new Set<PokemonExtractedData>(gameState.currentPlayer.matchedCards)

    const isSecondTurn = gameState.currentPlayer.selectedCards.length === 2
    if (isSecondTurn) {
      if (gameState.currentPlayer.selectedCards[0].name === gameState.currentPlayer.selectedCards[1].name) {
        // if there is a match, add to the playersMatches and the globalMatches for updating the card animation
        newMatchedCard.add(gameState.currentPlayer.selectedCards[0])
        playerMatches.add(gameState.currentPlayer.selectedCards[0])
        setGameState((prevState) => ({
          ...prevState,
          isUIInteractable: false, // cannot select any card
          allMatchedCards: newMatchedCard,
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
          <ul>currentPlayer.selectedCards: {JSON.stringify(gameState.currentPlayer.selectedCards)}</ul>
          <p>turn: {gameState.turn}</p>
          <p>currentPlayer: {gameState.currentPlayer.name}</p>
          <p>isUIInteractable: {gameState.isUIInteractable.toString()}</p>
          <h2>Matched cards!</h2>
          <ul>
            {Array.from(gameState.allMatchedCards).map((match, index) => (
              <li key={index}>Matched cards: {match.name}</li>
            ))}
          </ul>
          {/* <ul>
            {Array.from(gameState.currentPlayer.matchedCards).map((match) => (
              <li>{match.name}</li>
            ))}
          </ul> */}
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
