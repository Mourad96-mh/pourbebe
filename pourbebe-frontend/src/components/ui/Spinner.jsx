import styles from './Spinner.module.css'

export default function Spinner({ size = 'md', centered = true }) {
  const el = <span className={`${styles.spinner} ${styles[size]}`} role="status" aria-label="Chargement" />
  if (!centered) return el
  return <div className={styles.center}>{el}</div>
}
