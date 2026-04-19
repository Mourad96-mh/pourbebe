import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import CheckoutForm from '../components/checkout/CheckoutForm'
import OrderSummary from '../components/checkout/OrderSummary'
import api from '../lib/api'
import useCart, { cartTotal as cartTotalSelector } from '../hooks/useCart'
import styles from './CheckoutPage.module.css'

export default function CheckoutPage() {
  const clearCart  = useCart((s) => s.clearCart)
  const cartItems  = useCart((s) => s.items)
  const total      = useCart(cartTotalSelector)
  const navigate   = useNavigate()

  const { mutateAsync } = useMutation({
    mutationFn: (data) => api.post('/orders', data),
  })

  async function handleSubmit(formData) {
    await mutateAsync({
      address: formData,
      payment: { method: formData.payment },
      items: cartItems.map((i) => ({
        productId: i.product.id,
        quantity:  i.quantity,
        variantId: i.variant?.id ?? null,
      })),
      total,
    })
    clearCart()
    navigate('/')
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Commander</h1>

        <div className={styles.layout}>
          <CheckoutForm onSubmit={handleSubmit} />
          <OrderSummary />
        </div>
      </div>
    </div>
  )
}
