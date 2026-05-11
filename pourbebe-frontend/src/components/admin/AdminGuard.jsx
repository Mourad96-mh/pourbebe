import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Spinner from '../ui/Spinner'

export default function AdminGuard({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <Spinner />
  if (!user || user.role !== 'ADMIN') return <Navigate to="/connexion" replace />
  return children
}
