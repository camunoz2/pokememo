import { type Player } from '../customTypes'

interface Props {
  player: Player
  selectNumberOfPlayers: () => void
  numberOfPlayers: number
}

export function PlayerPicker({ player, selectNumberOfPlayers, numberOfPlayers }: Props): JSX.Element {
  return (
    <button
      onClick={selectNumberOfPlayers}
      className={`${
        numberOfPlayers === player.label ? 'bg-teal-500' : 'bg-auto'
      } border p-4 hover:border-color-cyan rounded-md flex flex-col gap-1 justify-between items-center text-white cursor-pointer transition-all `}
      key={player.label}
    >
      <p className="text-sm text-black">{player.label}</p>
    </button>
  )
}
