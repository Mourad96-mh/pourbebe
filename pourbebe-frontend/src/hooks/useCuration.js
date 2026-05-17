import { useQuery } from '@tanstack/react-query'
import api from '../lib/api'

export function useCuration(slot, contextId) {
  return useQuery({
    queryKey: ['curations', slot, contextId ?? ''],
    queryFn: async () => {
      const params = { slot, contextId: contextId ?? '' }
      const res = await api.get('/curations', { params })
      return res.data.data ?? []
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!slot,
  })
}
