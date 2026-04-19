import Order from '../models/Order.js'
import Product from '../models/Product.js'

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
  const orders = await Order.find().sort({ createdAt: -1 }).populate('userId', 'name email')
  res.json({ success: true, data: orders })
}
