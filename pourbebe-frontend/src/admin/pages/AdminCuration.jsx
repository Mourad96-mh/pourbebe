import { useState, useEffect } from 'react'
import {
  useAdminProducts,
  useAdminCuration,
  useUpsertCuration,
} from '../hooks/useAdmin'
import styles from './AdminCuration.module.css'

const TABS = [
  {
    key:  'featured',
    label: 'Coups de cœur',
    desc:  'Produits affichés dans le carrousel « Vos Coups de cœur du moment » sur la page d\'accueil. Max 8 produits.',
    slot:  'featured',
    max:   8,
  },
  {
    key:   'selection',
    label: 'Sélection Pour Bébé',
    desc:  'Produits affichés dans les onglets de la section « Sélection Pour Bébé » sur la page d\'accueil.',
    slot:  null,
    max:   null,
  },
  {
    key:   'suggested',
    label: 'Vous aimerez peut-être aussi',
    desc:  'Produits suggérés en bas de chaque page produit. Max 8 produits.',
    slot:  'suggested',
    max:   8,
  },
  {
    key:   'related',
    label: 'Produits associés',
    desc:  'Sélectionnez un produit ci-dessous, puis choisissez ses produits associés (max 5) qui apparaîtront sur sa page.',
    slot:  'related',
    max:   5,
  },
]

const SELECTION_SLOTS = [
  { slot: 'selection-lits',        label: 'Nos Lits',       max: 5 },
  { slot: 'selection-couffins',    label: 'Nos Couffins',   max: 5 },
  { slot: 'selection-baby-nests',  label: 'Nos Baby Nests', max: 5 },
]

