import { useState } from 'react'
import styles from './ProductGallery.module.css'

export default function ProductGallery({ images = [], name = '' }) {
  const [active, setActive] = useState(0)

  if (!images.length) {
    return <div className={styles.placeholder} />
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.main}>
        <img
          src={images[active]}
          alt={name}
          className={styles.mainImage}
          width={600}
          height={600}
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
      </div>

      {images.length > 1 && (
        <div className={styles.thumbs}>
          {images.map((src, i) => (
            <button
              key={i}
              className={`${styles.thumb} ${i === active ? styles.thumbActive : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Image ${i + 1}`}
            >
              <img src={src} alt={`${name} ${i + 1}`} width={80} height={80} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
