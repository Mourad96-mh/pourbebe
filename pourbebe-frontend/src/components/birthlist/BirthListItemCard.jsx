import { Link } from 'react-router-dom'
import { formatPrice } from '../../lib/utils'
import Button from '../ui/Button'
import styles from './BirthListItemCard.module.css'

export default function BirthListItemCard({ item, isGuestView, onOffer, isPending }) {
  const { product, quantity = 1, reserved, purchased } = item

  return (
    <article className={styles.card}>
      <Link to={`/produit/${product.slug}`} className={styles.imageWrapper}>
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className={`${styles.image} ${purchased ? styles.imageDimmed : ''}`}
            width={300}
            height={300}
            loading="lazy"
          />
        ) : (
          <div className={styles.imagePlaceholder} />
        )}
        {quantity > 1 && <span className={styles.qty}>×{quantity}</span>}
        {purchased && (
          <div className={styles.purchasedOverlay}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Offert</span>
          </div>
        )}
      </Link>

      <div className={styles.info}>
        <p className={styles.brand}>{product.brand}</p>
        <h3 className={styles.name}>
          <Link to={`/produit/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className={styles.price}>{formatPrice(product.price)}</p>

        <div className={styles.action}>
          {purchased ? (
            <span className={styles.statusPurchased}>Déjà offert</span>
          ) : reserved ? (
            <span className={styles.statusReserved}>Réservé</span>
          ) : isGuestView ? (
            <Button variant="primary" size="sm" disabled={isPending} onClick={() => onOffer(item)}>
              {isPending ? 'Réservation…' : 'Offrir ce cadeau'}
            </Button>
          ) : (
            <span className={styles.statusAvailable}>Disponible</span>
          )}
        </div>
      </div>
    </article>
  )
}
