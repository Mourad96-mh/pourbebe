import { Link } from 'react-router-dom'
import Badge from '../ui/Badge'
import { formatPrice, getDiscountPercent } from '../../lib/utils'
import useWishlist from '../../hooks/useWishlist'
import useCart from '../../hooks/useCart'
import { useAuth } from '../../hooks/useAuth'
import { useMyBirthList } from '../../hooks/useMyBirthList'
import styles from './ProductCard.module.css'

export default function ProductCard({ product, badge }) {
  const toggle       = useWishlist((s) => s.toggle)
  const isWishlisted = useWishlist((s) => s.has(product.id))
  const addItem      = useCart((s) => s.addItem)
  const openCart     = useCart((s) => s.openCart)
  const discount     = getDiscountPercent(product.price, product.compareAt)

  const { user }                         = useAuth()
  const { list, addProduct, isInList }   = useMyBirthList()
  const showListBtn                      = !!user && !!list
  const alreadyInList                    = showListBtn && isInList(product.id)

  const whatsappUrl = `https://wa.me/212696716187?text=${encodeURIComponent(`Bonjour, je souhaite commander : ${product.name}`)}`

  function handleAddToCart(e) {
    e.preventDefault()
    addItem(product)
    openCart()
  }

  function handleWishlist(e) {
    e.preventDefault()
    toggle(product)
  }

  function handleAddToList(e) {
    e.preventDefault()
    addProduct.mutate(product.id)
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

        {showListBtn && (
          <div className={styles.listRow}>
            {alreadyInList ? (
              <span className={styles.inListBadge}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Dans ma liste
              </span>
            ) : (
              <button
                className={styles.addToListBtn}
                onClick={handleAddToList}
                disabled={addProduct.isPending}
                aria-label="Ajouter à ma liste de naissance"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Liste de naissance
              </button>
            )}
          </div>
        )}

      </div>
    </article>
  )
}
