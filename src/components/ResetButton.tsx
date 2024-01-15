import { useGameContext } from '../context'

interface Props {
  text: string
}

export const ResetButton = ({ text }: Props) => {
  const { gameContext, setGameOptions: setGameContext } = useGameContext()

  return (
    <button
      className="px-6 py-2 rounded shadow text-green-900 text-center bg-green-400"
      onClick={() => {
        setGameContext({ ...gameContext, gameState: 'SETUP' })
      }}
    >
      {text}
    </button>
  )
}
