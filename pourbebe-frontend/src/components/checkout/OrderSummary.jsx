import useCart, { cartTotal as cartTotalSelector } from '../../hooks/useCart'
import { formatPrice } from '../../lib/utils'
import styles from './OrderSummary.module.css'

const SHIPPING_COST = 40
const FREE_SHIPPING = 400

export default function OrderSummary() {
  const items   = useCart((s) => s.items)
  const total   = useCart(cartTotalSelector)
  const isFree  = total >= FREE_SHIPPING
  const shipping = isFree ? 0 : SHIPPING_COST
  const grandTotal = total + shipping

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
        <span>{formatPrice(total)}</span>
      </div>
      <div className={styles.row}>
        <span>Livraison</span>
        <span className={isFree ? styles.free : ''}>{isFree ? 'Gratuite' : formatPrice(SHIPPING_COST)}</span>
      </div>

      <div className={styles.total}>
        <span>Total</span>
        <span>{formatPrice(grandTotal)}</span>
      </div>
    </aside>
  )
}
