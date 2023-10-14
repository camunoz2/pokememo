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
import { useGameState } from "./hooks/useGameState";

const App = () => {
  const [players, setPlayers] = useState<Player[]>();
  const [difficulty, setDifficulty] = useState<number>();
  const { status, isPlayable } = useGameState(players, difficulty);

  const [pokemonCards, setPokemonCards] = useState<PokemonCard[]>();
  const [firstChoice, setFirstChoice] = useState<PokemonCard>();
  const [secondChoice, setSecondChoice] = useState<PokemonCard>();
  const [turn, setTurn] = useState(0);
  const [currentPlayerTurn, setCurrentPlayerTurn] = useState<number>(0);
  const [foundMatch, setFoundMatch] = useState(false);
  const [pairsFound, setPairsFound] = useState(0);

  // This open or closes a modal. The modal opens if the players dont have a name
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);

  const [win, setWin] = useState(false);

  async function startGame() {
    if (!isPlayable) {
      setIsWarningModalOpen(true);
      return;
    }

    setPokemonCards([]);
    await getCards();
    setWin(false);
    setCurrentPlayerTurn(0);
    setTurn(1);
    setPairsFound(0);
  }

  function createPlayers(numbOfPlayers: number) {
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
  }

  function resetCards() {
    setFirstChoice(undefined);
    setSecondChoice(undefined);
  }

  function gameOver() {
    setWin(true);
    setCurrentPlayerTurn(0);
    setPokemonCards([]);
    setTurn(1);
    setPairsFound(0);
    setPlayers([]);
  }

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

  function matchPairs(choice: string) {
    if (pokemonCards) {
      const changedArr = pokemonCards.map((item) => {
        if (item.name === choice) {
          return { ...item, isMatched: true };
        } else return item;
      });
      setPokemonCards([...changedArr]);
    }
  }

  async function getCards() {
    const ids = getRandomNumberArray(
      DIFFICULTY_LEVELS[difficulty!].cardQty,
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
  }

  function cardSelector(card: PokemonCard) {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card);
  }

  function getRandomNumberArray(quantity: number, maxValue: number) {
    let ids = [];
    for (let i = 0; i < quantity; i++) {
      ids.push(Math.max(1, Math.floor(Math.random() * maxValue + 1)));
    }
    return ids;
  }

  function getSortedArray(arr: PokemonCard[]) {
    return arr.sort(() => Math.random() - 0.5);
  }

  async function getPokemonCards(ids: number[]) {
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
  }

  function handlePlayerName(
    event: React.ChangeEvent<HTMLInputElement>,
    playerId: number
  ) {
    const setNames = players?.map((player) => {
      if (player.id === playerId) {
        return { ...player, name: event.target.value };
      } else return player;
    });
    setPlayers(setNames);
  }

  return (
    <div className="overflow-hidden w-full h-full">
      {isWarningModalOpen && (
        <Modal setIsOpen={setIsWarningModalOpen} message={status} />
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
                  Configura las opciones para jugar!
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
