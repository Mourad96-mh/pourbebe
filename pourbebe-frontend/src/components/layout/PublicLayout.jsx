import { Outlet } from 'react-router-dom'
import AnnouncementBar from './AnnouncementBar'
import Navbar from './Navbar'
import Footer from './Footer'
import CartDrawer from '../cart/CartDrawer'
import styles from './PublicLayout.module.css'

export default function PublicLayout() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <CartDrawer />
      <main>
        <Outlet />
      </main>
      <Footer />

      {/* ── Fixed WhatsApp button ── */}
      <a
        href="https://wa.me/212696716187"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.wtsp}
        aria-label="Contactez-nous sur WhatsApp"
      >
        <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor" aria-hidden="true">
          <path d="M16 0C7.164 0 0 7.163 0 16c0 2.824.738 5.47 2.027 7.77L0 32l8.43-2.01A15.937 15.937 0 0 0 16 32c8.836 0 16-7.163 16-16S24.836 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.754-1.845l-.484-.287-5.007 1.194 1.234-4.876-.316-.5A13.267 13.267 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.815c-.398-.2-2.355-1.162-2.72-1.294-.366-.133-.632-.2-.898.2-.266.398-1.031 1.294-1.264 1.56-.232.266-.465.3-.863.1-.398-.2-1.68-.619-3.2-1.974-1.183-1.054-1.981-2.356-2.213-2.754-.232-.398-.025-.613.175-.811.179-.178.398-.465.597-.698.2-.232.266-.398.398-.664.133-.266.066-.498-.033-.698-.1-.2-.898-2.163-1.23-2.96-.325-.779-.655-.673-.898-.686l-.764-.013c-.266 0-.698.1-1.064.498-.366.398-1.396 1.364-1.396 3.327s1.43 3.86 1.628 4.126c.2.266 2.813 4.295 6.815 6.025.952.411 1.695.657 2.274.841.955.304 1.825.261 2.513.158.767-.114 2.355-.963 2.688-1.892.332-.93.332-1.726.232-1.892-.099-.166-.365-.266-.763-.465z" />
        </svg>
      </a>
    </>
  )
}
