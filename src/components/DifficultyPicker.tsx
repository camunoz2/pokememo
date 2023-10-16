import { Difficulty } from "../customTypes";

interface Props {
  difficulty: Difficulty;
  selectDifficulty: () => void;
}

export function DiffilcultyPicker({ difficulty }: Props) {
  return (
    <div className="bg-color-lightblue flex flex-col p-1 rounded-md items-center cursor-pointer transition-all">
      <img
        src={difficulty.icon}
        className="aspect-square"
        alt={difficulty.label}
      />
      <p className="text-xl text-color-cyan">{difficulty.label}</p>
    </div>
  );
}
