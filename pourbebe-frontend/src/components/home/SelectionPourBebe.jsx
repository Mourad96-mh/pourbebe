import { useState } from 'react'
import { useProducts } from '../../hooks/useProducts'
import { useCuration } from '../../hooks/useCuration'
import ProductCard from '../product/ProductCard'
import Spinner from '../ui/Spinner'
import styles from './SelectionPourBebe.module.css'

const TABS = [
  { label: 'Nos Lits',       tag: 'lit',      slot: 'selection-lits' },
  { label: 'Nos Couffins',   tag: 'couffin',  slot: 'selection-couffins' },
  { label: 'Nos Baby Nests', tag: 'baby-nest', slot: 'selection-baby-nests' },
]

export default function SelectionPourBebe() {
  const [activeTab, setActiveTab] = useState(0)

  const { data: curationLits      = [] } = useCuration('selection-lits')
  const { data: curationCouffins  = [] } = useCuration('selection-couffins')
  const { data: curationBabyNests = [] } = useCuration('selection-baby-nests')

  const curations = [curationLits, curationCouffins, curationBabyNests]

  const { data, isLoading: fbLoading } = useProducts({ category: 'chambre', limit: 30 })

  const activeCuration = curations[activeTab]
  const isLoading      = activeCuration.length === 0 && fbLoading

  const products = activeCuration.length > 0
    ? activeCuration.slice(0, 5)
    : (data?.products ?? []).filter((p) => p.tags?.includes(TABS[activeTab].tag)).slice(0, 5)

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>
          Sélection <em>Pour Bébé</em>
        </h2>

        <div className={styles.tabs} role="tablist" aria-label="Catégories de sélection">
          {TABS.map((tab, i) => (
            <button
              key={tab.label}
              role="tab"
              aria-selected={activeTab === i}
              className={`${styles.tab}${activeTab === i ? ` ${styles.tabActive}` : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <Spinner />
        ) : products.length > 0 ? (
          <div className={styles.grid}>
            {products.map((p) => (
              <ProductCard key={p.id ?? p._id} product={p} />
            ))}
          </div>
        ) : (
          <p className={styles.empty}>Aucun produit dans cette catégorie pour le moment.</p>
        )}
      </div>
    </section>
  )
}
