import { PokemonCard } from "../customTypes";
import styles from "./PokeCard.module.css";

interface Props {
  name: string;
  image: string;
  cardSelector: (card: PokemonCard) => void;
  flipped: boolean;
  card: PokemonCard;
}

const PokeCard = ({ name, image, cardSelector, flipped, card }: Props) => {
  const handleClick = () => {
    cardSelector(card);
  };

  return (
    <div className={styles.container}>
      <div
        onClick={handleClick}
        className={`${styles.back} ${
          flipped ? styles.facedown : styles.faceup
        }`}
      />

      <div
        className={`${styles.front} ${
          flipped ? styles.faceup : styles.facedown
        }`}
      >
        <p>{name}</p>
        <img src={image} />
      </div>
    </div>
  );
};

export default PokeCard;
