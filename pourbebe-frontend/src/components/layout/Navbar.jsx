import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import useCart, { cartCount as cartCountSelector } from '../../hooks/useCart'
import useWishlist from '../../hooks/useWishlist'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { label: 'Accueil',           href: '/' },
  { label: 'Chambre & Sommeil', href: '/categorie/chambre' },
  { label: 'Sorties',           href: '/categorie/sorties' },
  { label: 'Hygiène',           href: '/categorie/hygiene' },
  { label: 'Vêtements',         href: '/categorie/vetements' },
  { label: 'Accessoires',       href: '/categorie/accessoires' },
  { label: 'Idées Cadeaux',     href: '/categorie/cadeaux' },
  { label: 'Blog',              href: '/blog' },
]

export default function Navbar() {
  const { user, logout }  = useAuth()
  const cartCount         = useCart(cartCountSelector)
  const openCart          = useCart((s) => s.openCart)
  const wishlistCount     = useWishlist((s) => s.items.length)
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch]     = useState('')
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  function handleSearch(e) {
    e.preventDefault()
    const q = search.trim()
    if (q) {
      navigate(`/categorie/chambre?q=${encodeURIComponent(q)}`)
      setSearch('')
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>

        {/* ── 1. Logo ── */}
        <div className={styles.left}>
          <Link to="/" className={styles.logo}>
            <img src="/logo.png" alt="Pour Bébé" className={styles.logoImg} />
          </Link>
        </div>

        {/* ── 2. Search + Nav ── */}
        <div className={styles.center}>
          <form className={styles.searchForm} onSubmit={handleSearch} role="search">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher des produits..."
              className={styles.searchInput}
              aria-label="Rechercher"
            />
            <button type="submit" className={styles.searchBtn} aria-label="Lancer la recherche">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </form>

          <nav className={styles.navLinks} aria-label="Navigation principale">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                end={link.href === '/'}
                className={({ isActive }) =>
                  isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/liste-naissance" className={styles.navBtn}>
              Liste de naissance
            </Link>
            <Link to="/categorie/promotions" className={styles.navBtnPromo}>
              Promotions
            </Link>
          </nav>
        </div>

        {/* ── 3. Actions ── */}
        <div className={styles.actions}>
          <Link to="/favoris" className={styles.actionLink} title="Favoris">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {wishlistCount > 0 && <span className={styles.badge}>{wishlistCount}</span>}
          </Link>

          <button className={styles.actionLink} onClick={openCart} title="Panier" aria-label="Ouvrir le panier">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </button>

          {user ? (
            <div className={styles.accountMenu}>
              <Link to="/mon-compte" className={styles.actionLink} title="Mon compte">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>
              <button className={styles.logoutBtn} onClick={handleLogout}>Déconnexion</button>
            </div>
          ) : (
            <Link to="/connexion" className={styles.actionLink} title="Se connecter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>
          )}
        </div>

        <button
          className={`${styles.hamburger}${menuOpen ? ` ${styles.hamburgerOpen}` : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>

      </div>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <nav className={styles.mobileNav} aria-label="Menu mobile">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={styles.mobileNavLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/liste-naissance" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
            Liste de naissance
          </Link>
          {user ? (
            <>
              <Link to="/mon-compte" className={styles.mobileAuthLink} onClick={() => setMenuOpen(false)}>
                Mon compte
              </Link>
              <button
                className={styles.mobileLogoutBtn}
                onClick={() => { handleLogout(); setMenuOpen(false) }}
              >
                Déconnexion
              </button>
            </>
          ) : (
            <Link to="/connexion" className={styles.mobileAuthLink} onClick={() => setMenuOpen(false)}>
              Se connecter
            </Link>
          )}
        </nav>
      )}
    </header>
  )
}
