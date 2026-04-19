import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useWishlist = create(
  persist(
    (set, get) => ({
      items: [],

      toggle(product) {
        const exists = get().items.some((p) => p.id === product.id)
        set((s) => ({
          items: exists
            ? s.items.filter((p) => p.id !== product.id)
            : [...s.items, product],
        }))
      },

      has(productId) {
        return get().items.some((p) => p.id === productId)
      },

      clear() {
        set({ items: [] })
      },
    }),
    { name: 'pourbebe-wishlist' }
  )
)

export default useWishlist
