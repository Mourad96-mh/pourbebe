import { Link } from 'react-router-dom'
import Badge from '../ui/Badge'
import { formatPrice, getDiscountPercent } from '../../lib/utils'
import useWishlist from '../../hooks/useWishlist'
import useCart from '../../hooks/useCart'
import styles from './ProductCard.module.css'

export default function ProductCard({ product, badge }) {
  const toggle       = useWishlist((s) => s.toggle)
  const isWishlisted = useWishlist((s) => s.has(product.id))
  const addItem      = useCart((s) => s.addItem)
  const openCart     = useCart((s) => s.openCart)
  const discount     = getDiscountPercent(product.price, product.compareAt)

  const whatsappUrl = `https://wa.me/212667322850?text=${encodeURIComponent(`Bonjour, je souhaite commander : ${product.name}`)}`

  function handleAddToCart(e) {
    e.preventDefault()
    addItem(product)
    openCart()
  }

  function handleWishlist(e) {
    e.preventDefault()
    toggle(product)
  }

  return (
    <article className={styles.card}>
      <Link to={`/produit/${product.slug}`} className={styles.imageWrapper}>
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className={styles.image}
            width={400}
            height={400}
            loading="lazy"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />
        ) : (
          <div className={styles.imagePlaceholder} />
        )}

        <div className={styles.badges}>
          {badge === 'outOfStock' && <Badge variant="outOfStock">Épuisé</Badge>}
          {badge === 'sale'       && discount && <Badge variant="sale">-{discount}%</Badge>}
          {badge === 'new'        && <Badge variant="new">Nouveau</Badge>}
        </div>

        <button
          className={`${styles.wishlistBtn} ${isWishlisted ? styles.wishlisted : ''}`}
          onClick={handleWishlist}
          aria-label={isWishlisted ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

      </Link>

      <div className={styles.info}>
        <p className={styles.brand}>{product.brand}</p>
        <h3 className={styles.name}>
          <Link to={`/produit/${product.slug}`}>{product.name}</Link>
        </h3>
        <div className={styles.prices}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
          {product.compareAt && (
            <span className={styles.compareAt}>{formatPrice(product.compareAt)}</span>
          )}
        </div>

        <Link to={`/produit/${product.slug}`} className={styles.discoverBtn}>
          Découvrir
        </Link>

      </div>
    </article>
  )
}
