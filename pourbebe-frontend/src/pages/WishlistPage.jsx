import { Link } from 'react-router-dom'
import useWishlist from '../hooks/useWishlist'
import ProductCard from '../components/product/ProductCard'
import SEO from '../components/ui/SEO'
import styles from './WishlistPage.module.css'

export default function WishlistPage() {
  const items = useWishlist((s) => s.items)
  const clear = useWishlist((s) => s.clear)

  return (
    <div className={styles.page}>
      <SEO title="Mes Favoris" noindex />

      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Mes <em>Favoris</em></h1>
            {items.length > 0 && (
              <p className={styles.count}>{items.length} article{items.length > 1 ? 's' : ''} sauvegardé{items.length > 1 ? 's' : ''}</p>
            )}
          </div>
          {items.length > 0 && (
            <button className={styles.clearBtn} onClick={clear}>
              Tout effacer
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={styles.emptyIcon}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <p className={styles.emptyTitle}>Votre liste de favoris est vide</p>
            <p className={styles.emptySub}>Cliquez sur le cœur d'un produit pour l'ajouter à vos favoris.</p>
            <Link to="/" className={styles.shopBtn}>Découvrir nos produits</Link>
          </div>
        ) : (
          <div className={styles.grid}>
            {items.map((product) => (
              <ProductCard
                key={product.id ?? product._id}
                product={product}
                badge={product.compareAt ? 'sale' : product.isNewArrival ? 'new' : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
