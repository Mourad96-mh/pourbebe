import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import styles from './PolicyPage.module.css'

export default function RetoursPage() {
  return (
    <div className={styles.page}>
      <SEO
        title="Politique d'Échange et de Retour — Pour Bébé"
        description="Échange ou retour sous 5 jours après réception. Article non utilisé, dans son emballage d'origine. Contactez-nous pour initier un retour."
        canonical="/retours"
      />
      <div className={styles.inner}>

        <nav className={styles.breadcrumb}>
          <Link to="/" className={styles.breadHome}>Accueil</Link>
          <span className={styles.breadSep}>›</span>
          <span className={styles.breadCurrent}>Échange &amp; Retour</span>
        </nav>

        <div className={styles.header}>
          <p className={styles.sectionTag}>Informations pratiques</p>
          <h1 className={styles.title}>Politique d'échange et de retour</h1>
          <p className={styles.updated}>Dernière mise à jour : janvier 2025</p>
        </div>

        <div className={styles.content}>

          <div className={styles.highlight}>
            Vous disposez de <strong>5 jours</strong> après réception de votre commande pour nous contacter en cas de problème ou de souhait d'échange.
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Conditions de retour</h2>
            <p className={styles.body}>Pour être accepté, un article retourné doit respecter les conditions suivantes :</p>
            <ul className={styles.list}>
              <li>Retourné dans les <strong>5 jours</strong> suivant la date de réception</li>
              <li>Non utilisé et en parfait état</li>
              <li>Dans son emballage d'origine, avec toutes les étiquettes</li>
              <li>Accompagné du bon de livraison ou de la facture</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Articles non échangeables</h2>
            <p className={styles.body}>Pour des raisons d'hygiène et de sécurité, les articles suivants ne peuvent pas être retournés ou échangés :</p>
            <ul className={styles.list}>
              <li>Produits d'hygiène (couches, lingettes, soins corporels) déballés</li>
              <li>Articles de puériculture utilisés (tétines, biberons, tire-lait)</li>
              <li>Articles personnalisés ou sur commande</li>
              <li>Sous-vêtements et maillots de bain</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Procédure de retour</h2>
            <ul className={styles.list}>
              <li>Contactez-nous dans les 5 jours par téléphone ou Instagram en précisant votre numéro de commande et le motif</li>
              <li>Nous vous communiquons les instructions de retour</li>
              <li>Renvoyez l'article à nos frais via le transporteur que nous vous indiquons</li>
              <li>À réception et vérification, nous procédons à l'échange ou au remboursement</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Échanges</h2>
            <p className={styles.body}>
              Vous pouvez échanger un article contre un autre produit de notre catalogue (même valeur ou avec ajustement de prix). Si l'article souhaité est en rupture de stock, nous vous proposerons une alternative ou un avoir.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Remboursements</h2>
            <p className={styles.body}>
              En cas de remboursement accepté, le montant sera restitué selon le mode de paiement initial dans un délai de <strong>5 à 10 jours ouvrables</strong> après réception et contrôle de l'article retourné.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Article défectueux ou erreur de commande</h2>
            <p className={styles.body}>
              Si vous avez reçu un article défectueux ou ne correspondant pas à votre commande, contactez-nous <strong>dans les 24 heures</strong> avec des photos. Nous prendrons en charge le retour et le remplacement sans aucun frais de votre part.
            </p>
          </div>

          <div className={styles.contact}>
            <p className={styles.contactTitle}>Initier un retour ou un échange</p>
            <p className={styles.contactLine}>Téléphone : <a href="tel:+212696716187">+212 (0)696-71-61-87</a></p>
            <p className={styles.contactLine}>Instagram : <a href="https://www.instagram.com/pour.bebes" target="_blank" rel="noreferrer">@pour.bebes</a></p>
          </div>

        </div>
      </div>
    </div>
  )
}
