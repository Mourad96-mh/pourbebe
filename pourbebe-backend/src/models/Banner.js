import mongoose from 'mongoose'

const bannerSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['hero', 'home-mid', 'birthlist', 'category-hero', 'recommended-collection'],
    required: true,
  },
  categorySlug: { type: String, default: null },
  image:        { type: String, default: '' },
  tag:          { type: String, default: '' },
  title:        { type: String, default: '' },
  subtitle:     { type: String, default: '' },
  ctaText:      { type: String, default: '' },
  ctaLink:      { type: String, default: '/' },
  showCta:      { type: Boolean, default: true },
  isActive:     { type: Boolean, default: true },
  order:        { type: Number, default: 0 },
}, { timestamps: true })

export default mongoose.model('Banner', bannerSchema)
