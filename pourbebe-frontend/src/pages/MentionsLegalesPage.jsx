import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import styles from './PolicyPage.module.css'

export default function MentionsLegalesPage() {
  return (
    <div className={styles.page}>
      <SEO
        title="Mentions Légales — Pour Bébé"
        description="Mentions légales de la boutique Pour Bébé — pourbebes.ma. Éditeur, hébergement et propriété intellectuelle."
        canonical="/mentions-legales"
      />
      <div className={styles.inner}>

        <nav className={styles.breadcrumb}>
          <Link to="/" className={styles.breadHome}>Accueil</Link>
          <span className={styles.breadSep}>›</span>
          <span className={styles.breadCurrent}>Mentions légales</span>
        </nav>

        <div className={styles.header}>
          <p className={styles.sectionTag}>Informations légales</p>
          <h1 className={styles.title}>Mentions légales</h1>
          <p className={styles.updated}>Dernière mise à jour : janvier 2025</p>
        </div>

        <div className={styles.content}>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Éditeur du site</h2>
            <ul className={styles.list}>
              <li><strong>Nom commercial :</strong> Pour Bébé — Vêtements et Accessoires</li>
              <li><strong>Adresse :</strong> Rue Abou Abdellah Nafi, 1er étage Benomar Center, Maarif, Casablanca, Maroc</li>
              <li><strong>Téléphone :</strong> +212 (0)696-71-61-87</li>
              <li><strong>Site web :</strong> pourbebes.ma</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Hébergement</h2>
            <ul className={styles.list}>
              <li><strong>Frontend :</strong> Hostinger — hostinger.com</li>
              <li><strong>Backend / API :</strong> Render — render.com</li>
              <li><strong>Stockage images :</strong> Cloudinary — cloudinary.com</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Propriété intellectuelle</h2>
            <p className={styles.body}>
              L'ensemble du contenu de ce site (textes, images, logo, design, structure) est la propriété exclusive de <strong>Pour Bébé</strong> ou de ses partenaires. Toute reproduction, représentation, modification ou exploitation, même partielle, sans autorisation écrite préalable est strictement interdite.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Données personnelles</h2>
            <p className={styles.body}>
              Le traitement des données personnelles collectées sur ce site est décrit dans notre <Link to="/confidentialite" style={{ color: 'var(--sky-deep)', textDecoration: 'underline' }}>Politique de confidentialité</Link>.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Cookies</h2>
            <p className={styles.body}>
              Ce site utilise des cookies techniques nécessaires à son bon fonctionnement (panier, session utilisateur). Aucun cookie publicitaire ou de tracking tiers n'est utilisé sans votre consentement.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Liens externes</h2>
            <p className={styles.body}>
              Ce site peut contenir des liens vers des sites tiers. Pour Bébé n'est pas responsable du contenu ou des pratiques de confidentialité de ces sites externes.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
