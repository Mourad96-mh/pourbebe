import { Outlet } from 'react-router-dom'
import AdminNav from './AdminNav'
import styles from './AdminLayout.module.css'

export default function AdminLayout() {
  return (
    <div className={styles.layout}>
      <AdminNav />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
