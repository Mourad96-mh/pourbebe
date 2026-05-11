import { Link, useParams } from 'react-router-dom'
import { usePost, usePosts } from '../hooks/usePosts'
import SEO from '../components/ui/SEO'
import Spinner from '../components/ui/Spinner'
import styles from './BlogPostPage.module.css'

const CATEGORY_LABELS = {
  conseils:  'Conseils',
  produits:  'Guide Produits',
  naissance: 'Naissance',
  sante:     'Santé',
}

const CATEGORY_IMAGES = {
  conseils:  '/chambre-enfant.jpg',
  produits:  '/hero-img.jpeg',
  naissance: '/nouveautes.webp',
  sante:     '/example-home.jpeg',
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const { data: post, isLoading } = usePost(slug)
  const { data: allData } = usePosts({})
  const related = (allData?.posts ?? []).filter(p => p.slug !== slug).slice(0, 3)

  if (isLoading) return <Spinner />
  if (!post) return <p className={styles.notFound}>Article introuvable.</p>

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage || 'https://pourbebes.ma/hero-img.jpeg',
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Organization', name: 'Pour Bébé' },
    publisher: {
      '@type': 'Organization',
      name: 'Pour Bébé',
      logo: { '@type': 'ImageObject', url: 'https://pourbebes.ma/logo.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://pourbebes.ma/blog/${post.slug}` },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://pourbebes.ma/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://pourbebes.ma/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://pourbebes.ma/blog/${post.slug}` },
    ],
  }

  return (
    <div className={styles.page}>
      <SEO
        title={post.title}
        description={post.excerpt}
        canonical={`/blog/${post.slug}`}
        image={post.coverImage}
        type="article"
        schema={{ '@context': 'https://schema.org', '@graph': [articleSchema, breadcrumbSchema] }}
      />

      <div className={styles.breadcrumbWrap}>
        <nav className={styles.breadcrumb}>
          <Link to="/" className={styles.crumb}>Accueil</Link>
          <span className={styles.sep}>/</span>
          <Link to="/blog" className={styles.crumb}>Blog</Link>
          <span className={styles.sep}>/</span>
          <span className={styles.crumbCurrent}>{post.title}</span>
        </nav>
      </div>

      <div className={styles.articleWrap}>
        <header className={styles.header}>
          {post.category && (
            <span className={styles.badge}>{CATEGORY_LABELS[post.category] ?? post.category}</span>
          )}
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.meta}>{formatDate(post.publishedAt)} · Par l'équipe Pour Bébé</p>
        </header>

        {post.coverImage && (
          <div className={styles.coverWrap}>
            <img src={post.coverImage} alt={post.title} className={styles.coverImg} />
          </div>
        )}

        <div
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      </div>

      {related.length > 0 && (
        <section className={styles.relatedSection}>
          <div className={styles.relatedInner}>
            <p className={styles.relatedTag}>À lire aussi</p>
            <h2 className={styles.relatedTitle}>Articles <em>similaires</em></h2>
            <div className={styles.relatedGrid}>
              {related.map(p => (
                <Link key={p._id} to={`/blog/${p.slug}`} className={styles.relatedCard}>
                  <img
                    src={p.coverImage || CATEGORY_IMAGES[p.category] || '/hero-img.jpeg'}
                    alt={p.title}
                    className={styles.relatedImg}
                    loading="lazy"
                  />
                  <div className={styles.relatedCardBody}>
                    {p.category && (
                      <span className={styles.relatedBadge}>{CATEGORY_LABELS[p.category] ?? p.category}</span>
                    )}
                    <p className={styles.relatedCardTitle}>{p.title}</p>
                    <p className={styles.relatedDate}>{formatDate(p.publishedAt)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
