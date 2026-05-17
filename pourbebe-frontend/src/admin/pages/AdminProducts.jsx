import { useState, useRef, useEffect } from 'react'
import {
  useAdminProducts,
  useAdminCategories,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  useUploadImage,
} from '../hooks/useAdmin'
import { formatPrice } from '../../lib/utils'
import styles from './AdminProducts.module.css'

const MAX_IMAGES = 5

const GENDER_OPTIONS = [
  { value: 'fille',   label: 'Fille' },
  { value: 'garcon',  label: 'Garçon' },
  { value: 'unisexe', label: 'Unisexe' },
]

const AGE_OPTIONS = [
  { value: '0-1mois',   label: '0 – 1 mois' },
  { value: '0-3mois',   label: '0 – 3 mois' },
  { value: '0-6mois',   label: '0 – 6 mois' },
  { value: '6-12mois',  label: '6 – 12 mois' },
  { value: '1-2ans',    label: '1 – 2 ans' },
  { value: '2-4ans',    label: '2 – 4 ans' },
  { value: '0-4ans',    label: '0 – 4 ans' },
]

const EMPTY_FORM = {
  name:             '',
  brand:            '',
  price:            '',
  compareAt:        '',
  description:      '',
  usageTips:        '',
  sizes:            [],
  parentCategoryId: '',
  categoryId:       '',
  images:           [],
  inStock:          true,
  isNewArrival:     false,
  isGiftIdea:       false,
  cartDisabled:     false,
  gender:           '',
  ageRange:         '',
  onOrderNote:      '',
  deliveryNote:     '',
  returnNote:       '',
}

/* ── Inline rich-text editor ── */
function RichEditor({ defaultValue, onChange }) {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) ref.current.innerHTML = defaultValue || ''
  }, []) // intentionally runs once on mount only

  function execCmd(cmd) {
    ref.current?.focus()
    document.execCommand(cmd, false, null)
  }

  return (
    <div className={styles.editorWrap}>
      <div className={styles.editorToolbar}>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); execCmd('bold') }} title="Gras" className={styles.editorBtn}>
          <strong>G</strong>
        </button>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); execCmd('italic') }} title="Italique" className={styles.editorBtn}>
          <em>I</em>
        </button>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); execCmd('insertUnorderedList') }} title="Liste à puces" className={styles.editorBtn}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="9" y1="6" x2="20" y2="6" /><line x1="9" y1="12" x2="20" y2="12" /><line x1="9" y1="18" x2="20" y2="18" />
            <circle cx="4" cy="6" r="1.5" fill="currentColor" stroke="none" />
            <circle cx="4" cy="12" r="1.5" fill="currentColor" stroke="none" />
            <circle cx="4" cy="18" r="1.5" fill="currentColor" stroke="none" />
          </svg>
        </button>
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        className={styles.editorBody}
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
      />
    </div>
  )
}

function findParentId(tree, categoryId) {
  for (const parent of tree) {
    if (String(parent._id) === categoryId) return String(parent._id)
    const sub = (parent.children ?? []).find((c) => String(c._id) === categoryId)
    if (sub) return String(parent._id)
  }
  return ''
}

