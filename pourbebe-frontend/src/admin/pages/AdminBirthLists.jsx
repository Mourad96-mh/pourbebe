import { useState } from 'react'
import { useAdminBirthLists, useDeleteBirthList } from '../hooks/useAdmin'
import { formatPrice } from '../../lib/utils'
import styles from './AdminBirthLists.module.css'

function formatDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function AdminBirthLists() {
  const { data: lists = [], isLoading } = useAdminBirthLists()
  const deleteBirthList = useDeleteBirthList()

  const [expanded, setExpanded]     = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [search, setSearch]         = useState('')

  const filtered = lists.filter((l) => {
    const q = search.toLowerCase()
    return (
      l.name?.toLowerCase().includes(q) ||
      l.userId?.name?.toLowerCase().includes(q) ||
      l.userId?.email?.toLowerCase().includes(q)
    )
  })

  async function handleDelete() {
    await deleteBirthList.mutateAsync(deleteTarget._id)
    setDeleteTarget(null)
    if (expanded === deleteTarget._id) setExpanded(null)
  }

  return (
    <div className={styles.page}>

      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Listes de naissance</h1>
          <p className={styles.subtitle}>{lists.length} liste{lists.length !== 1 ? 's' : ''} créée{lists.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <svg className={styles.searchIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher par nom ou client…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.search}
          />
        </div>
        <span className={styles.count}>{filtered.length} résultat{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {isLoading && <p className={styles.empty}>Chargement…</p>}

      {!isLoading && filtered.length === 0 && (
        <p className={styles.empty}>Aucune liste de naissance pour le moment.</p>
      )}

      <div className={styles.list}>
        {filtered.map((l) => {
          const items     = l.items ?? []
          const total     = items.length
          const purchased = items.filter((i) => i.purchased).length
          const reserved  = items.filter((i) => i.reserved && !i.purchased).length
          const isOpen    = expanded === l._id

          return (
            <div key={l._id} className={`${styles.card} ${isOpen ? styles.cardOpen : ''}`}>

              {/* ── Summary row ── */}
              <div className={styles.cardHead} onClick={() => setExpanded(isOpen ? null : l._id)}>
                <div className={styles.cardLeft}>
                  <span className={styles.chevron} style={{ transform: isOpen ? 'rotate(90deg)' : 'none' }}>›</span>
                  <div>
                    <p className={styles.listName}>{l.name}</p>
                    <p className={styles.listMeta}>
                      {l.userId?.name ?? 'Inconnu'} · {l.userId?.email ?? '—'} · Créée le {formatDate(l.createdAt)}
                      {l.dueDate && ` · Naissance prévue : ${formatDate(l.dueDate)}`}
                    </p>
                  </div>
                </div>

                <div className={styles.cardStats}>
                  <span className={styles.stat}><strong>{total}</strong> article{total !== 1 ? 's' : ''}</span>
                  <span className={styles.statPurchased}><strong>{purchased}</strong> offert{purchased !== 1 ? 's' : ''}</span>
                  <span className={styles.statReserved}><strong>{reserved}</strong> réservé{reserved !== 1 ? 's' : ''}</span>
                </div>

                <div className={styles.cardActions} onClick={(e) => e.stopPropagation()}>
                  <a
                    href={`/liste-naissance/${l.shareId}`}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.viewBtn}
                    title="Voir la liste publique"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                  <button
                    onClick={() => setDeleteTarget(l)}
                    className={styles.deleteBtn}
                    title="Supprimer"
                    disabled={deleteBirthList.isPending}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6M14 11v6" />
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* ── Items detail ── */}
              {isOpen && (
                <div className={styles.items}>
                  {items.length === 0 ? (
                    <p className={styles.itemsEmpty}>Aucun article dans cette liste.</p>
                  ) : (
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>Produit</th>
                          <th>Prix</th>
                          <th>Qté</th>
                          <th>Réservé</th>
                          <th>Offert</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item) => {
                          const p = item.productId
                          return (
                            <tr key={item._id}>
                              <td className={styles.productCell}>
                                {p?.images?.[0] && (
                                  <img src={p.images[0]} alt={p.name} className={styles.productThumb} />
                                )}
                                <span>{p?.name ?? 'Produit supprimé'}</span>
                              </td>
                              <td>{p?.price != null ? formatPrice(p.price) : '—'}</td>
                              <td>{item.quantity}</td>
                              <td>
                                <span className={item.reserved ? styles.dotYes : styles.dotNo}>
                                  {item.reserved ? '✓' : '—'}
                                </span>
                              </td>
                              <td>
                                <span className={item.purchased ? styles.dotYes : styles.dotNo}>
                                  {item.purchased ? '✓' : '—'}
                                </span>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* ── Delete confirm ── */}
      {deleteTarget && (
        <div className={styles.overlay} onClick={() => setDeleteTarget(null)}>
          <div className={styles.confirmBox} onClick={(e) => e.stopPropagation()}>
            <p className={styles.confirmTitle}>Supprimer cette liste ?</p>
            <p className={styles.confirmText}>
              <strong>{deleteTarget.name}</strong> sera définitivement supprimée.
            </p>
            <div className={styles.confirmActions}>
              <button onClick={() => setDeleteTarget(null)} className={styles.cancelBtn}>Annuler</button>
              <button onClick={handleDelete} className={styles.deleteConfirmBtn} disabled={deleteBirthList.isPending}>
                {deleteBirthList.isPending ? 'Suppression…' : 'Supprimer'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
