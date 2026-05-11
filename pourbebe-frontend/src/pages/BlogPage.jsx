import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePosts } from '../hooks/usePosts'
import SEO from '../components/ui/SEO'
import Spinner from '../components/ui/Spinner'
import styles from './BlogPage.module.css'

const CATEGORIES = [
  { value: '',          label: 'Tous les articles' },
  { value: 'conseils',  label: 'Conseils' },
  { value: 'produits',  label: 'Guide Produits' },
  { value: 'naissance', label: 'Naissance & Grossesse' },
  { value: 'sante',     label: 'Santé & Bien-être' },
]

const CATEGORY_LABELS = {
  conseils:  'Conseils',
  produits:  'Guide Produits',
  naissance: 'Naissance',
  sante:     'Santé',
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Conseils Pour Bébé — Blog de Pour Bébé',
  description: 'Guides et conseils pour les parents marocains : choix du lit bébé, taille gigoteuse, cadeaux de naissance et plus.',
  url: 'https://pourbebes.ma/blog',
  publisher: { '@type': 'Organization', name: 'Pour Bébé', url: 'https://pourbebes.ma' },
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('')
  const { data, isLoading } = usePosts(activeCategory ? { category: activeCategory } : {})
  const posts = data?.posts ?? []

  return (
    <div className={styles.page}>
      <SEO
        title="Conseils pour Parents — Blog"
        description="Guides et conseils pour les parents marocains : choix du lit bébé, taille de gigoteuse, cadeaux de naissance, poussettes et plus."
        canonical="/blog"
        schema={blogSchema}
      />

      <div className={styles.hero}>
        <p className={styles.heroTag}>Le blog</p>
        <h1 className={styles.heroTitle}>Conseils pour <em>Parents</em></h1>
        <p className={styles.heroDesc}>Guides pratiques, sélections produits et conseils d'experts pour les parents marocains.</p>
      </div>

      <div className={styles.tabsWrap}>
        <div className={styles.tabs}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              className={`${styles.tab} ${activeCategory === cat.value ? styles.tabActive : ''}`}
              onClick={() => setActiveCategory(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.inner}>
        {isLoading ? (
          <Spinner />
        ) : posts.length === 0 ? (
          <p className={styles.empty}>Aucun article pour le moment.</p>
        ) : (
          <div className={styles.grid}>
            {posts.map(post => (
              <Link key={post._id} to={`/blog/${post.slug}`} className={styles.card}>
                <div className={styles.cardImgWrap}>
                  {post.coverImage
                    ? <img src={post.coverImage} alt={post.title} className={styles.cardImg} loading="lazy" />
                    : <div className={styles.cardImgPlaceholder} />
                  }
                  {post.category && (
                    <span className={styles.cardBadge}>{CATEGORY_LABELS[post.category] ?? post.category}</span>
                  )}
                </div>
                <div className={styles.cardBody}>
                  <h2 className={styles.cardTitle}>{post.title}</h2>
                  <p className={styles.cardExcerpt}>{post.excerpt}</p>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardDate}>{formatDate(post.publishedAt)}</span>
                    <span className={styles.cardReadMore}>Lire l'article →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
