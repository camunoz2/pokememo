import React, { useEffect, useState } from "react";

import CardContainer from "./components/CardContainer";
import Modal from "./components/Modal";
import PokeCard from "./components/PokeCard";
import WinModal from "./components/WinModal";
import type { PokemonCard, Player } from "./customTypes";
import { TOTAL_POKEMONS, DIFFICULTY_LEVELS } from "./gameConfig";
import { Background } from "./components/Background";
import { Header } from "./components/Header";
import { OptionsSideBar } from "./components/OptionsSideBar";
import { TurnIndicator } from "./components/TurnIndicator";

const App = () => {
  const [players, setPlayers] = useState<Player[]>();
  const [pokemonCards, setPokemonCards] = useState<PokemonCard[]>();
  const [firstChoice, setFirstChoice] = useState<PokemonCard>();
  const [secondChoice, setSecondChoice] = useState<PokemonCard>();
  const [turn, setTurn] = useState(0);
  const [currentPlayerTurn, setCurrentPlayerTurn] = useState<number>(0);
  const [difficulty, setDifficulty] = useState(0);
  const [foundMatch, setFoundMatch] = useState(false);
  const [pairsFound, setPairsFound] = useState(0);

  // This open or closes a modal. The modal opens if the players dont have a name
  const [isOpen, setIsOpen] = useState(false);

  const [win, setWin] = useState(false);

  const openWarningModal = () => {
    setIsOpen(true);
  };

  const isGameReadyToPlay = (): boolean => {
    // are players selected?
    if (!players) return false;

    // players have a name?
    if (players.every((player) => player.name.length < 1)) {
      openWarningModal();
      return false;
    } else return true;
  };

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
    const players: Player[] = [];
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
        <Modal setIsOpen={setIsOpen} message="Primero escribe tu nombre" />
      )}
      {win && (
        <WinModal
          setWin={setWin}
          message={`Game Over! current scores: ${players?.map(
            (player) => player.name + " : " + player.score
          )}`}
        />
      )}
      <Background />
      <Header />

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-4">
          <OptionsSideBar
            createPlayers={createPlayers}
            difficulty={difficulty}
            handlePlayerName={handlePlayerName}
            players={players}
            setDifficulty={setDifficulty}
            startGame={startGame}
          />

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
              <TurnIndicator
                currentPlayerTurn={currentPlayerTurn}
                players={players}
              />
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
