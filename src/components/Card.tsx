import { useState } from "react";
import styles from "./Card.module.css";
import { Variants, motion } from "framer-motion";

interface Props {
  variant: Variants;
  image?: string;
}

export function Card({ variant }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      variants={variant}
      className={styles.container}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.div className={styles["front-card"]}>
        <motion.div
          initial={{ x: -100, skewX: "30deg" }}
          animate={hovered ? { x: 180 } : { x: -100 }}
          className={styles.shine}
          transition={{
            duration: 0.2,
          }}
        ></motion.div>
      </motion.div>
      <div className={styles["back-card"]}></div>
      <p className={styles.content}>Content</p>
    </motion.div>
  );
}
