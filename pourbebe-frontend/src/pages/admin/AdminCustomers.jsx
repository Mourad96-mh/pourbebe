import { useState } from 'react'
import { useAdminCustomers } from '../../hooks/useAdmin'
import styles from './AdminCustomers.module.css'

function initials(name, email) {
  if (name) {
    const parts = name.trim().split(' ')
    return parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase()
  }
  return email ? email.slice(0, 2).toUpperCase() : '?'
}

export default function AdminCustomers() {
  const { data: customers = [], isLoading } = useAdminCustomers()
  const [search, setSearch] = useState('')

  const filtered = customers.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className={styles.page}>

      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Clients</h1>
          <p className={styles.subtitle}>{customers.length} compte{customers.length !== 1 ? 's' : ''} inscrits</p>
        </div>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <svg className={styles.searchIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher par nom ou email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.search}
          />
        </div>
        {search && (
          <span className={styles.count}>{filtered.length} résultat{filtered.length !== 1 ? 's' : ''}</span>
        )}
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Client</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Inscrit le</th>
              <th>Commandes</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr><td colSpan={5} className={styles.empty}>Chargement…</td></tr>
            )}
            {!isLoading && filtered.length === 0 && (
              <tr><td colSpan={5} className={styles.empty}>Aucun client trouvé</td></tr>
            )}
            {filtered.map((c) => (
              <tr key={c.id}>
                <td>
                  <div className={styles.customerCell}>
                    <div className={`${styles.avatar} ${c.role === 'ADMIN' ? styles.avatarAdmin : ''}`}>
                      {initials(c.name, c.email)}
                    </div>
                    <span className={styles.customerName}>{c.name ?? '—'}</span>
                  </div>
                </td>
                <td className={styles.email}>{c.email}</td>
                <td>
                  <span className={c.role === 'ADMIN' ? styles.roleAdmin : styles.roleCustomer}>
                    {c.role === 'ADMIN' ? 'Admin' : 'Client'}
                  </span>
                </td>
                <td className={styles.date}>
                  {new Date(c.createdAt).toLocaleDateString('fr-FR')}
                </td>
                <td className={styles.orderCount}>
                  {c._count?.orders ?? c.orders?.length ?? '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}
