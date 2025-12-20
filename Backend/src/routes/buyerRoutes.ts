import { Router } from "express";
import { getProducts } from "../controllers/buyerController/getProduct.js";

const router = Router()

router.get('/', getProducts)

export default router;