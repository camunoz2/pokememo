import { Difficulty } from "../customTypes";

interface Props {
  difficulty: Difficulty;
  selectDifficulty: (difficulty: Difficulty) => void;
}

export function DiffilcultyPicker({ difficulty, selectDifficulty }: Props) {
  return (
    <button
      onClick={() => selectDifficulty(difficulty)}
      className="bg-color-lightblue flex flex-col p-1 rounded-md items-center cursor-pointer transition-all"
    >
      <img
        src={difficulty.icon}
        className="aspect-square"
        alt={difficulty.label}
      />
      <p className="text-xl text-color-cyan">{difficulty.label}</p>
    </button>
  );
}
