import { Router } from 'express'
import { createOrder, getMyOrders, getOrder } from '../controllers/orders.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = Router()

router.post('/',        protect, createOrder)
router.get('/mine',     protect, getMyOrders)
router.get('/:id',      protect, getOrder)

export default router
