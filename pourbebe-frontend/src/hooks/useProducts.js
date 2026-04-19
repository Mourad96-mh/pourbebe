import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  MOCK_PRODUCTS,
  MOCK_CATEGORIES,
  getProductsByCategory,
  getProductBySlug,
  getCategoryBySlug,
} from '../lib/mockData'
import api from '../lib/api'

/* ── toggle this to false once the backend is running ── */
const USE_MOCK = false

/* ── sort helper ── */
function sortProducts(products, sort) {
  const list = [...products]
  if (sort === 'price-asc')  return list.sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') return list.sort((a, b) => b.price - a.price)
  if (sort === 'bestsellers') return list
  return list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0))
}

/* ── useProducts ── */
export function useProducts(params = {}) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: async () => {
      if (USE_MOCK) {
        await delay(300)
        let products = [...MOCK_PRODUCTS]
        if (params.category) {
          products = getProductsByCategory(params.category)
        }
        if (params.min != null) products = products.filter((p) => p.price >= Number(params.min))
        if (params.max != null) products = products.filter((p) => p.price <= Number(params.max))
        if (params.gender) products = products.filter((p) => !p.gender || p.gender === params.gender)
        products = sortProducts(products, params.sort)
        return { products, total: products.length }
      }
      const res = await api.get('/products', { params })
      const products = res.data.data.map((p) => ({ ...p, id: p._id }))
      return { products, total: res.data.meta?.total ?? products.length }
    },
  })
}

/* ── useProduct (single) ── */
export function useProduct(slug) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      if (USE_MOCK) {
        await delay(200)
        return getProductBySlug(slug)
      }
      const res = await api.get(`/products/${slug}`)
      const p = res.data.data
      return { ...p, id: p._id }
    },
    enabled: !!slug,
  })
}

/* ── useCategories ── */
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      if (USE_MOCK) {
        await delay(100)
        return MOCK_CATEGORIES
      }
      const res = await api.get('/categories')
      return res.data.data
    },
    staleTime: 1000 * 60 * 10,
  })
}

/* ── useCategory (single with products) ── */
export function useCategory(slug) {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: async () => {
      if (USE_MOCK) {
        await delay(250)
        const category = getCategoryBySlug(slug)
        const products = category ? getProductsByCategory(slug) : []
        return { category, products }
      }
      const res = await api.get(`/categories/${slug}`)
      return { category: res.data.data }
    },
    enabled: !!slug,
  })
}

/* ── Admin mutations (backend only) ── */
export function useCreateProduct() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data) => api.post('/admin/products', data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  })
}

export function useUpdateProduct(id) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data) => api.patch(`/admin/products/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  })
}

export function useDeleteProduct() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id) => api.delete(`/admin/products/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  })
}

/* ── utility ── */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
