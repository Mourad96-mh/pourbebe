import { Router } from 'express'
import Curation from '../models/Curation.js'

const router = Router()

router.get('/', async (req, res) => {
  const { slot, contextId = '' } = req.query
  if (!slot) return res.status(400).json({ success: false, error: 'Le paramètre slot est requis.' })

  const curation = await Curation.findOne({ slot, contextId })
    .populate('productIds', 'name brand price compareAt images slug isNewArrival inStock categoryId tags')

  const products = (curation?.productIds ?? []).map((p) => ({
    ...p.toObject({ virtuals: true }),
    id: p.id,
  }))

  res.json({ success: true, data: products })
})

export default router
