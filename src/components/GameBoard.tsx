interface Props {
  children: React.ReactNode
}

export function GameBoard({ children }: Props): JSX.Element {
  return <div className="grid grid-cols-4 gap-4 p-4 w-full">{children}</div>
}
