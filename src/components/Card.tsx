import { useState } from 'react'
import styles from './Card.module.css'
import { Variants, motion } from 'framer-motion'

interface Props {
  children: React.JSX.Element | React.JSX.Element[]
  clickHandler?: () => void
}

export function Card({ children, clickHandler }: Props) {
  const variants: Variants = {
    hidden: {
      x: -20,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
    },
  }

  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onClick={clickHandler}
      whileTap={{ scale: 0.9 }}
      className={styles.container}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      variants={variants}
    >
      <motion.div className={styles['front-card']}>
        <motion.div
          initial={{ x: -100, skewX: '30deg' }}
          animate={hovered ? { x: 180 } : { x: -100 }}
          className={styles.shine}
          transition={{
            duration: 0.2,
          }}
        ></motion.div>
      </motion.div>
      <div className={styles['back-card']}></div>
      {children}
    </motion.div>
  )
}
