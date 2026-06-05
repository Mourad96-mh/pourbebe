import { useState } from 'react'
import styles from './ProductFilters.module.css'

const MAX_PRICE = 2880

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

function SectionLabel({ label }) {
  return (
    <div className={styles.sectionBtn}>
      <span className={styles.sectionTitle}>{label}</span>
    </div>
  )
}

export default function ProductFilters({
  filters,
  onChange,
  subcategories = [],
  subCategoryCounts = {},
  genderCounts = {},
  ageCounts = {},
  onClose,
}) {
  const minPrice = filters.min ?? 0
  const maxPrice = filters.max ?? MAX_PRICE

  const hasPriceFilter  = filters.min || filters.max
  const hasSubCategory  = (filters.subCategories ?? []).length > 0
  const hasGender       = !!filters.gender
  const hasAges         = (filters.ages ?? []).length > 0
  const hasFilters      = hasPriceFilter || hasSubCategory || hasGender || hasAges

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

  function removeAgeFilter(val) {
    const next = (filters.ages || []).filter(v => v !== val)
    onChange({ ...filters, ages: next.length ? next : undefined })
  }

  const visibleSubcategories = subcategories.filter(
    (s) => (subCategoryCounts[s.slug] ?? 0) > 0 || (filters.subCategories ?? []).includes(s.slug)
  )

  const visibleGenders = GENDER_OPTIONS.filter(
    (o) => (genderCounts[o.value] ?? 0) > 0 || filters.gender === o.value
  )

  const predefinedAgeValues = AGE_OPTIONS.map((o) => o.value)
  const customAgeOptions = Object.keys(ageCounts)
    .filter((v) => v && !predefinedAgeValues.includes(v))
    .map((v) => ({ value: v, label: v }))

  const visibleAges = [
    ...AGE_OPTIONS.filter(
      (o) => (ageCounts[o.value] ?? 0) > 0 || (filters.ages ?? []).includes(o.value)
    ),
    ...customAgeOptions,
  ]

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
                {minPrice} – {maxPrice} DH
                <button onClick={removePriceFilter} aria-label="Retirer filtre prix">×</button>
              </span>
            )}
            {(filters.subCategories || []).map(slug => (
              <span key={slug} className={styles.chip}>
                {subcategories.find(s => s.slug === slug)?.name ?? slug}
                <button onClick={() => toggleArrayFilter('subCategories', slug)} aria-label="Retirer filtre type de produit">×</button>
              </span>
            ))}
            {hasGender && (
              <span className={styles.chip}>
                {GENDER_OPTIONS.find(o => o.value === filters.gender)?.label ?? filters.gender}
                <button onClick={() => update('gender', '')} aria-label="Retirer filtre sexe">×</button>
              </span>
            )}
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
        <SectionLabel label="PRIX" />
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
              min={0} max={MAX_PRICE} value={minPrice}
              onChange={e => {
                const v = +e.target.value
                if (v < maxPrice) update('min', v || undefined)
              }}
            />
            <input
              type="range"
              className={styles.rangeInput}
              min={0} max={MAX_PRICE} value={maxPrice}
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
      </div>

      {/* ── TYPE DE PRODUIT (dynamic from backoffice) ── */}
      {visibleSubcategories.length > 0 && (
        <div className={styles.section}>
          <SectionLabel label="TYPE DE PRODUIT" />
          <div className={styles.sectionBody}>
            {visibleSubcategories.map(sub => (
              <label key={sub.slug} className={styles.checkLabel}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={(filters.subCategories || []).includes(sub.slug)}
                  onChange={() => toggleArrayFilter('subCategories', sub.slug)}
                />
                <span className={styles.checkText}>{sub.name}</span>
                <span className={styles.checkCount}>({subCategoryCounts[sub.slug] ?? 0})</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* ── SEXE ── */}
      {visibleGenders.length > 0 && (
        <div className={styles.section}>
          <SectionLabel label="SEXE" />
          <div className={styles.sectionBody}>
            {visibleGenders.map(opt => (
              <label key={opt.value} className={styles.checkLabel}>
                <input
                  type="radio"
                  name="gender"
                  className={styles.checkbox}
                  checked={filters.gender === opt.value}
                  onChange={() => update('gender', filters.gender === opt.value ? '' : opt.value)}
                />
                <span className={styles.checkText}>{opt.label}</span>
                <span className={styles.checkCount}>({genderCounts[opt.value] ?? 0})</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* ── ÂGE ── */}
      {visibleAges.length > 0 && (
        <div className={styles.section}>
          <SectionLabel label="TRANCHE D'ÂGE" />
          <div className={styles.sectionBody}>
            {visibleAges.map(opt => (
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
        </div>
      )}

    </aside>
  )
}
