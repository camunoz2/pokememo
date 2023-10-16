interface Props {
  text: string;
  image: string;
}

export function DiffilcultyPicker({ text, image }: Props) {
  return (
    <div className="bg-color-lightblue flex flex-col p-1 rounded-md items-center cursor-pointer transition-all">
      <img src={image} className="aspect-square" alt={text} />
      <p className="text-xl text-color-cyan">{text}</p>
    </div>
  );
}