export default function AdminProducts() {
  const { data: products = [], isLoading } = useAdminProducts()
  const { data: categories = [] }          = useAdminCategories()
  const createProduct  = useCreateProduct()
  const updateProduct  = useUpdateProduct()
  const deleteProduct  = useDeleteProduct()
  const uploadImage    = useUploadImage()

  const [modal, setModal]               = useState(null)
  const [form, setForm]                 = useState(EMPTY_FORM)
  const [sizeInput, setSizeInput]       = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [search, setSearch]             = useState('')
  const [error, setError]               = useState('')
  const [uploading, setUploading]       = useState(false)
  const fileInputRef                    = useRef(null)

  /* ── helpers ── */
  const parentCategories = categories
  const selectedParent   = parentCategories.find((c) => String(c._id) === form.parentCategoryId)
  const subcategories    = selectedParent?.children ?? []

  function openCreate() {
    setForm(EMPTY_FORM)
    setSizeInput('')
    setError('')
    setModal('create')
  }

  function openEdit(product) {
    const catId    = String(product.categoryId?._id ?? product.categoryId ?? '')
    const parentId = findParentId(categories, catId)
    setForm({
      name:             product.name         ?? '',
      brand:            product.brand        ?? '',
      price:            product.price        ?? '',
      compareAt:        product.compareAt    ?? '',
      description:      product.description  ?? '',
      usageTips:        product.usageTips    ?? '',
      sizes:            product.sizes        ?? [],
      parentCategoryId: parentId,
      categoryId:       catId,
      images:           product.images       ?? [],
      inStock:          product.inStock      ?? true,
      isNewArrival:     product.isNewArrival ?? false,
      isGiftIdea:       product.isGiftIdea   ?? false,
      cartDisabled:     product.cartDisabled ?? false,
      gender:           product.gender       ?? '',
      ageRange:         product.ageRange     ?? '',
      onOrderNote:      product.onOrderNote  ?? '',
      deliveryNote:     product.deliveryNote ?? '',
      returnNote:       product.returnNote   ?? '',
    })
    setSizeInput('')
    setError('')
    setModal(product)
  }

  function closeModal() { setModal(null); setError(''); setSizeInput('') }

  function handleField(e) {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  function handleParentChange(e) {
    const pid    = e.target.value
    const parent = parentCategories.find((c) => String(c._id) === pid)
    const hasSub = (parent?.children ?? []).length > 0
    setForm((f) => ({
      ...f,
      parentCategoryId: pid,
      categoryId: hasSub ? '' : pid,
    }))
  }

  function handleSubChange(e) {
    setForm((f) => ({ ...f, categoryId: e.target.value }))
  }

  /* ── sizes chip input ── */
  function handleSizeKeyDown(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const val = sizeInput.trim().toUpperCase()
      if (val && !form.sizes.includes(val)) {
        setForm((f) => ({ ...f, sizes: [...f.sizes, val] }))
      }
      setSizeInput('')
    }
  }

  function removeSize(size) {
    setForm((f) => ({ ...f, sizes: f.sizes.filter((s) => s !== size) }))
  }

  /* ── image upload ── */
  async function handleFiles(e) {
    const files = Array.from(e.target.files)
    if (!files.length) return
    setUploading(true)
    try {
      for (const file of files) {
        if (form.images.length >= MAX_IMAGES) break
        const url = await uploadImage.mutateAsync(file)
        setForm((f) => {
          if (f.images.length >= MAX_IMAGES) return f
          return { ...f, images: [...f.images, url] }
        })
      }
    } catch {
      setError("Erreur lors du téléchargement de l'image.")
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  function removeImage(index) {
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== index) }))
  }

  /* ── submit ── */
  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!form.categoryId) { setError('Veuillez choisir une catégorie.'); return }

    const payload = {
      name:         form.name,
      brand:        form.brand,
      description:  form.description,
      usageTips:    form.usageTips,
      sizes:        form.sizes,
      categoryId:   form.categoryId,
      price:        parseFloat(form.price),
      compareAt:    form.compareAt ? parseFloat(form.compareAt) : undefined,
      images:       form.images,
      inStock:      form.inStock,
      isNewArrival: form.isNewArrival,
      isGiftIdea:   form.isGiftIdea,
      cartDisabled: form.cartDisabled,
      gender:       form.gender    || null,
      ageRange:     form.ageRange  || null,
      onOrderNote:  form.onOrderNote,
      deliveryNote: form.deliveryNote,
      returnNote:   form.returnNote,
    }
    try {
      if (modal === 'create') {
        await createProduct.mutateAsync(payload)
      } else {
        await updateProduct.mutateAsync({ id: modal._id ?? modal.id, data: payload })
      }
      closeModal()
    } catch (err) {
      setError(err?.response?.data?.error ?? 'Une erreur est survenue.')
    }
  }

  async function toggleStock(product) {
    await updateProduct.mutateAsync({
      id: product._id ?? product.id,
      data: { inStock: !product.inStock },
    })
  }

  async function handleDelete() {
    try {
      await deleteProduct.mutateAsync(deleteTarget._id ?? deleteTarget.id)
      setDeleteTarget(null)
    } catch {
      setDeleteTarget(null)
    }
  }

  const filtered = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.brand?.toLowerCase().includes(search.toLowerCase())
  )

  const isSubmitting = createProduct.isPending || updateProduct.isPending

  return (
    <div className={styles.page}>

      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Produits</h1>
          <p className={styles.subtitle}>{products.length} article{products.length !== 1 ? 's' : ''} au catalogue</p>
        </div>
        <button onClick={openCreate} className={styles.addBtn}>+ Ajouter un produit</button>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <svg className={styles.searchIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher par nom ou marque…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.search}
          />
        </div>
        <span className={styles.count}>{filtered.length} produit{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Nom</th>
              <th>Marque</th>
              <th>Catégorie</th>
              <th>Prix</th>
              <th>Stock</th>
              <th>Nouveau</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr><td colSpan={8} className={styles.empty}>Chargement…</td></tr>
            )}
            {!isLoading && filtered.length === 0 && (
              <tr><td colSpan={8} className={styles.empty}>Aucun produit trouvé</td></tr>
            )}
            {filtered.map((p) => (
              <tr key={p._id ?? p.id}>
                <td>
                  {p.images?.[0] ? (
                    <img src={p.images[0]} alt={p.name} className={styles.thumb} />
                  ) : (
                    <div className={styles.thumbEmpty}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                  )}
                </td>
                <td className={styles.productName}>{p.name}</td>
                <td className={styles.brand}>{p.brand}</td>
                <td className={styles.category}>{p.categoryId?.name ?? '—'}</td>
                <td>
                  {formatPrice(parseFloat(p.price ?? 0))}
                  {p.compareAt && (
                    <span className={styles.compareAt}> {formatPrice(parseFloat(p.compareAt))}</span>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => toggleStock(p)}
                    className={p.inStock ? styles.toggleOn : styles.toggleOff}
                    disabled={updateProduct.isPending}
                  >
                    {p.inStock ? '✓ En stock' : '✕ Épuisé'}
                  </button>
                </td>
                <td>
                  {p.isNewArrival
                    ? <span className={styles.newBadge}>Nouveau</span>
                    : <span className={styles.dash}>—</span>}
                </td>
                <td>
                  <div className={styles.actions}>
                    <button onClick={() => openEdit(p)} className={styles.editBtn} title="Modifier">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button onClick={() => setDeleteTarget(p)} className={styles.deleteBtn} title="Supprimer">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6M14 11v6" />
                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Create / Edit modal ── */}
      {modal !== null && (
        <div className={styles.overlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

            <div className={styles.modalHead}>
              <h2 className={styles.modalTitle}>
                {modal === 'create' ? 'Nouveau produit' : 'Modifier le produit'}
              </h2>
              <button onClick={closeModal} className={styles.closeBtn} aria-label="Fermer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>

              {/* Name + Brand */}
              <div className={styles.row}>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Nom *</span>
                  <input name="name" value={form.name} onChange={handleField} required className={styles.input} placeholder="Nom du produit" />
                </label>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Marque</span>
                  <input name="brand" value={form.brand} onChange={handleField} className={styles.input} placeholder="Marque (optionnel)" />
                </label>
              </div>

              {/* Price + Compare */}
              <div className={styles.row}>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Prix (DH) *</span>
                  <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleField} required className={styles.input} placeholder="0" />
                </label>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Prix barré (DH)</span>
                  <input name="compareAt" type="number" min="0" step="0.01" value={form.compareAt} onChange={handleField} className={styles.input} placeholder="Optionnel" />
                </label>
              </div>

              {/* Category + Subcategory */}
              <div className={styles.row}>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Catégorie *</span>
                  <select value={form.parentCategoryId} onChange={handleParentChange} required={!form.categoryId} className={styles.select}>
                    <option value="">Choisir une catégorie</option>
                    {parentCategories.map((c) => (
                      <option key={c._id} value={String(c._id)}>{c.name}</option>
                    ))}
                  </select>
                </label>
                {subcategories.length > 0 && (
                  <label className={styles.field}>
                    <span className={styles.fieldLabel}>Sous-catégorie *</span>
                    <select value={form.categoryId} onChange={handleSubChange} required className={styles.select}>
                      <option value="">Choisir une sous-catégorie</option>
                      {subcategories.map((s) => (
                        <option key={s._id} value={String(s._id)}>{s.name}</option>
                      ))}
                    </select>
                  </label>
                )}
              </div>

              {/* Sexe / Âge */}
              <div className={styles.filterSection}>
                <span className={styles.filterSectionLabel}>Attributs de filtrage</span>
                <div className={styles.row}>
                  <label className={styles.field}>
                    <span className={styles.fieldLabel}>Sexe</span>
                    <select name="gender" value={form.gender} onChange={handleField} className={styles.select}>
                      <option value="">— Non spécifié —</option>
                      {GENDER_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </label>
                  <label className={styles.field}>
                    <span className={styles.fieldLabel}>Tranche d'âge</span>
                    <select name="ageRange" value={form.ageRange} onChange={handleField} className={styles.select}>
                      <option value="">— Non spécifié —</option>
                      {AGE_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>

              {/* Sizes */}
              <div className={styles.field}>
                <span className={styles.fieldLabel}>
                  Tailles
                  <span className={styles.fieldHint}>Appuyer sur Entrée pour ajouter</span>
                </span>
                {form.sizes.length > 0 && (
                  <div className={styles.sizesChips}>
                    {form.sizes.map((s) => (
                      <span key={s} className={styles.sizeChip}>
                        {s}
                        <button type="button" onClick={() => removeSize(s)} className={styles.sizeRemove} aria-label={`Supprimer ${s}`}>×</button>
                      </span>
                    ))}
                  </div>
                )}
                <input
                  type="text"
                  value={sizeInput}
                  onChange={(e) => setSizeInput(e.target.value)}
                  onKeyDown={handleSizeKeyDown}
                  className={styles.input}
                  placeholder="Ex : S, M, L, XL, 3-6 mois…"
                />
              </div>

              {/* Images */}
              <div className={styles.field}>
                <span className={styles.fieldLabel}>
                  Photos du produit
                  <span className={styles.fieldHint}>{form.images.length}/{MAX_IMAGES}</span>
                </span>

                {form.images.length > 0 && (
                  <div className={styles.imageGrid}>
                    {form.images.map((url, i) => (
                      <div key={i} className={styles.imageThumb}>
                        <img src={url} alt={`Photo ${i + 1}`} />
                        <button
                          type="button"
                          className={styles.removeImg}
                          onClick={() => removeImage(i)}
                          aria-label="Supprimer cette photo"
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                        {i === 0 && <span className={styles.mainLabel}>Principale</span>}
                      </div>
                    ))}
                  </div>
                )}

                {form.images.length < MAX_IMAGES && (
                  <label className={`${styles.uploadZone} ${uploading ? styles.uploadZoneLoading : ''}`}>
                    {uploading ? (
                      <span className={styles.uploadSpinner} />
                    ) : (
                      <>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17 8 12 3 7 8" />
                          <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                        <span className={styles.uploadText}>Cliquer pour ajouter des photos</span>
                        <span className={styles.uploadHint}>JPG, PNG, WebP — max 5 Mo par photo</span>
                      </>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp"
                      multiple
                      className={styles.fileInput}
                      onChange={handleFiles}
                      disabled={uploading}
                    />
                  </label>
                )}
              </div>

              {/* Description — rich text editor */}
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Description</span>
                <RichEditor
                  key={modal === 'create' ? 'create' : (modal._id ?? modal.id)}
                  defaultValue={form.description}
                  onChange={(html) => setForm((f) => ({ ...f, description: html }))}
                />
              </div>

              {/* Conseils d'utilisation */}
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Conseils d'utilisation</span>
                <textarea name="usageTips" value={form.usageTips} onChange={handleField} rows={3} className={styles.textarea} placeholder="Conseils, entretien, composition… (optionnel)" />
              </label>

              {/* Informations commande / livraison / retour */}
              <div className={styles.filterSection}>
                <span className={styles.filterSectionLabel}>Informations produit</span>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Note si produit sur commande</span>
                  <textarea name="onOrderNote" value={form.onOrderNote} onChange={handleField} rows={2} className={styles.textarea} placeholder="Ex : Ce produit est fabriqué sur commande sous 7 à 14 jours ouvrables." />
                </label>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Conditions de livraison</span>
                  <textarea name="deliveryNote" value={form.deliveryNote} onChange={handleField} rows={2} className={styles.textarea} placeholder="Laisser vide pour utiliser les conditions générales du site." />
                </label>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Conditions d'échange & retour</span>
                  <textarea name="returnNote" value={form.returnNote} onChange={handleField} rows={2} className={styles.textarea} placeholder="Laisser vide pour utiliser les conditions générales du site." />
                </label>
              </div>

              {/* Toggles */}
              <div className={styles.checks}>
                <label className={styles.checkLabel}>
                  <input type="checkbox" name="inStock" checked={form.inStock} onChange={handleField} className={styles.checkbox} />
                  En stock
                </label>
                <label className={styles.checkLabel}>
                  <input type="checkbox" name="isNewArrival" checked={form.isNewArrival} onChange={handleField} className={styles.checkbox} />
                  Marquer comme nouveau
                </label>
                <label className={styles.checkLabel}>
                  <input type="checkbox" name="isGiftIdea" checked={form.isGiftIdea} onChange={handleField} className={styles.checkbox} />
                  Idées Cadeaux
                </label>
                <label className={styles.checkLabel}>
                  <input type="checkbox" name="cartDisabled" checked={form.cartDisabled} onChange={handleField} className={styles.checkbox} />
                  WhatsApp uniquement
                </label>
              </div>

              {error && <p className={styles.error}>{error}</p>}

              <div className={styles.formFooter}>
                <button type="button" onClick={closeModal} className={styles.cancelBtn}>Annuler</button>
                <button type="submit" className={styles.submitBtn} disabled={isSubmitting || uploading}>
                  {isSubmitting ? 'Enregistrement…' : modal === 'create' ? 'Créer le produit' : 'Enregistrer'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ── Delete confirm ── */}
      {deleteTarget && (
        <div className={styles.overlay} onClick={() => setDeleteTarget(null)}>
          <div className={styles.confirmBox} onClick={(e) => e.stopPropagation()}>
            <div className={styles.confirmIcon}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
            </div>
            <p className={styles.confirmTitle}>Supprimer ce produit ?</p>
            <p className={styles.confirmText}>
              <strong>{deleteTarget.name}</strong> sera définitivement supprimé. Cette action est irréversible.
            </p>
            <div className={styles.confirmActions}>
              <button onClick={() => setDeleteTarget(null)} className={styles.cancelBtn}>Annuler</button>
              <button onClick={handleDelete} className={styles.deleteConfirmBtn} disabled={deleteProduct.isPending}>
                {deleteProduct.isPending ? 'Suppression…' : 'Supprimer'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
