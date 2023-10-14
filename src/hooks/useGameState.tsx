import { useEffect, useState } from "react";
import type { Player } from "../customTypes";

export function useGameState(
  players: Player[] | undefined,
  difficulty: number | undefined
) {
  const [status, setStatus] = useState("");
  const [isPlayable, setIsPlayable] = useState(false);

  useEffect(() => {
    function calculateGameState() {
      // are players selected?
      if (typeof players === "undefined") {
        setStatus("Selecciona la cantidad de personajes");
        setIsPlayable(false);
        return;
      }

      // difficulty selected?
      if (typeof difficulty === "undefined") {
        setStatus("Selecciona una dificultad");
        setIsPlayable(false);
        return;
      }

      // selected players have a name?
      if (players.every((player) => player.name.length < 1)) {
        setStatus("Uno o más jugadores no tienen nombre");
        setIsPlayable(false);
        return;
      }

      setStatus("");
      setIsPlayable(true);
    }

    calculateGameState();
  }, [players, difficulty]);

  return { status, isPlayable };
}
