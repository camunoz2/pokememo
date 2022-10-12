import styles from './CardContainer.module.css'

interface Props {
  children: JSX.Element[] | string
}

const CardContainer = ({children}:Props) => {
  return(
    <div className={styles.container}>
      {children}
    </div>
  )
}

export default CardContainer