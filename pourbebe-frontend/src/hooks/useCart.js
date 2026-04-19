import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const FREE_SHIPPING_THRESHOLD = 400

const useCart = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart:   () => set({ isOpen: true }),
      closeCart:  () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      addItem(product, quantity = 1, variant = null, meta = null) {
        const key = meta?.giftListItemId
          ? `gift-${meta.giftListItemId}`
          : variant ? `${product.id}-${variant.id}` : product.id
        set((s) => {
          const existing = s.items.find((i) => i.key === key)
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.key === key ? { ...i, quantity: i.quantity + quantity } : i
              ),
            }
          }
          return { items: [...s.items, { key, product, variant, quantity, meta }] }
        })
      },

      removeItem(key) {
        set((s) => ({ items: s.items.filter((i) => i.key !== key) }))
      },

      updateQuantity(key, quantity) {
        if (quantity < 1) { get().removeItem(key); return }
        set((s) => ({
          items: s.items.map((i) => (i.key === key ? { ...i, quantity } : i)),
        }))
      },

      clearCart() {
        set({ items: [] })
      },
    }),
    { name: 'pourbebe-cart' }
  )
)

/* ── derived selectors (used as: useCart(cartTotal) etc.) ── */
export const cartTotal = (s) =>
  s.items.reduce((sum, i) => sum + Number(i.product.price) * i.quantity, 0)

export const cartCount = (s) =>
  s.items.reduce((sum, i) => sum + i.quantity, 0)

export const cartIsFreeShipping = (s) =>
  cartTotal(s) >= FREE_SHIPPING_THRESHOLD

export const cartShippingRemaining = (s) =>
  Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal(s))

export default useCart
