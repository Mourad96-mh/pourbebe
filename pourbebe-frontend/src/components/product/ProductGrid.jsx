import ProductCard from './ProductCard'
import Spinner from '../ui/Spinner'
import styles from './ProductGrid.module.css'

export default function ProductGrid({ products, isLoading }) {
  if (isLoading) return <Spinner />

  if (!products?.length) {
    return (
      <div className={styles.empty}>
        <p>Aucun produit trouvé.</p>
      </div>
    )
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
