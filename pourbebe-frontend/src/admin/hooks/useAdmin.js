import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../lib/api'

export function useAdminProducts() {
  return useQuery({
    queryKey: ['admin', 'products'],
    queryFn: async () => {
      const res = await api.get('/admin/products')
      return res.data.data ?? res.data
    },
  })
}

export function useAdminOrders() {
  return useQuery({
    queryKey: ['admin', 'orders'],
    queryFn: async () => {
      const res = await api.get('/admin/orders')
      return res.data.data ?? res.data
    },
  })
}

export function useAdminCustomers() {
  return useQuery({
    queryKey: ['admin', 'customers'],
    queryFn: async () => {
      const res = await api.get('/admin/customers')
      return res.data.data ?? res.data
    },
  })
}

export function useAdminCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await api.get('/categories')
      return res.data.data ?? []
    },
    staleTime: Infinity,
  })
}

export function useCreateProduct() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data) => api.post('/admin/products', data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'products'] }),
  })
}

export function useUpdateProduct() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => api.patch(`/admin/products/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'products'] }),
  })
}

export function useDeleteProduct() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id) => api.delete(`/admin/products/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'products'] }),
  })
}

export function useUpdateOrderStatus() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }) => api.patch(`/admin/orders/${id}/status`, { status }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'orders'] }),
  })
}

export function useAdminCategoryTree() {
  return useQuery({
    queryKey: ['admin', 'categories'],
    queryFn: async () => {
      const res = await api.get('/admin/categories')
      return res.data.data ?? res.data
    },
  })
}

export function useCreateCategory() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data) => api.post('/admin/categories', data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'categories'] })
      qc.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}

export function useUpdateCategory() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => api.patch(`/admin/categories/${id}`, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'categories'] })
      qc.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}

export function useDeleteCategory() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id) => api.delete(`/admin/categories/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'categories'] })
      qc.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}

export function useAdminPosts() {
  return useQuery({
    queryKey: ['admin', 'posts'],
    queryFn: async () => {
      const res = await api.get('/admin/posts')
      return res.data.data ?? []
    },
  })
}

export function useCreatePost() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data) => api.post('/admin/posts', data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'posts'] })
      qc.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export function useUpdatePost() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => api.patch(`/admin/posts/${id}`, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'posts'] })
      qc.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export function useDeletePost() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id) => api.delete(`/admin/posts/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'posts'] })
      qc.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export function useAdminBirthLists() {
  return useQuery({
    queryKey: ['admin', 'birthlists'],
    queryFn: async () => {
      const res = await api.get('/admin/birthlists')
      return res.data.data ?? []
    },
  })
}

export function useDeleteBirthList() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id) => api.delete(`/admin/birthlists/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'birthlists'] }),
  })
}

export function useUploadImage() {
  return useMutation({
    mutationFn: async (file) => {
      const formData = new FormData()
      formData.append('image', file)
      const res = await api.post('/admin/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      return res.data.data.url
    },
  })
}
