import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import api from '../lib/api'
import SEO from '../components/ui/SEO'
import styles from './LoginPage.module.css'

export default function ResetPasswordPage() {
  const { token }               = useParams()
  const navigate                = useNavigate()
  const [newPassword, setNew]   = useState('')
  const [confirm, setConfirm]   = useState('')
  const [loading, setLoading]   = useState(false)
  const [done, setDone]         = useState(false)
  const [error, setError]       = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (newPassword.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.')
      return
    }
    if (newPassword !== confirm) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }
    setLoading(true)
    try {
      await api.post('/auth/reset-password', { token, newPassword })
      setDone(true)
      setTimeout(() => navigate('/connexion'), 3000)
    } catch (err) {
      setError(err?.response?.data?.error ?? 'Lien invalide ou expiré. Recommencez la procédure.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <SEO title="Nouveau mot de passe" noindex />
      <div className={styles.card}>
        <h1 className={styles.title}>Nouveau mot de passe</h1>

        {done ? (
          <>
            <p className={styles.sub}>
              Votre mot de passe a été mis à jour. Vous allez être redirigé vers la page de connexion…
            </p>
            <p className={styles.switch}>
              <Link to="/connexion" className={styles.link}>Se connecter</Link>
            </p>
          </>
        ) : (
          <>
            <p className={styles.sub}>Choisissez un nouveau mot de passe pour votre compte.</p>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.field}>
                <label className={styles.label}>Nouveau mot de passe</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNew(e.target.value)}
                  className={styles.input}
                  placeholder="8 caractères minimum"
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Confirmer le mot de passe</label>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className={styles.input}
                  placeholder="••••••••"
                  required
                />
              </div>
              {error && <p className={styles.rootError}>{error}</p>}
              <button type="submit" className={styles.submitBtn} disabled={loading || !newPassword || !confirm}>
                {loading ? 'Enregistrement…' : 'Enregistrer le mot de passe'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
