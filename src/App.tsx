import React, { useEffect, useState } from "react";

import CardContainer from "./components/CardContainer";
import Modal from "./components/Modal";
import PokeCard from "./components/PokeCard";
import WinModal from "./components/WinModal";

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
    cardQty: 2,
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

interface Player {
  id: number;
  currentTurn: number;
  isActive: boolean;
  name: string;
  score: number;
}

const App = () => {
  const [players, setPlayers] = useState<Array<Player>>();
  const [pokemonCards, setPokemonCards] = useState<PokemonCard[] | null>(null);
  const [firstChoice, setFirstChoice] = useState<PokemonCard | null>(null);
  const [secondChoice, setSecondChoice] = useState<PokemonCard | null>(null);
  const [turn, setTurn] = useState(0);
  const [currentPlayerTurn, setCurrentPlayerTurn] = useState<number>(0);
  const [difficulty, setDifficulty] = useState(0);
  const [foundMatch, setFoundMatch] = useState(false);
  const [pairsFound, setPairsFound] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [win, setWin] = useState(false);

  useEffect(() => {
    if (firstChoice && secondChoice) {
      if (firstChoice.name === secondChoice.name) {
        matchPairs(firstChoice.name);
        setFoundMatch(true);
        setTimeout(() => {
          resetCards();
        }, 1000);
      } else {
        setFoundMatch(false);
        setTimeout(() => {
          resetCards();
        }, 1000);
      }
      setTurn((turn) => turn + 1);
    }
  }, [firstChoice, secondChoice]);

  useEffect(() => {
    if (!pokemonCards) return;
    if (foundMatch) setPairsFound((prev) => prev + 1);
  }, [turn]);

  useEffect(() => {
    if (!pokemonCards) return;
    if (pairsFound === pokemonCards.length / 2) {
      gameOver();
    }
  }, [pairsFound]);

  useEffect(() => {
    if (!players) return;
    if (foundMatch) {
      const player = players.map((p) => {
        if (p.id === currentPlayerTurn) {
          return { ...p, score: p.score + 1 };
        } else return p;
      });
      setPlayers(player);
      return;
    }
    if (currentPlayerTurn < players.length) {
      setCurrentPlayerTurn((prev) => prev + 1);
    } else setCurrentPlayerTurn(1);
  }, [turn]);

  const gameOver = () => {
    setWin(true);
    setCurrentPlayerTurn(0);
    setPokemonCards([]);
    setTurn(1);
    setPairsFound(0);
    setPlayers([]);
    setFirstChoice(null);
    setSecondChoice(null);
  };

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
    if (players!.every((player) => player.name.length < 1)) {
      setIsOpen(true);
      return;
    }
    setWin(false);
    setPokemonCards([]);
    resetCards();
    setCurrentPlayerTurn(0);
    setTurn(1);
    setPairsFound(0);
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

  const handlePlayerName = (
    event: React.ChangeEvent<HTMLInputElement>,
    playerId: number
  ) => {
    const setNames = players?.map((player) => {
      if (player.id === playerId) {
        return { ...player, name: event.target.value };
      } else return player;
    });
    setPlayers(setNames);
  };

  const createPlayers = (numbOfPlayers: number) => {
    const players: Array<Player> = [];
    for (let i = 1; i <= numbOfPlayers; i++) {
      players.push({
        id: i,
        currentTurn: 0,
        isActive: true,
        name: "",
        score: 0,
      });
    }
    setPlayers(players);
  };

  return (
    <div className="overflow-hidden w-full h-full">
      {isOpen && (
        <Modal setIsOpen={setIsOpen} message="Name yourself please!! ????" />
      )}
      {win && (
        <WinModal
          setWin={setWin}
          message={`Game Over! current scores: ${players?.map(
            (player) => player.name + " : " + player.score
          )}`}
        />
      )}
      <div className="bg-pattern w-full h-full -z-20 absolute" />
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
            <h2 className="text-white text-2xl font-bold text-center my-6">
              Game Options
            </h2>
            <div>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => {
                  return (
                    <div
                      className={`${
                        i === players?.length
                          ? "border-color-cyan shadow-color-cyan shadow-md"
                          : "border-slate-500"
                      } border p-4 hover:border-color-cyan rounded-md flex flex-col gap-1 justify-between items-center text-white`}
                      key={i}
                      onClick={() => {
                        createPlayers(i);
                      }}
                    >
                      <p className="text-sm text-white">
                        {i} {i === 1 ? "Player" : "Players"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="text-white my-6 text-center">Difficulty level</p>

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
                    src="/c3.png"
                    className="aspect-square"
                    alt="charmander"
                  />
                  <p className="text-xl text-color-cyan">hard</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-white text-center my-6">Trainer Names</p>
              <div className="grid grid-cols-2 gap-1">
                {players?.map((player, index) => {
                  return (
                    <div key={index} className="relative">
                      <input
                        key={index}
                        id="player"
                        title={`player${player.id}`}
                        className="bg-color-lightblue w-full pt-4 pb-1 px-2 rounded-md border text-white focus:outline-color-cyan"
                        onChange={(event) => handlePlayerName(event, player.id)}
                      />
                      <label
                        htmlFor="player"
                        className="absolute top-1 left-1 text-xs text-color-cyan"
                      >
                        Player {player.id}
                      </label>
                    </div>
                  );
                })}
              </div>
              <p className="text-white text-center my-6">Scores</p>

              <div className="flex flex-wrap gap-3 border border-color-cyan p-4 rounded-md justify-around">
                {players?.every((player) => player.name.length > 0) &&
                  players?.map((p, i) => (
                    <div key={i} className="flex flex-col gap-1 text-center">
                      <p className="text-color-cyan font-bold text-xl">
                        {p.score}
                      </p>
                      <p className="text-xl text-white">{p.name}</p>
                    </div>
                  ))}
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
            {currentPlayerTurn ? (
              <div className="bg-color-darkblue p-3 text-xl rounded-md text-white text-center font-bold absolute bottom-10 left-1/2 -translate-x-1/2">
                It's{" "}
                <span className="text-color-cyan font-bold">
                  {players ? players[currentPlayerTurn - 1].name : ""}
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
