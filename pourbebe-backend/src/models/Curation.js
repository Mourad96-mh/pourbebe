import mongoose from 'mongoose'

const curationSchema = new mongoose.Schema({
  slot:       { type: String, required: true },
  contextId:  { type: String, default: '' },
  productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
}, { timestamps: true })

curationSchema.index({ slot: 1, contextId: 1 }, { unique: true })

export default mongoose.model('Curation', curationSchema)
