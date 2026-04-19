import { useState } from 'react'
import styles from './ProductFilters.module.css'

const GENDER_OPTIONS = [
  { value: '',         label: 'Tous' },
  { value: 'fille',    label: 'Fille' },
  { value: 'garcon',   label: 'Garçon' },
  { value: 'unisexe',  label: 'Unisexe' },
]

export default function ProductFilters({ filters, onChange }) {
  const [open, setOpen] = useState(false)

  function update(key, value) {
    onChange({ ...filters, [key]: value })
  }

  function updateGender(value) {
    onChange({ ...filters, gender: value || undefined })
  }

  const activeCount = [filters.gender, filters.min, filters.max].filter(Boolean).length

  return (
    <aside className={styles.filters}>
      <div className={styles.header}>
        <h2 className={styles.title}>Filtres</h2>
        <button className={styles.toggleBtn} onClick={() => setOpen((v) => !v)}>
          {activeCount > 0 && <span className={styles.activeBadge}>{activeCount}</span>}
          <span>{open ? 'Masquer' : 'Afficher'}</span>
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
            className={open ? styles.chevronUp : styles.chevronDown}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      <div className={`${styles.body} ${open ? styles.bodyOpen : ''}`}>
        {/* Sexe */}
        <div className={styles.group}>
          <h3 className={styles.groupTitle}>Sexe</h3>
          {GENDER_OPTIONS.map((opt) => (
            <label key={opt.value} className={styles.option}>
              <input
                type="radio"
                name="gender"
                value={opt.value}
                checked={(filters.gender ?? '') === opt.value}
                onChange={() => updateGender(opt.value)}
                className={styles.radio}
              />
              {opt.label}
            </label>
          ))}
        </div>

        {/* Price range */}
        <div className={styles.group}>
          <h3 className={styles.groupTitle}>Prix (DH)</h3>
          <div className={styles.priceRow}>
            <input
              type="number"
              placeholder="Min"
              value={filters.min ?? ''}
              onChange={(e) => update('min', e.target.value || undefined)}
              className={styles.priceInput}
              min={0}
            />
            <span className={styles.priceSep}>–</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.max ?? ''}
              onChange={(e) => update('max', e.target.value || undefined)}
              className={styles.priceInput}
              min={0}
            />
          </div>
        </div>
      </div>
    </aside>
  )
}
