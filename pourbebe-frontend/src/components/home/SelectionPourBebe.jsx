import { useState, useEffect } from 'react'
import { useProducts } from '../../hooks/useProducts'
import { useCuration } from '../../hooks/useCuration'
import ProductCard from '../product/ProductCard'
import Spinner from '../ui/Spinner'
import styles from './SelectionPourBebe.module.css'

const TABS = [
  { label: 'Nos Lits',       tag: 'lit',       slot: 'selection-lits' },
  { label: 'Nos Couffins',   tag: 'couffin',   slot: 'selection-couffins' },
  { label: 'Nos Baby Nests', tag: 'baby-nest', slot: 'selection-baby-nests' },
]

/*
  Rotation logic (window of 3, one slot replaced per tick):
  phase 0 → new product enters at slot 2:     [a, b, NEW]  (old slot-2 goes to outside queue)
  phase 1 → new product slides to slot 1:     [a, NEW, x]  (x = next from outside queue)
  phase 2 → new product slides to slot 0:     [NEW, x, y]  (y = next from outside queue)
  then phase resets to 0 with the next product in the queue
*/
function advance({ displayed, outside, phase }) {
  if (outside.length === 0) return { displayed, outside, phase }

  if (phase === 0) {
    const [traveler, ...rest] = outside
    return {
      displayed: [displayed[0], displayed[1], traveler],
      outside:   [...rest, displayed[2]],
      phase:     1,
    }
  }
  if (phase === 1) {
    const [fill, ...rest] = outside
    return {
      displayed: [displayed[0], displayed[2], fill],
      outside:   [...rest, displayed[1]],
      phase:     2,
    }
  }
  // phase === 2
  const [fill, ...rest] = outside
  return {
    displayed: [displayed[1], displayed[2], fill],
    outside:   [...rest, displayed[0]],
    phase:     0,
  }
}

export default function SelectionPourBebe() {
  const [activeTab, setActiveTab] = useState(0)
  const [rot, setRot] = useState({ displayed: [], outside: [], phase: 0 })

  const { data: curationLits      = [] } = useCuration('selection-lits')
  const { data: curationCouffins  = [] } = useCuration('selection-couffins')
  const { data: curationBabyNests = [] } = useCuration('selection-baby-nests')

  const curations = [curationLits, curationCouffins, curationBabyNests]

  const { data, isLoading: fbLoading } = useProducts({ category: 'chambre', limit: 30 })

  const activeCuration = curations[activeTab]
  const isLoading      = activeCuration.length === 0 && fbLoading

  const allProducts = activeCuration.length > 0
    ? activeCuration
    : (data?.products ?? []).filter((p) => p.tags?.includes(TABS[activeTab].tag))

  // Reset rotation state when tab changes or products load
  useEffect(() => {
    if (allProducts.length === 0) return
    setRot({
      displayed: allProducts.slice(0, 3),
      outside:   allProducts.slice(3),
      phase:     0,
    })
  }, [activeTab, allProducts.length])

  // Auto-rotate every 3 seconds when there are more than 3 products
  useEffect(() => {
    if (allProducts.length <= 3) return
    const id = setInterval(() => setRot((prev) => advance(prev)), 3000)
    return () => clearInterval(id)
  }, [allProducts.length])

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
        ) : rot.displayed.length > 0 ? (
          <div className={styles.grid}>
            {rot.displayed.map((p) => (
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
