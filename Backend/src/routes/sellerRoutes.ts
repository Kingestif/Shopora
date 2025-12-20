import { Router } from "express";
import { postProduct } from "../controllers/sellerControllers/postProduct.js";
import { upload } from "../middlewares/upload.js";
import { getProducts } from "../controllers/sellerControllers/getProducts.js";

const router = Router();

router.post('/post-product',upload.single('image'), postProduct)
router.post('/products', getProducts)

export default router