import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import styles from './BirthListBanner.module.css'

export default function BirthListBanner() {
  return (
    <section className={styles.banner}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.tag}>Pour les futurs parents</p>
          <h2 className={styles.title}>
            Créez votre <em>liste de naissance</em>
          </h2>
          <p className={styles.desc}>
            Partagez votre liste avec vos proches et laissez-les choisir le cadeau parfait. Simple, élégant et entièrement gratuit.
          </p>
          <Link to="/liste-naissance">
            <Button variant="dark" size="lg">Créer ma liste</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
