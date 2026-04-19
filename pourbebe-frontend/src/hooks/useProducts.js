import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../lib/api'

function sortProducts(products, sort) {
  const list = [...products]
  if (sort === 'price-asc')  return list.sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') return list.sort((a, b) => b.price - a.price)
  if (sort === 'bestsellers') return list
  return list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0))
}

export function useProducts(params = {}) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: async () => {
      const res = await api.get('/products', { params })
      const products = res.data.data.map((p) => ({ ...p, id: p._id }))
      return { products: sortProducts(products, params.sort), total: res.data.meta?.total ?? products.length }
    },
  })
}

export function useProduct(slug) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const res = await api.get(`/products/${slug}`)
      const p = res.data.data
      return { ...p, id: p._id }
    },
    enabled: !!slug,
  })
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await api.get('/categories')
      return res.data.data
    },
    staleTime: 1000 * 60 * 10,
  })
}

export function useCategory(slug) {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: async () => {
      const res = await api.get(`/categories/${slug}`)
      return { category: res.data.data }
    },
    enabled: !!slug,
  })
}

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
