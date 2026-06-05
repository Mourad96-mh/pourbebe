import Product from '../models/Product.js'
import Category from '../models/Category.js'

export async function getProducts(req, res) {
  const { category, brand, min, max, sort, page = 1, limit = 20, q, type, gender, age, isNew, onSale, isGiftIdea } = req.query
  const filter = {}

  if (category) {
    const slugs = String(category).split(',').map((s) => s.trim()).filter(Boolean)
    const cats  = await Category.find({ slug: { $in: slugs } })
    if (cats.length) {
      const children = await Category.find({ parentId: { $in: cats.map((c) => c._id) } })
      filter.categoryId = { $in: [...cats.map((c) => c._id), ...children.map((c) => c._id)] }
    }
  }
  if (brand)      filter.brand = new RegExp(brand, 'i')
  if (min || max) filter.price = {}
  if (min)        filter.price.$gte = Number(min)
  if (max)        filter.price.$lte = Number(max)
  if (q)          filter.$text = { $search: q }
  if (type)       filter.productType = type
  if (gender) {
    filter.gender = (gender === 'fille' || gender === 'garcon')
      ? { $in: [gender, 'unisexe'] }
      : gender
  }
  if (age)              filter.ageRange = age
  if (isNew === 'true') filter.isNewArrival = true
  if (onSale === 'true') filter.$expr = { $and: [{ $ne: ['$compareAt', null] }, { $gt: ['$compareAt', '$price'] }] }
  if (isGiftIdea === 'true') filter.isGiftIdea = true

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

function generateSlug(name) {
  return name
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export async function createProduct(req, res) {
  const data = { ...req.body }
  if (!data.slug && data.name) {
    const base = generateSlug(data.name)
    let slug = base
    let counter = 1
    while (await Product.exists({ slug })) {
      slug = `${base}-${counter++}`
    }
    data.slug = slug
  }
  const product = await Product.create(data)
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
