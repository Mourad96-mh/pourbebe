import { useForm } from 'react-hook-form'
import Button from '../ui/Button'
import styles from './CheckoutForm.module.css'

const CITIES = [
  'Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir',
  'Meknès', 'Oujda', 'Kénitra', 'Tétouan', 'Safi', 'El Jadida',
]

export default function CheckoutForm({ onSubmit }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className={styles.sectionTitle}>Informations de livraison</h2>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>Prénom</label>
          <input
            className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
            {...register('firstName', { required: 'Champ requis' })}
            placeholder="Votre prénom"
          />
          {errors.firstName && <p className={styles.error}>{errors.firstName.message}</p>}
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Nom</label>
          <input
            className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
            {...register('lastName', { required: 'Champ requis' })}
            placeholder="Votre nom"
          />
          {errors.lastName && <p className={styles.error}>{errors.lastName.message}</p>}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Adresse</label>
        <input
          className={`${styles.input} ${errors.address ? styles.inputError : ''}`}
          {...register('address', { required: 'Champ requis' })}
          placeholder="Numéro et nom de rue"
        />
        {errors.address && <p className={styles.error}>{errors.address.message}</p>}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>Ville</label>
          <select
            className={`${styles.input} ${errors.city ? styles.inputError : ''}`}
            {...register('city', { required: 'Champ requis' })}
          >
            <option value="">Choisir une ville</option>
            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.city && <p className={styles.error}>{errors.city.message}</p>}
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Téléphone</label>
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
          { value: 'cod',      label: 'Paiement à la livraison' },
          { value: 'card',     label: 'Carte bancaire (CMI)' },
          { value: 'transfer', label: 'Virement bancaire' },
        ].map((opt) => (
          <label key={opt.value} className={styles.paymentOption}>
            <input
              type="radio"
              value={opt.value}
              {...register('payment', { required: true })}
              className={styles.radio}
              defaultChecked={opt.value === 'cod'}
            />
            {opt.label}
          </label>
        ))}
      </div>

      <Button type="submit" variant="primary" size="lg" fullWidth disabled={isSubmitting}>
        {isSubmitting ? 'Traitement…' : 'Confirmer la commande'}
      </Button>
    </form>
  )
}
