import { useState } from 'react'
import styles from './ProductFilters.module.css'

const MAX_PRICE = 2880

const PRODUCT_TYPES = [
  { value: 'lit-bebe',   label: 'Lit Bébé' },
  { value: 'lit-enfant', label: 'Lit Enfant' },
  { value: 'couffin',    label: 'Couffin' },
  { value: 'baby-nest',  label: 'Baby Nest' },
  { value: 'linge',      label: 'Linge de Lit' },
  { value: 'tresses',    label: 'Tresses et Tours de Lit' },
  { value: 'matelas',    label: 'Matelas' },
  { value: 'baignoire',  label: 'Baignoire & Bain' },
  { value: 'poussette',  label: 'Poussette' },
  { value: 'siege-auto', label: 'Siège Auto' },
  { value: 'porte-bebe', label: 'Porte-bébé' },
  { value: 'body',       label: 'Bodies & Pyjamas' },
  { value: 'jouet',      label: 'Jouet & Éveil' },
  { value: 'soin',       label: 'Soin & Hygiène' },
  { value: 'autres',     label: 'Autres' },
]

const GENDER_OPTIONS = [
  { value: 'fille',   label: 'Fille' },
  { value: 'garcon',  label: 'Garçon' },
  { value: 'unisexe', label: 'Unisexe' },
]

const AGE_OPTIONS = [
  { value: '0-1mois',  label: '0 – 1 mois' },
  { value: '0-3mois',  label: '0 – 3 mois' },
  { value: '0-6mois',  label: '0 – 6 mois' },
  { value: '6-12mois', label: '6 – 12 mois' },
  { value: '1-2ans',   label: '1 – 2 ans' },
  { value: '2-4ans',   label: '2 – 4 ans' },
  { value: '0-4ans',   label: '0 – 4 ans' },
]

