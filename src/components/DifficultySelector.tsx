import type { Difficulty } from '../customTypes'

interface Props {
  difficultyOption: Difficulty
  selectDifficulty: () => void
  gameDifficulty: Difficulty
}

export function DifficultySelector({ difficultyOption, selectDifficulty, gameDifficulty }: Props): JSX.Element {
  return (
    <button
      onClick={selectDifficulty}
      className={`${
        gameDifficulty === difficultyOption && 'bg-teal-500'
      } bg-color-lightblue flex flex-col p-1 rounded-md items-center cursor-pointer transition-all`}
    >
      <img src={difficultyOption.icon} className="aspect-square" alt={difficultyOption.label} />
      <p className="text-xl text-color-cyan">{difficultyOption.label}</p>
    </button>
  )
}
