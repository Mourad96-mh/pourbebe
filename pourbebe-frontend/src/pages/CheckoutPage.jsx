import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import CheckoutForm, { getShipping } from '../components/checkout/CheckoutForm'
import OrderSummary from '../components/checkout/OrderSummary'
import api from '../lib/api'
import useCart, { cartTotal as cartTotalSelector } from '../hooks/useCart'
import styles from './CheckoutPage.module.css'

const STORE_WHATSAPP = '212696716187'

function buildWhatsAppUrl(formData, cartItems, subtotal, shipping) {
  const itemLines = cartItems
    .map((i) => `• ${i.product.name}${i.variant ? ` (Taille ${i.variant.name})` : ''} ×${i.quantity} — ${Number(i.product.price) * i.quantity} DH`)
    .join('\n')

  const paymentLabel = formData.payment === 'cod' ? 'Paiement à la livraison' : formData.payment

  const message = [
    '🛒 Nouvelle commande — Pour Bébé',
    '',
    `👤 ${formData.firstName} ${formData.lastName}`,
    `📞 ${formData.phone}`,
    `📍 ${formData.address}, ${formData.city}`,
    `💳 ${paymentLabel}`,
    '',
    '📦 Articles :',
    itemLines,
    '',
    `Livraison : ${shipping} DH`,
    `💰 Total : ${subtotal + shipping} DH`,
  ].join('\n')

  return `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(message)}`
}

export default function CheckoutPage() {
  const clearCart  = useCart((s) => s.clearCart)
  const cartItems  = useCart((s) => s.items)
  const subtotal   = useCart(cartTotalSelector)
  const [city, setCity]       = useState('')
  const [success, setSuccess] = useState(false)
  const [whatsappUrl, setWhatsappUrl] = useState('')
  const [submitError, setSubmitError] = useState('')

  const { mutateAsync } = useMutation({
    mutationFn: (data) => api.post('/orders', data),
  })

  async function handleSubmit(formData) {
    setSubmitError('')
    const shipping = getShipping(formData.city)
    const whatsappUrl = buildWhatsAppUrl(formData, cartItems, subtotal, shipping)
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
          giftListShareId: i.meta?.shareId ?? null,
          giftListItemId:  i.meta?.giftListItemId ?? null,
        })),
        shipping,
        total: subtotal + shipping,
      })
      clearCart()
      setWhatsappUrl(whatsappUrl)
      // Best-effort auto-open. On mobile this is usually blocked because the
      // user gesture is lost after the await, so the success screen always
      // shows a tappable WhatsApp button as the reliable fallback.
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
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
              Merci pour votre commande. Pour la finaliser, envoyez-nous le récapitulatif sur WhatsApp en appuyant sur le bouton ci-dessous.
            </p>
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappBtn}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24s8.24 3.7 8.24 8.24-3.69 8.24-8.23 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.98-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.16 1.75 2.67 4.25 3.74.59.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z" />
                </svg>
                Envoyer sur WhatsApp
              </a>
            )}
            <Link to="/" className={styles.successLink}>Retour à l'accueil</Link>
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
