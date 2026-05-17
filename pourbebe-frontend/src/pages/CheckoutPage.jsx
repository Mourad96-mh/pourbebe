import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import CheckoutForm, { getShipping } from '../components/checkout/CheckoutForm'
import OrderSummary from '../components/checkout/OrderSummary'
import api from '../lib/api'
import useCart, { cartTotal as cartTotalSelector } from '../hooks/useCart'
import styles from './CheckoutPage.module.css'

export default function CheckoutPage() {
  const clearCart  = useCart((s) => s.clearCart)
  const cartItems  = useCart((s) => s.items)
  const subtotal   = useCart(cartTotalSelector)
  const [city, setCity]       = useState('')
  const [success, setSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const { mutateAsync } = useMutation({
    mutationFn: (data) => api.post('/orders', data),
  })

  async function handleSubmit(formData) {
    setSubmitError('')
    const shipping = getShipping(formData.city)
    try {
      await mutateAsync({
        address: {
          firstName: formData.firstName,
          lastName:  formData.lastName,
          address:   formData.address,
          city:      formData.city,
          phone:     formData.phone,
        },
        payment: { method: formData.payment },
        items: cartItems.map((i) => ({
          productId: i.product.id ?? i.product._id,
          quantity:  i.quantity,
          variantId: i.variant?.id ?? null,
        })),
        shipping,
        total: subtotal + shipping,
      })
      clearCart()
      setSuccess(true)
    } catch (err) {
      setSubmitError(
        err?.response?.data?.error ?? 'Une erreur est survenue. Veuillez réessayer.'
      )
    }
  }

  if (success) {
    return (
      <div className={styles.page}>
        <div className={styles.inner}>
          <div className={styles.successBox}>
            <div className={styles.successIcon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className={styles.successTitle}>Commande confirmée !</h1>
            <p className={styles.successText}>
              Merci pour votre commande. Vous serez contacté(e) très prochainement pour la confirmation et le suivi de votre livraison.
            </p>
            <Link to="/" className={styles.successBtn}>Retour à l'accueil</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Commander</h1>

        {submitError && (
          <p className={styles.submitError}>{submitError}</p>
        )}

        <div className={styles.layout}>
          <CheckoutForm onSubmit={handleSubmit} onCityChange={setCity} />
          <OrderSummary city={city} />
        </div>
      </div>
    </div>
  )
}
