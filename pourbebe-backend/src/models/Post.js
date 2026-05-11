import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  slug:        { type: String, required: true, unique: true, lowercase: true, trim: true },
  excerpt:     { type: String, required: true, trim: true },
  body:        { type: String, default: '' },
  coverImage:  { type: String, default: '' },
  category:    { type: String, enum: ['conseils', 'produits', 'naissance', 'sante'], default: 'conseils' },
  tags:        [{ type: String }],
  published:   { type: Boolean, default: true },
  publishedAt: { type: Date, default: Date.now },
}, { timestamps: true })

postSchema.index({ slug: 1 })
postSchema.index({ published: 1, publishedAt: -1 })

export default mongoose.model('Post', postSchema)
