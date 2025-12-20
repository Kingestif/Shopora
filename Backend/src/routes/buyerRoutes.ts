import { Router } from "express";
import { getProducts } from "../controllers/buyerController/getProducts.js";
import { getProduct } from "../controllers/buyerController/getProduct.js";
import { searchProducts } from "../controllers/buyerController/searchProducts.js";

const router = Router()

router.get('/', getProducts)
router.get('/search', searchProducts)
router.get('/:id', getProduct)

export default router;