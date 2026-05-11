import { Link } from 'react-router-dom'
import { useAdminProducts, useAdminOrders } from '../../hooks/useAdmin'
import { formatPrice } from '../../lib/utils'
import styles from './AdminDashboard.module.css'

const STATUS_LABELS = {
  PENDING:   'En attente',
  CONFIRMED: 'Confirmé',
  SHIPPED:   'Expédié',
  DELIVERED: 'Livré',
  CANCELLED: 'Annulé',
  REFUNDED:  'Remboursé',
}

const STATS = (products, orders, revenue, pending) => [
  {
    label: 'Produits',
    value: products.length,
    mod: 'sky',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    href: '/admin/produits',
  },
  {
    label: 'Commandes totales',
    value: orders.length,
    mod: 'teal',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    href: '/admin/commandes',
  },
  {
    label: "Chiffre d'affaires",
    value: formatPrice(revenue),
    mod: 'green',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    href: '/admin/commandes',
  },
  {
    label: 'En attente',
    value: pending,
    mod: 'orange',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    href: '/admin/commandes',
  },
]

export default function AdminDashboard() {
  const { data: products = [] } = useAdminProducts()
  const { data: orders = [] }   = useAdminOrders()

  const revenue = orders
    .filter((o) => ['CONFIRMED', 'SHIPPED', 'DELIVERED'].includes(o.status))
    .reduce((sum, o) => sum + parseFloat(o.total ?? 0), 0)

  const pending      = orders.filter((o) => o.status === 'PENDING').length
  const recentOrders = orders.slice(0, 8)

  const stats = STATS(products, orders, revenue, pending)

  return (
    <div className={styles.page}>

      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Tableau de bord</h1>
          <p className={styles.subtitle}>Bienvenue dans l'espace administration</p>
        </div>
        <Link to="/admin/produits" className={styles.addBtn}>
          + Ajouter un produit
        </Link>
      </header>

      {/* ── Stat cards ── */}
      <div className={styles.stats}>
        {stats.map((s) => (
          <Link key={s.label} to={s.href} className={`${styles.stat} ${styles[`stat-${s.mod}`]}`}>
            <div className={styles.statIcon}>{s.icon}</div>
            <div className={styles.statBody}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Recent orders ── */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Commandes récentes</h2>
          <Link to="/admin/commandes" className={styles.seeAll}>Voir tout →</Link>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Commande</th>
                <th>Client</th>
                <th>Montant</th>
                <th>Statut</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className={styles.empty}>Aucune commande pour l'instant</td>
                </tr>
              )}
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className={styles.orderId}>#{order.id.slice(-8).toUpperCase()}</td>
                  <td className={styles.client}>
                    {order.user?.name ?? order.user?.email ?? '—'}
                  </td>
                  <td>{formatPrice(parseFloat(order.total ?? 0))}</td>
                  <td>
                    <span className={`${styles.badge} ${styles[order.status?.toLowerCase()]}`}>
                      {STATUS_LABELS[order.status] ?? order.status}
                    </span>
                  </td>
                  <td className={styles.date}>
                    {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Quick links ── */}
      <div className={styles.quickLinks}>
        <Link to="/admin/produits" className={styles.quickCard}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          <div>
            <p className={styles.quickTitle}>Nouveau produit</p>
            <p className={styles.quickSub}>Ajouter un article au catalogue</p>
          </div>
        </Link>
        <Link to="/admin/commandes" className={styles.quickCard}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <polyline points="9 11 12 14 22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
          <div>
            <p className={styles.quickTitle}>Gérer les commandes</p>
            <p className={styles.quickSub}>Mettre à jour les statuts</p>
          </div>
        </Link>
        <Link to="/admin/clients" className={styles.quickCard}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <div>
            <p className={styles.quickTitle}>Voir les clients</p>
            <p className={styles.quickSub}>Liste des comptes inscrits</p>
          </div>
        </Link>
      </div>

    </div>
  )
}
