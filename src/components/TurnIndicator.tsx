import type { Player } from "../customTypes";

interface Props {
  players: Player[] | undefined;
  currentPlayerTurn: number;
}

export const TurnIndicator = ({ players, currentPlayerTurn }: Props) => {
  return (
    <div className="bg-color-darkblue p-3 text-xl rounded-md text-white text-center font-bold absolute bottom-10 left-1/2 -translate-x-1/2">
      It's{" "}
      <span className="text-color-cyan font-bold">
        {players ? players[currentPlayerTurn - 1].name : ""}
      </span>{" "}
      turn.
    </div>
  );
};
