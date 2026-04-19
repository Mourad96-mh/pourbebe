import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from './useAuth'
import api from '../lib/api'

export function useMyBirthList() {
  const { user } = useAuth()
  const qc       = useQueryClient()

  const { data: list, isLoading: listLoading, isError: listError } = useQuery({
    queryKey: ['birthlist', 'mine'],
    queryFn:  async () => {
      const res = await api.get('/birthlist/mine')
      const raw = res.data.data
      if (!raw) return null
      return {
        ...raw,
        id:    raw._id,
        items: (raw.items ?? []).map((i) => ({ ...i, id: i._id })),
      }
    },
    enabled:        !!user,
    retry:          false,
    throwOnError:   false,
  })

  const addProduct = useMutation({
    mutationFn: (productId) => {
      if (!list?.id) throw new Error('Liste non chargée')
      return api.post(`/birthlist/${list.id}/items`, { productId })
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['birthlist', 'mine'] }),
    onError: (err) => {
      console.error('[birthlist] addProduct failed:', err.response?.data ?? err.message)
    },
  })

  function isInList(productId) {
    if (!list?.items) return false
    return list.items.some(
      (i) => String(i.productId?._id ?? i.productId) === String(productId)
    )
  }

  return { list, listLoading, listError, addProduct, isInList }
}
