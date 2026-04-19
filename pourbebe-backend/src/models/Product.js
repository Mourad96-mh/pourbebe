import mongoose from 'mongoose'

const variantSchema = new mongoose.Schema({
  label: String,
  value: String,
  stock: { type: Number, default: 0 },
})

const productSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  slug:        { type: String, required: true, unique: true, lowercase: true },
  brand:       { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  price:       { type: Number, required: true },
  compareAt:   { type: Number, default: null },
  images:      [{ type: String }],
  categoryId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  tags:        [{ type: String }],
  variants:    [variantSchema],
  inStock:     { type: Boolean, default: true },
  isNew:       { type: Boolean, default: false },
}, { timestamps: true })

productSchema.index({ name: 'text', brand: 'text', description: 'text' })

export default mongoose.model('Product', productSchema)
