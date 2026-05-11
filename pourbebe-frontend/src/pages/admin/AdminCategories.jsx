import { useState } from 'react'
import {
  useAdminCategoryTree,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from '../../hooks/useAdmin'
import styles from './AdminCategories.module.css'

const EMPTY_FORM = { name: '', parentId: '' }

export default function AdminCategories() {
  const { data: tree = [], isLoading } = useAdminCategoryTree()
  const createCategory = useCreateCategory()
  const updateCategory = useUpdateCategory()
  const deleteCategory = useDeleteCategory()

  const [modal, setModal]           = useState(null)
  const [form, setForm]             = useState(EMPTY_FORM)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [error, setError]           = useState('')

  const parents = tree

  function openCreate(parentId = '') {
    setForm({ name: '', parentId })
    setError('')
    setModal('create')
  }

  function openEdit(cat, parentId = '') {
    setForm({ name: cat.name, parentId })
    setError('')
    setModal(cat)
  }

  function closeModal() { setModal(null); setError('') }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      if (modal === 'create') {
        await createCategory.mutateAsync({
          name: form.name,
          parentId: form.parentId || null,
        })
      } else {
        await updateCategory.mutateAsync({
          id: modal._id,
          data: { name: form.name },
        })
      }
      closeModal()
    } catch (err) {
      setError(err?.response?.data?.error ?? 'Une erreur est survenue.')
    }
  }

  async function handleDelete() {
    try {
      await deleteCategory.mutateAsync(deleteTarget._id)
      setDeleteTarget(null)
    } catch (err) {
      setDeleteTarget(null)
      setError(err?.response?.data?.error ?? 'Suppression impossible.')
    }
  }

  const totalCount = tree.reduce((n, p) => n + 1 + (p.children?.length ?? 0), 0)

  return (
    <div className={styles.page}>

      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Catégories</h1>
          <p className={styles.subtitle}>{totalCount} catégorie{totalCount !== 1 ? 's' : ''} au total</p>
        </div>
        <button className={styles.addBtn} onClick={() => openCreate('')}>
          + Ajouter une catégorie
        </button>
      </header>

      {error && !modal && <p className={styles.globalError}>{error}</p>}

      <div className={styles.tree}>
        {isLoading && <p className={styles.loading}>Chargement…</p>}

        {!isLoading && tree.length === 0 && (
          <div className={styles.empty}>
            <p>Aucune catégorie. Commencez par en créer une.</p>
          </div>
        )}

        {tree.map((parent) => (
          <div key={parent._id} className={styles.parentBlock}>

            {/* ── Parent row ── */}
            <div className={styles.parentRow}>
              <div className={styles.rowLeft}>
                <span className={styles.parentDot} />
                <span className={styles.parentName}>{parent.name}</span>
                <span className={styles.parentSlug}>/{parent.slug}</span>
                {(parent.children?.length ?? 0) > 0 && (
                  <span className={styles.childCount}>
                    {parent.children.length} sous-catégorie{parent.children.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <div className={styles.rowActions}>
                <button className={styles.subBtn} onClick={() => openCreate(String(parent._id))} title="Ajouter une sous-catégorie">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Sous-catégorie
                </button>
                <button className={styles.editBtn} onClick={() => openEdit(parent, '')} title="Modifier">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
                <button className={styles.deleteBtn} onClick={() => setDeleteTarget(parent)} title="Supprimer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                  </svg>
                </button>
              </div>
            </div>

            {/* ── Children ── */}
            {(parent.children ?? []).length > 0 && (
              <div className={styles.children}>
                {parent.children.map((sub) => (
                  <div key={sub._id} className={styles.childRow}>
                    <div className={styles.rowLeft}>
                      <span className={styles.childLine} />
                      <span className={styles.childDot} />
                      <span className={styles.childName}>{sub.name}</span>
                      <span className={styles.parentSlug}>/{sub.slug}</span>
                    </div>
                    <div className={styles.rowActions}>
                      <button className={styles.editBtn} onClick={() => openEdit(sub, String(parent._id))} title="Modifier">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button className={styles.deleteBtn} onClick={() => setDeleteTarget(sub)} title="Supprimer">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                          <path d="M10 11v6M14 11v6" />
                          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        ))}
      </div>

      {/* ── Create / Edit modal ── */}
      {modal !== null && (
        <div className={styles.overlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHead}>
              <h2 className={styles.modalTitle}>
                {modal === 'create'
                  ? (form.parentId ? 'Nouvelle sous-catégorie' : 'Nouvelle catégorie')
                  : 'Modifier la catégorie'}
              </h2>
              <button onClick={closeModal} className={styles.closeBtn} aria-label="Fermer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              {form.parentId && modal === 'create' && (
                <p className={styles.parentHint}>
                  Sous-catégorie de :{' '}
                  <strong>{parents.find((p) => String(p._id) === form.parentId)?.name}</strong>
                </p>
              )}

              <label className={styles.field}>
                <span className={styles.fieldLabel}>Nom *</span>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  required
                  className={styles.input}
                  placeholder="Nom de la catégorie"
                  autoFocus
                />
                <span className={styles.fieldHint}>Le slug est généré automatiquement depuis le nom.</span>
              </label>

              {modal === 'create' && !form.parentId && (
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Catégorie parente (optionnel)</span>
                  <select
                    value={form.parentId}
                    onChange={(e) => setForm((f) => ({ ...f, parentId: e.target.value }))}
                    className={styles.select}
                  >
                    <option value="">— Catégorie principale —</option>
                    {parents.map((p) => (
                      <option key={p._id} value={String(p._id)}>{p.name}</option>
                    ))}
                  </select>
                </label>
              )}

              {error && <p className={styles.error}>{error}</p>}

              <div className={styles.formFooter}>
                <button type="button" onClick={closeModal} className={styles.cancelBtn}>Annuler</button>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={createCategory.isPending || updateCategory.isPending}
                >
                  {createCategory.isPending || updateCategory.isPending
                    ? 'Enregistrement…'
                    : modal === 'create' ? 'Créer' : 'Enregistrer'}
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
            <p className={styles.confirmTitle}>Supprimer cette catégorie ?</p>
            <p className={styles.confirmText}>
              <strong>{deleteTarget.name}</strong> sera définitivement supprimée. Impossible si des produits y sont assignés.
            </p>
            <div className={styles.confirmActions}>
              <button onClick={() => setDeleteTarget(null)} className={styles.cancelBtn}>Annuler</button>
              <button
                onClick={handleDelete}
                className={styles.deleteConfirmBtn}
                disabled={deleteCategory.isPending}
              >
                {deleteCategory.isPending ? 'Suppression…' : 'Supprimer'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
