import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const INFO_LINKS = [
  { label: 'Notre Histoire',                href: '/a-propos' },
  { label: 'Conditions générales de vente', href: '/cgv' },
  { label: 'Politique de livraison',        href: '/livraison' },
  { label: "Politique d'échange et de retour", href: '/retours' },
  { label: 'Contactez-nous',                href: '/contact' },
]

const BLOG_LINKS = [
  { label: 'Quel lit bébé choisir au Maroc ?',     href: '/blog/quel-lit-bebe-choisir-maroc' },
  { label: 'Guide des tailles de gigoteuse',        href: '/blog/taille-gigoteuse-bebe-guide' },
  { label: 'Les meilleurs cadeaux de naissance',   href: '/blog/meilleurs-cadeaux-naissance-maroc-2025' },
  { label: 'Poussette ou porte-bébé ?',            href: '/blog/poussette-ou-porte-bebe' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* ── Brand + social ── */}
        <div className={styles.brand}>
          <img src="/logo.png" alt="Pour Bébé" className={styles.brandLogo} />
          <p className={styles.brandDesc}>
            La boutique de référence pour les parents marocains. Produits soigneusement sélectionnés pour le confort et le bonheur de votre bébé.
          </p>
          <div className={styles.socials}>
            <span className={styles.socialsLabel}>Suivez-nous</span>

            <div className={styles.socialIcons}>
              <a href="https://www.facebook.com/pourbebes.ma" target="_blank" rel="noreferrer" className={styles.socialBtn} aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/pourbebes.ma" target="_blank" rel="noreferrer" className={styles.socialBtn} aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* ── Showroom ── */}
        <div className={styles.showroom}>
          <h3 className={styles.colTitle}>Notre Showroom</h3>
          <div className={styles.showroomInfo}>
            <div className={styles.infoRow}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.icon}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>
                Rue Abou Abdellah Nafi<br />
                1er étage Benomar Center, Maarif<br />
                Casablanca
              </span>
            </div>
            <div className={styles.infoRow}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.icon}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.18 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6.29 6.29l.91-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>+212 (0)696-71-61-87</span>
            </div>
          </div>
        </div>

        {/* ── Info links ── */}
        <div className={styles.col}>
          <div className={styles.colTitleRow}>
            <h3 className={styles.colTitle}>Infos</h3>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--sky-dark)', marginTop: '2px' }}>
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
          <ul className={styles.links}>
            {INFO_LINKS.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className={styles.link}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Blog links ── */}
        <div className={styles.col}>
          <div className={styles.colTitleRow}>
            <h3 className={styles.colTitle}>Blog</h3>
          </div>
          <ul className={styles.links}>
            {BLOG_LINKS.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className={styles.link}>{l.label}</Link>
              </li>
            ))}
            <li>
              <Link to="/blog" className={styles.link}>Tous les articles →</Link>
            </li>
          </ul>
        </div>

        {/* ── Map ── */}
        <div className={styles.mapCol}>
          <div className={styles.mapWrap}>
            <iframe
              title="Notre showroom — Casablanca Maarif"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.0!2d-7.641!3d33.586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDM1JzA5LjYiTiA3wrAzOCczNy42Ilc!5e0!3m2!1sfr!2sma!4v1"
              className={styles.mapFrame}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copy}>© {new Date().getFullYear()} Pour Bébé. Tous droits réservés.</p>
        <div className={styles.legal}>
          <Link to="/confidentialite" className={styles.legalLink}>Confidentialité</Link>
          <Link to="/cgv" className={styles.legalLink}>CGV</Link>
          <Link to="/mentions-legales" className={styles.legalLink}>Mentions légales</Link>
          <a href="https://www.moudevpro.com" target="_blank" rel="noopener" title="Développeur Web Freelance Maroc" className={styles.legalLink}>Site créé par MouDev</a>
        </div>
      </div>
    </footer>
  )
}
