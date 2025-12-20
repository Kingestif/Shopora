import { Router } from "express";
import { getProducts } from "../controllers/buyerController/getProducts.js";
import { getProduct } from "../controllers/buyerController/getProduct.js";

const router = Router()

router.get('/', getProducts)
router.get('/:id', getProduct)

export default router;