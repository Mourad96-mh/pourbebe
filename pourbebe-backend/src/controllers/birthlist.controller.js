import BirthList from '../models/BirthList.js'

export async function createList(req, res) {
  const existing = await BirthList.findOne({ userId: req.user._id })
  if (existing) return res.status(409).json({ success: false, error: 'Vous avez déjà une liste de naissance.' })

  const list = await BirthList.create({ ...req.body, userId: req.user._id })
  res.status(201).json({ success: true, data: list })
}

export async function getMyList(req, res) {
  const list = await BirthList.findOne({ userId: req.user._id }).populate('items.productId')
  res.json({ success: true, data: list })
}

export async function getListByShareId(req, res) {
  const list = await BirthList.findOne({ shareId: req.params.shareId }).populate('items.productId')
  if (!list) return res.status(404).json({ success: false, error: 'Liste introuvable.' })
  res.json({ success: true, data: list })
}

export async function updateList(req, res) {
  const list = await BirthList.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    { new: true }
  )
  if (!list) return res.status(404).json({ success: false, error: 'Liste introuvable.' })
  res.json({ success: true, data: list })
}

export async function addItem(req, res) {
  const list = await BirthList.findOne({ _id: req.params.id, userId: req.user._id })
  if (!list) return res.status(404).json({ success: false, error: 'Liste introuvable.' })

  const already = list.items.find((i) => String(i.productId) === req.body.productId)
  if (already) return res.status(409).json({ success: false, error: 'Produit déjà dans la liste.' })

  list.items.push({ productId: req.body.productId, quantity: req.body.quantity ?? 1 })
  await list.save()

  res.status(201).json({ success: true, data: list })
}

export async function removeItem(req, res) {
  const list = await BirthList.findOne({ _id: req.params.id, userId: req.user._id })
  if (!list) return res.status(404).json({ success: false, error: 'Liste introuvable.' })

  list.items = list.items.filter((i) => String(i._id) !== req.params.itemId)
  await list.save()

  res.json({ success: true, data: list })
}

export async function reserveItem(req, res) {
  const list = await BirthList.findOne({ shareId: req.params.shareId })
  if (!list) return res.status(404).json({ success: false, error: 'Liste introuvable.' })

  const item = list.items.id(req.params.itemId)
  if (!item) return res.status(404).json({ success: false, error: 'Article introuvable.' })
  if (item.purchased) return res.status(409).json({ success: false, error: 'Article déjà offert.' })

  item.reserved = true
  await list.save()

  res.json({ success: true, data: list })
}
