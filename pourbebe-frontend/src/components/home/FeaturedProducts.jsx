import { Link } from 'react-router-dom'
import { useProducts } from '../../hooks/useProducts'
import ProductGrid from '../product/ProductGrid'
import Button from '../ui/Button'
import styles from './FeaturedProducts.module.css'

export default function FeaturedProducts() {
  const { data, isLoading } = useProducts({ sort: 'newest', page: 1 })

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <p className={styles.tag}>Sélection du moment</p>
            <h2 className={styles.title}>Nos <em>coups de cœur</em></h2>
          </div>
          <Link to="/categorie/chambre">
            <Button variant="ghost">Voir tout</Button>
          </Link>
        </div>

        <ProductGrid products={data?.products?.slice(0, 8)} isLoading={isLoading} />
      </div>
    </section>
  )
}
