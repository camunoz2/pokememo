import { Player } from "../customTypes";

interface Props {
  player: Player;
  selectNumberOfPlayers: (qty: number) => void;
}

export function PlayerPicker({ player, selectNumberOfPlayers }: Props) {
  return (
    <button
      onClick={() => selectNumberOfPlayers(player.label)}
      className="border p-4 hover:border-color-cyan rounded-md flex flex-col gap-1 justify-between items-center text-white cursor-pointer"
      key={player.label}
    >
      <p className="text-sm text-white">{player.label}</p>
    </button>
  );
}
