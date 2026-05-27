import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useBanners } from '../../hooks/useBanners'
import styles from './HeroSection.module.css'

const FALLBACK = [
  {
    _id:     'fallback-1',
    image:   '/hero-img.jpeg',
    tag:     'Nouvelle collection 2025',
    title:   'Tendresse et Douceur pour Bébé',
    subtitle:'Découvrez la qualité exceptionnelle de nos produits pour des moments de câlins inoubliables.',
    ctaText: 'Découvrir',
    ctaLink: '/categorie/chambre',
    showCta: true,
  },
]

export default function HeroSection() {
  const { data: fetched = [] } = useBanners('hero')
  const slides = fetched.length > 0 ? fetched : FALLBACK
  const [active, setActive] = useState(0)

  const next = useCallback(() => setActive((a) => (a + 1) % slides.length), [slides.length])
  const prev = useCallback(() => setActive((a) => (a - 1 + slides.length) % slides.length), [slides.length])

  useEffect(() => { setActive(0) }, [slides.length])

  useEffect(() => {
    if (slides.length <= 1) return
    const id = setInterval(next, 5000)
    return () => clearInterval(id)
  }, [next, slides.length])

  const slide = slides[active] ?? slides[0]

  return (
    <section className={styles.hero}>

      {/* ── Background images ── */}
      {slides.map((s, i) => (
        <img
          key={s._id ?? i}
          src={s.image}
          alt=""
          aria-hidden="true"
          className={`${styles.heroImg} ${i === active ? styles.heroImgActive : ''}`}
          loading={i === 0 ? 'eager' : 'lazy'}
          width={1440}
          height={700}
        />
      ))}

      {/* ── Full-banner link (entire area clickable) ── */}
      {slide.ctaLink && (
        <Link
          to={slide.ctaLink}
          className={styles.heroLink}
          aria-label={slide.title || 'Voir la collection'}
          tabIndex={-1}
        />
      )}

      {/* ── Content ── */}
      <div className={styles.inner}>
        <div className={styles.content}>
          {slide.tag && <p className={styles.tag}>{slide.tag}</p>}
          {slide.title && <h1 className={styles.headline}>{slide.title}</h1>}
          {slide.subtitle && <p className={styles.sub}>{slide.subtitle}</p>}
          {slide.showCta !== false && slide.ctaText && slide.ctaLink && (
            <Link to={slide.ctaLink} className={styles.cta}>
              {slide.ctaText}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      {/* ── Prev / Next arrows ── */}
      {slides.length > 1 && (
        <>
          <button className={`${styles.arrow} ${styles.arrowPrev}`} onClick={prev} aria-label="Diapositive précédente">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className={`${styles.arrow} ${styles.arrowNext}`} onClick={next} aria-label="Diapositive suivante">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </>
      )}

    </section>
  )
}
