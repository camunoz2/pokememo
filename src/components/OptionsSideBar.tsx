import { Player } from "../customTypes";
import { DIFFICULTY_LEVELS } from "../gameConfig";
import { DiffilcultyPicker } from "./DifficultyPicker";

interface OptionsProps {
  players: Player[] | undefined;
  createPlayers: (numberOfPlayers: number) => void;
  setDifficulty: (difficultyLevel: number) => void;
  difficulty?: number;
  handlePlayerName: (
    event: React.ChangeEvent<HTMLInputElement>,
    playerId: number
  ) => void;
  startGame: () => void;
}

export const OptionsSideBar = ({
  createPlayers,
  difficulty,
  handlePlayerName,
  players,
  setDifficulty,
  startGame,
}: OptionsProps) => {
  const numOfPlayers = [1, 2, 3, 4];

  return (
    <div className="col-span-3 lg:col-span-1 bg-color-darkblue rounded-md px-4 py-8 flex flex-col gap-2 justify-around">
      <h2 className="text-white text-2xl font-bold text-center my-6">
        Opciones
      </h2>
      <div>
        <div className="flex gap-2">
          {numOfPlayers.map((i) => {
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
                  {i} {i === 1 ? "Jugador" : "Jugadores"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <p className="text-white my-6 text-center">Dificultad</p>

        <div className="grid grid-cols-3 gap-2">
          {DIFFICULTY_LEVELS.map((d) => (
            <DiffilcultyPicker
              key={d.difficulty}
              difficulty={difficulty}
              handleDifficulty={setDifficulty}
              image={d.image}
              text={d.text}
              level={d.difficulty}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="text-white text-center my-6">Entrenadores</p>
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
        <p className="text-white text-center my-6">Puntaje</p>

        <div className="flex flex-wrap gap-3 border border-color-cyan p-4 rounded-md justify-around">
          {players?.every((player) => player.name.length > 0) &&
            players?.map((p, i) => (
              <div key={i} className="flex flex-col gap-1 text-center">
                <p className="text-color-cyan font-bold text-xl">{p.score}</p>
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
          Jugar
        </button>
      </div>
    </div>
  );
};
