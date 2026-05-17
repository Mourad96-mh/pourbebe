import { useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { useCategory, useCategories, useProducts } from '../hooks/useProducts'
import { useBanners } from '../hooks/useBanners'
import SEO from '../components/ui/SEO'
import ProductCard from '../components/product/ProductCard'
import ProductFilters from '../components/product/ProductFilters'
import Spinner from '../components/ui/Spinner'
import styles from './CategoryPage.module.css'

const SORT_OPTIONS = [
  { value: 'newest',      label: 'Tri du plus récent au plus ancien' },
  { value: 'price-asc',   label: 'Prix : croissant' },
  { value: 'price-desc',  label: 'Prix : décroissant' },
  { value: 'bestsellers', label: 'Meilleures ventes' },
]

const PAGE_SIZE = 12

const HERO_IMAGES_FALLBACK = {
  chambre:     '/chambre-enfant.jpg',
  sorties:     '/hero-img.jpeg',
  hygiene:     '/hero-img.jpeg',
  vetements:   '/hero-img.jpeg',
  accessoires: '/hero-img.jpeg',
  cadeaux:     '/hero-img.jpeg',
  promotions:  '/hero-img.jpeg',
}

const RECOMMENDED_FALLBACK = [
  { _id: 'rc-1', title: 'Bain Bébé',          subtitle: '59 articles', image: '/chambre-enfant.jpg', ctaLink: '/categorie/hygiene' },
  { _id: 'rc-2', title: 'Bavoirs',             subtitle: '20 articles', image: '/nouveautes.webp',    ctaLink: '/categorie/accessoires' },
  { _id: 'rc-3', title: 'Nouvelle Collection', subtitle: null,          image: '/hero-img.jpeg',      ctaLink: '/categorie/vetements' },
]

const SPECIAL_SLUGS = ['promotions', 'cadeaux']

function buildPageNumbers(current, total) {
  if (total <= 6) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = [1, 2, 3, 4]
  if (!pages.includes(total)) { pages.push('...'); pages.push(total) }
  return pages
}

export default function CategoryPage() {
  const { slug }                       = useParams()
  const [searchParams]                 = useSearchParams()
  const [filters, setFilters]          = useState({})
  const [sort, setSort]                = useState('newest')
  const [page, setPage]                = useState(1)
  const [filtersOpen, setFiltersOpen]  = useState(false)

  const isNew       = searchParams.get('isNew') === 'true'
  const isPromo     = slug === 'promotions'
  const isGiftIdeas = slug === 'cadeaux'
  const isSpecial   = SPECIAL_SLUGS.includes(slug)

  const { data: categoryData }        = useCategory(isSpecial ? null : slug)
  const { data: allCategories = [] }  = useCategories()
  const { data: categoryHeroBanners } = useBanners('category-hero')
  const { data: collectionBanners }   = useBanners('recommended-collection')

  // Build API params depending on page type
  const { subCategory, ages, gender, min, max } = filters
  const apiParams = {
    sort,
    ...(min  ? { min }  : {}),
    ...(max  ? { max }  : {}),
    ...(gender ? { gender } : {}),
    ...(ages?.length ? { age: ages[0] } : {}),
    ...(isPromo     ? { onSale: true }      : {}),
    ...(isGiftIdeas ? { isGiftIdea: true }  : {}),
    ...(!isSpecial  ? { category: subCategory || slug } : {}),
    ...(isNew && !isSpecial ? { isNew: true } : {}),
  }

  const { data, isLoading } = useProducts(apiParams)

  // Unfiltered for counts (no subCategory, no gender, no age, no price)
  const unfilteredParams = {
    ...(!isSpecial  ? { category: slug } : {}),
    ...(isPromo     ? { onSale: true }     : {}),
    ...(isGiftIdeas ? { isGiftIdea: true } : {}),
    ...(isNew && !isSpecial ? { isNew: true } : {}),
  }
  const { data: unfilteredData } = useProducts(unfilteredParams)

  const allProducts = unfilteredData?.products ?? []

  // Subcategories: find from full tree for the current parent category
  const parentCatInTree = allCategories.find(c => c.slug === slug)
  const subcategories   = categoryData?.category?.children ?? parentCatInTree?.children ?? []

  // Compute counts
  const subCategoryCounts = {}
  const genderCounts      = {}
  const ageCounts         = {}
  allProducts.forEach(p => {
    if (p.categorySlug) subCategoryCounts[p.categorySlug] = (subCategoryCounts[p.categorySlug] || 0) + 1
    if (p.gender) {
      // unisexe counts for all genders
      if (p.gender === 'unisexe') {
        genderCounts['fille']   = (genderCounts['fille']   || 0) + 1
        genderCounts['garcon']  = (genderCounts['garcon']  || 0) + 1
        genderCounts['unisexe'] = (genderCounts['unisexe'] || 0) + 1
      } else {
        genderCounts[p.gender] = (genderCounts[p.gender] || 0) + 1
      }
    }
    if (p.ageRange) ageCounts[p.ageRange] = (ageCounts[p.ageRange] || 0) + 1
  })

  const products    = data?.products ?? []
  const total       = data?.total ?? 0
  const totalPages  = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const pageProducts = products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const categoryName = isPromo
    ? 'Promotions'
    : isGiftIdeas
    ? 'Idées Cadeaux'
    : isNew
    ? 'Nouveautés'
    : (categoryData?.category?.name ?? slug)

  const heroBanner = (categoryHeroBanners ?? []).find((b) => b.categorySlug === slug)
  const heroImage  = heroBanner?.image || HERO_IMAGES_FALLBACK[slug] || '/hero-img.jpeg'
  const collections = (collectionBanners ?? []).length > 0 ? (collectionBanners ?? []) : RECOMMENDED_FALLBACK

  function handleFiltersChange(f) {
    setFilters(f)
    setPage(1)
  }

  function handleSort(e) {
    setSort(e.target.value)
    setPage(1)
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://pourbebes.ma/' },
      { '@type': 'ListItem', position: 2, name: categoryName, item: `https://pourbebes.ma/categorie/${slug}` },
    ],
  }

  return (
    <div className={styles.page}>
      <SEO
        title={`${categoryName} — Achat en ligne au Maroc`}
        description={`Découvrez notre sélection ${categoryName} pour bébé. ${total} produits disponibles avec livraison gratuite dès 400 DH au Maroc.`}
        canonical={`/categorie/${slug}`}
        schema={breadcrumbSchema}
      />

      {/* ── Breadcrumb ── */}
      <div className={styles.breadcrumbWrap}>
        <div className={styles.breadcrumbInner}>
          <Link to="/" className={styles.breadHome} aria-label="Accueil">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </Link>
          <span className={styles.breadSep}>›</span>
          <span className={styles.breadCurrent}>{categoryName}</span>
        </div>
      </div>

      {/* ── Hero banner ── */}
      <div className={styles.hero} style={{ backgroundImage: `url(${heroImage})` }}>
        <div className={styles.heroOverlay} />
        <h1 className={styles.heroTitle}>{categoryName}</h1>
      </div>

      {/* ── Main layout ── */}
      <div className={styles.inner}>
        <div className={styles.layout}>

          <div className={`${styles.filterWrap} ${filtersOpen ? styles.filterWrapOpen : ''}`}>
            <ProductFilters
              filters={filters}
              onChange={handleFiltersChange}
              subcategories={subcategories}
              subCategoryCounts={subCategoryCounts}
              genderCounts={genderCounts}
              ageCounts={ageCounts}
              onClose={() => setFiltersOpen(false)}
            />
          </div>

          <div className={styles.content}>

            {/* Results bar */}
            <div className={styles.resultsBar}>
              <div className={styles.resultsLeft}>
                <button
                  className={styles.filterToggle}
                  onClick={() => setFiltersOpen(v => !v)}
                  aria-expanded={filtersOpen}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                    <line x1="10" y1="18" x2="14" y2="18" />
                  </svg>
                  Filtrer
                  <svg
                    width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2"
                    style={{ transform: filtersOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <p className={styles.resultCount}>
                  {isLoading ? '…' : `${total} résultats`}
                </p>
              </div>
              <select className={styles.sortSelect} value={sort} onChange={handleSort}>
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {/* Grid */}
            {isLoading ? (
              <Spinner />
            ) : pageProducts.length === 0 ? (
              <p className={styles.empty}>Aucun produit trouvé.</p>
            ) : (
              <div className={styles.grid}>
                {pageProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className={styles.pagination}>
                {buildPageNumbers(page, totalPages).map((p, i) =>
                  p === '...' ? (
                    <span key={`el-${i}`} className={styles.ellipsis}>…</span>
                  ) : (
                    <button
                      key={p}
                      className={`${styles.pageBtn} ${page === p ? styles.pageBtnActive : ''}`}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Collections recommandées ── */}
      {collections.length > 0 && (
        <section className={styles.collectionsSection}>
          <h2 className={styles.collectionsTitle}>Collections recommandées</h2>
          <div className={styles.collectionsGrid}>
            {collections.map((col) => (
              <Link key={col._id} to={col.ctaLink ?? '/'} className={styles.collectionCard}>
                <div className={styles.collectionImgWrap}>
                  <img src={col.image} alt={col.title} className={styles.collectionImg} />
                </div>
                <p className={styles.collectionName}>{col.title}</p>
                {col.subtitle && (
                  <p className={styles.collectionCount}>{col.subtitle}</p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  )
}
