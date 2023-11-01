import { GameBoard } from './components/GameBoard'
import { Background } from './components/Background'
import { Header } from './components/Header'
import { Options } from './components/Options'
import { useGameContext } from './context'
import { useGetPokemon } from './hooks/useGetPokemons'
import { LoadingSpinner } from './components/LoadingSpinner'
import PokemonCard from './components/PokemonCard'
import { useEffect } from 'react'
import { type PokemonExtractedData, type GameState, type Player } from './customTypes'

function App(): JSX.Element {
  const { gameContext, gameState, setGameState } = useGameContext()
  const { fetchPokemons, pokemons, isLoading } = useGetPokemon()
  const { choiceOne, choiceTwo } = gameState.currentPlayer.selectedCards

  function addCardToMatches(card: PokemonExtractedData): void {
    const newPlayerMatchedCards: Player = {
      ...gameState.currentPlayer,
      matchedCards: [...gameState.currentPlayer.matchedCards, card],
    }
    const newGameState: GameState = {
      ...gameState,
      allMatchedCards: [...gameState.allMatchedCards, card],
      currentPlayer: newPlayerMatchedCards,
    }
  }

  function isCardFlipped(pokemon: PokemonExtractedData): boolean {
    const isChoiceOne = choiceOne?.UUID === pokemon.UUID
    const isChoiceTwo = choiceTwo?.UUID === pokemon.UUID
    return isChoiceOne || isChoiceTwo
  }

  useEffect(() => {
    if (choiceOne !== null && choiceTwo !== null) {
      // Remove cards, change turn, change currPlayer
      const playerIndex = gameState.turn % gameContext.numberOfPlayers
      const nextPlayerInArray = gameContext.players[playerIndex]
      console.log(nextPlayerInArray)
      const emptyCurrentPlayerCards: Player = {
        ...gameState.currentPlayer,
        selectedCards: {
          choiceOne: null,
          choiceTwo: null,
        },
      }
      const newGameState: GameState = {
        ...gameState,
        turn: gameState.turn + 1,
        currentPlayer: emptyCurrentPlayerCards,
      }
      setGameState(newGameState)
    }
  }, [choiceOne, choiceTwo])

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
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            pokemons?.map((poke, index) => <PokemonCard key={index} pokemon={poke} isFlipped={isCardFlipped(poke)} />)
          )}
        </GameBoard>
      </div>
    </div>
  )
}

export default App
