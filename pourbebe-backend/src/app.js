import 'express-async-errors'
import express from 'express'
import cors from 'cors'

import authRoutes       from './routes/auth.routes.js'
import productRoutes    from './routes/products.routes.js'
import categoryRoutes   from './routes/categories.routes.js'
import orderRoutes      from './routes/orders.routes.js'
import birthlistRoutes  from './routes/birthlist.routes.js'
import adminRoutes      from './routes/admin.routes.js'
import postRoutes       from './routes/posts.routes.js'
import bannerRoutes     from './routes/banners.routes.js'
import curationRoutes   from './routes/curations.routes.js'
import Product          from './models/Product.js'
import Category         from './models/Category.js'
import Post             from './models/Post.js'

const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())

app.use('/api/auth',       authRoutes)
app.use('/api/products',   productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/orders',     orderRoutes)
app.use('/api/birthlist',  birthlistRoutes)
app.use('/api/admin',      adminRoutes)
app.use('/api/posts',      postRoutes)
app.use('/api/banners',    bannerRoutes)
app.use('/api/curations',  curationRoutes)

const SITE = 'https://pourbebes.ma'

app.get('/api/sitemap.xml', async (req, res) => {
  const [products, categories, posts] = await Promise.all([
    Product.find({ inStock: true }).select('slug updatedAt').lean(),
    Category.find().select('slug').lean(),
    Post.find({ published: true }).select('slug updatedAt').lean(),
  ])

  const staticUrls = [
    `<url><loc>${SITE}/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>`,
    `<url><loc>${SITE}/liste-naissance</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`,
  ]

  const categoryUrls = categories.map(c =>
    `<url><loc>${SITE}/categorie/${c.slug}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`
  )

  const productUrls = products.map(p => {
    const lastmod = new Date(p.updatedAt).toISOString().slice(0, 10)
    return `<url><loc>${SITE}/produit/${p.slug}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`
  })

  const postUrls = posts.map(p => {
    const lastmod = new Date(p.updatedAt).toISOString().slice(0, 10)
    return `<url><loc>${SITE}/blog/${p.slug}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`
  })

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...staticUrls,
    ...categoryUrls,
    ...productUrls,
    ...postUrls,
    '</urlset>',
  ].join('\n')

  res.setHeader('Content-Type', 'application/xml')
  res.send(xml)
})

app.use((err, req, res, next) => {
  console.error(err)

  if (err.name === 'ZodError') {
    return res.status(400).json({ success: false, error: err.errors[0]?.message ?? 'Données invalides.' })
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, error: 'Identifiant invalide.' })
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue ?? {})[0] ?? 'champ'
    return res.status(409).json({ success: false, error: `Cette valeur est déjà utilisée (${field}).` })
  }

  const status  = err.statusCode ?? err.status ?? 500
  const message = err.message ?? 'Erreur serveur.'
  res.status(status).json({ success: false, error: message })
})

export default app
