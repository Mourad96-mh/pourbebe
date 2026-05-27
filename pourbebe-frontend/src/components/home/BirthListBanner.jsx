import { Link } from 'react-router-dom'
import { useBanners } from '../../hooks/useBanners'
import Button from '../ui/Button'
import styles from './BirthListBanner.module.css'

const FALLBACK = {
  tag:      'Pour les futurs parents',
  title:    'Créez votre liste de naissance',
  subtitle: 'Partagez votre liste avec vos proches et laissez-les choisir le cadeau parfait. Simple, élégant et entièrement gratuit.',
  ctaText:  'Créer ma liste',
  ctaLink:  '/liste-naissance',
  showCta:  true,
}

export default function BirthListBanner() {
  const { data: banners = [] } = useBanners('birthlist')
  const b = banners[0] ?? FALLBACK

  const bgStyle = b.image ? { backgroundImage: `url(${b.image})` } : undefined

  return (
    <section className={styles.banner} style={bgStyle}>
      <div className={styles.inner}>
        <div className={styles.content}>
          {b.tag && <p className={styles.tag}>{b.tag}</p>}
          <h2 className={styles.title}>{b.title}</h2>
          {b.subtitle && <p className={styles.desc}>{b.subtitle}</p>}
          {b.showCta !== false && (
            <Link to={b.ctaLink ?? '/liste-naissance'}>
              <Button variant="dark" size="lg">{b.ctaText || 'Créer ma liste'}</Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
