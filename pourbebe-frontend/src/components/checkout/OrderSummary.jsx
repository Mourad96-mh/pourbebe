import useCart, { cartTotal as cartTotalSelector } from '../../hooks/useCart'
import { formatPrice } from '../../lib/utils'
import { getShipping } from './CheckoutForm'
import styles from './OrderSummary.module.css'

export default function OrderSummary({ city }) {
  const items    = useCart((s) => s.items)
  const subtotal = useCart(cartTotalSelector)
  const shipping = getShipping(city)
  const grandTotal = subtotal + shipping

  return (
    <aside className={styles.summary}>
      <h2 className={styles.title}>Récapitulatif</h2>

      <ul className={styles.items}>
        {items.map((item) => (
          <li key={item.key} className={styles.item}>
            <span className={styles.itemName}>
              {item.product.name}
              <span className={styles.qty}> ×{item.quantity}</span>
            </span>
            <span>{formatPrice(item.product.price * item.quantity)}</span>
          </li>
        ))}
      </ul>

      <div className={styles.row}>
        <span>Sous-total</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <div className={styles.row}>
        <span>Livraison</span>
        <span>
          {city
            ? formatPrice(shipping)
            : <span className={styles.pending}>À préciser</span>}
        </span>
      </div>

      <div className={styles.total}>
        <span>Total</span>
        <span>{formatPrice(grandTotal)}</span>
      </div>

      {!city && (
        <p className={styles.shippingNote}>
          Frais de livraison : 30 DH Casablanca · 50 DH reste du Maroc
        </p>
      )}
    </aside>
  )
}
