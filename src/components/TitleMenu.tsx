import styles from './TitleMenu.module.css'

interface Props {
  text: string
}

export function TitleMenu({ text }: Props) {
  return (
    <div className={styles.enter}>
      <p>{text}</p>
    </div>
  )
}
