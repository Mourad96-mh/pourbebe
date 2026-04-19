import styles from './Badge.module.css'

export default function Badge({ children, variant = 'new' }) {
  return (
    <span className={`${styles.badge} ${styles[variant]}`}>
      {children}
    </span>
  )
}
