import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Button from '../components/ui/Button'
import styles from './LoginPage.module.css'

export default function RegisterPage() {
  const { register: registerUser } = useAuth()
  const navigate  = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm()

  async function onSubmit({ name, email, password }) {
    try {
      await registerUser(name, email, password)
      navigate('/mon-compte')
    } catch {
      setError('root', { message: 'Une erreur est survenue. Veuillez réessayer.' })
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Créer un compte</h1>
        <p className={styles.sub}>Rejoignez la communauté Pour Bébé.</p>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={styles.field}>
            <label className={styles.label}>Prénom et nom</label>
            <input
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              {...register('name', { required: 'Nom requis' })}
              placeholder="Votre nom complet"
            />
            {errors.name && <p className={styles.error}>{errors.name.message}</p>}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              {...register('email', { required: 'Email requis' })}
              placeholder="votre@email.com"
            />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Mot de passe</label>
            <input
              type="password"
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
              {...register('password', { required: 'Requis', minLength: { value: 8, message: '8 caractères minimum' } })}
              placeholder="••••••••"
            />
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          </div>

          {errors.root && <p className={styles.rootError}>{errors.root.message}</p>}

          <Button type="submit" variant="primary" fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Création…' : 'Créer mon compte'}
          </Button>
        </form>

        <p className={styles.switch}>
          Déjà un compte ? <Link to="/connexion" className={styles.link}>Se connecter</Link>
        </p>
      </div>
    </div>
  )
}
