import mongoose from 'mongoose'

const variantSchema = new mongoose.Schema({
  label: String,
  value: String,
  stock: { type: Number, default: 0 },
})

const productSchema = new mongoose.Schema({
  name:         { type: String, required: true, trim: true },
  slug:         { type: String, required: true, unique: true, lowercase: true },
  brand:        { type: String, default: '', trim: true },
  description:  { type: String, default: '' },
  usageTips:    { type: String, default: '' },
  sizes:        [{ type: String }],
  cartDisabled: { type: Boolean, default: false },
  onOrderNote:  { type: String, default: '' },
  deliveryNote: { type: String, default: '' },
  returnNote:   { type: String, default: '' },
  price:        { type: Number, required: true },
  compareAt:    { type: Number, default: null },
  images:       [{ type: String }],
  categoryId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  tags:         [{ type: String }],
  variants:     [variantSchema],
  inStock:      { type: Boolean, default: true },
  isNewArrival: { type: Boolean, default: false },
  productType:  { type: String, default: null },
  gender:       { type: String, enum: ['fille', 'garcon', 'unisexe', null], default: null },
  ageRange:     { type: String, default: null },
  isGiftIdea:   { type: Boolean, default: false },
}, { timestamps: true })

productSchema.index({ name: 'text', brand: 'text', description: 'text' })
productSchema.index({ categoryId: 1, createdAt: -1 })
productSchema.index({ inStock: 1, createdAt: -1 })
productSchema.index({ isNewArrival: 1 })
productSchema.index({ isGiftIdea: 1 })
productSchema.index({ price: 1 })

export default mongoose.model('Product', productSchema)
