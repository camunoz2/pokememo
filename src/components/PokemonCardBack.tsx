import { Pokemon } from "../customTypes";

interface Props {
  selectCard: () => void;
}

export function PokemonCardBack({ selectCard }: Props) {
  return (
    <div
      onClick={selectCard}
      className="bg-teal-700 flex flex-col items-center justify-center rounded border border-cyan-200 h-[170px] hover:cursor-pointer"
    >
      <p>Text</p>
    </div>
  );
}
