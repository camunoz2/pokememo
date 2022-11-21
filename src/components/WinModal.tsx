interface Props {
  message: string;
  setWin: React.Dispatch<React.SetStateAction<boolean>>;
}

const WinModal = ({ message, setWin }: Props) => {
  return (
    <div className="bg-slate-300/90  absolute top-0 left-0 w-full h-full z-40 flex items-center justify-center">
      <div className="bg-white p-10 rounded-md border border-color-cyan flex flex-col">
        <p className="text-2xl mb-2">{message}</p>
        <button
          onClick={() => setWin(false)}
          className="bg-color-cyan p-4 rounded-md shadow"
        >
          Ok!
        </button>
      </div>
    </div>
  );
};

export default WinModal;
