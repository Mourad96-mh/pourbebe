import { useState } from 'react'
import {
  useAdminPosts,
  useCreatePost,
  useUpdatePost,
  useDeletePost,
} from '../hooks/useAdmin'
import styles from './AdminBlog.module.css'

const CATEGORIES = [
  { value: 'conseils',  label: 'Conseils' },
  { value: 'produits',  label: 'Guide Produits' },
  { value: 'naissance', label: 'Naissance & Grossesse' },
  { value: 'sante',     label: 'Santé & Bien-être' },
]

const EMPTY_FORM = {
  title: '', slug: '', excerpt: '', body: '',
  coverImage: '', category: 'conseils', published: true,
}

function slugify(str) {
  return str.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function AdminBlog() {
  const { data: posts = [], isLoading } = useAdminPosts()
  const createPost = useCreatePost()
  const updatePost = useUpdatePost()
  const deletePost = useDeletePost()

  const [editing, setEditing] = useState(null)
  const [form, setForm]       = useState(EMPTY_FORM)
  const [error, setError]     = useState('')

  function openCreate() {
    setEditing('new')
    setForm(EMPTY_FORM)
    setError('')
  }

  function openEdit(post) {
    setEditing(post._id)
    setForm({
      title:      post.title,
      slug:       post.slug,
      excerpt:    post.excerpt,
      body:       post.body,
      coverImage: post.coverImage,
      category:   post.category,
      published:  post.published,
    })
    setError('')
  }

  function closeForm() {
    setEditing(null)
    setForm(EMPTY_FORM)
    setError('')
  }

  function handleTitleChange(e) {
    const title = e.target.value
    setForm(f => ({
      ...f,
      title,
      slug: editing === 'new' ? slugify(title) : f.slug,
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      if (editing === 'new') {
        await createPost.mutateAsync(form)
      } else {
        await updatePost.mutateAsync({ id: editing, data: form })
      }
      closeForm()
    } catch (err) {
      setError(err.response?.data?.error ?? 'Une erreur est survenue.')
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Supprimer cet article ?')) return
    await deletePost.mutateAsync(id)
    if (editing === id) closeForm()
  }

  const isPending = createPost.isPending || updatePost.isPending

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Blog</h1>
        <button className={styles.addBtn} onClick={openCreate}>+ Nouvel article</button>
      </div>

      <div className={styles.layout}>
        {/* ── Post list ── */}
        <div className={styles.list}>
          {isLoading ? (
            <p className={styles.loading}>Chargement…</p>
          ) : posts.length === 0 ? (
            <p className={styles.empty}>Aucun article. Créez le premier !</p>
          ) : (
            posts.map(post => (
              <div
                key={post._id}
                className={`${styles.row} ${editing === post._id ? styles.rowActive : ''}`}
              >
                <div className={styles.rowInfo}>
                  <span className={`${styles.statusDot} ${post.published ? styles.dotPublished : styles.dotDraft}`} />
                  <div>
                    <p className={styles.rowTitle}>{post.title}</p>
                    <p className={styles.rowMeta}>{formatDate(post.publishedAt)} · {post.category}</p>
                  </div>
                </div>
                <div className={styles.rowActions}>
                  <button className={styles.editBtn} onClick={() => openEdit(post)}>Modifier</button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(post._id)}
                    disabled={deletePost.isPending}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ── Form ── */}
        {editing && (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>{editing === 'new' ? 'Nouvel article' : 'Modifier l\'article'}</h2>
              <button type="button" className={styles.closeBtn} onClick={closeForm}>✕</button>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.field}>
              <label className={styles.label}>Titre</label>
              <input
                className={styles.input}
                value={form.title}
                onChange={handleTitleChange}
                required
                placeholder="Quel lit bébé choisir au Maroc ?"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Slug (URL)</label>
              <input
                className={styles.input}
                value={form.slug}
                onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                required
                placeholder="quel-lit-bebe-choisir-maroc"
              />
            </div>

            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label className={styles.label}>Catégorie</label>
                <select
                  className={styles.select}
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                >
                  {CATEGORIES.map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Statut</label>
                <select
                  className={styles.select}
                  value={form.published ? 'published' : 'draft'}
                  onChange={e => setForm(f => ({ ...f, published: e.target.value === 'published' }))}
                >
                  <option value="published">Publié</option>
                  <option value="draft">Brouillon</option>
                </select>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Image de couverture (URL)</label>
              <input
                className={styles.input}
                value={form.coverImage}
                onChange={e => setForm(f => ({ ...f, coverImage: e.target.value }))}
                placeholder="https://res.cloudinary.com/…"
              />
              {form.coverImage && (
                <img src={form.coverImage} alt="" className={styles.imgPreview} />
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Extrait (meta description)</label>
              <textarea
                className={styles.textarea}
                rows={3}
                value={form.excerpt}
                onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
                required
                placeholder="Court résumé de l'article (150 caractères idéalement)"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Corps de l'article (HTML)</label>
              <textarea
                className={styles.bodyTextarea}
                rows={20}
                value={form.body}
                onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
                placeholder="<h2>Titre section</h2><p>Contenu…</p>"
              />
            </div>

            <div className={styles.formActions}>
              <button type="button" className={styles.cancelBtn} onClick={closeForm}>Annuler</button>
              <button type="submit" className={styles.saveBtn} disabled={isPending}>
                {isPending ? 'Enregistrement…' : editing === 'new' ? 'Publier' : 'Enregistrer'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
