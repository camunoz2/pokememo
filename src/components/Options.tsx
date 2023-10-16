import { DiffilcultyPicker } from "./DifficultyPicker";
import { difficultyOptions, players } from "../defaultSettings";
import PlayerPicker from "./PlayerPicker";
import { useContext } from "react";
import { GameContext } from "../context/gameContex";
import { Difficulty } from "../customTypes";

export const Options = () => {
  const { gameContext, updateGameContext } = useContext(GameContext);

  function handleDifficulty(difficulty: Difficulty) {}

  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
      <div className="bg-color-darkblue rounded-md p-12 flex flex-col gap-4">
        <h2 className="text-white text-2xl font-bold text-center uppercase">
          Opciones
        </h2>
        <div className="flex flex-col gap-6">
          <p className="text-white text-center">Cantidad de jugadores</p>
          <div className="grid grid-cols-4 flex-wrap gap-2">
            {players.map((player) => (
              <PlayerPicker player={player} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <p className="text-white text-center">Dificultad</p>

          <div className="grid grid-cols-3 gap-2">
            {difficultyOptions.map((difficulty) => (
              <DiffilcultyPicker
                difficulty={difficulty}
                selectDifficulty={handleDifficulty}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button className="text-xl text-white w-full bg-color-purple border border-color-cyan px-6 py-3 rounded-md shadow">
            Jugar
          </button>
        </div>
      </div>
    </div>
  );
};
