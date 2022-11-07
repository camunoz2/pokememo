import React, { useEffect, useState } from "react";

import CardContainer from "./components/CardContainer";
import PokeCard from "./components/PokeCard";
import styles from "./app.module.css";

export interface PokemonCard {
  name: string;
  image: string;
  isMatched: boolean;
  id: number;
}

const TOTAL_POKEMONS = 151;
const DIFFICULTY_LEVELS = [
  {
    level: "easy",
    cardQty: 6,
  },
  {
    level: "medium",
    cardQty: 12,
  },
  {
    level: "hard",
    cardQty: 24,
  },
];

const App = () => {
  const [pokemonCards, setPokemonCards] = useState<PokemonCard[] | null>(null);
  const [firstChoice, setFirstChoice] = useState<PokemonCard | null>(null);
  const [secondChoice, setSecondChoice] = useState<PokemonCard | null>(null);
  const [players, setPlayers] = useState({ player1: "", player2: "" });
  const [turn, setTurn] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [difficulty, setDifficulty] = useState(0);

  useEffect(() => {
    if (firstChoice && secondChoice) {
      setTurn((turn) => turn + 1);

      if (firstChoice.name === secondChoice.name) {
        matchPairs(firstChoice.name);
        setTimeout(() => {
          resetCards();
        }, 1000);
      } else {
        setTimeout(() => {
          resetCards();
        }, 1000);
      }
    }
  }, [firstChoice, secondChoice]);

  useEffect(() => {
    if (turn % 2 === 0) {
      setCurrentPlayer(players.player1);
    } else setCurrentPlayer(players.player2);
  }, [turn]);

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
    setTurn(0);
    setCurrentPlayer(players.player1);
    const ids = getRandomNumberArray(
      DIFFICULTY_LEVELS[difficulty].cardQty,
      TOTAL_POKEMONS
    );
    const cards = await getPokemonCards(ids);
    const duplicateCards = [...cards, ...cards];
    const withUniqueIds = duplicateCards.map((item) => ({
      ...item,
      id: Math.random(),
    }));
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
        id: 0,
      });
    }
    return cards;
  };

  const handlePlayerName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayers({
      ...players,
      [event.target.name]: event.target.value,
    });
    console.log(players);
  };

  return (
    <div className="overflow-hidden w-full h-full">
      <div id={styles.bg} className="bg-pattern w-full h-full -z-20 absolute" />
      <div className="w-full h-full -z-10 absolute bg-color-cyan/30 backdrop-blur-sm" />

      <div className="bg-color-darkblue py-2 drop-shadow-md">
        <div className="container mx-auto flex justify-between">
          <div className="text-white">
            <h1 className="text-xl font-bold">Pokememorize</h1>
            <p className="text-xs">by ArjelDev</p>
          </div>
          <img src="/github.svg" alt="github icon" />
        </div>
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="col-span-3 lg:col-span-1 bg-color-darkblue rounded-md px-4 py-8 flex flex-col gap-2 justify-around">
            <h2 className="text-white text-2xl font-bold">Game Options</h2>
            <div>
              <p className="text-white mb-2">Difficulty level</p>

              <div className="grid grid-cols-3 gap-2">
                <div
                  onClick={() => setDifficulty(0)}
                  className={`bg-color-lightblue flex flex-col p-1 rounded-md items-center cursor-pointer transition-all ${
                    difficulty === 0
                      ? "border border-color-cyan shadow-color-cyan shadow-md "
                      : ""
                  }`}
                >
                  <img
                    style={{ imageRendering: "pixelated" }}
                    src="/c1.png"
                    className="aspect-square"
                    alt="charmander"
                  />
                  <p className="text-xl text-color-cyan">easy</p>
                </div>
                <div
                  onClick={() => setDifficulty(1)}
                  className={`bg-color-lightblue flex flex-col p-1 rounded-md items-center cursor-pointer transition-all ${
                    difficulty === 1
                      ? "border border-color-cyan shadow-color-cyan shadow-md "
                      : ""
                  }`}
                >
                  <img
                    style={{ imageRendering: "pixelated" }}
                    src="/c2.png"
                    className="aspect-square"
                    alt="charmander"
                  />
                  <p className="text-xl text-color-cyan">medium</p>
                </div>
                <div
                  onClick={() => setDifficulty(2)}
                  className={`bg-color-lightblue flex flex-col p-1 rounded-md items-center cursor-pointer transition-all ${
                    difficulty === 2
                      ? "border border-color-cyan shadow-color-cyan shadow-md "
                      : ""
                  }`}
                >
                  <img
                    style={{ imageRendering: "pixelated" }}
                    src="/c3.png"
                    className="aspect-square"
                    alt="charmander"
                  />
                  <p className="text-xl text-color-cyan">hard</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-white mb-2">Trainer Names</p>

              <div className="grid grid-cols-2 gap-1">
                <div className="relative">
                  <input
                    className="bg-color-lightblue w-full pt-4 pb-1 px-2 rounded-md border text-white focus:outline-color-cyan"
                    onChange={handlePlayerName}
                    name="player1"
                  />
                  <p className="absolute top-1 left-1 text-xs text-color-cyan">
                    Player 1
                  </p>
                </div>
                <div className="relative">
                  <input
                    className="bg-color-lightblue pt-4 pb-1 px-2 w-full rounded-md border text-white focus:outline-color-cyan"
                    onChange={handlePlayerName}
                    name="player2"
                  />
                  <p className="absolute top-1 left-1 text-xs text-color-cyan">
                    Player 2
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                className="text-xl text-white w-full bg-color-purple border border-color-cyan px-6 py-3 rounded-md shadow"
                onClick={startGame}
              >
                Play
              </button>
            </div>
          </div>
          <div className="col-span-3 lg:col-span-2 bg-color-darkblue rounded-md">
            <CardContainer>
              {pokemonCards ? (
                pokemonCards.map((card, index) => {
                  return (
                    <PokeCard
                      flipped={
                        firstChoice === card ||
                        secondChoice === card ||
                        card.isMatched
                      }
                      cardSelector={cardSelector}
                      key={index}
                      name={card.name}
                      image={card.image}
                      card={card}
                    />
                  );
                })
              ) : (
                <p className="self-center text-2xl font-bold text-color-cyan">
                  Configure game options to play!
                </p>
              )}
            </CardContainer>
            {currentPlayer ? (
              <div className="bg-color-darkblue p-3 text-xl rounded-md text-white text-center font-bold absolute bottom-10 left-1/2 -translate-x-1/2">
                It's{" "}
                <span className="text-color-cyan font-bold">
                  {currentPlayer}
                </span>{" "}
                turn.
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
