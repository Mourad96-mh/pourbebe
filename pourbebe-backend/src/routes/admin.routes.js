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
import Order from '../models/Order.js'
import Category from '../models/Category.js'
import Product from '../models/Product.js'
import Post from '../models/Post.js'
import BirthList from '../models/BirthList.js'
import Banner from '../models/Banner.js'
import Curation from '../models/Curation.js'
import ClientNote from '../models/ClientNote.js'

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
router.delete('/orders/:id', async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id)
  if (!order) return res.status(404).json({ success: false, error: 'Commande introuvable.' })
  res.json({ success: true, data: null })
})

async function buildClientsData() {
  const stats = await Order.aggregate([
    { $match: { 'address.phone': { $exists: true, $nin: [null, ''] } } },
    { $sort: { createdAt: -1 } },
    {
      $group: {
        _id:        '$address.phone',
        orderCount: { $sum: 1 },
        totalSpent: { $sum: '$total' },
        lastOrderAt:{ $max: '$createdAt' },
        firstName:  { $first: '$address.firstName' },
        lastName:   { $first: '$address.lastName' },
        email:      { $first: '$address.email' },
        city:       { $first: '$address.city' },
        address:    { $first: '$address.address' },
      },
    },
    { $sort: { lastOrderAt: -1 } },
  ])

  const phones  = stats.map((s) => s._id).filter(Boolean)
  const notes   = await ClientNote.find({ phone: { $in: phones } }).lean()
  const noteMap = Object.fromEntries(notes.map((n) => [n.phone, n.note]))

  return stats.map((s) => ({
    phone:      s._id,
    name:       [s.firstName, s.lastName].filter(Boolean).join(' ') || '—',
    email:      s.email   || null,
    city:       s.city    || null,
    address:    s.address || null,
    orderCount: s.orderCount,
    totalSpent: s.totalSpent,
    lastOrderAt:s.lastOrderAt,
    note:       noteMap[s._id] ?? '',
  }))
}

router.get('/customers', async (req, res) => {
  const clients = await buildClientsData()
  res.json({ success: true, data: clients })
})

router.patch('/customers/note', async (req, res) => {
  const { phone, note } = req.body
  if (!phone?.trim()) return res.status(400).json({ success: false, error: 'Téléphone requis.' })
  await ClientNote.findOneAndUpdate(
    { phone: phone.trim() },
    { note: note ?? '' },
    { upsert: true }
  )
  res.json({ success: true, data: null })
})

router.get('/customers/export', async (req, res) => {
  const clients = await buildClientsData()
  const header  = ['Nom', 'Téléphone', 'Email', 'Ville', 'Adresse', 'Commandes', 'Total (DH)', 'Dernière commande', 'Note']
  const rows    = clients.map((c) =>
    [
      c.name,
      c.phone,
      c.email   ?? '',
      c.city    ?? '',
      c.address ?? '',
      c.orderCount,
      c.totalSpent,
      c.lastOrderAt ? new Date(c.lastOrderAt).toLocaleDateString('fr-FR') : '',
      c.note,
    ].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')
  )
  res.setHeader('Content-Type', 'text/csv; charset=utf-8')
  res.setHeader('Content-Disposition', 'attachment; filename="clients.csv"')
  res.send('﻿' + [header.join(','), ...rows].join('\r\n'))
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

/* ── Banners ── */
const BANNER_FIELDS = ['type', 'categorySlug', 'image', 'tag', 'title', 'subtitle', 'ctaText', 'ctaLink', 'showCta', 'isActive', 'order']

router.get('/banners', async (req, res) => {
  const { type } = req.query
  const filter = {}
  if (type) filter.type = type
  const banners = await Banner.find(filter).sort({ type: 1, order: 1, createdAt: 1 }).lean()
  res.json({ success: true, data: banners })
})

router.post('/banners', async (req, res) => {
  const data = Object.fromEntries(Object.entries(req.body).filter(([k]) => BANNER_FIELDS.includes(k)))
  if (!data.type) return res.status(400).json({ success: false, error: 'Le type est requis.' })
  const banner = await Banner.create(data)
  res.status(201).json({ success: true, data: banner })
})

router.patch('/banners/:id', async (req, res) => {
  const data = Object.fromEntries(Object.entries(req.body).filter(([k]) => BANNER_FIELDS.includes(k)))
  const banner = await Banner.findByIdAndUpdate(req.params.id, data, { new: true })
  if (!banner) return res.status(404).json({ success: false, error: 'Bannière introuvable.' })
  res.json({ success: true, data: banner })
})

router.delete('/banners/:id', async (req, res) => {
  await Banner.findByIdAndDelete(req.params.id)
  res.json({ success: true, data: null })
})

/* ── Curations ── */
router.get('/curations', async (req, res) => {
  const { slot, contextId } = req.query
  const filter = {}
  if (slot) filter.slot = slot
  if (contextId !== undefined) filter.contextId = contextId

  const curations = await Curation.find(filter)
    .populate('productIds', 'name brand price compareAt images slug isNewArrival inStock')

  const result = curations.map((c) => ({
    ...c.toObject({ virtuals: true }),
    productIds: c.productIds.map((p) => ({ ...p.toObject({ virtuals: true }), id: p.id })),
  }))

  res.json({ success: true, data: result })
})

router.put('/curations', async (req, res) => {
  const { slot, contextId = '', productIds = [] } = req.body
  if (!slot) return res.status(400).json({ success: false, error: 'Le slot est requis.' })

  const curation = await Curation.findOneAndUpdate(
    { slot, contextId },
    { productIds },
    { upsert: true, new: true }
  ).populate('productIds', 'name brand price compareAt images slug isNewArrival inStock')

  const data = {
    ...curation.toObject({ virtuals: true }),
    productIds: curation.productIds.map((p) => ({ ...p.toObject({ virtuals: true }), id: p.id })),
  }
  res.json({ success: true, data })
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
