import { useEffect, useState } from "react";
import styles from "./App.module.css";

import CardContainer from "./components/CardContainer";
import PokeCard from "./components/PokeCard";

export interface PokemonCard {
  name: string;
  image: string;
  isMatched: boolean;
  id: number
}

const POKEMON_CARD_QTY = 4;
const TOTAL_POKEMONS = 151;

const App = () => {
  const [pokemonCards, setPokemonCards] = useState<PokemonCard[] | null>(null);
  const [firstChoice, setFirstChoice] = useState<PokemonCard | null>(null);
  const [secondChoice, setSecondChoice] = useState<PokemonCard | null>(null);

  useEffect(() => {
    if (firstChoice && secondChoice) {
      if (firstChoice.name === secondChoice.name) {
        matchPairs(firstChoice.name);
        setTimeout(() => {
          resetCards();
        }, 1000)
      } else {
        setTimeout(() => {
          resetCards();
        }, 1000)
      }
    }
  }, [firstChoice, secondChoice]);

  const matchPairs = (choice: string) => {
    if (pokemonCards) {
      const changedArr = pokemonCards.map((item) => {
        if (item.name === choice) {
          return { ...item, isMatched: true };
        } else return item;
      });
      setPokemonCards([...changedArr]);
    }
  };

  const resetCards = () => {
    setFirstChoice(null);
    setSecondChoice(null);
  };

  const startGame = async () => {
    setPokemonCards([]);
    resetCards();
    const ids = getRandomNumberArray(POKEMON_CARD_QTY, TOTAL_POKEMONS);
    const cards = await getPokemonCards(ids);
    const duplicateCards = [...cards, ...cards];
    const withUniqueIds = duplicateCards.map(item => ({...item, id: Math.random()}))
    const randomizedPokemonCards = getSortedArray(withUniqueIds);
    setPokemonCards(randomizedPokemonCards);
  };

  const cardSelector = (card: PokemonCard) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card);
  };

  const getRandomNumberArray = (quantity: number, maxValue: number) => {
    let ids = [];
    for (let i = 0; i < quantity; i++) {
      ids.push(Math.max(1, Math.floor(Math.random() * maxValue + 1)));
    }
    return ids;
  };

  const getSortedArray = (arr: PokemonCard[]) => {
    return arr.sort(() => Math.random() - 0.5);
  };

  const getPokemonCards = async (ids: number[]) => {
    // here i have two options a for...of or a Promise.all
    let cards: PokemonCard[] = [];
    for (const id of ids) {
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      let jsonData = await response.json();
      cards.push({
        name: jsonData.name,
        image: jsonData.sprites.front_default,
        isMatched: false,
        id: 0
      });
    }
    return cards;
  };

  return (
    <div className={styles.container}>
      <h1>Pokememorize</h1>
      <button onClick={startGame}>Start Game</button>

      <CardContainer>
        {pokemonCards
          ? pokemonCards.map((card, index) => {
              return (
                <PokeCard
                  flipped={firstChoice === card || secondChoice === card || card.isMatched}
                  cardSelector={cardSelector}
                  key={index}
                  name={card.name}
                  image={card.image}
                  card={card}
                />
              );
            })
          : "Press start game"}
      </CardContainer>
    </div>
  );
};

export default App;
