import styles from './AnnouncementBar.module.css'

export default function AnnouncementBar() {
  return (
    <div className={styles.bar}>
      <p className={styles.message}>
        Livraison gratuite dès 400 DH &nbsp;·&nbsp; Paiement sécurisé &nbsp;·&nbsp; Livraison partout au Maroc
      </p>
    </div>
  )
}
