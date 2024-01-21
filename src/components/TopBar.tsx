import styles from './TopBar.module.css'
import { Variants, motion } from 'framer-motion'

interface Props {
  text: string
}

export function TopBar({ text }: Props) {
  const variant: Variants = {
    hidden: {
      opacity: 0,
      x: -20,
    },

    visible: {
      opacity: 1,
      x: 0,
    },
  }

  return (
    <>
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ease: 'anticipate' }}
        className={styles.topbar}
      >
        <motion.img src="/topbar.svg" alt="" />
      </motion.div>
      <motion.div
        variants={variant}
        initial={'hidden'}
        animate={'visible'}
        transition={{
          staggerChildren: 0.2,
        }}
        className={styles.title}
      >
        <motion.img
          variants={variant}
          src="/icon.svg"
          alt=""
          initial={{ rotateZ: 0 }}
          animate={{ rotateZ: 360 }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: 'linear',
          }}
        />
        <motion.h2 variants={variant}>{text}</motion.h2>
      </motion.div>
    </>
  )
}
