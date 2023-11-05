import { type CardChoice, type PokemonExtractedData } from './customTypes'
import { GameBoard } from './components/GameBoard'
import { Background } from './components/Background'
import { Header } from './components/Header'
import { Options } from './components/Options'
import { useGameContext } from './context'
import { useGetPokemon } from './hooks/useGetPokemons'
import { LoadingSpinner } from './components/LoadingSpinner'
import { PokemonCard } from './components/PokemonCard'
import { useEffect } from 'react'
import { delay } from './defaultSettings'
import { assertIsDefined } from './services/utils'

function App(): JSX.Element {
  const {
    gameContext,
    gameState,
    cardChoices,
    setCardChoices,
    setGameState,
    setPlayersState,
    allMatchedCards,
    setAllMatchedCards,
  } = useGameContext()

  const { fetchPokemons, pokemons, isLoading } = useGetPokemon()

  useEffect(() => {
    if (cardChoices.choiceOne === null && cardChoices.choiceTwo === null) return
    const areBothCardsSelected = cardChoices.choiceOne !== null && cardChoices.choiceTwo !== null
    if (areBothCardsSelected) {
      changeUIInteractivity(false)
      evaluateCardsSelected(cardChoices)
      setTimeout(() => {
        changePlayerTurn()
        changeUIInteractivity(true)
        resetCardChoices()
      }, delay)
    }
  }, [cardChoices.choiceOne, cardChoices.choiceTwo])

  function changeUIInteractivity(isActive: boolean): void {
    setGameState((prevState) => ({
      ...prevState,
      isUIInteractable: isActive,
    }))
  }

  function resetCardChoices(): void {
    setCardChoices({
      choiceOne: null,
      choiceTwo: null,
    })
  }

  function changePlayerTurn(): void {
    setGameState((prevState) => ({
      ...gameState,
      playerTurn: (prevState.playerTurn + 1) % gameContext.numberOfPlayers, // rotates between 0 - numOfplayers
    }))
  }

  function playerScore(cardChoices: CardChoice): void {
    assertIsDefined(cardChoices.choiceOne)
    setPlayersState((prevState) => {
      return prevState.map((player, idx) => {
        if (idx === gameState.playerTurn) {
          return {
            ...player,
            matchedCards:
              cardChoices.choiceOne !== null
                ? [...player.matchedCards, cardChoices.choiceOne]
                : [...player.matchedCards],
          }
        }
        return player
      })
    })
  }

  function addToGlobalMatches(cardChoices: CardChoice): void {
    assertIsDefined(cardChoices.choiceOne)
    setAllMatchedCards([...allMatchedCards, cardChoices.choiceOne.name])
  }

  function evaluateCardsSelected(cardChoices: CardChoice): void {
    if (cardChoices.choiceOne === null || cardChoices.choiceTwo === null) {
      throw new Error('No hay cartas para comparar')
    }
    if (cardChoices.choiceOne.name === cardChoices.choiceTwo.name) {
      playerScore(cardChoices)
      addToGlobalMatches(cardChoices)
    }
  }

  function isCardFlipped(pokemon: PokemonExtractedData): boolean {
    const isChoiceOne = cardChoices.choiceOne?.UUID === pokemon.UUID
    const isChoiceTwo = cardChoices.choiceTwo?.UUID === pokemon.UUID
    const isCardOnMatchesID = allMatchedCards.includes(pokemon.name)
    return isChoiceOne || isChoiceTwo || isCardOnMatchesID
  }

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
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            pokemons?.map((poke, index) => <PokemonCard key={index} pokemon={poke} isFlipped={isCardFlipped(poke)} />)
          )}
        </GameBoard>
        {/* <ul>
          {playersState.map((p, i) => (
            <li key={i}>{p.score.toString()}</li>
          ))}
        </ul> */}
      </div>
    </div>
  )
}

export default App
