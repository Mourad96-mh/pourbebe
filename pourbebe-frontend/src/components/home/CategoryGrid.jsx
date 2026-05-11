import { Link } from 'react-router-dom'
import styles from './CategoryGrid.module.css'

const BANNERS = [
  {
    href: '/categorie/chambre?isNew=true',
    tag: 'Nouveautés',
    title: 'Des Nouveautés en continu',
    image: '/nouveautes.webp',
    showCta: true,
  },
  {
    href: '/categorie/chambre',
    tag: 'Chambres enfants',
    title: 'On partage avec vous nos réalisations Made with Love',
    image: '/chambre-enfant.jpg',
    showCta: false,
  },
]

export default function CategoryGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {BANNERS.map((b) => (
            <Link
              key={b.tag}
              to={b.href}
              className={styles.banner}
              style={{ backgroundImage: `url(${b.image})` }}
            >
              <div className={styles.overlay}>
                <span className={styles.bannerTag}>{b.tag}</span>
                <h3 className={styles.bannerTitle}>{b.title}</h3>
                {b.showCta && (
                  <span className={styles.bannerCta}>
                    Découvrir
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