function ChevronIcon({ open }) {
  return (
    <svg
      className={open ? styles.chevronOpen : styles.chevron}
      width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export default function ProductFilters({ filters, onChange, typeCounts = {}, genderCounts = {}, ageCounts = {}, onClose }) {
  const [open, setOpen] = useState({ prix: true, type: true, sexe: true, age: true })

  const minPrice = filters.min ?? 0
  const maxPrice = filters.max ?? MAX_PRICE

  const hasPriceFilter = filters.min || filters.max
  const hasFilters = hasPriceFilter || filters.gender || filters.types?.length || filters.ages?.length

  function toggle(key) {
    setOpen(prev => ({ ...prev, [key]: !prev[key] }))
  }

  function update(key, value) {
    onChange({ ...filters, [key]: value || undefined })
  }

  function toggleArrayFilter(key, value) {
    const current = filters[key] || []
    const next = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value]
    onChange({ ...filters, [key]: next.length ? next : undefined })
  }

  function clearAll() {
    onChange({})
  }

  function removePriceFilter() {
    const { min, max, ...rest } = filters
    onChange(rest)
  }

  function removeTypeFilter(val) {
    const next = (filters.types || []).filter(v => v !== val)
    onChange({ ...filters, types: next.length ? next : undefined })
  }

  function removeAgeFilter(val) {
    const next = (filters.ages || []).filter(v => v !== val)
    onChange({ ...filters, ages: next.length ? next : undefined })
  }

  return (
    <aside className={styles.sidebar}>

      {/* Header */}
      <div className={styles.header}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="8" y1="12" x2="16" y2="12" />
          <line x1="10" y1="18" x2="14" y2="18" />
        </svg>
        <span>Filtrer</span>
        {onClose && (
          <button className={styles.closeBtn} onClick={onClose} aria-label="Fermer les filtres">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* Active filters */}
      {hasFilters && (
        <div className={styles.activeBlock}>
          <p className={styles.activeLabel}>Filtres appliqués</p>
          <div className={styles.chips}>
            {hasPriceFilter && (
              <span className={styles.chip}>
                {minPrice} DH – {maxPrice} DH
                <button onClick={removePriceFilter} aria-label="Retirer filtre prix">×</button>
              </span>
            )}
            {(filters.types || []).map(val => {
              const opt = PRODUCT_TYPES.find(o => o.value === val)
              return (
                <span key={val} className={styles.chip}>
                  {opt?.label ?? val}
                  <button onClick={() => removeTypeFilter(val)} aria-label={`Retirer ${opt?.label}`}>×</button>
                </span>
              )
            })}
            {(filters.ages || []).map(val => {
              const opt = AGE_OPTIONS.find(o => o.value === val)
              return (
                <span key={val} className={styles.chip}>
                  {opt?.label ?? val}
                  <button onClick={() => removeAgeFilter(val)} aria-label={`Retirer ${opt?.label}`}>×</button>
                </span>
              )
            })}
          </div>
          <button className={styles.clearAll} onClick={clearAll}>Tout effacer</button>
        </div>
      )}

      {/* ── PRIX ── */}
      <div className={styles.section}>
        <button className={styles.sectionBtn} onClick={() => toggle('prix')}>
          <span className={styles.sectionTitle}>PRIX</span>
          <ChevronIcon open={open.prix} />
        </button>
        {open.prix && (
          <div className={styles.sectionBody}>
            <div className={styles.sliderWrap}>
              <div className={styles.sliderBase} />
              <div
                className={styles.sliderFill}
                style={{
                  left:  `${(minPrice / MAX_PRICE) * 100}%`,
                  right: `${100 - (maxPrice / MAX_PRICE) * 100}%`,
                }}
              />
              <input
                type="range"
                className={styles.rangeInput}
                min={0}
                max={MAX_PRICE}
                value={minPrice}
                onChange={e => {
                  const v = +e.target.value
                  if (v < maxPrice) update('min', v || undefined)
                }}
              />
              <input
                type="range"
                className={styles.rangeInput}
                min={0}
                max={MAX_PRICE}
                value={maxPrice}
                onChange={e => {
                  const v = +e.target.value
                  if (v > minPrice) update('max', v === MAX_PRICE ? undefined : v)
                }}
              />
            </div>
            <div className={styles.priceLabels}>
              <span>{minPrice} Dh</span>
              <span>{maxPrice.toLocaleString('fr-FR')} Dh</span>
            </div>
          </div>
        )}
      </div>

      {/* ── TYPE DE PRODUIT ── */}
      <div className={styles.section}>
        <button className={styles.sectionBtn} onClick={() => toggle('type')}>
          <span className={styles.sectionTitle}>TYPE DE PRODUIT</span>
          <ChevronIcon open={open.type} />
        </button>
        {open.type && (
          <div className={styles.sectionBody}>
            {PRODUCT_TYPES.map(opt => (
              <label key={opt.value} className={styles.checkLabel}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={(filters.types || []).includes(opt.value)}
                  onChange={() => toggleArrayFilter('types', opt.value)}
                />
                <span className={styles.checkText}>{opt.label}</span>
                <span className={styles.checkCount}>({typeCounts[opt.value] ?? 0})</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* ── SEXE ── */}
      <div className={styles.section}>
        <button className={styles.sectionBtn} onClick={() => toggle('sexe')}>
          <span className={styles.sectionTitle}>SEXE</span>
          <ChevronIcon open={open.sexe} />
        </button>
        {open.sexe && (
          <div className={styles.sectionBody}>
            {GENDER_OPTIONS.map(opt => (
              <label key={opt.value} className={styles.checkLabel}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={filters.gender === opt.value}
                  onChange={() => update('gender', filters.gender === opt.value ? '' : opt.value)}
                />
                <span className={styles.checkText}>{opt.label}</span>
                {genderCounts[opt.value] > 0 && (
                  <span className={styles.checkCount}>({genderCounts[opt.value]})</span>
                )}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* ── ÂGE ── */}
      <div className={styles.section}>
        <button className={styles.sectionBtn} onClick={() => toggle('age')}>
          <span className={styles.sectionTitle}>ÂGE</span>
          <ChevronIcon open={open.age} />
        </button>
        {open.age && (
          <div className={styles.sectionBody}>
            {AGE_OPTIONS.map(opt => (
              <label key={opt.value} className={styles.checkLabel}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={(filters.ages || []).includes(opt.value)}
                  onChange={() => toggleArrayFilter('ages', opt.value)}
                />
                <span className={styles.checkText}>{opt.label}</span>
                <span className={styles.checkCount}>({ageCounts[opt.value] ?? 0})</span>
              </label>
            ))}
          </div>
        )}
      </div>

    </aside>
  )
}
