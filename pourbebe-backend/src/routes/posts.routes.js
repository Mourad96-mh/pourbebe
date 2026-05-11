import { Router } from 'express'
import Post from '../models/Post.js'

const router = Router()

router.get('/', async (req, res) => {
  const { category, limit = 20, page = 1 } = req.query
  const filter = { published: true }
  if (category) filter.category = category

  const skip = (Number(page) - 1) * Number(limit)
  const [posts, total] = await Promise.all([
    Post.find(filter).sort({ publishedAt: -1 }).skip(skip).limit(Number(limit)).lean(),
    Post.countDocuments(filter),
  ])

  res.json({ success: true, data: posts, total })
})

router.get('/:slug', async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug, published: true }).lean()
  if (!post) return res.status(404).json({ success: false, error: 'Article introuvable.' })
  res.json({ success: true, data: post })
})

export default router