export default function AdminCuration() {
  const [activeTab,           setActiveTab]           = useState('featured')
  const [selectionSlot,       setSelectionSlot]       = useState('selection-lits')
  const [relatedParent,       setRelatedParent]       = useState(null)
  const [relatedParentSearch, setRelatedParentSearch] = useState('')

  const { data: allProducts = [] } = useAdminProducts()

  const filteredParents = allProducts
    .filter((p) =>
      !relatedParentSearch ||
      p.name.toLowerCase().includes(relatedParentSearch.toLowerCase()) ||
      p.brand?.toLowerCase().includes(relatedParentSearch.toLowerCase())
    )
    .slice(0, 20)

  const activeTabDef = TABS.find((t) => t.key === activeTab)

  return (
    <div className={styles.page}>

      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Sélections de produits</h1>
          <p className={styles.subtitle}>Choisissez manuellement les produits mis en avant sur le site</p>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className={styles.tabs} role="tablist">
        {TABS.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={activeTab === t.key}
            className={`${styles.tab} ${activeTab === t.key ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <p className={styles.typeDesc}>{activeTabDef?.desc}</p>

      {/* ── Coups de coeur ── */}
      {activeTab === 'featured' && (
        <SlotEditor
          key="featured"
          slot="featured"
          contextId=""
          max={8}
          allProducts={allProducts}
        />
      )}

      {/* ── Sélection Pour Bébé ── */}
      {activeTab === 'selection' && (
        <div>
          <div className={styles.subTabs}>
            {SELECTION_SLOTS.map((s) => (
              <button
                key={s.slot}
                className={`${styles.subTab} ${selectionSlot === s.slot ? styles.subTabActive : ''}`}
                onClick={() => setSelectionSlot(s.slot)}
              >
                {s.label}
              </button>
            ))}
          </div>
          {SELECTION_SLOTS.filter((s) => s.slot === selectionSlot).map((s) => (
            <SlotEditor
              key={s.slot}
              slot={s.slot}
              contextId=""
              max={s.max}
              allProducts={allProducts}
            />
          ))}
        </div>
      )}

      {/* ── Vous aimerez peut-être aussi ── */}
      {activeTab === 'suggested' && (
        <SlotEditor
          key="suggested"
          slot="suggested"
          contextId=""
          max={8}
          allProducts={allProducts}
        />
      )}

      {/* ── Produits associés ── */}
      {activeTab === 'related' && (
        <div className={styles.relatedLayout}>

          <div className={styles.relatedParentPanel}>
            <p className={styles.panelTitle}>Choisir le produit</p>
            <div className={styles.searchWrap}>
              <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                className={styles.searchInput}
                value={relatedParentSearch}
                onChange={(e) => setRelatedParentSearch(e.target.value)}
                placeholder="Rechercher par nom…"
              />
            </div>
            <div className={styles.parentList}>
              {filteredParents.map((p) => (
                <button
                  key={String(p._id ?? p.id)}
                  className={`${styles.parentItem} ${relatedParent?.slug === p.slug ? styles.parentItemActive : ''}`}
                  onClick={() => setRelatedParent(p)}
                >
                  {p.images?.[0] && (
                    <img src={p.images[0]} alt="" className={styles.parentThumb} />
                  )}
                  <div className={styles.parentInfo}>
                    <span className={styles.parentName}>{p.name}</span>
                    <span className={styles.parentBrand}>{p.brand}</span>
                  </div>
                </button>
              ))}
              {filteredParents.length === 0 && (
                <p className={styles.noResults}>Aucun produit trouvé.</p>
              )}
            </div>
          </div>

          <div className={styles.relatedEditorPanel}>
            {relatedParent ? (
              <SlotEditor
                key={`related-${relatedParent.slug}`}
                slot="related"
                contextId={relatedParent.slug}
                max={5}
                allProducts={allProducts}
                parentLabel={relatedParent.name}
              />
            ) : (
              <div className={styles.relatedEmpty}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <p>Sélectionnez un produit à gauche pour gérer ses produits associés.</p>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  )
}

/* ── Slot editor ── */

function SlotEditor({ slot, contextId, max, allProducts, parentLabel }) {
  const { data: currentProducts = [], isLoading } = useAdminCuration(slot, contextId)
  const upsert = useUpsertCuration()

  const [selected,    setSelected]    = useState([])
  const [initialized, setInitialized] = useState(false)
  const [search,      setSearch]      = useState('')
  const [saveState,   setSaveState]   = useState('idle') // idle | saving | saved

  useEffect(() => {
    if (!isLoading) {
      setSelected(currentProducts)
      setInitialized(true)
    }
  }, [isLoading])

  const selectedIds = new Set(selected.map((p) => String(p._id ?? p.id)))

  const filtered = allProducts
    .filter((p) => !selectedIds.has(String(p._id ?? p.id)))
    .filter((p) =>
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand?.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 25)

  function addProduct(product) {
    if (selected.length >= max) return
    setSelected((s) => [...s, product])
    setSaveState('idle')
  }

  function removeProduct(id) {
    setSelected((s) => s.filter((p) => String(p._id ?? p.id) !== id))
    setSaveState('idle')
  }

  function move(i, dir) {
    setSelected((s) => {
      const next = [...s]
      const j = i + dir
      if (j < 0 || j >= next.length) return next
      ;[next[i], next[j]] = [next[j], next[i]]
      return next
    })
    setSaveState('idle')
  }

  async function handleSave() {
    setSaveState('saving')
    try {
      await upsert.mutateAsync({
        slot,
        contextId,
        productIds: selected.map((p) => String(p._id ?? p.id)),
      })
      setSaveState('saved')
      setTimeout(() => setSaveState('idle'), 2500)
    } catch {
      setSaveState('idle')
    }
  }

  if (!initialized && isLoading) {
    return <p className={styles.loading}>Chargement…</p>
  }

  return (
    <div className={styles.slotEditor}>
      {parentLabel && (
        <p className={styles.parentLabel}>Produits associés à : <strong>{parentLabel}</strong></p>
      )}

      <div className={styles.editorLayout}>

        {/* ── Selected products ── */}
        <div className={styles.selectedPanel}>
          <div className={styles.panelHead}>
            <span className={styles.panelTitle}>
              Sélectionnés
              <span className={styles.count}>{selected.length}/{max}</span>
            </span>
            <button
              className={`${styles.saveBtn} ${saveState === 'saved' ? styles.saveBtnSaved : ''}`}
              onClick={handleSave}
              disabled={upsert.isPending}
            >
              {saveState === 'saving' ? 'Enregistrement…' :
               saveState === 'saved'  ? '✓ Enregistré' :
               'Enregistrer'}
            </button>
          </div>

          <div className={styles.selectedList}>
            {selected.length === 0 && (
              <p className={styles.emptySelected}>
                Aucun produit sélectionné. Ajoutez des produits depuis la liste ci-contre.
              </p>
            )}
            {selected.map((p, i) => (
              <div key={String(p._id ?? p.id)} className={styles.selectedItem}>
                <span className={styles.itemOrder}>{i + 1}</span>
                {p.images?.[0] ? (
                  <img src={p.images[0]} alt={p.name} className={styles.itemImg} />
                ) : (
                  <div className={styles.itemImgEmpty} />
                )}
                <div className={styles.itemInfo}>
                  <p className={styles.itemName}>{p.name}</p>
                  <p className={styles.itemBrand}>{p.brand}</p>
                </div>
                <div className={styles.itemActions}>
                  <button
                    className={styles.orderBtn}
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                    aria-label="Monter"
                  >▲</button>
                  <button
                    className={styles.orderBtn}
                    onClick={() => move(i, 1)}
                    disabled={i === selected.length - 1}
                    aria-label="Descendre"
                  >▼</button>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeProduct(String(p._id ?? p.id))}
                    aria-label="Retirer"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Product picker ── */}
        <div className={styles.pickerPanel}>
          <div className={styles.panelHead}>
            <span className={styles.panelTitle}>Ajouter des produits</span>
          </div>

          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              className={styles.searchInput}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par nom ou marque…"
            />
          </div>

          <div className={styles.pickerList}>
            {selected.length >= max && (
              <p className={styles.maxReached}>Maximum de {max} produits atteint.</p>
            )}
            {selected.length < max && filtered.length === 0 && (
              <p className={styles.noResults}>Aucun produit trouvé.</p>
            )}
            {selected.length < max && filtered.map((p) => (
              <button
                key={String(p._id ?? p.id)}
                className={styles.pickerItem}
                onClick={() => addProduct(p)}
              >
                {p.images?.[0] ? (
                  <img src={p.images[0]} alt={p.name} className={styles.pickerImg} />
                ) : (
                  <div className={styles.pickerImgEmpty} />
                )}
                <div className={styles.pickerInfo}>
                  <p className={styles.pickerName}>{p.name}</p>
                  <p className={styles.pickerBrand}>{p.brand}</p>
                </div>
                <svg className={styles.addIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
