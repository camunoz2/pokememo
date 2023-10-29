import type { Difficulty } from '../customTypes'
import { DiffilcultyPicker } from './DifficultyPicker'
import { defaultGameOptions, difficultyOptions, defaultPlayersArray } from '../defaultSettings'
import { PlayerPicker } from './PlayerPicker'
import { useGameContext } from '../context'

interface Props {
  fetchPokemons: () => void
}

export const Options = ({ fetchPokemons }: Props): JSX.Element => {
  const { gameContext, setGameContext } = useGameContext()

  function setPlayers(qty: number): void {
    setGameContext({ ...gameContext, numberOfPlayers: qty, players: defaultPlayersArray.slice(0, qty) })
  }

  function setDifficulty(difficulty: Difficulty): void {
    setGameContext({ ...gameContext, gameDifficulty: difficulty })
  }

  function startGame(): void {
    let numbOfPlayers = 0
    if (gameContext.players.length < 1) {
      numbOfPlayers = defaultGameOptions.numberOfPlayers
    } else {
      numbOfPlayers = gameContext.numberOfPlayers
    }
    setGameContext({ ...gameContext, isGameStarted: true, players: defaultPlayersArray.slice(0, numbOfPlayers) })
    fetchPokemons()
  }

  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
      <div className="bg-color-darkblue rounded-md p-12 flex flex-col gap-4">
        <h2 className="text-white text-2xl font-bold text-center uppercase">Opciones</h2>
        <div className="flex flex-col gap-6">
          <p className="text-white text-center">Cantidad de jugadores</p>
          <div className="grid grid-cols-4 flex-wrap gap-2">
            {defaultPlayersArray.map((player) => (
              <PlayerPicker key={player.label} player={player} selectNumberOfPlayers={setPlayers} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <p className="text-white text-center">Dificultad</p>

          <div className="grid grid-cols-3 gap-2">
            {difficultyOptions.map((difficulty) => (
              <DiffilcultyPicker key={difficulty.value} difficulty={difficulty} selectDifficulty={setDifficulty} />
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={startGame}
            className="text-xl text-white w-full bg-color-purple border border-color-cyan px-6 py-3 rounded-md shadow"
          >
            Jugar
          </button>
        </div>
      </div>
    </div>
  )
}
