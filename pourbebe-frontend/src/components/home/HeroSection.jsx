import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import styles from './HeroSection.module.css'

const MOSAIC = [
  {
    src: 'https://gobebe.ma/wp-content/uploads/2026/01/berceau-cododo-2en1-gris-pratique-et-confortable-bebe-confort-maroc-210x210.webp',
    alt: 'Berceau cododo bébé',
  },
  {
    src: 'https://gobebe.ma/wp-content/uploads/2026/03/matelas-bebe-confortable-120-x-60-epaisseur-21-cm-gobebe.ma_-210x210.webp',
    alt: 'Matelas bébé',
  },
  {
    src: 'https://gobebe.ma/wp-content/uploads/2026/03/sac-a-langer-bowling-gris-epacieux-badabulle-maroc-210x210.webp',
    alt: 'Sac à langer Badabulle',
  },
  {
    src: 'https://gobebe.ma/wp-content/uploads/2025/09/pack-de-naissance-5-pieces-avec-broderie-pour-fille-cayzen-210x210.webp',
    alt: 'Pack naissance bébé',
  },
]

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.tag}>Collection Printemps — Été 2025</p>
          <h1 className={styles.headline}>
            Tout ce dont bébé<br />
            <em>a besoin</em>
          </h1>
          <p className={styles.sub}>
            Des produits soigneusement sélectionnés pour le confort, l'éveil
            et le bonheur de votre enfant. Livraison partout au Maroc.
          </p>
          <div className={styles.actions}>
            <Link to="/categorie/chambre">
              <Button variant="primary" size="lg">Découvrir la collection</Button>
            </Link>
            <Link to="/liste-naissance">
              <Button variant="ghost" size="lg">Créer une liste de naissance</Button>
            </Link>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.mosaic}>
            {MOSAIC.map((img, i) => (
              <div key={i} className={styles.mosaicCell}>
                <img
                  src={img.src}
                  alt={img.alt}
                  width={210}
                  height={210}
                  loading={i < 2 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>
          <div className={styles.decorStar} />
          <div className={styles.decorStarSmall} />
        </div>
      </div>
    </section>
  )
}
