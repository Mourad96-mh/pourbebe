import 'express-async-errors'
import express from 'express'
import cors from 'cors'

import authRoutes       from './routes/auth.routes.js'
import productRoutes    from './routes/products.routes.js'
import categoryRoutes   from './routes/categories.routes.js'
import orderRoutes      from './routes/orders.routes.js'
import birthlistRoutes  from './routes/birthlist.routes.js'
import adminRoutes      from './routes/admin.routes.js'

const app = express()

const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
    callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
}))
app.use(express.json())

app.use('/api/auth',       authRoutes)
app.use('/api/products',   productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/orders',     orderRoutes)
app.use('/api/birthlist',  birthlistRoutes)
app.use('/api/admin',      adminRoutes)

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
