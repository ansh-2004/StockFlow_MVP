import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { createProduct,deleteProduct,getProducts,updateProduct,getProductById } from '../controllers/productController.js'

const router = express.Router()

router.post('/',authMiddleware,createProduct)
router.get("/",authMiddleware,getProducts)
router.get("/:id", authMiddleware, getProductById);
router.put('/:id',authMiddleware,updateProduct)
router.delete('/:id',authMiddleware,deleteProduct)

export default router
