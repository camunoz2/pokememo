import { Variants, motion } from "framer-motion";
import { CustomChar } from "../App";
import styles from "./SingleCharacter.module.css";

interface Props {
  character: CustomChar;
  framerVariant: Variants;
}

export function SingleCharacter({ character, framerVariant }: Props) {
  return (
    <motion.text
      variants={framerVariant}
      style={{ zIndex: character.zIndex }}
      className={styles.char}
      y={character.yPos}
      x={character.xPos}
    >
      {character.char}
    </motion.text>
  );
}
