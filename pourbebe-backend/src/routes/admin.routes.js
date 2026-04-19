import { Router } from 'express'
import {
  getProducts, createProduct, updateProduct, deleteProduct,
} from '../controllers/products.controller.js'
import { getAllOrders, updateOrderStatus } from '../controllers/orders.controller.js'
import { protect } from '../middleware/auth.middleware.js'
import { adminOnly } from '../middleware/admin.middleware.js'
import { upload } from '../middleware/upload.middleware.js'
import { uploadImage } from '../lib/cloudinary.js'

const router = Router()

router.use(protect, adminOnly)

router.get('/products',          getProducts)
router.post('/products',         createProduct)
router.patch('/products/:id',    updateProduct)
router.delete('/products/:id',   deleteProduct)

router.post('/upload', upload.single('image'), async (req, res) => {
  const url = await uploadImage(req.file.path)
  res.json({ success: true, data: { url } })
})

router.get('/orders',            getAllOrders)
router.patch('/orders/:id/status', updateOrderStatus)

export default router
