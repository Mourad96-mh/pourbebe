import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/product/ProductCard'
import Spinner from '../components/ui/Spinner'
import SEO from '../components/ui/SEO'
import styles from './SearchPage.module.css'

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const navigate       = useNavigate()
  const initialQ       = searchParams.get('q') ?? ''
  const [draft, setDraft] = useState(initialQ)

  const { data, isLoading } = useProducts(initialQ ? { q: initialQ } : {})
  const products = data?.products ?? []

  function handleSearch(e) {
    e.preventDefault()
    const q = draft.trim()
    if (q) navigate(`/recherche?q=${encodeURIComponent(q)}`)
  }

  return (
    <div className={styles.page}>
      <SEO title={initialQ ? `Résultats pour « ${initialQ} »` : 'Recherche'} noindex />

      <div className={styles.inner}>
        <div className={styles.searchBar}>
          <form className={styles.form} onSubmit={handleSearch} role="search">
            <input
              type="search"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Rechercher des produits..."
              className={styles.input}
              aria-label="Affiner la recherche"
              autoFocus
            />
            <button type="submit" className={styles.searchBtn} aria-label="Lancer la recherche">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </form>
        </div>

        {initialQ && (
          <div className={styles.meta}>
            {isLoading ? (
              <span className={styles.metaText}>Recherche en cours…</span>
            ) : (
              <span className={styles.metaText}>
                {products.length > 0
                  ? `${products.length} résultat${products.length > 1 ? 's' : ''} pour « ${initialQ} »`
                  : `Aucun résultat pour « ${initialQ} »`}
              </span>
            )}
          </div>
        )}

        {isLoading ? (
          <Spinner />
        ) : products.length > 0 ? (
          <div className={styles.grid}>
            {products.map((p) => (
              <ProductCard
                key={p.id ?? p._id}
                product={p}
                badge={p.compareAt ? 'sale' : p.isNewArrival ? 'new' : undefined}
              />
            ))}
          </div>
        ) : initialQ ? (
          <div className={styles.empty}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className={styles.emptyIcon}>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <p className={styles.emptyTitle}>Aucun produit trouvé</p>
            <p className={styles.emptySub}>Essayez un autre mot-clé ou parcourez nos catégories.</p>
          </div>
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptySub}>Entrez un mot-clé pour commencer votre recherche.</p>
          </div>
        )}
      </div>
    </div>
  )
}
