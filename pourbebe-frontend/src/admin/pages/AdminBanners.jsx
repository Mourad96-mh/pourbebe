import { useState, useRef } from 'react'
import {
  useAdminBanners,
  useCreateBanner,
  useUpdateBanner,
  useDeleteBanner,
  useUploadImage,
} from '../hooks/useAdmin'
import styles from './AdminBanners.module.css'

const TABS = [
  { key: 'hero',                    label: 'Hero (accueil)' },
  { key: 'home-mid',                label: 'Bannières mid-page' },
  { key: 'birthlist',               label: 'Liste de naissance' },
  { key: 'category-hero',           label: 'Catégories' },
  { key: 'recommended-collection',  label: 'Collections' },
]

const CATEGORY_SLUGS = [
  { slug: 'chambre',     label: 'Chambre & Sommeil' },
  { slug: 'sorties',     label: 'Sorties' },
  { slug: 'hygiene',     label: 'Hygiène' },
  { slug: 'vetements',   label: 'Vêtements' },
  { slug: 'accessoires', label: 'Accessoires' },
  { slug: 'cadeaux',     label: 'Idées Cadeaux' },
  { slug: 'maman',       label: 'Pour Maman' },
]

const TYPE_DESCRIPTIONS = {
  'hero':                   'Diapositives du carrousel principal en haut de la page d\'accueil.',
  'home-mid':               'Deux bannières côte à côte au milieu de la page d\'accueil.',
  'birthlist':              'Bannière de promotion de la liste de naissance (bas de la page d\'accueil).',
  'category-hero':          'Image de couverture pour chaque page catégorie.',
  'recommended-collection': 'Collections recommandées affichées en bas des pages catégories.',
}

const EMPTY_FORM = {
  image: '', tag: '', title: '', subtitle: '',
  ctaText: '', ctaLink: '/', showCta: true, isActive: true,
  order: 0, categorySlug: '',
}

function fieldsByType(type) {
  switch (type) {
    case 'hero':
      return ['image', 'tag', 'title', 'subtitle', 'ctaText', 'ctaLink', 'showCta', 'isActive']
    case 'home-mid':
      return ['image', 'tag', 'title', 'ctaLink', 'showCta', 'isActive']
    case 'birthlist':
      return ['image', 'tag', 'title', 'subtitle', 'ctaText', 'ctaLink', 'showCta', 'isActive']
    case 'category-hero':
      return ['categorySlug', 'image']
    case 'recommended-collection':
      return ['image', 'title', 'subtitle', 'ctaLink', 'isActive']
    default:
      return []
  }
}

