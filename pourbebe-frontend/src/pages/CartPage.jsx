import { Link } from 'react-router-dom'
import useCart, { cartTotal as cartTotalSelector } from '../hooks/useCart'
import CartItem from '../components/cart/CartItem'
import Button from '../components/ui/Button'
import { formatPrice } from '../lib/utils'
import styles from './CartPage.module.css'

export default function CartPage() {
  const items = useCart((s) => s.items)
  const total = useCart(cartTotalSelector)

  if (!items.length) {
    return (
      <div className={styles.empty}>
        <h1 className={styles.emptyTitle}>Votre panier est vide</h1>
        <Link to="/">
          <Button variant="primary">Continuer les achats</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Mon panier</h1>

        <div className={styles.layout}>
          <div className={styles.items}>
            {items.map((item) => <CartItem key={item.key} item={item} />)}
          </div>

          <aside className={styles.summary}>
            <div className={styles.row}>
              <span>Sous-total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <p className={styles.shippingNote}>
              {total >= 400 ? 'Livraison gratuite incluse' : `Livraison offerte dès 400 DH (il manque ${formatPrice(400 - total)})`}
            </p>
            <Link to="/commande">
              <Button variant="primary" size="lg" fullWidth>Commander</Button>
            </Link>
          </aside>
        </div>
      </div>
    </div>
  )
}
