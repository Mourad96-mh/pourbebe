import Order from '../models/Order.js'
import Product from '../models/Product.js'
import BirthList from '../models/BirthList.js'
import { notifyNewOrder } from '../lib/whatsapp.js'

/* Mark any purchased birth-list items as "offert" (purchased). Grouped by list
   so multiple gifts from the same list are saved in a single write. Never throws
   — a gift-marking failure must not break the order itself. */
async function markGiftItemsPurchased(items) {
  const gifts = items.filter((i) => i.giftListShareId && i.giftListItemId)
  if (!gifts.length) return

  const byList = {}
  for (const g of gifts) (byList[g.giftListShareId] ??= []).push(g.giftListItemId)

  await Promise.all(
    Object.entries(byList).map(async ([shareId, itemIds]) => {
      const list = await BirthList.findOne({ shareId })
      if (!list) return
      for (const itemId of itemIds) {
        const item = list.items.id(itemId)
        if (item) {
          item.purchased = true
          item.reserved  = true
        }
      }
      await list.save()
    })
  )
}

export async function createOrder(req, res) {
  const { items, address, payment, total } = req.body

  const productIds = items.map((i) => i.productId)
  const products   = await Product.find({ _id: { $in: productIds } })

  const orderItems = items.map((i) => {
    const product = products.find((p) => String(p._id) === String(i.productId))
    return {
      productId:   product._id,
      productName: product.name,
      price:       product.price,
      quantity:    i.quantity,
      variantId:   i.variantId ?? null,
    }
  })

  const order = await Order.create({
    userId:  req.user?._id ?? null,
    items:   orderItems,
    address,
    payment,
    total,
  })

  await markGiftItemsPurchased(items).catch((err) =>
    console.error('[orders] markGiftItemsPurchased failed:', err.message)
  )

  notifyNewOrder(order).catch(() => {})

  res.status(201).json({ success: true, data: order })
}

export async function getMyOrders(req, res) {
  const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 })
  res.json({ success: true, data: orders })
}

export async function getOrder(req, res) {
  const order = await Order.findById(req.params.id)
  if (!order) return res.status(404).json({ success: false, error: 'Commande introuvable.' })
  if (String(order.userId) !== String(req.user._id) && req.user.role !== 'ADMIN') {
    return res.status(403).json({ success: false, error: 'Accès refusé.' })
  }
  res.json({ success: true, data: order })
}

export async function updateOrderStatus(req, res) {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  )
  if (!order) return res.status(404).json({ success: false, error: 'Commande introuvable.' })
  res.json({ success: true, data: order })
}

export async function getAllOrders(req, res) {
  const filter = {}
  if (req.query.phone) filter['address.phone'] = req.query.phone
  const orders = await Order.find(filter)
    .sort({ createdAt: -1 })
    .populate('userId', 'name email')
    .populate('items.productId', 'name images slug')
  res.json({ success: true, data: orders })
}
