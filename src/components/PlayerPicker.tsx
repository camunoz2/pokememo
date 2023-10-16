import { useGameContext } from "../context";
import { Player } from "../customTypes";

interface Props {
  player: Player;
  selectNumberOfPlayers: (qty: number) => void;
}

export function PlayerPicker({ player, selectNumberOfPlayers }: Props) {
  const { gameContext } = useGameContext();

  return (
    <button
      onClick={() => selectNumberOfPlayers(player.label)}
      className={`${
        gameContext.numberOfPlayers === player.label ? "bg-teal-500" : "bg-auto"
      } border p-4 hover:border-color-cyan rounded-md flex flex-col gap-1 justify-between items-center text-white cursor-pointer transition-all `}
      key={player.label}
    >
      <p className="text-sm text-black">{player.label}</p>
    </button>
  );
}
