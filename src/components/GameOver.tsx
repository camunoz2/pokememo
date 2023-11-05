import { useGameContext } from '../context'

export function GameOver(): JSX.Element {
  const { setGameContext, gameContext } = useGameContext()

  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
      <div className="bg-color-darkblue rounded-md p-12 flex flex-col gap-4">
        <h2>Game Over!</h2>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setGameContext({ ...gameContext, gameState: 'SETUP' })
            }}
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  )
}
