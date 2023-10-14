interface Props {
  level: number;
  handleDifficulty: (difficultyLevel: number) => void;
  difficulty?: number;
  image: string;
  text: string;
}

export function DiffilcultyPicker({
  difficulty,
  handleDifficulty,
  level,
  image,
  text,
}: Props) {
  return (
    <div
      onClick={() => handleDifficulty(level)}
      className={`bg-color-lightblue flex flex-col p-1 rounded-md items-center cursor-pointer transition-all ${
        difficulty === level
          ? "border border-color-cyan shadow-color-cyan shadow-md "
          : ""
      }`}
    >
      <img src={image} className="aspect-square" alt="charmander" />
      <p className="text-xl text-color-cyan">{text} </p>
    </div>
  );
}
