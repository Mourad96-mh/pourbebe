import { Link } from 'react-router-dom'
import { formatPrice } from '../../lib/utils'
import useCart from '../../hooks/useCart'
import styles from './CartItem.module.css'

export default function CartItem({ item }) {
  const updateQuantity = useCart((s) => s.updateQuantity)
  const removeItem     = useCart((s) => s.removeItem)
  const { product, variant, quantity, key } = item

  return (
    <div className={styles.item}>
      <Link to={`/produit/${product.slug}`} className={styles.imageLink}>
        {product.images?.[0] ? (
          <img src={product.images[0]} alt={product.name} className={styles.image} width={80} height={80} />
        ) : (
          <div className={styles.imagePlaceholder} />
        )}
      </Link>

      <div className={styles.details}>
        <div className={styles.top}>
          <div>
            <p className={styles.brand}>{product.brand}</p>
            <Link to={`/produit/${product.slug}`} className={styles.name}>{product.name}</Link>
            {variant && <p className={styles.variant}>{variant.name}</p>}
          </div>
          <button className={styles.remove} onClick={() => removeItem(key)} aria-label="Supprimer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className={styles.bottom}>
          <div className={styles.qty}>
            <button className={styles.qtyBtn} onClick={() => updateQuantity(key, quantity - 1)}>−</button>
            <span className={styles.qtyValue}>{quantity}</span>
            <button className={styles.qtyBtn} onClick={() => updateQuantity(key, quantity + 1)}>+</button>
          </div>
          <span className={styles.price}>{formatPrice(product.price * quantity)}</span>
        </div>
      </div>
    </div>
  )
}
