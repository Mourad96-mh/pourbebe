import { Router } from 'express'
import {
  createList, getMyList, getListByShareId,
  updateList, addItem, removeItem, reserveItem,
} from '../controllers/birthlist.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = Router()

router.post('/',                               protect, createList)
router.get('/mine',                            protect, getMyList)
router.get('/:shareId',                        getListByShareId)
router.patch('/:id',                           protect, updateList)
router.post('/:id/items',                      protect, addItem)
router.delete('/:id/items/:itemId',            protect, removeItem)
router.patch('/:shareId/items/:itemId/reserve', reserveItem)

export default router
