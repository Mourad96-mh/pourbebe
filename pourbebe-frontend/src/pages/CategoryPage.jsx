import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCategory, useProducts } from '../hooks/useProducts'
import ProductGrid from '../components/product/ProductGrid'
import ProductFilters from '../components/product/ProductFilters'
import styles from './CategoryPage.module.css'

export default function CategoryPage() {
  const { slug }   = useParams()
  const [filters, setFilters] = useState({})

  const { data: categoryData } = useCategory(slug)
  const { data, isLoading }    = useProducts({ category: slug, ...filters })

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h1 className={styles.title}>{categoryData?.category?.name ?? slug}</h1>
          {categoryData?.category?.description && (
            <p className={styles.desc}>{categoryData.category.description}</p>
          )}
        </header>

        <div className={styles.layout}>
          <ProductFilters filters={filters} onChange={setFilters} />
          <div className={styles.results}>
            <p className={styles.count}>
              {data?.products?.length ?? 0} produits
            </p>
            <ProductGrid products={data?.products} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  )
}
