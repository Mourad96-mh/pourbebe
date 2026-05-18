import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import styles from './PolicyPage.module.css'

export default function LivraisonPage() {
  return (
    <div className={styles.page}>
      <SEO
        title="Politique de Livraison — Pour Bébé"
        description="Livraison partout au Maroc en 3 à 5 jours ouvrables. Paiement à la livraison disponible."
        canonical="/livraison"
      />
      <div className={styles.inner}>

        <nav className={styles.breadcrumb}>
          <Link to="/" className={styles.breadHome}>Accueil</Link>
          <span className={styles.breadSep}>›</span>
          <span className={styles.breadCurrent}>Politique de livraison</span>
        </nav>

        <div className={styles.header}>
          <p className={styles.sectionTag}>Informations pratiques</p>
          <h1 className={styles.title}>Politique de livraison</h1>
          <p className={styles.updated}>Dernière mise à jour : janvier 2025</p>
        </div>

        <div className={styles.content}>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Zone de livraison</h2>
            <p className={styles.body}>
              Nous livrons partout au <strong>Maroc</strong>, y compris dans les zones rurales et les villes secondaires. Aucune restriction géographique ne s'applique à nos livraisons nationales.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Délais de livraison</h2>
            <p className={styles.body}>
              Les commandes sont traitées et expédiées dans un délai de <strong>24 à 48 heures</strong> ouvrables après confirmation du paiement.
            </p>
            <ul className={styles.list}>
              <li><strong>Casablanca et Grand Casablanca :</strong> 1 à 2 jours ouvrables</li>
              <li><strong>Rabat, Marrakech, Fès, Tanger :</strong> 2 à 3 jours ouvrables</li>
              <li><strong>Autres villes du Maroc :</strong> 3 à 5 jours ouvrables</li>
              <li><strong>Zones rurales :</strong> 4 à 6 jours ouvrables</li>
            </ul>
            <p className={styles.body}>
              Ces délais sont donnés à titre indicatif et peuvent varier en période de forte affluence (fêtes, promotions) ou en cas d'événements exceptionnels.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Frais de livraison</h2>
            <ul className={styles.list}>
              <li><strong>Casablanca :</strong> 30 DH</li>
              <li><strong>Hors Casablanca :</strong> 50 DH</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Modes de paiement</h2>
            <p className={styles.body}>
              Nous acceptons le <strong>paiement à la livraison (Cash on Delivery)</strong> pour toutes les commandes au Maroc. Le paiement se fait directement au livreur, en espèces.
            </p>
            <p className={styles.body}>
              Le paiement en ligne par <strong>carte bancaire</strong> est également disponible lors de la validation de votre commande sur notre site.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Retrait en boutique</h2>
            <p className={styles.body}>
              Vous pouvez récupérer votre commande directement dans notre showroom :
            </p>
            <ul className={styles.list}>
              <li>Rue Abou Abdellah Nafi, 1er étage Benomar Center, Maarif — Casablanca</li>
              <li>Du lundi au samedi, de 10h à 19h</li>
              <li>Votre commande sera prête sous 24h après confirmation</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Suivi de commande</h2>
            <p className={styles.body}>
              Dès l'expédition de votre commande, vous recevez un e-mail de confirmation avec les informations de suivi. Vous pouvez également consulter l'état de vos commandes depuis votre espace{' '}
              <Link to="/mon-compte" style={{ color: 'var(--sky-deep)', textDecoration: 'underline' }}>Mon compte</Link>.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Colis endommagé ou manquant</h2>
            <p className={styles.body}>
              Si votre colis arrive endommagé ou incomplet, merci de le signaler <strong>dans les 24 heures</strong> suivant la réception en nous contactant avec des photos à l'appui. Nous ferons le nécessaire pour vous renvoyer les articles concernés dans les meilleurs délais.
            </p>
          </div>

          <div className={styles.contact}>
            <p className={styles.contactTitle}>Une question sur votre livraison ?</p>
            <p className={styles.contactLine}>Téléphone : <a href="tel:+212696716187">+212 (0)696-71-61-87</a></p>
            <p className={styles.contactLine}>Instagram : <a href="https://www.instagram.com/pour.bebes" target="_blank" rel="noreferrer">@pour.bebes</a></p>
          </div>

        </div>
      </div>
    </div>
  )
}
