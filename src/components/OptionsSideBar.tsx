import { DiffilcultyPicker } from "./DifficultyPicker";

export const OptionsSideBar = () => {
  const numOfPlayers = [1, 2, 3, 4];

  return (
    <aside className="bg-color-darkblue rounded-md px-4 py-8 flex flex-col gap-2 justify-around">
      <h2 className="text-white text-2xl font-bold text-center my-6">
        Opciones
      </h2>
      <div>
        <div className="flex gap-2">
          {numOfPlayers.map((i) => {
            return (
              <div
                className="border p-4 hover:border-color-cyan rounded-md flex flex-col gap-1 justify-between items-center text-white"
                key={i}
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
          {[{ difficulty: "Easy" }].map((d) => (
            <DiffilcultyPicker key={d.difficulty} />
          ))}
        </div>
      </div>

      <div>
        <p className="text-white text-center my-6">Entrenadores</p>
        <div className="grid grid-cols-2 gap-1">
          {["s"].map((player, index) => {
            return (
              <div key={index} className="relative">
                <input
                  key={index}
                  id="player"
                  className="bg-color-lightblue w-full pt-4 pb-1 px-2 rounded-md border text-white focus:outline-color-cyan"
                />
                <label
                  htmlFor="player"
                  className="absolute top-1 left-1 text-xs text-color-cyan"
                >
                  Player
                </label>
              </div>
            );
          })}
        </div>
        <p className="text-white text-center my-6">Puntaje</p>

        <div className="flex flex-wrap gap-3 border border-color-cyan p-4 rounded-md justify-around">
          {[{ name: "sd" }].every((player) => player.name.length > 0) &&
            [{ name: "sd", score: 1 }].map((p, i) => (
              <div key={i} className="flex flex-col gap-1 text-center">
                <p className="text-color-cyan font-bold text-xl">{p.score}</p>
                <p className="text-xl text-white">{p.name}</p>
              </div>
            ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button className="text-xl text-white w-full bg-color-purple border border-color-cyan px-6 py-3 rounded-md shadow">
          Jugar
        </button>
      </div>
    </aside>
  );
};
