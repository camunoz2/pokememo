import { useGameContext } from '../context'

export function GameOver(): JSX.Element {
  const { setGameContext, gameContext, playersState } = useGameContext()

  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
      <div className="bg-color-darkblue rounded-md p-12 flex flex-col gap-4">
        <h2 className="text-center text-3xl font-bold text-white">Partida finalizada!</h2>
        <ul className="flex gap-2">
          {playersState.map((player) => {
            return (
              <li className="flex flex-col gap-2" key={player.label}>
                <h3 className="text-xl font-bold text-white">{player.name}</h3>
                <p className="px-4 py-2 border border-blue-500 shadow-inner text-blue-300 font-mono text-center rounded bg-blue-500">
                  {player.score}
                </p>
              </li>
            )
          })}
        </ul>
        <div className="flex gap-2 items-center justify-center">
          <button
            className="px-6 py-2 rounded shadow text-green-900 text-center bg-green-400"
            onClick={() => {
              setGameContext({ ...gameContext, gameState: 'SETUP' })
            }}
          >
            Jugar de nuevo
          </button>
        </div>
      </div>
    </div>
  )
}
