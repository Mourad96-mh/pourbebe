import { useState } from 'react'
import { useAdminOrders, useUpdateOrderStatus } from '../hooks/useAdmin'
import { formatPrice } from '../../lib/utils'
import styles from './AdminOrders.module.css'

const STATUSES = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED']

const STATUS_LABELS = {
  PENDING: 'En attente',
  CONFIRMED: 'Confirmé',
  SHIPPED: 'Expédié',
  DELIVERED: 'Livré',
  CANCELLED: 'Annulé',
  REFUNDED: 'Remboursé',
}

export default function AdminOrders() {
  const { data: orders = [], isLoading } = useAdminOrders()
  const updateStatus = useUpdateOrderStatus()
  const [filter, setFilter] = useState('ALL')

  const filtered = filter === 'ALL' ? orders : orders.filter((o) => o.status === filter)

  async function handleStatus(id, status) {
    await updateStatus.mutateAsync({ id, status })
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Commandes</h1>
        <span className={styles.count}>{orders.length} au total</span>
      </header>

      <div className={styles.filters}>
        <button
          className={filter === 'ALL' ? `${styles.filterBtn} ${styles.filterActive}` : styles.filterBtn}
          onClick={() => setFilter('ALL')}
        >
          Toutes ({orders.length})
        </button>
        {STATUSES.map((s) => (
          <button
            key={s}
            className={filter === s ? `${styles.filterBtn} ${styles.filterActive}` : styles.filterBtn}
            onClick={() => setFilter(s)}
          >
            {STATUS_LABELS[s]} ({orders.filter((o) => o.status === s).length})
          </button>
        ))}
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
              <th>Modifier statut</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr><td colSpan={6} className={styles.empty}>Chargement…</td></tr>
            )}
            {!isLoading && filtered.length === 0 && (
              <tr><td colSpan={6} className={styles.empty}>Aucune commande</td></tr>
            )}
            {filtered.map((order) => (
              <tr key={order._id ?? order.id}>
                <td className={styles.orderId}>#{(order._id ?? order.id ?? '').slice(-8).toUpperCase()}</td>
                <td className={styles.client}>
                  {order.address?.firstName
                    ? `${order.address.firstName} ${order.address.lastName ?? ''}`.trim()
                    : (order.userId?.name ?? order.userId?.email ?? '—')}
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
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatus(order.id, e.target.value)}
                    className={styles.statusSelect}
                    disabled={updateStatus.isPending}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
