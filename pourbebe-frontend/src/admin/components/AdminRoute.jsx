import { Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import AdminNav from './AdminNav'
import AdminLogin from './AdminLogin'
import Spinner from '../../components/ui/Spinner'
import styles from './AdminLayout.module.css'

export default function AdminRoute() {
  const { user, loading } = useAuth()

  if (loading) return <Spinner />
  if (!user || user.role !== 'ADMIN') return <AdminLogin />

  return (
    <div className={styles.layout}>
      <AdminNav />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
