import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProduct, useProducts, useCategories } from '../hooks/useProducts'
import { useCuration } from '../hooks/useCuration'
import { useMyBirthList } from '../hooks/useMyBirthList'
import { useAuth } from '../hooks/useAuth'
import ProductGallery from '../components/product/ProductGallery'
import ProductCard from '../components/product/ProductCard'
import Spinner from '../components/ui/Spinner'
import { formatPrice, getDiscountPercent, truncate, stripHtml, renderDescription } from '../lib/utils'
import useCart from '../hooks/useCart'
import useWishlist from '../hooks/useWishlist'
import SEO from '../components/ui/SEO'
import styles from './ProductPage.module.css'

const PER_PAGE = 5

const DOT_PAGES = 3

function RelatedFooter({ page, pageCount, categorySlug, onChange }) {
  return (
    <div className={styles.relatedFooter}>
      {pageCount > 1 && (
        <div className={styles.dots}>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map(n => (
            <button
              key={n}
              className={`${styles.dot} ${n === page ? styles.dotActive : ''}`}
              onClick={() => onChange(n)}
              aria-label={`Page ${n}`}
            />
          ))}
        </div>
      )}
      <Link to={`/categorie/${categorySlug}`} className={styles.seeAllBtn}>
        Voir tous les produits
      </Link>
    </div>
  )
}

function Accordion({ icon, label, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={styles.accordion}>
      <button className={styles.accordionTrigger} onClick={() => setOpen(o => !o)}>
        <span className={styles.accordionIcon}>{icon}</span>
        <span className={styles.accordionLabel}>{label}</span>
        <svg
          className={`${styles.accordionChevron} ${open ? styles.chevronOpen : ''}`}
          width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && <div className={styles.accordionBody}>{children}</div>}
    </div>
  )
}

