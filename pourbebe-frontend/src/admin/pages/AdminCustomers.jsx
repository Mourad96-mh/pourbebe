import { useState, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useAdminCustomers, useUpdateClientNote, exportClients } from '../hooks/useAdmin'
import { formatPrice } from '../../lib/utils'
import styles from './AdminCustomers.module.css'

function initials(name) {
  if (!name || name === '—') return '?'
  const parts = name.trim().split(' ')
  return parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase()
}

function NoteCell({ phone, note, onSave }) {
  const [editing, setEditing] = useState(false)
  const [value, setValue]     = useState(note)
  const ref = useRef()

  function startEdit() {
    setValue(note)
    setEditing(true)
    setTimeout(() => ref.current?.focus(), 0)
  }

  function save() {
    setEditing(false)
    if (value !== note) onSave(value)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); save() }
    if (e.key === 'Escape') { setEditing(false); setValue(note) }
  }

  if (editing) {
    return (
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={save}
        onKeyDown={handleKeyDown}
        className={styles.noteInput}
        rows={2}
      />
    )
  }

  return (
    <span
      className={note ? styles.noteText : styles.notePlaceholder}
      onClick={startEdit}
      title="Cliquer pour modifier"
    >
      {note || 'Ajouter une note…'}
    </span>
  )
}

export default function AdminCustomers() {
  const { data: customers = [], isLoading } = useAdminCustomers()
  const updateNote = useUpdateClientNote()
  const [search, setSearch]       = useState('')
  const [exporting, setExporting] = useState(false)
  const [searchParams]            = useSearchParams()
  const highlightPhone            = searchParams.get('phone')

  const filtered = customers.filter((c) => {
    const q = search.toLowerCase()
    return (
      c.name?.toLowerCase().includes(q) ||
      c.phone?.includes(q) ||
      c.city?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q)
    )
  })

  function handleSaveNote(phone, note) {
    updateNote.mutate({ phone, note })
  }

  async function handleExport() {
    setExporting(true)
    try { await exportClients() } finally { setExporting(false) }
  }

  return (
    <div className={styles.page}>

      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Clients</h1>
          <p className={styles.subtitle}>
            {customers.length} client{customers.length !== 1 ? 's' : ''} ayant passé commande
          </p>
        </div>
        <button className={styles.exportBtn} onClick={handleExport} disabled={exporting}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {exporting ? 'Export…' : 'Exporter CSV'}
        </button>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <svg className={styles.searchIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Nom, téléphone, ville…"
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
              <th>Téléphone</th>
              <th>Ville</th>
              <th>Commandes</th>
              <th>Total dépensé</th>
              <th>Note</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr><td colSpan={7} className={styles.empty}>Chargement…</td></tr>
            )}
            {!isLoading && filtered.length === 0 && (
              <tr><td colSpan={7} className={styles.empty}>Aucun client trouvé</td></tr>
            )}
            {filtered.map((c, i) => (
              <tr key={c.phone ?? i} className={highlightPhone === c.phone ? styles.rowHighlighted : ''}>
                <td>
                  <div className={styles.customerCell}>
                    <div className={styles.avatar}>{initials(c.name)}</div>
                    <div className={styles.customerInfo}>
                      <span className={styles.customerName}>{c.name}</span>
                      {c.email && <span className={styles.customerEmail}>{c.email}</span>}
                    </div>
                  </div>
                </td>
                <td className={styles.phone}>{c.phone}</td>
                <td className={styles.city}>{c.city ?? '—'}</td>
                <td className={styles.orderCount}>{c.orderCount}</td>
                <td className={styles.totalSpent}>{formatPrice(c.totalSpent ?? 0)}</td>
                <td className={styles.noteCell}>
                  <NoteCell
                    phone={c.phone}
                    note={c.note}
                    onSave={(note) => handleSaveNote(c.phone, note)}
                  />
                </td>
                <td>
                  <Link
                    to={`/admin/commandes?phone=${encodeURIComponent(c.phone)}`}
                    className={styles.ordersLink}
                  >
                    Voir commandes →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}
