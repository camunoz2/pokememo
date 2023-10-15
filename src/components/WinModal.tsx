interface Props {
  message: string;
  resetGame: () => void;
}

const WinModal = ({ message, resetGame }: Props) => {
  return (
    <div className="bg-slate-300/90  absolute top-0 left-0 w-full h-full z-40 flex items-center justify-center">
      <div className="bg-white p-10 rounded-md border border-color-cyan flex flex-col">
        <p className="text-2xl mb-2">{message}</p>
        <button
          onClick={() => resetGame()}
          className="bg-color-cyan p-4 rounded-md shadow"
        >
          Ok!
        </button>
      </div>
    </div>
  );
};

export default WinModal;
