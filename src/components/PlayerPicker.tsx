import { Player } from "../customTypes";

interface Props {
  player: Player;
}

export default function PlayerPicker({ player }: Props) {
  return (
    <div
      className="border p-4 hover:border-color-cyan rounded-md flex flex-col gap-1 justify-between items-center text-white cursor-pointer"
      key={player.label}
    >
      <p className="text-sm text-white">{player.label}</p>
    </div>
  );
}
