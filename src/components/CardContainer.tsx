interface Props {
  children: React.ReactNode;
}

const CardContainer = ({ children }: Props) => {
  return (
    <div className="flex flex-wrap justify-around rounded-md gap-4 p-4 max-h-[700px] w-full overflow-scroll overflow-x-hidden customscroll">
      {children}
    </div>
  );
};

export default CardContainer;
