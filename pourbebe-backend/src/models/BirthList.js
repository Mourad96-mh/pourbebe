import mongoose from 'mongoose'
import crypto from 'crypto'

const birthListItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity:  { type: Number, default: 1 },
  reserved:  { type: Boolean, default: false },
  purchased: { type: Boolean, default: false },
})

const birthListSchema = new mongoose.Schema({
  shareId: {
    type: String,
    unique: true,
    default: () => crypto.randomBytes(8).toString('hex'),
  },
  name:    { type: String, required: true, trim: true },
  dueDate: { type: Date, default: null },
  userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items:   [birthListItemSchema],
}, { timestamps: true })

export default mongoose.model('BirthList', birthListSchema)
