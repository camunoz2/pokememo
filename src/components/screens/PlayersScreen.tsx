import { Card } from "../Card";
import { TitleMenu } from "../TitleMenu";
import { TopBar } from "../TopBar";
import styles from "./PlayersScreen.module.css";
import { Variants, motion } from "framer-motion";

export function PlayersScreen() {
  const variant: Variants = {
    hidden: {
      x: -20,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
    },
  };

  return (
    <div className={styles.container}>
      <TopBar />
      <TitleMenu />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variant}
        transition={{
          staggerChildren: 0.1,
        }}
        className={styles["card-container"]}
      >
        <Card variant={variant} />
        <Card variant={variant} />
        <Card variant={variant} />
      </motion.div>
    </div>
  );
}
