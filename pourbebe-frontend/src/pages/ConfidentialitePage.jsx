import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import styles from './PolicyPage.module.css'

export default function ConfidentialitePage() {
  return (
    <div className={styles.page}>
      <SEO
        title="Politique de Confidentialité — Pour Bébé"
        description="Comment Pour Bébé collecte, utilise et protège vos données personnelles. Vos droits en matière de protection des données."
        canonical="/confidentialite"
      />
      <div className={styles.inner}>

        <nav className={styles.breadcrumb}>
          <Link to="/" className={styles.breadHome}>Accueil</Link>
          <span className={styles.breadSep}>›</span>
          <span className={styles.breadCurrent}>Confidentialité</span>
        </nav>

        <div className={styles.header}>
          <p className={styles.sectionTag}>Informations légales</p>
          <h1 className={styles.title}>Politique de confidentialité</h1>
          <p className={styles.updated}>Dernière mise à jour : janvier 2025</p>
        </div>

        <div className={styles.content}>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Données collectées</h2>
            <p className={styles.body}>Lors de votre utilisation du site, nous collectons les données suivantes :</p>
            <ul className={styles.list}>
              <li><strong>À la création de compte :</strong> nom, adresse e-mail, mot de passe (chiffré)</li>
              <li><strong>À la commande :</strong> adresse de livraison, numéro de téléphone</li>
              <li><strong>Automatiquement :</strong> données de navigation (pages visitées, durée de session)</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Utilisation des données</h2>
            <p className={styles.body}>Vos données sont utilisées exclusivement pour :</p>
            <ul className={styles.list}>
              <li>Traiter et suivre vos commandes</li>
              <li>Gérer votre compte client et votre liste de naissance</li>
              <li>Vous envoyer les confirmations de commande et notifications de livraison</li>
              <li>Améliorer l'expérience de navigation sur le site</li>
            </ul>
            <p className={styles.body}>
              Nous ne vendons, ne louons ni ne partageons vos données personnelles avec des tiers à des fins commerciales.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Conservation des données</h2>
            <p className={styles.body}>
              Vos données sont conservées pendant la durée de votre relation commerciale avec Pour Bébé, et au maximum 3 ans après votre dernière commande, conformément aux obligations légales marocaines.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Sécurité</h2>
            <p className={styles.body}>
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte ou divulgation. Les mots de passe sont chiffrés et ne sont jamais stockés en clair.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Vos droits</h2>
            <p className={styles.body}>Conformément à la législation marocaine en vigueur (Loi 09-08), vous disposez des droits suivants :</p>
            <ul className={styles.list}>
              <li><strong>Droit d'accès</strong> — consulter les données que nous détenons sur vous</li>
              <li><strong>Droit de rectification</strong> — corriger des données inexactes</li>
              <li><strong>Droit de suppression</strong> — demander l'effacement de votre compte et de vos données</li>
              <li><strong>Droit d'opposition</strong> — vous opposer à certains traitements</li>
            </ul>
            <p className={styles.body}>
              Pour exercer ces droits, contactez-nous par téléphone ou via Instagram. Nous traiterons votre demande dans un délai de 30 jours.
            </p>
          </div>

          <div className={styles.contact}>
            <p className={styles.contactTitle}>Pour toute question sur vos données</p>
            <p className={styles.contactLine}>Téléphone : <a href="tel:+212696716187">+212 (0)696-71-61-87</a></p>
            <p className={styles.contactLine}>Instagram : <a href="https://www.instagram.com/pour.bebes" target="_blank" rel="noreferrer">@pour.bebes</a></p>
          </div>

        </div>
      </div>
    </div>
  )
}
