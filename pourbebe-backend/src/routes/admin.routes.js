import { Router } from 'express'
import {
  getProducts, createProduct, updateProduct, deleteProduct,
} from '../controllers/products.controller.js'
import { getAllOrders, updateOrderStatus } from '../controllers/orders.controller.js'
import { protect } from '../middleware/auth.middleware.js'
import { adminOnly } from '../middleware/admin.middleware.js'
import { upload } from '../middleware/upload.middleware.js'
import { uploadImage } from '../lib/cloudinary.js'
import User from '../models/User.js'
import Category from '../models/Category.js'
import Product from '../models/Product.js'
import Post from '../models/Post.js'
import BirthList from '../models/BirthList.js'

const router = Router()

router.use(protect, adminOnly)

router.get('/products',          getProducts)
router.post('/products',         createProduct)
router.patch('/products/:id',    updateProduct)
router.delete('/products/:id',   deleteProduct)

router.post('/upload', upload.single('image'), async (req, res) => {
  const url = await uploadImage(req.file.path)
  res.json({ success: true, data: { url } })
})

router.get('/orders',              getAllOrders)
router.patch('/orders/:id/status', updateOrderStatus)

router.get('/customers', async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 }).lean()
  res.json({ success: true, data: users })
})

/* ── Category CRUD ── */
router.get('/categories', async (req, res) => {
  const all  = await Category.find().sort({ name: 1 }).lean()
  const tree = all
    .filter((c) => !c.parentId)
    .map((parent) => ({
      ...parent,
      children: all.filter((c) => String(c.parentId) === String(parent._id)),
    }))
  res.json({ success: true, data: tree })
})

router.post('/categories', async (req, res) => {
  const { name, parentId } = req.body
  if (!name?.trim()) return res.status(400).json({ success: false, error: 'Le nom est requis.' })
  const slug = name.trim().toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  const category = await Category.create({ name: name.trim(), slug, parentId: parentId || null })
  res.status(201).json({ success: true, data: category })
})

router.patch('/categories/:id', async (req, res) => {
  const { name, parentId } = req.body
  const update = {}
  if (name?.trim()) update.name = name.trim()
  if ('parentId' in req.body) update.parentId = parentId || null
  const category = await Category.findByIdAndUpdate(req.params.id, update, { new: true })
  if (!category) return res.status(404).json({ success: false, error: 'Catégorie introuvable.' })
  res.json({ success: true, data: category })
})

router.delete('/categories/:id', async (req, res) => {
  const hasProducts = await Product.exists({ categoryId: req.params.id })
  if (hasProducts) return res.status(409).json({ success: false, error: 'Impossible de supprimer : des produits sont assignés à cette catégorie.' })
  const hasChildren = await Category.exists({ parentId: req.params.id })
  if (hasChildren) return res.status(409).json({ success: false, error: "Supprimez d'abord les sous-catégories." })
  await Category.findByIdAndDelete(req.params.id)
  res.json({ success: true, data: null })
})

/* ── Blog post CRUD ── */
router.get('/posts', async (req, res) => {
  const posts = await Post.find().sort({ publishedAt: -1 }).lean()
  res.json({ success: true, data: posts })
})

router.post('/posts', async (req, res) => {
  const { title, slug, excerpt, body, coverImage, category, published, publishedAt } = req.body
  if (!title?.trim() || !slug?.trim() || !excerpt?.trim()) {
    return res.status(400).json({ success: false, error: 'Titre, slug et extrait sont requis.' })
  }
  const post = await Post.create({ title, slug, excerpt, body, coverImage, category, published, publishedAt })
  res.status(201).json({ success: true, data: post })
})

router.patch('/posts/:id', async (req, res) => {
  const allowed = ['title', 'slug', 'excerpt', 'body', 'coverImage', 'category', 'published', 'publishedAt']
  const update = Object.fromEntries(Object.entries(req.body).filter(([k]) => allowed.includes(k)))
  const post = await Post.findByIdAndUpdate(req.params.id, update, { new: true })
  if (!post) return res.status(404).json({ success: false, error: 'Article introuvable.' })
  res.json({ success: true, data: post })
})

router.delete('/posts/:id', async (req, res) => {
  await Post.findByIdAndDelete(req.params.id)
  res.json({ success: true, data: null })
})

/* ── Birth lists ── */
router.get('/birthlists', async (req, res) => {
  const lists = await BirthList.find()
    .populate('userId', 'name email')
    .populate('items.productId', 'name images price')
    .sort({ createdAt: -1 })
    .lean()
  res.json({ success: true, data: lists })
})

router.delete('/birthlists/:id', async (req, res) => {
  await BirthList.findByIdAndDelete(req.params.id)
  res.json({ success: true, data: null })
})

export default router
