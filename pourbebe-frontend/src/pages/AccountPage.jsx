import { Link, useNavigate, Navigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../hooks/useAuth'
import useWishlist from '../hooks/useWishlist'
import Spinner from '../components/ui/Spinner'
import Button from '../components/ui/Button'
import { formatPrice } from '../lib/utils'
import api from '../lib/api'
import styles from './AccountPage.module.css'

const STATUS_LABELS = {
  PENDING:   'En attente',
  CONFIRMED: 'Confirmée',
  SHIPPED:   'En livraison',
  DELIVERED: 'Livrée',
  CANCELLED: 'Annulée',
}

export default function AccountPage() {
  const { user, logout } = useAuth()
  const navigate         = useNavigate()
  const wishlistItems    = useWishlist((s) => s.items)

  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ['orders'],
    queryFn:  async () => {
      const res = await api.get('/orders/mine')
      return res.data.data
    },
    enabled: !!user,
  })

  if (!user) return <Navigate to="/connexion" replace />

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>

        {/* ── Header ── */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Mon compte</h1>
            <p className={styles.welcome}>Bonjour, <strong>{user.name || user.email}</strong></p>
          </div>
          <Button variant="ghost" onClick={handleLogout}>Déconnexion</Button>
        </div>

        <div className={styles.grid}>

          {/* ── Profile card ── */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Mes informations</h2>
            <div className={styles.profileRow}>
              <span className={styles.profileLabel}>Nom</span>
              <span className={styles.profileValue}>{user.name || '—'}</span>
            </div>
            <div className={styles.profileRow}>
              <span className={styles.profileLabel}>Email</span>
              <span className={styles.profileValue}>{user.email}</span>
            </div>
          </div>

          {/* ── Birth list card ── */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Liste de naissance</h2>
            <p className={styles.cardDesc}>Créez votre liste et partagez-la avec vos proches pour qu'ils puissent offrir les cadeaux parfaits.</p>
            <Link to="/liste-naissance">
              <Button variant="primary" size="sm">Gérer ma liste</Button>
            </Link>
          </div>

          {/* ── Wishlist card ── */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Mes favoris</h2>
            {wishlistItems.length === 0 ? (
              <p className={styles.cardDesc}>Vous n'avez pas encore de produits en favoris.</p>
            ) : (
              <p className={styles.cardDesc}>
                <strong>{wishlistItems.length}</strong> produit{wishlistItems.length > 1 ? 's' : ''} dans vos favoris.
              </p>
            )}
            <Link to="/">
              <Button variant="ghost" size="sm">Parcourir le catalogue</Button>
            </Link>
          </div>

        </div>

        {/* ── Orders ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Mes commandes</h2>
          {ordersLoading ? (
            <Spinner />
          ) : !orders?.length ? (
            <div className={styles.emptyOrders}>
              <p>Vous n'avez pas encore passé de commande.</p>
              <Link to="/"><Button variant="primary" size="sm">Découvrir nos produits</Button></Link>
            </div>
          ) : (
            <div className={styles.orders}>
              {orders.map((order) => (
                <div key={order._id} className={styles.order}>
                  <div className={styles.orderInfo}>
                    <span className={styles.orderId}>#{String(order._id).slice(-8).toUpperCase()}</span>
                    <span className={styles.orderDate}>{new Date(order.createdAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <span className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>
                    {STATUS_LABELS[order.status] ?? order.status}
                  </span>
                  <span className={styles.orderTotal}>{formatPrice(order.total)}</span>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  )
}
