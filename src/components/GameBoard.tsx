interface Props {
  children: React.ReactNode;
}

export function GameBoard({ children }: Props) {
  return (
    <div className="flex flex-wrap justify-around rounded-md gap-4 p-4 w-full">
      {children}
    </div>
  );
}
