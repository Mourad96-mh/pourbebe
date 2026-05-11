import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../lib/api'

function normalizeProduct(p) {
  if (!p) return p
  return {
    ...p,
    id: p._id ?? p.id,
    categorySlug: p.categoryId?.slug ?? p.categorySlug ?? null,
    categoryName: p.categoryId?.name ?? null,
  }
}

export function useProducts(params = {}) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: async () => {
      const { category, brand, min, max, sort, q, type, gender, age, isNew } = params
      const query = { limit: 200 }
      if (category) query.category = category
      if (brand)    query.brand = brand
      if (min)      query.min = min
      if (max)      query.max = max
      if (sort)     query.sort = sort
      if (q)        query.q = q
      if (type)     query.type = type
      if (gender)   query.gender = gender
      if (age)      query.age = age
      if (isNew)    query.isNew = 'true'

      const res = await api.get('/products', { params: query })
      const products = (res.data.data ?? []).map(normalizeProduct)
      return { products, total: products.length }
    },
    staleTime: 60_000,
  })
}

export function useProduct(slug) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const res = await api.get(`/products/${slug}`)
      return normalizeProduct(res.data.data)
    },
    enabled: !!slug,
    staleTime: 60_000,
  })
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await api.get('/categories')
      return res.data.data ?? []
    },
    staleTime: Infinity,
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
    staleTime: Infinity,
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
