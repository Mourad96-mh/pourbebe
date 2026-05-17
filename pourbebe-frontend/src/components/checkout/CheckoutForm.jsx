import { useForm } from 'react-hook-form'
import Button from '../ui/Button'
import styles from './CheckoutForm.module.css'

const CITIES_CASABLANCA = ['Casablanca', 'Mohammedia', 'Bouskoura', 'Médiouna', 'Nouaceur', 'Berrechid', 'Bir Jdid', 'Bouznika', 'Azemmour']

const CITIES_OTHER = [
  'Agadir', 'Al Hoceima', 'Asilah', 'Azrou', 'Béni Mellal', 'Berkane', 'Boujdour',
  'Chefchaouen', 'Dakhla', 'El Jadida', 'Errachidia', 'Essaouira', 'Fès', 'Figuig',
  'Fnideq', 'Guelmim', 'Guercif', 'Ifrane', 'Inezgane', 'Kénitra', 'Khémisset',
  'Khénifra', 'Khouribga', 'Ksar el-Kébir', 'Laâyoune', 'Larache', 'M\'Diq',
  'Marrakech', 'Martil', 'Meknès', 'Midelt', 'Nador', 'Ouarzazate', 'Oued Zem',
  'Ouezzane', 'Oujda', 'Rabat', 'Salé', 'Safi', 'Settat', 'Sidi Bennour',
  'Sidi Ifni', 'Sidi Kacem', 'Sidi Slimane', 'Smara', 'Tanger', 'Tan-Tan',
  'Taroudant', 'Tata', 'Taza', 'Tétouan', 'Tinghir', 'Tiznit', 'Zagora', 'Témara',
]

export const SHIPPING_CASA  = 30
export const SHIPPING_OTHER = 50

export function getShipping(city) {
  if (!city) return 0
  return CITIES_CASABLANCA.includes(city) ? SHIPPING_CASA : SHIPPING_OTHER
}

export default function CheckoutForm({ onSubmit, onCityChange }) {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm()

  const selectedCity = watch('city', '')

  function handleCityChange(e) {
    if (onCityChange) onCityChange(e.target.value)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className={styles.sectionTitle}>Informations de livraison</h2>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>Prénom *</label>
          <input
            className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
            {...register('firstName', { required: 'Champ requis' })}
            placeholder="Votre prénom"
          />
          {errors.firstName && <p className={styles.error}>{errors.firstName.message}</p>}
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Nom *</label>
          <input
            className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
            {...register('lastName', { required: 'Champ requis' })}
            placeholder="Votre nom"
          />
          {errors.lastName && <p className={styles.error}>{errors.lastName.message}</p>}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Adresse *</label>
        <input
          className={`${styles.input} ${errors.address ? styles.inputError : ''}`}
          {...register('address', { required: 'Champ requis' })}
          placeholder="Numéro et nom de rue, quartier"
        />
        {errors.address && <p className={styles.error}>{errors.address.message}</p>}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>Ville *</label>
          <select
            className={`${styles.input} ${errors.city ? styles.inputError : ''}`}
            {...register('city', { required: 'Champ requis', onChange: handleCityChange })}
          >
            <option value="">Choisir une ville</option>
            <optgroup label="Grand Casablanca">
              {CITIES_CASABLANCA.map((c) => <option key={c} value={c}>{c}</option>)}
            </optgroup>
            <optgroup label="Reste du Maroc (A–Z)">
              {CITIES_OTHER.sort().map((c) => <option key={c} value={c}>{c}</option>)}
            </optgroup>
          </select>
          {errors.city && <p className={styles.error}>{errors.city.message}</p>}
          {selectedCity && (
            <p className={styles.shippingHint}>
              Frais de livraison : <strong>{getShipping(selectedCity)} DH</strong>
            </p>
          )}
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Téléphone *</label>
          <input
            type="tel"
            className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
            {...register('phone', {
              required: 'Champ requis',
              pattern: { value: /^(\+212|0)[5-7][0-9]{8}$/, message: 'Numéro invalide' },
            })}
            placeholder="06 00 00 00 00"
          />
          {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
        </div>
      </div>

      <h2 className={styles.sectionTitle}>Mode de paiement</h2>

      <div className={styles.paymentOptions}>
        {[
          { value: 'cod',      label: 'Paiement à la livraison', desc: 'Payez en espèces à la réception de votre commande.' },
          { value: 'transfer', label: 'Virement bancaire', desc: 'Coordonnées bancaires communiquées par WhatsApp après confirmation.' },
        ].map((opt) => (
          <label key={opt.value} className={styles.paymentOption}>
            <input
              type="radio"
              value={opt.value}
              {...register('payment', { required: true })}
              className={styles.radio}
              defaultChecked={opt.value === 'cod'}
            />
            <span>
              <span className={styles.paymentLabel}>{opt.label}</span>
              <span className={styles.paymentDesc}>{opt.desc}</span>
            </span>
          </label>
        ))}
      </div>

      <Button type="submit" variant="primary" size="lg" fullWidth disabled={isSubmitting}>
        {isSubmitting ? 'Traitement…' : 'Confirmer la commande'}
      </Button>
    </form>
  )
}
