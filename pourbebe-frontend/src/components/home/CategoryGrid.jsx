import { Link } from 'react-router-dom'
import styles from './CategoryGrid.module.css'

const CATEGORIES = [
  {
    slug: 'chambre',
    label: 'Chambre bébé',
    sub: 'Lits, couffins, baby nests, commodes',
    image: 'https://gobebe.ma/wp-content/uploads/2026/01/berceau-cododo-2en1-gris-pratique-et-confortable-bebe-confort-maroc-210x210.webp',
  },
  {
    slug: 'accessoires',
    label: 'Accessoires',
    sub: 'Sacs à langer, coussins, articles bébé',
    image: 'https://gobebe.ma/wp-content/uploads/2026/03/sac-a-langer-bowling-gris-epacieux-badabulle-maroc-210x210.webp',
  },
  {
    slug: 'vetements',
    label: 'Vêtements',
    sub: 'Grenouillères, bodies, coffrets naissance',
    image: 'https://gobebe.ma/wp-content/uploads/2025/09/pack-de-naissance-5-pieces-avec-broderie-pour-fille-cayzen-210x210.webp',
  },
]

export default function CategoryGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.tag}>Nos univers</p>
        <h2 className={styles.title}>Explorer <em>par catégorie</em></h2>

        <div className={styles.grid}>
          {CATEGORIES.map((cat) => (
            <Link key={cat.slug} to={`/categorie/${cat.slug}`} className={styles.card}>
              <div className={styles.imageWrap}>
                <img
                  src={cat.image}
                  alt={cat.label}
                  width={210}
                  height={210}
                  loading="lazy"
                  className={styles.image}
                />
              </div>
              <div className={styles.body}>
                <span className={styles.label}>{cat.label}</span>
                <span className={styles.sub}>{cat.sub}</span>
                <span className={styles.viewLink}>
                  Voir la sélection
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
