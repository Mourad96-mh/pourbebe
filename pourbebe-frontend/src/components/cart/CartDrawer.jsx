import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useCart, { cartTotal as cartTotalSelector } from '../../hooks/useCart'
import CartItem from './CartItem'
import Button from '../ui/Button'
import { formatPrice } from '../../lib/utils'
import styles from './CartDrawer.module.css'

const FREE_SHIPPING = 400

export default function CartDrawer() {
  const isOpen   = useCart((s) => s.isOpen)
  const close    = useCart((s) => s.closeCart)
  const items    = useCart((s) => s.items)
  const total    = useCart(cartTotalSelector)

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const remaining = Math.max(0, FREE_SHIPPING - total)
  const progress  = Math.min(100, (total / FREE_SHIPPING) * 100)

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={close} />}

      <div className={`${styles.drawer} ${isOpen ? styles.open : ''}`} role="dialog" aria-label="Votre panier">
        <div className={styles.header}>
          <h2 className={styles.title}>Mon panier {items.length > 0 && <span className={styles.count}>({items.length})</span>}</h2>
          <button className={styles.close} onClick={close} aria-label="Fermer le panier">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Shipping progress */}
        <div className={styles.shipping}>
          {remaining > 0 ? (
            <p className={styles.shippingMsg}>
              Plus que <strong>{formatPrice(remaining)}</strong> pour la livraison gratuite
            </p>
          ) : (
            <p className={styles.shippingFree}>Livraison gratuite débloquée !</p>
          )}
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Items */}
        <div className={styles.items}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <p>Votre panier est vide.</p>
              <Button variant="ghost" onClick={close}>Continuer vos achats</Button>
            </div>
          ) : (
            items.map((item) => <CartItem key={item.key} item={item} />)
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.total}>
              <span>Total</span>
              <span className={styles.totalAmount}>{formatPrice(total)}</span>
            </div>
            <Link to="/commande" onClick={close}>
              <Button variant="primary" fullWidth>Commander</Button>
            </Link>
            <Link to="/panier" className={styles.viewCart} onClick={close}>
              Voir le panier complet
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
