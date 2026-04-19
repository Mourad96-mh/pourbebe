import Product from '../models/Product.js'
import Category from '../models/Category.js'

export async function getProducts(req, res) {
  const { category, brand, min, max, sort, page = 1, limit = 20, q } = req.query
  const filter = {}

  if (category) {
    const cat = await Category.findOne({ slug: category })
    if (cat) filter.categoryId = cat._id
  }
  if (brand)    filter.brand = new RegExp(brand, 'i')
  if (min || max) filter.price = {}
  if (min) filter.price.$gte = Number(min)
  if (max) filter.price.$lte = Number(max)
  if (q)   filter.$text = { $search: q }

  const sortMap = {
    newest:    { createdAt: -1 },
    'price-asc':  { price: 1 },
    'price-desc': { price: -1 },
  }
  const sortBy = sortMap[sort] ?? { createdAt: -1 }

  const skip  = (Number(page) - 1) * Number(limit)
  const [products, total] = await Promise.all([
    Product.find(filter).sort(sortBy).skip(skip).limit(Number(limit)).populate('categoryId', 'name slug'),
    Product.countDocuments(filter),
  ])

  res.json({ success: true, data: products, meta: { total, page: Number(page), limit: Number(limit) } })
}

export async function getProduct(req, res) {
  const product = await Product.findOne({ slug: req.params.slug }).populate('categoryId', 'name slug')
  if (!product) return res.status(404).json({ success: false, error: 'Produit introuvable.' })
  res.json({ success: true, data: product })
}

export async function createProduct(req, res) {
  const product = await Product.create(req.body)
  res.status(201).json({ success: true, data: product })
}

export async function updateProduct(req, res) {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  if (!product) return res.status(404).json({ success: false, error: 'Produit introuvable.' })
  res.json({ success: true, data: product })
}

export async function deleteProduct(req, res) {
  const product = await Product.findByIdAndDelete(req.params.id)
  if (!product) return res.status(404).json({ success: false, error: 'Produit introuvable.' })
  res.json({ success: true, data: null })
}
