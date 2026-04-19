import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const CATEGORIES = [
  { label: 'Puériculture',  href: '/categorie/puericulture' },
  { label: 'Vêtements',     href: '/categorie/vetements' },
  { label: 'Chambre bébé',  href: '/categorie/chambre' },
  { label: 'Hygiène',       href: '/categorie/hygiene' },
  { label: 'Éveil & Jeux',  href: '/categorie/eveil' },
  { label: 'Pour Maman',    href: '/categorie/maman' },
]

const INFO_LINKS = [
  { label: 'À propos',         href: '/a-propos' },
  { label: 'Nos magasins',     href: '/magasins' },
  { label: 'Livraison',        href: '/livraison' },
  { label: 'Retours',          href: '/retours' },
  { label: 'FAQ',              href: '/faq' },
  { label: 'Contactez-nous',   href: '/contact' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Brand */}
        <div className={styles.brand}>
          <img src="/logo.jpeg" alt="Pour Bébé" className={styles.brandLogo} />
          <p className={styles.brandDesc}>
            La boutique de référence pour les parents marocains. Produits soigneusement sélectionnés pour le confort et le bonheur de votre bébé.
          </p>
          <p className={styles.shipping}>
            Livraison gratuite dès <strong>400 DH</strong>
          </p>
        </div>

        {/* Categories */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>Nos rayons</h3>
          <ul className={styles.links}>
            {CATEGORIES.map((c) => (
              <li key={c.href}>
                <Link to={c.href} className={styles.link}>{c.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>Informations</h3>
          <ul className={styles.links}>
            {INFO_LINKS.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className={styles.link}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className={styles.newsletter}>
          <h3 className={styles.colTitle}>Restez informé(e)</h3>
          <p className={styles.newsletterDesc}>Nouveautés, promotions et conseils bébé dans votre boîte mail.</p>
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Votre adresse email"
              className={styles.input}
              aria-label="Email pour la newsletter"
            />
            <button type="submit" className={styles.submitBtn}>S'abonner</button>
          </form>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copy}>© {new Date().getFullYear()} Pour Bébé. Tous droits réservés.</p>
        <div className={styles.legal}>
          <Link to="/confidentialite" className={styles.legalLink}>Confidentialité</Link>
          <Link to="/cgv" className={styles.legalLink}>CGV</Link>
          <Link to="/mentions-legales" className={styles.legalLink}>Mentions légales</Link>
        </div>
      </div>
    </footer>
  )
}
