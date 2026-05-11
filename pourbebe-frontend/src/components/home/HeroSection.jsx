import { Link } from 'react-router-dom'
import styles from './HeroSection.module.css'

export default function HeroSection() {
  return (
    <section className={styles.hero}>

      {/* ── Full-bleed image ── */}
      <img
        src="/hero-img.jpeg"
        alt="Bébé souriant"
        className={styles.heroImg}
        loading="eager"
        width={1440}
        height={700}
      />

      {/* ── Pink gradient overlay ── */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* ── Content ── */}
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.tag}>Nouvelle collection 2025</p>
          <h1 className={styles.headline}>
            Tendresse et Douceur<br />
            <em>pour Bébé</em>
          </h1>
          <p className={styles.sub}>
            Découvrez la qualité exceptionnelle de nos produits pour des moments de câlins inoubliables.
          </p>
          <Link to="/categorie/chambre" className={styles.cta}>
            Découvrez maintenant
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* ── Slide dots ── */}
      <div className={styles.dots} aria-hidden="true">
        <span className={`${styles.dot} ${styles.dotActive}`} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>

    </section>
  )
}
