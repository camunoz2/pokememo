import { motion } from 'framer-motion'
import styles from './SubTitle.module.css'

export function SubTitle() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 0],
      }}
      transition={{
        delay: 1,
        ease: 'easeOut',
        repeat: Infinity,
        duration: 1.5,
      }}
      className={styles.enter}
    >
      <p>Presiona Enter</p>
    </motion.div>
  )
}
