import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema({
  productId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: String,
  price:       Number,
  quantity:    { type: Number, required: true },
  variantId:   { type: String, default: null },
})

const orderSchema = new mongoose.Schema({
  userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  items:   [orderItemSchema],
  address: { type: Object, required: true },
  payment: { type: Object, default: {} },
  total:   { type: Number, required: true },
  status:  {
    type: String,
    enum: ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED'],
    default: 'PENDING',
  },
}, { timestamps: true })

export default mongoose.model('Order', orderSchema)
