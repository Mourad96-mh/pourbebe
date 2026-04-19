import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Button from '../components/ui/Button'
import styles from './LoginPage.module.css'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate  = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm()

  async function onSubmit({ email, password }) {
    try {
      await login(email, password)
      navigate('/mon-compte')
    } catch {
      setError('root', { message: 'Email ou mot de passe incorrect.' })
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Connexion</h1>
        <p className={styles.sub}>Bienvenue ! Connectez-vous pour accéder à votre compte.</p>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
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
              {...register('password', { required: 'Mot de passe requis' })}
              placeholder="••••••••"
            />
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          </div>

          {errors.root && <p className={styles.rootError}>{errors.root.message}</p>}

          <Button type="submit" variant="primary" fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Connexion…' : 'Se connecter'}
          </Button>
        </form>

        <p className={styles.switch}>
          Pas encore de compte ? <Link to="/inscription" className={styles.link}>Créer un compte</Link>
        </p>
      </div>
    </div>
  )
}
