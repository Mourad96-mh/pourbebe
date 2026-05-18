import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useCart, { cartTotal as cartTotalSelector } from '../../hooks/useCart'
import CartItem from './CartItem'
import Button from '../ui/Button'
import { formatPrice } from '../../lib/utils'
import styles from './CartDrawer.module.css'

export default function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen)
  const close  = useCart((s) => s.closeCart)
  const items  = useCart((s) => s.items)
  const total  = useCart(cartTotalSelector)

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

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

            {/* Conditions */}
            <div className={styles.policies}>
              <Link to="/livraison" className={styles.policyItem} onClick={close}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="1" y="3" width="15" height="13" rx="1" />
                  <path d="M16 8h4l3 5v3h-7V8z" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
                <span>Livraison au Maroc</span>
              </Link>
              <Link to="/retours" className={styles.policyItem} onClick={close}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <polyline points="1 4 1 10 7 10" />
                  <path d="M3.51 15a9 9 0 1 0 .49-4.5" />
                </svg>
                <span>Échange sous 5 jours</span>
              </Link>
              <Link to="/cgv" className={styles.policyItem} onClick={close}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>Paiement sécurisé</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
