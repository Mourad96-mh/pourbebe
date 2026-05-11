import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'Pour Bébé'
const SITE_URL  = 'https://pourbebes.ma'
const DEFAULT_IMAGE = `${SITE_URL}/hero-img.jpeg`

export default function SEO({ title, description, canonical, image, type = 'website', noindex = false, schema }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Vêtements et Accessoires Bébé au Maroc`
  const metaDesc  = description ?? 'Boutique en ligne de vêtements et accessoires bébé au Maroc. Livraison gratuite dès 400 DH.'
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : null
  const ogImage   = image ?? DEFAULT_IMAGE

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={type} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={ogImage} />

      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  )
}
