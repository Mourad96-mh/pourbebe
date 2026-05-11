import { useQuery } from '@tanstack/react-query'
import api from '../lib/api'

export function usePosts(params = {}) {
  return useQuery({
    queryKey: ['posts', params],
    queryFn: async () => {
      const res = await api.get('/posts', { params })
      return { posts: res.data.data ?? [], total: res.data.total ?? 0 }
    },
    staleTime: 60_000,
  })
}

export function usePost(slug) {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: async () => {
      const res = await api.get(`/posts/${slug}`)
      return res.data.data
    },
    enabled: !!slug,
    staleTime: 60_000,
  })
}