export default function AdminBanners() {
  const [activeTab, setActiveTab]     = useState('hero')
  const [modal, setModal]             = useState(null)
  const [form, setForm]               = useState(EMPTY_FORM)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [error, setError]             = useState('')
  const [uploading, setUploading]     = useState(false)
  const fileInputRef                  = useRef(null)

  const { data: banners = [], isLoading } = useAdminBanners(activeTab)
  const createBanner = useCreateBanner()
  const updateBanner = useUpdateBanner()
  const deleteBanner = useDeleteBanner()
  const uploadImage  = useUploadImage()

  const fields = fieldsByType(activeTab)
  const isMulti = ['hero', 'home-mid', 'recommended-collection'].includes(activeTab)
  const canAdd  = activeTab !== 'birthlist' && !(activeTab === 'home-mid' && banners.length >= 2)

  function openCreate() {
    setForm({ ...EMPTY_FORM, order: banners.length })
    setError('')
    setModal('create')
  }

  function openEdit(banner) {
    setForm({
      image:        banner.image        ?? '',
      tag:          banner.tag          ?? '',
      title:        banner.title        ?? '',
      subtitle:     banner.subtitle     ?? '',
      ctaText:      banner.ctaText      ?? '',
      ctaLink:      banner.ctaLink      ?? '/',
      showCta:      banner.showCta      ?? true,
      isActive:     banner.isActive     ?? true,
      order:        banner.order        ?? 0,
      categorySlug: banner.categorySlug ?? '',
    })
    setError('')
    setModal(banner)
  }

  function closeModal() { setModal(null); setError('') }

  function handleField(e) {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  async function handleImageUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadImage.mutateAsync(file)
      setForm((f) => ({ ...f, image: url }))
    } catch {
      setError("Erreur lors du téléchargement de l'image.")
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    const payload = { type: activeTab }
    fields.forEach((f) => { payload[f] = form[f] })

    if (activeTab === 'category-hero' && !form.categorySlug) {
      setError('Veuillez choisir une catégorie.')
      return
    }

    try {
      if (modal === 'create') {
        await createBanner.mutateAsync(payload)
      } else {
        await updateBanner.mutateAsync({ id: modal._id, data: payload })
      }
      closeModal()
    } catch (err) {
      setError(err?.response?.data?.error ?? 'Une erreur est survenue.')
    }
  }

  async function handleDelete() {
    try {
      await deleteBanner.mutateAsync(deleteTarget._id)
      setDeleteTarget(null)
    } catch {
      setDeleteTarget(null)
    }
  }

  async function toggleActive(banner) {
    await updateBanner.mutateAsync({ id: banner._id, data: { isActive: !banner.isActive } })
  }

  async function moveOrder(banner, dir) {
    await updateBanner.mutateAsync({ id: banner._id, data: { order: banner.order + dir } })
  }

  const isSubmitting = createBanner.isPending || updateBanner.isPending

  return (
    <div className={styles.page}>

      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Bannières &amp; Visuels</h1>
          <p className={styles.subtitle}>Gérez les images et liens de toutes les bannières du site</p>
        </div>
        {canAdd && (
          <button onClick={openCreate} className={styles.addBtn}>+ Ajouter</button>
        )}
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

      <p className={styles.typeDesc}>{TYPE_DESCRIPTIONS[activeTab]}</p>

      {/* ── Banner list / single form ── */}
      {activeTab === 'birthlist' ? (
        <BirthlistEditor
          banner={banners[0]}
          onCreate={openCreate}
          onEdit={openEdit}
        />
      ) : (
        <div className={styles.grid}>
          {isLoading && (
            <p className={styles.empty}>Chargement…</p>
          )}
          {!isLoading && banners.length === 0 && (
            <p className={styles.empty}>Aucune bannière pour le moment. Cliquez sur "+ Ajouter" pour commencer.</p>
          )}
          {banners.map((banner) => (
            <BannerCard
              key={banner._id}
              banner={banner}
              type={activeTab}
              onEdit={() => openEdit(banner)}
              onDelete={() => setDeleteTarget(banner)}
              onToggle={() => toggleActive(banner)}
              onMoveUp={() => moveOrder(banner, -1)}
              onMoveDown={() => moveOrder(banner, 1)}
              isMulti={isMulti}
            />
          ))}
        </div>
      )}

      {/* ── Edit / Create modal ── */}
      {modal !== null && (
        <div className={styles.overlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

            <div className={styles.modalHead}>
              <h2 className={styles.modalTitle}>
                {modal === 'create' ? 'Nouvelle bannière' : 'Modifier la bannière'}
              </h2>
              <button onClick={closeModal} className={styles.closeBtn} aria-label="Fermer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>

              {/* Category slug (category-hero only) */}
              {fields.includes('categorySlug') && (
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Catégorie *</span>
                  <select name="categorySlug" value={form.categorySlug} onChange={handleField} required className={styles.select}>
                    <option value="">Choisir une catégorie</option>
                    {CATEGORY_SLUGS.map((c) => (
                      <option key={c.slug} value={c.slug}>{c.label}</option>
                    ))}
                  </select>
                </label>
              )}

              {/* Image upload */}
              {fields.includes('image') && (
                <div className={styles.field}>
                  <span className={styles.fieldLabel}>Image</span>
                  {form.image && (
                    <div className={styles.imagePreview}>
                      <img src={form.image} alt="Aperçu" className={styles.previewImg} />
                      <button
                        type="button"
                        className={styles.removeImg}
                        onClick={() => setForm((f) => ({ ...f, image: '' }))}
                        aria-label="Supprimer l'image"
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  )}
                  {!form.image && (
                    <label className={`${styles.uploadZone} ${uploading ? styles.uploadZoneLoading : ''}`}>
                      {uploading ? (
                        <span className={styles.uploadSpinner} />
                      ) : (
                        <>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                          </svg>
                          <span className={styles.uploadText}>Cliquer pour uploader une image</span>
                          <span className={styles.uploadHint}>JPG, PNG, WebP — max 5 Mo</span>
                        </>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp"
                        className={styles.fileInput}
                        onChange={handleImageUpload}
                        disabled={uploading}
                      />
                    </label>
                  )}
                  <div className={styles.orSep}>ou entrez une URL</div>
                  <input
                    name="image"
                    value={form.image}
                    onChange={handleField}
                    className={styles.input}
                    placeholder="https://…"
                  />
                </div>
              )}

              {/* Tag */}
              {fields.includes('tag') && (
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Étiquette <span className={styles.hint}>(petite ligne au-dessus du titre)</span></span>
                  <input name="tag" value={form.tag} onChange={handleField} className={styles.input} placeholder="Ex : Nouvelle collection 2025" />
                </label>
              )}

              {/* Title */}
              {fields.includes('title') && (
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Titre <span className={styles.hint}>(optionnel)</span></span>
                  <input name="title" value={form.title} onChange={handleField} className={styles.input} placeholder="Titre de la bannière" />
                </label>
              )}

              {/* Subtitle */}
              {fields.includes('subtitle') && (
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Sous-titre / Description</span>
                  <textarea name="subtitle" value={form.subtitle} onChange={handleField} rows={3} className={styles.textarea} placeholder="Description courte…" />
                </label>
              )}

              {/* CTA text + link */}
              {fields.includes('ctaText') && fields.includes('ctaLink') && (
                <div className={styles.row}>
                  <label className={styles.field}>
                    <span className={styles.fieldLabel}>Texte du bouton</span>
                    <input name="ctaText" value={form.ctaText} onChange={handleField} className={styles.input} placeholder="Ex : Découvrir" />
                  </label>
                  <label className={styles.field}>
                    <span className={styles.fieldLabel}>Lien du bouton</span>
                    <input name="ctaLink" value={form.ctaLink} onChange={handleField} className={styles.input} placeholder="/categorie/chambre" />
                  </label>
                </div>
              )}

              {/* CTA link only (home-mid) */}
              {fields.includes('ctaLink') && !fields.includes('ctaText') && (
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Lien de la bannière</span>
                  <input name="ctaLink" value={form.ctaLink} onChange={handleField} className={styles.input} placeholder="/categorie/chambre" />
                </label>
              )}

              {/* Toggles */}
              <div className={styles.checks}>
                {fields.includes('showCta') && (
                  <label className={styles.checkLabel}>
                    <input type="checkbox" name="showCta" checked={form.showCta} onChange={handleField} className={styles.checkbox} />
                    Afficher le bouton "Découvrir"
                  </label>
                )}
                {fields.includes('isActive') && (
                  <label className={styles.checkLabel}>
                    <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleField} className={styles.checkbox} />
                    Bannière active (visible sur le site)
                  </label>
                )}
              </div>

              {/* Order (hero + collections) */}
              {(activeTab === 'hero' || activeTab === 'recommended-collection') && (
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Ordre d'affichage</span>
                  <input name="order" type="number" min="0" value={form.order} onChange={handleField} className={styles.input} style={{ maxWidth: 120 }} />
                </label>
              )}

              {error && <p className={styles.error}>{error}</p>}

              <div className={styles.formFooter}>
                <button type="button" onClick={closeModal} className={styles.cancelBtn}>Annuler</button>
                <button type="submit" className={styles.submitBtn} disabled={isSubmitting || uploading}>
                  {isSubmitting ? 'Enregistrement…' : modal === 'create' ? 'Créer' : 'Enregistrer'}
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
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
              </svg>
            </div>
            <p className={styles.confirmTitle}>Supprimer cette bannière ?</p>
            <p className={styles.confirmText}>
              <strong>{deleteTarget.title || deleteTarget.categorySlug || 'Cette bannière'}</strong> sera définitivement supprimée.
            </p>
            <div className={styles.confirmActions}>
              <button onClick={() => setDeleteTarget(null)} className={styles.cancelBtn}>Annuler</button>
              <button onClick={handleDelete} className={styles.deleteConfirmBtn} disabled={deleteBanner.isPending}>
                {deleteBanner.isPending ? 'Suppression…' : 'Supprimer'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

/* ── Sub-components ── */

function BannerCard({ banner, type, onEdit, onDelete, onToggle, onMoveUp, onMoveDown, isMulti }) {
  const label = type === 'category-hero'
    ? (banner.categorySlug ?? '—')
    : (banner.title || banner.ctaLink || '—')

  return (
    <div className={`${styles.card} ${!banner.isActive ? styles.cardInactive : ''}`}>
      {banner.image ? (
        <img src={banner.image} alt={label} className={styles.cardImg} />
      ) : (
        <div className={styles.cardImgEmpty}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
      )}

      <div className={styles.cardBody}>
        {banner.tag && <span className={styles.cardTag}>{banner.tag}</span>}
        <p className={styles.cardTitle}>{label}</p>
        {banner.ctaLink && type !== 'category-hero' && (
          <p className={styles.cardLink}>{banner.ctaLink}</p>
        )}
        <div className={styles.cardMeta}>
          {typeof banner.isActive === 'boolean' && (
            <span className={banner.isActive ? styles.activeBadge : styles.inactiveBadge}>
              {banner.isActive ? 'Actif' : 'Inactif'}
            </span>
          )}
        </div>
      </div>

      <div className={styles.cardActions}>
        {isMulti && (
          <div className={styles.orderBtns}>
            <button onClick={onMoveUp} className={styles.orderBtn} title="Monter" aria-label="Monter">▲</button>
            <button onClick={onMoveDown} className={styles.orderBtn} title="Descendre" aria-label="Descendre">▼</button>
          </div>
        )}
        {typeof banner.isActive === 'boolean' && (
          <button onClick={onToggle} className={banner.isActive ? styles.toggleOn : styles.toggleOff}>
            {banner.isActive ? 'Désactiver' : 'Activer'}
          </button>
        )}
        <button onClick={onEdit} className={styles.editBtn} title="Modifier">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
        <button onClick={onDelete} className={styles.deleteBtn} title="Supprimer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function BirthlistEditor({ banner, onCreate, onEdit }) {
  if (!banner) {
    return (
      <div className={styles.birthlistEmpty}>
        <p>Aucune bannière configurée.</p>
        <button onClick={onCreate} className={styles.addBtn}>Créer la bannière</button>
      </div>
    )
  }
  return (
    <div className={styles.birthlistCard}>
      <div className={styles.birthlistInfo}>
        <p className={styles.birthlistTag}>{banner.tag}</p>
        <p className={styles.birthlistTitle}>{banner.title}</p>
        {banner.subtitle && <p className={styles.birthlistSub}>{banner.subtitle}</p>}
        <p className={styles.birthlistCta}>{banner.ctaText} → {banner.ctaLink}</p>
      </div>
      <button onClick={() => onEdit(banner)} className={styles.editBtnLg}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
        Modifier
      </button>
    </div>
  )
}