export default function ProductPage() {
  const { slug }             = useParams()
  const { data: product, isLoading } = useProduct(slug)
  const { data: categoriesTree = [] } = useCategories()
  const addItem              = useCart((s) => s.addItem)
  const openCart             = useCart((s) => s.openCart)
  const toggle               = useWishlist((s) => s.toggle)
  const isWishlisted         = useWishlist((s) => product ? s.has(product.id) : false)
  const { user }             = useAuth()
  const { list, listLoading, addProduct, isInList } = useMyBirthList()
  const [qty, setQty]                   = useState(1)
  const [selectedSize, setSelectedSize] = useState('')
  const [sizeError, setSizeError]       = useState(false)
  const [relatedPage, setRelatedPage]   = useState(1)

  useEffect(() => { setRelatedPage(1) }, [slug])

  const { data: relatedData } = useProducts(product ? { category: product.categorySlug } : {})
  const { data: allData }     = useProducts({})

  const { data: curatedRelated   = [] } = useCuration('related', product?.slug)
  const { data: curatedSuggested = [] } = useCuration('suggested')

  if (isLoading) return <Spinner />
  if (!product)  return <p className={styles.notFound}>Produit introuvable.</p>

  const discount       = getDiscountPercent(product.price, product.compareAt)
  const stockStatus    = product.stockStatus ?? (product.inStock ? 'in_stock' : 'on_order')

  let category = null
  let parentCategory = null
  for (const parent of categoriesTree) {
    if (parent.slug === product.categorySlug) { category = parent; break }
    const child = (parent.children ?? []).find(c => c.slug === product.categorySlug)
    if (child) { category = child; parentCategory = parent; break }
  }

  // Fallback when nothing is curated in the back office: the 5 most recent,
  // in-stock products of the same category and same gender (unisexe matches all).
  const sameTypeRecent = (relatedData?.products ?? [])
    .filter(p =>
      p.id !== product.id &&
      (p.inStock ?? true) &&
      (!product.gender || p.gender === product.gender || p.gender === 'unisexe')
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, PER_PAGE)

  const allRelated = curatedRelated.length > 0
    ? curatedRelated.filter(p => String(p._id ?? p.id) !== String(product._id ?? product.id)).slice(0, DOT_PAGES * PER_PAGE)
    : sameTypeRecent
  const relatedPageCount = Math.max(1, Math.ceil(allRelated.length / PER_PAGE))
  const related = allRelated.slice((relatedPage - 1) * PER_PAGE, relatedPage * PER_PAGE)

  const suggested = curatedSuggested.length > 0
    ? curatedSuggested.filter(p => String(p._id ?? p.id) !== String(product._id ?? product.id)).slice(0, 5)
    : allData?.products?.filter(p => p.id !== product.id && p.categorySlug !== product.categorySlug && (p.compareAt || p.isNewArrival)).slice(0, 5) ?? []

  const whatsappUrl = `https://wa.me/212696716187?text=${encodeURIComponent(`Bonjour, je souhaite commander : ${product.name}`)}`

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images ?? [],
    brand: { '@type': 'Brand', name: product.brand },
    sku: product.slug,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'MAD',
      price: product.price,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `https://pourbebes.ma/produit/${product.slug}`,
      seller: { '@type': 'Organization', name: 'Pour Bébé' },
    },
    ...(product.rating && product.reviewCount ? {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: String(product.rating),
        reviewCount: String(product.reviewCount),
        bestRating: '5',
        worstRating: '1',
      },
    } : {}),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://pourbebes.ma/' },
      ...(parentCategory ? [{ '@type': 'ListItem', position: 2, name: parentCategory.name, item: `https://pourbebes.ma/categorie/${parentCategory.slug}` }] : []),
      ...(category ? [{ '@type': 'ListItem', position: parentCategory ? 3 : 2, name: category.name, item: `https://pourbebes.ma/categorie/${category.slug}` }] : []),
      { '@type': 'ListItem', position: (parentCategory ? 4 : category ? 3 : 2), name: product.name, item: `https://pourbebes.ma/produit/${product.slug}` },
    ],
  }

  function handleAddToCart() {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setSizeError(true)
      return
    }
    const variant = selectedSize ? { id: selectedSize, name: selectedSize } : null
    addItem(product, qty, variant)
    openCart()
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({ title: product.name, url: window.location.href }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href).catch(() => {})
    }
  }

  return (
    <div className={styles.page}>
      <SEO
        title={`${product.name}${product.brand ? ` — ${product.brand}` : ''}`}
        description={truncate(stripHtml(product.description), 155)}
        canonical={`/produit/${product.slug}`}
        image={product.images?.[0]}
        type="product"
        schema={{ '@context': 'https://schema.org', '@graph': [productSchema, breadcrumbSchema] }}
      />

      {/* Breadcrumb */}
      <div className={styles.breadcrumbWrap}>
        <nav className={styles.breadcrumb}>
          <Link to="/" className={styles.crumb}>Accueil</Link>
          {parentCategory && <>
            <span className={styles.sep}>/</span>
            <Link to={`/categorie/${parentCategory.slug}`} className={styles.crumb}>{parentCategory.name}</Link>
          </>}
          {category && <>
            <span className={styles.sep}>/</span>
            <Link to={`/categorie/${category.slug}`} className={styles.crumb}>{category.name}</Link>
          </>}
          <span className={styles.sep}>/</span>
          <span className={styles.crumbCurrent}>{product.name}</span>
        </nav>
      </div>

      {/* Product grid */}
      <div className={styles.inner}>

        {/* Gallery with wishlist overlay */}
        <div className={styles.galleryWrap}>
          <button
            className={`${styles.wishlistBtn} ${isWishlisted ? styles.wishlisted : ''}`}
            onClick={() => toggle(product)}
            aria-label={isWishlisted ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
          <ProductGallery images={product.images} name={product.name} />
        </div>

        {/* Details */}
        <div className={styles.details}>

          {discount && (
            <div className={styles.badgeRow}>
              <span className={styles.discountBadge}>-{discount}%</span>
            </div>
          )}
          <h1 className={styles.name}>{product.name}</h1>

          <div className={styles.prices}>
            {product.compareAt && (
              <span className={styles.compareAt}>{formatPrice(product.compareAt)}</span>
            )}
            <span className={styles.price}>{formatPrice(product.price)}</span>
          </div>

          <p className={styles.shortDesc}>{stripHtml(product.description)}</p>

          {/* Stock status */}
          <div className={styles.stockRow}>
            {stockStatus === 'in_stock' && (
              <span className={styles.inStock}>
                <span className={styles.stockDot} />
                En stock
              </span>
            )}
            {stockStatus === 'on_order' && (
              <span className={styles.onOrder}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.23L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Sur Commande
              </span>
            )}
            {stockStatus === 'out_of_stock' && (
              <span className={styles.outOfStock}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                En rupture
              </span>
            )}
          </div>

          {/* Sizes selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className={styles.sizesRow}>
              <span className={styles.sizesLabel}>Taille :</span>
              <div className={styles.sizeButtons}>
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`${styles.sizeBtn} ${selectedSize === s ? styles.sizeBtnActive : ''}`}
                    onClick={() => { setSelectedSize(s); setSizeError(false) }}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {sizeError && (
                <p className={styles.sizeError}>Veuillez choisir une taille.</p>
              )}
            </div>
          )}

          {/* Quantity row + share */}
          {!product.cartDisabled && (
            <div className={styles.qtyRow}>
              <div className={styles.qty}>
                <button className={styles.qtyBtn} onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span className={styles.qtyVal}>{qty}</span>
                <button className={styles.qtyBtn} onClick={() => setQty(q => q + 1)}>+</button>
              </div>
              <button className={styles.shareBtn} onClick={handleShare} aria-label="Partager">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              </button>
            </div>
          )}

          {/* CTA buttons */}
          <div className={styles.btnRow}>
            {!product.cartDisabled && (
              <button
                className={styles.addToCartBtn}
                onClick={handleAddToCart}
                disabled={stockStatus === 'out_of_stock'}
              >
                {stockStatus === 'out_of_stock' ? 'Épuisé' : 'Ajouter au panier'}
              </button>
            )}
            <a
              href={whatsappUrl}
              className={`${styles.whatsappBtn} ${product.cartDisabled ? styles.whatsappBtnFull : ''}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Commander sur Whatsapp
            </a>
          </div>

          {/* On-order info box — only when the product has a specific note */}
          {product.onOrderNote && (
            <div className={styles.onOrderBox}>
              <p>{product.onOrderNote}</p>
            </div>
          )}

          {/* Accordions + birth list */}
          <div className={styles.accordions}>

            <div className={styles.birthListRow}>
              {user ? (
                listLoading ? null : isInList(product.id) ? (
                  <span className={styles.inListBadge}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Déjà dans votre liste de naissance
                  </span>
                ) : (
                  <button
                    className={styles.birthListBtn}
                    onClick={() => addProduct.mutate(product.id)}
                    disabled={addProduct.isPending}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <polyline points="20 12 20 22 4 22 4 12" />
                      <rect x="2" y="7" width="20" height="5" />
                      <line x1="12" y1="22" x2="12" y2="7" />
                      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                    </svg>
                    {addProduct.isPending ? 'Ajout…' : 'Ajouter à ma liste de naissance'}
                  </button>
                )
              ) : (
                <Link to="/liste-naissance" className={styles.birthListBtn}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <polyline points="20 12 20 22 4 22 4 12" />
                    <rect x="2" y="7" width="20" height="5" />
                    <line x1="12" y1="22" x2="12" y2="7" />
                    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                  </svg>
                  Ajouter à ma liste de naissance
                </Link>
              )}
            </div>
            <Accordion
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              }
              label="Conditions Livraison ou Retrait"
            >
              <p>{product.deliveryNote || 'Livraison 30 DH (Casablanca) · 50 DH (Hors Casablanca) · Partout au Maroc sous 3–5 jours ouvrables. Retrait disponible en boutique à Casablanca.'}</p>
            </Accordion>
            <Accordion
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                </svg>
              }
              label="Échange et Retour (5 jours)"
            >
              <p>{product.returnNote || "Retour possible sous 5 jours suivant la réception. L'article doit être non utilisé, dans son emballage d'origine."}</p>
            </Accordion>
          </div>

        </div>
      </div>

      {/* Description */}
      <div className={styles.descSection}>
        <div className={styles.sectionInner}>
          <div className={styles.descTabBar}>
            <span className={styles.descTab}>Description</span>
          </div>
          <div
            className={styles.descBody}
            dangerouslySetInnerHTML={{ __html: renderDescription(product.description) }}
          />
          {product.usageTips && (
            <div className={styles.usageTips}>
              <strong className={styles.usageTipsTitle}>Conseils d'utilisation :</strong>
              <div
                className={styles.usageTipsBody}
                dangerouslySetInnerHTML={{ __html: renderDescription(product.usageTips) }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      {allRelated.length > 0 && (
        <section className={styles.rowSection}>
          <div className={styles.sectionInner}>
            <h2 className={styles.rowTitle}>Produits <em>associés</em></h2>
            <div className={styles.productGrid}>
              {related.map(p => (
                <ProductCard
                  key={p.id ?? p._id}
                  product={p}
                  badge={p.compareAt ? 'sale' : p.isNewArrival ? 'new' : undefined}
                />
              ))}
            </div>
            <RelatedFooter page={relatedPage} pageCount={relatedPageCount} categorySlug={product.categorySlug} onChange={setRelatedPage} />
          </div>
        </section>
      )}

      {/* Suggested */}
      {suggested.length > 0 && (
        <section className={`${styles.rowSection} ${styles.rowSectionAlt}`}>
          <div className={styles.sectionInner}>
            <h2 className={styles.rowTitle}>Vous aimerez <em>peut-être aussi</em></h2>
            <div className={styles.productGrid}>
              {suggested.map(p => (
                <ProductCard
                  key={p.id ?? p._id}
                  product={p}
                  badge={p.compareAt ? 'sale' : p.isNewArrival ? 'new' : undefined}
                />
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  )
}
