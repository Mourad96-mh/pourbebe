import { useQuery } from '@tanstack/react-query'
import api from '../lib/api'

export function useBanners(type) {
  return useQuery({
    queryKey: ['banners', type ?? 'all'],
    queryFn: async () => {
      const params = {}
      if (type) params.type = type
      const res = await api.get('/banners', { params })
      return res.data.data ?? []
    },
    staleTime: 1000 * 60 * 5,
  })
}
