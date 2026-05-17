import { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api'
import SEO from '../components/ui/SEO'
import styles from './LoginPage.module.css'

export default function ForgotPasswordPage() {
  const [email, setEmail]     = useState('')
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.post('/auth/forgot-password', { email })
      setSent(true)
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <SEO title="Mot de passe oublié" noindex />
      <div className={styles.card}>
        <h1 className={styles.title}>Mot de passe oublié</h1>

        {sent ? (
          <>
            <p className={styles.sub}>
              Si un compte existe pour <strong>{email}</strong>, vous recevrez un email avec un lien de réinitialisation dans quelques minutes.
            </p>
            <p className={styles.switch}>
              <Link to="/connexion" className={styles.link}>Retour à la connexion</Link>
            </p>
          </>
        ) : (
          <>
            <p className={styles.sub}>
              Entrez votre adresse email et nous vous enverrons un lien pour créer un nouveau mot de passe.
            </p>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.field}>
                <label className={styles.label}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  placeholder="votre@email.com"
                  required
                />
              </div>
              {error && <p className={styles.rootError}>{error}</p>}
              <button type="submit" className={styles.submitBtn} disabled={loading || !email}>
                {loading ? 'Envoi…' : 'Envoyer le lien'}
              </button>
            </form>
            <p className={styles.switch}>
              <Link to="/connexion" className={styles.link}>Retour à la connexion</Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
