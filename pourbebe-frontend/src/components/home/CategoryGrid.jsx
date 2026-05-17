import { Link } from 'react-router-dom'
import { useBanners } from '../../hooks/useBanners'
import styles from './CategoryGrid.module.css'

const FALLBACK = [
  {
    _id:     'mid-1',
    ctaLink: '/categorie/chambre?isNew=true',
    tag:     'Nouveautés',
    title:   'Des Nouveautés en continu',
    image:   '/nouveautes.webp',
    showCta: true,
  },
  {
    _id:     'mid-2',
    ctaLink: '/categorie/chambre',
    tag:     'Chambres enfants',
    title:   'On partage avec vous nos réalisations Made with Love',
    image:   '/chambre-enfant.jpg',
    showCta: false,
  },
]

export default function CategoryGrid() {
  const { data: fetched = [] } = useBanners('home-mid')
  const banners = fetched.length > 0 ? fetched : FALLBACK

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {banners.map((b) => (
            <Link
              key={b._id}
              to={b.ctaLink ?? '/'}
              className={styles.banner}
              style={{ backgroundImage: `url(${b.image})` }}
            >
              <div className={styles.overlay}>
                {b.tag && <span className={styles.bannerTag}>{b.tag}</span>}
                <h3 className={styles.bannerTitle}>{b.title}</h3>
                {b.showCta && (
                  <span className={styles.bannerCta}>Découvrir</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
