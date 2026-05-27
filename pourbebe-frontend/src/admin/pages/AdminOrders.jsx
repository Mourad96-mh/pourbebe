import { Fragment, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useAdminOrders, useUpdateOrderStatus, useDeleteOrder } from '../hooks/useAdmin'
import { formatPrice } from '../../lib/utils'
import styles from './AdminOrders.module.css'

const STATUSES = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED']

const STATUS_LABELS = {
  PENDING:   'En attente',
  CONFIRMED: 'Confirmé',
  SHIPPED:   'Expédié',
  DELIVERED: 'Livré',
  CANCELLED: 'Annulé',
  REFUNDED:  'Remboursé',
}

export default function AdminOrders() {
  const [searchParams, setSearchParams] = useSearchParams()
  const phoneFilter = searchParams.get('phone') ?? null

  const { data: orders = [], isLoading } = useAdminOrders(phoneFilter)
  const updateStatus = useUpdateOrderStatus()
  const deleteOrder  = useDeleteOrder()
  const [filter, setFilter] = useState('ALL')
  const [expandedId, setExpandedId] = useState(null)

  const filtered = filter === 'ALL' ? orders : orders.filter((o) => o.status === filter)

  function clearPhoneFilter() {
    setSearchParams({})
  }

  function handleStatus(id, status) {
    updateStatus.mutateAsync({ id, status })
  }

  function handleDelete(id) {
    if (!window.confirm('Supprimer définitivement cette commande ?')) return
    deleteOrder.mutateAsync(id)
  }

  function toggleExpand(id) {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Commandes</h1>
        <span className={styles.count}>{orders.length} au total</span>
      </header>

      {phoneFilter && (
        <div className={styles.clientFilterBar}>
          <span>Filtre client — {phoneFilter} ({orders.length} commande{orders.length !== 1 ? 's' : ''})</span>
          <Link to="/admin/clients" className={styles.clearFilter} style={{ textDecoration: 'none' }}>
            ← Tous les clients
          </Link>
          <button className={styles.clearFilter} onClick={clearPhoneFilter}>
            Voir toutes les commandes
          </button>
        </div>
      )}

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
              <th style={{ width: 32 }}></th>
              <th>Commande</th>
              <th>Client</th>
              <th>Montant</th>
              <th>Statut</th>
              <th>Date</th>
              <th>Modifier statut</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr><td colSpan={8} className={styles.empty}>Chargement…</td></tr>
            )}
            {!isLoading && filtered.length === 0 && (
              <tr><td colSpan={8} className={styles.empty}>Aucune commande</td></tr>
            )}
            {filtered.map((order) => {
              const orderId = order._id ?? order.id
              const isExpanded = expandedId === orderId
              const clientName = order.address?.firstName
                ? `${order.address.firstName} ${order.address.lastName ?? ''}`.trim()
                : (order.userId?.name ?? order.userId?.email ?? '—')

              return (
                <Fragment key={orderId}>
                  <tr className={isExpanded ? styles.rowExpanded : ''}>
                    <td>
                      <button
                        className={styles.expandBtn}
                        onClick={() => toggleExpand(orderId)}
                        aria-label={isExpanded ? 'Réduire' : 'Voir détails'}
                      >
                        <svg
                          width="12" height="12" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2.5"
                          style={{ transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                    </td>
                    <td className={styles.orderId}>#{(orderId ?? '').slice(-8).toUpperCase()}</td>
                    <td className={styles.client}>{clientName}</td>
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
                        onChange={(e) => handleStatus(orderId, e.target.value)}
                        className={styles.statusSelect}
                        disabled={updateStatus.isPending}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDelete(orderId)}
                        disabled={deleteOrder.isPending}
                        aria-label="Supprimer la commande"
                        title="Supprimer"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                          <path d="M10 11v6M14 11v6" />
                          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                        </svg>
                      </button>
                    </td>
                  </tr>

                  {isExpanded && (
                    <tr className={styles.detailRow}>
                      <td colSpan={8} className={styles.detailCell}>
                        <div className={styles.detailContent}>

                          <div className={styles.detailSection}>
                            <p className={styles.detailTitle}>Adresse de livraison</p>
                            <div className={styles.addressLines}>
                              <span className={styles.addressName}>
                                {order.address?.firstName} {order.address?.lastName}
                              </span>
                              {order.address?.phone && (
                                <span>{order.address.phone}</span>
                              )}
                              {order.address?.address && (
                                <span>{order.address.address}</span>
                              )}
                              {order.address?.city && (
                                <span>{order.address.city}</span>
                              )}
                              {order.address?.email && (
                                <span>{order.address.email}</span>
                              )}
                            </div>
                            {order.address?.phone && (
                              <Link
                                to={`/admin/clients?phone=${encodeURIComponent(order.address.phone)}`}
                                className={styles.clientLink}
                              >
                                Voir fiche client →
                              </Link>
                            )}
                          </div>

                          <div className={styles.detailSection}>
                            <p className={styles.detailTitle}>
                              Articles ({order.items?.length ?? 0})
                            </p>
                            <div className={styles.productsList}>
                              {order.items?.map((item, i) => {
                                const img = item.productId?.images?.[0] ?? null
                                return (
                                  <div key={i} className={styles.productItem}>
                                    {img
                                      ? <img src={img} alt={item.productName} className={styles.productImg} />
                                      : <div className={styles.productImgPlaceholder} />
                                    }
                                    <div className={styles.productInfo}>
                                      <span className={styles.productName}>{item.productName}</span>
                                      <span className={styles.productMeta}>
                                        {item.quantity} × {formatPrice(item.price)}
                                      </span>
                                    </div>
                                    <span className={styles.productTotal}>
                                      {formatPrice(item.quantity * item.price)}
                                    </span>
                                  </div>
                                )
                              })}
                            </div>
                          </div>

                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
