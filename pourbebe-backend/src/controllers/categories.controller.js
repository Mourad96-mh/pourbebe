import Category from '../models/Category.js'

export async function getCategories(req, res) {
  const categories = await Category.find().lean()

  const tree = categories
    .filter((c) => !c.parentId)
    .map((parent) => ({
      ...parent,
      children: categories.filter((c) => String(c.parentId) === String(parent._id)),
    }))

  res.json({ success: true, data: tree })
}

export async function getCategory(req, res) {
  const category = await Category.findOne({ slug: req.params.slug })
  if (!category) return res.status(404).json({ success: false, error: 'Catégorie introuvable.' })
  res.json({ success: true, data: category })
}
