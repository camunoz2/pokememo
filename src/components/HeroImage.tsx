import { motion } from "framer-motion";
import styles from "./HeroImage.module.css";

export function HeroImage() {
  return (
    <motion.img
      className={styles.image}
      initial={{ y: 300 }}
      animate={{ y: 0 }}
      transition={{
        delay: 1.5,
      }}
      src="/chari.png"
      alt=""
    />
  );
}
