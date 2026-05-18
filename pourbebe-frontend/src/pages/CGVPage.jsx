import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import styles from './PolicyPage.module.css'

export default function CGVPage() {
  return (
    <div className={styles.page}>
      <SEO
        title="Conditions Générales de Vente — Pour Bébé"
        description="Conditions générales de vente de la boutique Pour Bébé. Commandes, paiements, livraisons et retours au Maroc."
        canonical="/cgv"
      />
      <div className={styles.inner}>

        <nav className={styles.breadcrumb}>
          <Link to="/" className={styles.breadHome}>Accueil</Link>
          <span className={styles.breadSep}>›</span>
          <span className={styles.breadCurrent}>Conditions générales de vente</span>
        </nav>

        <div className={styles.header}>
          <p className={styles.sectionTag}>Informations légales</p>
          <h1 className={styles.title}>Conditions générales de vente</h1>
          <p className={styles.updated}>Dernière mise à jour : janvier 2025</p>
        </div>

        <div className={styles.content}>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Objet</h2>
            <p className={styles.body}>
              Les présentes conditions générales de vente (CGV) régissent les relations contractuelles entre la boutique <strong>Pour Bébé</strong> (ci-après « le Vendeur ») et tout client effectuant un achat sur le site <strong>pourbebes.ma</strong> (ci-après « le Client »). Tout achat implique l'acceptation pleine et entière des présentes CGV.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>2. Produits</h2>
            <p className={styles.body}>
              Les produits proposés à la vente sont ceux figurant sur le site au moment de la consultation par le Client. Chaque produit est présenté avec une description, des photos et un prix en dirhams marocains (DH, MAD). Le Vendeur s'efforce de présenter les caractéristiques essentielles de chaque article. En cas d'erreur ou d'imprécision, le Vendeur se réserve le droit de corriger sans préavis.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>3. Prix</h2>
            <p className={styles.body}>
              Les prix sont indiqués en dirhams marocains (DH), toutes taxes comprises. Le Vendeur se réserve le droit de modifier ses prix à tout moment, étant entendu que le prix applicable à la commande est celui en vigueur au moment de sa validation.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>4. Commandes</h2>
            <p className={styles.body}>
              La validation d'une commande par le Client vaut acceptation des prix et descriptions des produits mis en vente. Une confirmation de commande est envoyée par e-mail après validation. Le Vendeur se réserve le droit d'annuler toute commande en cas d'indisponibilité de stock, d'erreur de prix manifeste, ou de suspicion de fraude.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>5. Disponibilité et stock</h2>
            <p className={styles.body}>
              Les offres de produits et les prix sont valables tant qu'ils sont visibles sur le site. En cas de rupture de stock après validation de la commande, le Client en sera informé dans les plus brefs délais et pourra choisir entre un remboursement intégral ou un échange.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>6. Paiement</h2>
            <p className={styles.body}>Les modes de paiement acceptés sont :</p>
            <ul className={styles.list}>
              <li><strong>Paiement à la livraison</strong> — en espèces, remis au livreur</li>
              <li><strong>Paiement en ligne par carte bancaire</strong> — via notre plateforme sécurisée</li>
            </ul>
            <p className={styles.body}>
              La commande n'est confirmée et expédiée qu'après validation du paiement ou confirmation de la commande en paiement à la livraison.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>7. Livraison</h2>
            <p className={styles.body}>
              Les conditions de livraison sont détaillées dans notre <Link to="/livraison" style={{ color: 'var(--sky-deep)', textDecoration: 'underline' }}>Politique de livraison</Link>. Le Vendeur ne peut être tenu responsable des délais de livraison imputables à un transporteur tiers ou à un cas de force majeure.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>8. Retours et échanges</h2>
            <p className={styles.body}>
              Les conditions de retour et d'échange sont détaillées dans notre <Link to="/retours" style={{ color: 'var(--sky-deep)', textDecoration: 'underline' }}>Politique d'échange et de retour</Link>.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>9. Responsabilité</h2>
            <p className={styles.body}>
              Le Vendeur ne peut être tenu responsable des dommages résultant d'une mauvaise utilisation des produits achetés. Les photographies des produits sont présentées à titre illustratif ; de légères différences de couleur peuvent exister selon les écrans.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>10. Données personnelles</h2>
            <p className={styles.body}>
              Les données collectées lors d'une commande sont traitées conformément à notre <Link to="/confidentialite" style={{ color: 'var(--sky-deep)', textDecoration: 'underline' }}>Politique de confidentialité</Link>.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>11. Droit applicable</h2>
            <p className={styles.body}>
              Les présentes CGV sont soumises au droit marocain. En cas de litige, les parties s'engagent à rechercher une solution amiable avant tout recours judiciaire. À défaut, les tribunaux compétents de Casablanca seront saisis.
            </p>
          </div>

          <div className={styles.contact}>
            <p className={styles.contactTitle}>Pour toute question relative à nos CGV</p>
            <p className={styles.contactLine}>Téléphone : <a href="tel:+212696716187">+212 (0)696-71-61-87</a></p>
            <p className={styles.contactLine}>Instagram : <a href="https://www.instagram.com/pour.bebes" target="_blank" rel="noreferrer">@pour.bebes</a></p>
          </div>

        </div>
      </div>
    </div>
  )
}
