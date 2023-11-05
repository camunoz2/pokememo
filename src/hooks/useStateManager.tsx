import { useEffect } from 'react'
import { type CardChoice } from '../customTypes'
import { delay } from '../defaultSettings'
import { useGameContext } from '../context'
import { assertIsDefined } from '../services/utils'

export function useStateManager(cardChoices: CardChoice): void {
  const { setGameState, setCardChoices, gameState, gameContext, setPlayersState, setAllMatchedCards, allMatchedCards } =
    useGameContext()

  useEffect(() => {
    if (allMatchedCards.length >= gameContext.gameDifficulty.numberOfPairs) {
      gameOver()
    }
  }, [allMatchedCards])

  function gameOver(): void {
    console.log('Game over!')
  }

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

  function evaluateCardsSelected(cardChoices: CardChoice): void {
    if (cardChoices.choiceOne === null || cardChoices.choiceTwo === null) {
      throw new Error('No hay cartas para comparar')
    }
    if (cardChoices.choiceOne.name === cardChoices.choiceTwo.name) {
      playerScore(cardChoices)
      addToGlobalMatches(cardChoices)
    }
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
}
