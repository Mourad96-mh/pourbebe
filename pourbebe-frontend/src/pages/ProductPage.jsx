import { useParams, Link } from 'react-router-dom'
import { useProduct } from '../hooks/useProducts'
import { useMyBirthList } from '../hooks/useMyBirthList'
import { useAuth } from '../hooks/useAuth'
import ProductGallery from '../components/product/ProductGallery'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Spinner from '../components/ui/Spinner'
import { formatPrice, getDiscountPercent } from '../lib/utils'
import useCart from '../hooks/useCart'
import useWishlist from '../hooks/useWishlist'
import styles from './ProductPage.module.css'

export default function ProductPage() {
  const { slug }            = useParams()
  const { data: product, isLoading } = useProduct(slug)
  const addItem             = useCart((s) => s.addItem)
  const openCart            = useCart((s) => s.openCart)
  const toggle              = useWishlist((s) => s.toggle)
  const isWishlisted        = useWishlist((s) => product ? s.has(product.id) : false)
  const { user }            = useAuth()
  const { list, listLoading, listError, addProduct, isInList } = useMyBirthList()

  if (isLoading) return <Spinner />
  if (!product)  return <p className={styles.notFound}>Produit introuvable.</p>

  const discount = getDiscountPercent(product.price, product.compareAt)

  function handleAddToCart() {
    addItem(product)
    openCart()
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <ProductGallery images={product.images} name={product.name} />

        <div className={styles.details}>
          <div className={styles.badges}>
            {product.isNewArrival && <Badge variant="new">Nouveau</Badge>}
            {discount && <Badge variant="sale">-{discount}%</Badge>}
          </div>

          <p className={styles.brand}>{product.brand}</p>
          <h1 className={styles.name}>{product.name}</h1>

          <div className={styles.prices}>
            <span className={styles.price}>{formatPrice(product.price)}</span>
            {product.compareAt && (
              <span className={styles.compareAt}>{formatPrice(product.compareAt)}</span>
            )}
          </div>

          <p className={styles.description}>{product.description}</p>

          <div className={styles.actions}>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              disabled={!product.inStock}
              onClick={handleAddToCart}
            >
              {product.inStock ? 'Ajouter au panier' : 'Épuisé'}
            </Button>

            <button
              className={`${styles.wishlistBtn} ${isWishlisted ? styles.wishlisted : ''}`}
              onClick={() => toggle(product)}
              aria-label={isWishlisted ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>

          <p className={styles.shipping}>
            Livraison gratuite dès 400 DH &nbsp;·&nbsp; Livraison partout au Maroc
          </p>

          {user && (
            <div className={styles.birthListRow}>
              {listLoading ? (
                <span className={styles.birthListMeta}>Chargement de votre liste…</span>
              ) : listError ? (
                <span className={styles.birthListMeta}>Impossible de charger votre liste.</span>
              ) : !list ? (
                <Link to="/liste-naissance" className={styles.birthListLink}>
                  Créer une liste de naissance pour ajouter ce produit
                </Link>
              ) : isInList(product.id) ? (
                <span className={styles.inListBadge}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                  Déjà dans votre liste de naissance
                </span>
              ) : (
                <>
                  <button
                    className={styles.birthListBtn}
                    onClick={() => addProduct.mutate(product.id)}
                    disabled={addProduct.isPending}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    {addProduct.isPending ? 'Ajout…' : 'Ajouter à ma liste de naissance'}
                  </button>
                  {addProduct.isError && (
                    <p className={styles.birthListError}>
                      {addProduct.error?.response?.data?.error ?? 'Erreur lors de l\'ajout.'}
                    </p>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
