import { Router } from 'express'
import { getCategories, getCategory } from '../controllers/categories.controller.js'

const router = Router()

router.get('/',      getCategories)
router.get('/:slug', getCategory)

export default router
