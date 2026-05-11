import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from '../../hooks/useProducts'
import { getDiscountPercent } from '../../lib/utils'
import ProductCard from '../product/ProductCard'
import Spinner from '../ui/Spinner'
import styles from './FeaturedProducts.module.css'

const SLIDE_SIZE = 4
const INTERVAL   = 5000

function assignBadges(products) {
  let saleUsed = false
  let newUsed  = false
  return products.map((p) => {
    const discount = getDiscountPercent(p.price, p.compareAt)
    let badge = null
    if (discount && !saleUsed)           { badge = 'sale'; saleUsed = true }
    else if (p.isNewArrival && !newUsed) { badge = 'new';  newUsed  = true }
    return { product: p, badge }
  })
}

export default function FeaturedProducts() {
  const { data, isLoading } = useProducts({ sort: 'newest', page: 1 })
  const [current, setCurrent] = useState(0)

  const entries = assignBadges(data?.products ?? [])

  const slides = []
  for (let i = 0; i < entries.length; i += SLIDE_SIZE) {
    slides.push(entries.slice(i, i + SLIDE_SIZE))
  }

  const total = slides.length

  useEffect(() => {
    if (total <= 1) return
    const timer = setInterval(() => setCurrent((c) => (c + 1) % total), INTERVAL)
    return () => clearInterval(timer)
  }, [total])

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Vos Coups de{' '}
            <svg className={styles.heartIcon} width="28" height="28" viewBox="0 0 24 24" fill="var(--red)" stroke="none" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>{' '}
            du moment
          </h2>
          <p className={styles.sub}>Découvrez les produits préférés de nos clients, testés et approuvés.</p>
        </div>

        {isLoading ? (
          <Spinner />
        ) : (
          <div className={styles.carousel}>
            <div className={styles.track} style={{ transform: `translateX(-${current * 100}%)` }}>
              {slides.map((slide, i) => (
                <div key={i} className={styles.slide}>
                  {slide.map(({ product, badge }) => (
                    <ProductCard key={product.id} product={product} badge={badge} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.footer}>
          <div className={styles.dots} aria-label="Navigation carousel">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot}${i === current ? ` ${styles.dotActive}` : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
          <Link to="/categorie/chambre" className={styles.allBtn}>
            Tous les produits
          </Link>
        </div>
      </div>
    </section>
  )
}
