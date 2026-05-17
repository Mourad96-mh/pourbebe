import { Router } from 'express'
import Banner from '../models/Banner.js'

const router = Router()

router.get('/', async (req, res) => {
  const { type, categorySlug } = req.query
  const filter = { isActive: true }
  if (type)         filter.type = type
  if (categorySlug) filter.categorySlug = categorySlug
  const banners = await Banner.find(filter).sort({ order: 1, createdAt: 1 }).lean()
  res.json({ success: true, data: banners })
})

export default router
